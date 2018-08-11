const game = new Phaser.Game(960, 540, Phaser.AUTO, 'phaser-example', {
    preload, create, update, render
});

function preload() {
    const img = (name) => `src/assets/${name}.png`;
    game.load.spritesheet('ogre', img('ogre'), 96/2, 72);
    game.load.spritesheet('player', img('player'), 64/2, 64);
    game.load.image('bg', img('bg'));
    game.load.spritesheet('elf', img('elf'), 64/2, 64);
    game.load.spritesheet('hobbit', img('hobbit'), 64/2, 32);
    game.load.spritesheet('usurper', img('usurper'), 64/2, 64);
    game.load.spritesheet('rebel', img('rebel'), 64/2, 64);
    game.load.spritesheet('goblin', img('goblin'), 64/2, 32);
}

let player;
let playerState = "stand"; // stand, climb, dead

let playerLevel = 0; // 0=top floor, 1=next floor down
let playerLevelTarget = 0;
const levelYs = [ 200, 325 ];
let ladderA;
let ladderB;
let gonnaClimb; // which ladder you're heading to climb

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.tileSprite(0, 0, 960, 540, 'bg');

    //  The hero!
    player = game.add.sprite(0, 0, 'player');
    player.anchor.setTo(0.5, 1);
    player.centerX = 300;
    player.centerY = levelYs[0];
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.inputEnabled = true;

    ladderA = game.add.sprite(320, 200, 'ogre');
    game.physics.enable(ladderA, Phaser.Physics.ARCADE);
    ladderA.body.setSize(8, 128, 20, 0);
    ladderA.inputEnabled = true;
    ladderB = game.add.sprite(860, 200, 'ogre');
    game.physics.enable(ladderB, Phaser.Physics.ARCADE);
    ladderB.body.setSize(8, 128, 20, 0);
    ladderB.inputEnabled = true;
}

function update() {
    const checkClickOnLadder = () => {
        [ladderA, ladderB].forEach((lad) => {
            // phaser doesn't support "did we click it this frame?"
            // so instead of tracking that shit for every object
            // we just make sure this click started no more than ~20ms ago
            // which means this will only be true for one frame (1f @60FPS = 16ms)
            if (lad.input.justPressed(0, 20)) {
                gonnaClimb = lad;
                playerState = "moveladder";
            }
        });
    };

    const moveToTargetLadder = () => {
        const direction = Math.sign(gonnaClimb.body.x - player.body.x);
        player.body.velocity.x = direction * 250;

        if (game.physics.arcade.intersects(gonnaClimb.body, player.body)) {
            playerLevelTarget = Math.abs(1 - playerLevel); // switch between 0 and 1
            player.body.velocity.x = 0;
            player.x = gonnaClimb.body.x;
            playerState = "climb";
            gonnaClimb = null;
        }
    };

    ({
        stand: () => {
            checkClickOnLadder();
        },
        moveladder: () => {
            moveToTargetLadder();
            checkClickOnLadder();
        },
        climb: () => {
            const climbDir = Math.sign(playerLevelTarget - playerLevel);
            player.body.velocity.y = climbDir * 200;

            // check if we just passed the level's Y coord
            const currY = player.body.y;
            const targetY = levelYs[playerLevelTarget];

            if (climbDir === 1 && currY >= targetY ||  // down
                climbDir === -1 && currY <= targetY ||
                climbDir === 0) { // up
                player.body.velocity.y = 0;
                player.body.y = targetY;
                playerLevel = playerLevelTarget;
                playerState = "stand";
            }
        },
    })[playerState]();
}

function render() {
    game.debug.body(player);
    game.debug.body(ladderA);
    game.debug.body(ladderB);
    game.debug.pixel(player.x, player.y, "#f00");
    game.debug.pixel(player.body.x, player.body.y, "#0f0");
    game.debug.pixel(player.centerX, player.centerY, "#00f");
}
