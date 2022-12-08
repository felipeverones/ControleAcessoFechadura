var express = require ('express');

var app = express();
app.use(express.json());

// Criar endpoint de login, que valida se as credenciais do usuário são válidas.
app.post('/login', function (req, res) {

    const { userId, password } = req.body;
    
    if (!userId || !password) {
        return res.status(400).json("É necessário informar userId e password.")
    }

    // Verificar se userId e password existem array abaixo.
    const credentials = [
        {userId: 1, password: '123'},
        {userId: 2, password: '345' }
    ];

    let authorized = false;

    credentials.forEach(credential => {
        if (credential.userId == userId && credential.password == password ) {
            authorized = true;
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
    
});

app.get('/verones', function (req, res) {
    let val1 = 50;
    let val2 = 100;
    res.send('' + (val1+val2));
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
