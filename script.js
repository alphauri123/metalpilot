const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

function setMenuOpen(isOpen) {
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
  primaryNav.classList.toggle("is-open", isOpen);
}

menuToggle.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

primaryNav.addEventListener("click", (event) => {
  if (event.target.closest("a, [data-open-portal]")) {
    setMenuOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 760 && menuToggle.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
  }
});

const contactForm = document.querySelector("#contact-form");
const formNotice = document.querySelector("#form-notice");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formNotice.textContent = "입력 내용은 데모 페이지로 실제 전송되지 않습니다.";
});

const portalDialog = document.querySelector("#employee-portal");
const portalLogin = document.querySelector("#portal-login");
const portalInbox = document.querySelector("#portal-inbox");
const openPortalButton = document.querySelector("[data-open-portal]");
const closePortalButton = document.querySelector("[data-close-portal]");
const loginForm = document.querySelector("#login-form");
const loginEmail = document.querySelector("#login-email");
const loginPassword = document.querySelector("#login-password");
const loginError = document.querySelector("#login-error");
const inboxWelcome = document.querySelector("#inbox-welcome");
const logoutButton = document.querySelector("#logout-button");
const demoMailItem = document.querySelector("#demo-mail-item");
const unreadCount = document.querySelector("#unread-count");
const mailEmpty = document.querySelector("#mail-empty");
const mailContent = document.querySelector("#mail-content");

function resetPortal() {
  portalLogin.hidden = false;
  portalInbox.hidden = true;
  closePortalButton.setAttribute("aria-label", "직원 로그인 창 닫기");
  loginForm.reset();
  loginError.hidden = true;
  loginError.textContent = "";
  inboxWelcome.textContent = "";
  demoMailItem.classList.add("is-unread");
  demoMailItem.setAttribute("aria-pressed", "false");
  demoMailItem.setAttribute("aria-label", "읽지 않은 메일: 316L LPBF 시제품 품질 편차 원인 검토 요청");
  unreadCount.textContent = "1 안 읽음";
  mailEmpty.hidden = false;
  mailContent.hidden = true;
}

openPortalButton.addEventListener("click", () => {
  resetPortal();
  portalDialog.showModal();
  loginEmail.focus();
});

closePortalButton.addEventListener("click", () => {
  portalDialog.close();
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = loginEmail.value.trim().toLowerCase();
  const password = loginPassword.value;
  if (email === "demo@metalpilot.example" && password === "metalpilot-demo") {
    loginError.hidden = true;
    loginError.textContent = "";
    loginPassword.value = "";
    portalLogin.hidden = true;
    portalInbox.hidden = false;
    inboxWelcome.textContent = "데모 로그인 완료 — 가상 메일함을 확인해 주세요. 실제 인증이나 메일 발송은 이루어지지 않습니다.";
    logoutButton.focus();
    return;
  }

  loginError.textContent = "로그인 정보를 확인해 주세요. 화면에 표시된 시연용 계정으로만 이용할 수 있습니다.";
  loginError.hidden = false;
  loginPassword.value = "";
  loginPassword.focus();
});

demoMailItem.addEventListener("click", () => {
  demoMailItem.classList.remove("is-unread");
  demoMailItem.setAttribute("aria-pressed", "true");
  demoMailItem.setAttribute("aria-label", "읽은 메일: 316L LPBF 시제품 품질 편차 원인 검토 요청");
  unreadCount.textContent = "모두 읽음";
  mailEmpty.hidden = true;
  mailContent.hidden = false;
  document.querySelector(".portal-close").setAttribute("aria-label", "가상 메일함 닫기");
});

logoutButton.addEventListener("click", () => {
  resetPortal();
  loginEmail.focus();
});

portalDialog.addEventListener("close", () => {
  document.querySelector(".portal-close").setAttribute("aria-label", "직원 로그인 창 닫기");
});
