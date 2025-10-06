// ===================NAVBAR============================
const navbar = document.getElementById("navbar");
const logoNormal = document.getElementById("logo-normal");
const logoWhite = document.getElementById("logo-white");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    // Scrolled state: glassmorphism effect and white logo
    navbar.classList.remove("bg-main-color");
    navbar.classList.add("bg-[#026F2C]/50", "backdrop-blur-md");
    logoNormal.classList.remove("opacity-100");
    logoNormal.classList.add("opacity-0");
    logoWhite.classList.remove("opacity-0");
    logoWhite.classList.add("opacity-100");
  } else {
    // Top state: solid gradient and normal logo
    navbar.classList.remove("bg-[#026F2C]/50", "backdrop-blur-md");
    navbar.classList.add("bg-main-color");
    logoNormal.classList.remove("opacity-0");
    logoNormal.classList.add("opacity-100");
    logoWhite.classList.remove("opacity-100");
    logoWhite.classList.add("opacity-0");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // ============== INITIALIZE AOS ANIMATIONS ==============
  AOS.init({
    duration: 800, // Animation duration in milliseconds
    once: true,    // Whether animation should happen only once
  });
  
  // ============== INITIALIZE SWIPERS ==============
  window.memberSwiper = new Swiper(".swiper-member", {
    loop: true,
    autoplay: { delay: 4000, disableOnInteraction: false },
    on: { slideChange: () => updateMemberName() },
  });

  window.testimoniesSwiper = new Swiper(".swiper-testimonies", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    autoplay: { delay: 5000 },
    navigation: {
      nextEl: ".swiper-button-next-custom",
      prevEl: ".swiper-button-prev-custom",
    },
    breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } },
  });
  // ============== END SWIPER INITIALIZATIONS ==============

  // ============== LANGUAGE TOGGLE LOGIC ==============
  const enToggle = document.getElementById("lang-toggle-en");
  const idToggle = document.getElementById("lang-toggle-id");
  const htmlEl = document.documentElement;

  function setLanguage(lang) {
    // Switch the class on the root <html> element
    htmlEl.classList.remove("lang-en", "lang-id");
    htmlEl.classList.add("lang-" + lang);

    // Update the active state of the toggle buttons
    if (lang === "en") {
      enToggle.classList.add("lang-active");
      idToggle.classList.remove("lang-active");
    } else {
      idToggle.classList.add("lang-active");
      enToggle.classList.remove("lang-active");
    }

    // Save the user's preference
    localStorage.setItem("preferredLanguage", lang);

    // Update the sliders to the new language content
    updateMemberName();
    if (window.testimoniesSwiper) {
      window.testimoniesSwiper.update();
    }
  }

  function updateMemberName() {
    if (window.memberSwiper?.slides?.length > 0) {
      const uniNameEl = document.getElementById("university-name");
      if (uniNameEl) {
        const activeSlide =
          window.memberSwiper.slides[window.memberSwiper.activeIndex];
        try {
          const nameData = JSON.parse(
            activeSlide.getAttribute("data-university-name")
          );
          const currentLang = localStorage.getItem("preferredLanguage") || "en";
          uniNameEl.innerHTML = nameData[currentLang];
        } catch (e) {
          console.error("Could not parse university name data:", e);
        }
      }
    }
  }

  // Attach click listeners
  enToggle.addEventListener("click", () => setLanguage("en"));
  idToggle.addEventListener("click", () => setLanguage("id"));

  // Set initial button state on load
  const currentLang = localStorage.getItem("preferredLanguage") || "en";
  if (currentLang === "en") {
    enToggle.classList.add("lang-active");
  } else {
    idToggle.classList.add("lang-active");
  }
  // ============== END LANGUAGE TOGGLE LOGIC ==============

  // ============== HERO SLIDER ==============
  const heroSection = document.getElementById("hero-section");
  if (heroSection) {
    const heroSlider = heroSection.querySelector(".flex");
    const dots = document.getElementById("pagination-dots").children;
    let currentIndex = 0;
    const totalSlides = dots.length;

    function updateHeroSlider() {
      if (heroSlider && totalSlides > 0) {
        heroSlider.style.transform = `translateX(-${currentIndex * 100}%)`;
        Array.from(dots).forEach((dot, i) => {
          dot.classList.toggle("bg-white", i === currentIndex);
          dot.classList.toggle("bg-white/50", i !== currentIndex);
        });
      }
    }
    if (totalSlides > 1)
      setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateHeroSlider();
      }, 5000);
  }
  // ============== END HERO SLIDER ==============

  // ============== MOBILE MENU ==============
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.querySelector("header #mobile-menu");
  const iconOpen = document.getElementById("icon-open");
  const iconClose = document.getElementById("icon-close");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
      if(iconOpen) iconOpen.classList.toggle("hidden");
      if(iconClose) iconClose.classList.toggle("hidden");
    });
  }
  // ============== END MOBILE MENU ==============

  // ============== LAZY LOADING IMAGES ==============
  const lazyImages = document.querySelectorAll('.lazy-load');

  const lazyLoad = (target) => {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute('data-src');
          img.setAttribute('src', src);
          img.classList.remove('lazy-load');
          observer.disconnect();
        }
      });
    });
    io.observe(target);
  }
  lazyImages.forEach(lazyLoad);
  // ============== END LAZY LOADING ==============
});