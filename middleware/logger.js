//const morgan = require('morgan');
//app.use(morgan(':date[iso] :method :url :response-time'));
var moment = require('moment');
const logger = function(req, res, next) {
    console.log(`${moment().format('dddd, MMMM Do YYYY, h:mm:ss a')} ${req.method} ${req.originalUrl}`);
    next();
};

module.exports = logger;