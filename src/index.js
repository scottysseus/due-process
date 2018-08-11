import createjs from 'createjs';
import Player from './Player';

const gameState = {
    testX: 50,
    testY: 50
};

const stage = new createjs.Stage("demoCanvas");
const player = new Player(stage, gameState);

function startup() {
    // stage.addEventListener("stagemousedown", mouseDown);
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", tick);

    player.startup();

    stage.update();
}

function tick(event) {
    const deltaS = event.delta / 1000;

    // update everything game related here.
    player.update(event);

	stage.update(event);
}

startup();
