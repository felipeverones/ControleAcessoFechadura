// Importing the required modules
const ws = require('ws')

// Creating a new websocket server
const wss = new ws.WebSocketServer({ port: 8080 });

let lockerStatus = [
    {
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
    },
];

// Creating connection using websocket
wss.on("connection", ws => {

    ws.send(JSON.stringify(lockerStatus));

    // sending message
    ws.on("message", data => {
        // Atualizar o status das fechaduras.
        console.log(`Client has sent us: ${data}`)
        lockerStatus = JSON.parse(data);
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
