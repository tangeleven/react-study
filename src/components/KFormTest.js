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

        handleChange = e =>{
            console.log(e.target);
            let {name, value} = e.target;
            this.setState({[name]: value}, () => {
                console.log(this.state)
                this.validateField(name)
            })
        }

        validateField = field => {
            const rules = this.options[field].rules;
            const ret = !rules.some(rule => {
                if (rule.required) {
                    if (!this.state[field]) {
                        this.setState({
                            [field+"Message"]: rule.message
                        })
                        return true
                    }
                }
            })

            if (ret) this.setState({[field+"Message"]: ""});

            return ret
        }

        validateFields = (cb) => {
            
            const ret = Object.keys(this.options).every(field => this.validateField(field))
            console.log('validateFields!! = ', ret)
            cb(ret,this.state)
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
                    {this.state[field+"Message"] && (
                        <p style={{color: 'red'}}>{this.state[field+"Message"]}</p>
                    )}
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
        this.props.validateFields((isValid, data) => {
            if (isValid) {
                console.log('提交登录', data)
            } else {
                alert('校验失败')
            }
        })
    }
    render(){
        const {getFieldDec} = this.props;
        return (
            <div>
                {getFieldDec("username", {
                    rules: [{required: true, message: "请输入用户名"}]
                })(<Input type="text" />)}

                {getFieldDec("password", {
                    rules: [{required: true, message: "请输入密码"}]
                })(<Input type="password" />)}
                
                <Button onClick={this.onLogin}>登录</Button>
            </div>
        )
    }
    
}
export default KFormTest