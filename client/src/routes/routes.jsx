import BarberDashboard from "../pages/dashboard/BarberDashboard";
import CustomerDashboard from "../pages/dashboard/CustomerDashboard";
import ReceptionistDashboard from "../pages/dashboard/ReceptionistDashboard";
import ApointmentResgister from "../pages/customer/ApointmentResgister";
import ProfileCustomer from "../pages/customer/ProfileCustomer";
import menuItems from "../layout/menuItems";

import BarberSchedule from "../pages/barber/BarberSchedule";

import Invoice from "../pages/customer/Invoice";

export const routesCustomer = [
  {
    name: "customer-dashboard",
    key: "customer-dashboard",
    path: "/customer-dashboard",
    component: CustomerDashboard,
  },
  {
    name: "customer-booking",
    key: "customer-booking",
    path: "/customer-booking",
    component: ApointmentResgister,
  },
  {
    name: "profile-customer",
    key: "profile-customer",
    path: "/profile-customer",
    component: ProfileCustomer,
  },
  {
    name: "customer-invoice",
    key: "customer-invoice",
    path: "/customer-invoice",
    component: Invoice,
  },
];

export const routesBarber = [
  {
    name: "barber-dashboard",
    key: "barber-dashboard",
    path: "/barber-dashboard",
    component: BarberDashboard,
  },
  {
    name: "barber-schedule",
    key: "barber-schedule",
    path: "/barber-schedule",
    component: BarberSchedule,
  },
];

export const routesReceptionist = [
  {
    name: "receptionist-dashboard",
    key: "receptionist-dashboard",
    path: "/receptionist-dashboard",
    component: ReceptionistDashboard,
  },
];

export const routesAdmin = menuItems.map(({ path, component }) => ({
  path,
  component,
}));
