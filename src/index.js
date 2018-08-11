import fontLoadState from './font-load-state';
import playState from './play-state';
import entryState from './entry-state';
import aboutState from './about-state';

const game = new Phaser.Game(960, 540, Phaser.AUTO, 'game', undefined, undefined, false);
game.state.add('FontLoad', fontLoadState(game));
game.state.add('Entry', entryState(game));
game.state.add('About', aboutState(game));
game.state.add('Play', playState(game));
game.state.start('Play');
