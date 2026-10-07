(function () {
  const header = document.querySelector("[data-header]");
  const form = document.querySelector("[data-lead-form]");
  const formNote = document.querySelector("[data-form-note]");

  function setHeaderState() {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }

  function track(action, detail) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: action,
      ...detail
    });
  }

  document.addEventListener("click", function (event) {
    const target = event.target.closest("[data-track]");
    if (!target) return;
    track("v2_click", {
      action_name: target.dataset.track,
      link_url: target.href || ""
    });
  });

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const data = new FormData(form);
      track("generate_lead", {
        lead_source: "v2_local_mockup",
        property_type: data.get("property"),
        project_location: data.get("location"),
        estimated_budget: data.get("budget"),
        project_timeline: data.get("timeline")
      });
      formNote.textContent = "Thanks. This prototype captured the lead event locally. Production can route it to email, CRM, WhatsApp, and Google Ads.";
      form.reset();
    });
  }

  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });
})();
