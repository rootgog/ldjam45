import Boss from "../class/boss.js";
import {
    PlayableArea,
    Wall,
    Gun,
    L1BossGun,
    WaterGunEntity,
    L2BossGun,
    PlasmaGunEntity
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

let l2bframeimg = new Image();
l2bframeimg.src = "./assets/sprites/boss/robot_boss/robot_boss_idle.png";

let l2BossAnim = new Animation([l2bframeimg], 0.4);

let Level1 = {
    boss: new Boss({
        height: 3,
        width: 4.5,
        health: 1000,
        weapon: new L1BossGun(),
        animation: l1Boss
    }),
    soundtrack: new Audio("./assets/audio/soundtrack/soundtrack_2.mp3"),
    map: () => {
        let b = Level1.boss;
        //s for space - Jack
        let s = new PlayableArea();

        let w = new Wall();

        let g = new WaterGunEntity();

        return new Map([
            [w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w],
            [w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, w, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, w, s, s, s, w, w, w, w, w, s, s, s, s, s, w],
            [w, s, s, s, s, w, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, w, s, s, s, s, s, s, g, s, s, s, s, s, s, w],
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
};

let level2 = {
    boss: new Boss({
        height: 3,
        width: 3,
        health: 10000,
        weapon: new L2BossGun(),
        animation: l2BossAnim,
        attackSpeed: 0.1
    }),
    soundtrack: new Audio("./assets/audio/soundtrack/soundtrack_1.mp3"),
    map: () => {
        let b = level2.boss;
        //s for space - Jack
        let s = new PlayableArea();

        let w = new Wall();

        let g = new PlasmaGunEntity();

        return new Map([
            [w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w],
            [w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, p, s, s, w],
            [w, s, s, s, s, w, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, w, s, s, s, w, w, w, w, w, s, s, s, s, s, w],
            [w, s, s, s, s, w, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, w, s, s, s, s, s, s, g, s, s, s, s, s, s, w],
            [w, s, s, s, s, w, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, w, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, w, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, s, s, s, b, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w]
        ]);
    }
};

export {
    Level1,
    level2
};