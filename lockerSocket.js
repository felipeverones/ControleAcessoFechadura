// Importing the required modules
const ws = require('ws')
const { MongoClient } = require('mongodb')
const url = "mongodb://localhost:27017"
const mongoclient = new MongoClient(url)
const dbName = 'FechaduraDB'

async function acessaBancoFechaduras(){
    await mongoclient.connect()
    const db    = mongoclient.db( dbName )
	const fechaduras = db.collection( 'fechadura' )
    fechadura = await fechaduras.find().toArray()
    fechaduralist = []
    for( i = 0; i < fechadura.length; ++i ) { fechaduralist.push( fechadura[i]) }
    return fechaduralist
}

async function updateFechadura(idLocker, locked){
    await mongoclient.connect()
    const db    = mongoclient.db( dbName )
	const fechaduras = db.collection( 'fechadura' )
    const updateResult = await fechaduras.updateOne({ idLocker: idLocker }, { $set: { locked: locked } });
}


// Creating a new websocket server
const wss = new ws.WebSocketServer({ port: 8080 });

let clients = []

let lockerStatus = [
    /* {
        'idLocker': '1',
        'locked': false,
    },
    {
        'idLocker': '2',
        'locked': false,
    },
    {
        'idLocker': '3',
        'locked': false,
    },
    {
        'idLocker': '4',
        'locked': true,
    }, */
];

let lockerStatusPromisse = acessaBancoFechaduras();


lockerStatusPromisse.then( lockers => {
    lockerStatus  = lockers;
    console.log(lockers)
})



// Creating connection using websocket
wss.on("connection", ws => {

    ws.send(JSON.stringify(lockerStatus));

    // sending message
    ws.on("message", data => {
        // Atualizar o status das fechaduras.
        console.log(`Client has sent us: ${data}`)
        
        lockerStatus = JSON.parse(data);
        lockerStatus.forEach(locker => {
            updateFechadura(locker.idLocker, locker.locked)
        });

        
        wss.clients.forEach(client => client.send(JSON.stringify(lockerStatus)));
    });

    // handling what to do when clients disconnects from server
    ws.on("close", () => {
        console.log("the client has connected");
    });

    // handling client connection error
    ws.onerror = function () {
        console.log("Some Error occurred")
    }
});

console.log("The WebSocket server is running on port 8080");
