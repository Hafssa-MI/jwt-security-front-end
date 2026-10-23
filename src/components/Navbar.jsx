import { NavLink, useNavigate } from "react-router-dom";
import { getRole, logout } from "../services/authService";

export default function Navbar() {
    const navigate = useNavigate();
    const role = getRole();
    const name = localStorage.getItem("fullName");

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <nav className="navbar">
            <div className="navbar-inner">
                <span className="brand">Gestion des incidents</span>
                <div className="links">
                    <NavLink to="/dashboard">Dashboard</NavLink>
                    {role === "EMPLOYEE" && (
                        <>
                            <NavLink to="/incidents/my">Mes incidents</NavLink>
                            <NavLink to="/incidents/new">Nouvel incident</NavLink>
                        </>
                    )}
                    {role === "TECHNICIAN" && <NavLink to="/incidents/assigned">Incidents affectés</NavLink>}
                    {role === "ADMIN" && (
                        <>
                            <NavLink to="/admin/incidents">Incidents</NavLink>
                            <NavLink to="/admin/users">Utilisateurs</NavLink>
                        </>
                    )}
                    <NavLink to="/profile">Profil</NavLink>
                </div>
                <div className="user">
                    <span>{name}</span>
                    <span className="role">{role}</span>
                    <button className="btn-ghost" onClick={handleLogout}>Déconnexion</button>
                </div>
            </div>
        </nav>
    );
}