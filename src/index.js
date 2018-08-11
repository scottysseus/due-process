const game = new Phaser.Game(960, 540, Phaser.AUTO, 'phaser-example', {
    preload, create, update, render
});

function preload() {
    const img = (name) => `src/assets/${name}.png`;
    game.load.spritesheet('ogre', img('ogre'), 96/2, 72);
    game.load.spritesheet('player', img('player'), 128/4, 64);
    game.load.image('bg', img('bgtiled'));
}

let player;
let cursors;
let fireButton;
let ladderA;

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    starfield = game.add.tileSprite(0, 0, 960, 540, 'bg');

    //  The hero!
    player = game.add.sprite(300, 200, 'player');
    player.anchor.setTo(0.5, 0.5);
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.inputEnabled = true;

    ladder = game.add.sprite();

    //  And some controls to play the game with
    // cursors = game.input.keyboard.createCursorKeys();
    // fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function update() {
    if (player.alive)
    {
        if (player.input.justPressed() && Phaser.Mouse.BACK_BUTTON) {
            player.body.velocity.y -= 10;
        }
    }
}

function render() {
    // game.debug.body(player);
}
