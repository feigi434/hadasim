const Member = require('../models/member');
const _ = require('lodash');


module.exports = {
    addMember: async (req , res) => {
        try {
            const newMember = req.body;

            const error = isMemberInvalid(newMember);
            if (error) {
                throw error;
            }

            const existMember = await Member.findOne({ identify_num: { $eq: newMember.identify_num } });
            if (existMember) {
                throw `Member with identify num ${existMember.identify_num} already exist`;
            }

            const member = new Member(newMember);
            await member.save();
            return res.status(200).json({ message: 'Created member' });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error });
        }
    },

    getMember: async (req, res) => {
        try {
            const member = await Member.find().sort({ name: 1});
            if (_.isEmpty(member)) {
                throw 'Member not found';
            }
            return res.status(200).json(member);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error });
        }
    }
}

const isMemberInvalid = (member) => {
    if (_.isEmpty(member)) {
        return 'Not data received';
    }

    if (!member.first_name || (member.first_name).match(/\d/)) {
        return `First name ${member.first_name} is invalid` ;
    }

    if (!member.last_name || (member.last_name).match(/\d/)) {
        return `Last name ${member.last_name} is invalid` ;
    }

    if (!member.identify_num || !(member.identify_num).match(/^[0-9]*$/) || member.identify_num.length !== 9) {
        return `Identify number ${member.identify_num} is invalid` ;
    }

    if (!member.address.city || (member.address.city).match(/\d/)) {
        return `City ${member.address.city} is invalid` ;
    }

    if (!member.address.street || (member.address.street).match(/\d/)) {
        return `Street ${member.address.street} is invalid` ;
    }

    if (!member.address.number || (member.address.number).match(/[^0-9]$/)) { //house
        return `Address number ${member.address.number} is invalid` ;
    }

    if (!member.date_birth || !(member.date_birth).match(dateRgx)){
        return `Date birth ${member.date_birth} is invalid` ;
    }

    if (member.phone.length !== 9 || !(member.phone).match(/\d/)) {
        return `Phone ${member.phone} is invalid` ;
    }

    if (member.mobile.length !== 10 || !(member.phone).match(/\d/)) {
        return `Mobile ${member.mobile} is invalid` ;
    }
}

const dateRgx =/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/