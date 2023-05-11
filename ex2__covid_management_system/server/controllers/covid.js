const Covid = require('../models/covid');
const Member = require('../models/member');
const _ = require('lodash');


module.exports = {
    addCovid: async (req, res) => {
        try {
            const newCovid = req.body;

            const error = isCovidInvalid(newCovid);
            if (error) {
                throw error;
            }

            const existMember = await Member.findOne({identify_num: {$eq: newCovid.member_id} });
            if (!existMember) {
                throw `Member ${newCovid.member_id} not exist`
            }

            newCovid.member_id = existMember._id;
            const covid = new Covid(newCovid)
            await covid.save();
            return res.status(200).json({ message: 'Created covid infotmation' });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error });
        }
    },

    getCovid: async (req, res) => {
        try {
            const covid = await Covid.find().sort({ name: 1 });
            if (_.isEmpty(covid)) {
                throw 'Covid infotmation not found'
            }
            return res.status(200).json(covid)
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error });
        }
    }
}

const isCovidInvalid = (covid) => {
    if(_.isEmpty(covid)) {
        return 'Not data received';
    }

    if (!covid.member_id || !(covid.member_id).match(/^[0-9]*$/) || covid.member_id.length !== 9) {
        return `Identify number ${covid.member_id} is invalid` ;
    }

    if (covid.vaccination_date.length == 0 || covid.manufacturers.length == 0) {
        return `Vaccination date or manufacturers is null`
    }

    else {
        if (covid.vaccination_date.length != covid.manufacturers.length){
            return `Vaccination date and manufacturers not are synchronized`
        }

        if (covid.vaccination_date.length > 4) {
            return `Vaccination date  ${covid.vaccination_date} is invalid` ;
        }
        else {
            for (i = 0; i < covid.vaccination_date.length; i++) {
                if (!(covid.vaccination_date[i]).match(date)) {
                    return `Vaccination date ${covid.vaccination_date[i]} is invalid` ;
                }
            }
        }
    
        if (covid.manufacturers.length > 4) {
            return `Manufacturers ${covid.manufacturers} is invalid` ;
        }
        else {
            for (i = 0; i< covid.manufacturers.length; i++) {
                if (!covid.manufacturers[i] || (covid.manufacturers[i]).match(/\d/)) {
                    return `Manufacturers ${covid.manufacturers[i]} is invalid` ;
                }
            }
        }
    }

    if (!covid.sick_period.date_recive_pos_res || !(covid.sick_period.date_recive_pos_res).match(date)) {
        return `Date recive positive result ${covid.sick_period.date_recive_pos_res} is invalid` ;
    }

    if (!covid.sick_period.date_recovery || !(covid.sick_period.date_recovery).match(date)) {
        return `Date recovery ${covid.sick_period.date_recovery} is invalid` ;
    }

}

const date =/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/