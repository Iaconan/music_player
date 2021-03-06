let songs = [
    { path : "./audio/Kid Cudi, Eminem - The Adventures Of Moon Man & Slim Shady (Lyric Video).mp3" ,
      cover : "./images/inspired.jpg", artist : "Kid Cudi & Eminem" , name : "The Adventures Of Moon Man & Slim Shady"},
    { path : "./audio/arctic monkeys _ 505 lyrics.mp3" ,
      cover : "./images/artic.jpg", artist : "Arctic Monkeys" , name : "505"},
    { path : "./audio/Arctic Monkeys - Do I Wanna Know (Official Video).mp3" ,
      cover : "./images/monkeys.gif", artist : "Arctic Monkeys" , name : "Do I Wanna Know"},
    { path : "./audio/Aoko & Jav Cast - Shining.mp3" ,
      cover : "./images/chill-space.gif", artist : "Aoko & Jav Cast" , name : "Shining"},
    { path : "./audio/audio1.mp3" ,
      cover : "./images/foto-media.jpg", artist : "Unknown" , name : "Unknown"},
    { path : "./audio/awhyle - Southside (lofi beats).mp3" ,
      cover : "./images/Foto-sfondo.jpg", artist : "lofi beats" , name : "Southside"},
    { path : "./audio/Ghostrifter Official - Afternoon Nap.mp3" ,
      cover : "./images/main-sfondo.jpg", artist : "Ghostrifter" , name : "Afternoon Nap"},
    { path : "./audio/Horizon.mp3" ,
      cover : "./images/lone-wolf.jpg", artist : "Unknown" , name : "Horizon"},
    { path : "./audio/Midnight Bodega.mp3" ,
      cover : "./images/main-main.jpg", artist : "Bodega" , name : "Midnight"},
    { path : "./audio/Not Afraid.mp3" ,
      cover : "./images/joker.jpg", artist : "Eminem" , name : "Not Afraid"},
    { path : "./audio/Solitude (feat. Trxxshed).mp3" ,
      cover : "./images/main.jpg", artist : "Unknown" , name : "Solitude"},
    { path : "./audio/Wind.mp3" ,
      cover : "./images/sfondo4.jpg", artist : "Unknown" , name : "Wind"},
      { path : "./audio/Michael Jackson - Billie Jean (Official Video).mp3" ,
      cover : "./images/michael-jackson-moon-walk.gif", artist : "Michael Jackson" , name : "Billie Jean"},
]





const carousel = [...document.querySelectorAll('.carousel img')]

let carouselImageIndex = 0

const changeCarousel = () => {
    carousel[carouselImageIndex].classList.toggle('active');

    if(carouselImageIndex >= carousel.length -1) {
        carouselImageIndex = 0;
    } else {
        carouselImageIndex++;
    }

    carousel[carouselImageIndex].classList.toggle('active');

}

setInterval(() => {
    changeCarousel();
}, 3000);


// Music player section

  const musicPlayerSection = document.querySelector('.music-player-section');

  let clickCount = 1;

  musicPlayerSection.addEventListener('click', () => {
      if (clickCount >= 2){
          musicPlayerSection.classList.add('active');
          clickCount = 1;
          return;
      }
      clickCount++;
      setTimeout(() => {
          clickCount = 1;
      }, 250);
    
  })


//   back from music player
const backToHomeBtn = document.querySelector('.music-player-section .back-btn');

backToHomeBtn.addEventListener('click', () => {
    musicPlayerSection.classList.remove('active');
})

// playlist player

const playlistSection = document.querySelector('.playlist');
const navBtn = document.querySelector('.music-player-section .nav-btn');

navBtn.addEventListener('click', () => {
    playlistSection.classList.add('active');
})


// back from playlist to music player

const backToMusicPlayer = document.querySelector('.playlist .back-btn');

backToMusicPlayer.addEventListener('click' , () => {
    playlistSection.classList.remove('active');
})


// music

let currentMusic = 0;

const music = document.querySelector('#audio-source');

const seekBar = document.querySelector('.music-seek-bar');
const songName = document.querySelector('.current-song-name');
const artistName = document.querySelector('.artist-name');
const coverImage = document.querySelector('.cover');
const currentMusicTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.duration');

const queue = [...document.querySelectorAll('.queue')];

// select all buttons

const forwardBtn = document.querySelector('i.fa-forward')
const backwardBtn = document.querySelector('i.fa-backward')
const playBtn = document.querySelector('i.fa-play')
const pauseBtn = document.querySelector('i.fa-pause')
const repeatBtn = document.querySelector('span.fa-redo')
const volumeBtn = document.querySelector('span.fa-volume-up')
const volumeSlider = document.querySelector('.volume-slider')


// play btn

playBtn.addEventListener('click', () => {
    music.play();
    playBtn.classList.remove('active');
    pauseBtn.classList.add('active');
})


// pause btn

pauseBtn.addEventListener('click', () => {
    music.pause();
    pauseBtn.classList.remove('active');
    playBtn.classList.add('active');
})


// set music 

const setMusic = (i) => {
    seekBar.value = 0;
    let song = songs[i];
    currentMusic = i;

    music.src = song.path;

    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    coverImage.src = song.cover

    setTimeout(() => {
        seekBar.max = music.duration;
        musicDuration.innerHTML = formatTime(music.duration);
    }, 300);
    currentMusicTime.innerHTML = '00 : 00';
    queue.forEach(item => item.classList.remove('active'));
    queue[currentMusic].classList.add('active');
}

setMusic(0);


// format current music time

const formatTime = (time) => {
    let min = Math.floor(time /60);
    if (min < 10) {
        min = `0` + min;
    }

    let sec = Math.floor(time % 60);
    if (sec < 10) {
        sec = `0` + sec;
    }

    return `${min} : ${sec}` ;
}


// seekbar events

setInterval(() => {
    seekBar.value = music.currentTime;
    currentMusicTime.innerHTML = formatTime(music.currentTime);
    if(Math.floor(music.currentTime) == Math.floor(seekBar.max)) {
        if(repeatBtn.className.includes('active')){
            setMusic(currentMusic);
            playBtn.click();
        } else {
            forwardBtn.click();
        }
    }
}, 500)

seekBar.addEventListener('change', () => {
    music.currentTime = seekBar.value;
})


// forward btn   

forwardBtn.addEventListener('click', () => {
    if(currentMusic >= songs.length -1) {
        currentMusic = 0;
    } else {
        currentMusic++;
    }
    setMusic(currentMusic);
    playBtn.click();
})


// backward btn

backwardBtn.addEventListener('click', () => {
    if(currentMusic <= 0) {
        currentMusic = songs.length - 1;
    } else {
        currentMusic--;
    }
    setMusic(currentMusic);
    playBtn.click();
})

// repeat button 

repeatBtn.addEventListener('click', () => {
    repeatBtn.classList.toggle('active');
})


// volume section

volumeBtn.addEventListener('click', () => {
    volumeBtn.classList.toggle('active');
    volumeSlider.classList.toggle('active');
})

volumeSlider.addEventListener('input', () => {
    music.volume = volumeSlider.value;
})

queue.forEach((item, i) => {
    item.addEventListener('click', () => {
        setMusic(i);
        playBtn.click();
    })
})
