import Game from "./views/game.js";
import Menu from "./views/menus.js";
import {
    Level1
} from "./views/levels.js";
import Player from "./class/player.js";

//canvas setup
let canvas = document.querySelector(".app > canvas");
let ctx = canvas.getContext('2d');

//var setup
let lastFrame = Date.now();
let deltaTime;
let mouse = {
    x: undefined,
    y: undefined
}

var Wall_Texture = new Image();
Wall_Texture.src = "./assets/textures/Wall_Texture.png";


document.addEventListener('mousemove', e => {
    var rect = canvas.getBoundingClientRect();
    mouse.x = (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
    mouse.y = (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
});

let player = new Player({
    height: 1.2,
    width: 1.2,
    health: 100
});

let currentMap = Level1;

let currentLevel = currentMap.map();
let currentBoss = currentMap.boss;

let view = Game;

//start gameloop
let gameloop;
let deathScreen;

window.onload = (e) => {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    let cellsize = Math.floor(ctx.canvas.width / currentLevel.width);
    if (Math.floor(ctx.canvas.height / currentLevel.height) < Math.floor(ctx.canvas.width / currentLevel.width)) {
        cellsize = Math.floor(ctx.canvas.height / currentLevel.height);
    }
    deathScreen = new Menu();
    deathScreen.addBtn({
        x: currentLevel.width / 2 * cellsize - 75,
        y: currentLevel.height / 2 * cellsize - 25,
        height: 50,
        width: 150,
        text: "restart",
        clickHandler: () => {
            player.currentHealth = 100;
            player.x = undefined;
            player.y = undefined;
            currentBoss.x = undefined;
            currentBoss.y = undefined;
            currentLevel.entities = [];
            renderFrame();
        },
        style: {
            background: "green"
        }
    });
    deathScreen.addText({
        x: currentLevel.width / 2 * cellsize - 75,
        y: currentLevel.height / 2 * cellsize - 25,
        width: 300,
        font: "54px Arial",
        text: "You Died!"
    });
    renderFrame();
}

function renderFrame() {
    gameloop = requestAnimationFrame(renderFrame);
    //set canvas size
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    //calc vars
    deltaTime = (Date.now() - lastFrame) / 1000;
    lastFrame = Date.now();

    //start rendering view
    view.draw();
}

export {
    ctx,
    canvas,
    deltaTime,
    gameloop,
    mouse,
    view,
    Wall_Texture,
    deathScreen,
    currentLevel,
    player
};