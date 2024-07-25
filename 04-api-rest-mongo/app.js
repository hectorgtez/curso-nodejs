const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/users');
const courses = require('./routes/courses');

// Connect to database
mongoose.connect('mongodb://localhost:27017/demo')
  .then( () => console.log('Conectado a MongoDB!') )
  .catch( (err) => console.log('No se pudo conectar con MongoDB', err) );

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', () => users);
app.use('/api/courses', () => courses);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Api RESTFul Ok, y ejecutándose...');
});
