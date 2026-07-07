/* ===================== */
/* 🌠 SHOOTING STAR */
/* ===================== */
function createShootingStar() {
  const star = document.createElement("div");
  star.classList.add("shooting-star");

  const sky = document.querySelector(".sky");

  let startX, startY;
  const type = Math.random();

  if (type < 0.5) {
    // từ trên
    startX = Math.random() * window.innerWidth;
    startY = Math.pow(Math.random(), 1.5) * window.innerHeight * 0.8;
    startY -= 100;
  } else {
    // từ trái
    startX = -100;
    startY = Math.pow(Math.random(), 1.2) * window.innerHeight;
  }

  star.style.left = startX + "px";
  star.style.top = startY + "px";

  const angle = 30 + Math.random() * 25;
  const scale = 0.6 + Math.random() * 0.8;
  star.style.transform = `rotate(${angle}deg) scale(${scale})`;

  const duration = 1.2 + Math.random() * 1.3;
  star.style.animationDuration = duration + "s";

  star.style.opacity = 0.6 + Math.random() * 0.6;

  sky.appendChild(star);

  setTimeout(() => {
    star.remove();
  }, duration * 1000);
}

/* ===================== */
/* 🌠 LOOP SPAWN */
/* ===================== */
function randomShoot() {
  createShootingStar();
  const delay = 700 + Math.random() * 2800;
  setTimeout(randomShoot, delay);
}

/* ===================== */
/* ✨ TWINKLE STARS */
/* ===================== */
function createTwinkleStars(count = 300) {
  const sky = document.querySelector(".sky");

  // clear stars cũ
  document.querySelectorAll(".twinkle-star").forEach(s => s.remove());

  for (let i = 0; i < count; i++) {
    const star = document.createElement("div");
    star.classList.add("twinkle-star");

    star.style.left = Math.random() * window.innerWidth + "px";
    star.style.top = Math.random() * window.innerHeight + "px";

    const size = Math.random() * 2 + 0.5;
    star.style.width = size + "px";
    star.style.height = size + "px";

    star.style.animationDelay = Math.random() * 5 + "s";
    star.style.opacity = Math.random();

    sky.appendChild(star);
  }
}

/* ===================== */
/* 🚀 INIT */
/* ===================== */
window.addEventListener("load", () => {
  createTwinkleStars(300);
  randomShoot();
});

/* ===================== */
/* 📏 RESIZE HANDLER */
/* ===================== */
window.addEventListener("resize", () => {
  createTwinkleStars(300);
});
