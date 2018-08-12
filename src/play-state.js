import torchHandler from './torch-handler';

export default function playState(game) {
    const prisonerSpawnX = 200;
    const playerWalkSpeed = 250/60;
    const playerClimbSpeed = 200/60;
    const races = [ 'elf', 'hobbit', 'usurper', 'rebel', 'goblin', 'ogre' ];
    const levelYs = [ 175, 330 ];
    const cellWidth = 142;

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
    let clickedPrisoner;
    let choppingBlock;
    let cells = [];
    let clickedCell;
    let cellContents = [[null, null],[null, null],[null, null],[null, null],[null, null],[null, null]];
    let score, scoreText;
    let axe;
    let axeMurderTimer;

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
        game.load.spritesheet('bars', img('bars'), 426/3, 100);
        game.load.spritesheet('glowbars', img('glowbars'), 426/3, 100);
        game.load.image('glow', img('glow'));
        game.load.image('axe', img('axe'));
    }

    function create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.add.tileSprite(0, 0, 960, 540, 'bg');

        // click-to-move areas
        spaceTop = game.add.sprite(325, 20, 'capturebox');
        spaceTop.alpha = 0.0;
        spaceTop.width = 810;
        spaceTop.height = 170;
        spaceTop.inputEnabled = true;
        spaceBottom = game.add.sprite(145, 200, 'capturebox');
        spaceBottom.alpha = 0.0;
        spaceBottom.width = 810;
        spaceBottom.height = 170;
        spaceBottom.inputEnabled = true;

        // waiting area
        waitingRoomBox = game.add.sprite(145, 20, 'capturebox');
        waitingRoomBox.alpha = 0.0;
        waitingRoomBox.width = 180;
        waitingRoomBox.height = 170;
        waitingRoomBox.inputEnabled = true;

        // ladders
        ladderA = game.add.sprite(327, 135, 'ladder');
        ladderA.alpha = 0.0; // invisible ladders
        ladderA.inputEnabled = true;
        ladderB = game.add.sprite(905, 135, 'ladder');
        ladderB.inputEnabled = true;
        ladderB.alpha = 0.0;

        // cells
        const newCell = (x, y) => {
            let c = game.add.sprite(x, y, 'bars');
            return c;
        }
        cells.push(newCell(393, 63));
        cells.push(newCell(562, 63));
        cells.push(newCell(732, 63));
        cells.push(newCell(393, 223));
        cells.push(newCell(562, 223));
        cells.push(newCell(732, 223));

        // torches
        torchHandler(game).placeTorches();

        // chopping block
        choppingBlock = game.add.sprite(200, levelYs[1], 'choppingblock');
        choppingBlock.anchor.setTo(0.5, 0.7);
        choppingBlock.inputEnabled = true;

        // the player
        player = game.add.sprite(0, 0, 'player');
        player.animations.add('walk');
        player.anchor.setTo(0.5, 1);
        player.x = 400;
        player.y = levelYs[0];

        // score
        let scoreStyle = { font: '15pt Press Start 2P', fill: 'white', align: 'left' };
        scoreText = game.add.text(650, 15, 'Score: 000000', scoreStyle);

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

        updateCells();
        updatePlayer();
        updatePrisoners();

        lastDebug = debug.isDown;
        lastSpace = space.isDown;
    }

    /***********************************************************************************************************
     * object class updates
     */
    function updateCells() {
        for (let idx = 0; idx < cells.length; idx++) {
            let c = cells[idx];
            c.inputEnabled = // to be clickable...
                !!activePrisoner && // player must carry a prisoner
                (Math.floor(idx/3) === playerLevel) && // and be on the same vertical level as the cell
                playerState !== 'climb'; // and not be currently climbing away from that vertical level
        }
    }

    function updatePlayer() {
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
            if(waitingRoomBox.input.justPressed(0,20) && playerLevel === 0) {
                playerTargetX = 330;
                playerState = 'moveWaitingRoom';
            }
            maybeAttendPrisoner();
        };

        const checkClickOnCell = () => {
            for (let i = 0; i < cells.length; i++) {
                const b = cells[i];
                if (b.input && b.input.justPressed(0, 20)) {
                    clickedCell = i;
                    playerTargetX = b.x + cellWidth/2;
                    playerState = "moveToCell";
                    spawnGlowBars(b);
                }
            }
        };

        const checkClickOnChoppingBlock = () => {
            if (playerLevel === 1 && choppingBlock.input.justPressed(0, 20)) {
                playerState = 'moveToBlock';
                playerTargetX = choppingBlock.x;
                spawnGlow(choppingBlock.x, choppingBlock.y, 'ladder');
            }
        };

        const maybeAttendPrisoner = () => {
            if(playerState === 'moveWaitingRoom' && isIntersect(waitingRoomBox, player)
                && !activePrisoner) {
                if(waitingPrisoners.length > 0) {
                    activePrisoner = waitingPrisoners.shift();
                    activePrisoner.state = 'followingPlayer';
                } else {
                    playerState = 'stand';
                }
            }
        };

        const maybeExecutePrisoner = () => {
            if (activePrisoner && isIntersect(player, choppingBlock)) {
                activePrisoner.state = 'murder';
                playerState = 'murder';
            }
        };

        const maybeLockHimUp = () => {
            if (Math.abs(player.x - playerTargetX) <= playerWalkSpeed * 2) {
                // only 2 slots per cell.
                let slot = cellContents[clickedCell].indexOf(null);
                if (slot < 0) { return; }

                // 0 slot in this cell is the left, 1 slot is the right.
                const moveOver = !!cellContents[clickedCell][0] ? 40 : 0;

                activePrisoner.state = 'thrownIn';
                cellContents[clickedCell][slot] = activePrisoner;
                activePrisoner.x = cells[clickedCell].x + cellWidth / 2 + moveOver;
                activePrisoner.y = levelYs[Math.floor(clickedCell / 3)] - 30;
                activePrisoner = null;
                clickedCell = undefined;
                playState = 'stand';
            }
        };

        const maybeStartClimb = () => {
            if (isIntersect(gonnaClimb, player)) {
                playerLevelTarget = Math.abs(1 - playerLevel); // switch between 0 and 1
                playerState = "climb";
                amClimb = gonnaClimb;
                gonnaClimb = null;
            }
        };

        const moveToTargetLadder = () => {
            const direction = Math.sign(gonnaClimb.x - player.x);
            player.x += direction * playerWalkSpeed;
            if(activePrisoner) {
                activePrisoner.x = player.x + direction * 48 * -1;
                activePrisoner.y = player.y;
            }

            maybeStartClimb();
        };

        const climb = () => {
            const climbDir = Math.sign(playerLevelTarget - playerLevel);
            player.y += climbDir * playerClimbSpeed;
            player.x = amClimb.centerX;
            if(activePrisoner) {
                activePrisoner.x = player.x;
                activePrisoner.y = player.y + climbDir * -72;
            }

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
            if(activePrisoner) {
                activePrisoner.x = player.x + direction * 48 * -1;
                activePrisoner.y = player.y;
            }

            if (Math.abs(player.x - playerTargetX) < playerWalkSpeed) {
                playerState = "stand";
                player.x = playerTargetX;
                playerTargetX = undefined;
            }
        };

        const turnOnAnimations = () => {
            player.animations.play('walk', 8, true);
            if(activePrisoner) {
                activePrisoner.animations.play('walk', 8, true);
            }
        };

        const turnOffAnimations = () => {
            player.animations.stop('walk', true);
            if(activePrisoner) {
                activePrisoner.animations.stop('walk', true);
            }
        };

        const moveToPrisoner = () => {
            if(isIntersect(player, clickedPrisoner)) {
                clickedPrisoner.inputEnabled = false;
                clickedPrisoner.state = 'followingPlayer';
                clickedPrisoner.y = player.y;
                activePrisoner = clickedPrisoner;
                playerState = 'stand';
                let cell = cellContents[clickedPrisoner.cellIndex];
                let prisonerIndex = cell.indexOf(clickedPrisoner);
                cell[prisonerIndex] = null;
                clickedPrisoner.cellIndex = null;
                clickedPrisoner = null;
            } else {
                playerTargetX = clickedPrisoner.x;
                moveToTargetSpace();
            }
        };

        const doExecution = () => {
            axeMurderTimer++;
            player.x = choppingBlock.x - 64;
            activePrisoner.x = choppingBlock.x + activePrisoner.height / Math.sqrt(2);
            activePrisoner.angle = -45;
            if (!axe) {
                axe = game.add.sprite(player.x + 15, player.y - 36, 'axe');
                axe.anchor.setTo(0.6, 1);
            }

            axe.angle += 4;

            if (axe.angle > 100) {
                axe.destroy();
                axe = undefined;
                activePrisoner.destroy();
                prisoners.splice(prisoners.indexOf(activePrisoner), 1);
                activePrisoner = undefined;
                playerState = 'stand';
                axeMurderTimer = 0;
                score += 10;
            }
        };

        const checkClicks = function() {
            checkClickOnChoppingBlock();
            checkClickOnLadder();
            checkClickOnSpace();
            checkClickOnWaitingRoom();
            checkClickOnCell();
        };

        ({
            stand: () => {
                clickedPrisoner = null;
                turnOffAnimations();
                checkClicks();
            },
            moveladder: () => {
                clickedPrisoner = null;
                turnOnAnimations();
                moveToTargetLadder();
                checkClicks();
            },
            moveToCell: () => {
                clickedPrisoner = null;
                maybeLockHimUp();
                turnOnAnimations();
                moveToTargetSpace();
                checkClicks();
            },
            move: () => {
                clickedPrisoner = null;
                turnOnAnimations();
                moveToTargetSpace();
                checkClicks();
            },
            climb: () => {
                clickedPrisoner = null;
                turnOnAnimations();
                climb();
            },
            moveWaitingRoom: () => {
                clickedPrisoner = null;
                maybeAttendPrisoner();
                turnOnAnimations();
                moveToTargetSpace();
                checkClicks();
            },
            moveToPrisoner: () => {
                turnOnAnimations();
                moveToPrisoner();
                checkClicks();
            },
            moveToBlock: () => {
                clickedPrisoner = null;
                maybeExecutePrisoner();
                turnOnAnimations();
                moveToTargetSpace();
                checkClicks();
            },
            murder: () => {
                clickedPrisoner = null;
                turnOffAnimations();
                doExecution();
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
        };

        const bideTimeInCell = function(prisoner) {
            prisoner.inputEnabled = !activePrisoner;
            if (prisoner.input.justPressed(0, 20)) {
                if(!activePrisoner) {
                    playerState = 'moveToPrisoner';
                    clickedPrisoner = prisoner;
                }
            });
        };

        prisoners.forEach((prisoner, idx) => {
            if (!prisoner.alive) {
                console.warn("attempted to update dead prisoner", prisoner);
                return; // skip him, he's been deleted and did not disappear somehow
            }

            ({
                entering: () => {
                    moveForwardInLine(waitingPrisoners, prisoner);
                },
                waitingroom: () => {
                    moveForwardInLine(waitingPrisoners, prisoner);
                },
                followingPlayer: () => {
                    prisoner.inputEnabled = false;
                },
                thrownIn: () => {
                    bideTimeInCell(prisoner);
                },
                murder: () => {
                    // TODO
                },
                escape: () => {
                    // TODO
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
        prisoner.animations.add('walk');
        prisoners.push(prisoner);
        waitingPrisoners.push(prisoner);
        prisoner.race = race;
        prisoner.state = 'entering'; // entering, waitingroom
        prisoner.anchor.setTo(0.5, 1);
    }

    function destroyPrisoner(prisoner) {
        prisoners.splice(prisoners.indexOf(prisoner), 1);
        prisoner.destroy();
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

    function spawnGlow(x, y, sprite) {
        let glow = game.add.sprite(x, y, sprite);

        // glow.anchor.setTo(0.5, 1);
        // glow.x += glow.width/2;
        // glow.y += glow.height;
        // uncomment if you want to resize about the center
        glow.alpha = 0;

        let t = 0;
        const id = setInterval(() => {
            t += Math.PI / 30;
            glow.alpha = Math.sin(t);
            if (t >= Math.PI) {
                glow.alpha = 0;
                glow.destroy();
                clearInterval(id);
            }
        }, 16);
    }

    function spawnGlowLadder(like) {
        spawnGlow(like.x, like.y, 'ladder');
    }

    function spawnGlowBars(like) {
        spawnGlow(like.x, like.y, 'glowbars');
    }

    function render() {
        for (let prisoner of prisoners) {
            game.debug.text(prisoner.state, prisoner.x - 32, prisoner.y - 64, "green");
        }
        for (let i = 0; i < cellContents.length; i++) {
            const theCell = cellContents[i];
            const formattedResidents = theCell.map((res) => {
                if (res === null) { return 'null'; }
                if (res === undefined) { return 'undefined'; }
                if (!res.race) { return '???'; }
                return res.race;
            });
            game.debug.text(`${theCell.length}: [${formattedResidents.join(',')}]`, 0, i * 16 + 16);
        }
        game.debug.text('activePrisoner: ' + (activePrisoner ? activePrisoner.race : '___'), 0, 8*16);
        game.debug.text('clickedPrisoner: ' + (clickedPrisoner ? clickedPrisoner.race : '___'), 0, 9*16);
        game.debug.text(playerState, player.x - 32, player.y - 64, "white");
    }

    return {preload, create, update, render};
}
