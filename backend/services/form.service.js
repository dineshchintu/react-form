const FormModel = require("../models/form.model");

const getFormDetail = async (id) => {
    const dataById = await FormModel.findById(id);
    return dataById
}

const postFormDetail = async (file, formData) => {
    try {
        // Create the file metadata object if file is provided
        let fileMetadata = null;
        if (file) {
            fileMetadata = {
                filename: file.originalname,
                path: file.path,
                contentType: file.mimetype
            };
        }

        // Combine form data and file metadata
        const combinedData = {
            ...formData,
            uploadFile: fileMetadata
        };

        const data = new FormModel(combinedData);
        const savedData = await data.save();
        return savedData;
    } catch (error) {
        console.error("Error saving form details and file to database:", error);
        throw error;
    }
};

module.exports = { getFormDetail, postFormDetail }