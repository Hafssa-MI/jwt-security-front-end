import { useEffect, useState } from "react";
import { getAllIncidents } from "../services/incidentService";
import IncidentTable from "../components/IncidentTable.jsx";

export default function AdminIncidents() {
    const [incidents, setIncidents] = useState([]);
    useEffect(() => { getAllIncidents().then(setIncidents); }, []);
    return (
        <div>
            <h2>Tous les incidents</h2>
            <IncidentTable incidents={incidents} />
        </div>
    );
}