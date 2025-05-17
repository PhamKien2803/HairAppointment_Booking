const mongoose = require("mongoose");
const Branch = require("../models/Branches");
const Employee = require("../models/Employee");
const Invoice = require("../models/Invoice");
const { findAllGenericRef, findIdGenericRef, createGeneric, updateGeneric, deleteGeneric } = require("../controllers/use.controller");

const getFilteredBranches = async (req, res) => {
    try {
        const { name, address, managerId, sortBy, order = "asc" } = req.query;
        let filter = {};
        if (name) filter.name = new RegExp(name, "i");
        if (address) filter.address = new RegExp(address, "i");
        if (managerId) filter.managerId = managerId;

        let query = Branch.find(filter);
        if (sortBy) {
            const sortOrder = order === "desc" ? -1 : 1;
            query = query.sort({ [sortBy]: sortOrder });
        }
        const branches = await query;
        res.json({ message: "Filtered Branches", data: branches });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getTopEmployeeInBranch = async (req, res) => {
    try {
        const { branchId } = req.params;

        const topStar = await Employee.findOne({ branchId }).sort({ star: -1 }).select("star").lean();
        if (!topStar) {
            return res.status(404).json({ message: "No employees found in this branch" });
        }

        const topEmployees = await Employee.find({ branchId, star: topStar.star });

        res.json({ message: "Top Employees in Branch", data: topEmployees });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getBranchRevenue = async (req, res) => {
    try {
        const { branchId } = req.params;
        const { startDate, endDate } = req.query;

        let dateFilter = {};
        if (startDate && endDate) {
            dateFilter.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }

        const totalRevenue = await Invoice.aggregate([
            {
                $lookup: {
                    from: "employees",
                    localField: "employeeId",
                    foreignField: "_id",
                    as: "employee"
                }
            },
            { $unwind: "$employee" },

            {
                $match: {
                    "employee.branchId": new mongoose.Types.ObjectId(branchId),
                    ...dateFilter
                }
            },

            {
                $group: {
                    _id: null,
                    total: { $sum: "$totalAmount" }
                }
            }
        ]);

        res.json({ message: "Branch Revenue", data: totalRevenue[0]?.total || 0 });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


module.exports = {
    getAllBranches: findAllGenericRef(Branch),
    getBranchById: findIdGenericRef(Branch),
    createBranch: createGeneric(Branch, "Branch"),
    updateBranch: updateGeneric(Branch, "Branch"),
    deleteBranch: deleteGeneric(Branch, "Branch"),
    getFilteredBranches,
    getTopEmployeeInBranch,
    getBranchRevenue,
};
