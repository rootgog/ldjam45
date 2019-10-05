import View from "./view.js";
import Map from "../class/map.js";
import Player from "../class/player.js";
import {
    PlayableArea,
    Wall
} from "../class/mapEntities.js";

let p = new Player({
    height: 20,
    width: 20
});

//s for space - Jack
let s = new PlayableArea();

let w = new Wall();


let level = new Map([
    [s, s, p, s],
    [w, s, s, w],
    [w, s, s, s],
    [s, s, s, w],
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
    p as player
}