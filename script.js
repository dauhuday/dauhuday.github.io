function createStar() {
  const star = document.createElement("div");
  star.classList.add("shooting-star");

  // spawn ở phía trên màn hình
  star.style.top = Math.random() * 200 + "px";
  star.style.left = Math.random() * window.innerWidth + "px";

  document.querySelector(".sky").appendChild(star);

  setTimeout(() => {
    star.remove();
  }, 1500);
}

// random thời gian xuất hiện (tự nhiên hơn)
function randomShoot() {
  createStar();
  setTimeout(randomShoot, Math.random() * 2000 + 1000);
}

randomShoot();