export default function assetLoadState(game) {

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