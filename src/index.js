import playState from './play-state'

const game = new Phaser.Game(960, 540, Phaser.AUTO, 'game', undefined, undefined, false);
game.state.add('Play', playState(game));
game.state.start('Play');
