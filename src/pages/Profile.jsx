import { useEffect, useState } from "react";
import api from "../services/api";

function Profile() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [pwdMsg, setPwdMsg] = useState("");
    const [pwdError, setPwdError] = useState("");

    useEffect(() => {
        api.get("/api/profile").then((r) => {
            setFullName(r.data.fullName);
            setEmail(r.data.email);
            setRole(r.data.role);
        });
    }, []);

    async function saveProfile(e) {
        e.preventDefault();
        setMsg("");
        setError("");
        try {
            const { data } = await api.put("/api/profile", { fullName, email });
            localStorage.setItem("token", data.token);   // new token (email may have changed)
            localStorage.setItem("fullName", data.fullName);
            setMsg("Profil mis à jour");
        } catch (err) {
            setError(err.response?.data?.message || "Erreur");
        }
    }

    async function changePassword(e) {
        e.preventDefault();
        setPwdMsg("");
        setPwdError("");
        try {
            const { data } = await api.put("/api/profile/password", { oldPassword, newPassword, confirmPassword });
            setPwdMsg(data.message);
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            setPwdError(err.response?.data?.message || "Erreur");
        }
    }

    return (
        <div>
            <h2>Mon profil</h2>
            <p>Rôle : {role}</p>

            <form onSubmit={saveProfile}>
                {msg && <p className="msg success">{msg}</p>}
                {error && <p className="msg error">{error}</p>}
                <label>Nom :</label>
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} />
                <br />
                <label>Email :</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />
                <button type="submit">Enregistrer</button>
            </form>

            <h3>Changer le mot de passe</h3>
            <form onSubmit={changePassword}>
                {pwdMsg && <p className="msg success">{pwdMsg}</p>}
                {pwdError && <p className="msg error">{pwdError}</p>}
                <label>Ancien mot de passe :</label>
                <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                <br />
                <label>Nouveau mot de passe :</label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                <br />
                <label>Confirmation :</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <br />
                <button type="submit">Changer</button>
            </form>
        </div>
    );
}

export default Profile;