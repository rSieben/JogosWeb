window.addEventListener('load', body_onload);

function body_onload() {

    var direction = "direita";

    var principalState = {
        preload: function () {
            jogo.load.image('player', 'assets/player.png');
        },

        create: function () {
            this.sprite = jogo.add.sprite(20, 20, 'player');
        },

        update: function () {
            if (this.sprite.x == 800)
                direction = "esquerda";
            else if (this.sprite.x == 0)
                direction = "direita";

            if (direction == "direita") 
                this.sprite.x += 5;
            else if (direction == "esquerda")
                this.sprite.x -= 5;
        }
    };

    var jogo = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');
    jogo.state.add('principal', principalState);
    jogo.state.start('principal');

}