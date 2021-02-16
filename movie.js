const mongoose = require('mongoose');


//Schema setup (mongo Table)
const movieSchema = new mongoose.Schema({
    titlu: String,
    picture: String,
    descriere: String,
    regizor: String
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;