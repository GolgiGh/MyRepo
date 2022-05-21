const {DateTime} = require("luxon");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectionSchema = new Schema({
    topic:{type: String, required: [true, 'topic is required']},
    title:{type: String, required: [true, 'title is required']},
    host:{type: Schema.Types.ObjectId, ref: 'User'},
    details:{type: String, required: [true, 'details is required'], minlength:[10, 'the details should have at least 10 characters']},
    where:{type: String, required: [true, 'where  is required']},
    when:{type: String, required: [true, 'when is required']},
    start:{type: String, required: [true, 'start is required']},
    end:{type: String, required: [true, 'end is required']},
    image_url:{type: String, required: [true, 'image_url is required']}

},
{timestamps: true});

module.exports = mongoose.model('Connection', connectionSchema);
   
