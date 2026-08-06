const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("#site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("nav-locked", isOpen);
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      siteNav.classList.remove("open");
      navToggle.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-locked");
    }
  });
}

const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(".site-nav a[href]").forEach((link) => {
  const target = link.getAttribute("href");
  if (!target || target.startsWith("#")) return;
  const targetPage = target.split("#")[0];
  if (targetPage === currentPage) {
    link.classList.add("active");
  }
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealItems.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const inquiryForm = document.querySelector("[data-inquiry-form]");

if (inquiryForm) {
  inquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(inquiryForm);
    const lines = [
      "陶瓷膜项目询盘",
      `联系人：${formData.get("name") || ""}`,
      `公司：${formData.get("company") || ""}`,
      `电话/微信：${formData.get("phone") || ""}`,
      `邮箱：${formData.get("email") || ""}`,
      `行业场景：${formData.get("industry") || ""}`,
      `处理规模：${formData.get("capacity") || ""}`,
      `水样工况：${formData.get("message") || ""}`
    ];
    const subject = encodeURIComponent("陶瓷膜项目询盘");
    const body = encodeURIComponent(lines.join("\n"));
    const mailto = inquiryForm.dataset.mailto || "Xavier-cloud17@users.noreply.github.com";
    const status = inquiryForm.querySelector(".form-status");

    window.location.href = `mailto:${mailto}?subject=${subject}&body=${body}`;

    if (status) {
      status.textContent = "已生成邮件询盘内容；如未自动打开邮箱，请复制表单信息发送给业务联系人。";
    }
  });
}
