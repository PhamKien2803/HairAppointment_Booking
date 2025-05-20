import DashboardPage from "../pages/admin/Dashboard";
import BranchManagement from "../pages/admin/BranchManagement";
import ServiceManagement from "../pages/admin/ServiceManagement";

// import CustomerManagement from "../pages/admin/CustomerManagement";
// import EmployeeManagement from "../pages/admin/EmployeeManagement";
// import AppointmentManagement from "../pages/admin/AppointmentManagement";
// import ScheduleManagement from "../pages/admin/ScheduleManagement";
// import VoucherManagement from "../pages/admin/VoucherManagement";
// import InvoiceManagement from "../pages/admin/InvoiceManagement";
// import AdminProfile from "../pages/admin/AdminProfile";

import {
  Dashboard as DashboardIcon,
  Store as BranchIcon,
  RoomService as ServiceIcon,
  People as CustomerIcon,
  Work as EmployeeIcon,
  CalendarToday as AppointmentIcon,
  Schedule as ScheduleIcon,
  LocalOffer as VoucherIcon,
  Receipt as InvoiceIcon,
  AdminPanelSettings as AdminIcon,
} from "@mui/icons-material";
import WorkScheduleManagement from "../pages/admin/WorkScheduleManagement";
import VoucherManager from "../pages/admin/VoucherManager";

const menuItems = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
    path: "/admin/dashboard",
    component: DashboardPage,
  },
  {
    text: "Manage Branch",
    icon: <BranchIcon />,
    path: "/admin/branch",
    component: BranchManagement,
  },
  {
    text: "Manage Service",
    icon: <ServiceIcon />,
    path: "/admin/service",
    component: ServiceManagement,
  },
  // { text: "Manage Customer", icon: <CustomerIcon />, path: "/admin/customer", component: CustomerManagement },
  // { text: "Manage Employee", icon: <EmployeeIcon />, path: "/admin/employee", component: EmployeeManagement },
  // { text: "Manage Appointment", icon: <AppointmentIcon />, path: "/admin/appointment", component: AppointmentManagement },
  {
    text: "Manage Schedule",
    icon: <ScheduleIcon />,
    path: "/admin/schedule",
    component: WorkScheduleManagement,
  },
  {
    text: "Manage Voucher",
    icon: <VoucherIcon />,
    path: "/admin/voucher",
    component: VoucherManager,
  },
  // { text: "Manage Invoice", icon: <InvoiceIcon />, path: "/admin/invoice", component: InvoiceManagement },
  // { text: "Admin Profile", icon: <AdminIcon />, path: "/admin/profile", component: AdminProfile },
];

export default menuItems;
