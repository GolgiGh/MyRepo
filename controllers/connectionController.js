const model = require('../models/connection');

exports.index = (req, res)=>{
    //res.send('send all connections');

//res.send(model.find());
let connections = model.find();
res.render('./present/connections_obed', {connections});
};


//GET /connections/newConnection
exports.newConnection = (req, res)=>{
    res.render('./present/newConnection');

};

//POST /connections: create a newConnectio

exports.create = (req, res)=>{
     let connection = req.body;
    model.save(connection);
    res.redirect('/connections');

};

//GET /connections/:id: send details of newConnection identified by id 
exports.connection_gyawu = (req, res, next)=>{
    let id = req.params.id;
    let connection = model.findById(id);
    console.log(connection);
    if(connection){
        console.log("send ");
         res.render('./present/connection_gyawu',{connection});
    }else {
        let err = new Error('Can not find a connection with id' + id);
   err.satus = 404;
   next(err);
    }
};

//GET /connections/:id/edit: send html for editing an existing story
exports.edit = (req, res,next)=>{
  
    let id = req.params.id;
    let connection = model.findById(id);
    if(connection){
        console.log("edit");
        console.log(connection);
         res.render('./present/edit',{connection});
    }else {
        let err = new Error('Can not find a connection with id' + id);
   err.satus = 404;
   next(err);
    }
};

//PUT //connections/:id: update the newConnection identified by id
exports.update = (req, res,next)=>{
    console.log("updating");
    let id = req.params.id;
    let connection = req.body;
    console.log(connection);
    if(model.updateById(id, connection)){

    
         res.redirect('/connections/' +id);
}
else {
        let err = new Error('Can not find a connection with id' + id);
   err.satus = 404;
   next(err);
}
};

//DELETE /connections/:id, delete the newConnection identified by id
exports.delete = (req, res, next)=>{
    let id = req.params.id;
    if(model.deleteById(id))
         res.redirect('/connections');
else {
        let err = new Error('Can not find a connection with id' + id);
   err.satus = 404;
   next(err);
}
};

