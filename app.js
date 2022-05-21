// require modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');


const connectionRoutes = require('./routes/connectionRoutes');
const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes');





// create app
const app = express();
let port = 8084;
let host = 'localhost';
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

// connect to database 
mongoose.connect('mongodb://localhost:27017/NBAD', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> {
    app.listen(port,host,() => {
        console.log('The Server is running on port: ', port)
    });
})
.catch(err=> console.log(err.message));


app.use(
    session({
        secret: "ajfeirf90aeu9eroejfoefj",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({mongoUrl: 'mongodb://localhost:27017/NBAD'}),
        cookie: {maxAge: 60*60*1000}
        })
);
app.use(flash());

app.use((req, res, next) => {
    //console.log(req.session);
    res.locals.user = req.session.user||null;
    res.locals.errorMessages = req.flash('error');
    res.locals.successMessages = req.flash('success');
    console.log(res.locals.user);
    next();
});


//mount middlware 




app.use('/', mainRoutes);
app.use('/connections', connectionRoutes);
app.use('/users', userRoutes);


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




