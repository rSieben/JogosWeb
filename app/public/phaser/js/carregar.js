var carregarState = {
    preload: function () {
        var loadingLabel = jogo.add.text(jogo.width * 0.5, 150,
            'carregando...', {font: '30px Arial',fill: '#FFF'});

        loadingLabel.anchor.setTo(0.5, 0.5);

        var barraProgresso = jogo.add.sprite(jogo.width * 0.5, 200, 'progressBar');

        jogo.load.setPreloadSprite(barraProgresso);

        jogo.load.image('player', 'assets/player.png');
        jogo.load.image('wallV', 'assets/wallVertical.png');
        jogo.load.image('wallH', 'assets/wallHorizontal.png');
        jogo.load.image('coin', 'assets/coin.png');
        jogo.load.image('enemy', 'assets/enemy.png');
    },

    create: () => {
        jogo.state.start('menu');
    }
};