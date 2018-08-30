export default function aboutState(game) {

    let textCrawlStyle = { font: '10pt Press Start 2P', fill: 'white', align: 'left', wordWrap: true, wordWrapWidth: game.width-60};
    let textCrawl = 'About\n\n'
                    + 'Original story, art, music, and gameplay developed by libjared and scottyseus for'
                    + ' Ludum Dare Jam 42.\n\n'
                    + 'Check out the links below:';

    return {
        create: function() {
            let buttonStyle = { font: '10pt Press Start 2P', fill: '#FFFFFF', align: 'left'};
            let backButton = game.add.text(60, 30, '< Back', buttonStyle);

            let scottyseusButton = game.add.text(60, 240, '> scottyseus on GitHub <', buttonStyle);
            let libjaredButton = game.add.text(60, 280, '> libjared on GitHub <', buttonStyle);
            let submissionButton = game.add.text(60, 320, '> Ludum Dare page <', buttonStyle);

            backButton.inputEnabled = true;
            backButton.events.onInputUp.add(function () {
                game.state.start('Entry');
            });

            scottyseusButton.inputEnabled = true;
            scottyseusButton.events.onInputUp.add(function () {
                window.location.href = "https://github.com/scottyseus/due-process";
            });
            
            libjaredButton.inputEnabled = true;
            libjaredButton.events.onInputUp.add(function () {
                window.location.href = "https://github.com/libjared";
            });
            

            submissionButton.inputEnabled = true;
            submissionButton.events.onInputUp.add(function () {
                window.location.href = "https://ldjam.com/events/ludum-dare/42/due-process-1";
            });

            let aboutText = game.add.text(60, 90, textCrawl, textCrawlStyle);
        }
    };

};