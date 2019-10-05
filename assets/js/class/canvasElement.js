import {
    ctx
} from "../game.js";

class canvasElement {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    containsCoordinate({
        x,
        y
    }) {
        if (this instanceof Rect) {
            return x >= this.x && x <= this.x + this.width &&
                y >= this.y + this.height && y <= this.y;
        } else if (this instanceof Circle) {

        }
    }
}

class Rect extends canvasElement {
    constructor({
        x,
        y,
        height,
        width
    }) {
        super(x, y);
        this.height = height;
        this.width = width;
    }
}

/* only needed if we end up doing main menu

export class Button extends Rect {
    constructor({
        x,
        y,
        height,
        width,
        text
    }) {
        super({
            x,
            y,
            height,
            width
        });
        this.text = text;
        document.addEventListener('click', e => {
            console.log(e);
        });
    }
    draw() {
        console.log("draw the button");
    }
}*/