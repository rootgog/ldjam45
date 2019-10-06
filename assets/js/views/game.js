import View from "./view.js";
import Map from "../class/map.js";
import Player from "../class/player.js";
import {
    PlayableArea,
    Wall
} from "../class/mapEntities.js";
import Boss from "../class/boss.js";
import HUD from "../class/hud.js";

let p = new Player({
    height: 1.2,
    width: 1.2,
    health: 100
});

let b = new Boss({
    height: 2,
    width: 2,
    health: 1000
});

let hud = new HUD();

//s for space - Jack
let s = new PlayableArea();

let w = new Wall();


let level = new Map([
    [w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w],
    [w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
    [w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
    [w, s, s, s, s, w, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
    [w, s, s, s, s, w, s, s, s, w, w, w, w, w, s, s, s, s, s, w],
    [w, s, s, s, s, w, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
    [w, s, s, s, s, w, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
    [w, s, s, s, s, w, s, s, p, s, s, s, s, s, s, s, s, s, s, w],
    [w, s, s, s, s, w, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
    [w, s, s, s, s, w, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
    [w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
    [w, s, s, s, s, s, s, s, s, s, s, s, s, s, b, s, s, s, s, w],
    [w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
    [w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
    [w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
    [w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
    [w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w]
]);

p.speed = level.height * 0.25;

export default class Game extends View {
    static draw() {
        super.draw();
        level.draw();
        hud.draw();
    }
}

export {
    p as player,
    level
}