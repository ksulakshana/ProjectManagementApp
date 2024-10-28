import axios from "axios";
import { handleApiResponse , addTokenToHeader} from "../helper";

export const createPost = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/task/`, data, {
        headers: {
            'Content-Type': "application/x-www-form-urlencoded"
        }
    });
    return handleApiResponse(res);
}

export const getAllTasks = async () => {
    const headers = addTokenToHeader({ headers: {} });
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/task/`,{headers}
    );
    if (res.status === 401) {
        localStorage.removeItem("token");
        alert("You're logged out");
        window.location.href = "/login";
    }
    return res;
}