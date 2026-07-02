const audio = document.getElementById("bgMusic");
const playBtn = document.getElementById("playBtn");

// lấy trạng thái lưu
let isPlaying = localStorage.getItem("musicPlaying") === "true";

// cập nhật UI
function updateUI() {
  playBtn.textContent = isPlaying ? "❚❚" : "▶";
}

// play
function playMusic() {
  audio.volume = 0.5;
  audio.play();
  isPlaying = true;
  localStorage.setItem("musicPlaying", "true");
  updateUI();
}

// pause
function pauseMusic() {
  audio.pause();
  isPlaying = false;
  localStorage.setItem("musicPlaying", "false");
  updateUI();
}

// click
playBtn.addEventListener("click", () => {
  isPlaying ? pauseMusic() : playMusic();
});

// fix autoplay
window.addEventListener("click", () => {
  if (isPlaying && audio.paused) {
    audio.play();
  }
}, { once: true });

// init
window.addEventListener("load", () => {
  updateUI();

  if (isPlaying) {
    setTimeout(() => {
      audio.play().catch(() => {});
    }, 300);
  }
});