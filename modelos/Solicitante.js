const mongoose = require('mongoose');

// defining schema
let SolicitanteSchema = new mongoose.Schema({
    docType: String,
    docId: String,
    nombres: String,
    apellidos: String,
    direccion: String,
    email: String,
    telefonoFijo: String,
    celular: String,
    sitioWeb: String,
    descripcionPerfil: String
});

// expose to outside
module.exports = mongoose.model('Solicitante', SolicitanteSchema, 'Solicitantes');