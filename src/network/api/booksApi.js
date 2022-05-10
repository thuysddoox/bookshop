import axiosInstance from "../instance.ts";

const booksApi = {
    getAll: () => {
        return axiosInstance.get('/itembook')
    },

    create: (data) => {
        return axiosInstance.post('/itembook', data)
    },

    update: (id, data) => {
        return axiosInstance.put(`/itembook/${id}`, data);
    },

    remove: (id) => {
        return axiosInstance.delete(`/itembook/${id}`);
    },
};

export default booksApi