import axios from "axios";
const baseUrl = "/api/blogs";
let token = null;

const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
};

const getAll = async () => {
    try {
        const response = await axios.get(baseUrl);
        return response.data;
    } catch (error) {
        // Handle error if needed
        throw new Error("Error fetching data from API:", error);
    }
};

const create = async (newObject) => {
    const config = {
        headers: { Authorization: token },
    };

    // console.log(`blogservice token: ${token}`);
    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
};

const update = async (id, newObject) => {
    const response = await axios.put(`${baseUrl}/${id}`, newObject);
    console.log("AXIOS UPDATE");
    return response.data;
};

const remove = async (id) => {
    const config = {
        headers: { Authorization: token },
    };

    const response = await axios.delete(`${baseUrl}/${id}`, config);
    return response.data;
};

export default { getAll, create, setToken, update, remove };
