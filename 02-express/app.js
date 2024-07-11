const express = require('express');
const app = express();

app.use(express.json);

const usuarios = [
  { id: 1, nombre: 'Hector' },
  { id: 2, nombre: 'Deisy' },
  { id: 3, nombre: 'Humberto' },
  { id: 4, nombre: 'Kevin' },
]

app.get('/', (req, res) => {
  res.send('Hola mundo desde Express!');
});

app.get('/api/usuarios', (req, res) => {
  res.send(usuarios);
});

app.get('/api/usuarios/:id', (req, res) => {
  const usuario = usuarios.find( u => u.id === parseInt(req.params.id) );

  if (!usuario) {
    res.status(404).send('El usuario no fue encontrado...');
  }

  res.send(usuario);
});

app.post('/api/usuarios', (req, res) => {
  const usuario = {
    id: usuarios.length + 1,
    nombre: req.body.nombre
  }

  usuarios.push(usuario);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Escuchando en el puerto ${ port }...`);
});
