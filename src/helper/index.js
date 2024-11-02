import { decodeToken } from "react-jwt";

export function addTokenToHeader({headers}){
    const token = localStorage.getItem("token");
    if(token){
        headers.Authorization = `${token}`
    }
    return headers;
}

export function handleApiResponse(res){
    console.log(res);
    switch(res.status){
        case 401:
            localStorage.removeItem("token");
            alert("You're logged out");
            window.location.href = "/login";
            return null;
        case 400:
            alert("Invalid email or password");
            return null;
        case 201:
            return res;
        case 200:
            return res;
        case 500:
            alert("Something went wrong");
            return null;
        default:
            alert("Something went wrong");
            break;
    }
}