import axios from "axios";

const API_URL = "https://increw.cafe/api/v1-ai-insight/";


const getAiInsight = async (data) => {
    const response = await axios.post(`${API_URL}`, data);

    return response.data;
}



const aiService = {
    getAiInsight,
}

export default aiService;