import api from "./api";

export async function login(email, password) {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
    localStorage.setItem("fullName", data.fullName);
    return data;
}

export function register(fullName, email, password) {
    return api.post("/auth/register", { fullName, email, password });
}

export function logout() {
    ["token", "role", "fullName"].forEach((k) => localStorage.removeItem(k));
}

export const isLoggedIn = () => !!localStorage.getItem("token");
export const getRole = () => localStorage.getItem("role");