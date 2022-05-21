const Connection = require('../models/connection');

//check if user is a guest
exports.isGuest = (req, res, next)=>{
    if(!req.session.user){
        return next();
    }else {
         req.flash('error', 'You are logged in already');
         return res.redirect('/users/profile');
     }
};

//check if user is authenticated
exports.isLoggedIn = (req, res, next) =>{
    if(req.session.user){
        return next();
    }else {
         req.flash('error', 'You need to log in first');
         return res.redirect('/users/login');
     }
};

//check if user is author of the story
exports.isHost = (req, res, next) => {
    let id = req.params.id;
    Connection.findById(id)
    .then(connection=>{
        if(connection) {
            console.log(req.session.user)
            if(connection.host == req.session.user._id) {
                return next();
            } else {
                let err = new Error('You can not RSVP becuase you are the host');
                err.status = 401;
                return next(err);
            }
        } else {
            let err = new Error('Cannot find a story with id ' + req.params.id);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err=>next(err));

};
exports.isNotHost = (req, res, next) =>{
    
    let id = req.params.id;
    Connection.findById(id)
    .then(connection=>{
        if(connection) {
            if(connection.host != req.session.user) {
                return next();
            } else {
                let err = new Error('You can not RSVP becuase you are the host');
                err.status = 401;
                return next(err);
            }
        } else {
            let err = new Error('Cannot find a story with id ' + req.params.id);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err=>next(err));
};
