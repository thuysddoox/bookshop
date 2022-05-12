import { useEffect, useState } from 'react';
import { Table, Space, Popconfirm, notification, Button, Modal, Form, Input } from 'antd';
import axios from 'axios'

function Admin(){
  const columns = [
    {
      title: 'Sach',
      dataIndex: 'title',
      key: 'title',
      //width: 300,
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
      // width: 300,
    },
    {
      title: 'Nhà xuất bản',
      dataIndex: 'publisher',
      key: 'publisher',
      width: 300,
    },
    {
      title: '',
      key: 'id',
      render: (id) => (
        <Space size="middle">
          <a onClick={showModalAdd}>Sửa</a>
          <Popconfirm
            title="Are you sure to delete this book? "
            onConfirm={onConfirmDelete}
            okText="Yes"
            cancelText="No"
          >
            <a onClick={() => setIsDelete(id.id)}>Xóa</a>
          </Popconfirm>        
        </Space>
      ),
    },
  ];

   const [books, setBooks] = useState([])
   const [isDelete, setIsDelete] = useState(null)

   const [isModalVisible, setIsModalVisible] = useState(false);

  const showModalAdd = () => {
    setIsModalVisible(true);
  };

 
  

   const onConfirmDelete = async () => {
      try{
        console.log(isDelete)
        const response =await axios.patch('https://bookstore-api.thangld-dev.tech/api/itembook/delete', {id: isDelete})
        console.log(response)
        notification["success"]({
          message: "Delete book successful",
          placement: "topRight"
        })
        window.location.reload()
        //setBooks(books => books.filter(book => book._id !== isDelete))
      } catch(e){
        notification["error"]({
          message: "Delete book failed",
          placement: "topRight"
        })
      }
      
   }

    useEffect(() => {
        const fetchData = async() => {
            const response = await axios.get('https://bookstore-api.thangld-dev.tech/api/itembook')
            setBooks(
              response.data.data.map(row => ({
                id: row._id,
                title: row.book.title,
                price: row.price,
                amount: row.amount,
                number_of_pages: row.book.number_of_pages,
                language: row.book.language,
                publication_date: row.book.publication_date,
                image: row.book.image,
                author: row.book.author.name,
                publisher: row.book.publisher.name,
                category: row.book.category.type,
              }))
            )
        }
        fetchData()
    }, [])

    const onFinishModal = async (newBook) => {
        console.log(newBook)
        setIsModalVisible(false);
        const data = {
          'price': newBook
        }
        try{
          await axios.post('https://bookstore-api.thangld-dev.tech/api/itembook/create', {data})
          notification["success"]({
            message: "Add book successful",
            placement: "topRight"
          })
          //setBooks(books => books.filter(book => book._id !== isDelete))
        } catch(e){
          notification["error"]({
            message: "Add book failed",
            placement: "topRight"
          })
      }
    }

    const handleCancel = () => {
      setIsModalVisible(false);
    }


  
    return(
      <div style={{paddingTop: 100, paddingLeft: 40, paddingRight:40}}>
        <Button className="text-white bg-green block text-center h-10 rounded-lg cursor-pointer inline-block" style={{marginBottom: 20}} 
                onClick={showModalAdd}>Thêm
        </Button>
        <Modal 
          title="Thêm sách" 
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button className="text-white bg-green block text-center h-10 rounded-lg cursor-pointer inline-block" form="myForm" key="submit" htmlType="submit" type="primary">
                Submit
            </Button>
          ]}>
          <Form
            id="myForm"
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={onFinishModal}
          >
            <Form.Item
              label="Tên sách"
              name="name"
              rules={[{ required: true, message: 'Điền tên sách!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Số lượng"
              name="amount"
              rules={[{ required: true, message: 'Điền số lượng!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Giá"
              name="price"
              rules={[{ required: true, message: 'Điền giá!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Tác giả"
              name="author"
              rules={[{ required: true, message: 'Điền tác giả!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Thể loại"
              name="category"
              rules={[{ required: true, message: 'Điền thể loại!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Số trang"
              name="number_of_pages"
              rules={[{ required: true, message: 'Điền số trang!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Ngôn ngữ"
              name="language"
              rules={[{ required: true, message: 'Điền ngôn ngữ!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Ngày phát hành"
              name="publication_date"
              rules={[{ required: true, message: 'Điền ngày phát hành!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Ảnh"
              name="image"
              rules={[{ required: true, message: 'Điền ảnh!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Nhà xuất bản"
              name="publisher"
              rules={[{ required: true, message: 'Điền nhà xuất bản!' }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
        <Table  columns={columns} dataSource={books} scroll={{ x: 1300 }} />
      </div>
    )
}

export default Admin