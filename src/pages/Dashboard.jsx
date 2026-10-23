import { useEffect, useState } from "react";
import { getRole } from "../services/authService";
import { getMyIncidents, getAssignedIncidents, getStatistics } from "../services/incidentService";
import IncidentTable from "../components/IncidentTable.jsx";
import Badge from "../components/Badge.jsx";

function Card({ label, value }) {
    return (
        <div className="stat">
            <div className="stat-value">{value}</div>
            <div className="stat-label">{label}</div>
        </div>
    );
}

export default function Dashboard() {
    const role = getRole();
    const [incidents, setIncidents] = useState([]);
    const [stats, setStats] = useState(null);

    useEffect(() => {
        if (role === "EMPLOYEE") getMyIncidents().then(setIncidents);
        if (role === "TECHNICIAN") getAssignedIncidents().then(setIncidents);
        if (role === "ADMIN") getStatistics().then(setStats);
    }, [role]);

    const count = (...statuses) => incidents.filter((i) => statuses.includes(i.status)).length;

    let cards = [];
    if (role === "EMPLOYEE") {
        cards = [
            ["Mes incidents", incidents.length],
            ["OPEN", count("OPEN")],
            ["IN_PROGRESS", count("IN_PROGRESS")],
            ["Résolus / clôturés", count("RESOLVED", "CLOSED")],
        ];
    } else if (role === "TECHNICIAN") {
        cards = [
            ["Affectés", incidents.length],
            ["Critiques", incidents.filter((i) => i.priority === "CRITICAL").length],
            ["En cours", count("IN_PROGRESS")],
            ["Résolus", count("RESOLVED", "CLOSED")],
        ];
    } else if (role === "ADMIN" && stats) {
        cards = [
            ["Utilisateurs", stats.totalUsers],
            ["Employés", stats.employees],
            ["Techniciens", stats.technicians],
            ["Incidents", stats.totalIncidents],
            ["OPEN", stats.open],
            ["IN_PROGRESS", stats.inProgress],
            ["CLOSED", stats.closed],
        ];
    }

    return (
        <div>
            <div className="page-head">
                <h2>Bonjour, {localStorage.getItem("fullName")}</h2>
                <Badge value={role} />
            </div>
            <div className="stats">
                {cards.map(([label, value]) => <Card key={label} label={label} value={value} />)}
            </div>
            {role === "EMPLOYEE" && (
                <>
                    <h3>Derniers incidents</h3>
                    <IncidentTable incidents={incidents.slice(0, 5)} />
                </>
            )}
        </div>
    );
}