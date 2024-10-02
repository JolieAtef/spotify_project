import Song from "./utils/song.js";
import {songDB} from "./utils/SongsDB.js";
import Player from "./utils/player.js";

songDB()
const songs = Song.list;
console.log(songs)
const playBtn = document.querySelector(".buttons .play-button");
const playerAudio = document.querySelector(".player .img audio");
const playerBar = document.querySelector(".player .controller .bar input");

// Initialize with a random song 
window.addEventListener("DOMContentLoaded", () => {
    const randomIndex = Math.floor(Math.random() * songs.length);
    const randomSong = songs[randomIndex];
    Player.getCurrentSong(randomSong);

    const songDivs = document.querySelectorAll(".songs .container .song");
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
    songs.forEach(song => {
      const { id , img, title, artist, duration } = song;
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
            <p>${duration}</p>
             <div class="icon">
             <i class='bx bxs-right-arrow'></i>
             </div>
             <div class="icon">
             <i class='bx bx-pause'
             style="font-size: 25px;"></i>
             </div>
            <i class='bx bxs-heart'></i>
        </div>
      `;

      songDiv.addEventListener("click", () => {
        Player.getCurrentSong(song);
        Song.activeSong(songDiv);
  
        // If the play button is already active, play the new song immediately
        // if (playBtn.classList.contains("on")) {
        //   Player.play();
        // }
      });
  
      songsContainer.append(songDiv);
    });
  }

  








































































// Navbar toggle menu
// const menuOpen = document.getElementById('menu-open');
// const menuClose = document.getElementById('menu-close');
// const sidebar = document.querySelector('.container .sidebar');

// menuOpen.addEventListener('click', () => sidebar.style.left = '0');

// menuClose.addEventListener('click', () => sidebar.style.left = '-100%');

// Songs functions 

