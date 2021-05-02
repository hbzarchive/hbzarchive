class HCEpisode {
    constructor(title) {
        this.ele = document.createElement('div');
        this.ele.classList.add('episode.hc');
        this.title = document.createElement('h2');
        this.title.innerText = title;
        this.ele.append(this.title);
        this.videos = document.createElement('div');
        this.videos.classList.add('video-container');
        this.ele.append(this.videos);
    }

    addVideo(ele) {
        this.videos.append(ele);
    }

    getHTML() {
        return this.ele;
    }
}