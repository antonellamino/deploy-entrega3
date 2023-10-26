const fs = require('fs');

// process.env.DATABASE_PATH ME TIRA ERROR 
const datos = fs.readFileSync(__dirname + '/database/trailerflix.json', 'utf8' )
const TRAILERFLIX = JSON.parse(datos)
console.log(TRAILERFLIX);