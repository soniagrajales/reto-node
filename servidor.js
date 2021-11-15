// import express package
const express = require('express');
// import mongoose package
const mongoose = require('mongoose');
// import solicitante model
const SolicitanteSchema = require("./modelos/Solicitante.js");

// express instance 
const app = express();

// defining routes
const router = express.Router();
// use url encoding used by express
app.use(express.urlencoded({extended: true}));
// allow to receive info in json format
app.use(express.json());

// connecting to bd
mongoose.connect("mongodb+srv://sonia:Sonia123@clusterprogweb.cgyj4.mongodb.net/portallaboralbd?retryWrites=true&w=majority")

// CRUD operations
// API start
router.get('/', (req, res) => {
    res.send("El inicio de mi API");
});

// get the list of applicants
router.get('/solicitantes', (req, res) => {
    SolicitanteSchema.find(function(err, datos){
        if(err){
            console.log("Error leyendo las tareas");
        } else {
            res.send(datos);
        }
    });
});

// create an applicant
router.post('/solicitante', (req,res) => {
    let nuevoSolicitante = new SolicitanteSchema({
        docType: req.body.type,
        docId: req.body.id,
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        direccion: req.body.direccion,
        email: req.body.email,
        telefonoFijo: req.body.telefono,
        celular: req.body.celular,
        sitioWeb: req.body.sitioweb,
        descripcionPerfil: req.body.descripcion
    });

    nuevoSolicitante.save(function(err, datos){
        if(err) {
            console.log(err);
        }
        res.send("Solicitante almacenado correctamente");
    });
});

// delete an applicant according to id sent in the url
router.delete('/:solicitanteId', async(req, res) => {
    try {
        let solicitanteEliminado = await SolicitanteSchema.remove({ _id: req.params.solicitanteId});
        console.log(req.params.solicitanteId);
        res.json(solicitanteEliminado);
    } catch(err){
        res.json({ message: err});
    }
});

// add created routes to our app
app.use(router);

// init a web server
app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000");
});