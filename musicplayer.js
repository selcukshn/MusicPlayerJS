class MusicPlayer {
    constructor(musiclist) {
        this.musiclist = musiclist;
        this.index = 0;
    }

    getMusic() {
        return this.musiclist[parseInt(this.index)];
    }
    getMusicWithIndex(index) {
        const music = this.musiclist[parseInt(this.index)];
        if (music) {
            return music;
        }
    }
    next() {
        if (parseInt(this.index) + 1 <= this.musiclist.length - 1) {

            this.index++;
        } else {
            this.index = 0;
        }
    }
    prev() {
        if (parseInt(this.index) - 1 >= 0) {
            this.index--;
        } else {
            this.index = this.musiclist.length - 1;
        }
    }
}