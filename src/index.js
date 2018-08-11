import createjs from 'createjs';
import Player from './Player';
import Level from './Level';

class Game {
    // gameState;
    // loader;
    // stage;
    // level;
    // player;

    startup() {
        this.gameState = {
            testX: 50,
            testY: 50
        };
        this.stage = new createjs.Stage("demoCanvas");

        const manifest = [
            { src: "bg.png", id: "bg" }
        ];

        this.loader = new createjs.LoadQueue(true);
        console.log("loading");
        this.loader.addEventListener("complete", () => {
            console.log("loaded");

            this.level = new Level(this);
            this.player = new Player(this);

            this.level.startup(this.loader.getResult("bg"));
            this.player.startup();

            createjs.Ticker.timingMode = createjs.Ticker.RAF;
            createjs.Ticker.addEventListener("tick", this.tick.bind(this));
        });
        this.loader.loadManifest(manifest, true, "../src/assets/")
    }

    tick(event) {
        const deltaS = event.delta / 1000;

        // update everything game related here.
        this.level.update(event);
        this.player.update(event);

        this.stage.update(event);
    }
}

const g = new Game();
g.startup();
