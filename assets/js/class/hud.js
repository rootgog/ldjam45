import {
    ctx,
    currentLevel,
    player
} from "../game.js";

export default class HUD {
    draw() {
        //health
        let cellsize = Math.floor(ctx.canvas.width / currentLevel.width);
        if (Math.floor(ctx.canvas.height / currentLevel.height) < Math.floor(ctx.canvas.width / currentLevel.width)) {
            cellsize = Math.floor(ctx.canvas.height / currentLevel.height);
        }
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.rect(currentLevel.width * cellsize - 220, currentLevel.height * cellsize - 30, 200 * (player.currentHealth / player.health), 20);
        ctx.fill();
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.fillText("HEALTH", currentLevel.width * cellsize - 120, currentLevel.height * cellsize - 13, 200);
    } //maybe heath above head
}