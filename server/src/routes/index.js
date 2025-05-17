const branchRouter = require("./branchRoute");
const serviceRoute = require("./serviceRoute");
const employeeRouter = require("./employeeRoute");
const workScheduleRouter = require("./workScheduleRoute");
const voucherRoute = require("./voucherRoute");
const appointmentRouter = require("./appointmentRoute");
const invoiceRouter = require("../routes/invoiceRoute");
const accountRouter = require("./accountRoute");
const customerRouter = require("./customerRoute");
const dashboardRouter = require("./dashboardRoute");
const allSerice = {
  employeeRouter,
  branchRouter,
  workScheduleRouter,
  accountRouter,
  serviceRoute,
  voucherRoute,
  appointmentRouter,
  invoiceRouter,
  customerRouter,
  dashboardRouter,
};
module.exports = allSerice;
