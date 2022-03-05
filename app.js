// require modules
const express = require('express');
const {v4: uuidv4}= require('uuid');
const morgan = require('morgan');
const ejs = require('ejs');
const methodOverride = require('method-override');
const connectionRoutes = require('./routes/connectionRoutes');
const mainRoutes = require('./routes/mainRoutes');



// create app
const app = express();
let port = 8084;
let host = 'localhost';
app.set('view engine', 'ejs');

//mount middlware 
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

app.use('/', mainRoutes);
app.use('/connections', connectionRoutes);


app.use((req, res, next)=>{
    let err = new Error('The server can not locate '+ req.url);
    err.status = 404;
    next(err);
});


app.use((err, req, res, next)=>{
    console.log(err.stack);
    if(!err.status){
        err.status = 500;
        err.message = ("Internal Server Error");
    }

   res.status(err.status);
   res.render('error', {error: err});

});




// start the server
app.listen(port, host, ()=>{
    console.log('Server is running on port', port);
})