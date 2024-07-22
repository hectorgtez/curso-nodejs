const debug = require('debug')('app:inicio');
const express = require('express');
const config = require('config');
const morgan = require('morgan');
const app = express();

const users = require('./routes/usuarios');

app.use(express.json);
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api/usuarios', users);

// Configuracion de entornos
console.log('Aplicación: ' + config.get('nombre'));
console.log('BD Server: ' + config.get('configDB.host'));

// Uso de middleware de terceros
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('Morgan está habilitado!');
}

// Trabajos con BD
debug('Conectado con la base de datos...');

app.get('/', (req, res) => {
  res.send('Hola mundo desde Express!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Escuchando en el puerto ${ port }...`);
});
