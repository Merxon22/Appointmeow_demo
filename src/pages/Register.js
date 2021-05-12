import React from 'react';
import { Layout } from "antd";
import { Form, Input, Select, Button } from 'antd';

// const { Option } = Select;
const { Header, Content, Footer } = Layout;
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

class Register extends React.Component {

    onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    navigateToLogin = () => {
        this.props.history.push('/login')
    };

    render() {
        return (
            <Layout>
                <Header className="site-layout-sub-header-background" style={{ padding: 0, margin: '50px' }}>
                    AppointMeow
                </Header>
                <Content style={{ padding: '0 50px', width: '80%', alignItems: "center", margin: '20px' }}>
                    <Form
                        name="register"
                        onFinish={this.onFinish}
                        scrollToFirstError
                        {...formItemLayout}
                        style={{height:'520px'}}
                    >
                        <Form.Item
                            name="email"
                            label="E-mail"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }

                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your English name!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name='identity'
                            label="Identity"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please choose your identity!'
                                }
                            ]}
                        >
                            <Select>
                                <Select.Option value="demo">Student</Select.Option>
                                <Select.Option value="demo">Staff</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item {...tailFormItemLayout} >
                            <Button type="primary" htmlType="submit">
                                Register
                                    </Button>
                            <Button type="link" onClick={this.navigateToLogin}>
                                Back to Login
                                    </Button>
                        </Form.Item>
                    </Form>
                </Content>
                <Footer style={{ textAlign: "center"}}>AppointMeow 2021</Footer>
            </Layout>

        )
    }
};

export default Register;