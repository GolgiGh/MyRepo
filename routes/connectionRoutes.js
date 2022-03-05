const express = require('express');
const controller = require('../controllers/connectionController');

const router = express.Router();

//GET / stories: send all stories to the user 

router.get('/', controller.index);
   

//GET /connections/newConnection
router.get('/newConnection', controller.newConnection);
    

//POST /connections: create a newConnectio

router.post('/',controller.create);

//GET /connections/:id: send details of newConnection identified by id 
router.get('/:id',controller.connection_gyawu);

//GET /connections/:id/edit: send html for editing an existing story
router.get('/:id/edit',controller.edit);
   

//PUT //connections/:id: update the newConnection identified by id
router.put('/:id',controller.update);
   
//DELETE /connections/:id, delete the newConnection identified by id
router.delete('/:id',controller.delete);
    
module.exports = router;