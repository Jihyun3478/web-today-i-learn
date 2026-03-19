const tracks = [
    {
        title: 'Thats Us',
        artist: 'Anson Seabra',
        img: 'images/playlist/playlist-1.jpg',
        dur: '4:31',
        url: 'https://youtu.be/6bXSNuMyEN4?si=5yknBveErz2WOUI5'
    },
    {
        title: 'Older',
        artist: 'Sasha Alex Sloan',
        img: 'images/playlist/playlist-2.jpeg',
        dur: '3:12',
        url: 'https://youtu.be/r1Fx0tqK5Z4?si=Y6Litlqs1HWmes1r'
    },
    {
        title: 'When I Was Your Man',
        artist: 'Bruno Mars',
        img: 'images/playlist/playlist-3.jpeg',
        dur: '3:33',
        url: 'https://youtu.be/b3KUDuVJfn8'
    },
    {
        title: 'Hey Jude',
        artist: 'The beatles',
        img: 'images/playlist/playlist-4.jpeg',
        dur: '7:06',
        url: 'https://youtu.be/A_MjCqQoLLA?si=19mowkSagjnrW9Qn'
    },
    {
        title: 'Piano Man',
        artist: 'Billy Joel',
        img: 'images/playlist/playlist-5.jpeg',
        dur: '5:41',
        url: 'https://youtu.be/gxEPV4kolz0'
    },
    {
        title: 'Falling Slowly',
        artist: 'Glen Hansard, Marketa Irglova',
        img: 'images/playlist/playlist-6.jpeg',
        dur: '4:02',
        url: 'https://youtu.be/k8mtXwtapX4'
    },
];

let cur = 0, isPlaying = true;

function renderPlaylist() {
    const list = document.getElementById('mpList');
    if (!list) return;
    list.innerHTML = tracks.map((t, i) => `
    <div class="mp-track ${i === cur ? 'active' : ''}" onclick="select(${i})">
      <div class="mp-num">${i === cur && isPlaying ? '▶' : i + 1}</div>
      <div class="mp-t-thumb"><img src="${t.img}" alt="${t.title}" style="width:100%;height:100%;object-fit:cover;border-radius:6px;"></div>
      <div class="mp-t-meta">
        <div class="mp-t-title">${t.title}</div>
        <div class="mp-t-artist">${t.artist}</div>
      </div>
      <div class="mp-t-dur">${t.dur}</div>
    </div>
  `).join('');
    document.getElementById('mpTitle').textContent = tracks[cur].title;
    document.getElementById('mpArtist').textContent = tracks[cur].artist;
    document.getElementById('mpDur').textContent = tracks[cur].dur;
    document.getElementById('cdDisc').className = 'cd' + (isPlaying ? ' spinning' : '');
    document.getElementById('mpPlay').innerHTML = isPlaying ? '&#9646;&#9646;' : '&#9654;';
}

function select(i) {
    cur = i;
    isPlaying = true;
    renderPlaylist();
    window.open(tracks[i].url, '_blank');
}

function togglePlay() {
    isPlaying = !isPlaying;
    renderPlaylist();
}

function prev() {
    cur = (cur - 1 + tracks.length) % tracks.length;
    isPlaying = true;
    renderPlaylist();
}

function next() {
    cur = (cur + 1) % tracks.length;
    isPlaying = true;
    renderPlaylist();
}

renderPlaylist();

// TIL 폼
const tilForm = document.querySelector("#til-form");
const tilList = document.querySelector("#til-list");

tilForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const date = document.querySelector('#til-date').value;
    const title = document.querySelector('#til-title').value;
    const content = document.querySelector('#til-content').value;

    const newItem = document.createElement('article');
    newItem.className = 'til-item';
    newItem.innerHTML = `
        <time>${date}</time>
        <h3>${title}</h3>
        <p>${content}</p>
    `;

    tilList.prepend(newItem);
    tilForm.reset();
});

// 라이트박스
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.style.cssText = `
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.85);
  z-index: 1000;
  align-items: center;
  justify-content: center;
`;

lightbox.innerHTML = `
  <button id="lightbox-close" style="
    position: absolute;
    top: 20px; right: 28px;
    background: none;
    border: none;
    color: #fff;
    font-size: 2rem;
    cursor: pointer;
    line-height: 1;
  ">&times;</button>
  <img id="lightbox-img" style="
    max-width: 90vw;
    max-height: 90vh;
    border-radius: 8px;
    object-fit: contain;
    box-shadow: 0 8px 40px rgba(0,0,0,0.5);
  " />
`;

document.body.appendChild(lightbox);

document.querySelectorAll('.gallery-grid img').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
        document.getElementById('lightbox-img').src = img.src;
        lightbox.style.display = 'flex';
    });
});

document.getElementById('lightbox-close').addEventListener('click', () => {
    lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.style.display = 'none';
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') lightbox.style.display = 'none';
});
