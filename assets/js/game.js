import Game from "./views/game.js";

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
document.addEventListener('mousemove', e => {
    var rect = canvas.getBoundingClientRect();
    mouse.x = (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
    mouse.y = (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
});

let view = Game;

//start gameloop
let gameloop = requestAnimationFrame(renderFrame);

function renderFrame() {

    //set canvas size
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    //calc vars
    deltaTime = (Date.now() - lastFrame) / 1000;
    lastFrame = Date.now();

    //start rendering view
    view.draw();

    gameloop = requestAnimationFrame(renderFrame);
}

export {
    ctx,
    canvas,
    deltaTime,
    gameloop,
    mouse,
    view
};