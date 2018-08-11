import createjs from 'createjs';

class Player {
    constructor(stage, gameState) {
        this.stage = stage;
        this.gameState = gameState;
    }

    startup() {
        let circle = new createjs.Shape();
        circle.graphics.beginFill("red").drawCircle(0, 0, 40);
        circle.x = this.gameState.testX;
        circle.y = this.gameState.testY;
        circle.addEventListener("click", this.click);
        this.stage.addChild(circle);
    }

    update() {

    }

    click(event) {
        console.log(event);
    }
}


export default Player;
