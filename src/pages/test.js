import React from 'react';
import { Input, Button } from 'antd';
import { Timeline } from 'antd';

export default class Counter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '0',
            password: '0',
            logState: ''
        }
    }
    // change = () =>{
    //     this.setState({...this.state,sum: Number(this.myRef.current.value) + Number(this.myRef.current.value)})
    // }
    // componentDidMount(){
    //     console.log(this.myRef.current.value);
    // }

    navigateToHome = () => {
        // const usernameInp = document.getElementById('username');
        // const passwordInp = document.getElementById('password');
        // const state = this.state;
        // if (state.username !== ''){
        //     if (state.password !== ''){

        //     }
        // }
        console.log(this.state)

        //     // const password = 
        //     if (passwordInp === password) {
        //         const origPath = '/home'
        //         const path = { origPath } + '?un=' + { username }
        //         this.props.history.push(path);
        //     } else {
        //             message.warning('Incorrect user name or password');            
        //     }
    };

    chanegUN = (e) => {
        this.setState = {
            username: e.target.value
        }
    };

    changePW = (e) => {
        this.setState = {
            password: e.target.value
        }
    };

    render() {
        const { username } = this.state.username;
        const { password } = this.state.password;
        return (
            // <div onChange ={this.change} >
            //     <Input type="text" ref={this.myRef} />+ 
            //     <Input  type ="text" ref={this.myRef} /> = {this.state.sum}
            // </div>
            <div>
                <Input id='username' placeholder="username" onChange={this.chanegUN}></Input>
                <Input id='Password' placeholder='password' onChange={this.changePW}></Input>
                <Button onClick={this.navigateToHome}>Login</Button>
                <div>{username}</div>
                <div>{password}</div>
                <Timeline mode='left'>
                    <Timeline.Item label="2015-09-01">Create a services</Timeline.Item>
                    <Timeline.Item label="2015-09-01 09:12:11">Solve initial network problems</Timeline.Item>
                    <Timeline.Item>Technical testing</Timeline.Item>
                    <Timeline.Item label="2015-09-01 09:12:11">Network problems being solved</Timeline.Item>
                </Timeline>
            </div>
        )
    };
}

