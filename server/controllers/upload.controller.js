const ResponseDTO = require("../dtos/response.dto");
const fs = require("fs");
const cloudinary = require('cloudinary');
const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.config({
    cloud_name: `${CLOUD_NAME}`,
    api_key: `${API_KEY}`,
    api_secret: `${API_SECRET}`

});

const uploadController = {
    post: async (req, res) => {
        const responseDTO = new ResponseDTO();
        try {
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).json(responseDTO.badRequest('No files were uploaded.'));
            }

            const file = req.files;
            if (file.size > 1024 * 1024) {
                removeTmp(file.tempFilePath)
                return res.status(400).json(responseDTO.badRequest("File format is incorrect."));
            }

            if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
                removeTmp(file.tempFilePath)
                return res.status(400).json(responseDTO.badRequest("File format is incorrect."))
            }
            cloudinary.v2.uploader.upload(file.tempFilePath, { folder: "test" }, async (err, result) => {
                if (err) {
                    throw err;
                }
                removeTmp(file.tempFilePath)
                res.status(200).json(responseDTO.success("Added image", { public_id: result.public_id, url: result.secure_url }))
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    },
    delete: async (req, res) => {
        const responseDTO = new ResponseDTO();
        try {
            const { public_id } = req.body;
            if (!public_id) return res.status(400).json(responseDTO.badRequest('No images Selected'));
            cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
                if (err) {
                    return res.status(400).json(responseDTO.badRequest('No images Selected'));
                }

                res.json(responseDTO.success("Deleted Image"))
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    }
}

const removeTmp = (path) => {
    fs.unlink(path, err => {
        if (err) throw err;
    })
}

module.exports = uploadController;