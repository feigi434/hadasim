const mongoose = require('mongoose');


const arrayLimit = (val) => {
    return val.length <= 4;
}

const covidSchema = mongoose.Schema({
    member_id: { type: String, require: true },  
    vaccination_date: {
        type: Array,
        items: String, validate: [arrayLimit, '{PATH} exceeds the limit of 4'], "default": [], require: true
    },
    manufacturers: {
        type: Array, items: String, validate: [arrayLimit, '{PATH} exceeds the limit of 4'], "default": [], require: true
    },
    sick_period :{ 
        type: Object, properties: {
        date_recive_pos_res: { type: String },
        date_recovery: { type : String }},
        required: true
    }
});

module.exports= mongoose.model('Covid', covidSchema);


