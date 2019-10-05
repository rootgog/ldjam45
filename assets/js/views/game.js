import View from "./view.js";
import Map from "../class/map.js";
import Player from "../class/player.js";
import {
    PlayableArea,
    Wall
} from "../class/mapEntities.js";

let p = new Player({
    height: 60,
    width: 50
});

//s for space - Jack
let s = new PlayableArea();

let w = new Wall();


let level = new Map([
    [s, s, s, s],
    [w, s, s, w],
    [w, s, s, s],
    [s, p, s, w],
    [w, s, s, s],
    [w, s, s, w]
]);

export default class Game extends View {
    static draw() {
        super.draw();
        level.draw();
    }
}

export {
    p as player,
    level
}