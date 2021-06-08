import React from "react";
import { Layout, Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

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

class Login extends React.Component {
    onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    navigateToRegister = () => {
        this.props.history.push('/register');
    };

    // navigateToHome=()=>{
    //     origPath = '/'
    //     path = 
    //     this.props.history.push(path);
    // };

    render() {
        return (
            <Layout>
                <Header className="site-layout-sub-header-background" style={{ padding: 0, margin: '50px' }}>
                    AppointMeow
                </Header>
                <Content style={{marginLeft: '380px', marginTop:'80px', width:"70%"}}>
                    <Form
                        name="normal_login"
                        className="login-form"
                        onFinish={this.onFinish}
                        {...formItemLayout}
                        style={{height:'520px'}}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout} >
                            <Button type="primary" onClick="navigateToHome" className="login-form-button">
                                Log in
                    </Button>
                            <Button type='link' onClick={this.navigateToRegister}>Register</Button>
                        </Form.Item>
                    </Form>
                </Content>
                <Footer style={{ textAlign: "center" }}>AppointMeow 2021</Footer>
            </Layout>

        );
    };
};

export default Login;