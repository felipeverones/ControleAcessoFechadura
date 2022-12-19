const express         = require( 'express' )
const app             = express()
const server          = require('http').createServer(app)


const WebSocket = require( 'ws' )
const wss = new WebSocket.Server( { server } )

// websocket manda info para a fechadura
// axios comunicar com o app

server.listen( 10000, (ws) => {console.log( "Server listens on 10000" ) })

var path = require('path')

app.use(express.static(dirname + '/style'));
app.use(express.static( path.resolve( 'client/' ) ));
app.use(express.static( dirname ) )
// usar com o cliente
app.get('/', function (req, res) { res.sendFile( path.resolve('client/index.html') ) })

name = 'Jao'
JSON.stringify( '{ "User":"' + name + '","Senha": "123" }' )

data

data = JSON.parse( data )


/* <= do Client
nomeDoUsario = response  */


/* function verificarNoBancoDeDados(reponse.username,response.password)
function mandarWebsocketParaUmaFechadura(reponse.username,response.password) */


// comunicar com a fechadura
wss.on( 'connection', ( ws ) =>
{
    // data eh o que veio do client( app )
    ws.onmessage = ( {data} ) =>
    {
        data = JSON.parse( data )

    }

    ws.send( JSON.stringify( '{abre}' )  )
})

/* return 

=>post para o Client


true => mudar de tela

<button>sala 1 => to server( sala1 )
<button>sala 2
<button>
<button>
<button>
<button>
<button>

mongo */