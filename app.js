const express = require('express');
const app = express();
const { MongoClient } = require('mongodb')
const url = "mongodb://localhost:27017"
const mongoclient = new MongoClient(url)
const dbName = 'FechaduraDB'

async function acessaBanco(){
    await mongoclient.connect()
    const db    = mongoclient.db( dbName )
	const users = db.collection( 'users' )
    user = await users.find().toArray()
    userlist = []
    for( i = 0; i < user.length; ++i ) { userlist.push( user[i]) }
    return userlist
}


async function insere(user, password) {
    await mongoclient.connect()
    const db    = mongoclient.db( dbName )
	const users = db.collection( 'users' )
    const insertResult = await users.insertMany([{userId: user, password: password}])
}


app.use(express.json());

// Criar endpoint de login, que valida se as credenciais do usuário são válidas.
app.post('/login', function (req, res) {
    const {userId, password} = req.body;

    if (!userId || !password) {
        return res.status(400).json("É necessário informar userId e password.")
    }

    // Verificar se userId e password existem no array abaixo.

     /*let credentials = [
        {userId: 1, password: '123'},
        {userId: 2, password: '345'}
    ]; */

    var credentialsPromise = acessaBanco();

    credentialsPromise.then( credentials => {
        //console.log(credentials)

        let authorized = false;
    
    credentials.forEach(credential => {
        if (credential.userId == userId && credential.password == password) {
            authorized = true;
            console.log(credential)
        }
    });

    if (authorized) {
        return res.status(200).json({
            status: 200,
            message: "Usuário autenticado com sucesso."
        });
    }
    return res.status(400).json({
        status: 400,
        message: "Não foi possível se autenticar. Verifique id e senha."
    });
    })

    
});

// Criar endpoint de registro, que verifica se as credenciais do usuário são válidas e registra ele no banco.
app.post('/register', function (req,res){ 
    const {userId, password} = req.body;

    if (!userId || !password) {
        return res.status(400).json("É necessário informar userId e password.")
    }

    var credentialsPromise = acessaBanco();

    credentialsPromise.then( credentials => {
       // console.log(credentials)

        let authorized = true;
    
    credentials.forEach(credential => {
        if (credential.userId == userId) {
            authorized = false;
            console.log('userId: ',credential.userId)

        }
    });

    if (authorized) {
        insere(userId, password)
        return res.status(200).json({
            status: 200,
            message: "Usuário registrado com sucesso."
        });
    }
    return res.status(400).json({
        status: 400,
        message: "Não foi possível se registrar. escolha outro userId."
    });
    })
    
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
