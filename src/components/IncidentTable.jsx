import { Link } from "react-router-dom";
import Badge from "./Badge.jsx";

export default function IncidentTable({ incidents }) {
    if (incidents.length === 0) return <div className="card">Aucun incident pour le moment.</div>;
    return (
        <div className="table-wrap">
            <table>
                <thead>
                <tr>
                    <th>ID</th><th>Titre</th><th>Catégorie</th><th>Priorité</th>
                    <th>Statut</th><th>Créé par</th><th>Affecté à</th><th>Date</th><th></th>
                </tr>
                </thead>
                <tbody>
                {incidents.map((i) => (
                    <tr key={i.id}>
                        <td>{i.id}</td>
                        <td>{i.title}</td>
                        <td>{i.category}</td>
                        <td><Badge value={i.priority} /></td>
                        <td><Badge value={i.status} /></td>
                        <td>{i.createdBy}</td>
                        <td>{i.assignedTo || "-"}</td>
                        <td>{new Date(i.createdAt).toLocaleDateString()}</td>
                        <td><Link to={`/incidents/${i.id}`}>Détails</Link></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}