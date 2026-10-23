import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import RoleRoute from "./components/RoleRoute.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
import MyIncidents from "./pages/MyIncidents.jsx";
import NewIncident from "./pages/NewIncident.jsx";
import IncidentDetails from "./pages/IncidentDetails.jsx";
import AssignedIncidents from "./pages/AssignedIncidents.jsx";
import AdminUsers from "./pages/AdminUsers.jsx";
import AdminIncidents from "./pages/AdminIncidents.jsx";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/incidents/:id" element={<IncidentDetails />} />

                <Route element={<RoleRoute roles={["EMPLOYEE"]} />}>
                    <Route path="/incidents/my" element={<MyIncidents />} />
                    <Route path="/incidents/new" element={<NewIncident />} />
                </Route>

                <Route element={<RoleRoute roles={["TECHNICIAN"]} />}>
                    <Route path="/incidents/assigned" element={<AssignedIncidents />} />
                </Route>

                <Route element={<RoleRoute roles={["ADMIN"]} />}>
                    <Route path="/admin/users" element={<AdminUsers />} />
                    <Route path="/admin/incidents" element={<AdminIncidents />} />
                </Route>
            </Route>

            <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    );
}

export default App;