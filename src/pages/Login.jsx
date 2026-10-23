import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [info] = useState(() =>
        localStorage.getItem("sessionExpired") ? "Votre session a expiré, veuillez vous reconnecter." : ""
    );
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("sessionExpired");
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        try {
            await login(email, password);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Erreur de connexion au serveur");
        }
    }

    return (
        <div className="auth-page">
            <form className="auth-card" onSubmit={handleSubmit}>
                <h1 className="auth-title">Gestion des incidents</h1>
                <p className="auth-sub">Connectez-vous à votre compte</p>
                {info && <p className="msg info">{info}</p>}
                {error && <p className="msg error">{error}</p>}
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label>Mot de passe</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="submit" value="Se connecter" />
                <p className="auth-link">Pas de compte ? <Link to="/register">S'inscrire</Link></p>
            </form>
        </div>
    );
}

export default Login;