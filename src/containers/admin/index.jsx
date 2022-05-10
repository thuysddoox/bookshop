import { useEffect, useState } from 'react';
import { Table, Space } from 'antd';
import axios from 'axios'

const columns = [
  {
    title: 'Sach',
    dataIndex: 'title',
    key: 'title',
    width: 300,
  },
  {
    title: 'Giá',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Số lượng',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Tác giả',
    dataIndex: 'author',
    key: 'author',
    width: 300,
  },
  {
    title: 'Thể loại',
    dataIndex: 'category',
    key: 'category',
    width: 200,
  },
  {
    title: 'Số trang',
    dataIndex: 'number_of_pages',
    key: 'number_of_pages',
  },
  {
    title: 'Ngôn ngữ',
    dataIndex: 'language',
    key: 'language',
  },
  {
    title: 'Ngày phát hành',
    dataIndex: 'publication_date',
    key: 'publication_date',
  },
  {
    title: 'Ảnh',
    dataIndex: 'image',
    key: 'image',
    width: 300,
  },
  {
    title: 'Nhà xuất bản',
    dataIndex: 'publisher',
    key: 'publisher',
    width: 300,
  },
  {
    title: '',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Sửa</a>
        <a>Xóa</a>
      </Space>
    ),
  },
];


function Admin(){
   const[books, setBooks] = useState([])
  

   

    useEffect(() => {
        const fetchData = async() => {
            const response = await axios.get('https://bookstore-api.thangld-dev.tech/api/itembook')
            setBooks(
              response.data.data.map(row => ({
                title: row.book.title,
                price: row.price,
                amount: row.amount,
                number_of_pages: row.book.number_of_pages,
                language: row.book.language,
                publication_date: row.book.publication_date,
                image: row.book.image,
                author: row.book.author.name,
                publisher: row.book.publisher.name,
                category: row.book.category.type
              }))
            )
        }
        fetchData()
    }, [])

  
    return(
        <Table style={{paddingTop: 100, paddingLeft: 40, paddingRight:40}} columns={columns} dataSource={books} scroll={{ x: 1300 }} />
    )
}

export default Admin