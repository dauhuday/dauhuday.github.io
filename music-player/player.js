let audio;
let isPlaying = false;

window.addEventListener("DOMContentLoaded", () => {

  audio = document.getElementById("bgMusic");
  const playBtn = document.getElementById("playBtn");

  // ❗ tránh lỗi khi chưa load player
  if (!audio || !playBtn) return;

  // ===== LOAD STATE =====
  isPlaying = localStorage.getItem("musicPlaying") === "true";
  const savedTime = parseFloat(localStorage.getItem("musicTime")) || 0;

  // set lại thời gian
  audio.currentTime = savedTime;

  // ===== UI =====
  function updateUI() {
    playBtn.textContent = isPlaying ? "❚❚" : "▶";
  }

  // ===== PLAY =====
  function playMusic() {
    audio.volume = 0.5;

    audio.play().catch(() => {
      // mobile có thể chặn
    });

    isPlaying = true;
    localStorage.setItem("musicPlaying", "true");
    updateUI();
  }

  // ===== PAUSE =====
  function pauseMusic() {
    audio.pause();
    isPlaying = false;
    localStorage.setItem("musicPlaying", "false");
    updateUI();
  }

  // ===== BUTTON =====
  playBtn.addEventListener("click", () => {
    isPlaying ? pauseMusic() : playMusic();
  });

  // ===== LƯU THỜI GIAN =====
  setInterval(() => {
    if (!audio.paused) {
      localStorage.setItem("musicTime", audio.currentTime);
    }
  }, 1000);

  // ===== FIX MOBILE AUTO PLAY =====
  ["click", "touchstart"].forEach(event => {
    window.addEventListener(event, () => {
      if (isPlaying && audio.paused) {
        audio.play().catch(() => {});
      }
    }, { once: true });
  });

  // ===== AUTO RESUME =====
  if (isPlaying) {
    setTimeout(() => {
      audio.play().catch(() => {});
    }, 300);
  }

  // ===== INIT =====
  updateUI();

});