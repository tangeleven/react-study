import React from 'react'

// Dialog定义组件外观和行为
function Dialog(props) {
    // 这里props.children代表了标签内部内容
    // children是什么？是合法js表达式
    console.log(props, props.children)
    // 备选消息
    const messages = {
        foo: { title: "foo", content: "foo~" },
        bar: { title: "bar", content: "bar~" }
    }
    // 执行函数获得要显示的内容
    const { def, footer } = props.children(messages[props.msg]);

    return (
        <div style={{ border: "1px solid blue" }}>
            {def}
            <div>{footer}</div>
        </div>
    )
}

/*

<Dialog children="foo">
和 
<Dialog>
    <h1>标题</h1>
</Dialog>
 
在Dialog组件中都可以通过 props.children 获取，但是他们是有优先级的，<Dialog> 标签包裹的jsx要高于<Dialog children="foo"> 

*/
function RadioGroup(props) {
    return (
        <div>
            {React.Children.map(props.children, radio => {
                // 要修改虚拟dom，只能克隆它
                // 参数1是克隆对象
                // 参数2是设置的属性
                return React.cloneElement(radio, { name: props.name })
            })}
        </div>
    )
}
function Radio({ children, ...rest }) {
    return (
        <label>
            <input type="radio" {...rest} />
            {children}
        </label>
    )
}

export default function Composition() {
    return (
        <div>
            <Dialog msg="foo">
                {({ title, content }) => ({
                    def: (
                        <>
                            <h1>{title}</h1>
                            <p>{content}</p>
                        </>
                    ),
                    footer: <button onClick={() => alert('1')}>确定</button>
                })}
            </Dialog>

            <RadioGroup name="mvvm">
                <Radio value="vue">vue</Radio>
                <Radio value="react">react</Radio>
                <Radio value="ng">angular</Radio>
            </RadioGroup>
        </div>
    )
}
