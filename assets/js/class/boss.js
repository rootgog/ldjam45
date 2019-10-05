import {
    PlayableArea,
    Gun
} from "./mapEntities.js";
import {
    ctx,
    canvas
} from "../game.js";
import {
    player,
    level
} from "../views/game.js";

export default class Boss extends PlayableArea {
    constructor({
        height,
        width,
        health
    }) {
        super();
        this.height = height;
        this.width = width;
        this.health = health;
        this.x = undefined;
        this.y = undefined;
        this.weapon = new Gun(0.3);
        this.weapon.speed = 8;
        setInterval(() => this.attack(), 500);
    }
    draw(x, y) {
        let cellsize = Math.floor(ctx.canvas.width / level.width);
        if (Math.floor(ctx.canvas.height / level.height) < Math.floor(ctx.canvas.width / level.width)) {
            cellsize = Math.floor(ctx.canvas.height / level.height);
        }
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.rect(x, y, this.width * cellsize, this.height * cellsize);
        ctx.fill();
    }
    attack() {
        let cellsize = Math.floor(ctx.canvas.width / level.width);
        if (Math.floor(ctx.canvas.height / level.height) < Math.floor(ctx.canvas.width / level.width)) {
            cellsize = Math.floor(ctx.canvas.height / level.height);
        }
        let a2m = Math.atan2((this.y * cellsize) - player.y * cellsize, (this.x * cellsize) - player.x * cellsize) * 180 / Math.PI;
        //this.speed needs to be projectile speed
        this.weapon.fire(this.x, this.y, a2m, this);
    }
}