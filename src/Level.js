import createjs from 'createjs';

class Level {
    constructor(game) {
        this.game = game;
    }

    startup(image) {
        this.bg = new createjs.Bitmap(image);
        const bg = this.bg; // grr
        bg.x = bg.y = 0;

        bg.addEventListener("click", this.click.bind(this));
        this.game.stage.addChild(bg);
    }

    update() {

    }

    click(event) {
        if (event.target !== this.bg) return;
        console.log("You clicked on the background and nothing else");
        // clicked the background, move the player or something
    }
}


export default Level;
