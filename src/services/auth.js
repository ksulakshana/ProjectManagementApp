import axios from "axios";
import { addTokenToHeader , handleApiResponse } from "../helper";

export const register = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/user/register`, data, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded"
        }
    });
    return handleApiResponse(res);
}

export const login = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/user/login`, data, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded"
        }
    });
    return res;
}

export const getUserData = async () => {
    const headers = addTokenToHeader({ headers: {} });
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/user/`,{headers}
    );
    if (res.status === 401) {
        localStorage.removeItem("token");
        alert("You're logged out");
        window.location.href = "/login";
    }
    return res;
}

export const getAllUsers = async () => {
    const headers = addTokenToHeader({ headers: {} });
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/user/allUsers`,{headers}
    );
    if (res.status === 401) {
        localStorage.removeItem("token");
        alert("You're logged out");
        window.location.href = "/login";
    }
    return res;
}