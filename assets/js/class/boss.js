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
        health,
        weapon = new Gun(80),
        animation,
        attackSpeed = 1
    }) {
        super();
        this.height = height;
        this.width = width;
        this.health = health;
        this.currentHealth = health;
        this.x = undefined;
        this.y = undefined;
        this.weapon = weapon;
        this.spriteAnimation = animation;
        this.attackSpeed = attackSpeed;
        this.attackCycle = setInterval(() => this.attack(), attackSpeed * 1000);
    }
    draw(x, y) {
        if (this.attackCycle == null) {
            this.attackCycle = setInterval(() => this.attack(), this.attackSpeed * 1000);
        }
        let cellsize = Math.floor(ctx.canvas.width / currentLevel.width);
        if (Math.floor(ctx.canvas.height / currentLevel.height) < Math.floor(ctx.canvas.width / currentLevel.width)) {
            cellsize = Math.floor(ctx.canvas.height / currentLevel.height);
        }
        ctx.drawImage(this.spriteAnimation.current(), x, y, this.width * cellsize, this.height * cellsize);
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.rect(x - 10, y - 10, ((this.width * cellsize) + 20) * (this.currentHealth / this.health), 5);
        ctx.fill();
    }
    attack() {
        if (this.x !== undefined && this.y !== undefined) {
            let cellsize = Math.floor(ctx.canvas.width / currentLevel.width);
            if (Math.floor(ctx.canvas.height / currentLevel.height) < Math.floor(ctx.canvas.width / currentLevel.width)) {
                cellsize = Math.floor(ctx.canvas.height / currentLevel.height);
            }
            //dir needs to be calc from center of body
            let a2m = Math.atan2((this.y * cellsize + ((this.height * cellsize) / 2)) - player.y * cellsize, (this.x * cellsize + ((this.width * cellsize) / 2)) - player.x * cellsize) * 180 / Math.PI;
            //this.speed needs to be projectile speed
            this.weapon.fire(this.x + this.width / 2, this.y + this.height / 2, a2m, this);
        }
    }
    damage(damage) {
        this.currentHealth -= damage;
        if (this.currentHealth <= 0) {
            this.currentHealth = 0;
            clearInterval(this.attackCycle);
            this.attackCycle = null;
        }
    }
}