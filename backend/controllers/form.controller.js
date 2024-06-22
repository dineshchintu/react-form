const formService = require("../services/form.service");

const getFormDetail = async (req, res) => {
  const id = req.params.formId;

  try {
    const getData = await formService.getFormDetail(id);

    return res.status(200).json(getData);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch form detail" });
  }
};

const postFormDetail = async (req, res) => {
    const file = req.file;
    const formData = req.body;
    console.log("formDta", formData);
    try {
        const savedData = await formService.postFormDetail(file, formData);
        console.log("savedData", savedData);
        return res.status(201).json(savedData);
    } catch (error) {
        console.error("Error saving form details and file:", error);
        return res.status(500).json({ error: "Failed to save form details and file" });
    }
};

module.exports = { getFormDetail, postFormDetail };
