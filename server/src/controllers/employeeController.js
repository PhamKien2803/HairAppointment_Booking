const Employee = require("../models/Employee");
const {
  findAllGenericRef,
  findIdGenericRef,
  createGeneric,
  updateGeneric,
  deleteGeneric,
} = require("../controllers/use.controller");

const getBarberProfile = async (req, res, next) => {
  try {
    if (!req.account || !req.account.id) {
      return res.status(400).json({ message: "ID not found from token" });
    }
    const userId = req.account.id;
    const user = await Account.findById(userId)
      .select("-password")
      .populate({
        path: "employeeId",
        model: req.account.role === "barber" ? "Customer" : "Employee",
      });

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    return res.json({
      message: "Get information successfully !!",
      profile: user.profileId,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving information", error: error.message });
  }
};

module.exports = {
  getAllEmployees: findAllGenericRef(Employee, ["branchId", "workScheduleId"]), // Populate branch và workSchedule
  getEmployeeById: findIdGenericRef(Employee, ["branchId", "workScheduleId"]),
  createEmployee: createGeneric(Employee, "Employee"),
  updateEmployee: updateGeneric(Employee, "Employee"),
  deleteEmployee: deleteGeneric(Employee, "Employee"),
  getBarberProfile,
};
