var musicList = [
    new Music("Göçmen", "Hidra", "gocmen.mp4", "gocmen.jpg"),
    new Music("Alo", "Ezhel", "alo.mp4", "alo.jpg"),
    new Music("Gaf", "Patron", "gaf.mp4", "gaf.jpg")
]
const img = document.querySelector("#music_img");
const audio = document.querySelector("#music_audio");
const title = document.querySelector("#music_title");
const singer = document.querySelector("#music_singer");
const prev = document.querySelector("#prev");
const play = document.querySelector("#play");
const next = document.querySelector("#next");
const currentDuration = document.querySelector("#current_duration");
const endDuration = document.querySelector("#end_duration");
const durationRange = document.querySelector("#duration_range");
var volumeBar = document.querySelector("#volume_bar");
var volumeRange = document.querySelector("#volume_range");
const mute = document.querySelector("#mute");
const musicListGroup = document.querySelector("#music_list .list-group");

const playIcon = `<i class="fa-solid fa-play"></i>`;
const pauseIcon = `<i class="fa-solid fa-pause"></i>`;
const volumeOnIcon = `<i class="fa-solid fa-volume-high"></i>`;
const volumeOffIcon = `<i class="fa-solid fa-volume-xmark"></i>`;

var musicPlay = false;
var muted = false;
var rangeValue;

const player = new MusicPlayer(musicList);

window.addEventListener("load", () => {
    displayMusic(player.getMusic());
    displayMusicList(player.musiclist);
    playingNow();
})

audio.addEventListener("loadeddata", () => {
    endDuration.textContent = secondToMMSS(audio.duration);
    durationRange.max = Math.floor(audio.duration);
    volumeBarStyle();
})
audio.addEventListener("timeupdate", () => {
    durationRange.value = Math.floor(audio.currentTime);
    currentDuration.textContent = secondToMMSS(durationRange.value);
})
durationRange.addEventListener("input", () => {
    currentDuration.textContent = secondToMMSS(durationRange.value);
    audio.currentTime = durationRange.value;
})
volumeRange.addEventListener("input", (e) => {
    const value = e.target.value;
    audio.volume = value / 100;
    if (value == 0) {
        volumeOff();
    } else {
        volumeOn();
    }
})
mute.addEventListener("click", () => {
    if (muted) {
        volumeRange.value = rangeValue == 0 ? 10 : rangeValue;
        audio.volume = volumeRange.value / 100;

        volumeOn()
    } else {

        volumeOff()
    }
})
musicListGroup.addEventListener("click", (e) => {
    const music = player.getMusicWithIndex(e.target.getAttribute("music_index"));
    if (music) {
        player.index = e.target.getAttribute("music_index");
        displayMusic(player.getMusic());
    }
    musicPlay ? playMusic() : pauseMusic();
    playingNow();
})

//* Buttons
play.addEventListener("click", () => {
    musicPlay ? pauseMusic() : playMusic();
})

next.addEventListener("click", () => {
    player.next();
    displayMusic(player.getMusic());
    musicPlay ? playMusic() : pauseMusic();
    playingNow();
})

prev.addEventListener("click", () => {
    player.prev();
    displayMusic(player.getMusic());
    musicPlay ? playMusic() : pauseMusic();
    playingNow();
})

//* Functions
displayMusic = (music) => {
    img.src = "img/" + music.img;
    audio.src = "file/" + music.file;
    title.innerText = music.getName();
    singer.innerText = music.singer;
}
displayMusicList = (list) => {
    list.forEach((music, key) => {
        li = `
        <button music_index="${key}" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
            <span>${music.getName()}</span>
            <span id="music_${key}_tag"  class="badge bg-dark rounded-pill"></span>
            <audio id="music_${key}_audio" src="file/${music.file}"></audio>
        </button>
        `;
        musicListGroup.insertAdjacentHTML("beforeend", li)
        const itemTag = document.querySelector(`#music_${key}_tag`)
        const itemAudio = document.querySelector(`#music_${key}_audio`);

        itemAudio.addEventListener("loadeddata", () => {
            itemTag.innerText = secondToMMSS(itemAudio.duration);
        })

    });
}
playMusic = () => {
    musicPlay = true;
    audio.play();
    play.innerHTML = pauseIcon;
    play.classList.add("active");
}
pauseMusic = () => {
    musicPlay = false;
    audio.pause();
    play.innerHTML = playIcon;
    play.classList.remove("active");

}
secondToMMSS = (time) => {
    const _minutes = Math.floor(time / 60);
    const _seconds = Math.floor(time % 60);
    const minutes = _minutes < 10 ? `0${_minutes}` : _minutes;
    const seconds = _seconds < 10 ? `0${_seconds}` : _seconds;
    return `${minutes}:${seconds}`;
}
volumeOn = () => {
    muted = false;
    audio.muted = false;
    mute.innerHTML = volumeOnIcon;
    mute.classList.remove("active");
}
volumeOff = () => {
    rangeValue = volumeRange.value;
    volumeRange.value = 0;
    muted = true;
    audio.muted = true;
    mute.innerHTML = volumeOffIcon;
    mute.classList.add("active");
}
volumeBarStyle = () => {
    let volumeBarHeight = volumeBar.clientHeight;
    let volumeBarWidth = volumeBar.clientWidth;
    volumeRange.style.width = volumeBarHeight + "px";
    volumeRange.style.left = "-" + ((volumeBarHeight / 2) - (volumeBarWidth / 2)) + "px";
    volumeRange.style.bottom = ((volumeBarHeight / 2) - (volumeBarWidth / 2)) + "px";
}
playingNow = () => {
    for (const element of musicListGroup.children) {
        const index = element.getAttribute("music_index");

        element.classList.remove("active");

        if (index == player.index) {
            element.classList.add("active")
        }
    }
}