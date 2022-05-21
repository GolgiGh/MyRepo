const express = require('express');
const controller = require('../controllers/connectionController');
const {isLoggedIn, isHost, isNotHost} = require('../middlewares/auth');
const{validateId} = require('../middlewares/validator');
const {validateConnection} = require('../middlewares/validator');
const {validateResult, validateRSVP} = require('../middlewares/validator');

const router = express.Router();

//GET / stories: send all stories to the user 

router.get('/', controller.index);
router.get('/newConnection', isLoggedIn, controller.newConnection)
   
//GET /connections/newConnectio
//POST /connections: create a newConnectio

router.post('/',isLoggedIn, validateConnection, validateResult, controller.create);

//GET /connections/:id: send details of newConnection identified by id 
router.get('/:id',validateId, controller.connection_gyawu);

//GET /connections/:id/edit: send html for editing an existing story
router.get('/:id/edit',validateId, isLoggedIn, isHost,  controller.edit);
   

//PUT //connections/:id: update the newConnection identified by id
router.put('/:id',validateId, isLoggedIn, isHost, validateConnection, validateResult,  controller.update);
   
//DELETE /connections/:id, delete the newConnection identified by id
router.delete('/:id',validateId, isLoggedIn, isHost, controller.delete);

//rsvp routes
router.post('/:id/rsvp', validateId, isLoggedIn,isNotHost, validateRSVP, validateResult, controller.rsvp);
    
module.exports = router;