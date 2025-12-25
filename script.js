const ano = document.getElementById("ano");
ano.textContent = new Date().getFullYear();

const btnTema = document.getElementById("btnTema");
const status = document.getElementById("status");

function setTema(isLight) {
  document.body.classList.toggle("light", isLight);
  localStorage.setItem("tema_light", isLight ? "1" : "0");
  status.textContent = isLight ? "Tema claro ativo." : "Tema escuro ativo.";
}

const temaSalvo = localStorage.getItem("tema_light") === "1";
setTema(temaSalvo);

btnTema.addEventListener("click", () => {
  const agoraEhLight = document.body.classList.contains("light");
  setTema(!agoraEhLight);
});

const localTimeEl = document.getElementById("localTime");

function updateWorldClocks() {
  const options = { hour: "numeric", minute: "2-digit", hour12: true };

  const baseTZ = "America/Sao_Paulo";
  const baseDate = new Date(new Date().toLocaleString("en-US", { timeZone: baseTZ }));
  const baseDay = baseDate.getDate();

  const cities = [
    { id: "time-ny", tz: "America/New_York" },
    { id: "time-tok", tz: "Asia/Tokyo" },
    { id: "time-sp", tz: "America/Sao_Paulo" },
    { id: "time-lon", tz: "Europe/London" },
    { id: "time-syd", tz: "Australia/Sydney" }
  ];

  cities.forEach(c => {
    const now = new Date(new Date().toLocaleString("en-US", { timeZone: c.tz }));
    const timeStr = now.toLocaleTimeString("en-US", options);

    const dayDiff = now.getDate() - baseDay;
 const offset = dayDiff > 0 ? `<span class="time-offset">+${dayDiff}</span>` : "";


    document.getElementById(c.id).innerHTML = timeStr + offset;
  });
}

updateWorldClocks();
setInterval(updateWorldClocks, 1000);

// =========================
// Barra de fusos globais
// =========================

function updateWorldTimes() {
  const cards = document.querySelectorAll('.timebar__item');


  cards.forEach(card => {
    const tz = card.dataset.tz;
    const now = new Date();

    const date = now.toLocaleDateString('en-US', {
      timeZone: tz,
      month: 'short',
      day: '2-digit'
    });

    const time = now.toLocaleTimeString('en-US', {
      timeZone: tz,
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    card.querySelector('.date').textContent = date;
    card.querySelector('.time').textContent = time;
  });
}

updateWorldTimes();
setInterval(updateWorldTimes, 60000);
