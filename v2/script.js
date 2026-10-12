(function () {
  const header = document.querySelector("[data-header]");
  const form = document.querySelector("[data-lead-form]");
  const formNote = document.querySelector("[data-form-note]");
  const modal = document.querySelector("[data-project-modal]");
  const modalImage = document.querySelector("[data-project-image]");
  const modalThumbs = document.querySelector("[data-project-thumbs]");
  const modalKicker = document.querySelector("[data-project-kicker]");
  const modalTitle = document.querySelector("[data-project-title]");
  const modalStory = document.querySelector("[data-project-story]");
  const modalLocation = document.querySelector("[data-project-location]");
  const modalType = document.querySelector("[data-project-type]");
  const modalFocus = document.querySelector("[data-project-focus]");
  let lastFocusedElement = null;

  const projects = {
    dosti: {
      kicker: "Residence, Dosti",
      title: "Dosti Residence",
      location: "Dosti",
      type: "Residential apartment",
      focus: "Bedroom styling, wall art, soft furnishings",
      story: "A calm, tactile home story built around botanical art, soft neutrals, warm wood, and restful bedroom detailing. The direction is premium without feeling loud.",
      images: [
        { src: "assets/projects/01-dosti.jpg", alt: "Soft premium bedroom with custom botanical wall art and warm neutral bedding" },
        { src: "assets/projects/01-dosti-02.jpg", alt: "Dosti residence detail with refined room styling and layered finishes" },
        { src: "assets/projects/01-dosti-03.jpg", alt: "Dosti residence interior with warm materials and composed decor" }
      ]
    },
    serene: {
      kicker: "Apartment, Goregaon",
      title: "The Serene Apartment",
      location: "Goregaon",
      type: "Premium apartment",
      focus: "Bedrooms, storage, warm lighting",
      story: "A polished apartment concept with quiet hotel-suite cues: muted panels, upholstered comfort, curated art, and storage planned into the architecture.",
      images: [
        { src: "assets/projects/02-serene-apartment-goregaon.jpg", alt: "Serene Apartment bedroom with custom headboard and warm wall lights" },
        { src: "assets/projects/02-serene-apartment-goregaon-02.jpg", alt: "Serene Apartment interior with refined neutral palette" },
        { src: "assets/projects/02-serene-apartment-goregaon-03.jpg", alt: "Serene Apartment room view with tailored lighting and finishes" }
      ]
    },
    luxe: {
      kicker: "Luxury home, Thane",
      title: "Where Luxe Meets Elegance",
      location: "Thane",
      type: "Luxury residence",
      focus: "Premium finishes, bathroom detailing, reflective surfaces",
      story: "A luxe interior direction that leans on precision: stone textures, glass, mirror lighting, brass cues, and clean lines that make compact spaces feel elevated.",
      images: [
        { src: "assets/projects/03-luxe-elegance-thane.jpg", alt: "Luxury bathroom with glass shower and integrated lighting" },
        { src: "assets/projects/03-luxe-elegance-thane-02.jpg", alt: "Luxe residence room with warm premium finishes" },
        { src: "assets/projects/03-luxe-elegance-thane-03.jpg", alt: "Where Luxe Meets Elegance interior with polished residential detailing" }
      ]
    },
    tranquil: {
      kicker: "Apartment, Thane",
      title: "The Tranquil Apartment",
      location: "Thane",
      type: "Residential apartment",
      focus: "Kitchen planning, storage, calm finishes",
      story: "A practical apartment designed to feel settled and bright. Storage, lighting, and efficient circulation do the heavy lifting while the palette stays calm.",
      images: [
        { src: "assets/projects/04-tranquil-apartment-thane.jpg", alt: "Tranquil Apartment modern kitchen with under-cabinet lighting" },
        { src: "assets/projects/04-tranquil-apartment-thane-02.jpg", alt: "Tranquil Apartment interior with compact planning and bright finishes" },
        { src: "assets/projects/04-tranquil-apartment-thane-03.jpg", alt: "Tranquil Apartment room view with clean storage and warm lighting" }
      ]
    },
    wadhwa: {
      kicker: "Residence, Wadhwa Courtyard",
      title: "Wadhwa Courtyard",
      location: "Wadhwa Courtyard",
      type: "Contemporary residence",
      focus: "Soft textures, arched feature wall, bedroom styling",
      story: "A contemporary home with sculpted softness: arched wall details, fabric-led warmth, mirrored depth, and a palette that feels composed and inviting.",
      images: [
        { src: "assets/projects/05-wadhwa-courtyard.jpg", alt: "Wadhwa Courtyard bedroom with arched wall feature and warm neutral palette" },
        { src: "assets/projects/05-wadhwa-courtyard-02.jpg", alt: "Wadhwa Courtyard bedroom detail with layered bedding and wall texture" },
        { src: "assets/projects/05-wadhwa-courtyard-03.jpg", alt: "Wadhwa Courtyard room view with soft contemporary finishes" }
      ]
    },
    lakshmi: {
      kicker: "Residence, Lakshmi Shrushti",
      title: "Lakshmi Shrushti",
      location: "Lakshmi Shrushti",
      type: "Family residence",
      focus: "Storage, decor coordination, bedroom comfort",
      story: "A family-focused interior balancing practical storage with a warm lived-in personality. The room language is soft, useful, and easy to maintain.",
      images: [
        { src: "assets/projects/06-lakshmi-shrushti.jpg", alt: "Lakshmi Shrushti bedroom with custom wardrobe and coordinated decor" },
        { src: "assets/projects/06-lakshmi-shrushti-02.jpg", alt: "Lakshmi Shrushti room view with functional storage and warm finishes" },
        { src: "assets/projects/06-lakshmi-shrushti-03.jpg", alt: "Lakshmi Shrushti interior detail with practical family-home planning" }
      ]
    },
    atmosphere: {
      kicker: "Apartment, Mulund",
      title: "Atmosphere",
      location: "Mulund",
      type: "Premium apartment",
      focus: "Textured bedroom, mirrored panels, tactile palette",
      story: "A muted luxury bedroom built around texture and depth. Mirrored panels, fabric surfaces, and warm natural tones make the room feel intimate but polished.",
      images: [
        { src: "assets/projects/07-atmosphere-mulund.jpg", alt: "Atmosphere Mulund bedroom with textured wall and mirrored panel" },
        { src: "assets/projects/07-atmosphere-mulund-02.jpg", alt: "Atmosphere Mulund interior with warm neutral materials" },
        { src: "assets/projects/07-atmosphere-mulund-03.jpg", alt: "Atmosphere Mulund room detail with tactile finishes and soft styling" }
      ]
    },
    rustic: {
      kicker: "Residence, Rustic Concept",
      title: "The Rustic Kingdom",
      location: "Mumbai Metropolitan Region",
      type: "Rustic residence",
      focus: "Earthy materials, crafted textures, warm styling",
      story: "A rustic-luxe direction using natural textures, layered textiles, and warm handcrafted details to create a retreat-like atmosphere.",
      images: [
        { src: "assets/projects/08-rustic-kingdom.jpg", alt: "Rustic Kingdom bedroom with earthy textiles and crafted wall treatment" },
        { src: "assets/projects/08-rustic-kingdom-02.jpg", alt: "Rustic Kingdom interior with warm natural material palette" },
        { src: "assets/projects/08-rustic-kingdom-03.jpg", alt: "Rustic Kingdom room detail with layered textures and rustic styling" }
      ]
    }
  };

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

  function setModalImage(image) {
    modalImage.src = image.src;
    modalImage.alt = image.alt;
    modalThumbs.querySelectorAll("button").forEach(function (button) {
      button.setAttribute("aria-current", button.dataset.src === image.src ? "true" : "false");
    });
  }

  function openProject(projectKey, trigger) {
    const project = projects[projectKey];
    if (!project || !modal) return;

    lastFocusedElement = trigger || document.activeElement;
    modalKicker.textContent = project.kicker;
    modalTitle.textContent = project.title;
    modalStory.textContent = project.story;
    modalLocation.textContent = project.location;
    modalType.textContent = project.type;
    modalFocus.textContent = project.focus;
    modalThumbs.innerHTML = "";

    project.images.forEach(function (image, index) {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.src = image.src;
      button.setAttribute("aria-label", "Show image " + (index + 1) + " for " + project.title);

      const thumb = document.createElement("img");
      thumb.src = image.src;
      thumb.alt = "";
      thumb.loading = "lazy";

      button.appendChild(thumb);
      button.addEventListener("click", function () {
        setModalImage(image);
        track("v2_project_image", {
          project_name: project.title,
          image_src: image.src
        });
      });
      modalThumbs.appendChild(button);
    });

    setModalImage(project.images[0]);
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    modal.querySelector(".modal-close").focus();
    track("v2_project_preview", { project_name: project.title });
  }

  function closeProject() {
    if (!modal || !modal.classList.contains("is-open")) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
  }

  document.addEventListener("click", function (event) {
    const projectButton = event.target.closest("[data-project]");
    if (projectButton) {
      openProject(projectButton.dataset.project, projectButton);
      return;
    }

    if (event.target.closest("[data-project-close]")) {
      closeProject();
    }

    const target = event.target.closest("[data-track]");
    if (!target) return;
    track("v2_click", {
      action_name: target.dataset.track,
      link_url: target.href || ""
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeProject();
    }
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
