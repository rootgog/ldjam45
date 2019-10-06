import View from "./view.js";
import HUD from "../class/hud.js";
import {
    canvas,
    ctx,
    gameloop,
    deathScreen,
    currentLevel,
    player
} from "../game.js";

let hud = new HUD();

//p.speed = currentLevel.height * 0.25;

export default class Game extends View {
    static draw() {
        super.draw();
        currentLevel.draw();
        hud.draw();
        if (player.currentHealth == 0) {
            ctx.globalAlpha = 0.5;
            ctx.fillStyle = "grey";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.globalAlpha = 1;
            cancelAnimationFrame(gameloop);
            deathScreen.draw();
        }
    }
}