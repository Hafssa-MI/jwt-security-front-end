import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authService";

function Register() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        try {
            await register(fullName, email, password);
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Erreur lors de l'inscription");
        }
    }

    return (
        <div className="auth-page">
            <form className="auth-card" onSubmit={handleSubmit}>
                <h1 className="auth-title">Créer un compte</h1>
                <p className="auth-sub">Déclarez et suivez vos incidents</p>
                {error && <p className="msg error">{error}</p>}
                <label>Nom complet</label>
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} />
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label>Mot de passe</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="submit" value="S'inscrire" />
                <p className="auth-link">Déjà un compte ? <Link to="/login">Se connecter</Link></p>
            </form>
        </div>
    );
}

export default Register;