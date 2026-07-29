import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8000"
});

export const getFacultyInsights = async (facultyId) => {
    const response = await API.get(`/faculty/insights?facultyId=${facultyId}`);
    return response.data;
};