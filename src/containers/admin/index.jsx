import { useEffect, useState } from 'react';
import { Table, Space, Popconfirm, notification, Button, Modal, Form, Input, Select, DatePicker } from 'antd';
import axios from 'axios'

const { Option } = Select;

function Admin() {
  const columns = [
    {
      title: 'Sách',
      dataIndex: 'title',
      key: 'title',
      width: 400,
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
      title: 'Tiểu sử',
      dataIndex: 'biography',
      key: 'biography',
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
      width: 200
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
      render: (t, r) => <img src={`${r.image}`} />,
      width: 150,
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
    try {
      console.log(isDelete)
      const response = await axios.patch('https://bookstore-api.thangld-dev.tech/api/itembook/delete', { id: isDelete })
      console.log(response)
      notification["success"]({
        message: "Delete book successful",
        placement: "topRight"
      })
      window.location.reload()
      //setBooks(books => books.filter(book => book._id !== isDelete))
    } catch (e) {
      notification["error"]({
        message: "Delete book failed",
        placement: "topRight"
      })
    }

  }

  useEffect(() => {
    const fetchData = async () => {
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
    console.log(newBook.number_of_pages)
    setIsModalVisible(false);
    const data = {
      'author_name': newBook.author,
      'biography': newBook.biography,
      'publish_name': newBook.publisher,
      'title': newBook.name,
      'number_of_pages': newBook.number_of_pages,
      'language': newBook.language,
      'publication_date': newBook.publication_date,
      'image': newBook.image,
      'category_id': newBook.category_id
    }
    console.log(data)
    // try {
    //   const response = await axios.post('https://bookstore-api.thangld-dev.tech/api/book/create', { data })
    //   console.log(response.data.data._id)
    //   try {
    //       const dataItem = {
    //         'amount': newBook.amount,
    //         'price': newBook.price,
    //         'book': response.data.data._id
    //       }
    //       console.log(dataItem)
    //       const res = await axios.post('https://bookstore-api.thangld-dev.tech/api/itembook/create', { dataItem })
    //       console.log('res:', res.data.data)
    //       notification["success"]({
    //       message: "Add book successful",
    //       placement: "topRight"
    //     })
    //   } catch (e){
    //      notification["error"]({
    //     message: "Add book failed",
    //     placement: "topRight"
    //   })
    //   }
    // } catch (e) {
    //   notification["error"]({
    //     message: "Add book failed",
    //     placement: "topRight"
    //   })
    // }
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  }

  const config = {
  rules: [
    {
      type: 'object',
      required: true,
      message: 'Please select time!',
    },
  ],
};

  return (
    <div style={{ paddingTop: 100, paddingLeft: 40, paddingRight: 40 }}>
      <Button className="text-white bg-green block text-center h-10 rounded-lg cursor-pointer inline-block" style={{ marginBottom: 20 }} onClick={showModalAdd}>Thêm</Button>
      <Modal
        title="Thêm sách"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button form="myForm" key="submit" htmlType="submit" type="primary" className="text-white bg-green block text-center h-10 rounded-lg cursor-pointer inline-block">
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
            label="Tieu su"
            name="biography"
            rules={[{ required: true, message: 'Điền tieu su!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="category_id" label="Thể loại" rules={[{ required: true }]}>
          <Select
            placeholder="Chọn thể loại"
            //onChange={this.onCategoryChange}
            allowClear
          >
            <Option value="6276a5b8f95484e7d1935f0d">Đời sống</Option>
            <Option value="6276a5e8f95484e7d1935f10">Phát triển bản thân</Option>
            <Option value="6276a8e2f95484e7d1935f41">Truyện, tiểu thuyết</Option>
            <Option value="6276a916f95484e7d1935f43">Chính trị - pháp luật</Option>
            <Option value="o6276a93ff95484e7d1935f45">Văn hoá xã hội, Lịch sử</Option>
          </Select>
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

          <Form.Item name="publication_date" label="DatePicker" {...config}>
            <DatePicker />
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
      <Table columns={columns} dataSource={books} scroll={{ x: 1300 }} />
    </div>
  )
}

export default Admin