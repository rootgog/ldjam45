import {
    ctx,
    mouse,
    currentMenu
} from "../game.js";

export default class Menu {
    constructor() {
        this.buttons = [];
        this.text = [];
        document.addEventListener("click", this.click.bind(this));
    }
    click() {
        this.buttons.forEach(element => {
            if (element.x <= mouse.x && mouse.x <= element.x + element.width &&
                element.y <= mouse.y && mouse.y <= element.y + element.height) {
                element.clickHandler();
            }
        });
    }
    draw() {
        this.buttons.forEach(element => {
            ctx.fillStyle = element.style.background;
            ctx.beginPath();
            ctx.rect(element.x, element.y, element.width, element.height);
            ctx.fill();
            ctx.font = "20px Arial";
            ctx.textAlign = "center";
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.fillText(element.text, element.x + element.width / 2, element.y + element.height / 2, element.width);
        });
        this.text.forEach(element => {
            ctx.font = element.font;
            ctx.textAlign = "center";
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.fillText(element.text, element.x + element.width / 4, element.y / 2, element.width);
        });
    }
    addBtn({
        x,
        y,
        height,
        width,
        text,
        clickHandler,
        style: {
            background
        }
    }) {
        this.buttons.push({
            x,
            y,
            height,
            width,
            text,
            clickHandler,
            style: {
                background
            }
        });
    }
    addText({
        x,
        y,
        text,
        width,
        font
    }) {
        this.text.push({
            x,
            y,
            text,
            width,
            font
        });
    }
}