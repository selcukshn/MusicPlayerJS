class Music {
    constructor(title, singer, file, img) {
        this.title = title;
        this.singer = singer;
        this.file = file;
        this.img = img;
    }

    getName() {
        return this.title + " - " + this.singer;
    }
}
