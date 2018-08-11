import entryState from './entry-state';

const game = new Phaser.Game(960, 540, Phaser.AUTO, 'game', undefined, undefined, false);
game.state.add('Entry', entryState(game));
game.state.start('Entry');
