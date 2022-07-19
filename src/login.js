import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import Products from './admin/products';
import ProductUser from './user/uproducts';
import { Col, Row } from 'antd';


const userPass = [
    { username: 'user@gmail.com', password: 'user@123' }
];

const adminPass = [
    { username: 'admin@gmail.com', password: 'admin@123' }
]

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },

};

const LoginPage = ({ setIsUser,
    setIsAdmin,
    setadminloggendin,
    setEnableAddtoCart,
    setIsHome }) => {


    const [loggedin, setLoggedin] = useState(false)
    const [isuserD, setisuserD] = useState(false)
    const [isadminD, setisadminD] = useState(false)



    useEffect(() => {

    }, [])



    const onFinish = (values) => {
        if (values.username == 'user@gmail.com' && values.password == 'user@123') {
            localStorage.setItem('loggedin', true);
            localStorage.setItem('adminlogin', false);
            localStorage.setItem('userlogin', true);
            setIsUser(true)
            setIsAdmin(false)
            setadminloggendin(false)
            setEnableAddtoCart(true)
            setIsHome(false)
            console.log('Success user:', values);
            setisadminD(false)
            setisuserD(true)
        } else if (values.username == 'admin@gmail.com' && values.password == 'admin@123') {
            localStorage.setItem('loggedin', true);
            localStorage.setItem('adminlogin', true);
            localStorage.setItem('userlogin', false);
            setIsUser(false)
            setIsAdmin(true)
            setadminloggendin(true)
            setEnableAddtoCart(false)
            setIsHome(false)
            console.log('Success admin:', values);
            setisuserD(false)
            setisadminD(true)
        } else {
            console.log('wring user:');
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            {/* <ProductUser /> */}
            {!isadminD && !isuserD && !loggedin ? (<>
                <Row>
                    <Col span={7}></Col>
                    <Col span={8}>
                        <center><h3>Login Here</h3></center>
                        <Form
                            name="basic"
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                            validateMessages={validateMessages}
                        >
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                name="remember"
                                valuePropName="checked"
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                        <Col span={7}></Col>

                    </Col>
                </Row>
            </>) :
                (<></>)}

            {/* {isadminD ? (<>
                <Products />
            </>) : (<></>)} */}


            {/* {isuserD ? (<>

                <ProductUser /></>) : (<></>)} */}

        </>

    );
};

export default LoginPage;