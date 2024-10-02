import Song from "./song.js";
const songs = Song.list;

 const Song_Image = document.querySelector(".song-info img");
 const Song_Audio = document.querySelector(".song-info audio");


export default class Player {

    static currentSong;

    static play() {
        Song_Audio.play();
    }

    static pause() {
        Song_Audio.pause();
    }

    static bar() {
        const Audio_Bar = document.querySelector(".player .controller .bar input");
        Audio_Bar.addEventListener("input", e => {
          console.log(e.target.value);
          Audio_Bar.setAttribute("value", e.target.value);
          Song_Audio.currentTime = e.target.value;
        });
    }


    static getCurrentSong(song) {
        console.log("Data", song);
        const { img, src } = song;
        Song_Image.src = img;
        Song_Audio.src = src;
        Player.currentSong = song;
      }

      static next(songsList, currentSong) {
        const findSongIndex = songsList.findIndex(
          song => song.id === currentSong.id
        );
        let nexSong = songsList[findSongIndex + 1];
        if (!nexSong) {
          nexSong = songsList[0];
        }
        this.getCurrentSong(nexSong);
      }



      static previous(songsList, currentSong) {
        const findSongIndex = songsList.findIndex(
          song => song.id === currentSong.id
        );
    
        let nexSong = songsList[findSongIndex - 1];
        if (!nexSong) {
          nexSong = songsList[songsList.length - 1];
        }
        this.getCurrentSong(nexSong);
      }

    
      static autoNext(durationByMs, currentTime) {
        if (durationByMs === currentTime) {
          const currentSongIndex = songs.indexOf(Player.currentSong);
          const songDivs = document.querySelectorAll(".songs .container .song");
          let nextDiv = songDivs[currentSongIndex + 1];
          if (!nextDiv) {
            nextDiv = songDivs[0];
          }
          console.log(nextDiv);
          Song.activeSong(nextDiv);
    
          this.next(songs, this.currentSong);
          this.play();
        }
      }

}
