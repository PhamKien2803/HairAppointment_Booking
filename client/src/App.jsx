import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landing_pages/LandingPage";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import PrivateRoute from "./routes/PrivateRoute";
import BarberSchedule from "./pages/barber/BarberSchedule";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import VerifyOTP from "./pages/Auth/VerifyOTP";
import ResetPassword from "./pages/Auth/ResetPassword";
import PublicRoute from "./routes/PublicRoute";
import { mainRoute } from "./routes/mainRoute";
import AdminLayout from "./layout/AdminLayout";
import { routesAdmin } from "./routes/routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PublicRoute />}>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* Private Routes */}
        {Object.entries(mainRoute).map(([role, routeList]) => (
          <Route key={role} element={<PrivateRoute allowedRoles={[role]} />}>
            {role === "admin" ? (
              <Route element={<AdminLayout />}>
                {routesAdmin.map(({ path, component: Component }) => (
                  <Route key={path} path={path} element={<Component />} />
                ))}
              </Route>
            ) : (
              routeList.map(({ path, component: Component }) => (
                <Route key={path} path={path} element={<Component />} />
              ))
            )}
          </Route>
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
