"use strict";

var _song = _interopRequireDefault(require("./song.js"));

var _SongsDB = require("./SongsDB.js");

var _player = _interopRequireDefault(require("./player.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _SongsDB.songDB)();

_song["default"].favList.splice(0, _song["default"].favList.length);

console.log(_song["default"].favList);
var storedFavs = JSON.parse(localStorage.getItem("favList")) || []; // Song.favList = storedFavs.map(
//   (fav) => new Song(fav.src, fav.title, fav.artist, fav.img, fav.duarition)
// );
// Song.favList.splice(0, Song.favList.length);
// localStorage.removeItem("favList");

_song["default"].favList = storedFavs;
var favs = _song["default"].favList;
console.log("favs", favs); // console.log("songs", Song.list);

var playBtn = document.querySelector(".buttons .play-button");
var playerAudio = document.querySelector(".song-info audio");
var playerBar = document.querySelector(".progress .bar input"); // Navbar toggle menu

var menuOpen = document.getElementById("menu-open");
var menuClose = document.getElementById("menu-close");
var sidebar = document.querySelector(".container .sidebar");
menuOpen.addEventListener("click", function () {
  return sidebar.style.left = "0";
});
menuClose.addEventListener("click", function () {
  return sidebar.style.left = "-100%";
}); // Initialize with a random song

window.addEventListener("DOMContentLoaded", function () {
  var randomIndex = Math.floor(Math.random() * favs.length);
  var randomSong = favs[randomIndex];

  _player["default"].getCurrentSong(randomSong);

  var songDivs = document.querySelectorAll(".playlist .music-list .items .song");
  var selectedDiv = songDivs[randomIndex];

  _song["default"].activeSong(selectedDiv);
}); // Main functions

renderAsideSongs(); // Renders the list of songs in the sidebar

playerController(); // Sets up the player controls and event listeners

function renderAsideSongs() {
  // Parent div for all songs
  var songsContainer = document.querySelector(".playlist .music-list .items"); // Renders the list of songs

  favs.forEach(function (song) {
    var id = song.id,
        img = song.img,
        title = song.title,
        artist = song.artist,
        duarition = song.duarition;
    var songDiv = document.createElement("div");
    songDiv.classList = "song";
    songDiv.innerHTML = "\n\n         <div class=\"info\">\n           <img src=".concat(img, ">\n             <div class=\"details\">\n             <h5>").concat(title, "</h5>\n             <p>").concat(artist, "</p>\n            </div>\n        </div>\n\n         <div class=\"actions\">\n            <p>").concat(duarition, "</p>\n        </div>\n      ");
    songDiv.addEventListener("click", function () {
      _player["default"].getCurrentSong(song);

      _song["default"].activeSong(songDiv); // If the play button is already active, play the new song immediately


      if (playBtn.classList.contains("on")) {
        _player["default"].play();
      }
    });
    songsContainer.append(songDiv);
  }); // localStorage.removeItem("favList");

  localStorage.setItem("favList", JSON.stringify(_song["default"].favList));
}

function playerController() {
  var pauseBtnIcon = document.querySelector(".buttons .pause-button");
  var nextBtn = document.querySelector(" .buttons .next");
  var prevBtn = document.querySelector(".buttons .prev");
  var loopBtn = document.querySelector(".buttons .loop"); // Toggle play/pause on play button click

  var isPlaying = false;
  playBtn.addEventListener("click", function () {
    if (isPlaying) {
      _player["default"].pause();

      playBtn.style.display = "inline"; // Show play icon

      pauseBtnIcon.style.display = "none"; // Hide pause icon
    } else {
      _player["default"].play();

      playBtn.style.display = "none"; // Hide play icon

      pauseBtnIcon.style.display = "inline"; // Show pause icon
    }

    isPlaying = !isPlaying;
  }); // Event Listner for Pause Icon on click

  pauseBtnIcon.addEventListener("click", function () {
    _player["default"].pause();

    playBtn.style.display = "inline";
    pauseBtnIcon.style.display = "none";
    isPlaying = false;
  }); // Toggle loop on loop button click

  loopBtn.addEventListener("click", function () {
    loopBtn.classList.toggle("on-loop");
  }); // Move to the next song

  nextBtn.addEventListener("click", function () {
    _player["default"].next(songs, _player["default"].currentSong);

    _player["default"].play();

    updateActiveSong();
  }); // Move to the previous song

  prevBtn.addEventListener("click", function () {
    _player["default"].previous(songs, _player["default"].currentSong);

    _player["default"].play();

    updateActiveSong(); // Update the UI for the active song
  }); // Update progress bar and check for auto-next when song time updates

  playerAudio.addEventListener("timeupdate", function () {
    var _getCurrentSongDurati = getCurrentSongDuration(),
        duration = _getCurrentSongDurati.duration,
        durationByMS = _getCurrentSongDurati.durationByMS;

    var currentTime = playerAudio.currentTime;
    playerBar.value = currentTime;
    playerBar.setAttribute("min", 0);
    playerBar.setAttribute("max", Math.floor(durationByMS) || 0);

    _player["default"].autoNext(durationByMS, currentTime);
  }); // Control range bar

  _player["default"].bar();
}
/**
 * Gets the current duration of the song in minutes and seconds.
 * @returns {Object} Contains the duration in milliseconds and formatted as MM:SS.
 */


function getCurrentSongDuration() {
  var durationByMS = playerAudio.duration;
  var durationMIN = Math.floor(durationByMS / 60);
  var durationSEC = Math.floor(durationByMS % 60);
  var duration = "".concat(durationMIN, ":").concat(durationSEC);
  return {
    durationByMS: durationByMS,
    duration: duration
  };
}
/**
 * Updates the active song visually in the sidebar.
 */


function updateActiveSong() {
  var currentIndex = songs.indexOf(_player["default"].currentSong);
  var songDivs = document.querySelectorAll(".songs .container .song");

  _song["default"].activeSong(songDivs[currentIndex]);
}