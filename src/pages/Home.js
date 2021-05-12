import React from "react";
import {Layout} from "antd";
import { Menu } from 'antd';
import { Calendar } from 'antd';
import {
    DesktopOutlined,
    TeamOutlined,
    SettingOutlined,
    BellOutlined
  } from '@ant-design/icons';
import "../css/Home.css";
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const {Header, Content,Sider, Footer} = Layout;
const {Item} = Menu;
// const { SubMenu } = Menu;
  
class Home extends React.Component {

    state = {
      collapsed: true,
      current: 'mail',
    };
  
    onCollapse = collapsed => {
      console.log(collapsed);
      this.setState({ collapsed });
    };

    handleClick = e => {
        console.log('click ', e);
        this.setState({ current: e.key });
        const key = e.key;
        if(key === "setting"){
            this.props.history.push('/setting')
        }else if(key === "friends"){
            this.props.history.push('/friends')
        }else if(key === "alarms"){
            this.props.history.push('/alarms')
        }else{
            this.props.history.push('/')
        };
      };   
      
    onPanelChange = function(value, mode) {
    console.log(value, mode);
    };

    render(){
        const {collapsed} = this.state;
        const { current } = this.state;
        return(
            <Layout className="layout">
                <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                    <Menu theme="dark" defaultSelectedKeys={['home']} mode='inline' onClick={this.handleClick} selectedKeys={[current]}>
                        <Item key = "home" icon={<DesktopOutlined />}>Home</Item>
                        <Item key = "setting" icon={<SettingOutlined />}>Setting</Item>
                        <Item key = "friends" icon={<TeamOutlined />}>Friends</Item>
                        <Item key = "alarms" icon={<BellOutlined />}>Alarms</Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header className="site-layout-sub-header-background" style={{ padding: 0 }}>
                        AppointMeow
                    </Header>
                    <Content style={{padding:'0 50px'}}>
                    <Layout>
                        <Content>
                            <div className="site-calendar-demo-card">
                                <Calendar onPanelChange={this.onPanelChange} fullscreen={false}/><br/>
                            </div>
                        </Content>
                    </Layout>
                    </Content>
                    <Footer style={{textAlign: "center"}}>AppointMeow 2021</Footer>  
                </Layout>
            </Layout>
                
        )     
    }
}



export default Home;