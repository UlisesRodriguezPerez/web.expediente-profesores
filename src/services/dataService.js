// services/dataService.js
import api from '../api/api';

const createData = async (endpoint, data) => {
    return await api.post(endpoint, data);
};

const readData = async (endpoint) => {
    return await api.get(endpoint);
};

const updateData = async (endpoint, data) => {
    console.log('dataService.updateData: ', data);
    console.log('dataService.updateData: ', endpoint);
    return await api.put(endpoint, data);
};

const deleteData = async (endpoint) => {
    return await api.delete(endpoint);
};

export default {
    createData,
    readData,
    updateData,
    deleteData
};
