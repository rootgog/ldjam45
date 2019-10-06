export default class Animation {
    constructor(frames = [], looptime) {
        this.frames = frames;
        this.index = 0;
        this.looptime = looptime;
        this.running = false;
    }
    start() {
        if (this.running == false) {
            this.loop = setInterval(() => {
                this.index++;
                if (this.index == this.frames.length) {
                    this.index = 0;
                }
            }, (this.looptime * 1000) / this.frames.length);
        }
        this.running = true;
    }
    stop() {
        if (this.running == true) {
            clearInterval(this.loop);
            this.index = 0;
        }
        this.running = false;
    }
    current() {
        return this.frames[this.index];
    }
}