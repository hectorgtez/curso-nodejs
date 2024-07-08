const fs = require('fs');

const createSerie = (cantity) => {
  return new Promise( (resolve, reject) => {
    let fibo1 = 1;
    let fibo2 = 1;
    let serie = '';
    
    serie += `${ fibo1 } `;
    
    for (let i = 2; i <= cantity; i++) {
      serie += `${ fibo2 } `;
      fibo2 = fibo1 + fibo2;
    
      fibo1 = fibo2 - fibo1;
    }
    
    fs.writeFile('fibonacci.txt', serie, (err) => {
      if (err)
        reject('Error al crear el archivo...');
      else
        resolve('The file has been saved!');
    });
  });
}

module.exports = {
  createSerie,
}
