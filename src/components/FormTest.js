import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'

function hasErrors(fieldsError) {

    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontalLoginForm extends Component {
    componentDidMount() {
        console.log(this.props)
        this.props.form.validateFields()
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            console.log(err, values)
            if (!err) {
                console.log('Received values of form: ', values);
            }
        })

    }
    render() {
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
        const usernameError = isFieldTouched('username') && getFieldError('username');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
                    {getFieldDecorator('username', {
                        rules: [{required: true, message: 'Please input your username!'}]
                    })(<Input type="text"  placeholder="Username"/>)}
                </Form.Item>

                <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Please input your Password!'}]
                    })(<Input type="password" placeholder="Password" />)}
                </Form.Item>
 
                <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>提交</Button>
            </Form>
        )
    }
}


export default Form.create()(HorizontalLoginForm)










