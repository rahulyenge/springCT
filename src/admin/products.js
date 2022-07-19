import React, { useEffect, useState } from "react";

import { Table, Divider, Row, Col, Button, Modal, Form, Input, InputNumber, Select } from 'antd';

import { EditOutlined, DeleteOutlined, PoweroffOutlined } from '@ant-design/icons';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const { Option } = Select;


// const category = [{ cat: 'catA' }, { cat: 'catB' }]

const data = [
    {
        key: '1',
        pname: 'Product 1',
        desc: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
        qtn: 60,
        category: 'catA',
        price: 599,
    },
    {
        key: '2',
        pname: 'Product 2',
        desc: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
        qtn: 66,
        category: 'catB',
        price: 3999,
    },
    {
        key: '3',
        pname: 'Product 3',
        desc: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
        qtn: 34,
        category: 'catA',
        price: 999,

    },
    {
        key: '4',
        pname: 'Product 4',
        desc: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
        qtn: 99,
        category: 'catB',
        price: 2999,

    },
    {
        key: '5',
        pname: 'Product 5',
        desc: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
        qtn: 34,
        category: 'catA',
        price: 999,

    },
    {
        key: '6',
        pname: 'Product 6',
        desc: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
        qtn: 99,
        category: 'catB',
        price: 2999,

    },
];

const Products = ({ setIsUser,
    setIsAdmin,
    setadminloggendin,
    setEnableAddtoCart,
    setIsHome }) => {
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisibleDelete, setisModalVisibleDelete] = useState(false)
    const [modalText, setmodalText] = useState('')
    const [deleteid, setDeleteId] = useState(null)
    const [productlist, setProductList] = useState([])
    const [isEdit, setisEdit] = useState(false)
    const [selectEditData, setSelectEditData] = useState([])
    const [isLoadingdata, setIsloadingData] = useState(false)

    const [form] = Form.useForm()
    useEffect(() => {
        setProductList(data)
    }, [])

    const showModal = () => {
        setmodalText('Add Product')
        setIsModalVisible(true);

    };

    const enterLogout = () => {
        //console.log(setisAdmin)
        localStorage.setItem('loggedin', false);
        localStorage.setItem('adminlogin', false);
        localStorage.setItem('userlogin', false);
        setIsUser(false)
        setIsAdmin(false)
        setadminloggendin(false)
        setEnableAddtoCart(false)
        setIsHome(true)
    }

    const editModal = (id) => {
        setmodalText('Edit Product')
        setIsModalVisible(true);
        let selectEdit = productlist.filter((item) => item.key == id)
        console.log(selectEdit)
        form.setFieldsValue({
            user: {
                name: selectEdit[0].pname,
                price: selectEdit[0].price,
                qtn: selectEdit[0].qtn,
                desc: selectEdit[0].desc,
                key: selectEdit[0].key
            }
        })
        setSelectEditData(selectEdit)
        setisEdit(true)
    }
    const showModalDelete = (id) => {
        setDeleteId(id)
        setmodalText('')
        setisModalVisibleDelete(true);
    };
    const handleOk = () => {
        setIsModalVisible(false);
        setisModalVisibleDelete(false)
    };
    const handleCancel = () => {
        setIsModalVisible(false);
        setisModalVisibleDelete(false)
    };

    // const enterLogout = () => {

    // }

    const onFinish = async (values) => {
        if (!isEdit) {
            console.log(values)
            let prd = {
                key: Math.floor(Math.random() * 1000),
                pname: values.user.name,
                desc: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
                qtn: values.user.qtn,
                price: values.user.price,
                category: values.user.category
            }
            setIsModalVisible(false);
            console.log(data)
            setProductList(prev => { return [...prev, { ...prd }] })
        } else {
            setIsloadingData(true)
            const formdata = form.getFieldsValue(true)

            const copydata = [...productlist]
            let index = productlist.findIndex((item) => item.key == formdata.user.key)
            copydata[index].pname = formdata.user.name
            copydata[index].qtn = formdata.user.qtn
            copydata[index].price = formdata.user.price
            copydata[index].desc = formdata.user.desc
            copydata[index].category = formdata.user.category


            console.log(copydata)
            await setProductList(copydata)
            setIsModalVisible(false);
            setIsloadingData(false)

        }
    };


    const columns = [
        {
            title: 'Product pname',
            dataIndex: 'pname',
        },
        {
            title: 'Product Category',
            dataIndex: 'category',
        },
        {
            title: 'Product Desc',
            dataIndex: 'desc',
            sorter: {
                compare: (a, b) => a.desc - b.desc,
                multiple: 3,
            },
        },
        {
            title: 'Price (Rs)',
            dataIndex: 'price',
            sorter: {
                compare: (a, b) => a.desc - b.desc,
                multiple: 3,
            },
        },
        {
            title: 'Product Qtn',
            dataIndex: 'qtn',
            sorter: {
                compare: (a, b) => a.qtn - b.qtn,
                multiple: 2,
            },
        },
        {
            title: 'Action',
            dataIndex: 'key',
            key: 'x',
            render: (key) => <><a href="#" onClick={e => editModal(key)}><EditOutlined /></a> <a href="#" onClick={e => showModalDelete(key)}><DeleteOutlined /></a></>,
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    const deleteData = () => {
        let prddata = productlist.filter((item) => item.key != deleteid)
        setProductList(prddata)
        setisModalVisibleDelete(false);
        setDeleteId(null)
    }

    const EditData = () => {


    }


    return (
        <>
            <Divider orientation="left">Product List</Divider>
            <Row gutter={16}>
                <Col className="gutter-row" span={24}>
                    <div style={{ float: 'right' }}>
                        <Button type="primary" style={{ marginRight: '10px', }} onClick={showModal}>Add User</Button>
                        <Button
                            type="primary"
                            icon={<PoweroffOutlined />}
                            onClick={() => enterLogout(1)}
                            style={{ float: 'right' }}
                        >
                            Logout
                        </Button>
                    </div>
                    {!isLoadingdata ? (
                        <Table columns={columns} dataSource={productlist} onChange={onChange} />
                    ) : 'Loading Data..'}
                </Col>
            </Row>

            <Modal title={modalText} visible={isModalVisible} onCancel={handleCancel} footer={null}  >
                <Form {...layout} name="nest-messages" onFinish={onFinish} form={form}>
                    <Form.Item name={['user', 'name']} label="Product Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name={['user', 'qtn']} label="Qtn" rules={[{ type: 'number', min: 0, max: 99 }]}>
                        <InputNumber />
                    </Form.Item>

                    <Form.Item name={['user', 'desc']} label="Description">
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item
                        name={['user', 'category']}
                        label="Category"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            placeholder="Select category"
                            // onChange={this.onGenderChange}
                            allowClear
                        >
                            <Option value="catA">catA</Option>
                            <Option value="catB">catB</Option>

                        </Select>
                    </Form.Item>

                    <Form.Item name={['user', 'price']} label="Price" rules={[{ type: 'number', min: 0 }]}>
                        <InputNumber />
                    </Form.Item>

                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={6}>
                                <Button key="back" onClick={handleCancel}>
                                    Cancel
                                </Button>
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Col>
                        </Row>

                    </Form.Item>
                </Form>
            </Modal>

            <Modal title="Are You sure want to Delete this Product" visible={isModalVisibleDelete} onCancel={handleCancel} footer={[
                <Button key="back" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={deleteData}>
                    Yes
                </Button>,

            ]}>

            </Modal>
        </>

    )

}

export default Products