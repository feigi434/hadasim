const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    name: {
        type: String,
        require: true 
    },
    image: {
        data: Buffer, 
        contectType: String 
    }
});

module.exports = mongoose.model('Image', imageSchema)