import { useEffect, useState } from 'react';
import { Table, Space, Popconfirm, notification, Button, Modal, Form, Input, Select, DatePicker } from 'antd';
import axios from 'axios'
import moment from 'moment';
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
      width: 150,
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
          <a onClick={() => handleEditModal(id.id)}>Sửa</a>
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
  const [editModal, setEditModal] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const defaultCategory = {
    'Đời sống': '6276a5b8f95484e7d1935f0d',
    'Phát triển bản thân': '6276a5e8f95484e7d1935f10',
    'Truyện, tiểu thuyết': '6276a8e2f95484e7d1935f41',
    'Chính trị - pháp luật': '6276a916f95484e7d1935f43',
    'Văn hoá xã hội, Lịch sử': 'o6276a93ff95484e7d1935f45'
  }
  const showModalAdd = () => {
    setIsModalVisible(true);
  };

  const handleEditModal = (id) => {
    showModalAdd()
    console.log('book', books)
    const editBook = books.filter(book => book.id === id)[0]
    setEditModal({
      ...editBook, name: editBook.title, publication_date: moment(editBook.publication_date, 'DD-MM-YYYY'), category_id: defaultCategory[editBook.category]
    })
    console.log(editBook)
  }

  const onConfirmDelete = async () => {
    try {
      await axios.patch('https://thangld-dev.tech/api/itembook/delete', { id: isDelete })
      notification["success"]({
        message: "Delete book successful",
        placement: "topRight"
      })
      window.location.reload()
    } catch (e) {
      notification["error"]({
        message: "Delete book failed",
        placement: "topRight"
      })
    }

  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://thangld-dev.tech/api/itembook')
      const filterDeleted = response.data.data.filter(book => book.book?.is_active === true)
      setBooks(
        filterDeleted.map(row => ({
          id: row._id,
          title: row.book.title,
          price: row.price,
          amount: row.amount,
          number_of_pages: row.book.number_of_pages,
          language: row.book.language,
          publication_date: new Date(row.book.publication_date).toLocaleDateString(),
          image: row.book.image,
          author: row.book.author.name,
          publisher: row.book.publisher.name,
          category: row.book.category.type,
        }))
      )
    }
    fetchData()
  }, [])

  const onFinishModal = (newBook) => {
    setIsModalVisible(false);
    const data = {
      author_name: newBook.author,
      biography: newBook.biography,
      publish_name: newBook.publisher,
      title: newBook.name,
      number_of_pages: newBook.number_of_pages,
      language: newBook.language,
      publication_date: newBook.publication_date._d.toString(),
      image: newBook.image,
      category_id: newBook.category_id,
      discription: 'abc'
    }
    console.log('book: ', data)
    axios.post('https://thangld-dev.tech/api/book/create', data)
      .then((response) => {
        console.log('response create bôk:', response)
        const data = {
          amount: newBook.amount,
          price: newBook.price,
          book: response.data.data.book
        }
        return data
      })
      .then((data) => {
        console.log('data post itembook', data)//eo hieu lun a
        return axios.post('https://thangld-dev.tech/api/itembook/create', data)
      })
      .then((data) => {
        console.log('response create item bôk:', data)
        notification["success"]({
          message: "Add book successful",
          placement: "topRight"
        })
        window.location.reload();
      })
      .catch((e) => {
        notification["error"]({
          message: "Add book failed",
          placement: "topRight"
        })
      })
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
        title={editModal ? "Sửa sách" : "Thêm sách"}
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
          // fields={fields}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={editModal}
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
            label="Tiểu sử"
            name="biography"
            rules={[{ required: true, message: 'Điền tiểu sử!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="category_id" label="Thể loại" rules={[{ required: true }]}>
            <Select
              placeholder="Chọn thể loại"
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

          <Form.Item name="publication_date" label="Ngày phát hành" {...config}>
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