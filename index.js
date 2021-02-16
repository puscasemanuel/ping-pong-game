const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer'); 
const mongoose = require('mongoose');

const Movie = require('./models/movie');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  
  const uploadFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
const upload = multer({ storage: storage, fileFilter: uploadFilter });

app.use('/public', express.static('public'));

app.use(bodyParser.json());

//All movies
app.get("/", async (req,  res) =>  {
    const movies = await Movie.findById();
    res.status(200).json({
        status: 'success',
        results: movies.length,
        data: {
            movies
        }
    })
});

//Movie by Id
app.get("/:movieId", async (req,  res) =>  {
    const movie = await Movie.find(req.params);
    res.status(200).json({
        status: 'success',
        data: {
            movie
        }
    })
});

//Add movie
app.post("/", async (req, res) =>  {
    const data = {
        titlu: req.body.titlu,
        picture: req.body.picture,
        descriere: req.body.descriere,
        regizor: req.body.regizor
      };

    const movie =  await Movie.create({
        titlu: data.titlu,
        picture: data.picture,
        descriere: data.descriere,
        regizor: data.regizor
    });

    res.status(200).json({
        status: 'success',
        movie
    })
});


//Update movie
app.put('/:id', async (req, res) =>  {
    const id = req.params.id;
    const newTitlu = req.body.titlu;
    const newDescriere = req.body.descriere;

    const movie =  await Movie.findOneAndUpdate({_id: id}, {titlu: newTitlu}, {descriere: newDescriere});

    res.json({
        status: 'success',
        message: 'movie updated sucessfully',
        movie
    })
});


//Delete movie
app.delete('/:id', async (req, res) =>  {
    const movie = Movie.findOneAndDelete(req.params.id);
    res.json({
        status: 'success',
        message: 'Movie deleted'
    })
});

const port = 8080;

app.listen(port,  () =>  {
    console.log(`Application server has started and listening to port ${port}`);
});