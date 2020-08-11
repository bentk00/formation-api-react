import axios from 'axios';
import JwtDecode from "jwt-decode";

const setAxiosToken = token => axios.defaults.headers["Authorization"] = "Bearer " + token;

const setup = () => {
    const token = window.localStorage.getItem("authToken");
    if (isAuthenticated()) {
        const {exp: expiration} = JwtDecode(token);
        if (expiration * 1000 > new Date().getTime()) {
            // On prévient Axios qu'on maintenant un header par défaut sur toutes nos requetes HTTP
            setAxiosToken(token);
        }
    }
}

const isAuthenticated = () => {
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const {exp: expiration} = JwtDecode(token);
        if (expiration * 1000 > new Date().getTime()) {
            return true;
        }
        return false;
    }
    return false;
}

const authenticate = credentials => {
    return axios
        .post("https://localhost:8000/api/login_check", credentials)
        .then(response => response.data.token)
        .then(token => {
            window.localStorage.setItem('authToken', token);
            // On prévient Axios qu'on maintenant un header par défaut sur toutes nos requetes HTTP
            setAxiosToken(token);
        });
}

const logout = () => {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}

export default {
    setup,
    authenticate,
    isAuthenticated,
    logout
}