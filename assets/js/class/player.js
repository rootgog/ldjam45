import {
    ctx,
    deltaTime
} from "../game.js";
import {
    PlayableArea,
    Wall
} from "./mapEntities.js";
import {
    level
} from "../views/game.js";

export default class Player extends PlayableArea {
    constructor({
        height,
        width
    }) {
        super();
        this.height = height;
        this.width = width;
        this.x = undefined;
        this.y = undefined;
        this.speed = 1;
        this.up = 0;
        this.right = 0;
        document.addEventListener("keydown", this.keyDown.bind(this));
        document.addEventListener("keyup", this.keyUp.bind(this));
    }
    keyDown(e) {
        switch (e.key.toLowerCase()) {
            case "w":
                //up
                this.up = -this.speed;
                break;
            case "a":
                //left
                this.right = -this.speed;
                break;
            case "s":
                //down
                this.up = this.speed;
                break;
            case "d":
                //right
                this.right = this.speed;
                break;
        }
    }
    keyUp(e) {
        switch (e.key.toLowerCase()) {
            case "w":
                //up
                this.up = 0;
                break;
            case "a":
                //left
                this.right = 0;
                break;
            case "s":
                //down
                this.up = 0;
                break;
            case "d":
                //right
                this.right = 0;
                break;
        }
    }
    updatePosition() {
        let x = this.x;
        let y = this.y;
        this.x += this.right * deltaTime;
        this.y += this.up * deltaTime;
        let collisions = level.collisions(this);
        collisions.forEach(c => {
            if (c instanceof Wall) {
                this.x = x;
                this.y = y;
            }
        });

    }
    draw(x, y) {
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.rect(x - this.width / 2, y - this.height / 2, this.width, this.height);
        ctx.fill();
    }
}