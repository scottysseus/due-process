import torchHandler from './torch-handler'

export default function playState(game) {
    const debugOn = false;


    const prisonerSpawnX = 200;
    const playerWalkSpeed = 250/60;
    const playerClimbSpeed = 300/60;
    const races = [ 'elf', 'hobbit', 'usurper', 'rebel', 'goblin', 'ogre' ];
    const levelYs = [ 175, 330 ];
    const cellWidth = 142;
    const grindDuration = 360;

    // 'race': [things it hates]
    const raceRelationsMap = {
        'goblin': 'elf', // goblins hate elves, a hatred as old as the two races
        'elf': 'rebel', // elves are nobler than rebels, causing the rebels to instigate a fight they can't win
        'rebel': 'usurper', // rebels hate bourgeois usurpers; class struggle is real
        'usurper': 'ogre', // usurpers dominate ogres; their commanding presence whittles away at the ogre
        'ogre': 'hobbit', // ogres eat hobbits, and they are hungry
        'hobbit': 'goblin', // hobbits outsmart goblins
    };

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
    let axeGrind;
    let cells = [];
    let clickedCell;
    let cellContents = [[null, null],[null, null],[null, null],[null, null],[null, null],[null, null]];
    let score = 0;
    let scoreText;
    let axe;
    let axeMurderTimer = 0;
    let lives = 8;
    let choppingblockGlow, ladderGlow, cellGlow, prisonerGlow;
    let heartSprites = [];
    let axeLoader;
    let grindProgress = grindDuration;
    let grindingAxe;
    let nextPrisonerDelay = 360; // frames till next prisoner
    let timeSinceLastPrisoner = 120;

    // sounds
    let gateOpenSound;
    let grindAxeSound;
    let screamSound;
    let swingSound;
    let prisonMurderSound;

    let escapeSounds = []; let currEscapeSound = 0;

    function preload() {

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
            c.animations.add('open', [0, 1, 2, 0]);
            return c;
        }
        cells.push(newCell(393, 63));
        cells.push(newCell(562, 63));
        cells.push(newCell(732, 63));
        cells.push(newCell(393, 223));
        cells.push(newCell(562, 223));
        cells.push(newCell(732, 223));
        gateOpenSound = game.add.audio('gateopensound');

        // torches
        torchHandler(game).placeTorches();

        // axe grind
        axeGrind = game.add.sprite(200, levelYs[1], 'axegrind');
        axeGrind.anchor.setTo(0.5, 1);
        axeGrind.scale.setTo(1.5, 1.5);
        let grindAnimation = axeGrind.animations.add('grind');
        grindAxeSound = game.add.audio('grindsound');

        // axe grinding - the axe that he grings :)
        grindingAxe = game.add.sprite(200, levelYs[1] - 48, 'axe');
        grindingAxe.alpha = 0;
        grindingAxe.angle = -35;
        grindingAxe.scale.x *= -1;

        // chopping block
        choppingBlock = game.add.sprite(250, levelYs[1], 'choppingblock');
        choppingBlock.anchor.setTo(0.5, 0.7);
        choppingBlock.inputEnabled = true;
        swingSound = game.add.audio('swingsound');

        // glows
        ladderGlow = game.add.sprite(0,0,'ladder');
        ladderGlow.alpha = 0;
        cellGlow = game.add.sprite(0,0,'glowbars');
        cellGlow.alpha = 0;
        prisonerGlow = game.add.sprite(0,0,'glow');
        prisonerGlow.alpha = 0;
        choppingblockGlow = game.add.sprite(0,0,'choppingblockglow');
        choppingblockGlow.alpha = 0;
        choppingblockGlow.anchor.setTo(0.5, 0.7);


        // the player
        player = game.add.sprite(0, 0, 'player');
        player.animations.add('walk');
        player.anchor.setTo(0.5, 1);
        player.x = 400;
        player.y = levelYs[0];

        // prisoner sounds
        screamSound = game.add.audio('screamsound');
        let escapeSound = game.add.audio('escapesound', 0.25);
        let escapeSound2 = game.add.audio('escapesound2', 0.25);
        escapeSounds = [escapeSound, escapeSound2];
        prisonMurderSound = game.add.audio('prisonmurdersound');

        // score
        let scoreStyle = { font: '15pt Press Start 2P', fill: 'white', align: 'left' };
        scoreText = game.add.text(650, 15, 'Score: 000000', scoreStyle);

        // health
        let heartX = 256;
        let heartY = 15;
        for(var i = 0; i < lives; ++i) {
            heartX += 30;
            heartSprites.push(game.add.sprite(heartX, heartY, 'heart'));
        }

        // axe loading
        let axeLoadingX = 180;
        let axeLoadingY = 15;
        let axeLoadingBackground = game.add.sprite(axeLoadingX, axeLoadingY, 'axe');
        axeLoadingBackground.alpha = 0.5;
        axeLoadingBackground.angle = 90;
        axeLoadingBackground.anchor.setTo(0, 1);
        axeLoadingBackground.y = axeLoadingBackground - 4;

        axeLoader = game.add.sprite(axeLoadingX, axeLoadingY, 'axeloading', 3);
        axeLoader.animations.add('load');

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

        grindProgress++;
        if (grindProgress >= grindDuration) {
            grindProgress = grindDuration;
            axeGrind.animations.stop('grind', true);
            grindingAxe.alpha = 0;
        }

        updateCells();
        updatePlayer();
        updatePrisoners();

        lastDebug = debug.isDown;
        lastSpace = space.isDown;

        timeSinceLastPrisoner++;
        if(timeSinceLastPrisoner >= nextPrisonerDelay) {
            timeSinceLastPrisoner = 0;
            newPrisonerArrival();
        }
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
                    spawnGlow(gonnaClimb.x, gonnaClimb.y, ladderGlow);
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
                    spawnGlow(b.x, b.y, cellGlow);
                }
            }
        };

        const checkClickOnChoppingBlock = () => {
            if (grindProgress >= grindDuration && playerLevel === 1 && choppingBlock.input.justPressed(0, 20)) {
                playerState = 'moveToBlock';
                playerTargetX = choppingBlock.x;
                spawnGlow(choppingBlock.x, choppingBlock.y, choppingblockGlow);
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

        const checkClickOnPrisoner = () => {
            cellContents.forEach((prisonerArray) => {
                prisonerArray.forEach((prisoner) => {
                    if (prisoner && prisoner.inputEnabled
                        &&  isSameFloor(player, prisoner)
                        && prisoner.input.justPressed(0, 20)) {
                        if(!activePrisoner) {
                            playerState = 'moveToPrisoner';
                            clickedPrisoner = prisoner;
                            spawnGlow(prisoner.x - 22, prisoner.y, prisonerGlow);
                        }
                    }
                })
            });
        }

        const maybeLockHimUp = () => {
            if (Math.abs(player.x - playerTargetX) <= playerWalkSpeed * 2) {
                // only 2 slots per cell.
                let slot = cellContents[clickedCell].indexOf(null);
                if (slot < 0) { return; }
                let cellSprite = cells[clickedCell];
                cellSprite.animations.play('open', 15, false);
                gateOpenSound.play();

                cellSprite.bringToTop();
                player.bringToTop();

                // 0 slot in this cell is the left, 1 slot is the right.
                const moveOver = !!cellContents[clickedCell][0] ? 40 : 0;

                activePrisoner.state = 'thrownIn';
                cellContents[clickedCell][slot] = activePrisoner;
                activePrisoner.x = cells[clickedCell].x + cellWidth / 2 + moveOver;
                activePrisoner.y = levelYs[Math.floor(clickedCell / 3)] - 30;
                activePrisoner.anger = 0;
                activePrisoner.camaraderie = 0;
                activePrisoner.cellIndex = clickedCell;
                activePrisoner = null;
                clickedCell = undefined;
                playerState = 'stand';
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
                let cellSprite = cells[clickedPrisoner.cellIndex];
                cellSprite.animations.play('open', 15, false);
                gateOpenSound.play();
                clickedPrisoner.inputEnabled = false;
                clickedPrisoner.state = 'followingPlayer';
                clickedPrisoner.y = player.y;
                activePrisoner = clickedPrisoner;
                playerState = 'stand';
                let cell = cellContents[clickedPrisoner.cellIndex];
                let prisonerIndex = cell.indexOf(clickedPrisoner);
                cell[prisonerIndex] = null;
                let otherPrisoner = cell[(prisonerIndex + 1) % 2];
                clickedPrisoner.anger = 0;
                clickedPrisoner.camaraderie = 0;
                if (otherPrisoner) {
                    otherPrisoner.anger = 0;
                    otherPrisoner.camaraderie = 0;
                }
                clickedPrisoner.cellIndex = null;
                clickedPrisoner = null;
                activePrisoner.bringToTop();
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
                axe.scale.setTo(0, 0);
                axe.anchor.setTo(0.6, 1);
            }

            if (axeMurderTimer >= 0 && axeMurderTimer < 30) {
                const scale = lerp(0, 1, axeMurderTimer / 30);
                axe.scale.setTo(scale, scale);
                screamSound.play();
            } else if (axeMurderTimer >= 30 && axeMurderTimer < 60) {
                swingSound.play();
                const ang = lerp(0, -45, (axeMurderTimer - 30) / 30);
                axe.angle = ang;
            } else if (axeMurderTimer >= 60 && axeMurderTimer < 80) {
                const ang = lerp(-45, 120, (axeMurderTimer - 60) / 20);
                axe.angle = ang;
            } else {
                axe.destroy();
                axe = undefined;
                activePrisoner.destroy();
                prisoners.splice(prisoners.indexOf(activePrisoner), 1);
                activePrisoner = undefined;
                playerState = 'stand';
                axeMurderTimer = 0;
                score += 10;
                updateScore();

                grindProgress = 0;
                animateAxeLoading();
                axeGrind.animations.play('grind', 10, true);
                grindAxeSound.play();
                grindingAxe.alpha = 1;
            }
        };

        const checkClicks = function() {
            checkClickOnChoppingBlock();
            checkClickOnLadder();
            checkClickOnSpace();
            checkClickOnWaitingRoom();
            checkClickOnCell();
            checkClickOnPrisoner();
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
        if (debugOn && space.isDown && !lastSpace) {
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
            let cell = cellContents[prisoner.cellIndex];
            let hatedThings = cell.filter((toCheck) => {
                return toCheck && toCheck.race === raceRelationsMap[prisoner.race];
            });
            if(hatedThings.length > 0) {
                prisoner.anger++;
            }
            let helpfulThings = cell.filter((toCheck) => {
                return toCheck && toCheck !== prisoner&& toCheck.race === prisoner.race;
            });
            if(helpfulThings.length > 0) {
                prisoner.camaraderie++;
            }

            if(prisoner.anger > 300) {
                hatedThings.forEach((thing) => {
                    prisonMurderSound.play();
                    const killThisIdx = cell.indexOf(thing);
                    cell[killThisIdx] = null;
                    destroyPrisoner(thing);
                    score += 10;
                    updateScore();
                });
                prisoner.anger = 0;
            }

            if(prisoner.camaraderie > 480) {
                prisoner.state = 'escape';
                prisoner.camaraderie = 0;
                currEscapeSound = (currEscapeSound + 1) % 2;
                escapeSounds[currEscapeSound].play();

            }
        };

        const escape = function(prisoner) {
            if (prisoner.y > 200 && isIntersect(prisoner, ladderA)) {
                prisoner.x = ladderA.centerX;
                prisoner.y -= playerClimbSpeed;
            } else {
                if(prisoner.y > 200) {
                    prisoner.y = levelYs[1]; // prisoner needs to be on lower floor walkway
                } else {
                    prisoner.y = levelYs[0];
                }
                prisoner.x -= playerWalkSpeed;
            }

            if (prisoner.x <= 190) { // 190 is the right edge of the door
                destroyPrisoner(prisoner);
                console.log('prisoner escaped!1!!');
                takeLife();
            }
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
                    prisoner.inputEnabled = false;
                    let cell = cellContents[prisoner.cellIndex];
                    cell[cell.indexOf(prisoner)] = null;
                    escape(prisoner);
                }
            })[prisoner.state]();
        });
    }

    function updateScore() {
        scoreText.text = 'Score: ' + score.toString().padStart(6, '0');
        if(score % 50 === 0) {
            nextPrisonerDelay = nextPrisonerDelay > 120 ? nextPrisonerDelay - 30 : 120;
        }
    }

    function takeLife() {
        let heartSprite = heartSprites.shift();
        if(heartSprite) {
            heartSprite.destroy();
            if(heartSprites.length < 1) {
                game.state.start('GameOver');
            }
        }
    }

    function animateAxeLoading() {
        const sections = 4;
        const fps = 60;
        const animationFps = fps / (grindDuration / (sections - 1));
        axeLoader.animations.play('load', animationFps, false);
    }

    function isSameFloor(object1, object2) {
        return object1.y && object2.y && (200 - object1.y) * (200 - object2.y) > 0;
    }

    /***********************************************************************************************************
     * update helpers
     */
    function newPrisonerArrival() {
        // lose a life for every prisoner that cannot fit into the queue
        let lastPrisoner = waitingPrisoners[waitingPrisoners.length - 1];
        if(lastPrisoner &&  lastPrisoner.x - prisonerSpawnX <= 16) {
            takeLife();
            return;
        }
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
        const idx = prisoners.indexOf(prisoner);
        if (idx === -1) {
            console.warn("Tried to destroy a prisoner but couldn't find him.");
        }
        const vacateThis = findCellAndSlot(prisoner);
        if (vacateThis) {
            cellContents[vacateThis[0]][vacateThis[1]];
        }

        prisoners.splice(idx, 1);
        prisoner.destroy();
    }

    function findCellAndSlot(prisoner) {
        for (let c = 0; c < cellContents.length; c++) {
            const cell = cellContents[c];
            for (let s = 0; s < cell.length; s++) {
                const pris = cell[c];
                if (prisoner === pris)
                    return [c, s];
            }
        }
        return null;
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

    function spawnGlow(x, y, glow) {
        // glow.anchor.setTo(0.5, 1);
        // glow.x += glow.width/2;
        // glow.y += glow.height;
        // uncomment if you want to resize about the center
        glow.alpha = 0;
        glow.x = x;
        glow.y = y;
        glow.bringToTop();

        let t = 0;
        const id = setInterval(() => {
            t += Math.PI / 30;
            glow.alpha = Math.sin(t);
            if (t >= Math.PI) {
                glow.alpha = 0;
                clearInterval(id);
            }
        }, 16);
    }

    function lerp(from, to, amt) {
        return (1 - amt) * from + amt * to;
    }

    function render() {
        if(debugOn) {
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
                game.debug.text(`${theCell.length}: [${formattedResidents.join(',')}]`, 0, i * 16 + 400);
            }
            game.debug.text('grind progress: ' + grindProgress, 0, 6*16 + 400);
            game.debug.text('activePrisoner: ' + (activePrisoner ? activePrisoner.race : '___'), 0, 7*16 + 400);
            game.debug.text('clickedPrisoner: ' + (clickedPrisoner ? clickedPrisoner.race : '___'), 0, 8*16 + 400);
            game.debug.text(playerState, player.x - 32, player.y - 64, "white");
        }

    }

    return {preload, create, update, render};
}
