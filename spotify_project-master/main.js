import Song from "./utils/song.js";
import { songDB } from "./utils/SongsDB.js";
import Player from "./utils/player.js";

songDB();
const songs = Song.list;
console.log(songs);
const playBtn = document.querySelector(".buttons .play-button");
const playerAudio = document.querySelector(".song-info audio");
const playerBar = document.querySelector(".progress .bar input");

// Navbar toggle menu

const menuOpen = document.getElementById("menu-open");
const menuClose = document.getElementById("menu-close");
const sidebar = document.querySelector(".container .sidebar");

menuOpen.addEventListener("click", () => (sidebar.style.left = "0"));

menuClose.addEventListener("click", () => (sidebar.style.left = "-100%"));

// Initialize with a random song
window.addEventListener("DOMContentLoaded", () => {
  const randomIndex = Math.floor(Math.random() * songs.length);
  const randomSong = songs[randomIndex];
  Player.getCurrentSong(randomSong);

  const songDivs = document.querySelectorAll(
    ".playlist .music-list .items .song"
  );
  const selectedDiv = songDivs[randomIndex];
  Song.activeSong(selectedDiv);
});

// Main functions
renderAsideSongs(); // Renders the list of songs in the sidebar
playerController(); // Sets up the player controls and event listeners

function renderAsideSongs() {
  // Parent div for all songs
  const songsContainer = document.querySelector(".playlist .music-list .items");

  // Renders the list of songs
  songs.forEach((song) => {
    const { id, img, title, artist, duarition } = song;
    const songDiv = document.createElement("div");

    songDiv.classList = "song";
    songDiv.innerHTML = `

         <div class="info">
           <img src=${img}>
             <div class="details">
             <h5>${title}</h5>
             <p>${artist}</p>
            </div>
        </div>

         <div class="actions">
            <p>${duarition}</p>
        </div>
      `;

    songDiv.addEventListener("click", () => {
      Player.getCurrentSong(song);
      Song.activeSong(songDiv);

      // If the play button is already active, play the new song immediately
      if (playBtn.classList.contains("on")) {
        Player.play();
      }
    });

    songsContainer.append(songDiv);
  });
}

function playerController() {
  const pauseBtnIcon = document.querySelector(".buttons .pause-button");
  const nextBtn = document.querySelector(" .buttons .next");
  const prevBtn = document.querySelector(".buttons .prev");
  const favBtn = document.querySelector(".buttons .fav");
  const loopBtn = document.querySelector(".buttons .loop");

  // Toggle play/pause on play button click
  let isPlaying = false;

  playBtn.addEventListener("click", () => {
    if (isPlaying) {
      Player.pause();
      playBtn.style.display = "inline"; // Show play icon
      pauseBtnIcon.style.display = "none"; // Hide pause icon
    } else {
      Player.play();
      playBtn.style.display = "none"; // Hide play icon
      pauseBtnIcon.style.display = "inline"; // Show pause icon
    }
    isPlaying = !isPlaying;
  });

  // Event Listner for Pause Icon on click
  pauseBtnIcon.addEventListener("click", () => {
    Player.pause();
    playBtn.style.display = "inline";
    pauseBtnIcon.style.display = "none";
    isPlaying = false;
  });

  // Event Listner For Fav Icon
  favBtn.addEventListener("click", () => {
    Song.favList.splice(0, Song.favList.length);

    Song.favList = JSON.parse(localStorage.getItem("favList")) || [];
    const isFavorite = Song.favList.some(
      (fav) => fav.title === Player.currentSong.title
    );
    console.log(Song.favList);
    console.log("isfV", isFavorite);

    if (!isFavorite) {
      // Add the current song to the favorites list
      Song.favList.push(Player.currentSong);
      // Update local storage with the new favorites list
      localStorage.setItem("favList", JSON.stringify(Song.favList));
      favBtn.style.color = "black"; // Set to black if it's not
    } else {
      // Remove from favorites if it's already a favorite
      Song.favList = Song.favList.filter(
        (fav) => fav.title !== Player.currentSong.title
      );
      localStorage.setItem("favList", JSON.stringify(Song.favList));
      favBtn.style.color = ""; // Reset to default color
    }
    console.log("Updated fav list ", Song.favList);
  });

  // Toggle loop on loop button click
  loopBtn.addEventListener("click", () => {
    loopBtn.classList.toggle("on-loop");
  });

  // Move to the next song
  nextBtn.addEventListener("click", () => {
    Player.next(songs, Player.currentSong);
    Player.play();
    updateActiveSong();
  });

  // Move to the previous song
  prevBtn.addEventListener("click", () => {
    Player.previous(songs, Player.currentSong);
    Player.play();
    updateActiveSong(); // Update the UI for the active song
  });

  // Update progress bar and check for auto-next when song time updates
  playerAudio.addEventListener("timeupdate", () => {
    const { duration, durationByMS } = getCurrentSongDuration();
    const currentTime = playerAudio.currentTime;
    playerBar.value = currentTime;
    playerBar.setAttribute("min", 0);
    playerBar.setAttribute("max", Math.floor(durationByMS) || 0);
    Player.autoNext(durationByMS, currentTime);
  });

  // Control range bar
  Player.bar();
}

/**
 * Gets the current duration of the song in minutes and seconds.
 * @returns {Object} Contains the duration in milliseconds and formatted as MM:SS.
 */
function getCurrentSongDuration() {
  const durationByMS = playerAudio.duration;
  const durationMIN = Math.floor(durationByMS / 60);
  const durationSEC = Math.floor(durationByMS % 60);
  const duration = `${durationMIN}:${durationSEC}`;
  return { durationByMS, duration };
}

/**
 * Updates the active song visually in the sidebar.
 */
function updateActiveSong() {
  const currentIndex = songs.indexOf(Player.currentSong);
  const songDivs = document.querySelectorAll(".songs .container .song");
  Song.activeSong(songDivs[currentIndex]);
}
