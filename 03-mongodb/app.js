const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/demo', { useNewUrlParser: true, useUnifiedTopology: true })
  .then( () => console.log('Conectado a MongoDB...') )
  .catch( (err) => console.log('No se pudo conectar con MongoDB...', err) );

const cursoSchema = new mongoose.Schema({
  nombre: String,
  autor: String,
  etiquetas: [String],
  fecha: { type: Date, default: Date.now },
  publicado: Boolean,
});

const Curso = mongoose.Model('Curso', cursoSchema);

async function crearCurso() {
  const curso = new Curso({
    nombre: 'React',
    autor: 'Hector',
    etiquetas: ['Desarrollo Web', 'Frontend'],
    publicado: true
  });

  const resultado = await curso.save();
  console.log(resultado);
}
// crearCurso();

async function listarCursos() {
  const page = 2;
  const size = 10;

  // eq - equal
  // ne - not equal
  // gt - greater than
  // gte - greater than or equal to
  // lt - less than
  // lte - less than or equal to
  // in
  // nin - not in
  // or
  // and

  const cursos = await Curso
    // .find({ publicado: true })

    // .find({ precio: { $gte: 10, $lte: 30 } })
    // .find({ precio: { $in: [10, 15, 25] } })

    // Inicia con 'Hect'
    // .find({ autor: /^Hec/ })
    // Termina con 'tor'
    // .find({ autor: /tor$/ })
    // Que contenga 'cto'
    // .find({ autor: /.*cto.*/ })

    // .or([ {autor: 'Hector'}, {publicado: true} ])
    // .and([ {autor: 'Hector'}, {publicado: true} ])
    .skip(page - 1 * size)
    .limit(size)
    .sort({ autor: 1 })
    .select({ autor:1, nombre: 1, etiquetas: 1 });
}
// listarCursos();

async function actualizarCurso1(id) {
  const curso = await Curso.findById(id);

  if (!curso) {
    console.log('El curso no existe...');
    return;
  }

  curso.publicado = false;
  curso.autor = 'Manuel';

  // curso.set({
  //   publicado: false,
  //   autor: 'Manuel'
  // });

  const resultado = await curso.save();
  console.log(resultado);
}
// actualizarCurso1('documentId');

async function actualizarCurso2(id) {
  const resultado = await Curso.findByIdAndUpdate(id, {
    $set: {
      autor: 'Manuel',
      publicado: false
    }
  }, { new: true });
  console.log(resultado);
}
// actualizarCurso2('documentId');

async function eliminarDocumento(id) {
  const result = await Curso.findByIdAndDelete(id);
  console.log(result);
}
eliminarDocumento('documentId');
