import Boss from "../class/boss.js";
import {
    PlayableArea,
    Wall
} from "../class/mapEntities.js";
import Map from "../class/map.js";
import {
    player as p
} from "../game.js";

let Level1 = {
    boss: new Boss({
        height: 2,
        width: 2,
        health: 1000
    }),
    map: () => {
        let b = Level1.boss;
        //s for space - Jack
        let s = new PlayableArea();

        let w = new Wall();

        return new Map([
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
    }
}

export {
    Level1
}