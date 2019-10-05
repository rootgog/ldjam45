import {
    ctx
} from "../game.js";
import Player from "./player.js";
import {
    PlayableArea
} from "./mapEntities.js";

export default class Map {
    constructor(map) {
        this.map = map;
        this.width = map[0].length;
        this.height = map.length;
        this.entities = [];
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
                if (cell instanceof Player) {
                    if (cell.x == undefined && cell.y == undefined) {
                        cell.x = x + 0.5; //could do with work
                        cell.y = y + 0.5;
                        this.entities.push(cell);
                    }
                }
            }
        }
        this.entities.forEach(e => {
            if (e instanceof Player) {
                e.updatePosition();
                e.draw(cellsize * e.x, cellsize * e.y);
            }
        })
    }
}