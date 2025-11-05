const {
  Engine,
  Render,
  Runner,
  World,
  Bodies,
  Body,
  Composites,
  Events,
  Mouse,
  MouseConstraint,
} = Matter;

const engine = Engine.create();
const world = engine.world;

const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: window.innerWidth,
    height: window.innerHeight,
    wireframes: false, // <-- désactive le style filaire
    background: "transparent",
  },
});

Render.run(render);

const runner = Runner.create();
Runner.run(runner, engine);

// Charger tes images
const stickers = [];
for (let i = 1; i <= 14; i++) {
  const img = new Image();
  img.src = `../assets/images/stickers/sticker_${i}.png`;
  stickers.push(img);
}

// Créer des bodies
const bodies = [];

for (let i = 0; i < 14; i++) {
  let size;
  if (window.innerWidth <= 940) {
    size = 80; // Taille pour mobile
  } else {
    size = 125; // Taille par défaut
  }
  const body = Bodies.rectangle(
    Math.random() * window.innerWidth,
    Math.random() * window.innerHeight,
    size,
    size,
    {
      render: { visible: false }, // Masquer le rendu par défaut
    }
  );
  body.stickerIndex = i;
  bodies.push(body);
}

World.add(world, bodies);

// Ajouter des murs
const walls = [
  Bodies.rectangle(window.innerWidth / 2, -25, window.innerWidth, 50, {
    isStatic: true,
  }),
  Bodies.rectangle(
    window.innerWidth / 2,
    window.innerHeight + 25,
    window.innerWidth,
    50,
    { isStatic: true }
  ),
  Bodies.rectangle(-25, window.innerHeight / 2, 50, window.innerHeight, {
    isStatic: true,
  }),
  Bodies.rectangle(
    window.innerWidth + 25,
    window.innerHeight / 2,
    50,
    window.innerHeight,
    { isStatic: true }
  ),
];
World.add(world, walls);

// Mouse control
const mouse = Mouse.create(render.canvas);
const mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: {
    stiffness: 0.2,
    render: { visible: false },
  },
});
World.add(world, mouseConstraint);

render.mouse = mouse;

// Événement de rendu custom pour dessiner les stickers
Events.on(render, "afterRender", function () {
  const context = render.context;
  for (const body of bodies) {
    const pos = body.position;
    const angle = body.angle;
    const img = stickers[body.stickerIndex];

    // Option pour garder la taille fixe
    let width;
    if (window.innerWidth <= 940) {
      width = 80; // Taille pour mobile
    } else {
      width = 125; // Taille par défaut
    }
    const height = width * (img.height / img.width);

    context.save();
    context.translate(pos.x, pos.y);
    context.rotate(angle);
    context.drawImage(img, -width / 2, -height / 2, width, height);
    context.restore();
  }
});

// Adapter au redimensionnement
window.addEventListener("resize", () => {
  render.canvas.width = window.innerWidth;
  render.canvas.height = window.innerHeight;
});

gsap.from(".overlay-cafe", {
  duration: 1.8,
  y: 100,
  opacity: 0,
  ease: "power4.out",
  delay: 0.5,
});

// Animation général
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

gsap.from(".menu", {
  duration: 1.8,
  y: -100,
  delay: 2,
  ease: "power4.out",
});

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
