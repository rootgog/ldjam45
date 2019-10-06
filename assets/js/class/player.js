import {
    ctx,
    deltaTime,
    mouse,
    currentLevel
} from "../game.js";
import {
    PlayableArea,
    Wall,
    Gun,
    WaterGun
} from "./mapEntities.js";
import Animation from "./animation.js";

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
        this.weapon = new WaterGun();
        document.addEventListener("keydown", this.keyDown.bind(this));
        document.addEventListener("keyup", this.keyUp.bind(this));
        document.addEventListener("click", this.click.bind(this));

        let frames = [];
        ["idle", 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17].forEach(frame => {
            let frameimg = new Image();
            frameimg.src = `./assets/sprites/player/walk_cycle/${frame}.png`;
            frames.push(frameimg);
        });
        this.spriteAnimation = new Animation(frames, 0.5);
    }
    click(e) {
        //check what is held in hand first
        let cellsize = Math.floor(ctx.canvas.width / currentLevel.width);
        if (Math.floor(ctx.canvas.height / currentLevel.height) < Math.floor(ctx.canvas.width / currentLevel.width)) {
            cellsize = Math.floor(ctx.canvas.height / currentLevel.height);
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
        if (this.right != 0 || this.up != 0) {
            this.spriteAnimation.start();
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
        if (this.right == 0 && this.up == 0) {
            this.spriteAnimation.stop();
        }
    }
    updatePosition() {
        let x = this.x;
        let y = this.y;
        this.x += this.right * deltaTime;
        this.y += this.up * deltaTime;
        let collisions = currentLevel.collisions(this);
        collisions.forEach(c => {
            if (c instanceof Wall) {
                this.x = x;
                this.y = y;
            }
        });

    }
    draw(x, y) {
        let cellsize = Math.floor(ctx.canvas.width / currentLevel.width);
        if (Math.floor(ctx.canvas.height / currentLevel.height) < Math.floor(ctx.canvas.width / currentLevel.width)) {
            cellsize = Math.floor(ctx.canvas.height / currentLevel.height);
        }
        ctx.translate((x + ((this.width * cellsize) / 2)), (y + ((this.height * cellsize) / 2)));
        let rotation = 0;

        if (this.up == this.speed) {
            //going down
            rotation = 0;
        }
        if (this.up == -this.speed) {
            //going up
            rotation = 180;
        }
        if (this.right == this.speed) {
            //going up
            rotation = 270;
        }
        if (this.right == -this.speed) {
            //going up
            rotation = 90;
        }

        ctx.rotate(rotation * Math.PI / 180);
        ctx.translate(-(x + ((this.width * cellsize) / 2)), -(y + ((this.height * cellsize) / 2)));
        ctx.drawImage(this.spriteAnimation.current(), x, y, this.width * cellsize, this.height * cellsize);
        ctx.resetTransform();
        ctx.restore();
    }
}