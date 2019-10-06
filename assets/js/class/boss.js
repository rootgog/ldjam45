import {
    PlayableArea,
    Gun
} from "./mapEntities.js";
import {
    ctx,
    currentLevel,
    player
} from "../game.js";

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
        this.currentHealth = health;
        this.x = undefined;
        this.y = undefined;
        this.weapon = new Gun(80);
        this.weapon.speed = 8;
        setInterval(() => this.attack(), 500);
    }
    draw(x, y) {
        let cellsize = Math.floor(ctx.canvas.width / currentLevel.width);
        if (Math.floor(ctx.canvas.height / currentLevel.height) < Math.floor(ctx.canvas.width / currentLevel.width)) {
            cellsize = Math.floor(ctx.canvas.height / currentLevel.height);
        }
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.rect(x, y, this.width * cellsize, this.height * cellsize);
        ctx.fill();
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.rect(x - 10, y - 10, ((this.width * cellsize) + 20) * (this.currentHealth / this.health), 5);
        ctx.fill();
    }
    attack() {
        let cellsize = Math.floor(ctx.canvas.width / currentLevel.width);
        if (Math.floor(ctx.canvas.height / currentLevel.height) < Math.floor(ctx.canvas.width / currentLevel.width)) {
            cellsize = Math.floor(ctx.canvas.height / currentLevel.height);
        }
        let a2m = Math.atan2((this.y * cellsize) - player.y * cellsize, (this.x * cellsize) - player.x * cellsize) * 180 / Math.PI;
        //this.speed needs to be projectile speed
        this.weapon.fire(this.x, this.y, a2m, this);
    }
    damage(damage) {
        this.currentHealth -= damage;
        if (this.currentHealth <= 0) {
            this.currentHealth = 0;
            console.log("boss died");
        }
    }
}