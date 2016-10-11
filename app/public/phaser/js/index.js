window.addEventListener('load', body_onload);

function body_onload() {

    var direction = "direita";

    var principalState = {
        preload: function () {
            jogo.load.image('player', 'assets/player.png');
            jogo.load.image('wallV', 'assets/wallVertical.png');
            jogo.load.image('wallH', 'assets/wallHorizontal.png');
            jogo.load.image('coin', 'assets/coin.png');
        },

        create: function () {
            this.jogador = jogo.add.sprite(jogo.width * 0.5, jogo.width * 0.5, 'player');

            this.jogador.anchor.setTo(0.5, 0.5);
            jogo.physics.arcade.enable(this.jogador);
            this.jogador.body.gravity.y = 500;

            this.cursor = jogo.input.keyboard.createCursorKeys();

            this.moeda = jogo.add.sprite(60, 148, 'coin');
            this.moeda.anchor.setTo(0.5, 0.5);
            this.physics.arcade.enable(this.moeda);

            this.pontuacaoLabel = jogo.add.text(25, 25, 'Score: 0', { fontSize: '20px', fill: '#fff' });
            this.pontuacao = 0;

            this.criarMundo();

        },

        update: function () {
            this.moverJogador();
            //this.moverBot();
            this.hitPlatform = jogo.physics.arcade.collide(this.jogador, this.paredes);

            if (!this.jogador.inWorld) {
                this.reiniciar();
            }
        },

        reiniciar: function () {
            jogo.state.start('principal');
        },

        criarMundo: function () {

            this.paredes = jogo.add.group();
            this.paredes.enableBody = true;

            jogo.add.sprite(0, 0, 'wallV', 0, this.paredes);
            jogo.add.sprite(480, 0, 'wallV', 0, this.paredes);

            jogo.add.sprite(0, 0, 'wallH', 0, this.paredes);
            jogo.add.sprite(300, 0, 'wallH', 0, this.paredes);
            jogo.add.sprite(0, 320, 'wallH', 0, this.paredes);
            jogo.add.sprite(300, 320, 'wallH', 0, this.paredes);

            jogo.add.sprite(-100, 160, 'wallH', 0, this.paredes);
            jogo.add.sprite(400, 160, 'wallH', 0, this.paredes);

            var cima = jogo.add.sprite(100, 80, 'wallH', 0, this.paredes);
            cima.scale.setTo(1.5, 1);

            var baixo = jogo.add.sprite(100, 240, 'wallH', 0, this.paredes);
            baixo.scale.setTo(1.5, 1);

            this.paredes.setAll('body.immovable',true);

        },

        moverJogador: function () {

            if (this.cursor.left.isDown) {
                this.jogador.body.velocity.x = -200;
            } else if (this.cursor.right.isDown) {
                this.jogador.body.velocity.x = 200;
            } else {
                this.jogador.body.velocity.x = 0;
            }

            if (this.cursor.up.isDown) {
                console.log("pulou");
                this.jogador.body.velocity.y = -320;
            } else if (this.cursor.up.isDown || this.hitPlatform) {
                console.log("is hitting plataforma: " + this.hitPlatform + " is pressing Up: " + this.cursor.up.isDown + " is touching ground: " + this.jogador.body.touching.down);
            }

        },

        moverBot: function () {

            for (var i = 0; i < enemy.length(); i++){
                if (this.bot.x == 800)
                    direction = "esquerda";
                else if (this.bot.x == 0)
                    direction = "direita";


                if (direction == "direita")
                    this.bot.x += 5;
                else if (direction == "esquerda")
                    this.bot.x -= 5;
            }
        }

    };

    var jogo = new Phaser.Game(500, 340, Phaser.AUTO, 'gameDiv');
    jogo.state.add('principal', principalState);
    jogo.state.start('principal');

}