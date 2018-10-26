var bodyParser = require('body-parser');
var sequelize = require('sequelize');
var express = require('express');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('./config/config.token');
var models = require('./models');
var db = require("./db");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    next();
});
//Conexion base de datos
db.sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
//Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen('3000', () => {
    console.log('Example app listening on port 3000');
});
//service
app.post('/createUser', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 8);
    models.User.create(req.body).then(() => {
        User.findOrCreate({ where: { name: req.body.name } });
        res.send({ message: 'Usuario Creado' });
    }).catch(() => {
        res.send({ message: 'Usuario no Creado' });
    });
});
app.post('/login', (req, res) => {
    models.User.findOne({
        where: { name: req.body.name },
    }).then(project => {
        if (project != null) {
            bcrypt.compare(req.body.password, project.password).then(isValid => {
                if (isValid) {
                    var token = jwt.sign({ name: project.name, email: project.email }, config.secret, {
                        expiresIn: 86400 // expires in 24 hours
                    });
                    res.send({ token: token });
                } else {
                    res.send({ message: 'Usuario no Creado' });
                }
            });
        } else {
            res.send({ message: 'Usuario no Creado' });
        }
    }).catch(() => {
        res.send({ message: 'Usuario no Creado' });
    });
});
app.post('/createProduct', (req, res) => {
    var token = req.headers['authorization'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    models.Product.create(req.body).then((data) => {
        res.send({ message: 'Producto Creado' });
    });
});
app.get('/getProducts', (req, res) => {
    var token = req.headers['authorization'];
    var ressend = res;
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    models.Product.all().then(items => {
        ressend.send({
            listProducts: items.sort((a, b) => {
                return a.createdAt > b.createdAt ? -1 : a.createdAt < b.createdAt ? 1 : 0;
            }
            )
        });
    }).catch(() => {
        res.send({ message: 'Producto no Creado' });
    });
});