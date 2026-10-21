// ─── Edit these three lines, then upload. Everything else reads from here. ───
const SITE = {
  email: "sajidshaik2198@gmail.com",
  checkoutURL: "https://sajid.lemonsqueezy.com/checkout/buy/bc0ef20d-5919-4b74-b2eb-ecb093f07c1f",
  downloadURL: "#download", // e.g. https://github.com/USERNAME/tweakly/releases/latest/download/Tweakly.dmg
};
// ─────────────────────────────────────────────────────────────────────────────

document.querySelectorAll("[data-email]").forEach((el) => {
  el.textContent = SITE.email;
  if (el.tagName === "A") el.href = `mailto:${SITE.email}`;
});
document.querySelectorAll("[data-checkout]").forEach((el) => (el.href = SITE.checkoutURL));
document.querySelectorAll("[data-download]").forEach((el) => (el.href = SITE.downloadURL));
document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

// ─── Interactive popover demo (home page only) ───
const demo = document.querySelector("[data-demo]");
if (demo) {
  const FREE_LIMIT = 3;
  const toggles = [...demo.querySelectorAll("[data-toggle]")];
  const notice = demo.querySelector("[data-notice]");
  const status = demo.querySelector("[data-status]");

  const render = () => {
    const on = toggles.filter((t) => t.getAttribute("aria-checked") === "true").length;
    status.textContent = `${on} of ${FREE_LIMIT} · Free`;
  };

  toggles.forEach((t) =>
    t.addEventListener("click", () => {
      const isOn = t.getAttribute("aria-checked") === "true";
      const on = toggles.filter((x) => x.getAttribute("aria-checked") === "true").length;
      if (!isOn && on >= FREE_LIMIT) {
        notice.hidden = false;
        t.classList.remove("refused");
        void t.offsetWidth; // restart the shake animation
        t.classList.add("refused");
        return;
      }
      t.setAttribute("aria-checked", String(!isOn));
      if (on - (isOn ? 1 : 0) < FREE_LIMIT) notice.hidden = true;
      render();
    })
  );
  render();
}
