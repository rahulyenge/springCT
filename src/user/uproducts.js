import React, { useEffect, useState } from "react";

import { ShoppingCartOutlined, PoweroffOutlined } from '@ant-design/icons';
import LoginPage from "../login";
import { Card } from 'antd';
import { Col, Divider, Row, Button, InputNumber, Drawer, Select } from 'antd';
import { Avatar, Badge } from 'antd';
import Products from '../admin/products'


const { Option } = Select;



let myCart = []


const style = {
    background: '#0092ff',
    padding: '8px 0',
    height: '200px',
    color: '#fff',
    marginTop: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',

};

const ProductUser = () => {
    const [visible, setVisible] = useState(false);
    const [qtn, setqtn] = useState(1)
    const [isUser, setIsUser] = useState(false)
    const [isAmin, setIsAdmin] = useState(false)
    const [isHome, setIsHome] = useState(true)
    const [adminloggendin, setadminloggendin] = useState(false)
    const [enableAddtoCart, setEnableAddtoCart] = useState(false)
    const [loadings, setLoadings] = useState([]);
    const [cart, setCart] = useState(0);
    const [getCat, setgetCat] = useState('')
    const [productlist, setProductList] = useState([])


    useEffect(() => {
        if (localStorage.getItem('adminlogin') == null || localStorage.getItem('adminlogin') == '' && localStorage.getItem('userlogin') == null || localStorage.getItem('userlogin') == '') {
            setIsHome(true)
        } else if (localStorage.getItem('adminlogin') == 'true' && localStorage.getItem('loggedin') == 'true') {
            setIsHome(false)
            setIsUser(false)
            setadminloggendin(true)
        } else if (localStorage.getItem('userlogin') == 'true' && localStorage.getItem('loggedin') == 'true') {
            setIsHome(false)
            setadminloggendin(false)
            setIsUser(true)
            setEnableAddtoCart(true)
        }
        setProductList(data)

    }, [])
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

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };
    const onChange = (value) => {
        console.log('changed', value);
        setqtn(value)
    };

    const userhandler = () => {
        setIsAdmin(false)
        setIsUser(true)
        setIsHome(false)

    }
    const adminhandler = () => {

        setIsUser(false)
        setIsAdmin(true)
        setIsHome(false)

    }

    const enterLogout = (index) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });
        setIsUser(false)
        setIsAdmin(false)
        setadminloggendin(false)
        setEnableAddtoCart(false)
        setIsHome(true)
        localStorage.setItem('loggedin', false);
        localStorage.setItem('adminlogin', false);
        localStorage.setItem('userlogin', false);

        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                return newLoadings;
            });
        }, 0);
    };

    const onChangeQty = (value, id) => {
        console.log('changed', value, id);
    };


    const addtoCart = (id, qtn) => {

        if (localStorage.getItem('userlogin') == 'true' && localStorage.getItem('loggedin') == 'true') {
            let currpr = data.filter((item) => item.key == id)
            let qutn = [{ Pqtn: qtn }]
            currpr.concat(qutn)
            console.log(id, currpr)
            myCart.push({ pname: currpr[0].pname, price: currpr[0].price, pqtn: qtn, category: currpr[0].category })
            setCart(myCart.length)
            console.log(myCart)
        } else {
            setIsUser(false)
            setIsAdmin(true)
            setIsHome(false)
        }
    }
    const onGenderChange = (value) => {
        setgetCat(value)
    }
    const filterProduct = () => {
        let getfilteData = data.filter((item) => item.category == getCat)

        setProductList(getfilteData)
    }

    const reset = () => {
        setProductList(data)
    }
    return (
        <>
            {isHome ? (
                <Row gutter={16} mt={12} justify="space-evenly">
                    <Col span={6}>
                        <div style={style} onClick={userhandler}><a href="#" style={{ color: '#fff', fontSize: '20px', fontWeight: '500' }}> USER</a></div>
                    </Col>
                    <Col span={6}>
                        <div style={style} onClick={adminhandler}><a href="#" style={{ color: '#fff', fontSize: '20px', fontWeight: '500' }}> ADMIN </a></div>
                    </Col>
                </Row>
            ) : (<></>)}


            {isUser ? (
                <>
                    <Row >
                        <Col className="gutter-row" span={24}>
                            <div style={{ background: '#ccc' }}>
                                <div style={{ float: 'right', position: 'relative', right: '20px' }}>
                                    {localStorage.getItem('userlogin') == 'true' ? (<Button
                                        type="primary"
                                        icon={<PoweroffOutlined />}
                                        loading={loadings[1]}
                                        onClick={() => enterLogout(1)}
                                        style={{ marginRight: '10px' }}
                                    >
                                        Logout
                                    </Button>) : (<></>)}

                                    <a href="#" onClick={showDrawer}>
                                        <Badge count={cart} offset={[10, 10]}>
                                            <Avatar shape="square" size="small" icon={<ShoppingCartOutlined />} />
                                        </Badge>
                                    </a>
                                </div>

                            </div>
                        </Col>
                    </Row>

                    <Divider orientation="left">Product List</Divider>
                    <div style={{ float: 'right' }}>
                        <Select
                            placeholder="Select category"
                            onChange={onGenderChange}
                            allowClear
                            style={{ marginRight: '10px' }}
                        >
                            <Option value="catA">catA</Option>
                            <Option value="catB">catB</Option>

                        </Select>
                        <Button style={{ marginRight: '10px' }} type="primary" onClick={filterProduct}>Submit</Button>
                        <Button style={{ float: 'right' }} type="primary" onClick={reset}>Reset</Button>
                    </div>
                    <div style={{ marginTop: '70px' }}>
                        <Row gutter={16}>
                            {productlist.map((item) => (
                                <>

                                    <Col className="gutter-row" span={6}>
                                        <Card title="Product" bordered={false} style={{ width: 300 }}>
                                            <p>Name : {item.pname}</p>
                                            <p>Category : {item.category}</p>
                                            <p>Price : Rs. {item.price}</p>
                                            <Button onClick={e => { addtoCart(item.key, qtn) }}>Add To Cart</Button> <InputNumber min={1} max={10} defaultValue={1} onChange={onChange} />
                                        </Card>
                                    </Col>

                                </>
                            ))}
                        </Row>
                    </div>
                    <Drawer title="My Cart" placement="right" onClose={onClose} visible={visible}>
                        <>
                            {myCart && myCart.map((item, Index) => (
                                <Col className="gutter-row" span={6}>
                                    <Card title="Product" bordered={false} style={{ width: 300 }}>
                                        <p>Name :  {item.pname}</p>
                                        <p>Category : {item.category}</p>
                                        <p>Price : Rs. {item.price} </p>
                                        <p>Qtn. : {item.pqtn}</p>
                                    </Card>
                                </Col>
                            ))}
                        </>
                    </Drawer>
                </>
            ) : (<></>)
            }

            {
                isAmin ? (
                    <LoginPage setIsUser={setIsUser}
                        setIsAdmin={setIsAdmin}
                        setadminloggendin={setadminloggendin}
                        setEnableAddtoCart={setEnableAddtoCart}
                        setIsHome={setIsHome} />
                ) : (<></>)
            }

            {
                adminloggendin ? (
                    <Products setIsUser={setIsUser}
                        setIsAdmin={setIsAdmin}
                        setadminloggendin={setadminloggendin}
                        setEnableAddtoCart={setEnableAddtoCart}
                        setIsHome={setIsHome} />) : (<></>)
            }
        </>

    )

}

export default ProductUser