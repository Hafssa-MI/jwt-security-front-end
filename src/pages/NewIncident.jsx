import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createIncident } from "../services/incidentService";

const CATEGORIES = ["NETWORK", "MALWARE", "PHISHING", "ACCESS", "SOFTWARE", "HARDWARE", "DATA_LEAK", "OTHER"];
const PRIORITIES = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];

export default function NewIncident() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("NETWORK");
    const [priority, setPriority] = useState("MEDIUM");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        try {
            await createIncident({ title, description, category, priority });
            navigate("/incidents/my");
        } catch (err) {
            setError(err.response?.data?.message || "Erreur");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Déclarer un incident</h2>
            {error && <p className="msg error">{error}</p>}
            <label>Titre :</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
            <br />
            <label>Description :</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            <br />
            <label>Catégorie :</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <br />
            <label>Priorité :</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                {PRIORITIES.map((p) => <option key={p}>{p}</option>)}
            </select>
            <br />
            <button type="submit">Envoyer</button>
        </form>
    );
}