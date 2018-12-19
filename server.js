'use strict';

const express = require('express');
const { PORT } = require('./config');
const morgan = require('morgan');
const router = require('./router/notes.router');
console.log('Hello Noteful!');
const app = express();

// Create a static webserver
app.use(express.static('public'));

 // LOGGER MIDDLEWARE
 app.use(morgan(':method :url :status :response-time ms - :res[content-length]e'));

 app.use(router);
app.listen(PORT, function() {
    console.info(`server listening on ${this.address().port}`);
}).on('error', err => {
    console.error(err);
});
