document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("mobile-nav");

  // --- Create the overlay dynamically ---
  const overlay = document.createElement("div");
  overlay.id = "overlay";
  document.body.appendChild(overlay);

  // --- Toggle Nav Menu ---
  hamburger.addEventListener("click", () => {
    const isOpen = hamburger.classList.toggle("open");
    navMenu.classList.toggle("open");
    overlay.classList.toggle("active", isOpen);
  });

  // --- Close Nav when clicking outside (overlay) ---
  overlay.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navMenu.classList.remove("open");
    overlay.classList.remove("active");
  });

  // --- Close Nav when clicking a link ---
  document.querySelectorAll("#mobile-nav a").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      navMenu.classList.remove("open");
      overlay.classList.remove("active");
    });
  });
});

window.addEventListener("scroll", () => {
  const hamburger = document.querySelector(".hamburger");
  
  if (window.scrollY > 100) {
    hamburger.classList.add("hidden");
  } else {
    hamburger.classList.remove("hidden");
  }
});



document.addEventListener("DOMContentLoaded", () => {
  const serviceCards = document.querySelectorAll(".service-card");

  serviceCards.forEach(card => {
    card.addEventListener("click", () => {
      const info = card.querySelector(".info-card");
      if (info) {
        info.classList.toggle("visible");
      }
    });
  });
});



document.addEventListener("DOMContentLoaded", () => {
  const clinicHeading = document.querySelector(".clinic-heading");
  let animated = false;

  window.addEventListener("scroll", () => {
    const rect = clinicHeading.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isVisible && !animated) {
      clinicHeading.classList.add("animate-underline");
      animated = true; // ensures it happens only once
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const operationHeading = document.querySelector(".operation-heading");
  let animatedOperation = false;

  window.addEventListener("scroll", () => {
    if (!operationHeading) return; // safety check

    const rect = operationHeading.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isVisible && !animatedOperation) {
      operationHeading.classList.add("animate-operation-underline");
      animatedOperation = true; // ensures animation happens only once
    }
  });
});





document.addEventListener("DOMContentLoaded", () => {
    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("card-visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });

    document.querySelectorAll(".card-animate").forEach(card => {
        cardObserver.observe(card);
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById("toggle-accomplishments");
    const accomplishmentsContent = document.getElementById("accomplishments-content");

    toggleButton.addEventListener("click", () => {
        accomplishmentsContent.classList.toggle("hidden");

        // ✅ Hide the button after first click
        toggleButton.style.display = "none";
    });

    const fadeElements = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElements.forEach(el => observer.observe(el));
});




document.addEventListener("DOMContentLoaded", () => {
    const clinicGallery = document.querySelector(".clinic-int");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    let index = 0;

    function getImageWidth() {
        // More accurate width even if responsive
        return clinicGallery.querySelector("img").clientWidth + 10; // add margin/gap if any
    }

    function scrollToIndex(i) {
        clinicGallery.scrollTo({
            left: i * getImageWidth(),
            behavior: 'smooth'
        });
    }

    function scrollNext() {
        if (index < clinicGallery.children.length - 1) {
            index++;
        } else {
            index = 0;
        }
        scrollToIndex(index);
    }

    function scrollPrev() {
        if (index > 0) {
            index--;
        } else {
            index = clinicGallery.children.length - 1;
        }
        scrollToIndex(index);
    }

    nextBtn.addEventListener("click", () => {
        clearInterval(autoScrollInterval);
        scrollNext();
        resetAutoScroll();
    });

    prevBtn.addEventListener("click", () => {
        clearInterval(autoScrollInterval);
        scrollPrev();
        resetAutoScroll();
    });

    // Auto-scroll every 3 seconds
    let autoScrollInterval = setInterval(scrollNext, 3000);

    function resetAutoScroll() {
        autoScrollInterval = setInterval(scrollNext, 3000);
    }

    // Optional: Adjust for mobile
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    if (mediaQuery.matches) {
        // Do nothing different for now; same logic applies cleanly
    }
});

document.addEventListener("DOMContentLoaded", () => {
  // 🔹 Query all clickable image sections
  const images = document.querySelectorAll('.clinic-int img, #doctor img');
  const popup = document.getElementById('image-popup');
  const popupImg = document.querySelector('.popup-img');
  const closeBtn = document.querySelector('.close-btn');

  // 🔹 Sanity checks
  if (!popup || !popupImg || !closeBtn) {
    console.warn("Popup elements not found. Make sure HTML for #image-popup is present and classes/ids match.");
    return;
  }
  if (!images || images.length === 0) {
    console.warn("No images found in .clinic-int or #doctor sections.");
    return;
  }

  // 🔹 Open popup when any image clicked
  images.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      popupImg.src = img.src;
      popup.style.display = 'flex';
      document.body.style.overflow = 'hidden'; // lock scroll
    });
  });

  // 🔹 Close on overlay click or close button
  popup.addEventListener('click', (e) => {
    if (e.target === popup || e.target === closeBtn) {
      popup.style.display = 'none';
      popupImg.src = "";
      document.body.style.overflow = ''; // restore scroll
    }
  });

  // 🔹 Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === "Escape" && popup.style.display === 'flex') {
      popup.style.display = 'none';
      popupImg.src = "";
      document.body.style.overflow = '';
    }
  });

  console.log("Popup handlers attached to", images.length, "images.");
});


