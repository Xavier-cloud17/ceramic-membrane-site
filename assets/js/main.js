const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("#site-nav");

const addDropdownLink = (groupLabel, afterHref, href, text) => {
  if (!siteNav) return;

  const groups = Array.from(siteNav.querySelectorAll(".nav-group"));
  const group = groups.find((item) => {
    const label = item.querySelector(".nav-label");
    return label && label.textContent.trim() === groupLabel;
  });

  if (!group || group.querySelector(`a[href="${href}"]`)) return;

  const afterLink = group.querySelector(`a[href="${afterHref}"]`);
  const dropdown = group.querySelector(".nav-dropdown");
  if (!afterLink || !dropdown) return;

  const link = document.createElement("a");
  link.href = href;
  link.textContent = text;
  afterLink.insertAdjacentElement("afterend", link);
};

addDropdownLink("产品中心", "products.html#elements", "product-detail.html", "陶瓷管式膜详情");
addDropdownLink("新闻与资源", "resources.html", "resources.html#replacement-list", "真实资料清单");

if (navToggle && siteNav) {
  const setNavState = (isOpen) => {
    siteNav.classList.toggle("open", isOpen);
    navToggle.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "关闭导航" : "打开导航");
    document.body.classList.toggle("nav-locked", isOpen);
  };

  navToggle.addEventListener("click", () => {
    setNavState(!siteNav.classList.contains("open"));
  });

  siteNav.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLAnchorElement && siteNav.classList.contains("open")) {
      setNavState(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && siteNav.classList.contains("open")) {
      setNavState(false);
      navToggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (
      siteNav.classList.contains("open") &&
      target instanceof Node &&
      !siteNav.contains(target) &&
      !navToggle.contains(target)
    ) {
      setNavState(false);
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
    link.setAttribute("aria-current", "page");
    const parentGroup = link.closest(".nav-group");
    if (parentGroup) {
      parentGroup.classList.add("active");
    }
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

    if (!inquiryForm.checkValidity()) {
      inquiryForm.reportValidity();
      return;
    }

    const formData = new FormData(inquiryForm);
    const getField = (name) => String(formData.get(name) || "").trim();
    const lines = [
      "陶瓷膜项目询盘",
      `联系人：${getField("name")}`,
      `公司：${getField("company")}`,
      `电话/微信：${getField("phone")}`,
      `邮箱：${getField("email")}`,
      `行业场景：${getField("industry")}`,
      `咨询类型：${getField("requestType")}`,
      `处理规模：${getField("capacity")}`,
      `水样状态：${getField("sampleStatus")}`,
      `水样工况与目标：${getField("message")}`
    ];
    const subject = encodeURIComponent("陶瓷膜项目询盘");
    const body = encodeURIComponent(lines.join("\n"));
    const mailto = inquiryForm.dataset.mailto || "contact@example.com";
    const status = inquiryForm.querySelector(".form-status");

    if (status) {
      status.classList.add("is-success");
      status.textContent = "已生成邮件询盘内容，正在尝试打开邮箱客户端。";
    }

    window.location.href = `mailto:${mailto}?subject=${subject}&body=${body}`;

    window.setTimeout(() => {
      if (status) {
        status.textContent = "如果没有自动打开邮箱，请复制表单内容并手动发送。";
      }
    }, 1200);
  });
}
