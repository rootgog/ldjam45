import {
    ctx,
    canvas
} from "../game.js";

export default class View {
    static draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}