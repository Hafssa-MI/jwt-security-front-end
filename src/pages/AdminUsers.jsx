import { useEffect, useState } from "react";
import { getUsers, enableUser, disableUser } from "../services/incidentService";
import Badge from "../components/Badge.jsx";

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => { getUsers().then(setUsers); }, []);

    async function toggle(u) {
        setError("");
        try {
            const updated = u.enabled ? await disableUser(u.id) : await enableUser(u.id);
            setUsers(users.map((x) => (x.id === updated.id ? updated : x)));
        } catch (err) {
            setError(err.response?.data?.message || "Erreur");
        }
    }

    return (
        <div>
            <h2>Utilisateurs</h2>
            {error && <p className="msg error">{error}</p>}
            <div className="table-wrap">
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Rôle</th>
                        <th>Actif</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((u) => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.fullName}</td>
                            <td>{u.email}</td>
                            <td><Badge value={u.role}/></td>
                            <td>
                                <span className={`badge ${u.enabled ? "badge-RESOLVED" : "badge-CRITICAL"}`}>
                                    {u.enabled ? "Actif" : "Désactivé"}
                                </span>
                            </td>
                            <td>
                                <button className={u.enabled ? "btn-danger" : ""} onClick={() => toggle(u)}>
                                    {u.enabled ? "Désactiver" : "Activer"}
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}