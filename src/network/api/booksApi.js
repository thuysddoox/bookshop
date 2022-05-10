import axiosInstance from "../instance";

const booksApi = {
    getAll: () => {
        return axiosInstance.get('/book')
    },

    create: (data) => {
        return axiosInstance.post('/book', data)
    },

    update: (id, data) => {
        return axiosInstance.put(`/book/${id}`, data);
    },

    remove: (id) => {
        return axiosInstance.delete(`/book/${id}`);
    },
};

export default booksApi