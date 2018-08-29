import playState from './play-state';

export default function raceRelationsState(game) {

    let arrowTextStyle = { font: '10pt Press Start 2P', fill: 'white', align: 'left', wordWrap: true, wordWrapWidth: game.width-60};

    const races = [ 'elf', 'hobbit', 'usurper', 'rebel', 'goblin', 'ogre' ];
    const raceRelationsMap = {
        'goblin': 'elf', // goblins hate elves, a hatred as old as the two races
        'elf': 'rebel', // elves are nobler than rebels, causing the rebels to instigate a fight they can't win
        'rebel': 'usurper', // rebels hate bourgeois usurpers; class struggle is real
        'usurper': 'ogre', // usurpers dominate ogres; their commanding presence whittles away at the ogre
        'ogre': 'hobbit', // ogres eat hobbits, and they are hungry
        'hobbit': 'goblin', // hobbits outsmart goblins
    };

    let raceInstructions = 'Here is a diagram of the relationships between the prisoner types:';

    function preload() {
        
    }

    function create() {
        let backButtonStyle = { font: '10pt Press Start 2P', fill: '#FFFFFF', align: 'left'};
        let playButtonStyle = { font: '20pt Press Start 2P', fill: '#FFFFFF', align: 'left'};
        let backButton = game.add.text(60, 30, '< Back', backButtonStyle);
        var startOption = game.add.text(game.world.width - 220, 30, 'Start', playButtonStyle);

        startOption.inputEnabled = true;
        startOption.events.onInputUp.add(function () {
            game.state.add('Play', playState(game));
            game.state.start('Play');
        });

        backButton.inputEnabled = true;
        backButton.events.onInputUp.add(function () {
            game.state.start('Prisoners');
        });

        let colStartX = 60;
        let startY = 240;
        let spriteXOffset = 0;
        let spriteX2Offset = 85;
        let arrowXOffset = 55;
        let currY = startY;

        races.forEach((raceName, i) => {
            currY = ((i + 1) % 3) * 90 + startY;
            if(i > 2) {
                colStartX = 512;
            }
            let prisoner = game.add.sprite(colStartX + spriteXOffset, currY, raceName);
            prisoner.animations.add('walk');
            prisoner.animations.play('walk', 8, true);
            prisoner.anchor.setTo(0, 0.5);

            let prisoner2 = game.add.sprite(colStartX + spriteX2Offset, currY, raceRelationsMap[raceName]);
            prisoner2.animations.add('walk');
            prisoner2.animations.play('walk', 8, true);
            prisoner2.anchor.setTo(0, 0.5);

            game.add.text(colStartX + arrowXOffset, currY, '>', arrowTextStyle);
            
        });

        let aboutText = game.add.text(60, 90, raceInstructions, arrowTextStyle);
    }

    return {preload, create};
}