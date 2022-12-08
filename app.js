var express = require ('express'); 
//aqui declaramos uma variável que contem o módulo express, que estamos pegando na pasta node_modules

var app = express();
app.get('/', function (req, res) {
    res.send('Hello World!');
});

// Endpoint de testes.
app.get('/verones', function (req, res) {

    let val1 = 50;
    let val2 = 100;

    res.send('' + (val1+val2));
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
// listen inicia um servidor, e colocamos ele para escutar a porta 3000. Ele responde com "Hello World!"