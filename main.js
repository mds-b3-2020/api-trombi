const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

app.get('/users', (request, response) => {
    response.json(require('./users.json'));
});

app.post('/users', (request, response) => {
    const body = request.body;
    // Récupère la liste des users
    const users = require('./users.json');

    // Création du nouveau user
    const newUser = {
        id: Math.max(...users.map(user => user.id)) + 1,
        lastName: body.lastName.toUpperCase(),
        firstName: body.firstName,
        email: body.email,
        birthDate: body.birthDate,
        avatarUrl: body.avatarUrl,
        gender: body.gender
    };

    // Ajoute le nouveau user dans le tableau d'users
    users.push(newUser);

    // Ecris dans le fichier pour insérer la liste des users
    fs.writeFileSync('./users.json', JSON.stringify(users, null, 4));

    response.json(users);
});

app.listen(8081);
