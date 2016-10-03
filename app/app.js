//var http = require('http');

//http.createServer(function (req, res) {
//    res.writeHead(200, { 'Content-Type': 'text/plain' });
//    res.end("Ola mundo, node JS");
//}).listen(3000);

var MongoCliente = require('mongodb').MongoClient;
var db = null;

app.get('/jogos', function (req, res) {
    db.collection("jogos")
        .find()
        .toArray(function (erro, jogos) {
            if (!erro)
                res.render("jogos", { "listaJogos":jogos });
            else
                res.status(500);
        });
});

var jogos = [
    { _id: 1, nome: 'CS:GO', video: 'fOE3G0DfOcA' },
    { _id: 2, nome: 'OverWatch', video: 'kjZsAqrROlg' },
    { _id: 3, nome: 'Battlefield', video: '1SSQzYD4dlI'  },
    { _id: 4, nome: 'The Crew', video: 'R7X5EyZ3RJQ'  },
    { _id: 5, nome: 'Rust', video: 'i7xmL-bdv10'  },
    { _id: 6, nome: 'Eclipse', video: 'uS157k0m-YU'  },
    { _id: 7, nome: 'Forza', video: 'ZL5xigcNLgw'  },
    { _id: 8, nome: 'Medal of Honor', video: 'ogqQx0F0mpQ'  }
];

var express = require('express');
var engine = require('ejs-mate');
var app = express();

app.engine('ejs', engine);

app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', './views');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/jogo/inserir', function (req, res) {
    res.render('inserir-jogo');
});

app.post('/jogo/inserir', function (req, res) {
    console.log(req.body);
    res.end('Formularo enviado');
});

app.get('/jogos', function (red, res) {
    res.render('index', { jogos: jogos});
});

app.get('/jogo/:id', function (red, res) {
    var detalhes = jogos.filter(function (c) {
        return c._id == red.params.id;
    })[0];

    if (detalhes)
        res.render('detalhes', { detalhes: detalhes });
    else
        res.status(404).send('Error 404. A página que está tentando acessar não existe');
});

var http = require('http');
http.createServer(app).listen(3000, function () {
    console.log('Servidor Express está funcionando');
});