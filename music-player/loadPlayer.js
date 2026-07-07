window.addEventListener("DOMContentLoaded", async () => {

  // ===== TẠO IFRAME (CHỈ 1 LẦN) =====
  let iframe = document.getElementById("music-frame");

  if (!iframe) {
    iframe = document.createElement("iframe");
    iframe.src = "music-player/host.html";
    iframe.id = "music-frame";
    iframe.style.display = "none";
    document.body.appendChild(iframe);
  }

  // ===== LOAD UI =====
  if (!document.querySelector(".music-player")) {
    const res = await fetch("music-player/player.html");
    const html = await res.text();

    const wrapper = document.createElement("div");
    wrapper.innerHTML = html;
    document.body.appendChild(wrapper);
  }

  // ===== CONTROL =====
  const playBtn = document.getElementById("playBtn");

  let isPlaying = localStorage.getItem("musicPlaying") === "true";

  function updateUI() {
    playBtn.textContent = isPlaying ? "❚❚" : "▶";
  }

  playBtn.onclick = () => {
    const frameWindow = iframe.contentWindow;

    if (!frameWindow) return;

    if (isPlaying) {
      frameWindow.pauseMusic();
      isPlaying = false;
    } else {
      frameWindow.playMusic();
      isPlaying = true;
    }

    localStorage.setItem("musicPlaying", isPlaying);
    updateUI();
  };

  // init
  updateUI();
});