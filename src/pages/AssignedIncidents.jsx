import { useEffect, useState } from "react";
import { getAssignedIncidents } from "../services/incidentService";
import IncidentTable from "../components/IncidentTable.jsx";

export default function AssignedIncidents() {
    const [incidents, setIncidents] = useState([]);
    useEffect(() => { getAssignedIncidents().then(setIncidents); }, []);
    return (
        <div>
            <h2>Incidents qui me sont affectés</h2>
            <IncidentTable incidents={incidents} />
        </div>
    );
}