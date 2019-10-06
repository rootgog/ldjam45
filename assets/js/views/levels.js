import Boss from "../class/boss.js";
import {
    PlayableArea,
    Wall,
    Gun,
    L1BossGun
} from "../class/mapEntities.js";
import Map from "../class/map.js";
import {
    player as p
} from "../game.js";
import Animation from "../class/animation.js";

let frames = [];
["idle", 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(frame => {
    let frameimg = new Image();
    frameimg.src = `./assets/sprites/boss/cave_boss/${frame}.png`;
    frames.push(frameimg);
});
let l1Boss = new Animation(frames, 0.5);

let Level1 = {
    boss: new Boss({
        height: 3,
        width: 4.5,
        health: 1000,
        weapon: new L1BossGun(),
        animation: l1Boss
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