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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = aboutState;

var _entryState = __webpack_require__(/*! ./entry-state */ "./src/entry-state.js");

var _entryState2 = _interopRequireDefault(_entryState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function aboutState(game) {

    var textCrawlStyle = { font: '10pt Press Start 2P', fill: 'white', align: 'left', wordWrap: true, wordWrapWidth: game.width - 60 };
    var textCrawl = 'Premise\n\n' + 'The Kingdom of Fecea is asphyxiating from the nauseating fumes of crime, bankruptcy, and moral degeneracy.\n' + 'Brigands, highway robbers, and non-humans frustrate the attempts of the Kingdom\'s law enforcement to maintain order.\n\n' + 'In the bowels of the Kingdom\'s most infamous gaol, you are Thelonious, the lone executioner.\n\n' + 'Your goal: prevent the prison from overflowing, while remaining carefully within the law (which permits spontaneous executions).';

    return {
        create: function create() {
            var buttonStyle = { font: '10pt Press Start 2P', fill: '#FFFFFF', align: 'left' };
            var backButton = game.add.text(60, 30, '< Back', buttonStyle);

            var instructionsButtonStyle = { font: '10pt Press Start 2P', fill: '#FFFFFF', align: 'right' };
            var instructionsButton = game.add.text(game.world.width - 240, 30, 'Instructions >', instructionsButtonStyle);

            backButton.inputEnabled = true;
            backButton.events.onInputUp.add(function () {
                game.state.start('Entry');
            });

            instructionsButton.inputEnabled = true;
            instructionsButton.events.onInputUp.add(function () {
                game.state.start('Instructions');
            });

            var aboutText = game.add.text(60, 90, textCrawl, textCrawlStyle);
        }
    };
};

/***/ }),

/***/ "./src/asset-load-state.js":
/*!*********************************!*\
  !*** ./src/asset-load-state.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = assetLoadState;
function assetLoadState(game) {

    function preload() {
        var sound = function sound(name) {
            return 'src/assets/sound/' + name + '.mp3';
        };
        game.load.audio('theme', sound('theme'));
        game.load.audio('gateopensound', sound('gateopensound'));
        game.load.audio('grindsound', sound('grindsound'));
        game.load.audio('screamsound', sound('screamsound'));
        game.load.audio('swingsound', sound('swingsound'));
        game.load.audio('escapesound', sound('escapesound'));
        game.load.audio('escapesound2', sound('escapesound2'));
        game.load.audio('prisonmurdersound', sound('prisonmurdersound'));

        var titleStyle = { font: '50pt Press Start 2P', fill: '#FFFFFF', align: 'center' };
        var text = game.add.text(game.world.centerX, game.world.centerY, ' Loading...', titleStyle);
        text.anchor.set(0.5);

        var img = function img(name) {
            return 'src/assets/img/' + name + '.png';
        };
        game.load.spritesheet('ogre', img('ogre'), 96 / 2, 72);
        game.load.spritesheet('player', img('player'), 64 / 2, 64);
        game.load.image('bg', img('bgfull'));
        game.load.spritesheet('elf', img('elf'), 64 / 2, 64);
        game.load.spritesheet('hobbit', img('hobbit'), 64 / 2, 32);
        game.load.spritesheet('usurper', img('usurper'), 64 / 2, 64);
        game.load.spritesheet('rebel', img('rebel'), 64 / 2, 64);
        game.load.spritesheet('goblin', img('goblin'), 64 / 2, 32);
        game.load.image('ladder', img('ladderglow'));
        game.load.image('capturebox', img('capturebox'));
        game.load.spritesheet('torch', img('torch'), 8, 16);
        game.load.image('pointer', img('pointer'));
        game.load.image('choppingblock', img('choppingblock'));
        game.load.spritesheet('bars', img('bars'), 426 / 3, 100);
        game.load.spritesheet('glowbars', img('glowbars'), 426 / 3, 100);
        game.load.image('glow', img('glow'));
        game.load.image('axe', img('axe'));
        game.load.image('heart', img('heart'));
        game.load.image('choppingblockglow', img('choppingblockglow'));
        game.load.spritesheet('axegrind', img('axegrind'), 112 / 2, 48);
        game.load.spritesheet('axeloading', img('axeloading'), 72, 25);

        window.theme = new Phaser.Sound(game, 'theme', 2, true);
    }

    function create() {
        game.state.start('Entry');
    }

    return { preload: preload, create: create };
}

/***/ }),

/***/ "./src/entry-state.js":
/*!****************************!*\
  !*** ./src/entry-state.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = entryState;

var _playState = __webpack_require__(/*! ./play-state */ "./src/play-state.js");

var _playState2 = _interopRequireDefault(_playState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function entryState(game) {
    return {
        preload: function preload() {},

        init: function init() {},

        create: function create() {

            var titleStyle = { font: '50pt Press Start 2P', fill: '#FFFFFF', align: 'center' };
            var text = game.add.text(game.world.centerX, 100, 'Due Process', titleStyle);
            text.anchor.set(0.5);

            var optionStyle = { font: '30pt Press Start 2P', fill: 'white', align: 'left' };
            var startOption = game.add.text(30, 280, 'Start', optionStyle);
            var aboutOption = game.add.text(30, 380, 'About', optionStyle);

            startOption.inputEnabled = true;
            startOption.events.onInputUp.add(function () {
                game.state.add('Play', (0, _playState2.default)(game));
                game.state.start('Play');
            });

            aboutOption.inputEnabled = true;
            aboutOption.events.onInputUp.add(function () {
                game.state.start('About');
            });
            if (!window.theme.isPlaying) {
                window.theme.play();
            }

            // RESTART this state because FOR SOME REASON
            // the THEMESONG only plays the second time the state is entered
            // *enraged screaming ensues*
            game.state.start('Entry');
        },

        update: function update() {}
    };
};

/***/ }),

/***/ "./src/font-load-state.js":
/*!********************************!*\
  !*** ./src/font-load-state.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = fontLoadState;
function fontLoadState(game) {

    window.fontsLoaded = function () {
        game.state.start('AssetLoad');
    };

    return {
        preload: function preload() {
            //  The Google WebFont Loader will look for this object, so create it before loading the script.
            global.WebFontConfig = {

                //  'active' means all requested fonts have finished loading
                //  We set a 1 second delay before calling 'createText'.
                //  For some reason if we don't the browser cannot render the text the first time it's created.
                active: function active() {
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
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = gameOverState;
function gameOverState(game) {

    function create() {
        var titleStyle = { font: '50pt Press Start 2P', fill: '#FFFFFF', align: 'center' };
        var text = game.add.text(game.world.centerX, game.world.centerY, 'Game Over', titleStyle);
        text.anchor.set(0.5);

        var buttonStyle = { font: '10pt Press Start 2P', fill: '#FFFFFF', align: 'left' };
        var backButton = game.add.text(60, 30, '< Back', buttonStyle);

        backButton.inputEnabled = true;
        backButton.events.onInputUp.add(function () {
            game.state.start('Entry');
        });
    }

    return { create: create };
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _fontLoadState = __webpack_require__(/*! ./font-load-state */ "./src/font-load-state.js");

var _fontLoadState2 = _interopRequireDefault(_fontLoadState);

var _assetLoadState = __webpack_require__(/*! ./asset-load-state */ "./src/asset-load-state.js");

var _assetLoadState2 = _interopRequireDefault(_assetLoadState);

var _playState = __webpack_require__(/*! ./play-state */ "./src/play-state.js");

var _playState2 = _interopRequireDefault(_playState);

var _entryState = __webpack_require__(/*! ./entry-state */ "./src/entry-state.js");

var _entryState2 = _interopRequireDefault(_entryState);

var _aboutState = __webpack_require__(/*! ./about-state */ "./src/about-state.js");

var _aboutState2 = _interopRequireDefault(_aboutState);

var _gameOverState = __webpack_require__(/*! ./game-over-state */ "./src/game-over-state.js");

var _gameOverState2 = _interopRequireDefault(_gameOverState);

var _instructionsState = __webpack_require__(/*! ./instructions-state */ "./src/instructions-state.js");

var _instructionsState2 = _interopRequireDefault(_instructionsState);

var _prisonersInstructionsState = __webpack_require__(/*! ./prisoners-instructions-state */ "./src/prisoners-instructions-state.js");

var _prisonersInstructionsState2 = _interopRequireDefault(_prisonersInstructionsState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var game = new Phaser.Game(960, 540, Phaser.AUTO, 'game', undefined, undefined, false); // initialize the play state in entry state to reset all the variables in play state

game.state.add('FontLoad', (0, _fontLoadState2.default)(game));
game.state.add('AssetLoad', (0, _assetLoadState2.default)(game));
game.state.add('Entry', (0, _entryState2.default)(game));
game.state.add('About', (0, _aboutState2.default)(game));
game.state.add('GameOver', (0, _gameOverState2.default)(game));
game.state.add('Instructions', (0, _instructionsState2.default)(game));
game.state.add('Prisoners', (0, _prisonersInstructionsState2.default)(game));
game.state.start('FontLoad');

/***/ }),

/***/ "./src/instructions-state.js":
/*!***********************************!*\
  !*** ./src/instructions-state.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = instructionsState;
function instructionsState(game) {

    var instructionsTextStyle = { font: '10pt Press Start 2P', fill: 'white', align: 'left', wordWrap: true, wordWrapWidth: game.width - 60 };
    var instructionsText = 'Gain points for every prisoner who dies!!!\n\n' + '1. Move by right clicking.\n\n' + '2. Prisoners will queue up by the door. Click on them to attend to them.\n\n' + '3. While attending to a prisoner, you can excort them to a cell or to the chopping block.\n\n' + '4. Cells can hold two prisoners, and they interact with eachother. Some prisoners kill eachother (good),' + 'but if two prisoners of the same type share a cell for too long, they can escape!\n\n' + '5. Each prisoner who escapes takes one of your lives with them!\n\n' + '6. The chopping block requires the axe to be sharpened after each use (its availability can be seen at the top).';

    function create() {
        var backButtonStyle = { font: '10pt Press Start 2P', fill: '#FFFFFF', align: 'left' };
        var backButton = game.add.text(60, 30, '< Back', backButtonStyle);

        var racesButtonStyle = { font: '10pt Press Start 2P', fill: '#FFFFFF', align: 'left' };
        var racesButton = game.add.text(game.world.width - 240, 30, 'Prisoners >', racesButtonStyle);

        backButton.inputEnabled = true;
        backButton.events.onInputUp.add(function () {
            game.state.start('About');
        });

        racesButton.inputEnabled = true;
        racesButton.events.onInputUp.add(function () {
            game.state.start('Prisoners');
        });

        game.add.text(60, 90, instructionsText, instructionsTextStyle);
    }

    return { create: create };
}

/***/ }),

/***/ "./src/play-state.js":
/*!***************************!*\
  !*** ./src/play-state.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = playState;

var _torchHandler = __webpack_require__(/*! ./torch-handler */ "./src/torch-handler.js");

var _torchHandler2 = _interopRequireDefault(_torchHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function playState(game) {
    var debugOn = false;

    var prisonerSpawnX = 200;
    var playerWalkSpeed = 250 / 60;
    var playerClimbSpeed = 300 / 60;
    var races = ['elf', 'hobbit', 'usurper', 'rebel', 'goblin', 'ogre'];
    var levelYs = [175, 330];
    var cellWidth = 142;
    var grindDuration = 360;

    // 'race': [things it hates]
    var raceRelationsMap = {
        'goblin': 'elf', // goblins hate elves, a hatred as old as the two races
        'elf': 'rebel', // elves are nobler than rebels, causing the rebels to instigate a fight they can't win
        'rebel': 'usurper', // rebels hate bourgeois usurpers; class struggle is real
        'usurper': 'ogre', // usurpers dominate ogres; their commanding presence whittles away at the ogre
        'ogre': 'hobbit', // ogres eat hobbits, and they are hungry
        'hobbit': 'goblin' // hobbits outsmart goblins
    };

    var player = void 0;
    var playerState = "stand"; // stand, moveladder, climb, move, dead
    var playerLevel = 0; // 0=top floor, 1=next floor down
    var playerLevelTarget = 0;
    var playerTargetX = void 0;
    var ladderA = void 0,
        ladderB = void 0;
    var spaceTop = void 0,
        spaceBottom = void 0,
        waitingRoomBox = void 0;
    var gonnaClimb = void 0; // which ladder you're heading to climb
    var amClimb = void 0; // currently climbing
    var prisoners = []; // every prisoner, regardless of their `state`, lives here
    var waitingPrisoners = [];
    var activePrisoner = void 0;
    var clickedPrisoner = void 0;
    var choppingBlock = void 0;
    var axeGrind = void 0;
    var cells = [];
    var clickedCell = void 0;
    var cellContents = [[null, null], [null, null], [null, null], [null, null], [null, null], [null, null]];
    var score = 0;
    var scoreText = void 0;
    var axe = void 0;
    var axeMurderTimer = 0;
    var lives = 8;
    var choppingblockGlow = void 0,
        ladderGlow = void 0,
        cellGlow = void 0,
        prisonerGlow = void 0;
    var heartSprites = [];
    var axeLoader = void 0;
    var grindProgress = grindDuration;
    var grindingAxe = void 0;
    var nextPrisonerDelay = 360; // frames till next prisoner
    var timeSinceLastPrisoner = 120;

    // sounds
    var gateOpenSound = void 0;
    var grindAxeSound = void 0;
    var screamSound = void 0;
    var swingSound = void 0;
    var prisonMurderSound = void 0;

    var escapeSounds = [];var currEscapeSound = 0;

    function preload() {}

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
        var newCell = function newCell(x, y) {
            var c = game.add.sprite(x, y, 'bars');
            c.animations.add('open', [0, 1, 2, 0]);
            return c;
        };
        cells.push(newCell(393, 63));
        cells.push(newCell(562, 63));
        cells.push(newCell(732, 63));
        cells.push(newCell(393, 223));
        cells.push(newCell(562, 223));
        cells.push(newCell(732, 223));
        gateOpenSound = game.add.audio('gateopensound');

        // torches
        (0, _torchHandler2.default)(game).placeTorches();

        // axe grind
        axeGrind = game.add.sprite(200, levelYs[1], 'axegrind');
        axeGrind.anchor.setTo(0.5, 1);
        axeGrind.scale.setTo(1.5, 1.5);
        var grindAnimation = axeGrind.animations.add('grind');
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
        ladderGlow = game.add.sprite(0, 0, 'ladder');
        ladderGlow.alpha = 0;
        cellGlow = game.add.sprite(0, 0, 'glowbars');
        cellGlow.alpha = 0;
        prisonerGlow = game.add.sprite(0, 0, 'glow');
        prisonerGlow.alpha = 0;
        choppingblockGlow = game.add.sprite(0, 0, 'choppingblockglow');
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
        var escapeSound = game.add.audio('escapesound', 0.25);
        var escapeSound2 = game.add.audio('escapesound2', 0.25);
        escapeSounds = [escapeSound, escapeSound2];
        prisonMurderSound = game.add.audio('prisonmurdersound');

        // score
        var scoreStyle = { font: '15pt Press Start 2P', fill: 'white', align: 'left' };
        scoreText = game.add.text(650, 15, 'Score: 000000', scoreStyle);

        // health
        var heartX = 256;
        var heartY = 15;
        for (var i = 0; i < lives; ++i) {
            heartX += 30;
            heartSprites.push(game.add.sprite(heartX, heartY, 'heart'));
        }

        // axe loading
        var axeLoadingX = 180;
        var axeLoadingY = 15;
        var axeLoadingBackground = game.add.sprite(axeLoadingX, axeLoadingY, 'axe');
        axeLoadingBackground.alpha = 0.5;
        axeLoadingBackground.angle = 90;
        axeLoadingBackground.anchor.setTo(0, 1);
        axeLoadingBackground.y = axeLoadingBackground - 4;

        axeLoader = game.add.sprite(axeLoadingX, axeLoadingY, 'axeloading', 3);
        axeLoader.animations.add('load');

        space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        debug = game.input.keyboard.addKey(Phaser.Keyboard.D);
    }

    var debug = void 0;
    var lastDebug = false;
    var space = void 0;
    var lastSpace = false;

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
        if (timeSinceLastPrisoner >= nextPrisonerDelay) {
            timeSinceLastPrisoner = 0;
            newPrisonerArrival();
        }
    }

    /***********************************************************************************************************
     * object class updates
     */
    function updateCells() {
        for (var idx = 0; idx < cells.length; idx++) {
            var c = cells[idx];
            c.inputEnabled = // to be clickable...
            !!activePrisoner && // player must carry a prisoner
            Math.floor(idx / 3) === playerLevel && // and be on the same vertical level as the cell
            playerState !== 'climb'; // and not be currently climbing away from that vertical level
        }
    }

    function updatePlayer() {
        var checkClickOnLadder = function checkClickOnLadder() {
            [ladderA, ladderB].forEach(function (lad) {
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

        var checkClickOnSpace = function checkClickOnSpace() {
            if (playerLevel === 0 && spaceTop.input.justPressed(0, 20) || playerLevel === 1 && spaceBottom.input.justPressed(0, 20)) {
                playerState = 'move';
                playerTargetX = game.input.activePointer.x;
                spawnPointer(playerTargetX, levelYs[playerLevel]);
            }
        };

        var checkClickOnWaitingRoom = function checkClickOnWaitingRoom() {
            if (waitingRoomBox.input.justPressed(0, 20) && playerLevel === 0) {
                playerTargetX = 330;
                playerState = 'moveWaitingRoom';
            }
            maybeAttendPrisoner();
        };

        var checkClickOnCell = function checkClickOnCell() {
            for (var i = 0; i < cells.length; i++) {
                var b = cells[i];
                if (b.input && b.input.justPressed(0, 20)) {
                    clickedCell = i;
                    playerTargetX = b.x + cellWidth / 2;
                    playerState = "moveToCell";
                    spawnGlow(b.x, b.y, cellGlow);
                }
            }
        };

        var checkClickOnChoppingBlock = function checkClickOnChoppingBlock() {
            if (grindProgress >= grindDuration && playerLevel === 1 && choppingBlock.input.justPressed(0, 20)) {
                playerState = 'moveToBlock';
                playerTargetX = choppingBlock.x;
                spawnGlow(choppingBlock.x, choppingBlock.y, choppingblockGlow);
            }
        };

        var maybeAttendPrisoner = function maybeAttendPrisoner() {
            if (playerState === 'moveWaitingRoom' && isIntersect(waitingRoomBox, player) && !activePrisoner) {
                if (waitingPrisoners.length > 0) {
                    activePrisoner = waitingPrisoners.shift();
                    activePrisoner.state = 'followingPlayer';
                } else {
                    playerState = 'stand';
                }
            }
        };

        var maybeExecutePrisoner = function maybeExecutePrisoner() {
            if (activePrisoner && isIntersect(player, choppingBlock)) {
                activePrisoner.state = 'murder';
                playerState = 'murder';
            }
        };

        var checkClickOnPrisoner = function checkClickOnPrisoner() {
            cellContents.forEach(function (prisonerArray) {
                prisonerArray.forEach(function (prisoner) {
                    if (prisoner && prisoner.inputEnabled && isSameFloor(player, prisoner) && prisoner.input.justPressed(0, 20)) {
                        if (!activePrisoner) {
                            playerState = 'moveToPrisoner';
                            clickedPrisoner = prisoner;
                            spawnGlow(prisoner.x - 22, prisoner.y, prisonerGlow);
                        }
                    }
                });
            });
        };

        var maybeLockHimUp = function maybeLockHimUp() {
            if (Math.abs(player.x - playerTargetX) <= playerWalkSpeed * 2) {
                // only 2 slots per cell.
                var slot = cellContents[clickedCell].indexOf(null);
                if (slot < 0) {
                    return;
                }
                var cellSprite = cells[clickedCell];
                cellSprite.animations.play('open', 15, false);
                gateOpenSound.play();

                cellSprite.bringToTop();
                player.bringToTop();

                // 0 slot in this cell is the left, 1 slot is the right.
                var moveOver = !!cellContents[clickedCell][0] ? 40 : 0;

                activePrisoner.state = 'thrownIn';
                cellContents[clickedCell][slot] = activePrisoner;
                activePrisoner.x = cells[clickedCell].x + cellWidth / 2 + moveOver;
                activePrisoner.y = levelYs[Math.floor(clickedCell / 3)] - 30;
                activePrisoner.anger = 0;
                activePrisoner.camaraderie = 0;
                activePrisoner.cellIndex = clickedCell;
                activePrisoner = null;
                clickedCell = undefined;
                exports.default = playState = 'stand';
            }
        };

        var maybeStartClimb = function maybeStartClimb() {
            if (isIntersect(gonnaClimb, player)) {
                playerLevelTarget = Math.abs(1 - playerLevel); // switch between 0 and 1
                playerState = "climb";
                amClimb = gonnaClimb;
                gonnaClimb = null;
            }
        };

        var moveToTargetLadder = function moveToTargetLadder() {
            var direction = Math.sign(gonnaClimb.x - player.x);
            player.x += direction * playerWalkSpeed;
            if (activePrisoner) {
                activePrisoner.x = player.x + direction * 48 * -1;
                activePrisoner.y = player.y;
            }

            maybeStartClimb();
        };

        var _climb = function _climb() {
            var climbDir = Math.sign(playerLevelTarget - playerLevel);
            player.y += climbDir * playerClimbSpeed;
            player.x = amClimb.centerX;
            if (activePrisoner) {
                activePrisoner.x = player.x;
                activePrisoner.y = player.y + climbDir * -72;
            }

            // check if we just passed the level's Y coord
            var currY = player.y;
            var targetY = levelYs[playerLevelTarget];

            if (climbDir === 1 && currY >= targetY || // down
            climbDir === -1 && currY <= targetY || climbDir === 0) {
                // up
                player.y = targetY;
                playerLevel = playerLevelTarget;
                playerState = "stand";
                amClimb = null;
            }
        };

        var moveToTargetSpace = function moveToTargetSpace() {
            var direction = Math.sign(playerTargetX - player.x);
            player.x += direction * playerWalkSpeed;
            if (activePrisoner) {
                activePrisoner.x = player.x + direction * 48 * -1;
                activePrisoner.y = player.y;
            }

            if (Math.abs(player.x - playerTargetX) < playerWalkSpeed) {
                playerState = "stand";
                player.x = playerTargetX;
                playerTargetX = undefined;
            }
        };

        var turnOnAnimations = function turnOnAnimations() {
            player.animations.play('walk', 8, true);
            if (activePrisoner) {
                activePrisoner.animations.play('walk', 8, true);
            }
        };

        var turnOffAnimations = function turnOffAnimations() {
            player.animations.stop('walk', true);
            if (activePrisoner) {
                activePrisoner.animations.stop('walk', true);
            }
        };

        var _moveToPrisoner = function _moveToPrisoner() {
            if (isIntersect(player, clickedPrisoner)) {
                var cellSprite = cells[clickedPrisoner.cellIndex];
                cellSprite.animations.play('open', 15, false);
                gateOpenSound.play();
                clickedPrisoner.inputEnabled = false;
                clickedPrisoner.state = 'followingPlayer';
                clickedPrisoner.y = player.y;
                activePrisoner = clickedPrisoner;
                playerState = 'stand';
                var cell = cellContents[clickedPrisoner.cellIndex];
                var prisonerIndex = cell.indexOf(clickedPrisoner);
                cell[prisonerIndex] = null;
                var otherPrisoner = cell[(prisonerIndex + 1) % 2];
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

        var doExecution = function doExecution() {
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
                var scale = lerp(0, 1, axeMurderTimer / 30);
                axe.scale.setTo(scale, scale);
                screamSound.play();
            } else if (axeMurderTimer >= 30 && axeMurderTimer < 60) {
                swingSound.play();
                var ang = lerp(0, -45, (axeMurderTimer - 30) / 30);
                axe.angle = ang;
            } else if (axeMurderTimer >= 60 && axeMurderTimer < 80) {
                var _ang = lerp(-45, 120, (axeMurderTimer - 60) / 20);
                axe.angle = _ang;
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

        var checkClicks = function checkClicks() {
            checkClickOnChoppingBlock();
            checkClickOnLadder();
            checkClickOnSpace();
            checkClickOnWaitingRoom();
            checkClickOnCell();
            checkClickOnPrisoner();
        };

        ({
            stand: function stand() {
                clickedPrisoner = null;
                turnOffAnimations();
                checkClicks();
            },
            moveladder: function moveladder() {
                clickedPrisoner = null;
                turnOnAnimations();
                moveToTargetLadder();
                checkClicks();
            },
            moveToCell: function moveToCell() {
                clickedPrisoner = null;
                maybeLockHimUp();
                turnOnAnimations();
                moveToTargetSpace();
                checkClicks();
            },
            move: function move() {
                clickedPrisoner = null;
                turnOnAnimations();
                moveToTargetSpace();
                checkClicks();
            },
            climb: function climb() {
                clickedPrisoner = null;
                turnOnAnimations();
                _climb();
            },
            moveWaitingRoom: function moveWaitingRoom() {
                clickedPrisoner = null;
                maybeAttendPrisoner();
                turnOnAnimations();
                moveToTargetSpace();
                checkClicks();
            },
            moveToPrisoner: function moveToPrisoner() {
                turnOnAnimations();
                _moveToPrisoner();
                checkClicks();
            },
            moveToBlock: function moveToBlock() {
                clickedPrisoner = null;
                maybeExecutePrisoner();
                turnOnAnimations();
                moveToTargetSpace();
                checkClicks();
            },
            murder: function murder() {
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

        var moveForwardInLine = function moveForwardInLine(prisoners, prisoner) {
            var amIBumpingIntoTheNextGuyInLineAndIfSoWhoIsIt = intersectsAny(prisoners, prisoner, function (them) {
                return them.x > prisoner.x;
            });
            if (isIntersect(prisoner, ladderA) || amIBumpingIntoTheNextGuyInLineAndIfSoWhoIsIt) {
                prisoner.state = 'waitingroom';
            } else {
                prisoner.state = 'entering';
                prisoner.x += 200 / 60;
            }
        };

        var bideTimeInCell = function bideTimeInCell(prisoner) {
            prisoner.inputEnabled = !activePrisoner;
            var cell = cellContents[prisoner.cellIndex];
            var hatedThings = cell.filter(function (toCheck) {
                return toCheck && toCheck.race === raceRelationsMap[prisoner.race];
            });
            if (hatedThings.length > 0) {
                prisoner.anger++;
            }
            var helpfulThings = cell.filter(function (toCheck) {
                return toCheck && toCheck !== prisoner && toCheck.race === prisoner.race;
            });
            if (helpfulThings.length > 0) {
                prisoner.camaraderie++;
            }

            if (prisoner.anger > 300) {
                hatedThings.forEach(function (thing) {
                    prisonMurderSound.play();
                    var killThisIdx = cell.indexOf(thing);
                    cell[killThisIdx] = null;
                    destroyPrisoner(thing);
                    score += 10;
                    updateScore();
                });
                prisoner.anger = 0;
            }

            if (prisoner.camaraderie > 480) {
                prisoner.state = 'escape';
                prisoner.camaraderie = 0;
                currEscapeSound = (currEscapeSound + 1) % 2;
                escapeSounds[currEscapeSound].play();
            }
        };

        var _escape = function _escape(prisoner) {
            if (prisoner.y > 200 && isIntersect(prisoner, ladderA)) {
                prisoner.x = ladderA.centerX;
                prisoner.y -= playerClimbSpeed;
            } else {
                if (prisoner.y > 200) {
                    prisoner.y = levelYs[1]; // prisoner needs to be on lower floor walkway
                } else {
                    prisoner.y = levelYs[0];
                }
                prisoner.x -= playerWalkSpeed;
            }

            if (prisoner.x <= 190) {
                // 190 is the right edge of the door
                destroyPrisoner(prisoner);
                console.log('prisoner escaped!1!!');
                takeLife();
            }
        };

        prisoners.forEach(function (prisoner, idx) {
            if (!prisoner.alive) {
                console.warn("attempted to update dead prisoner", prisoner);
                return; // skip him, he's been deleted and did not disappear somehow
            }

            ({
                entering: function entering() {
                    moveForwardInLine(waitingPrisoners, prisoner);
                },
                waitingroom: function waitingroom() {
                    moveForwardInLine(waitingPrisoners, prisoner);
                },
                followingPlayer: function followingPlayer() {
                    prisoner.inputEnabled = false;
                },
                thrownIn: function thrownIn() {
                    bideTimeInCell(prisoner);
                },
                murder: function murder() {
                    // TODO
                },
                escape: function escape() {
                    prisoner.inputEnabled = false;
                    var cell = cellContents[prisoner.cellIndex];
                    cell[cell.indexOf(prisoner)] = null;
                    _escape(prisoner);
                }
            })[prisoner.state]();
        });
    }

    function updateScore() {
        scoreText.text = 'Score: ' + score.toString().padStart(6, '0');
        if (score % 50 === 0) {
            nextPrisonerDelay = nextPrisonerDelay > 120 ? nextPrisonerDelay - 30 : 120;
        }
    }

    function takeLife() {
        var heartSprite = heartSprites.shift();
        if (heartSprite) {
            heartSprite.destroy();
            if (heartSprites.length < 1) {
                game.state.start('GameOver');
            }
        }
    }

    function animateAxeLoading() {
        var sections = 4;
        var fps = 60;
        var animationFps = fps / (grindDuration / (sections - 1));
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
        var lastPrisoner = waitingPrisoners[waitingPrisoners.length - 1];
        if (lastPrisoner && lastPrisoner.x - prisonerSpawnX <= 16) {
            takeLife();
            return;
        }
        // pick random race
        var race = races[Math.floor(Math.random() * races.length)];
        var prisoner = game.add.sprite(prisonerSpawnX, levelYs[0], race);
        prisoner.animations.add('walk');
        prisoners.push(prisoner);
        waitingPrisoners.push(prisoner);
        prisoner.race = race;
        prisoner.state = 'entering'; // entering, waitingroom
        prisoner.anchor.setTo(0.5, 1);
    }

    function destroyPrisoner(prisoner) {
        var idx = prisoners.indexOf(prisoner);
        if (idx === -1) {
            console.warn("Tried to destroy a prisoner but couldn't find him.");
        }
        var vacateThis = findCellAndSlot(prisoner);
        if (vacateThis) {
            cellContents[vacateThis[0]][vacateThis[1]];
        }

        prisoners.splice(idx, 1);
        prisoner.destroy();
    }

    function findCellAndSlot(prisoner) {
        for (var c = 0; c < cellContents.length; c++) {
            var cell = cellContents[c];
            for (var s = 0; s < cell.length; s++) {
                var pris = cell[c];
                if (prisoner === pris) return [c, s];
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
            alsoSatisfy = function alsoSatisfy(thing) {
                return true;
            };
        }
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = arrayOfThings[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var thing = _step.value;

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
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        return null;
    };

    function spawnPointer(x, y) {
        var pointer = game.add.sprite(x, y, 'pointer');
        pointer.anchor.setTo(0.5, 1);
        var what = setInterval(function () {
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

        var t = 0;
        var id = setInterval(function () {
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
        if (debugOn) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = prisoners[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var prisoner = _step2.value;

                    game.debug.text(prisoner.state, prisoner.x - 32, prisoner.y - 64, "green");
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            for (var i = 0; i < cellContents.length; i++) {
                var theCell = cellContents[i];
                var formattedResidents = theCell.map(function (res) {
                    if (res === null) {
                        return 'null';
                    }
                    if (res === undefined) {
                        return 'undefined';
                    }
                    if (!res.race) {
                        return '???';
                    }
                    return res.race;
                });
                game.debug.text(theCell.length + ': [' + formattedResidents.join(',') + ']', 0, i * 16 + 400);
            }
            game.debug.text('grind progress: ' + grindProgress, 0, 6 * 16 + 400);
            game.debug.text('activePrisoner: ' + (activePrisoner ? activePrisoner.race : '___'), 0, 7 * 16 + 400);
            game.debug.text('clickedPrisoner: ' + (clickedPrisoner ? clickedPrisoner.race : '___'), 0, 8 * 16 + 400);
            game.debug.text(playerState, player.x - 32, player.y - 64, "white");
        }
    }

    return { preload: preload, create: create, update: update, render: render };
}

/***/ }),

/***/ "./src/prisoners-instructions-state.js":
/*!*********************************************!*\
  !*** ./src/prisoners-instructions-state.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = prisonersInstructionsState;
function prisonersInstructionsState(game) {

    var instructionsTextStyle = { font: '10pt Press Start 2P', fill: 'white', align: 'left', wordWrap: true, wordWrapWidth: game.width - 60 };

    var races = ['elf', 'hobbit', 'usurper', 'rebel', 'goblin', 'ogre'];
    var descriptions = ['Their nobility provokes the rebel, causing him to start a fight he can\'t win.', 'They can outsmart (and eliminate) goblins.', 'They can dominate simple-minded ogres.', 'Hates the bourgeois usurpers.', 'Hatred of elves runs deep in this species.', 'Eats little hobbitses.'];

    function preload() {}

    function create() {
        var backButtonStyle = { font: '10pt Press Start 2P', fill: '#FFFFFF', align: 'left' };
        var backButton = game.add.text(60, 30, '< Back', backButtonStyle);

        backButton.inputEnabled = true;
        backButton.events.onInputUp.add(function () {
            game.state.start('Instructions');
        });

        var startY = 90;
        var spriteX = 60;
        var nameX = 120;
        var descriptionX = 256;
        var currY = startY;

        races.forEach(function (raceName, i) {
            var prisoner = game.add.sprite(spriteX, currY, raceName);
            prisoner.animations.add('walk');
            prisoner.animations.play('walk', 8, true);
            prisoner.anchor.setTo(0, 0.5);

            game.add.text(nameX, currY, raceName, instructionsTextStyle);
            game.add.text(descriptionX, currY, descriptions[i], instructionsTextStyle);
            currY += 80;
        });
    }

    return { preload: preload, create: create };
}

/***/ }),

/***/ "./src/torch-handler.js":
/*!******************************!*\
  !*** ./src/torch-handler.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = torchHandler;
function torchHandler(game) {

    var torchX = [225, 548, 718, 548, 718];
    var torchY = [111, 111, 111, 271, 271];

    return {
        placeTorches: function placeTorches() {
            for (var i = 0; i < torchX.length; ++i) {
                var torch = game.add.sprite(torchX[i], torchY[i], 'torch');
                var light = torch.animations.add('light');
                torch.animations.play('light', 12, true);
            }
        }
    };
}

/***/ })

/******/ });
//# sourceMappingURL=main.js.map