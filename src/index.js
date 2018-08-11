import createjs from 'createjs';

const stage = new createjs.Stage("demoCanvas");

const gameState = {
    testX: 50,
    testY: 50
};

function startup() {
    stage.addEventListener("stagemousedown", mouseDown);
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", tick);

    let circle = new createjs.Shape();
    circle.graphics.beginFill("red").drawCircle(0, 0, 40);
    circle.x = gameState.testX;
    circle.y = gameState.testY;
    stage.addChild(circle);
    stage.update();
}

function tick(event) {
    const deltaS = event.delta / 1000;
    // update everything game related here.
	stage.update(event);
}

function mouseDown(event) {
    console.log(event);
}


startup();
