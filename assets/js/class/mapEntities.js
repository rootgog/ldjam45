import {
    deltaTime,
    ctx,
    currentLevel,
    player,
    currentBoss
} from "../game.js";

export class PlayableArea {

}

export class Wall {
    constructor(texture) {
        var Wall_Texture = new Image();
        Wall_Texture.src = texture;
        this.texture = Wall_Texture;
    }
}

export class WaterGunEntity extends PlayableArea {
    constructor() {
        super();
        this.x = undefined;
        this.y = undefined;
        let image = new Image();
        image.src = "./assets/sprites/weapons/water_gun/water_gun_side.png";
        this.image = image;
        this.pickedUp = false;
        this.width = 1;
        this.height = 1;
    }
    draw(x, y) {
        let cellsize = Math.floor(ctx.canvas.width / currentLevel.width);
        if (Math.floor(ctx.canvas.height / currentLevel.height) < Math.floor(ctx.canvas.width / currentLevel.width)) {
            cellsize = Math.floor(ctx.canvas.height / currentLevel.height);
        }
        ctx.drawImage(this.image, x, y, this.width * cellsize, this.height * cellsize);
    }
}

export class PlasmaGunEntity extends PlayableArea {
    constructor() {
        super();
        this.x = undefined;
        this.y = undefined;
        let image = new Image();
        image.src = "./assets/sprites/weapons/plasma_gun/plasma_gun_side.png";
        this.image = image;
        this.pickedUp = false;
        this.width = 1;
        this.height = 1;
    }
    draw(x, y) {
        let cellsize = Math.floor(ctx.canvas.width / currentLevel.width);
        if (Math.floor(ctx.canvas.height / currentLevel.height) < Math.floor(ctx.canvas.width / currentLevel.width)) {
            cellsize = Math.floor(ctx.canvas.height / currentLevel.height);
        }
        ctx.drawImage(this.image, x, y, this.width * cellsize, this.height * cellsize);
    }
}

export class Projectile {
    constructor({
        x,
        y,
        dir,
        speed,
        sender,
        damage,
        image = null,
        width = 0.15,
        height = 0.15
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
        this.image = image;
        this.width = width;
        this.height = height;
    }
    updatePosition() {
        this.x -= this.speed.x * deltaTime;
        this.y -= this.speed.y * deltaTime;
    }
    draw(x, y) {
        let cellsize = Math.floor(ctx.canvas.width / currentLevel.width);
        if (Math.floor(ctx.canvas.height / currentLevel.height) < Math.floor(ctx.canvas.width / currentLevel.width)) {
            cellsize = Math.floor(ctx.canvas.height / currentLevel.height);
        }
        if (this.image == null) {
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.rect(x, y, this.width * cellsize, this.height * cellsize);
            ctx.fill();
        } else {
            ctx.drawImage(this.image, x, y, this.width * cellsize, this.height * cellsize);
        }
    }
}

export class Gun {
    constructor(damage, speed = 5) {
        this.damage = damage ? damage : 1;
        this.speed = speed;
    }
    fire(x, y, dir, sender) {
        currentLevel.entities.push(new Projectile({
            x,
            y,
            dir,
            speed: this.speed,
            sender,
            damage: this.damage,
            image: this.projectileImage,
            width: this.projectileWidth,
            height: this.projectileHeight
        }));
    }
    draw(x, y, rotation) {
        if (this instanceof PlasmaGun) {
            rotation = rotation + 180;
        }
        let cellsize = Math.floor(ctx.canvas.width / currentLevel.width);
        if (Math.floor(ctx.canvas.height / currentLevel.height) < Math.floor(ctx.canvas.width / currentLevel.width)) {
            cellsize = Math.floor(ctx.canvas.height / currentLevel.height);
        }
        ctx.translate((x + ((this.weaponWidth * cellsize) / 2)), (y + ((this.weaponHeight * cellsize) / 2)));
        ctx.rotate((rotation + 180) * Math.PI / 180);
        ctx.translate(-(x + ((this.weaponWidth * cellsize) / 2)), -(y + ((this.weaponHeight * cellsize) / 2)));
        ctx.drawImage(this.weaponImage, x, y - 10, this.weaponWidth * cellsize, this.weaponHeight * cellsize);
        ctx.resetTransform();
        ctx.restore();
    }
}

export class WaterGun extends Gun {
    constructor() {
        super(35, 5);
        this.shotSound = new Audio("./assets/audio/soundFx/Watergun.mp3");
        this.shotSound.volume = 0.5;
        let pimage = new Image();
        pimage.src = "./assets/sprites/projectiles/watersplash.png";
        this.projectileImage = pimage;
        let wimage = new Image();
        wimage.src = "./assets/sprites/weapons/water_gun/water_gun_top.png";
        this.weaponImage = wimage;
        this.weaponWidth = .4;
        this.weaponHeight = 1;
        this.projectileHeight = .4;
        this.projectileWidth = .4;
    }
    fire(x, y, dir, sender) {
        if (player.currentHealth > 0 && currentBoss.currentHealth > 0) {
            super.fire(x, y, dir, sender);
            let sound = this.shotSound.cloneNode();
            sound.play();
        }
    }
}

export class PlasmaGun extends Gun {
    constructor() {
        super(50, 5);
        this.shotSound = new Audio("./assets/audio/soundFx/plasma_2.mp3");
        this.shotSound.volume = 0.5;
        let pimage = new Image();
        pimage.src = "./assets/sprites/projectiles/player_plasma.png";
        this.projectileImage = pimage;
        let wimage = new Image();
        wimage.src = "./assets/sprites/weapons/plasma_gun/plasma_gun_top.png";
        this.weaponImage = wimage;
        this.weaponWidth = .4;
        this.weaponHeight = 1;
        this.projectileHeight = .4;
        this.projectileWidth = .4;
    }
    fire(x, y, dir, sender) {
        if (player.currentHealth > 0 && currentBoss.currentHealth > 0) {
            super.fire(x, y, dir, sender);
            let sound = this.shotSound.cloneNode();
            sound.play();
        }
    }
}

export class L1BossGun extends Gun {
    constructor() {
        super(10, 15);
        this.shotSound = new Audio("./assets/audio/soundFx/Fireball.mp3");
        let image = new Image();
        image.src = "./assets/sprites/projectiles/fireball.png";
        this.projectileImage = image;
        this.projectileHeight = .8;
        this.projectileWidth = .8;
    }
    fire(x, y, dir, sender) {
        if (player.currentHealth > 0 && currentBoss.currentHealth > 0) {
            super.fire(x, y, dir, sender);
            let sound = this.shotSound.cloneNode();
            sound.play();
        }
    }
}

export class L2BossGun extends Gun {
    constructor() {
        super(5, 10);
        this.shotSound = new Audio("./assets/audio/soundFx/plasma_1.mp3");
        let image = new Image();
        image.src = "./assets/sprites/projectiles/robot_plasma.png";
        this.projectileImage = image;
        this.projectileHeight = .3;
        this.projectileWidth = .3;
    }
    fire(x, y, dir, sender) {
        if (player.currentHealth > 0 && currentBoss.currentHealth > 0) {
            super.fire(x, y, dir, sender);
            let sound = this.shotSound.cloneNode();
            sound.volume = 0.1;
            sound.play();
        }
    }
}