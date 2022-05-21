const model = require('../models/connection');
const RSVP = require('../models/rsvp');



//res.send(model.find());
exports.index = (req, res, next) =>{
    let data = {};
    model.find()
    .then(connections => {
        data.connections = connections;
        return model.distinct('topic');
    })
    .then(topics => {
        data.topics = topics;
        res.render('./present/connections_obed', { data: data });
    })
    .catch(err => next(err));
    
};

//GET /connections/newConnection
exports.newConnection = (req, res)=>{
    res.render('./present/newConnection');

};

//POST /connections: create a newConnectio

exports.create = (req, res, next)=>{
     let connection = new model(req.body);
     connection.host = req.session.user;
    connection.save()
    .then((conection) => {
        req.flash('success', 'Connection has been created successfully');
    res.redirect('/connections');
    })
    .catch(err => {
        if(err.name === 'ValidationError'){
        req.flash('error', err.message);
        return res.redirect('back');
    }
        next(err);
    });

};

//GET /connections/:id: send details of newConnection identified by id 
exports.connection_gyawu = (req, res, next)=>{
    let id = req.params.id;
     Promise.all([model.findById(id).populate('host', 'firstName lastName'),RSVP.count({connection:id,Response:'Yes'})])
    .then(results => {
    if(results){
        const[connection,rsvpcount] = results
        console.log(connection);
         return res.render('./present/connection_gyawu',{connection,rsvpcount});
    }else {
        let err = new Error('Can not find a connection with id' + id);
   err.status = 404;
   next(err);
    }
})
.catch(err => next(err));
};

//GET /connections/:id/edit: send html for editing an existing story
exports.edit = (req, res,next)=>{
  let id = req.params.id;
    model.findById(id)
    .then(connection => {
         return res.render('./present/edit',{connection});
    
})
.catch(err => next(err));
};

//PUT //connections/:id: update the newConnection identified by id
exports.update = (req, res,next)=>{
    let id = req.params.id;
    let connection = req.body;
    model.findByIdAndUpdate(id, connection, {useFindAndModify: false, runValidators: true})
    .then(connection => {
        return res.redirect('/connections/' +id);
    })
    .catch(err => {
        if(err.name === 'ValidationError'){
        req.flash('error', err.message);
        return res.redirect('back');
    }
        next(err);
    });
};


//DELETE /connections/:id, delete the newConnection identified by id
exports.delete = (req, res, next)=>{
    let id = req.params.id;
    Promise.all([model.findByIdAndDelete(id, {useFindAndModify: false}),RSVP.deleteMany({connection:id})])
    .then(connection => {
        req.flash('success','Connection delete successfully');
        res.redirect('/connections');
    })
    .catch(err=> next(err));
};

//rsvp 
exports.rsvp = (req, res, next) => {
    let rsvpresponse = req.body.rsvpresponse;
    let connectionId = req.params.id;
    let currentUser = req.session.user;
    RSVP.findOneAndUpdate({ RsvpBy: currentUser, connection: connectionId}, {Response: rsvpresponse},{
        userFindAndModify: true, runValidators: true, new: true, upsert: true})
        .then(rsvp => {
           
            req.flash('success', 'You have rsvp to this Connection');
            res.redirect('/users/profile');
        })
        .catch(err => {
            if(err.name === 'ValidationError'){
                req.flash('error', err.message);
                return res.redirect('/back');
            }
        next(err);
    });
};