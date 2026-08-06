param(
  [Parameter(Mandatory = $true)]
  [string]$RemoteUrl,

  [string]$Branch = "main",
  [string]$PagesBranch = "gh-pages",
  [string]$AuthorName = "",
  [string]$AuthorEmail = "",
  [string]$CommitMessage = "Publish ceramic membrane static site",
  [switch]$DryRun
)

$ErrorActionPreference = "Stop"
if (Get-Variable -Name PSNativeCommandUseErrorActionPreference -ErrorAction SilentlyContinue) {
  $PSNativeCommandUseErrorActionPreference = $false
}

function Write-Step {
  param([string]$Message)
  Write-Host ""
  Write-Host "==> $Message"
}

function Run-Git {
  param([string[]]$Arguments)
  if ($DryRun) {
    Write-Host "git $($Arguments -join ' ')"
    return
  }
  & git @Arguments
  if ($LASTEXITCODE -ne 0) {
    throw "Git command failed: git $($Arguments -join ' ')"
  }
}

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  throw "Git is not installed or not available in PATH."
}

if ($RemoteUrl -notmatch '^(https://github\.com/.+/.+(\.git)?|git@github\.com:.+/.+(\.git)?)$') {
  throw "RemoteUrl should look like https://github.com/username/repository.git or git@github.com:username/repository.git"
}

Write-Step "Checking Git repository"
Run-Git @("rev-parse", "--is-inside-work-tree")

if ($AuthorName.Trim()) {
  Write-Step "Setting local Git author name"
  Run-Git @("config", "user.name", $AuthorName)
}

if ($AuthorEmail.Trim()) {
  Write-Step "Setting local Git author email"
  Run-Git @("config", "user.email", $AuthorEmail)
}

$configuredName = (& git config user.name) 2>$null
$configuredEmail = (& git config user.email) 2>$null

if ($DryRun -and $AuthorName.Trim()) {
  $configuredName = $AuthorName
}

if ($DryRun -and $AuthorEmail.Trim()) {
  $configuredEmail = $AuthorEmail
}

if (-not $configuredName -or -not $configuredEmail) {
  throw "Git author is not configured. Re-run with -AuthorName and -AuthorEmail."
}

Write-Step "Preparing branch $Branch"
Run-Git @("branch", "-M", $Branch)

Write-Step "Adding or updating remote origin"
$remotes = @(& git remote)
if ($remotes -contains "origin") {
  Run-Git @("remote", "set-url", "origin", $RemoteUrl)
} else {
  Run-Git @("remote", "add", "origin", $RemoteUrl)
}

Write-Step "Staging website files"
Run-Git @("add", ".")

& git diff --cached --quiet --exit-code
if ($LASTEXITCODE -eq 0) {
  Write-Step "No staged changes to commit"
} else {
  Write-Step "Creating commit"
  Run-Git @("commit", "-m", $CommitMessage)
}

Write-Step "Pushing to GitHub"
Run-Git @("push", "-u", "origin", $Branch)

Write-Step "Updating GitHub Pages branch $PagesBranch"
Run-Git @("push", "origin", "$Branch`:$PagesBranch")

Write-Host ""
Write-Host "Done. Next:"
Write-Host "1. Open the GitHub repository in your browser."
Write-Host "2. Go to Settings > Pages."
Write-Host "3. Set Source to Deploy from a branch."
Write-Host "4. Set Branch to $PagesBranch and folder to / (root)."
Write-Host "5. Wait for GitHub Pages to finish publishing."
