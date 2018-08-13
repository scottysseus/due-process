export default function prisonersInstructionsState(game) {

    let instructionsTextStyle = { font: '10pt Press Start 2P', fill: 'white', align: 'left', wordWrap: true, wordWrapWidth: game.width-60};

    const races = [ 'elf', 'hobbit', 'usurper', 'rebel', 'goblin', 'ogre' ];
    const descriptions = [
        'Their nobility provokes the rebel, causing him to start a fight he can\'t win.',
        'They can outsmart (and eliminate) goblins.',
        'They can dominate simple-minded ogres.',
        'Hates the bourgeois usurpers.',
        'Hatred of elves runs deep in this species.',
        'Eats little hobbitses.'
    ];

    function preload() {
        
    }

    function create() {
        let backButtonStyle = { font: '10pt Press Start 2P', fill: '#FFFFFF', align: 'left'};
        let backButton = game.add.text(60, 30, '< Back', backButtonStyle);

        backButton.inputEnabled = true;
        backButton.events.onInputUp.add(function () {
            game.state.start('Instructions');
        });

        let startY = 90;
        let spriteX = 60;
        let nameX = 120;
        let descriptionX = 256;
        let currY = startY;

        races.forEach((raceName, i) => {
            let prisoner = game.add.sprite(spriteX, currY, raceName);
            prisoner.animations.add('walk');
            prisoner.animations.play('walk', 8, true);
            prisoner.anchor.setTo(0, 0.5);

            game.add.text(nameX, currY, raceName, instructionsTextStyle);
            game.add.text(descriptionX, currY, descriptions[i], instructionsTextStyle);
            currY += 80;
        });
    }

    return {preload, create};
}