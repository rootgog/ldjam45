import {
    Player
} from "../class/canvasElement.js";
import View from "./view.js";

let player = new Player({
    x: 30,
    y: 30,
    height: 200,
    width: 300
});

export default class Game extends View {
    static draw() {
        super.draw();
        player.draw();
        player.x++;
        player.y++;
    }
}