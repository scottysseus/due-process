import playState from './play-state';
import aboutState from './about-state';

export default function entryState(game) {
    return {

        create: function() {
            let titleStyle = { font: '50pt Press Start 2P', fill: '#FFFFFF', align: 'center'};
            let text = game.add.text(game.world.centerX, 100, 'Due Process', titleStyle);
            text.anchor.set(0.5);

            var optionStyle = { font: '30pt Press Start 2P', fill: 'white', align: 'left' };
            var startOption = game.add.text(30, 280, 'Start', optionStyle);
            var aboutOption = game.add.text(30, 380, 'About', optionStyle);

            startOption.inputEnabled = true;
            startOption.events.onInputUp.add(function () {
                game.state.add('Play', playState(game));
                game.state.start('Play');
            });

            aboutOption.inputEnabled = true;
            aboutOption.events.onInputUp.add(function() {
                game.state.add('About', aboutState(game));
                game.state.start('About');
            });
        }
    }
};
