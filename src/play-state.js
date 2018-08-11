import torchHandler from './torch-handler';

export default function playState(game) {
    const prisonerSpawnX = 200;
    const playerWalkSpeed = 250/60;
    const playerClimbSpeed = 200/60;
    const races = [ 'elf', 'hobbit', 'usurper', 'rebel', 'goblin', 'ogre' ];
    const levelYs = [ 175, 330 ];

    let player;
    let playerState = "stand"; // stand, moveladder, climb, move, dead
    let playerLevel = 0; // 0=top floor, 1=next floor down
    let playerLevelTarget = 0;
    let playerTargetX;
    let ladderA, ladderB;
    let spaceTop, spaceBottom, waitingRoomBox;
    let gonnaClimb; // which ladder you're heading to climb
    let amClimb; // currently climbing
    let prisoners = []; // every prisoner, regardless of their `state`, lives here
    let waitingPrisoners = [];
    let activePrisoner;
    let choppingBlock;

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
        game.load.image('ladder', img('ladderglow'));
        game.load.image('capturebox', img('capturebox'));
        game.load.spritesheet('torch', img('torch'), 8, 16);
        game.load.image('pointer', img('pointer'));
        game.load.image('choppingblock', img('choppingblock'));
    }

    function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.add.tileSprite(0, 0, 960, 540, 'bg');

        // click-to-move areas
        spaceTop = game.add.sprite(325, 20, 'capturebox');
        spaceTop.alpha = 0.1;
        spaceTop.width = 810;
        spaceTop.height = 170;
        spaceTop.inputEnabled = true;
        spaceBottom = game.add.sprite(145, 200, 'capturebox');
        spaceBottom.alpha = 0.1;
        spaceBottom.width = 810;
        spaceBottom.height = 170;
        spaceBottom.inputEnabled = true;

        // waiting area
        waitingRoomBox = game.add.sprite(145, 20, 'capturebox');
        waitingRoomBox.alpha = 0.1;
        waitingRoomBox.width = 180;
        waitingRoomBox.height = 170;
        waitingRoomBox.inputEnabled = true;

        // ladders
        ladderA = game.add.sprite(327, 135, 'ladder');
        ladderA.alpha = 0.0001; // invisible ladders
        ladderA.inputEnabled = true;
        ladderB = game.add.sprite(905, 135, 'ladder');
        ladderB.inputEnabled = true;
        ladderB.alpha = 0.0001;

        // torches
        torchHandler(game).placeTorches();

        // chopping block
        choppingBlock = game.add.sprite(200, levelYs[1], 'choppingblock');
        choppingBlock.anchor.setTo(0.5, 1);

        // the player
        player = game.add.sprite(0, 0, 'player');
        player.animations.add('walk');
        player.anchor.setTo(0.5, 1);
        player.x = 400;
        player.y = levelYs[0];

        space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        debug = game.input.keyboard.addKey(Phaser.Keyboard.D);
    }

    let debug;
    let lastDebug = false;
    let space;
    let lastSpace = false;

    function update() {
        if (debug.isDown && !lastDebug) {
            debugger;
        }

        updatePlayer();
        updatePrisoners();

        lastDebug = debug.isDown;
        lastSpace = space.isDown;
    }

    /***********************************************************************************************************
     * object class updates
     */
    function updatePlayer() {
        const checkClickOnPrisoner = () => {
            prisoners.forEach((pris, idx) => {
                if (pris.input.justPressed(0, 20)) {
                    // pris.destroy();
                    // prisoners.splice(idx, 1);
                }
            });
        };

        const checkClickOnLadder = () => {
            ([ladderA, ladderB]).forEach((lad) => {
                // phaser doesn't support "did we click it this frame?"
                // so instead of tracking that shit for every object
                // we just make sure this click started no more than ~20ms ago
                // which means this will only be true for one frame (1f @60FPS = 16ms)
                if (lad.input.justPressed(0, 20)) {
                    gonnaClimb = lad;
                    playerState = "moveladder";
                    spawnGlowLadder(gonnaClimb);
                    maybeStartClimb(); // don't bother moving to a ladder if you're already there
                }
            });
        };

        const checkClickOnSpace = () => {
            if ((playerLevel === 0 && spaceTop.input.justPressed(0, 20)) ||
                (playerLevel === 1 && spaceBottom.input.justPressed(0, 20))) {
                playerState = 'move';
                playerTargetX = game.input.activePointer.x;
                spawnPointer(playerTargetX, levelYs[playerLevel]);
            }
        };

        const checkClickOnWaitingRoom = () => {
            if(waitingRoomBox.input.justPressed(0,20)) {
                playerTargetX = 330;
                playerState = 'moveWaitingRoom';
            }
            maybeAttendPrisoner();
        };

        const attendPrisoner = () => {
            activePrisoner = waitingPrisoners.pop();
        };

        const checkPrisonerDestinationSelected = () => {

        };

        const maybeAttendPrisoner = () => {
            if(isIntersect(waitingRoomBox, player)) {
                playerState = 'attendPrisoner';
            }
        };

        const maybeStartClimb = () => {
            if (isIntersect(gonnaClimb, player)) {
                playerLevelTarget = Math.abs(1 - playerLevel); // switch between 0 and 1
                playerState = "climb";
                amClimb = gonnaClimb;
                gonnaClimb = null;
            }
        }

        const moveToTargetLadder = () => {
            const direction = Math.sign(gonnaClimb.x - player.x);
            player.x += direction * playerWalkSpeed;

            maybeStartClimb();
        };

        const climb = () => {
            const climbDir = Math.sign(playerLevelTarget - playerLevel);
            player.y += climbDir * playerClimbSpeed;
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
        };

        const moveToTargetSpace = () => {
            const direction = Math.sign(playerTargetX - player.x);
            player.x += direction * playerWalkSpeed;

            if (Math.abs(player.x - playerTargetX) < playerWalkSpeed) {
                playerState = "stand";
                player.x = playerTargetX;
                playerTargetX = undefined;
            }
        };

        const checkClicks = function() {
            checkClickOnLadder();
            checkClickOnSpace();
            checkClickOnPrisoner();
            checkClickOnWaitingRoom();
        };

        ({
            stand: () => {
                player.animations.stop('walk', true);
                checkClicks();
            },
            moveladder: () => {
                player.animations.play('walk', 8, true);
                moveToTargetLadder();
                checkClicks();
            },
            move: () => {
                player.animations.play('walk', 8, true);
                moveToTargetSpace();
                checkClicks();
            },
            climb: () => {
                player.animations.play('walk', 8, true);
                climb();
            },
            moveWaitingRoom: () => {
                maybeAttendPrisoner();
                player.animations.play('walk', 8, true);
                moveToTargetSpace();
                checkClicks();
            },
            attendPrisoner: () => {
                player.animations.stop('walk', true);
            },
            movePrisoner: () => {

            }
        })[playerState]();
    }

    function updatePrisoners() {
        // if (Math.random() * 100 > 99) {
        if (space.isDown && !lastSpace) {
            newPrisonerArrival();
        }

        const moveForwardInLine = (prisoners, prisoner) => {
            const amIBumpingIntoTheNextGuyInLineAndIfSoWhoIsIt = intersectsAny(prisoners, prisoner, (them) => them.x > prisoner.x);
            if (isIntersect(prisoner, ladderA) ||
                amIBumpingIntoTheNextGuyInLineAndIfSoWhoIsIt) {
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
    }

    /***********************************************************************************************************
     * update helpers
     */
    function newPrisonerArrival() {
        // pick random race
        const race = races[Math.floor(Math.random() * races.length)];
        let prisoner = game.add.sprite(prisonerSpawnX, levelYs[0], race);
        prisoners.push(prisoner);
        waitingPrisoners.push(prisoner);
        prisoner.race = race;
        prisoner.state = 'entering'; // entering, waitingroom
        prisoner.anchor.setTo(0.5, 1);
        prisoner.inputEnabled = true;
    }

    function isIntersect(a, b) {
        return Phaser.Rectangle.intersects(a.getBounds(), b.getBounds());
    }

    function intersectsAny(arrayOfThings, you, alsoSatisfy) {
        /** if `you` intersects with anything in the array,
        * return the first thing in the `arrayOfThings` that is intersecting.
        * else null.
        */
       if (!alsoSatisfy) {
           alsoSatisfy = (thing) => true;
        }
        for (let thing of arrayOfThings) {
            if (thing === you) {
                // can't collide with yourself
                continue;
            }
            if (isIntersect(thing, you)) {
                if (alsoSatisfy(thing)) {
                    return thing;
                }
            }
        }
        return null;
    };

    function spawnPointer(x, y) {
        let pointer = game.add.sprite(x, y, 'pointer');
        pointer.anchor.setTo(0.5, 1);
        const what = setInterval(() => {
            pointer.alpha -= 0.05;
            pointer.width += 0.5;
            pointer.height += 0.5;
            if (pointer.alpha <= 0) {
                pointer.destroy();
                clearInterval(what);
            }
        }, 16);
    }

    function spawnGlowLadder(like) {
        let ladder = game.add.sprite(like.x, like.y, 'ladder');

        ladder.anchor.setTo(0.5, 1);
        ladder.x += ladder.width/2;
        ladder.y += ladder.height;
        ladder.alpha = 0;


        let t = 0;
        const id = setInterval(() => {
            t += Math.PI / 30;
            ladder.alpha = Math.sin(t);
            if (t >= Math.PI) {
                ladder.alpha = 0;
                ladder.destroy();
                clearInterval(id);
            }
        }, 16);
    }

    function render() {
        game.debug.pixel(player.x+0.5, player.y+0.5, "red");
        game.debug.text(playerState, player.x - 64, player.y - 64, "white");
    }

    return {preload, create, update, render};
}
