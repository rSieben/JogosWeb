window.addEventListener('load', body_onload);

function body_onload() {

    var direction = "direita";

    var principalState = {
        preload: function () {
            jogo.load.image('player', 'assets/player.png');
            jogo.load.image('wallV', 'assets/wallVertical.png');
            jogo.load.image('wallH', 'assets/wallHorizontal.png');
            jogo.load.image('coin', 'assets/coin.png');
            jogo.load.image('enemy', 'assets/enemy.png');
        },

        create: function () {

            // jogador
            this.jogador = jogo.add.sprite(jogo.width * 0.5, jogo.width * 0.5, 'player');
            this.jogador.anchor.setTo(0.5, 0.5);
            jogo.physics.arcade.enable(this.jogador);
            this.jogador.body.gravity.y = 500;
            this.jogador.vidas = 3;

            // cursor inputs
            this.cursor = jogo.input.keyboard.createCursorKeys();

            //moeda
            this.moeda = jogo.add.sprite(60, 148, 'coin');
            this.moeda.anchor.setTo(0.5, 0.5);
            this.physics.arcade.enable(this.moeda);

            //pontuacao
            this.pontuacaoLabel = jogo.add.text(25, 25, 'Score: 0', { fontSize: '20px', fill: '#fff' });
            this.pontuacao = 0;

            // inimigo
            this.inimigos = jogo.add.group();
            this.inimigos.enableBody = true;
            this.inimigos.createMultiple(10, 'enemy');

            jogo.time.events.loop(2200, this.adicionarInimigo, this);

            this.criarMundo();

        },

        update: function () {

            console.log(this.jogador.vidas);

            this.hitPlatform = jogo.physics.arcade.collide(this.jogador, this.paredes);
            this.hitPlayer = jogo.physics.arcade.collide(this.jogador, this.inimigos);

            jogo.physics.arcade.collide(this.inimigos, this.inimigos);
            jogo.physics.arcade.collide(this.inimigos, this.paredes);
            jogo.physics.arcade.overlap( this.jogador,
                                                            this.moeda,
                                                            this.pegarMoeda,
                                                            null,
                                                            this);

            this.moverJogador();

            if (this.hitPlayer) {
                this.jogador.vidas--;
            }

            if (!this.jogador.inWorld || this.jogador.vidas <= 0) {
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

        adicionarInimigo: function () {
            var inimigo = this.inimigos.getFirstDead();
            if (!inimigo)
                return;
            inimigo.anchor.setTo(0.5, 1);
            inimigo.reset(jogo.width * 0.5, 1);
            inimigo.body.gravity.y = 500;
            inimigo.body.gravity.x = 100 * jogo.rnd.pick([-1, 1]);
            inimigo.body.bounce.x = 1;
            //morrer quando sair da tela
            inimigo.checkWorldBounds = true;
            inimigo.outOfBoundsKill= true;
        },

        moverJogador: function () {
            if (this.cursor.left.isDown) {
                this.jogador.body.velocity.x = -200;
            } else if (this.cursor.right.isDown) {
                this.jogador.body.velocity.x = 200;
            } else {
                this.jogador.body.velocity.x = 0;
            }

            if (this.cursor.up.isDown && this.hitPlatform) {
                this.jogador.body.velocity.y = -320;
            }

        },

        pegarMoeda: function (jogador, moeda) {
            this.moeda.kill;
            this.pontuacao += 5;
            this.pontuacaoLabel.text = this.pontuacao;
            this.atualizarPosicaoMoeda();
        },

        atualizarPosicaoMoeda() {
            var posicoes = [
                { x: 140, y: 60}, {x:360, y:60},
                { x: 60, y: 140}, {x:440, y:140},
                { x: 130, y: 300}, {x:370, y:300}
            ];

            for (var i = 0; i < posicoes.length; i++) {
                if (posicoes[i].x == this.moeda.x) {
                    posicoes.splice(i, 1);
                    break;
                }
            }

            var novaPosicao = jogo.rnd.pick(posicoes);
            this.moeda.reset(novaPosicao.x, novaPosicao.y);

        }

    };

    var jogo = new Phaser.Game(500, 340, Phaser.AUTO, 'gameDiv');
    jogo.state.add('principal', principalState);
    jogo.state.start('principal');

}