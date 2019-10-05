import {
    ctx,
    deltaTime,
    mouse
} from "../game.js";
import {
    PlayableArea,
    Wall,
    Gun
} from "./mapEntities.js";
import {
    level
} from "../views/game.js";

export default class Player extends PlayableArea {
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
        this.speed = 6.5;
        this.up = 0;
        this.right = 0;
        this.weapon = new Gun();
        document.addEventListener("keydown", this.keyDown.bind(this));
        document.addEventListener("keyup", this.keyUp.bind(this));
        document.addEventListener("click", this.click.bind(this));
    }
    click(e) {
        //check what is held in hand first
        let cellsize = Math.floor(ctx.canvas.width / level.width);
        if (Math.floor(ctx.canvas.height / level.height) < Math.floor(ctx.canvas.width / level.width)) {
            cellsize = Math.floor(ctx.canvas.height / level.height);
        }
        let a2m = Math.atan2((this.y * cellsize) - mouse.y, (this.x * cellsize) - mouse.x) * 180 / Math.PI;
        //this.speed needs to be projectile speed
        this.weapon.fire(this.x + 0.6, this.y + 0.9, a2m, this);

    }
    damage(damage) {
        this.currentHealth -= damage;
        if (this.currentHealth <= 0) {
            this.currentHealth = 0;
            console.log("YOU DIED NOOB");
        }
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
        let cellsize = Math.floor(ctx.canvas.width / level.width);
        if (Math.floor(ctx.canvas.height / level.height) < Math.floor(ctx.canvas.width / level.width)) {
            cellsize = Math.floor(ctx.canvas.height / level.height);
        }
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.rect(x, y, this.width * cellsize, this.height * cellsize);
        ctx.fill();
    }
}