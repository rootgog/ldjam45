import View from "./view.js";
import {
    gameloop,
    mainMenuScreen,
    ctx,
    canvas
} from "../game.js";
export default class MainMenu extends View {
    static draw() {
        super.draw();
        cancelAnimationFrame(gameloop)
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = "grey";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
        mainMenuScreen.draw();
    }
}