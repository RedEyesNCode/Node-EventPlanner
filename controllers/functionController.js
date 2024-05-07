const functionSchema = require("../Model/functionSchema");

exports.createfunctionasevent = async (req, res) => {
  try {
    const functionasevent = new functionSchema(req.body);
    await functionasevent.save();
    res.status(200).json({
      status: "success",
      code: 200,
      message: "function as event Created Succesfully",
      data: functionasevent,
    });
  } catch (error) {
    res.status(200).json({ status: "Failed", code: 500, error: error.message });
  }
};

exports.deletefunctionasevent = async (req, res) => {
  try {
    const deletedfunctionasevent = await functionSchema.findByIdAndDelete(
      req.body.functionId
    );
    res.status(200).json({
      status: "success",
      code: 200,
      message: "function as event Deleted Succesfully",
      data: deletedfunctionasevent,
    });
  } catch (error) {
    res.status(200).json({ status: "Failed", code: 500, error: error.message });
  }
};

exports.updatefunctionasevent = async (req, res) => {
  try {
    const updatedfunctionasevent = await functionSchema.findByIdAndUpdate(
      req.body.functionId,
      req.body,
      { new: true }
    );
    res.status(200).json({
      status: "success",
      code: 200,
      message: "function as event Updated Succesfully",
      data: updatedfunctionasevent,
    });
  } catch (error) {
    res.status(200).json({ status: "Failed", code: 500, error: error.message });
  }
};

exports.getAllfunctionasevent = async (req, res) => {
  try {
    const allfunctionasevent = await functionSchema.find();
    res.status(200).json({
      status: "success",
      code: 200,
      message: "All function as event Fetched Succesfully",
      data: allfunctionasevent,
    });
  } catch (error) {
    res.status(200).json({ status: "Failed", code: 500, error: error.message });
  }
};
