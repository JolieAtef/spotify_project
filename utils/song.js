

export default class Song{
   
  static list = [];

 constructor(src, title, artist, img, duarition){
    this.id = Song.list.length + 1;
    this.src = src;
    this.title = title;
    this.artist = artist;
    this.img = img;
    this.duarition = duarition || 0;
    this.loop = false ;
    Song.list.push(this);    
}

static activeSong(element) {
    const parent = element.parentElement;
    const allSongs = parent.children;
    [...allSongs].forEach(SongDiv => {
      SongDiv.classList.remove("active-song");
    });
    element.classList.add("active-song");
  }
}
// new Song(
//   ".assets/songs/amr-diab-weghalawtc.Com.mp3",
//   "Weghalawtac",
//   "Amr Diab",
//   "assets/imgs/amr diab.jpeg",
//   "3:50"
// );

