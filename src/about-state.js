import entryState from './entry-state';

export default function aboutState(game) {

    let textCrawlStyle = { font: '10pt Press Start 2P', fill: 'white', align: 'left', wordWrap: true, wordWrapWidth: game.width-60};
    let textCrawl = 'Premise\n\n'
                    + 'The Kingdom of Fecea is asphyxiating from the nauseating fumes of crime, bankruptcy, and moral degeneracy.\n'
                    + 'Brigands, highway robbers, and non-humans frustrate the attempts of the Kingdom\'s law enforcement to maintain order.\n\n'
                    + 'In the bowels of the Kingdom\'s most infamous gaol, you are Thelonious, the lone executioner. The prison is running out of space!';

    return {
        create: function() {
            let buttonStyle = { font: '10pt Press Start 2P', fill: '#FFFFFF', align: 'left'};
            let backButton = game.add.text(60, 30, 'Back', buttonStyle);

            backButton.inputEnabled = true;
            backButton.events.onInputUp.add(function () {
                game.state.start('Entry');
            });

            let aboutText = game.add.text(60, 90, textCrawl, textCrawlStyle);
        }
    };

};
