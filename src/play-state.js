export default function playState(game) {
    let player;
    let playerState = "stand"; // stand, climb, dead

    let playerLevel = 0; // 0=top floor, 1=next floor down
    let playerLevelTarget = 0;
    const levelYs = [ 175, 330 ];
    const prisonerSpawnX = 200;
    let ladderA;
    let ladderB;
    let gonnaClimb; // which ladder you're heading to climb
    let amClimb; // currently climbing
    let prisoners = []; // every prisoner, regardless of their `state`, lives here
    const races = [ 'elf', 'hobbit', 'usurper', 'rebel', 'goblin', 'ogre' ];

    function preload() {
        const img = (name) => `src/assets/${name}.png`;
        game.load.spritesheet('ogre', img('ogre'), 96/2, 72);
        game.load.spritesheet('player', img('player'), 64/2, 64);
        game.load.image('bg', img('bgfull'));
        game.load.spritesheet('elf', img('elf'), 64/2, 64);
        game.load.spritesheet('hobbit', img('hobbit'), 64/2, 32);
        game.load.spritesheet('usurper', img('usurper'), 64/2, 64);
        game.load.spritesheet('rebel', img('rebel'), 64/2, 64);
        game.load.spritesheet('goblin', img('goblin'), 64/2, 32);
        game.load.spritesheet('ladder', img('ladder'), 96/2, 72);
    }

    function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.add.tileSprite(0, 0, 960, 540, 'bg');

        // the player
        player = game.add.sprite(0, 0, 'player');
        player.anchor.setTo(0.5, 1);
        player.x = 300;
        player.y = levelYs[0];
        player.inputEnabled = true;

        // ladders
        ladderA = game.add.sprite(330, 135, 'ladder');
        // ladderA.height = 180;
        ladderA.inputEnabled = true;
        ladderB = game.add.sprite(900, 135, 'ladder');
        ladderB.height = 180;
        ladderB.inputEnabled = true;

        space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        debug = game.input.keyboard.addKey(Phaser.Keyboard.D);
    }

    function newPrisoner() {
        // pick random race
        const race = races[Math.floor(Math.random() * races.length)];
        let prisoner = game.add.sprite(prisonerSpawnX, levelYs[0], race);
        prisoners.push(prisoner);
        prisoner.race = race;
        prisoner.state = 'entering'; // entering, waitingroom
        prisoner.anchor.setTo(0.5, 1);
        prisoner.inputEnabled = true;
    }

    let debug;
    let lastDebug = false;
    let space;
    let lastSpace = false;

    function update() {
        if (debug.isDown && !lastDebug) {
            debugger;
        }
        // if (Math.random() * 100 > 99) {
        if (space.isDown && !lastSpace) {
            newPrisoner();
        }

        const isIntersect = (a, b) => {
            return Phaser.Rectangle.intersects(a.getBounds(), b.getBounds());
        }

        /** if `you` intersects with anything in the array,
         * return the first thing in the `arrayOfThings` that is intersecting.
         * else null.
         */
        const intersectsAny = (arrayOfThings, you) => {
            for (let thing of arrayOfThings) {
                if (thing === you) {
                    // can't collide with yourself
                    continue;
                }
                if (Math.abs(thing.x - you.x) < 20) {
                    // debugger;
                }
                if (isIntersect(thing, you)) {
                    return thing;
                }
            }
            return null;
        };

        const moveForwardInLine = (prisoners, prisoner) => {
            if (isIntersect(prisoner, ladderA) ||
                intersectsAny(prisoners, prisoner)) {
                prisoner.state = 'waitingroom';
            } else {
                prisoner.state = 'entering';
                prisoner.x += 200/60;
            }
        }

        prisoners.forEach((prisoner, idx) => {
            ({
                entering: () => {
                    moveForwardInLine(prisoners, prisoner);
                },
                waitingroom: () => {
                    moveForwardInLine(prisoners, prisoner);
                }
            })[prisoner.state]();
        });

        const checkClickOnPrisoner = () => {
            prisoners.forEach((pris, idx) => {
                if (pris.input.justPressed(0, 20)) {
                    pris.destroy();
                    prisoners.splice(idx, 1);
                }
            });
        };


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
            const direction = Math.sign(gonnaClimb.x - player.x);
            player.x += direction * 250/60;

            if (isIntersect(gonnaClimb, player)) {
                playerLevelTarget = Math.abs(1 - playerLevel); // switch between 0 and 1
                playerState = "climb";
                amClimb = gonnaClimb;
                gonnaClimb = null;
            }
        };

        ({
            stand: () => {
                checkClickOnLadder();
                checkClickOnPrisoner();
            },
            moveladder: () => {
                moveToTargetLadder();
                checkClickOnLadder();
                checkClickOnPrisoner();
            },
            climb: () => {
                const climbDir = Math.sign(playerLevelTarget - playerLevel);
                player.y += climbDir * 200/60;
                player.x = amClimb.centerX;

                // check if we just passed the level's Y coord
                const currY = player.y;
                const targetY = levelYs[playerLevelTarget];

                if (climbDir === 1 && currY >= targetY ||  // down
                    climbDir === -1 && currY <= targetY ||
                    climbDir === 0) { // up
                    player.y = targetY;
                    playerLevel = playerLevelTarget;
                    playerState = "stand";
                    amClimb = null;
                }
            },
        })[playerState]();

        lastSpace = space.isDown;
    }

    function render() {
        // prisoners.forEach((p) => {
        //     game.debug.body(p);
        // });
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
