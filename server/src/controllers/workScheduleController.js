const WorkSchedule = require("../models/WorkSchedule");
const {
  findAllGenericRef,
  findIdGenericRef,
  createGeneric,
  updateGeneric,
  deleteGeneric,
} = require("../controllers/use.controller");

const addSlotToWorkSchedule = async (req, res) => {
  const { workScheduleId } = req.params; // Lấy workScheduleId từ URL
  const { day, startTime } = req.body; // day: "YYYY-MM-DD", startTime: "HH:MM"

  try {
    // Tìm WorkSchedule bằng workScheduleId
    const workSchedule = await WorkSchedule.findById(workScheduleId);

    if (!workSchedule) {
      return res.status(404).json({ message: "WorkSchedule không tồn tại" });
    }

    // Tạo một đối tượng Date từ ngày và giờ bắt đầu (Mặc định là UTC)
    let currentDateTime = new Date(`${day}T${startTime}:00.000Z`);

    // Chuyển sang múi giờ Việt Nam (UTC+7)
    currentDateTime.setHours(currentDateTime.getHours());

    // Lấy tên thứ (day of week) từ đối tượng Date
    const dayOfWeek = currentDateTime.toLocaleDateString("en-US", {
      weekday: "long",
    });

    // Tạo 8 slot, mỗi slot cách nhau 1 giờ
    const slots = [];
    for (let i = 0; i < 8; i++) {
      // Chuyển đổi sang chuỗi ISO nhưng giữ đúng múi giờ Việt Nam
      const isoTimeVN = currentDateTime.toISOString().replace("Z", "+00:00"); // Thay 'Z' bằng '+07:00'

      const newSlot = {
        day: dayOfWeek,
        startTime: isoTimeVN, // Lưu theo múi giờ Việt Nam
        isBooked: false,
      };

      slots.push(newSlot);

      // Tăng thời gian lên 1 giờ cho slot tiếp theo
      currentDateTime.setHours(currentDateTime.getHours() + 1);
    }

    // Thêm các slot mới vào mảng slots của WorkSchedule
    workSchedule.slots.push(...slots);

    // Lưu lại WorkSchedule đã cập nhật
    await workSchedule.save();

    // Trả về kết quả thành công
    res.status(200).json({
      message: "Thêm 8 slot thành công",
      data: workSchedule,
    });
  } catch (error) {
    console.error("Lỗi khi thêm slot:", error);
    res
      .status(500)
      .json({ message: "Lỗi khi thêm slot", error: error.message });
  }
};

// workSchedule.controller.js

// ① API lấy lịch làm việc theo employeeId (quan trọng nhất)
const getScheduleByEmployeeId = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.employeeId).populate(
      "workScheduleId"
    );

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(employee.workScheduleId || { slots: [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ② API cập nhật thông tin slot cụ thể
const updateSlot = async (req, res) => {
  try {
    const { workScheduleId, slotId } = req.params;
    const { day, startTime, isBooked } = req.body;

    const schedule = await WorkSchedule.findById(workScheduleId);
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    const slot = schedule.slots.id(slotId);
    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    if (day) slot.day = day;
    if (startTime) slot.startTime = new Date(startTime);
    if (isBooked !== undefined) slot.isBooked = isBooked;

    await schedule.save();
    res.json(slot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ③ API xóa nhiều slots cùng lúc
const deleteMultipleSlots = async (req, res) => {
  try {
    const { workScheduleId } = req.params;
    const { slotIds } = req.body;

    const schedule = await WorkSchedule.findById(workScheduleId);
    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    schedule.slots = schedule.slots.filter(
      (slot) => !slotIds.includes(slot._id.toString())
    );

    await schedule.save();
    res.json({ message: "Slots deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllWorkSchedules: findAllGenericRef(WorkSchedule),
  getWorkScheduleById: findIdGenericRef(WorkSchedule),
  createWorkSchedule: createGeneric(WorkSchedule, "WorkSchedule"),
  updateWorkSchedule: updateGeneric(WorkSchedule, "WorkSchedule"),
  deleteWorkSchedule: deleteGeneric(WorkSchedule, "WorkSchedule"),
  addSlotToWorkSchedule, // Thêm hàm mới vào exports
  getScheduleByEmployeeId, // Thêm hàm mới vào exports
  updateSlot, // Thêm hàm mới vào exports
  deleteMultipleSlots, // Thêm hàm mới vào exports
};
