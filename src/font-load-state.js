export default function fontLoadState(game) {

    window.fontsLoaded = function() {
        game.state.start('Entry');
    }

    return {
        preload: function() {
            //  The Google WebFont Loader will look for this object, so create it before loading the script.
            global.WebFontConfig = {

                //  'active' means all requested fonts have finished loading
                //  We set a 1 second delay before calling 'createText'.
                //  For some reason if we don't the browser cannot render the text the first time it's created.
                active: function() {
                    game.time.events.add(Phaser.Timer.SECOND, fontsLoaded, this);
                },

                //  The Google Fonts we want to load (specify as many as you like in the array)
                google: {
                    families: ['Press Start 2P']
                }
            };

            //  Load the Google WebFont Loader script
            game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        }
    };

}
