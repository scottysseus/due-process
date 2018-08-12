export default function gameOverState(game) {

    function create() {
        let titleStyle = { font: '50pt Press Start 2P', fill: '#FFFFFF', align: 'center'};
        let text = game.add.text(game.world.centerX, game.world.centerY, 'Game Over', titleStyle);
        text.anchor.set(0.5);

        let buttonStyle = { font: '10pt Press Start 2P', fill: '#FFFFFF', align: 'left'};
        let backButton = game.add.text(60, 30, 'Back', buttonStyle);

        backButton.inputEnabled = true;
        backButton.events.onInputUp.add(function () {
                game.state.start('Entry');
        });
    }
    
    return {create};
}