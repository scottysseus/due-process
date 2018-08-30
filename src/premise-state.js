import entryState from './entry-state';

export default function premiseState(game) {

    let textCrawlStyle = { font: '10pt Press Start 2P', fill: 'white', align: 'left', wordWrap: true, wordWrapWidth: game.width-60};
    let textCrawl = 'Premise\n\n'
                    + 'The Kingdom of Fecea is asphyxiating from the nauseating fumes of crime, bankruptcy, and moral degeneracy.\n'
                    + 'Brigands, highway robbers, and non-humans frustrate the attempts of the Kingdom\'s law enforcement to maintain order.\n\n'
                    + 'In the bowels of the Kingdom\'s most infamous gaol, you are Thelonious, the lone executioner.\n\n'
                    + 'Your goal: prevent the prison from overflowing, while remaining carefully within the law (which permits spontaneous executions).';

    return {
        create: function() {
            let buttonStyle = { font: '10pt Press Start 2P', fill: '#FFFFFF', align: 'left'};
            let backButton = game.add.text(60, 30, '< Back', buttonStyle);

            let instructionsButtonStyle = { font: '10pt Press Start 2P', fill: '#FFFFFF', align: 'right'};
            let instructionsButton = game.add.text(game.world.width - 240, 30, 'Instructions >', instructionsButtonStyle);

            backButton.inputEnabled = true;
            backButton.events.onInputUp.add(function () {
                game.state.start('Entry');
            });

            instructionsButton.inputEnabled = true;
            instructionsButton.events.onInputUp.add(() => {
                game.state.start('Instructions');
            });

            let aboutText = game.add.text(60, 90, textCrawl, textCrawlStyle);
        }
    };

};
