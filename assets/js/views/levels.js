import Boss from "../class/boss.js";
import {
    PlayableArea,
    Wall,
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

let l1bg = new Image();
l1bg.src = "./assets/sprites/backgrounds/round_1_background.png";

let l2bg = new Image();
l2bg.src = "./assets/sprites/backgrounds/round_2_background.png";

let Level1 = {
    boss: new Boss({
        height: 3,
        width: 4.5,
        health: 2000,
        weapon: new L1BossGun(),
        animation: l1Boss,
        attackSpeed: 0.4
    }),
    soundtrack: new Audio("./assets/audio/soundtrack/soundtrack_2.mp3"),
    background: l1bg,
    map: () => {
        let b = Level1.boss;
        //s for space - Jack
        let s = new PlayableArea();

        let w = new Wall("./assets/textures/Wall_Texture.png");

        let g = new WaterGunEntity();

        return new Map([
            [w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w],
            [w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w, w, w, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, w, s, s, s, s, s, s, b, s, s, s, s, s, s, s, s, s, w, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, w, s, s, s, s, s, s, s, s, s, s, s, s, g, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, s, s, s, s, s, s, s, w, s, s, s, w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w, s, w, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w, s, s, s, w, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w, w, w, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, p, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w]
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
    background: l2bg,
    map: () => {
        let b = level2.boss;
        //s for space - Jack
        let s = new PlayableArea();

        let w = new Wall("./assets/textures/Crate_Texture.png");

        let g = new PlasmaGunEntity();

        return new Map([
            [w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w],
            [w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w, w, w, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, w, s, s, s, s, s, s, s, s, s, s, s, b, s, s, s, s, w, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, g, s, s, s, s, s, s, w],
            [w, s, s, s, s, w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, s, s, s, s, s, s, s, w, w, w, w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, p, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, s, w],
            [w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w]
        ]);
    }
};

export {
    Level1,
    level2
};