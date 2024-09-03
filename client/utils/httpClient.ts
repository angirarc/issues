import axios from "axios";
console.log(process.env)
const httpClient = axios.create({
    baseURL: "http://localhost:5000",
    timeout: 60000,
});

export const getErrorMessage = (error: any) => {
    let message = 'Unknown error';
    if (error.response) {
        message = error.response.data;
    } else {
        message = error.message;
    }

    return message
}

export default httpClient