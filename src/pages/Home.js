import React from "react";
import { Button, Layout } from "antd";
import { Menu } from 'antd';
import { Calendar } from 'antd';
import {
    DesktopOutlined,
    TeamOutlined,
    SettingOutlined,
    BellOutlined
} from '@ant-design/icons';
// import Calendar2 from '../utility/Calendar2.js';
import "../css/Home.css";
import moment from 'moment';
// import 'moment/locale/zh-cn';
// import { Card, Col, Row } from 'antd';
import { Timeline } from 'antd';
// import { Typography} from 'antd';
// const { Paragraph, Text } = Typography;
import { Tabs } from 'antd';
import AddEventModal from '../components/AddEventModal'
// moment.locale('zh-cn');


const { Header, Content, Sider, Footer } = Layout;
const { Item } = Menu;
// const { SubMenu } = Menu;
const { TabPane } = Tabs;
const date = moment().format('YYYY-MM-DD');
const weekday = moment().weekday();

class Home extends React.Component {
    constructor(props) {
        super(props)
        const tempoID = this.getQuery(props.location.search)
        this.state = {
            collapsed: true,
            current: 'mail',
            isShow: false,
            tempoID: tempoID.lk,
            data:[]
        }
    }

    // onChangeDate = value => {
    //     this.setState({ currentDate: value });
    // }
    // getChangeDate = value => {
    //     if (value) {
    //         let year = value.getFullYear();
    //         let month = value.getMonth() + 1;
    //         let day = value.getDate();
    //         return year + '年' + month + '月' + day + '日'
    //     }
    // }

    // dateCellRender = value => {
    //     return <div>this.getChangeDate(value)</div>
    // }

    getQuery = str => {
        return str
            .replace('?', '')
            .split('&')
            .reduce((r, i) => {
                const [key, value] = i.split('=');
                return { ...r, [key]: value };
            }, {});
    }

    componentWillMount = () => {
        this.getData()
    }

    getData = () => {
        const tempoID = this.state.tempoID
        fetch('home/events/'+tempoID,{
            method: 'POST',
            body: JSON.stringify({
                loginKey: tempoID,
                date: date,
                weekday: weekday,
            }),
            headers:{
                'Content-type':'application/json; charset=UTF-8'
            }
        }).then(response => response.json()).then( message =>{
            const data = message['data']
            this.setState({
                data: data
            })
        })
    }


    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    handleClick = e => {
        console.log('click ', e);
        const lk = this.state.tempoID;
        this.setState({ current: e.key });
        const key = e.key;
        if (key === "setting") {
            this.props.history.push('/setting?lk='+lk)
        } else if (key === "friends") {
            this.props.history.push('/friends?lk='+lk)
        } else if (key === "alarms") {
            this.props.history.push('/alarms?lk='+lk)
        } else {
            this.props.history.push('/home?lk='+lk)
        };
    };

    onPanelChange = function (value, mode) {
        console.log(value, mode);
    };

    showModal = () => {
        this.setState({
            isShow: true
        })
    }

    hideModal = () => {
        this.setState({
            isShow: false
        })
    }

    componentWillUnmount=()=>{
        const tempoID=this.state.tempoID
        fetch('logout/'+tempoID,{
            method: 'POST',
            body: JSON.stringify({
                logOut: true
            }),
            headers:{
                'Content-type':'application/json; charset=UTF-8'
            }
        })
    }

    render() {
        const { collapsed } = this.state;
        const { current } = this.state;
        const { isShow } = this.state;
        // const { currentDate } = this.state;
        return (
            <Layout className="layout">
                <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                    <Menu theme="dark" defaultSelectedKeys={['home']} mode='inline' onClick={this.handleClick} selectedKeys={[current]}>
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
                        <div className='content-warp'>
                            <Calendar onPanelChange={this.onPanelChange} fullscreen={false} className="site-calendar-demo-card" />
                            <Tabs defaultActiveKey="1" centered className={collapsed === true ? "display-detail-normal" : 'display-detail-small'} type='card'>
                                <TabPane tab="Sun" key="sun">
                                    <Timeline mode='left'>
                                        <Timeline.Item label="2015-09-03">Create a services</Timeline.Item>
                                        <Timeline.Item label="2015-09-01 09:12:11">Solve initial network problems</Timeline.Item>
                                        <Timeline.Item>Technical testing</Timeline.Item>
                                        <Timeline.Item label="2015-09-01 09:12:11">Network problems being solved</Timeline.Item>
                                        <Timeline.Item>
                                            <Button onClick={this.showModal}>+</Button>
                                        </Timeline.Item>
                                    </Timeline>

                                </TabPane>
                                <TabPane tab="Mon" key="mon">
                                    Content of Tab Pane 2
                                </TabPane>
                                <TabPane tab="Tue" key="tue">
                                    Content of Tab Pane 3
                                </TabPane>
                                <TabPane tab="Wed" key="wed">
                                    Content of Tab Pane 4
                                </TabPane>
                                <TabPane tab="Thu" key="thu">
                                    Content of Tab Pane 5
                                </TabPane>
                                <TabPane tab="Fri" key="fri">
                                    Content of Tab Pane 6
                                </TabPane>
                                <TabPane tab="Sat" key="sat">
                                    Content of Tab Pane 7
                                </TabPane>
                            </Tabs>
                            <AddEventModal visible={isShow} onCancel={this.hideModal}></AddEventModal>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: "center" }}>AppointMeow 2021</Footer>
                </Layout>
            </Layout>

        )
    }
}



export default Home;






