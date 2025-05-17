const Voucher = require("../models/Voucher");
const {
  findAllGenericRef,
  findIdGenericRef,
  createGeneric,
  updateGeneric,
  deleteGeneric,
} = require("../controllers/use.controller");

module.exports = {
  getAllVouchers: findAllGenericRef(Voucher, []), // Không có reference cần populate
  getVoucherById: findIdGenericRef(Voucher, []),
  createVoucher: createGeneric(Voucher, "Voucher"),
  updateVoucher: updateGeneric(Voucher, "Voucher"),
  deleteVoucher: deleteGeneric(Voucher, "Voucher"),
};
