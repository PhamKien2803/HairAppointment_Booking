const { Model } = require("mongoose");

const findAllGeneric = (Model, modelName, field) => async (req, res) => {
  try {
    const data = await Model.find();
    res.status(200).json({
      message: `List of ${modelName}`,
      data: data,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const findAllGenericRef =
  (Model, refModel = []) =>
    async (req, res) => {
      try {
        let query = Model.find();
        refModel.forEach((fields) => {
          query = query.populate(fields);
        });
        const data = await query.exec();
        res.status(200).json({ data });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
    };

const findIdGenericRef =
  (Model, refModel = []) =>
    async (req, res) => {
      try {
        let query = Model.findById(req.params.id);
        refModel.forEach((fields) => {
          query = query.populate(fields);
        });

        const data = await query.exec();
        if (!data) {
          return res.status(404).json({ message: "Data not found" });
        }

        res.status(200).json({ data });
      } catch (err) {
        res.status(500).json({ message: err.message });
        ``;
      }
    };

const findIdGeneric = (Model, modelName) => async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);

    if (!data) {
      return res.status(404).json({ message: `${modelName} not found` });
    }
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error retrieving ${modelName}: ${error.message}` });
  }
};

const createGeneric = (Model, modelName) => async (req, res) => {
  try {
    const newData = new Model(req.body);
    const savedData = await newData.save();

    console.log(`Successfully created ${modelName}:`, savedData);

    res.status(201).json({
      message: `${modelName} created successfully`,
      data: savedData,
    });
  } catch (error) {
    console.error(`Error creating ${modelName}:`, {
      message: error.message,
      stack: error.stack,
      errors: error.errors || null,
    });

    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message,
      }));
      return res.status(400).json({
        message: `Validation error while creating ${modelName}`,
        errors: validationErrors,
      });
    }

    res.status(500).json({
      message: `Error creating ${modelName}`,
      error: error.message,
    });
  }
};

const updateGeneric = (Model, modelName) => async (req, res) => {
  try {
    const updatedData = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedData) {
      return res.status(404).json({ message: `${modelName} not found` });
    }

    console.log(`Successfully updated ${modelName}:`, updatedData);

    res.status(200).json({
      message: `${modelName} updated successfully`,
      data: updatedData,
    });
  } catch (error) {
    console.error(`Error updating ${modelName}:`, {
      message: error.message,
      stack: error.stack,
      errors: error.errors || null,
    });

    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message,
      }));
      return res.status(400).json({
        message: `Validation error while updating ${modelName}`,
        errors: validationErrors,
      });
    }

    res.status(500).json({
      message: `Error updating ${modelName}`,
      error: error.message,
    });
  }
};


const deleteGeneric = (Model, modelName) => async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await Model.findByIdAndDelete(id);

    if (!deletedData) {
      return res.status(404).json({ message: `${modelName} not found` });
    }

    res.json({ message: `${modelName} deleted successfully` });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error deleting ${modelName}: ${error.message}` });
  }
};

module.exports = {
  findAllGeneric,
  findIdGeneric,
  createGeneric,
  updateGeneric,
  deleteGeneric,
  findAllGenericRef,
  findIdGenericRef,
};
