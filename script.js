/* ===================== */
/* 🌠 SHOOTING STAR */
/* ===================== */
function createShootingStar() {
  const star = document.createElement("div");
  star.classList.add("shooting-star");

  const sky = document.querySelector(".sky");

  let startX, startY;

  // 🎯 spawn thông minh (không lộ pattern)
  const type = Math.random();

  if (type < 0.5) {
    // từ trên
    startX = Math.random() * window.innerWidth;

    // bias phân bố (tự nhiên hơn)
    startY = Math.pow(Math.random(), 1.5) * window.innerHeight * 0.8;
    startY -= 100;
  } else {
    // từ trái
    startX = -100;

    startY = Math.pow(Math.random(), 1.2) * window.innerHeight;
  }

  star.style.left = startX + "px";
  star.style.top = startY + "px";

  // 🎯 góc bay
  const angle = 30 + Math.random() * 25;

  // 🎯 depth
  const scale = 0.6 + Math.random() * 0.8;

  star.style.transform = `rotate(${angle}deg) scale(${scale})`;

  // 🎯 tốc độ
  const duration = 1.2 + Math.random() * 1.3;
  star.style.animationDuration = duration + "s";

  // 🎯 độ sáng
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

  for (let i = 0; i < count; i++) {
    const star = document.createElement("div");
    star.classList.add("twinkle-star");

    // 🎯 vị trí FULL màn hình
    star.style.left = Math.random() * window.innerWidth + "px";
    star.style.top = Math.random() * window.innerHeight + "px";

    // 🎯 size random (depth)
    const size = Math.random() * 2 + 0.5;
    star.style.width = size + "px";
    star.style.height = size + "px";

    // 🎯 delay khác nhau (không nhấp nháy cùng lúc)
    star.style.animationDelay = Math.random() * 5 + "s";

    // 🎯 opacity random
    star.style.opacity = Math.random();

    sky.appendChild(star);
  }
}

/* ===================== */
/* 🚀 INIT */
/* ===================== */
window.addEventListener("load", () => {
  createTwinkleStars(300); // sao nền dày
  randomShoot();           // sao băng
});