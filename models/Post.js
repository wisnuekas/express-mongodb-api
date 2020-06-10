const mongoose = require('mongoose');

//MAKE POST SCHEMA
const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }}, {
        timestamps: true
    }
);

//TEXT INDEX TITLE
postSchema.index({ title: 'text' }); 

//EXPORT SCHEMA
module.exports = mongoose.model('Post', postSchema);;