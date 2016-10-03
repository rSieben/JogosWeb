//var http = require('http');

//http.createServer(function (req, res) {
//    res.writeHead(200, { 'Content-Type': 'text/plain' });
//    res.end("Ola mundo, node JS");
//}).listen(3000);


var MongoCliente = require('mongodb').MongoClient;
var db = null;

MongoCliente.connect('mongodb://127.0.0.1/test', function (erro, instancia) {
    if (erro)
        console.log("Erro ao estabelecer uma conexao com o db:" + erro);
    else {
        db = instancia;
        http.createServer(app)
            .listen(300, function () {
                console.log('servidor está no ar');
            });
    }
});

var express = require('express');
var engine = require('ejs-mate');
var app = express();

app.engine('ejs', engine);

app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', './views');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));


app.post('/jogo/inserir', function (req, res) {
    console.log(req.body);
    db.collection("jogos")
        .insert({ nome: req.body.nome, video: req.body.video }, function (erro, jogos) {
            if (!erro)
                res.render("index", { jogos: jogos });
            else
                res.status(500);
        });
});


app.get('/jogos', function (req, res) {
    db.collection("jogos")
        .find()
        .toArray(function (erro, jogos) {
            if (!erro)
                res.render("index", { jogos: jogos });
            else
                res.status(500);
        });
});


app.get('/jogo/:id', function (red, res) {
    db.collection("jogos")
        .find({ "_id": red.params.id }, function (erro, detalhes) {
            if (!erro)
                res.render("detalhes", { detalhes: detalhes });
            else
                res.status(500);
        });
});


var http = require('http');
http.createServer(app).listen(3000, function () {
    console.log('Servidor Express está funcionando');
});