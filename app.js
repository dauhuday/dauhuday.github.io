const API = "https://script.google.com/macros/s/AKfycbx5FxWAAmMEB8BEY5SCpYkcI7IXFKtPlUQgIjOol1UxI9HpHJfMOv883AeDv8mizDA/exec";

// fallback
async function getData() {
  try {
    const res = await fetch(API);
    return await res.json();
  } catch {
    const res = await fetch("data.json");
    return await res.json();
  }
}

// load card template
async function loadCardTemplate() {
  const res = await fetch("card.html");
  return await res.text();
}

// =====================
// TAG FILTER
// =====================
let selectedTags = new Set();

async function buildTagFilter(data) {
  const tagFilter = document.getElementById("tagFilter");
  tagFilter.innerHTML = "";

  const allTags = new Set();
  data.forEach(char => {
    if (char.tags) {
      char.tags.split(",").map(t => t.trim().toLowerCase()).forEach(tag => {
        if (tag) allTags.add(tag);
      });
    }
  });

  // nút Full topping
  const fullBtn = document.createElement("button");
  fullBtn.textContent = "Full topping";
  if (selectedTags.size === 0) {
    fullBtn.classList.add("active");
  }
  fullBtn.addEventListener("click", () => {
    selectedTags.clear();
    document.querySelectorAll("#tagFilter button").forEach(b => b.classList.remove("active"));
    fullBtn.classList.add("active");
    loadCharacters();
  });
  tagFilter.appendChild(fullBtn);

  // nút cho từng tag
  allTags.forEach(tag => {
    const btn = document.createElement("button");
    btn.textContent = tag;
    btn.dataset.tag = tag;

    if (selectedTags.has(tag)) {
      btn.classList.add("active");
    }

    btn.addEventListener("click", () => {
      if (selectedTags.has(tag)) {
        selectedTags.delete(tag);
        btn.classList.remove("active");
      } else {
        selectedTags.add(tag);
        btn.classList.add("active");
      }
      fullBtn.classList.remove("active");
      loadCharacters();
    });
    tagFilter.appendChild(btn);
  });
}

// =====================
// HOME
// =====================
async function loadCharacters() {
  const data = await getData();
  const list = document.getElementById("list");
  const searchBox = document.getElementById("searchBox");
  const search = searchBox ? searchBox.value.toLowerCase() : "";
  const template = await loadCardTemplate();
  list.innerHTML = "";

  buildTagFilter(data);

  data
    .filter(char => {
      const tagsString = (char.tags || "").toLowerCase();
      const nameMatch = char.name.toLowerCase().includes(search);
      const tagMatchSearch = tagsString.includes(search);

      const matchSelectedTags =
        selectedTags.size === 0 ||
        [...selectedTags].every(tag => tagsString.includes(tag));

      return (nameMatch || tagMatchSearch) && matchSelectedTags;
    })
    .forEach(char => {
      let card = template
        .replace("{{image}}", char.image)
        .replace("{{name}}", char.name)
        .replace("{{desc}}", char.desc)
        .replace("{{id}}", char.id);
      list.innerHTML += card;
    });
}

window.addEventListener("DOMContentLoaded", () => {
  const searchBox = document.getElementById("searchBox");
  if (searchBox) {
    searchBox.addEventListener("input", loadCharacters);
  }
  loadCharacters();
});

// =====================
// DETAIL (Like/Dislike logic)
// =====================
// =====================
// DETAIL (Like/Dislike logic với highlight UI)
// =====================
async function loadCharacterDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const data = await getData();
  const char = data.find(c => c.id == id);

  const detail = document.getElementById("detail");

  detail.innerHTML = `
    <img src="${char.image}">
    <h2>${char.name}</h2>
    <p>${char.desc}</p>
    <p><strong>Mục tiêu:</strong> ${char.goal || "Chưa có"}</p>
    <a href="${char.ai_link}" target="_blank">
      <button>Chơi AI</button>
    </a>
    <p>❤️ ${char.likes} | 👎 ${char.dislikes}</p>
  `;

  const likeBtn = document.getElementById("likeBtn");
  const dislikeBtn = document.getElementById("dislikeBtn");

  let userAction = localStorage.getItem("charAction_" + id);

  function updateButtons() {
    likeBtn.classList.remove("active");
    dislikeBtn.classList.remove("active");
    if (userAction === "like") likeBtn.classList.add("active");
    if (userAction === "dislike") dislikeBtn.classList.add("active");
  }
  updateButtons();

  likeBtn.onclick = async () => {
    userAction = localStorage.getItem("charAction_" + id);
    if (userAction === "like") {
      // hoàn tác like
      await fetch(API + "?action=unlike&id=" + char.id);
      localStorage.removeItem("charAction_" + id);
      userAction = null;
    } else {
      if (userAction === "dislike") {
        await fetch(API + "?action=undislike&id=" + char.id);
      }
      await fetch(API + "?action=like&id=" + char.id);
      localStorage.setItem("charAction_" + id, "like");
      userAction = "like";
    }
    loadCharacterDetail();
  };

  dislikeBtn.onclick = async () => {
    userAction = localStorage.getItem("charAction_" + id);
    if (userAction === "dislike") {
      // hoàn tác dislike
      await fetch(API + "?action=undislike&id=" + char.id);
      localStorage.removeItem("charAction_" + id);
      userAction = null;
    } else {
      if (userAction === "like") {
        await fetch(API + "?action=unlike&id=" + char.id);
      }
      await fetch(API + "?action=dislike&id=" + char.id);
      localStorage.setItem("charAction_" + id, "dislike");
      userAction = "dislike";
    }
    loadCharacterDetail();
  };
}


// =====================
// RANKING
// =====================
async function loadRanking() {
  const data = await getData();
  data.sort((a, b) => (b.likes - b.dislikes) - (a.likes - a.dislikes));

  const ranking = document.getElementById("ranking");
  ranking.innerHTML = "";

  data.forEach((char, index) => {
    ranking.innerHTML += `
      <div class="card">
        <h3>#${index + 1} ${char.name}</h3>
        <p>❤️ ${char.likes} | 👎 ${char.dislikes}</p>
      </div>
    `;
  });
}
