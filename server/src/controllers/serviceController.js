const Service = require("../models/Service");
const { findAllGenericRef, findIdGenericRef, createGeneric, updateGeneric, deleteGeneric } = require("../controllers/use.controller");

const getFilteredServices = async (req, res) => {
    try {
        const { name, minPrice, maxPrice, minDuration, maxDuration, branchId, sortBy, order = "asc" } = req.query;
        let filter = {};
        if (name) filter.name = new RegExp(name, "i");
        if (branchId) filter.branchId = branchId;
        if (minPrice) filter.price = { $gte: Number(minPrice) };
        if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) };
        if (minDuration) filter.duration = { $gte: Number(minDuration) };
        if (maxDuration) filter.duration = { ...filter.duration, $lte: Number(maxDuration) };

        let query = Service.find(filter);
        if (sortBy) {
            const sortOrder = order === "desc" ? -1 : 1;
            query = query.sort({ [sortBy]: sortOrder });
        }
        const services = await query;
        res.json({ message: "Filtered Services", data: services });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllServices: findAllGenericRef(Service, ["branchId"]),
    getServiceById: findIdGenericRef(Service, ["branchId"]),
    createService: createGeneric(Service, "Service"),
    updateService: updateGeneric(Service, "Service"),
    deleteService: deleteGeneric(Service, "Service"),
    getFilteredServices,
};