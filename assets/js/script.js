// Fonction de délai
function delay(n) {
  n = n || 2000;
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, n);
  });
}

// Transition d'écran (loader)
function pageTransition() {
  var tl = gsap.timeline();
  tl.to(".loading-screen", {
    duration: 1.2,
    width: "100%",
    left: "0%",
    ease: "Expo.easeInOut",
  });
  tl.to(".loading-screen", {
    duration: 1,
    width: "100%",
    left: "100%",
    ease: "Expo.easeInOut",
    delay: 0.3,
  });
  tl.set(".loading-screen", { left: "-100%", width: "0%" });
}

// Animations communes à toutes les pages
function baseAnimations() {
  // Animation du menu
  gsap.from(".menu", {
    duration: 1.8,
    y: -100,
    delay: 2,
    ease: "power4.out",
  });

  gsap.from(".arrow_star", {
    duration: 2.8,
    opacity: 0,
    delay: 2,
    ease: "power4.out",
  });

  // Animation texte d'introduction
  gsap.from(".introduction .txt-line p", {
    duration: 1.8,
    y: 200,
    skewY: 10,
    opacity: 0,
    stagger: { amount: 0.5 },
    ease: "power4.out",
    scrollTrigger: {
      trigger: ".introduction", // ou la section contenant l’intro
      start: "top 70%", // adapte selon l’effet voulu
      toggleActions: "play none none none",
      markers: false,
    },
  });

  // Animation des icônes sociales
  gsap.from(".social-icons", {
    duration: 1.8,
    opacity: 0,
    delay: 2,
    ease: "power4.out",
    scrollTrigger: {
      trigger: ".introduction", // ou la section contenant l’intro
      start: "top 70%", // adapte selon l’effet voulu
      toggleActions: "play none none none",
      markers: false,
    },
  });

  // Animation de Typed.js
  let loopCounter = 0;
  let maxLoops = 3;

  if (document.querySelector(".custom-font-italic")) {
    new Typed(".custom-font-italic", {
      strings: ["des expériences.", "des interfaces.", "du sens."],
      typeSpeed: 40,
      backSpeed: 40,
      loop: true,
      onComplete: (self) => {
        loopCounter++;
        if (loopCounter >= maxLoops) {
          self.stop();
          document.querySelector(".typed-cursor").style.display = "none";
        }
      },
    });
  }

  // Animation des liens de navigation
  // Menu burger mobile
  const burger = document.querySelector(".burger");
  const navList = document.querySelector(".nav-list");

  if (burger && navList) {
    burger.addEventListener("click", function () {
      navList.classList.toggle("open");
      burger.classList.toggle("open"); // Ajoute cette ligne
    });

    navList.querySelectorAll("a, button, li").forEach((el) => {
      el.addEventListener("click", () => {
        navList.classList.remove("open");
        burger.classList.remove("open"); // Ajoute cette ligne
      });
    });
  }

  document.querySelectorAll(".nav-list li a").forEach((item) => {
    item.addEventListener("mouseenter", () => {
      let li = item.closest("li");
      let star = li.querySelector(".star_2");
      if (star) {
        star.style.animation = "none";
        void star.offsetWidth;
        star.style.animation = "spin 1s cubic-bezier(0.36, 0, 0.64, 1) 1";
      }
    });

    item.addEventListener("mouseleave", () => {
      let li = item.closest("li");
      let star = li.querySelector(".star_2");
      if (star) {
        star.style.animation = "none";
      }
    });
  });
}

// Animation spécifique pour la page Contact
function contactAnimations() {
  if (!document.querySelector(".container-contact")) return;

  gsap.registerPlugin(ScrollTrigger);
  // Animation des lignes de texte
  gsap.from(".line h1", {
    duration: 1.8,
    x: -100,
    opacity: 0,
    ease: "power4.out",
    delay: 1,
  });

  gsap.from(".selfie-video, .selfie-img", {
    duration: 2.5,
    rotate: 35,
    x: -550,
    ease: "power2.out",
    delay: 1,
  });

  gsap.from(".text-contact", {
    duration: 2.8,
    x: -20,
    opacity: 0,
    ease: "power4.out",
    delay: 1,
  });

  gsap.from(".line p", {
    duration: 1.8,
    delay: 1,
    y: 200,
    opacity: 0,
    stagger: {
      amount: 0.4,
    },
    ease: "power4.out",
  });

  // Curseur étoilé
  const cursor = document.getElementById("custom-cursor");
  const cursorMain = cursor.querySelector(".cursor-main");
  const cursorBg = cursor.querySelector(".cursor-bg");

  // Suivre la souris
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  // Survol d'un élément cliquable
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest("a, button, input[type='submit'], .clickable")) {
      cursorMain.style.transform = "scale(1)";
      cursorBg.style.transform = "scale(0)";
      cursorBg.style.opacity = "0";
    }
  });

  // Quitte l'élément cliquable
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest("a, button, input[type='submit'], .clickable")) {
      cursorMain.style.transform = "scale(1)";
      cursorBg.style.transform = "scale(1)";
      cursorBg.style.opacity = "1";
    }
  });
}

// Animation spécifique pour les pages Projet individuel
function projetAnimations() {
  if (!document.querySelector(".container-present")) return;

  gsap.registerPlugin(ScrollTrigger);

  if (window.innerWidth > 940) {
    ScrollTrigger.create({
      trigger: ".container-present",
      start: "top top",
      end: "bottom center",
      pin: ".left-present",
      markers: false,
    });
  }

  gsap.to(".image-present img", {
    y: -0,
    ease: "none",
    scrollTrigger: {
      trigger: ".image-present",
      start: "top bottom",
      end: "bottom top",
      scrub: 4,
      markers: false,
    },
  });

  gsap.utils.toArray(".coupe").forEach((el, i) => {
    gsap.to(el, {
      duration: 2.5,
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none none",
        once: true,
        markers: false,
      },
    });
  });

  gsap.from("p", {
    duration: 2.8,
    delay: 1,
    y: 20,
    opacity: 0,
    stagger: {
      amount: 0.4,
    },
    ease: "power4.out",
  });

  gsap.from(".line-present h1", {
    duration: 1.8,
    delay: 0.2,
    y: 400,
    opacity: 0,
    stagger: {
      amount: 0.4,
    },
    ease: "power4.out",
  });
}

// Animation spécifique pour la page projets
function projetsAnimations() {
  if (!document.querySelector(".sticky")) return;

  gsap.to(".slider", {
    duration: 1.8,
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    ease: "power2.out",
    delay: 1,
  });

  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  const stickySection = document.querySelector(".sticky");
  const slidesContainer = document.querySelector(".slides");
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slide");

  const stickyHeight = window.innerHeight * 6;
  const totalMove = slidesContainer.offsetWidth - slider.offsetWidth;
  const slideWidth = slider.offsetWidth;

  slides.forEach((slide) => {
    let title = slide.querySelector(".title h1");
    gsap.set(title, { y: -200 });
  });

  let currentVisibleIndex = null;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const currentIndex = Array.from(slides).indexOf(entry.target);
        const titles = Array.from(slides).map((s) =>
          s.querySelector(".title h1")
        );

        if (entry.intersectionRatio >= 0.25) {
          currentVisibleIndex = currentIndex;
          titles.forEach((title, index) => {
            gsap.to(title, {
              y: index === currentVisibleIndex ? 0 : -200,
              duration: 0.5,
              ease: "power2.out",
              overwrite: true,
            });
          });
        }
      });
    },
    { root: slider, threshold: [0.25] }
  );

  slides.forEach((slide) => observer.observe(slide));

  ScrollTrigger.create({
    trigger: "body",
    start: "top top",
    end: `+=${stickyHeight}px`,
    scrub: 1,
    pin: true,
    onUpdate: (self) => {
      const progress = self.progress;
      const mainMove = progress * totalMove;

      gsap.set(slidesContainer, { x: -mainMove });

      const currentSlide = Math.floor(mainMove / slideWidth);
      const sliderProgress = (mainMove % slideWidth) / slideWidth;

      slides.forEach((slide, index) => {
        let image = slide.querySelector("img");
        if (image) {
          if (index === currentSlide || index === currentSlide + 1) {
            let relativeProgress =
              index === currentSlide ? sliderProgress : sliderProgress - 1;
            let parallaxAmount = relativeProgress * slideWidth * 0.25;

            gsap.set(image, {
              x: parallaxAmount,
              scale: 1.35,
            });
          } else {
            gsap.set(image, { x: 0, scale: 1.35 });
          }
        }
      });
    },
  });
}

// Animation spécifique pour la page Propos
function proposAnimations() {
  if (!document.querySelector(".container")) return;

  const items = document.querySelectorAll(".item");
  const container = document.querySelector(".container");
  const heroCopy = document.querySelector(".hero-copy1");
  const spans = document.querySelectorAll(".hero-copy span");
  const numberOfItems = items.length;
  const angleIncrement = (2 * Math.PI) / numberOfItems;
  const radius = 180;
  let currentAngle = 0;
  let isMouseOverSpan = false;
  let targetX = 0,
    targetY = 0;
  let currentX = 0,
    currentY = 0;

  const updateGallery = (mouseX, mouseY, show = true) => {
    targetX = mouseX - container.getBoundingClientRect().left;
    targetY = mouseY - container.getBoundingClientRect().top;

    currentX += (targetX - currentX) * 0.1 + 15;
    currentY += (targetY - currentY) * 0.1 + 5;

    items.forEach(function (item, index) {
      const angle = currentAngle + index * angleIncrement;
      const x = currentX + radius * Math.cos(angle) - item.offsetWidth / 2;
      const y = currentY + radius * Math.sin(angle) - item.offsetHeight / 2;

      gsap.to(item, {
        x: x,
        y: y,
        opacity: show ? 1 : 0,
        duration: 0.5,
        ease: "power1.out",
      });
    });
  };

  spans.forEach((span) => {
    span.addEventListener("mouseenter", (e) => {
      isMouseOverSpan = true;
      updateGallery(e.clientX, e.clientY, true);
    });

    span.addEventListener("mousemove", (e) => {
      if (isMouseOverSpan) {
        targetX = e.clientX - 800;
        targetY = e.clientY - 450;
      }
    });

    span.addEventListener("mouseleave", () => {
      isMouseOverSpan = false;
      updateGallery(0, 0, false);
    });

    span.addEventListener("mouseenter", () => {
      gsap.to(heroCopy.querySelectorAll("p"), {
        color: "rgba(69, 47, 27, 0.4)",
        duration: 0.3,
        ease: "power1.out",
      });
    });

    span.addEventListener("mouseleave", () => {
      gsap.to(heroCopy.querySelectorAll("p"), {
        color: "#452f1b",
        duration: 0.3,
        ease: "power1.out",
      });
    });
  });

  gsap.ticker.add(() => {
    currentAngle += 0.005;
    if (currentAngle > 2 * Math.PI) {
      currentAngle -= 2 * Math.PI;
    }

    if (isMouseOverSpan) {
      updateGallery(targetX, targetY, true);
    }
  });

  gsap.registerPlugin(ScrollTrigger);

  // Animation des lignes de texte
  gsap.from(".txt-line p", {
    duration: 1.8,
    delay: 1.5,
    y: 200,
    skewY: 10,
    opacity: 0,
    stagger: { amount: 0.5 },
    ease: "power4.out",
  });

  gsap.from(".notice", {
    duration: 1.8,
    y: 100,
    delay: 2,
    ease: "power4.out",
  });
}

// Initialisation pour chaque page
function contentAnimation() {
  baseAnimations();

  if (window.location.pathname.includes("projets")) {
    projetsAnimations();
  } else if (window.location.pathname.includes("/projet/")) {
    projetAnimations();
  } else if (window.location.pathname.includes("propos")) {
    proposAnimations();
  } else if (window.location.pathname.includes("contact")) {
    contactAnimations();
  }
}

$(function () {
  barba.init({
    sync: true,
    transitions: [
      {
        async leave(data) {
          const done = this.async();
          pageTransition();
          await delay(1500);
          done();
        },

        async enter(data) {
          contentAnimation();
        },

        async once(data) {
          contentAnimation();
        },
      },
    ],
  });
});
