import playState from './play-state';
import aboutState from './about-state';

export default function entryState(game) {
    window.createText = function() {

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
    }

    return {

        preload: function() {
            //  The Google WebFont Loader will look for this object, so create it before loading the script.
            global.WebFontConfig = {

                //  'active' means all requested fonts have finished loading
                //  We set a 1 second delay before calling 'createText'.
                //  For some reason if we don't the browser cannot render the text the first time it's created.
                active: function() {
                    game.time.events.add(Phaser.Timer.SECOND, createText, this);
                },

                //  The Google Fonts we want to load (specify as many as you like in the array)
                google: {
                    families: ['Press Start 2P']
                }
            };

            //  Load the Google WebFont Loader script
            game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        },

        create: function() {

        },
    }
};
