/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/about-state.js":
/*!****************************!*\
  !*** ./src/about-state.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return aboutState; });
/* harmony import */ var _entry_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entry-state */ "./src/entry-state.js");


function aboutState(game) {

    let textCrawlStyle = { font: '10pt Press Start 2P', fill: 'white', align: 'left', wordWrap: true, wordWrapWidth: game.width-60};
    let textCrawl = 'Premise\n\n'
                    + 'The Kingdom of Fecea is asphyxiating from the nauseating fumes of crime, bankruptcy, and moral degeneracy.\n'
                    + 'Brigands, highway robbers, and non-humans frustrate the attempts of the Kingdom\'s law enforcement to maintain order.\n\n'
                    + 'In the bowels of the Kingdom\'s most infamous gaol, you are Thelonious, the lone executioner. The prison is running out of space!';

    return {
        create: function() {
            let buttonStyle = { font: '10pt Press Start 2P', fill: '#FFFFFF', align: 'left'};
            let backButton = game.add.text(60, 30, '< Back', buttonStyle);

            let instructionsButtonStyle = { font: '10pt Press Start 2P', fill: '#FFFFFF', align: 'right'};
            let instructionsButton = game.add.text(game.world.width - 240, 30, 'Instructions >', instructionsButtonStyle);

            backButton.inputEnabled = true;
            backButton.events.onInputUp.add(function () {
                game.state.start('Entry');
            });

            instructionsButton.inputEnabled = true;
            instructionsButton.events.onInputUp.add(() => {
                game.state.start('Instructions');
            });

            let aboutText = game.add.text(60, 90, textCrawl, textCrawlStyle);
        }
    };

};


/***/ }),

/***/ "./src/asset-load-state.js":
/*!*********************************!*\
  !*** ./src/asset-load-state.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return assetLoadState; });
function assetLoadState(game) {

    function preload() {
        const sound = (name) => `src/assets/sound/${name}.mp3`;
        game.load.audio('theme', sound('theme'));
        game.load.audio('gateopensound', sound('gateopensound'));
        game.load.audio('grindsound', sound('grindsound'));
        game.load.audio('screamsound', sound('screamsound'));
        game.load.audio('swingsound', sound('swingsound'));
        game.load.audio('escapesound', sound('escapesound'));
        game.load.audio('escapesound2', sound('escapesound2'));
        game.load.audio('prisonmurdersound', sound('prisonmurdersound'));

        let titleStyle = { font: '50pt Press Start 2P', fill: '#FFFFFF', align: 'center'};
        let text = game.add.text(game.world.centerX, game.world.centerY, ' Loading...', titleStyle);
        text.anchor.set(0.5);

        const img = (name) => `src/assets/img/${name}.png`;
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
        game.load.image('heart', img('heart'));
        game.load.image('choppingblockglow', img('choppingblockglow'));
        game.load.spritesheet('axegrind', img('axegrind'), 112/2, 48);
        game.load.spritesheet('axeloading', img('axeloading'), 72, 25);

        
           
        window.theme = new Phaser.Sound(game, 'theme', 2, true); 
    }

    function create() {
        game.state.start('Entry');
    }

    return {preload, create};

}

/***/ }),

/***/ "./src/entry-state.js":
/*!****************************!*\
  !*** ./src/entry-state.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return entryState; });
/* harmony import */ var _play_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./play-state */ "./src/play-state.js");


function entryState(game) {
    return {
        preload: function() {
            
        },

        init: function() {
        },
 
        create: function() {
            
            let titleStyle = { font: '50pt Press Start 2P', fill: '#FFFFFF', align: 'center'};
            let text = game.add.text(game.world.centerX, 100, 'Due Process', titleStyle);
            text.anchor.set(0.5);

            var optionStyle = { font: '30pt Press Start 2P', fill: 'white', align: 'left' };
            var startOption = game.add.text(30, 280, 'Start', optionStyle);
            var aboutOption = game.add.text(30, 380, 'About', optionStyle);

            startOption.inputEnabled = true;
            startOption.events.onInputUp.add(function () {
                game.state.add('Play', Object(_play_state__WEBPACK_IMPORTED_MODULE_0__["default"])(game));
                game.state.start('Play');
            });

            aboutOption.inputEnabled = true;
            aboutOption.events.onInputUp.add(function() {
                game.state.start('About');
            });
            if(!window.theme.isPlaying) {
                window.theme.play();
            }

            // RESTART this state because FOR SOME REASON
            // the THEMESONG only plays the second time the state is entered
            // *enraged screaming ensues*
            game.state.start('Entry');
        },

        update: function() {
            
        }
    }
};


/***/ }),

/***/ "./src/font-load-state.js":
/*!********************************!*\
  !*** ./src/font-load-state.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return fontLoadState; });
function fontLoadState(game) {

    window.fontsLoaded = function() {
        game.state.start('AssetLoad');
    }

    return {
        preload: function() {
            //  The Google WebFont Loader will look for this object, so create it before loading the script.
            global.WebFontConfig = {

                //  'active' means all requested fonts have finished loading
                //  We set a 1 second delay before calling 'createText'.
                //  For some reason if we don't the browser cannot render the text the first time it's created.
                active: function() {
                    game.time.events.add(Phaser.Timer.SECOND, fontsLoaded, this);
                },

                //  The Google Fonts we want to load (specify as many as you like in the array)
                google: {
                    families: ['Press Start 2P']
                }
            };

            //  Load the Google WebFont Loader script
            game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        }
    };

}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/game-over-state.js":
/*!********************************!*\
  !*** ./src/game-over-state.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return gameOverState; });
function gameOverState(game) {

    function create() {
        let titleStyle = { font: '50pt Press Start 2P', fill: '#FFFFFF', align: 'center'};
        let text = game.add.text(game.world.centerX, game.world.centerY, 'Game Over', titleStyle);
        text.anchor.set(0.5);

        let buttonStyle = { font: '10pt Press Start 2P', fill: '#FFFFFF', align: 'left'};
        let backButton = game.add.text(60, 30, '< Back', buttonStyle);

        backButton.inputEnabled = true;
        backButton.events.onInputUp.add(function () {
                game.state.start('Entry');
        });
    }
    
    return {create};
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _font_load_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./font-load-state */ "./src/font-load-state.js");
/* harmony import */ var _asset_load_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./asset-load-state */ "./src/asset-load-state.js");
/* harmony import */ var _play_state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./play-state */ "./src/play-state.js");
/* harmony import */ var _entry_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./entry-state */ "./src/entry-state.js");
/* harmony import */ var _about_state__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./about-state */ "./src/about-state.js");
/* harmony import */ var _game_over_state__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./game-over-state */ "./src/game-over-state.js");
/* harmony import */ var _instructions_state__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./instructions-state */ "./src/instructions-state.js");
/* harmony import */ var _prisoners_instructions_state__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./prisoners-instructions-state */ "./src/prisoners-instructions-state.js");


 // initialize the play state in entry state to reset all the variables in play state







const game = new Phaser.Game(960, 540, Phaser.AUTO, 'game', undefined, undefined, false);
game.state.add('FontLoad', Object(_font_load_state__WEBPACK_IMPORTED_MODULE_0__["default"])(game));
game.state.add('AssetLoad', Object(_asset_load_state__WEBPACK_IMPORTED_MODULE_1__["default"])(game));
game.state.add('Entry', Object(_entry_state__WEBPACK_IMPORTED_MODULE_3__["default"])(game));
game.state.add('About', Object(_about_state__WEBPACK_IMPORTED_MODULE_4__["default"])(game));
game.state.add('GameOver', Object(_game_over_state__WEBPACK_IMPORTED_MODULE_5__["default"])(game));
game.state.add('Instructions', Object(_instructions_state__WEBPACK_IMPORTED_MODULE_6__["default"])(game));
game.state.add('Prisoners', Object(_prisoners_instructions_state__WEBPACK_IMPORTED_MODULE_7__["default"])(game));
game.state.start('FontLoad');


/***/ }),

/***/ "./src/instructions-state.js":
/*!***********************************!*\
  !*** ./src/instructions-state.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return instructionsState; });
function instructionsState(game) {

    let instructionsTextStyle = { font: '10pt Press Start 2P', fill: 'white', align: 'left', wordWrap: true, wordWrapWidth: game.width-60};
    let instructionsText = 'Gain points for every prisoner who dies!!!\n\n'
                         + '1. Move by right clicking.\n\n'
                         + '2. Prisoners will queue up by the door. Click on them to attend to them.\n\n'
                         + '3. While attending to a prisoner, you can excort them to a cell or to the chopping block.\n\n'
                         + '4. Cells can hold two prisoners, and they interact with eachother. Some prisoners kill eachother (good),'
                         + 'but if two prisoners of the same type share a cell for too long, they can escape!\n\n'
                         + '5. Each prisoner who escapes takes one of your lives with them!\n\n'
                         + '6. The chopping block requires the axe to be sharpened after each use (its availability can be seen at the top).';

    function create() {
        let backButtonStyle = { font: '10pt Press Start 2P', fill: '#FFFFFF', align: 'left'};
        let backButton = game.add.text(60, 30, '< Back', backButtonStyle);

        let racesButtonStyle = { font: '10pt Press Start 2P', fill: '#FFFFFF', align: 'left'};
        let racesButton = game.add.text(game.world.width - 240, 30, 'Prisoners >', racesButtonStyle);

        backButton.inputEnabled = true;
        backButton.events.onInputUp.add(function () {
            game.state.start('About');
        });

        racesButton.inputEnabled = true;
        racesButton.events.onInputUp.add(() => {
            game.state.start('Prisoners');
        });

        game.add.text(60, 90, instructionsText, instructionsTextStyle);
    }

    return {create};
}

/***/ }),

/***/ "./src/play-state.js":
/*!***************************!*\
  !*** ./src/play-state.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return playState; });
/* harmony import */ var _torch_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./torch-handler */ "./src/torch-handler.js");


function playState(game) {
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
        Object(_torch_handler__WEBPACK_IMPORTED_MODULE_0__["default"])(game).placeTorches();

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


/***/ }),

/***/ "./src/prisoners-instructions-state.js":
/*!*********************************************!*\
  !*** ./src/prisoners-instructions-state.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return prisonersInstructionsState; });
function prisonersInstructionsState(game) {

    let instructionsTextStyle = { font: '10pt Press Start 2P', fill: 'white', align: 'left', wordWrap: true, wordWrapWidth: game.width-60};

    const races = [ 'elf', 'hobbit', 'usurper', 'rebel', 'goblin', 'ogre' ];
    const descriptions = [
        'Their nobility provokes the rebel, causing him to start a fight he can\'t win.',
        'They can outsmart (and eliminate) goblins.',
        'They can dominate simple-minded ogres.',
        'Hates the bourgeois usurpers.',
        'Hatred of elves runs deep in this species.',
        'Eats little hobbitses.'
    ];

    function preload() {
        
    }

    function create() {
        let backButtonStyle = { font: '10pt Press Start 2P', fill: '#FFFFFF', align: 'left'};
        let backButton = game.add.text(60, 30, '< Back', backButtonStyle);

        backButton.inputEnabled = true;
        backButton.events.onInputUp.add(function () {
            game.state.start('Instructions');
        });

        let startY = 90;
        let spriteX = 60;
        let nameX = 120;
        let descriptionX = 256;
        let currY = startY;

        races.forEach((raceName, i) => {
            let prisoner = game.add.sprite(spriteX, currY, raceName);
            prisoner.animations.add('walk');
            prisoner.animations.play('walk', 8, true);
            prisoner.anchor.setTo(0, 0.5);

            game.add.text(nameX, currY, raceName, instructionsTextStyle);
            game.add.text(descriptionX, currY, descriptions[i], instructionsTextStyle);
            currY += 80;
        });
    }

    return {preload, create};
}

/***/ }),

/***/ "./src/torch-handler.js":
/*!******************************!*\
  !*** ./src/torch-handler.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return torchHandler; });
function torchHandler(game) {

    let torchX = [225, 548, 718, 548, 718];
    let torchY = [111, 111, 111, 271, 271];

    return {
        placeTorches: function() {
            for(var i = 0; i < torchX.length; ++i) {
                let torch = game.add.sprite(torchX[i], torchY[i], 'torch');
                let light = torch.animations.add('light');
                torch.animations.play('light', 12, true);
            }
        }
    };

}


/***/ })

/******/ });
//# sourceMappingURL=main.js.map