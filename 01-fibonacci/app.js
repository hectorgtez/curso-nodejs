// Serie de Fibonacci
// 1 1 2 3 5 8 13 21 34...

const serie = require('./serie');

const argv = process.argv;
const cantity = argv[2].split('=')[1];

serie.createSerie(cantity)
  .then( message => console.log(message) )
  .catch( message => console.log(message) );