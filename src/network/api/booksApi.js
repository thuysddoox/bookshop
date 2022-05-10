import axiosInstance from "../instance";

const booksApi = {
    getAll: () => {
        return axiosInstance.get('/itembook')
    },
    getDetail: async (bookId) => {
        return axiosInstance.get('/book/detail', { params: { book_id: bookId } })
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