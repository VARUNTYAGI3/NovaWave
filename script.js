<<<<<<< HEAD
const playlistsData = [
  {
    folder: "Best Of Hindi",
    title: "Bollywood Beats",
    description: "Best Hindi songs for you.",
    coverStyle: "linear-gradient(135deg, #e55d87 0%, #5fc3e4 100%)",
    songs: [
      "_Soulmate_64.mp3",
      "Dekha Tenu Pehli Pehli Baar Ve_64.mp3",
      "Gulabi Sadi Ani Lali_64.mp3",
      "Maan Meri Jaan_64.mp3",
      "Tere Hawaale_64.mp3",
      "Ve Kamleya_64.mp3"
    ]
  },
  {
    folder: "Bright",
    title: "Bright Songs",
    description: "A collection of uplifting tracks.",
    coverStyle: "linear-gradient(135deg, #42a5f5 0%, #80d8ff 100%)",
    songs: [
      "Dreams Of River Ganga - Hanu Dixit.mp3",
      "Guess I'll Never Know - TrackTribe.mp3",
      "Luz Solart - Luna Cantina.mp3",
      "Outreach - Go By Ocean _ Ryan McCaffrey.mp3"
    ]
  },
  {
    folder: "cs",
    title: "Copyright Songs",
    description: "Cover songs selected for you.",
    coverStyle: "linear-gradient(135deg, #8e44ad 0%, #c36cd3 100%)",
    songs: [
      "_Heeriye Heeriye Aa_64.mp3",
      "O Sajni Re_64.mp3"
    ]
  },
  {
    folder: "Funky",
    title: "Mood:Funky",
    description: "Funky beats to keep you moving.",
    coverStyle: "linear-gradient(135deg, #1de9b6 0%, #00bfa5 100%)",
    songs: [
      "Crash & Burn - Aakash Gandhi.mp3",
      "High Noon - TrackTribe.mp3",
      "On the Delta - John Patitucci.mp3",
      "Spooky Boop - Otis McDonald.mp3",
      "Stealth - Aakash Gandhi.mp3"
    ]
  },
  {
    folder: "HITSS",
    title: "HITSS",
    description: "Popular hits to listen now.",
    coverStyle: "linear-gradient(135deg, #ff6f61 0%, #f7b733 100%)",
    songs: [
      "Akhiyaan Gulaab Remix - DJ Abhi_64.mp3",
      "O Maahi Remix - DJ Basque_64.mp3",
      "Phir Aur Kya Chahiye - LoFi_64.mp3",
      "Tu Aake Dekhle_64.mp3",
      "Vida karo (Melodic Techno) DJ Akhil Talreja_64.mp3"
    ]
  },
  {
    folder: "Inspirational",
    title: "Motivational",
    description: "Inspiring songs to lift your mood.",
    coverStyle: "linear-gradient(135deg, #f9d423 0%, #ff4e50 100%)",
    songs: [
      "Namaster Trip - Ofshane.mp3",
      "Nine Lives - Unicorn Heads.mp3",
      "No Indication - TrackTribe.mp3"
    ]
  },
  {
    folder: "ncs",
    title: "No Copyright Songs",
    description: "Tracks you can use without copyright concerns.",
    coverStyle: "linear-gradient(135deg, #00b8d4 0%, #64ffda 100%)",
    songs: [
      "Abroad Again - Jeremy Blake.mp3",
      "Blue Ribbons - TrackTribe.mp3",
      "Colony - TrackTribe.mp3",
      "Decimate - Jeremy Blake.mp3",
      "Drop the Tapes - TrackTribe.mp3",
      "Island Dream - Chris Haugen.mp3",
      "July - John Patitucci.mp3",
      "Losing My Mind - NEFFEX.mp3",
      "Moonlight in Mexico - Jimena Contreras.mp3",
      "Some College - National Sweetheart.mp3"
    ]
  },
  {
    folder: "Punjabi",
    title: "Punjabi Hits",
    description: "High-energy Punjabi tracks.",
    coverStyle: "linear-gradient(135deg, #ff8a65 0%, #ffca28 100%)",
    songs: [
      "_Lehnga_64.mp3",
      "Geeta Zaildar - Sip Sip_64.mp3",
      "Idk How_64.mp3",
      "Lifetime_64.mp3",
      "Sheraan Da_64.mp3"
    ]
  }
];

let currentPlaylist = null;
let currentSongIndex = 0;
const currentsong = new Audio();
const playButton = document.getElementById("play");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const timeLabel = document.getElementById("time");
const playlistTitle = document.getElementById("playlistTitle");
const playlistDescription = document.getElementById("playlistDescription");
const libraryList = document.getElementById("libraryList");
const cardContainer = document.querySelector(".cardcont");
const trackList = document.querySelector(".songlists ul");
const nowPlayingTitle = document.querySelector(".now-playing-title");
const nowPlayingSubtitle = document.querySelector(".now-playing-subtitle");
const progressBar = document.getElementById("progressBar");
const progressThumb = document.getElementById("progressThumb");
const seekbar = document.getElementById("seekbar");
const volumeRange = document.getElementById("volumeRange");
const volumeIcon = document.getElementById("volumeIcon");

function formatTime(seconds) {
  if (!seconds || Number.isNaN(seconds)) {
    return "00:00";
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

function normalizeTrackName(filename) {
  return filename.replace(/\.mp3$/i, "");
}

function getDisplayTitle(filename) {
  return normalizeTrackName(filename).replaceAll("_", " ");
}

function getTrackArtist(filename) {
  const title = getDisplayTitle(filename);
  return title.includes(" - ") ? title.split(" - ").slice(1).join(" - ") : "Various Artists";
}

function renderPlaylists() {
  const fragment = document.createDocumentFragment();
  cardContainer.innerHTML = "";
  playlistsData.forEach((playlist) => {
    const initials = playlist.title
      .split(" ")
      .filter((word) => word)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();

    const card = document.createElement("div");
    card.className = "cards";
    card.dataset.folder = playlist.folder;
    card.innerHTML = `
      <div class="cover-image" style="background: ${playlist.coverStyle};">
        ${initials}
      </div>
      <div>
        <h2>${playlist.title}</h2>
        <p>${playlist.description}</p>
      </div>
    `;

    card.addEventListener("click", () => loadPlaylist(playlist.folder));
    fragment.appendChild(card);
  });
  cardContainer.appendChild(fragment);
}

function renderLibrary() {
  libraryList.innerHTML = "";
  const fragment = document.createDocumentFragment();
  playlistsData.forEach((playlist) => {
    const item = document.createElement("li");
    item.innerHTML = `<span>${playlist.title}</span>`;
    item.addEventListener("click", () => loadPlaylist(playlist.folder));
    fragment.appendChild(item);
  });
  libraryList.appendChild(fragment);
}

function updateActiveLibraryItem() {
  libraryList.querySelectorAll("li").forEach((item) => {
    item.classList.toggle(
      "active",
      item.textContent.trim() === currentPlaylist?.title
    );
  });
}

function renderTrackList() {
  trackList.innerHTML = "";
  currentPlaylist.songs.forEach((song, index) => {
    const listItem = document.createElement("li");
    const displayName = getDisplayTitle(song);
    listItem.innerHTML = `
      <div class="song-card">
        <span>${displayName}</span>
        <span>${getTrackArtist(song)}</span>
      </div>
      <div class="song-action">
        <span>Play</span>
        <img src="play.svg" alt="Play" />
      </div>
    `;
    listItem.addEventListener("click", () => setCurrentTrack(index, true));
    trackList.appendChild(listItem);
  });
}

function updatePlayerDetails() {
  const currentTitle = getDisplayTitle(currentPlaylist.songs[currentSongIndex]);
  nowPlayingTitle.textContent = currentTitle;
  nowPlayingSubtitle.textContent = getTrackArtist(
    currentPlaylist.songs[currentSongIndex]
  );
  playlistTitle.textContent = currentPlaylist.title;
  playlistDescription.textContent = currentPlaylist.description;
}

function updateProgress() {
  const percent = currentsong.duration
    ? (currentsong.currentTime / currentsong.duration) * 100
    : 0;
  progressBar.style.width = `${percent}%`;
  progressThumb.style.left = `${percent}%`;
  timeLabel.textContent = `${formatTime(currentsong.currentTime)} / ${formatTime(
    currentsong.duration
  )}`;
}

function loadPlaylist(folder) {
  const playlist = playlistsData.find((item) => item.folder === folder);
  if (!playlist) {
    return;
  }
  currentPlaylist = playlist;
  currentSongIndex = 0;
  renderTrackList();
  updatePlayerDetails();
  updateActiveLibraryItem();
  setCurrentTrack(0, false);
}

function setCurrentTrack(index, shouldPlay = true) {
  if (!currentPlaylist || !currentPlaylist.songs[index]) {
    return;
  }
  currentSongIndex = index;
  const song = currentPlaylist.songs[index];
  const path = `${encodeURI(currentPlaylist.folder)}/${encodeURIComponent(song)}`;
  currentsong.src = path;
  updatePlayerDetails();
  if (shouldPlay) {
    currentsong.play();
    playButton.src = "pause.svg";
  }
}

function togglePlayback() {
  if (!currentsong.src) {
    return;
  }
  if (currentsong.paused) {
    currentsong.play();
    playButton.src = "pause.svg";
  } else {
    currentsong.pause();
    playButton.src = "play.svg";
  }
}

function playNextSong() {
  if (!currentPlaylist) {
    return;
  }
  const nextIndex = currentSongIndex + 1;
  if (nextIndex < currentPlaylist.songs.length) {
    setCurrentTrack(nextIndex, true);
  }
}

function playPreviousSong() {
  if (!currentPlaylist) {
    return;
  }
  const prevIndex = currentSongIndex - 1;
  if (prevIndex >= 0) {
    setCurrentTrack(prevIndex, true);
  }
}

function seekTrack(event) {
  const rect = seekbar.getBoundingClientRect();
  const percent = Math.min(
    1,
    Math.max(0, (event.clientX - rect.left) / rect.width)
  );
  currentsong.currentTime = currentsong.duration * percent;
}

function updateVolume(value) {
  currentsong.volume = value / 100;
  volumeIcon.src = value === 0 ? "mute.svg" : "volume.svg";
}

function toggleMute() {
  if (currentsong.volume > 0) {
    volumeRange.value = 0;
    updateVolume(0);
  } else {
    volumeRange.value = 80;
    updateVolume(80);
  }
}

function main() {
  renderPlaylists();
  renderLibrary();
  loadPlaylist(playlistsData[0].folder);
  currentsong.volume = 0.8;

  playButton.addEventListener("click", togglePlayback);
  previousButton.addEventListener("click", playPreviousSong);
  nextButton.addEventListener("click", playNextSong);
  seekbar.addEventListener("click", seekTrack);
  volumeRange.addEventListener("input", (event) => updateVolume(event.target.value));
  volumeIcon.addEventListener("click", toggleMute);
  currentsong.addEventListener("timeupdate", updateProgress);
  currentsong.addEventListener("ended", playNextSong);
}

main();
=======
const playlistsData = [
  {
    folder: "Best Of Hindi",
    title: "Bollywood Beats",
    description: "Best Hindi songs for you.",
    coverStyle: "linear-gradient(135deg, #e55d87 0%, #5fc3e4 100%)",
    songs: [
      "_Soulmate_64.mp3",
      "Dekha Tenu Pehli Pehli Baar Ve_64.mp3",
      "Gulabi Sadi Ani Lali_64.mp3",
      "Maan Meri Jaan_64.mp3",
      "Tere Hawaale_64.mp3",
      "Ve Kamleya_64.mp3"
    ]
  },
  {
    folder: "Bright",
    title: "Bright Songs",
    description: "A collection of uplifting tracks.",
    coverStyle: "linear-gradient(135deg, #42a5f5 0%, #80d8ff 100%)",
    songs: [
      "Dreams Of River Ganga - Hanu Dixit.mp3",
      "Guess I'll Never Know - TrackTribe.mp3",
      "Luz Solart - Luna Cantina.mp3",
      "Outreach - Go By Ocean _ Ryan McCaffrey.mp3"
    ]
  },
  {
    folder: "cs",
    title: "Copyright Songs",
    description: "Cover songs selected for you.",
    coverStyle: "linear-gradient(135deg, #8e44ad 0%, #c36cd3 100%)",
    songs: [
      "_Heeriye Heeriye Aa_64.mp3",
      "O Sajni Re_64.mp3"
    ]
  },
  {
    folder: "Funky",
    title: "Mood:Funky",
    description: "Funky beats to keep you moving.",
    coverStyle: "linear-gradient(135deg, #1de9b6 0%, #00bfa5 100%)",
    songs: [
      "Crash & Burn - Aakash Gandhi.mp3",
      "High Noon - TrackTribe.mp3",
      "On the Delta - John Patitucci.mp3",
      "Spooky Boop - Otis McDonald.mp3",
      "Stealth - Aakash Gandhi.mp3"
    ]
  },
  {
    folder: "HITSS",
    title: "HITSS",
    description: "Popular hits to listen now.",
    coverStyle: "linear-gradient(135deg, #ff6f61 0%, #f7b733 100%)",
    songs: [
      "Akhiyaan Gulaab Remix - DJ Abhi_64.mp3",
      "O Maahi Remix - DJ Basque_64.mp3",
      "Phir Aur Kya Chahiye - LoFi_64.mp3",
      "Tu Aake Dekhle_64.mp3",
      "Vida karo (Melodic Techno) DJ Akhil Talreja_64.mp3"
    ]
  },
  {
    folder: "Inspirational",
    title: "Motivational",
    description: "Inspiring songs to lift your mood.",
    coverStyle: "linear-gradient(135deg, #f9d423 0%, #ff4e50 100%)",
    songs: [
      "Namaster Trip - Ofshane.mp3",
      "Nine Lives - Unicorn Heads.mp3",
      "No Indication - TrackTribe.mp3"
    ]
  },
  {
    folder: "ncs",
    title: "No Copyright Songs",
    description: "Tracks you can use without copyright concerns.",
    coverStyle: "linear-gradient(135deg, #00b8d4 0%, #64ffda 100%)",
    songs: [
      "Abroad Again - Jeremy Blake.mp3",
      "Blue Ribbons - TrackTribe.mp3",
      "Colony - TrackTribe.mp3",
      "Decimate - Jeremy Blake.mp3",
      "Drop the Tapes - TrackTribe.mp3",
      "Island Dream - Chris Haugen.mp3",
      "July - John Patitucci.mp3",
      "Losing My Mind - NEFFEX.mp3",
      "Moonlight in Mexico - Jimena Contreras.mp3",
      "Some College - National Sweetheart.mp3"
    ]
  },
  {
    folder: "Punjabi",
    title: "Punjabi Hits",
    description: "High-energy Punjabi tracks.",
    coverStyle: "linear-gradient(135deg, #ff8a65 0%, #ffca28 100%)",
    songs: [
      "_Lehnga_64.mp3",
      "Geeta Zaildar - Sip Sip_64.mp3",
      "Idk How_64.mp3",
      "Lifetime_64.mp3",
      "Sheraan Da_64.mp3"
    ]
  }
];

let currentPlaylist = null;
let currentSongIndex = 0;
const currentsong = new Audio();
const playButton = document.getElementById("play");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const timeLabel = document.getElementById("time");
const playlistTitle = document.getElementById("playlistTitle");
const playlistDescription = document.getElementById("playlistDescription");
const libraryList = document.getElementById("libraryList");
const cardContainer = document.querySelector(".cardcont");
const trackList = document.querySelector(".songlists ul");
const nowPlayingTitle = document.querySelector(".now-playing-title");
const nowPlayingSubtitle = document.querySelector(".now-playing-subtitle");
const progressBar = document.getElementById("progressBar");
const progressThumb = document.getElementById("progressThumb");
const seekbar = document.getElementById("seekbar");
const volumeRange = document.getElementById("volumeRange");
const volumeIcon = document.getElementById("volumeIcon");

function formatTime(seconds) {
  if (!seconds || Number.isNaN(seconds)) {
    return "00:00";
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

function normalizeTrackName(filename) {
  return filename.replace(/\.mp3$/i, "");
}

function getDisplayTitle(filename) {
  return normalizeTrackName(filename).replaceAll("_", " ");
}

function getTrackArtist(filename) {
  const title = getDisplayTitle(filename);
  return title.includes(" - ") ? title.split(" - ").slice(1).join(" - ") : "Various Artists";
}

function renderPlaylists() {
  const fragment = document.createDocumentFragment();
  cardContainer.innerHTML = "";
  playlistsData.forEach((playlist) => {
    const initials = playlist.title
      .split(" ")
      .filter((word) => word)
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();

    const card = document.createElement("div");
    card.className = "cards";
    card.dataset.folder = playlist.folder;
    card.innerHTML = `
      <div class="cover-image" style="background: ${playlist.coverStyle};">
        ${initials}
      </div>
      <div>
        <h2>${playlist.title}</h2>
        <p>${playlist.description}</p>
      </div>
    `;

    card.addEventListener("click", () => loadPlaylist(playlist.folder));
    fragment.appendChild(card);
  });
  cardContainer.appendChild(fragment);
}

function renderLibrary() {
  libraryList.innerHTML = "";
  const fragment = document.createDocumentFragment();
  playlistsData.forEach((playlist) => {
    const item = document.createElement("li");
    item.innerHTML = `<span>${playlist.title}</span>`;
    item.addEventListener("click", () => loadPlaylist(playlist.folder));
    fragment.appendChild(item);
  });
  libraryList.appendChild(fragment);
}

function updateActiveLibraryItem() {
  libraryList.querySelectorAll("li").forEach((item) => {
    item.classList.toggle(
      "active",
      item.textContent.trim() === currentPlaylist?.title
    );
  });
}

function renderTrackList() {
  trackList.innerHTML = "";
  currentPlaylist.songs.forEach((song, index) => {
    const listItem = document.createElement("li");
    const displayName = getDisplayTitle(song);
    listItem.innerHTML = `
      <div class="song-card">
        <span>${displayName}</span>
        <span>${getTrackArtist(song)}</span>
      </div>
      <div class="song-action">
        <span>Play</span>
        <img src="play.svg" alt="Play" />
      </div>
    `;
    listItem.addEventListener("click", () => setCurrentTrack(index, true));
    trackList.appendChild(listItem);
  });
}

function updatePlayerDetails() {
  const currentTitle = getDisplayTitle(currentPlaylist.songs[currentSongIndex]);
  nowPlayingTitle.textContent = currentTitle;
  nowPlayingSubtitle.textContent = getTrackArtist(
    currentPlaylist.songs[currentSongIndex]
  );
  playlistTitle.textContent = currentPlaylist.title;
  playlistDescription.textContent = currentPlaylist.description;
}

function updateProgress() {
  const percent = currentsong.duration
    ? (currentsong.currentTime / currentsong.duration) * 100
    : 0;
  progressBar.style.width = `${percent}%`;
  progressThumb.style.left = `${percent}%`;
  timeLabel.textContent = `${formatTime(currentsong.currentTime)} / ${formatTime(
    currentsong.duration
  )}`;
}

function loadPlaylist(folder) {
  const playlist = playlistsData.find((item) => item.folder === folder);
  if (!playlist) {
    return;
  }
  currentPlaylist = playlist;
  currentSongIndex = 0;
  renderTrackList();
  updatePlayerDetails();
  updateActiveLibraryItem();
  setCurrentTrack(0, false);
}

function setCurrentTrack(index, shouldPlay = true) {
  if (!currentPlaylist || !currentPlaylist.songs[index]) {
    return;
  }
  currentSongIndex = index;
  const song = currentPlaylist.songs[index];
  const path = `${encodeURI(currentPlaylist.folder)}/${encodeURIComponent(song)}`;
  currentsong.src = path;
  updatePlayerDetails();
  if (shouldPlay) {
    currentsong.play();
    playButton.src = "pause.svg";
  }
}

function togglePlayback() {
  if (!currentsong.src) {
    return;
  }
  if (currentsong.paused) {
    currentsong.play();
    playButton.src = "pause.svg";
  } else {
    currentsong.pause();
    playButton.src = "play.svg";
  }
}

function playNextSong() {
  if (!currentPlaylist) {
    return;
  }
  const nextIndex = currentSongIndex + 1;
  if (nextIndex < currentPlaylist.songs.length) {
    setCurrentTrack(nextIndex, true);
  }
}

function playPreviousSong() {
  if (!currentPlaylist) {
    return;
  }
  const prevIndex = currentSongIndex - 1;
  if (prevIndex >= 0) {
    setCurrentTrack(prevIndex, true);
  }
}

function seekTrack(event) {
  const rect = seekbar.getBoundingClientRect();
  const percent = Math.min(
    1,
    Math.max(0, (event.clientX - rect.left) / rect.width)
  );
  currentsong.currentTime = currentsong.duration * percent;
}

function updateVolume(value) {
  currentsong.volume = value / 100;
  volumeIcon.src = value === 0 ? "mute.svg" : "volume.svg";
}

function toggleMute() {
  if (currentsong.volume > 0) {
    volumeRange.value = 0;
    updateVolume(0);
  } else {
    volumeRange.value = 80;
    updateVolume(80);
  }
}

function main() {
  renderPlaylists();
  renderLibrary();
  loadPlaylist(playlistsData[0].folder);
  currentsong.volume = 0.8;

  playButton.addEventListener("click", togglePlayback);
  previousButton.addEventListener("click", playPreviousSong);
  nextButton.addEventListener("click", playNextSong);
  seekbar.addEventListener("click", seekTrack);
  volumeRange.addEventListener("input", (event) => updateVolume(event.target.value));
  volumeIcon.addEventListener("click", toggleMute);
  currentsong.addEventListener("timeupdate", updateProgress);
  currentsong.addEventListener("ended", playNextSong);
}

main();
>>>>>>> a623b76 (feat: Add music player functionality with playlists and audio controls)
