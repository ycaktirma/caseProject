import axios from 'axios';

//Get
export const httpGet = async (url) => {    
    return await axios.get(url);
};

//Post
export const httpPost = async (url, data) => {    
    return await axios.post(url, data);
};

//Delete
export const httpDelete = async (url, id) => {    
    return await axios.delete(url + id);
};

