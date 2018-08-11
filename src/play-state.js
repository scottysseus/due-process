export default function playState(game) {
    let player;
    let playerState = "stand"; // stand, climb, dead

    let playerLevel = 0; // 0=top floor, 1=next floor down
    let playerLevelTarget = 0;
    const levelYs = [ 200+32, 325+32 ];
    let ladderA;
    let ladderB;
    let gonnaClimb; // which ladder you're heading to climb
    let amClimb; // currently climbing

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



    function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.add.tileSprite(0, 0, 960, 540, 'bg');

        //  The hero!
        player = game.add.sprite(0, 0, 'player');
        player.anchor.setTo(0.5, 1);
        player.x = 300;
        player.y = levelYs[0];
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
            const direction = Math.sign(gonnaClimb.body.x - player.x);
            player.body.velocity.x = direction * 250;

            if (game.physics.arcade.intersects(gonnaClimb.body, player.body)) {
                playerLevelTarget = Math.abs(1 - playerLevel); // switch between 0 and 1
                player.body.velocity.x = 0;
                playerState = "climb";
                amClimb = gonnaClimb;
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
                player.x = amClimb.centerX;

                // check if we just passed the level's Y coord
                const currY = player.y;
                const targetY = levelYs[playerLevelTarget];

                if (climbDir === 1 && currY >= targetY ||  // down
                    climbDir === -1 && currY <= targetY ||
                    climbDir === 0) { // up
                    player.body.velocity.y = 0;
                    player.y = targetY;
                    playerLevel = playerLevelTarget;
                    playerState = "stand";
                    amClimb = null;
                }
            },
        })[playerState]();
    }

    function render() {
        // game.debug.body(player);
        // game.debug.body(ladderA);
        // game.debug.body(ladderB);
        game.debug.pixel(50, levelYs[0], "#f0f");
        game.debug.pixel(50, levelYs[1], "#f0f");
        game.debug.pixel(player.x+0.5, player.y+0.5, "red");
        game.debug.text(playerState, player.x - 64, player.y - 64, "rebeccapurple");
    }

    return {preload, create, update, render};
}
