const mongoose = require("mongoose");

const FormSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: {type: String, required: true },
    phoneNumber: {type: String },
    channel: {type: String, required: true },
    
    uploadFile: {
        filename: { type: String, required: true},
        path: { type: String, required: true }, //database mein image data iss path se hota ha
        contentType: { type: String, required: true }
    }

}, {timestamps: true});

const Form = mongoose.model("Form", FormSchema);

module.exports = Form;
