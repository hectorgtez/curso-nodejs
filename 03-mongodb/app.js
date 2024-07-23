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
    const cursos = await Curso
      .find({ publicado: true })
      .limit(10)
      .sort({ autor: 1 })
      .select({ nombre: 1, etiquetas: 1 });
  }
  listarCursos();
