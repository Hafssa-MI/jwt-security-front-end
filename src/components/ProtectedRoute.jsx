import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../services/authService";
import Navbar from "./Navbar.jsx";

export default function ProtectedRoute() {
    if (!isLoggedIn()) return <Navigate to="/login" replace />;
    return (
        <>
            <Navbar />
            <main className="page">
                <Outlet />
            </main>
        </>
    );
}