const mongoose = require('mongoose');

const memberSchema = mongoose.Schema({
    first_name: { type: String, require: true },
    last_name: { type: String, require: true },
    identify_num: { type: String, required: true },
    address: { 
        type: Object,
        properties: {
            city: { type: String }, 
            street: { type: String }, 
            number: { type: String }
        }, 
        require: true
    },
    date_birth : { type: String, required: true },
    phone: { type: String, require: true },
    mobile: { type: String, require: true }
});

module.exports = mongoose.model('Member', memberSchema);