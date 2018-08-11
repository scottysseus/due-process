import fontLoadState from './font-load-state';

const game = new Phaser.Game(960, 540, Phaser.AUTO, 'game', undefined, undefined, false);
game.state.add('FontLoad', fontLoadState(game));
game.state.start('FontLoad');
