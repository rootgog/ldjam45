import {
    deltaTime,
    ctx
} from "../game.js";
import {
    level
} from "../views/game.js";

export class PlayableArea {

}

export class Wall {
    draw() {

    }
}

export class Projectile {
    constructor({
        x,
        y,
        dir,
        speed
    }) {
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.speed = {
            x: speed * Math.cos(dir * Math.PI / 180),
            y: speed * Math.sin(dir * Math.PI / 180)
        }
    }
    updatePosition() {
        this.x -= this.speed.x * deltaTime;
        this.y -= this.speed.y * deltaTime;
    }
    draw(x, y) {
        this.width = 20;
        this.height = 20;
        ctx.fillStyle = "green";
        ctx.beginPath();
        ctx.rect(x, y, this.width, this.height);
        ctx.fill();
    }
}

export class Gun {
    constructor() {
        this.speed = 1;
    }
    fire(x, y, dir) {
        level.entities.push(new Projectile({
            x,
            y,
            dir,
            speed: this.speed
        }))
    }
}