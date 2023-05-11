const multer = require('multer');
const Image = require('../models/image');
const _ = require('lodash');
const image = require('../models/image');


const storage = multer.diskStorage({
    destination : './uploads',
    filename : (req, file, cb) => cb(null, file.originalname)
})

const upload = multer({ storage: storage }).single('file');

module.exports = {
    addImage: (req, res) => {
        try {
            upload(req, res, async (error) => {
                if (error) {
                    throw error;
                }
                
                const newImage = new Image({
                    name: req.body.name,
                    image: {
                        data: req.file.filename,
                        contentType: 'image/png'
                    }
                })
                await newImage.save();
                return res.status(200).json('successfuly uploaded');
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    },

    getImage: async (req, res) => {
        try {
            const { name } = req.params;
            const image = await Image.findOne({ name });
            if (_.isEmpty(image)) {
                throw 'Image not found';
            }
            return res.status(200).json(image);

        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    }
}


 