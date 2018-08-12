import fontLoadState from './font-load-state';
import playState from './play-state'; // initialize the play state in entry state to reset all the variables in play state
import entryState from './entry-state';
import aboutState from './about-state';
import gameOverState from './game-over-state';

import instructionsState from './instructions-state';

const game = new Phaser.Game(960, 540, Phaser.AUTO, 'game', undefined, undefined, false);
game.state.add('FontLoad', fontLoadState(game));
game.state.add('Entry', entryState(game));
game.state.add('About', aboutState(game));
game.state.add('GameOver', gameOverState(game));
game.state.add('Instructions', instructionsState(game));
game.state.start('FontLoad');
