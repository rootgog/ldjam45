import {
    ctx,
    soundtrack,
    levelsArr,
    levelindex
} from "../game.js";
import Player from "./player.js";
import {
    PlayableArea,
    Projectile,
    Wall,
    WaterGunEntity,
    PlasmaGunEntity
} from "./mapEntities.js";
import Boss from "./boss.js";

function rectCollision(rect1, rect2) {
    if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y) {
        return true;
    }
    return false;
}
export default class Map {
    constructor(map) {
        this.map = map;
        this.width = map[0].length;
        this.height = map.length;
        this.entities = [];
    }
    collisions(node) {
        let cellsize = Math.floor(ctx.canvas.width / this.width);
        if (Math.floor(ctx.canvas.height / this.height) < Math.floor(ctx.canvas.width / this.width)) {
            cellsize = Math.floor(ctx.canvas.height / this.height);
        }
        let nodeParams = {
            x: node.x * cellsize,
            y: node.y * cellsize,
            width: node.width * cellsize,
            height: node.height * cellsize
        }
        //return array of collisions with node
        let collisions = [];
        for (let y = 0; y < this.map.length; y++) {
            const row = this.map[y];
            for (let x = 0; x < row.length; x++) {
                const cell = row[x];
                if (cell != node) {
                    let cellParams = {
                        x: x * cellsize,
                        y: y * cellsize,
                        width: cellsize,
                        height: cellsize
                    }
                    if (!(cell instanceof PlayableArea)) {
                        if (rectCollision(nodeParams, cellParams)) {
                            collisions.push(cell);
                        }
                    }
                }
            }
        }
        this.entities.forEach(e => {
            let cellParams = {
                x: e.x * cellsize,
                y: e.y * cellsize,
                width: e.width * cellsize,
                height: e.height * cellsize
            }
            //if needs to prove nothing is residing indise
            //this is broken fires loads of times?
            if (!(e.constructor == node.constructor)) {
                if (rectCollision(nodeParams, cellParams)) {
                    if (node.hasOwnProperty("sender")) {
                        if (node.sender.constructor != e.constructor) {
                            collisions.push(e);
                        }
                    } else {
                        collisions.push(e);
                    }
                }
            }
        });

        return collisions;
    }
    draw() {
        let cellsize = Math.floor(ctx.canvas.width / this.width);
        if (Math.floor(ctx.canvas.height / this.height) < Math.floor(ctx.canvas.width / this.width)) {
            cellsize = Math.floor(ctx.canvas.height / this.height);
        }
        ctx.drawImage(levelsArr[levelindex].background, 0, 0, this.width * cellsize, this.height * cellsize);
        for (let y = 0; y < this.map.length; y++) {
            const row = this.map[y];
            for (let x = 0; x < row.length; x++) {
                const cell = row[x];

                //x and y of cell avaliable
                const canvasX = x * cellsize;
                const canvasY = y * cellsize;
                if (cell instanceof PlayableArea) {
                    /*ctx.fillStyle = "grey";
                    ctx.beginPath();
                    ctx.rect(canvasX, canvasY, cellsize, cellsize);
                    ctx.fill();*/
                }
                if (cell instanceof Player || cell instanceof Boss || cell instanceof WaterGunEntity || cell instanceof PlasmaGunEntity) {
                    if (cell.x == undefined && cell.y == undefined) {
                        cell.x = x + 0.5; //could do with work
                        cell.y = y + 0.5;
                        this.entities.push(cell);
                    }
                }
                if (cell instanceof Wall) {
                    ctx.drawImage(cell.texture, canvasX, canvasY, cellsize, cellsize);
                }
            }
            soundtrack.loop = true;
            soundtrack.play();
        }
        let newEntities = [];
        this.entities.forEach(e => {
            if (e instanceof Player) {
                e.updatePosition();
                e.draw(cellsize * e.x, cellsize * e.y);
                newEntities.push(e);
            }
            if (e instanceof Boss) {
                e.draw(cellsize * e.x, cellsize * e.y);
                newEntities.push(e);
            }
            if (e instanceof WaterGunEntity) {
                if (!e.pickedUp) {
                    e.draw(cellsize * e.x, cellsize * e.y);
                    newEntities.push(e);
                }
            }
            if (e instanceof PlasmaGunEntity) {
                if (!e.pickedUp) {
                    e.draw(cellsize * e.x, cellsize * e.y);
                    newEntities.push(e);
                }
            }
            if (e instanceof Projectile) {
                e.updatePosition();
                let collisions = this.collisions(e);
                if (collisions.length > 0) {
                    collisions.forEach(c => {
                        if (c instanceof Wall) {
                            //make projectile die
                            //add explosion entity in its place
                        } else if (c instanceof Player) {
                            c.damage(e.damage);
                        } else if (c instanceof Boss) {
                            c.damage(e.damage);
                        } else {
                            newEntities.push(e);
                            e.draw(e.x * cellsize, e.y * cellsize);
                        }
                    });
                } else {
                    newEntities.push(e);
                    e.draw(cellsize * e.x, cellsize * e.y);
                }
            }
        });
        this.entities = newEntities;
    }
}