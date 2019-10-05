import {
    ctx
} from "../game.js";
import {
    level,
    player
} from "../views/game.js";

export default class HUD {
    draw() {
        //health
        let cellsize = Math.floor(ctx.canvas.width / level.width);
        if (Math.floor(ctx.canvas.height / level.height) < Math.floor(ctx.canvas.width / level.width)) {
            cellsize = Math.floor(ctx.canvas.height / level.height);
        }
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.rect(level.width * cellsize - 220, level.height * cellsize - 30, 200 * (player.currentHealth / player.health), 20);
        ctx.fill();
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.fillText("HEALTH", level.width * cellsize - 120, level.height * cellsize - 13, 200);
    } //maybe heath above head
}