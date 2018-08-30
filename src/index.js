import fontLoadState from './font-load-state';
import assetLoadState from './asset-load-state';
import playState from './play-state'; // initialize the play state in entry state to reset all the variables in play state
import entryState from './entry-state';
import aboutState from './about-state';
import premiseState from './premise-state';
import gameOverState from './game-over-state';
import raceRelationsState from './race-relations-state';

import instructionsState from './instructions-state';
import prisonersInstructionsState from './prisoners-instructions-state';

const game = new Phaser.Game(960, 540, Phaser.AUTO, 'game', undefined, undefined, false);
game.state.add('FontLoad', fontLoadState(game));
game.state.add('AssetLoad', assetLoadState(game));
game.state.add('Entry', entryState(game));
game.state.add('About', aboutState(game));
game.state.add('Premise', premiseState(game));
game.state.add('GameOver', gameOverState(game));
game.state.add('Instructions', instructionsState(game));
game.state.add('Prisoners', prisonersInstructionsState(game));
game.state.add('Races', raceRelationsState(game));
game.state.start('FontLoad');
