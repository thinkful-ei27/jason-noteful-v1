'use strict';

const express = require('express');
const morgan = require('morgan');
const { PORT } = require('./config');
const notesRouter = require('./router/notes.router');

console.log('Hello Noteful!');
const app = express();

// LOGGER MIDDLEWARE
app.use(morgan('dev'));

// Create a static webserver
app.use(express.static('public'));


app.use(express.json());

app.use('/api', notesRouter);

//// Catch-all 404
//app.use(function (req, res, next) {
//    const err = new Error('Not Found');
//    err.status = 404;
//    next(err);
//  });
//  
//  // Catch-all Error handler
//  // NOTE: we'll prevent stacktrace leak in later exercise
//  app.use(function (err, req, res, next) {
//    res.status(err.status || 500);
//    res.json({
//      message: err.message,
//      error: err
//    });
//  });
//
//
if(require.main===module) {
    app.listen(PORT, function() {
        console.info(`server listening on ${this.address().port}`);
    }).on('error', err => {
        console.error(err);
    })
};
module.exports = app; // export for testing