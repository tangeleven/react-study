import React, {Component} from 'react'
import {Input, Button} from 'antd'

// 创建高阶组件
function KFormCreate(Comp){
    return class extends Component{
        constructor(props){
            super(props)
            this.options = {}
            this.state = { }
        }
        validateFields(){
            
            console.log('validateFields!!')
        }

        getFieldDec = (field, option) => {
            this.options[field] = option;

            // 返回一个装饰器（高阶组件）
            return (InputComp) => {
                return (
                    <div>
                        {
                            React.cloneElement(InputComp, {
                                name: field,    //控件name
                                value: this.state[field] || '',
                                onChange: this.handleChange  //输入值变化监听回调
                            })
                        }
                    </div>
                )
            }
        }

        render(){
            return (
                <Comp 
                    {...this.props}
                    getFieldDec={this.getFieldDec} 
                    validateFields={this.validateFields}
                ></Comp>
            )
        }
    }
}

@KFormCreate
class KFormTest extends Component {
    onLogin = () => {
        // 校验
        this.props.validateFields()
    }
    render(){
        const {getFieldDec} = this.props;
        return (
            <div>
                {getFieldDec("username", {
                    rules: [{require: true, message: "请输入用户名"}]
                })(<Input type="text" />)}
                
                <Input type="password" />
                <Button onClick={this.onLogin}>登录</Button>
            </div>
        )
    }
    
}
export default KFormTest