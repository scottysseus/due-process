import createjs from 'createjs';

class Player {
    constructor(game) {
        this.game = game;
    }

    startup() {
        let circle = new createjs.Shape();
        circle.graphics.beginFill("red").drawCircle(0, 0, 40);
        circle.x = this.game.gameState.testX;
        circle.y = this.game.gameState.testY;
        circle.addEventListener("click", this.click);
        this.game.stage.addChild(circle);
    }

    update() {

    }

    click(event) {
    }
}


export default Player;
