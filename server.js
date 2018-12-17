'use strict';

// Load array of notes
const data = require('./db/notes');

console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...
const express = require('express');

const data = require('./db/notes');

const app = express();

// STATIC SERVER

app.listen(8080, function() {
    console.infor('server listening on ${this.address().port}');
}).on('error', err => {
    console.error(err);
});