import React from "react";
import { Button, Layout, Input } from "antd";
import { Menu, List } from 'antd';
import { DatePicker, TimePicker, Space } from 'antd';
// import moment from 'moment';
import {
    DesktopOutlined,
    TeamOutlined,
    SettingOutlined,
    BellOutlined
} from '@ant-design/icons';
import "../css/Alarm.css"

const { Header, Content, Sider, Footer } = Layout;
const { Item } = Menu;
// const { SubMenu } = Menu;
const dateFormat = "YYYY/MM/DD"
const { TextArea } = Input
// const Disabled = false

class Alarms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
            data: [{
                disabled: true,
                name: 'name',
                detail: 'detail',
                lable: 0
            },
            {
                disabled: true,
                name:'name2',
                detail:'detail2',
                lable: 1
            }],
            // disabled: false,
        }
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed })
    };

    handleClick = e => {
        console.log('click ', e);
        this.setState({ current: e.key });
        const key = e.key;
        if (key === "setting") {
            this.props.history.push('/setting')
        } else if (key === "friends") {
            this.props.history.push('/friends')
        } else if (key === "alarms") {
            this.props.history.push('/alarms')
        } else {
            this.props.history.push('/')
        };
    };

    toggleDisable = e => {
        // const bottomKey = this.data.key
        // const place = document.getElementById({bottomKey})
        // const disabled = this.state.data.disabled;
        // this.setState({disabled: !disabled });
        // this.setState({ current: e.itemID });
        // const {itemID} = e.itemID;
        //const disabled = data.map((key)=>key===1);
        console.log(e)
        const data = [...this.state.data];
        this.setState({
            data: data.map((item,key)=>key === 0 ?{...item,disabled: !data.disabled}:item)
        });
    };

    render() {
        const { collapsed } = this.state;
        const { current } = this.state;
        const { data } = this.state;
        // const { key }= this.data.key
        // const {disabled} = this.state

        return (
            <Layout className="layout">
                <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                    <Menu
                        theme="dark"
                        defaultSelectedKeys={['home']}
                        mode='inline'
                        onClick={this.handleClick}
                        selectedKeys={[current]}>
                        <Item key="home" icon={<DesktopOutlined />}>Home</Item>
                        <Item key="setting" icon={<SettingOutlined />}>Setting</Item>
                        <Item key="friends" icon={<TeamOutlined />}>Friends</Item>
                        <Item key="alarms" icon={<BellOutlined />}>Alarms</Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header className="site-layout-sub-header-background" style={{ padding: 0 }}>
                        AppointMeow
                    </Header>
                    <Content style={{ padding: '0 50px' }}>
                        <Layout>
                            <Content>
                                <div className="content">
                                    <div className="title">Alarms</div>
                                    <List
                                        dataSource={data}
                                        renderItem={(item) => (<List.Item>
                                            <div className="item-wrap">
                                                <div className="alarm-wrap">
                                                    <div className="alarm-top">
                                                        <div className='alarm-name'>{item.name}</div>
                                                        <Button
                                                            type="primary"
                                                            id = {item.lable}
                                                            onClick={this.toggleDisable}
                                                        >
                                                            {!item.disabled ? 'Non-edit' : 'Edit'}
                                                        </Button>
                                                    </div>
                                                    <Space className='alarm-time'>
                                                        <div className='alarm-date'>
                                                            <div className='date-title'>Date:</div>
                                                            <DatePicker.RangePicker
                                                                format={dateFormat}
                                                                className='alarm-box'
                                                                disabled={item.disabled}
                                                                // id = {item.lable}
                                                            />
                                                        </div>
                                                        <div className='alarm-date'>
                                                            <div className='date-title'>Time:</div>
                                                            <TimePicker.RangePicker
                                                                className='alarm-box'
                                                                disabled={item.disabled}
                                                                //id = {item.lable}
                                                            /> 
                                                        </div>
                                                    </Space>
                                                    <TextArea
                                                        className="alarm-detail"
                                                        rows={4}
                                                        placeholder="Detail or Remark"
                                                        disabled={item.disabled}
                                                        // id = {item.lable}
                                                        defaultValue={item.detail}
                                                    />
                                                </div>
                                            </div>
                                        </List.Item>)} />
                                </div>
                            </Content>
                        </Layout>
                    </Content>
                    <Footer style={{ textAlign: "center" }}>AppointMeow 2021</Footer>
                </Layout>
            </Layout>

        )
    }
}



export default Alarms;