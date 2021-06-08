import React from 'react';
import { Button, Modal } from 'antd';
import { TimePicker,Input} from 'antd';
// import {Image, Menu, Input, Checkbox, Button} from 'antd';
// import styles from './index.module.css';
// import {UserOutlined} from '@ant-design/icons';
// import {Tabs} from 'antd';

const { TextArea } = Input;

export default class AddEventModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { visible, onCancel } = this.props;
        return (
            <Modal
                style={{ width: 300, minHeight: 800 }}
                visible={visible}
                onCancel={onCancel}
                footer={null}
                destroyOnClose={true}
            >
                <div>
                    {/* <div>Add New Event</div> */}
                    <Input placeholder='event name' defaultValue='New Event' bordered={false}/>
                    <TimePicker.RangePicker />
                    <TextArea placeholder='detail' rows={4}/>
                    <Button onClick={onCancel}>save</Button>
                </div>
            </Modal>
        )
    }
}