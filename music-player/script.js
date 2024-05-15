"use strict";

const prev10Btn = document.getElementById("prev10sec");
const prevBtn = document.getElementById("prev__btn");
const playBtn = document.getElementById("play__btn");
const nextBtn = document.getElementById("next__btn");
const forward10Btn = document.getElementById("forward10Sec");
const volumeBtn = document.querySelector(".voulume i");

const songEl = document.getElementById("song");

const imageEl = document.getElementById("song__image");
const titleEl = document.getElementById("title");
const artistEl = document.getElementById("artist");

const progressContainerEl = document.getElementById("progress-container");
const progressEl = document.getElementById("progress");

const progressAudioBarEl = document.getElementById("progress-bar-audio");
const progressAudioEl = document.getElementById("progress-audio");

const currentTimeEl = document.getElementById("current__time");
const durationEl = document.getElementById("duration");

const playlist = document.getElementById("playlist");

// Data
const songs = [
  {
    name: "glimpse-of-us",
    artist: "Joji",
    title: "Glimpse of Us",
    duration: "3:53",
  },
  {
    name: "fourth-of-july",
    artist: "Sufjan Stevens",
    title: "Fourth of July",
    duration: "4:38",
  },
  {
    name: "indigo-night",
    artist: "Tamino",
    title: "Indigo Night",
    duration: "4:14",
  },
  {
    name: "remembrance",
    artist: "Balmorhea",
    title: "Remembrance",
    duration: "5:59",
  },
  {
    name: "summertime-sadness",
    artist: "Lana del Rey",
    title: "Summertime Sadness",
    duration: "3:25",
  },
  {
    name: "i-know-i-am-not-the-only-one",
    artist: "Sam Smith",
    title: "I Know I'm Not The Only One",
    duration: "3:57",
  },
];

let isPlaying = false;
let songIndex = 0;

const displaySongList = () => {
  playlist.innerHTML = "";
  songs.forEach((song, index) => {
    const songItems = document.createElement("li");
    const itemsSpanName = document.createElement("span");
    const itemsSpanDuration = document.createElement("span");

    songItems.className =
      "hover:font-bold cursor-pointer flex justify-between text-xs mb-2 text-gray-600";
    itemsSpanName.innerText = song.title;
    itemsSpanDuration.innerText = song.duration;

    if (songIndex === index) {
      songItems.classList.add("font-bold", "text-red-600");
    } else {
      songItems.classList.remove("font-bold", "text-red-600");
    }

    songItems.insertAdjacentElement("afterbegin", itemsSpanName);
    songItems.insertAdjacentElement("beforeend", itemsSpanDuration);

    songItems.addEventListener("click", () => {
      songIndex = index;
      displaySong(song);
      displaySongList();
      playSong();
    });

    playlist.append(songItems);
  });
};
displaySongList();

const playSong = () => {
  songEl.play();
  isPlaying = true;
  playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
};

const pauseSong = () => {
  songEl.pause();
  isPlaying = false;
  playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
};

playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener("click", () => {
  songIndex = songIndex == 0 ? songs.length - 1 : songIndex - 1;
  displaySong(songs[songIndex]);
  playSong();
  displaySongList();
});
nextBtn.addEventListener("click", () => {
  songIndex = songIndex == songs.length - 1 ? 0 : songIndex + 1;
  displaySong(songs[songIndex]);
  playSong();
  displaySongList();
});

const displaySong = (song) => {
  imageEl.src = `images/${song.name}.jpeg`;
  songEl.src = `audio/${song.name}.mp3`;
  titleEl.innerText = song.title;
  artistEl.innerText = song.artist;
};

songEl.addEventListener("timeupdate", (e) => {
  const { duration, currentTime: current } = e.target;

  const durationMinute = Math.floor(duration / 60);
  const durationSecond = Math.floor(duration % 60);
  if (!durationMinute) return;
  durationEl.innerText = `${durationMinute}:${String(durationSecond).padStart(
    2,
    "0"
  )}`;

  const currentMinute = Math.floor(current / 60);
  const currentSecond = Math.floor(current % 60);
  currentTimeEl.innerText = `${currentMinute}:${String(currentSecond).padStart(
    2,
    "0"
  )}`;
  progressEl.style.width = `${(current / duration) * 100}%`;
});

songEl.addEventListener("ended", () => {
  songIndex = songIndex == songs.length - 1 ? 0 : songIndex + 1;
  displaySong(songs[songIndex]);
  playSong();
  displaySongList();
});

progressContainerEl.addEventListener("click", function (event) {
  const width = this.clientWidth;
  const clicked = event.offsetX;
  const { duration } = songEl;

  songEl.currentTime = (clicked / width) * duration;
});

prev10Btn.addEventListener("click", () => {
  songEl.currentTime -= 10;
});

forward10Btn.addEventListener("click", () => {
  songEl.currentTime += 10;
});

volumeBtn.addEventListener("click", () => {
  volumeBtn.classList.toggle("fa-volume-high");
  volumeBtn.classList.toggle("fa-volume-xmark");

  if (volumeBtn.classList.contains("fa-volume-high")) {
    songEl.muted = false;
    progressAudioEl.style.backgroundColor = "#E11D48";

  } else {
    songEl.muted = true;
    progressAudioEl.style.backgroundColor = "#E5E7EB";
  }
});

progressAudioBarEl.addEventListener("click", (e) => {
  const width = progressAudioBarEl.clientWidth;
  const clicked = e.offsetX;
  const newVolume = clicked / width;
  progressAudioEl.style.width = `${newVolume * 100}%`;
  songEl.volume = newVolume;
});
