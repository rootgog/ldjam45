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
        speed,
        sender,
        damage
    }) {
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.sender = sender;
        this.damage = damage;
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
        this.width = 0.15;
        this.height = 0.15;
        ctx.fillStyle = "black";
        ctx.beginPath();
        let cellsize = Math.floor(ctx.canvas.width / level.width);
        if (Math.floor(ctx.canvas.height / level.height) < Math.floor(ctx.canvas.width / level.width)) {
            cellsize = Math.floor(ctx.canvas.height / level.height);
        }
        ctx.rect(x, y, this.width * cellsize, this.height * cellsize);
        ctx.fill();
    }
}

export class Gun {
    constructor(damage) {
        this.speed = 5;
        this.damage = damage;
    }
    fire(x, y, dir, sender) {
        level.entities.push(new Projectile({
            x,
            y,
            dir,
            speed: this.speed,
            sender,
            damage: this.damage
        }));
    }
}