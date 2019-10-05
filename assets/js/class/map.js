import {
    ctx
} from "../game.js";
import Player from "./player.js";
import {
    PlayableArea,
    Projectile,
    Wall
} from "./mapEntities.js";
import Boss from "./boss.js";

class Cell {
    constructor(x, y, value) {
        this.x = x;
        this.y = y;
        this.value = value;
    }
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
        //return array of collisions with node
        let collisions = [];
        for (let y = 0; y < this.map.length; y++) {
            const row = this.map[y];
            for (let x = 0; x < row.length; x++) {
                const cell = row[x];

                const canvasX = x * cellsize;
                const canvasY = y * cellsize;
                const nodeCanvasX = (node.x * cellsize);
                const nodeCanvasY = (node.y * cellsize);

                if (!(cell instanceof PlayableArea)) {
                    //could add instaceof circle rects for now

                    //if needs to prove nothing is residing indise
                    if (nodeCanvasX < canvasX + cellsize &&
                        nodeCanvasX + node.width * cellsize > canvasX &&
                        nodeCanvasY < canvasY + cellsize &&
                        nodeCanvasY + node.height * cellsize > canvasY) {
                        collisions.push(cell);
                    }
                }
            }
        }
        return collisions;
    }
    draw() {
        let cellsize = Math.floor(ctx.canvas.width / this.width);
        if (Math.floor(ctx.canvas.height / this.height) < Math.floor(ctx.canvas.width / this.width)) {
            cellsize = Math.floor(ctx.canvas.height / this.height);
        }
        for (let y = 0; y < this.map.length; y++) {
            const row = this.map[y];
            for (let x = 0; x < row.length; x++) {
                const cell = row[x];

                //x and y of cell avaliable
                const canvasX = x * cellsize;
                const canvasY = y * cellsize;
                if (cell instanceof PlayableArea) {
                    ctx.fillStyle = "grey";
                    ctx.beginPath();
                    ctx.rect(canvasX, canvasY, cellsize, cellsize);
                    ctx.fill();
                }
                if (cell instanceof Player || cell instanceof Boss) {
                    if (cell.x == undefined && cell.y == undefined) {
                        cell.x = x + 0.5; //could do with work
                        cell.y = y + 0.5;
                        this.entities.push(cell);
                    }
                }
            }
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
            if (e instanceof Projectile) {
                e.updatePosition();
                let collisions = this.collisions(e);
                if (collisions.length > 0) {
                    collisions.forEach(c => {
                        if (c instanceof Wall) {
                            //make projectile die
                            //add explosion entity in its place
                        } else {
                            newEntities.push(e);
                            e.draw(cellsize * e.x, cellsize * e.y);
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