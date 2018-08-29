export default function entryState(game) {
    return {
        preload: function() {
            
        },

        init: function() {
        },
 
        create: function() {
            
            let titleStyle = { font: '50pt Press Start 2P', fill: '#FFFFFF', align: 'center'};
            let text = game.add.text(game.world.centerX, 100, 'Due Process', titleStyle);
            text.anchor.set(0.5);

            var optionStyle = { font: '30pt Press Start 2P', fill: 'white', align: 'left' };
            var startOption = game.add.text(30, 280, 'Start', optionStyle);

            startOption.inputEnabled = true;
            startOption.events.onInputUp.add(function () {
                game.state.start('About');
            });
            if(!window.theme.isPlaying) {
                window.theme.play();
            }

            // RESTART this state because FOR SOME REASON
            // the THEMESONG only plays the second time the state is entered
            // *enraged screaming ensues*
            game.state.start('Entry');
        },

        update: function() {
            
        }
    }
};
