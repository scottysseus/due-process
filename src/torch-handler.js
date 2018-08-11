export default function torchHandler(game) {

    let torchX = [225, 548, 718, 548, 718];
    let torchY = [131, 131, 131, 291, 291];

    return {
        placeTorches: function() {
            for(var i = 0; i < torchX.length; ++i) {
                let torch = game.add.sprite(torchX[i], torchY[i], 'torch');
                let light = torch.animations.add('light');
                torch.animations.play('light', 12, true);
            }
        }
    };

}
