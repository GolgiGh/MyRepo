const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rsvpSchema = new Schema({
    RsvpBy: {type: Schema.Types.ObjectId,ref:'User', required:[true, 'User needed']},
    connection:{type:Schema.Types.ObjectId,ref:'Connection',required:[true, 'Connection needed']},
    Response:{type:String, enum:['Yes','No','Maybe'], required:[true, 'Response needed']}
    }


);

module.exports = mongoose.model('RSVP', rsvpSchema);