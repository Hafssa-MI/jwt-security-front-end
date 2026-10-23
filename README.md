# Gestion des incidents - Frontend
# Auteur : HAFSSA MIFTAH IDRISSI
# SDIA2 : 2026/2027

Application React qui communique avec l'API Spring Boot et utilise un JWT pour l'authentification.

## Technologies

- React avec Vite
- React Router
- Axios

## Lancer le frontend

Prérequis : Node.js et le backend démarré sur le port 8080.

```
cd frontend
npm install
npm run dev
```

L'application est accessible sur http://localhost:5173.

L'adresse du backend est définie dans `src/services/api.js` (`http://localhost:8080`).

## Comptes de test

| Rôle | Email | Mot de passe |
|---|---|---|
| ADMIN | admin@test.com | admin123 |
| TECHNICIAN | tech@test.com | tech123 |
| EMPLOYEE | créer un compte sur la page `/register` | au choix |

Les données sont perdues à chaque redémarrage du backend (base H2 en mémoire).

## Pages et accès

| Route | Page | Accès |
|---|---|---|
| /login | Connexion | Public |
| /register | Inscription | Public |
| /dashboard | Tableau de bord adapté au rôle | Connecté |
| /profile | Profil et changement de mot de passe | Connecté |
| /incidents/:id | Détail, historique et notes | Connecté |
| /incidents/my | Mes incidents | EMPLOYEE |
| /incidents/new | Nouvel incident | EMPLOYEE |
| /incidents/assigned | Incidents affectés | TECHNICIAN |
| /admin/incidents | Tous les incidents | ADMIN |
| /admin/users | Gestion des utilisateurs | ADMIN |

## Gestion du JWT

- Après la connexion, le token, le rôle et le nom sont enregistrés dans le `localStorage`.
- Un intercepteur de requêtes Axios ajoute `Authorization: Bearer <token>` à chaque appel.
- Un intercepteur de réponses détecte les erreurs 401 : le token est supprimé, l'utilisateur est redirigé vers `/login` et un message indique que la session a expiré.
- `ProtectedRoute` bloque les pages pour un utilisateur non connecté et `RoleRoute` limite l'accès selon le rôle.

La protection des routes React améliore seulement l'expérience utilisateur. La vraie sécurité est assurée par le backend.

## Fonctionnalités réalisées

- Connexion, inscription et déconnexion
- Dashboard différent pour EMPLOYEE, TECHNICIAN et ADMIN
- Création et consultation des incidents
- Détail d'un incident avec historique et notes de traitement
- Changement de statut (technicien, admin) et affectation à un technicien (admin)
- Activation et désactivation des utilisateurs (admin)
- Modification du profil et du mot de passe
- Message de session expirée

## Structure

```
src/
  components/   Navbar, ProtectedRoute, RoleRoute, IncidentTable, Badge
  pages/        Login, Register, Dashboard, Profile, MyIncidents, NewIncident,
                IncidentDetails, AssignedIncidents, AdminUsers, AdminIncidents
  services/     api.js, authService.js, incidentService.js
  App.jsx
  main.jsx
```