'use strict';

// Load array of notes
const data = require('./db/notes');

const { PORT } = require('./db/config');
console.log(PORT);
console.log('Hello Noteful!');
//const logger = require('./db/middleware/logger');

// INSERT EXPRESS APP CODE HERE...
const express = require('express');

const app = express();

app.get('/api/notes', (req, res) => {
    if (req.query.searchTerm) {
        const searchTerm = req.query.searchTerm;
        const resData = data.filter(item => item.title.includes(searchTerm));
        
        res.json(resData);
    } else res.json(data);
});


app.get('/api/notes/:id', (req, res) => {
    console.log(req.params);
    res.json(data.find(item => item.id === Number(req.params.id)));
});

// STATIC SERVER
app.listen(PORT, function() {
    console.info('server listening on ${this.address().port}');
}).on('error', err => {
    console.error(err);
});