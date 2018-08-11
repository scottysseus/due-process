export default entryState = function(game, playState) {
    return {
        preload: function() {},
        create: function() {
            // looks like we have to create a style for or menu option
            var optionStyle = { font: '30pt TheMinion', fill: 'white', align: 'left' };
            // the text for start
            var txt = game.add.text(30, 280, 'Start', optionStyle);
            // so how do we make it clickable?  We have to use .inputEnabled!
            txt.inputEnabled = true;
            // Now every time we click on it, it says "You did it!" in the console!
            txt.events.onInputUp.add(function () { console.log('You did it!') });
            // game.state.add('Play', playState);
            // game.state.start('Play');
        }
    }
};
