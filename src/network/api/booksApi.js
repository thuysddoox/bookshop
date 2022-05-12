import axiosInstance from "../instance";

const booksApi = {
    getAll: () => {
        return axiosInstance.get('/itembook')
    },
    getBookDetail: async (bookId) => {
        return axiosInstance.get('/book/detail', { params: { book_id: bookId } })
    },
    getBookItemDetail: async (itemId) => {
        return axiosInstance.get('/itembook', { params: { item_id: itemId } })
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
    search: (key) => {
        return axiosInstance.get(`/itembook`, { params: { keysearch: key } });
    },
    delete: (id) => {
        return axiosInstance.patch(`/itembook/delete`, { id });
    },
};

export default booksApi