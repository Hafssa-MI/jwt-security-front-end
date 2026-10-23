import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getIncident, updateStatus, assignIncident, addComment, getUsers } from "../services/incidentService";
import { getRole } from "../services/authService";
import Badge from "../components/Badge.jsx";

const STATUSES = ["OPEN", "ASSIGNED", "IN_PROGRESS", "RESOLVED", "CLOSED"];

export default function IncidentDetails() {
    const { id } = useParams();
    const role = getRole();
    const [incident, setIncident] = useState(null);
    const [error, setError] = useState("");
    const [status, setStatus] = useState("IN_PROGRESS");
    const [technicians, setTechnicians] = useState([]);
    const [techId, setTechId] = useState("");
    const [note, setNote] = useState("");

    useEffect(() => {
        getIncident(id)
            .then(setIncident)
            .catch((err) => setError(err.response?.data?.message || "Erreur"));
        if (role === "ADMIN") {
            getUsers().then((users) => {
                const t = users.filter((u) => u.role === "TECHNICIAN");
                setTechnicians(t);
                if (t.length > 0) setTechId(t[0].id);
            });
        }
    }, [id, role]);

    async function run(action) {
        setError("");
        try {
            setIncident(await action());
        } catch (err) {
            setError(err.response?.data?.message || "Erreur");
        }
    }

    if (error && !incident) return <p className="msg error">{error}</p>;
    if (!incident) return <p>Chargement...</p>;

    return (
        <div>
            <div className="page-head">
                <h2>#{incident.id} · {incident.title}</h2>
                <div>
                    <Badge value={incident.priority} /> <Badge value={incident.status} />
                </div>
            </div>
            {error && <p className="msg error">{error}</p>}

            <div className="card">
                <p>{incident.description}</p>
                <div className="info-grid">
                    <div><span>Catégorie</span>{incident.category}</div>
                    <div><span>Créé par</span>{incident.createdBy}</div>
                    <div><span>Affecté à</span>{incident.assignedTo || "-"}</div>
                    <div><span>Créé le</span>{new Date(incident.createdAt).toLocaleString()}</div>
                </div>
            </div>

            {(role === "TECHNICIAN" || role === "ADMIN") && (
                <div className="card">
                    <h3>Changer le statut</h3>
                    <div className="inline-row">
                        <select value={status} onChange={(e) => setStatus(e.target.value)}>
                            {STATUSES.map((s) => <option key={s}>{s}</option>)}
                        </select>
                        <button onClick={() => run(() => updateStatus(id, status))}>Valider</button>
                    </div>
                </div>
            )}

            {role === "ADMIN" && (
                <div className="card">
                    <h3>Affecter à un technicien</h3>
                    <div className="inline-row">
                        <select value={techId} onChange={(e) => setTechId(e.target.value)}>
                            {technicians.map((t) => (
                                <option key={t.id} value={t.id}>{t.fullName}</option>
                            ))}
                        </select>
                        <button onClick={() => run(() => assignIncident(id, techId))}>Affecter</button>
                    </div>
                </div>
            )}

            <div className="card">
                <h3>Historique</h3>
                <ul className="timeline">
                    {incident.history.map((h, idx) => (
                        <li key={idx}>
                            <small>{new Date(h.createdAt).toLocaleString()}</small>
                            {h.message}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="card">
                <h3>Notes de traitement</h3>
                {incident.comments.length === 0 && <p>Aucune note.</p>}
                {incident.comments.map((c, idx) => (
                    <div className="note" key={idx}>
                        <small>{new Date(c.createdAt).toLocaleString()} · {c.author}</small>
                        {c.content}
                    </div>
                ))}
                {role === "TECHNICIAN" && (
                    <>
                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Ajouter une note de traitement"
                    />
                        <button
                            className="mt"
                            onClick={async () => {
                                await run(() => addComment(id, note));
                                setNote("");
                            }}
                        >
                            Ajouter la note
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}