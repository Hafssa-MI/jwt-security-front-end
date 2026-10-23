import { useEffect, useState } from "react";
import { getMyIncidents } from "../services/incidentService";
import IncidentTable from "../components/IncidentTable.jsx";

export default function MyIncidents() {
    const [incidents, setIncidents] = useState([]);
    useEffect(() => { getMyIncidents().then(setIncidents); }, []);
    return (
        <div>
            <h2>Mes incidents</h2>
            <IncidentTable incidents={incidents} />
        </div>
    );
}