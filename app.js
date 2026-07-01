const API = "https://script.googleusercontent.com/macros/echo?user_content_key=AUkAhnQz09w50xSQDVEdHEXfK7rmZa3uSHvoOGDM9Fi4qS9STW4zWyunoYlO6JUEl7Da6I7LjSnSgkn4rsK3g9XbMCe-C82sJvf41Adpaqi9WILf_jlgXBuq0h7L65-LfpUoz4voLXzcMLvCsN1zmOC9w61YZs_K0R5Ra8VYHG9W-iOU8btwsULy7l6NGLnoqXHgm8X5fzE-RtM6BqgasBsO2kwRn5bSiMWQtOTwe7pfyCThioGhJOTKdPbXkXOLuD1dKlgIsTSl-mRr7_C0EG02egeEmt0IKA&lib=MQH9z_6F0GSPFf1uRZIvRwdHDCRJk4vFK";

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

// HOME
async function loadCharacters() {
  const data = await getData();
  const list = document.getElementById("list");

  list.innerHTML = "";

  data.forEach(char => {
    list.innerHTML += `
      <div class="card">
        <img src="${char.image}">
        <h3>${char.name}</h3>
        <p>${char.desc}</p>

        <a href="char.html?id=${char.id}">
          <button>Xem</button>
        </a>
      </div>
    `;
  });
}

// DETAIL
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

    <a href="${char.ai_link}" target="_blank">
      <button>Chơi AI</button>
    </a>

    <p>❤️ ${char.likes} | 👎 ${char.dislikes}</p>
  `;
}

// RANKING
async function loadRanking() {
  const data = await getData();

  data.sort((a, b) => b.likes - a.likes);

  const ranking = document.getElementById("ranking");

  data.forEach((char, index) => {
    ranking.innerHTML += `
      <div class="card">
        <h3>#${index + 1} ${char.name}</h3>
        <p>❤️ ${char.likes}</p>
      </div>
    `;
  });
}