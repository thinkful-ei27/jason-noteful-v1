'use strict';

// Load array of notes
const data = require('./db/notes');
const simDB = require('./db/simDB');
const notes = simDB.initialize(data);
const { PORT } = require('./db/config');
console.log('Hello Noteful!');
const logger = require('./db/middleware/logger');



// INSERT EXPRESS APP CODE HERE...
const express = require('express');
const app = express();

 // LOGGER MIDDLEWARE
app.use(logger);
app.get('/api/notes', (req, res) => {
    if (req.query.searchTerm) {
        const searchTerm = req.query.searchTerm;
        const resData = data.filter(item => item.title.includes(searchTerm));
        
        res.json(resData);
    } else res.json(data);
});

// HANDLE GET REQUESTS
app.get('/api/notes/:id', (req, res) => {
    console.log(req.params);
    res.json(data.find(item => item.id === Number(req.params.id)));
});

//ERROR HANDLER
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.status(404).json({ message: 'Not Found' });
  });

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });

// STATIC SERVER
app.listen(PORT, function() {
    console.info('server listening on ${this.address().port}');
}).on('error', err => {
    console.error(err);
});