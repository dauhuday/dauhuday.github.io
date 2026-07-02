// đảm bảo DOM load xong mới chạy
window.addEventListener("DOMContentLoaded", () => {

  const audio = document.getElementById("bgMusic");
  const playBtn = document.getElementById("playBtn");

  // ❗ nếu không tìm thấy element thì dừng (tránh crash mobile)
  if (!audio || !playBtn) return;

  // lấy trạng thái lưu
  let isPlaying = localStorage.getItem("musicPlaying") === "true";

  // cập nhật UI
  function updateUI() {
    playBtn.textContent = isPlaying ? "❚❚" : "▶";
  }

  // play
  function playMusic() {
    audio.volume = 0.5;

    audio.play().catch(() => {
      // mobile chặn thì bỏ qua
    });

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

  // click button
  playBtn.addEventListener("click", () => {
    isPlaying ? pauseMusic() : playMusic();
  });

  // ✅ FIX MOBILE (rất quan trọng)
  ["click", "touchstart"].forEach(event => {
    window.addEventListener(event, () => {
      if (isPlaying && audio.paused) {
        audio.play().catch(() => {});
      }
    }, { once: true });
  });

  // init
  updateUI();

  if (isPlaying) {
    setTimeout(() => {
      audio.play().catch(() => {});
    }, 300);
  }

});