
// const dotenv = require('dotenv');
const express = require('express');
// const bodyParser = require('body-parser');
const app = express();
const path = require("path");
// Inicializamos  el Motor de plantillas elegido 
app.set('view engine', 'ejs')
app.use(express.static('view'))
app.use(express.static(path.join(__dirname, 'public')));
// const { leerFrutas,guardarFrutas,  obtenerFrutaFind,actualizarFruta, eliminarFruta } = require('./src/frutas.manager')
const PORT = process.env.PORT || 3009;
let DB = [];
const fs = require('fs');

// process.env.DATABASE_PATH ME TIRA ERROR 
const datos = fs.readFileSync(__dirname + '/src/database/trailerflix.json', 'utf8')
const TRAILERFLIX = JSON.parse(datos)
// console.log(TRAILERFLIX);

app.get("/", (req, res) => { //carolina
    // res.send('Bienvenido a nuestro sitio generado a partir de un motor de plantillas.')
    //RUTA DINAMICA 
    const data = {
        title: 'BIENVENIDO',
        message: 'Bienvenido a la primer entrega',
        name: 'Backend - Ingenias',
    }
    res.render('index', data)
});

app.get("/catalogo", (req, res) => { //antonella
    let resultados = [];

    const sortProductos = () => {
        const resultados = TRAILERFLIX.sort((a, b) => {
            if (a.name < b.name) {
                return -1
            }
            if (a.name > b.name) {
                return 1
            }
            return 0
        })
        resultados.length > 0 ?
            res.json(resultados) : res.json({ id: 'ERROR', description: 'No se encuentra el curso solicitado' })
        // console.log(resultados)         res.render('productos',  resultados) : res.json ({id: 'ERROR', description:'ERROR '})
    }
    sortProductos()
});

app.get("/titulo/:titulo", (req, res) => { //rocio

    let titulo = req.params.titulo.trim().toLowerCase();
    if (titulo !== '') {
        console.log(typeof titulo);
        const resultado = TRAILERFLIX.filter(pelicula => {
            return pelicula.titulo.includes(titulo.toLowerCase())
        });
        resultado.length > 0 ?
            res.json(resultado) : res.json({ id: 'ERROR', description: 'No se encuentra nombre del producto solicitado' })
    }
    else {
        res.json({ id: 'ERROR', description: 'No se detecto ningun titulo' })
    }
});


app.get("/categoria/:nombre", (req, res) => { //rocio
    let parametro = req.params.nombre.trim().toLowerCase();
    if (parametro !== '') {
        console.log(typeof parametro);
        // let resultado = []
        const resultado = TRAILERFLIX.filter(pelicula => {
            return pelicula.categoria.includes(parametro.toLowerCase())
        });
        resultado.length > 0  ?
            res.json(resultado) : res.json({ id: 'ERROR', description: 'No se encuentra nombre del producto solicitado' })
    }
    else {
        res.json({ id: 'ERROR', description: 'No se escribio ningun nombre' })
    }

    // const productoEncontrado = TRAILERFLIX.find(pelicula => pelicula.categoria === parametro);

    // if (productoEncontrado) {
    //     res.json(productoEncontrado);
    //   } else {
    //     res.status(404).json({ id: 'ERROR', description: 'No se encuentra el nombre de la categoria solicitada' });
    //   }
});

app.get("/reparto/:act", (req, res) => { //olivia y base de datos y footer

});


app.get("/trailer/:id", (req, res) => { //antonella

});

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});


