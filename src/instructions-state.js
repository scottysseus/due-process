export default function instructionsState(game) {

    let instructionsTextStyle = { font: '10pt Press Start 2P', fill: 'white', align: 'left', wordWrap: true, wordWrapWidth: game.width-60};
    let instructionsText = 'Gain points for every prisoner who dies!!!\n\n'
                         + '1. Move by right clicking.\n\n'
                         + '2. Prisoners will queue up by the door. Click on them to attend to them.\n\n'
                         + '3. While attending to a prisoner, you can excort them to a cell or to the chopping block.\n\n'
                         + '4. Cells can hold two prisoners, and they interact with eachother. Some prisoners kill eachother (good),'
                         + 'but if two prisoners of the same type share a cell for too long, they can escape!\n\n'
                         + '5. Each prisoner who escapes takes one of your lives with them!\n\n'
                         + '6. The chopping block requires the axe to be sharpened after each use (its availability can be seen at the top).';

    function create() {
        let backButtonStyle = { font: '10pt Press Start 2P', fill: '#FFFFFF', align: 'left'};
        let backButton = game.add.text(60, 30, '< Back', backButtonStyle);

        let racesButtonStyle = { font: '10pt Press Start 2P', fill: '#FFFFFF', align: 'left'};
        let racesButton = game.add.text(game.world.width - 240, 30, 'Prisoners >', racesButtonStyle);

        backButton.inputEnabled = true;
        backButton.events.onInputUp.add(function () {
            game.state.start('About');
        });

        racesButton.inputEnabled = true;
        racesButton.events.onInputUp.add(() => {
            game.state.start('Prisoners');
        });

        game.add.text(60, 90, instructionsText, instructionsTextStyle);
    }

    return {create};
}