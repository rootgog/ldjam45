import Game from "./views/game.js";
import Menu from "./views/menus.js";
import {
    Level1,
    level2
} from "./views/levels.js";
import Player from "./class/player.js";
import MainMenu from "./views/mainmenu.js";

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

let levelindex = 0;

let levelsArr = [Level1, level2];

let currentLevel = levelsArr[levelindex].map();
let currentBoss;

let view = MainMenu;

//start gameloop
let gameloop;
let deathScreen;
let winScreen;
let mainMenuScreen;
let currentMenu;
let gameComplete;
let soundtrack;

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
            player.weapon = null;
            currentBoss.x = undefined;
            currentBoss.y = undefined;
            //set watergun to undefined x,y and pickedup to false
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

    winScreen = new Menu();
    winScreen.addBtn({
        x: currentLevel.width / 2 * cellsize - 75,
        y: currentLevel.height / 2 * cellsize - 25,
        height: 50,
        width: 150,
        text: "replay",
        clickHandler: () => {
            player.currentHealth = 100;
            player.x = undefined;
            player.y = undefined;
            currentBoss.currentHealth = currentBoss.health;
            currentBoss.x = undefined;
            currentBoss.y = undefined;
            currentLevel = levelsArr[levelindex].map();
            currentLevel.entities = [];
            renderFrame();
        },
        style: {
            background: "green"
        }
    });
    winScreen.addBtn({
        x: currentLevel.width / 2 * cellsize - 75,
        y: currentLevel.height / 2 * cellsize - 125,
        height: 50,
        width: 150,
        text: "next Level",
        clickHandler: () => {
            if (view == Game && levelindex < levelsArr.length - 1) {
                player.currentHealth = 100;
                player.x = undefined;
                player.y = undefined;
                player.weapon = null;
                levelindex++;

                if (levelindex == levelsArr.length) {
                    levelindex = 0;
                    view = MainMenu;
                } else {
                    currentLevel = levelsArr[levelindex].map();
                    currentBoss = levelsArr[levelindex].boss;
                    currentBoss.x = undefined;
                    currentBoss.y = undefined;
                    currentLevel.entities = [];
                    soundtrack = levelsArr[levelindex].soundtrack;
                }
                renderFrame();
            }
        },
        style: {
            background: "green"
        }
    });
    winScreen.addText({
        x: currentLevel.width / 2 * cellsize - 75,
        y: currentLevel.height / 2 * cellsize - 25,
        width: 300,
        font: "54px Arial",
        text: "Success!"
    });

    mainMenuScreen = new Menu();
    mainMenuScreen.addBtn({
        x: currentLevel.width / 2 * cellsize - 75,
        y: currentLevel.height / 2 * cellsize - 125,
        height: 50,
        width: 150,
        text: "Play!",
        clickHandler: () => {
            if (view == MainMenu) {
                currentLevel = levelsArr[levelindex].map();
                currentBoss = levelsArr[levelindex].boss;
                view = Game;
                renderFrame();
            }
        },
        style: {
            background: "green"
        }
    });
    mainMenuScreen.addText({
        x: currentLevel.width / 2 * cellsize - 125,
        y: currentLevel.height / 2 * cellsize - 25,
        width: 500,
        font: "54px Arial",
        text: "Ludum Dare 45"
    });

    gameComplete = new Menu();
    gameComplete.addBtn({
        x: currentLevel.width / 2 * cellsize - 75,
        y: currentLevel.height / 2 * cellsize - 125,
        height: 50,
        width: 150,
        text: "MainMenu",
        clickHandler: () => {
            if (view == Game && levelindex + 1 == levelsArr.length && currentBoss.currentHealth == 0) {
                levelindex = 0;
                view = MainMenu;
                renderFrame();
            }
        },
        style: {
            background: "green"
        }
    });
    gameComplete.addText({
        x: currentLevel.width / 2 * cellsize - 125,
        y: currentLevel.height / 2 * cellsize - 25,
        width: 500,
        font: "54px Arial",
        text: "Game Finished \n Thanks for playing! \n This was our first game jam and the code is very messy since evrything was created from scratch \n Programmer: George Bishop \n Designer: Jack Stalker"
    });

    currentMenu = mainMenuScreen;
    soundtrack = levelsArr[levelindex].soundtrack;
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
    mainMenuScreen,
    winScreen,
    currentLevel,
    currentBoss,
    currentMenu,
    player,
    levelindex,
    levelsArr,
    gameComplete,
    soundtrack
};