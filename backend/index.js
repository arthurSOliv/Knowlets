const app = require('express')();

const consign = require('consign');

const db = require('./config/db');

app.db = db;

consign()
    .then('./config/middlewares.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app);

app.listen(3333, () => {
    console.log('Server started on port 3333')
})