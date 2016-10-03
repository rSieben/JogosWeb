window.addEventListener('load', body_onload);

function body_onload() {
    var principalState = {
        preload: function () {
            game.load.image('haduken', 'img/pose_haduken.png');
        },

        create: function () {
            this.sprite = game.add.sprite(200, 161, 'haduken');
        },

        update: function () {
            this.sprite.angle += 1;
        }
    };
};