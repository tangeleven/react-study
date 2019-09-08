
import React, { useState, useEffect, useReducer, useContext } from 'react'

// 创建上下文
const Context = React.createContext();

// 仅展示水果列表
function FruitList({ fruits, onSetFruit }) {
    return (
        <ul>
            {fruits.map(f => (<li key={f} onClick={() => onSetFruit(f)}>          {f}        </li>))}
        </ul>
    )
}

function FruitAdd(props){
    const [pname, setPname] = useState("");
    const {dispatch} = useContext(Context)
    
    const onAddFruit = e => {
        if (e.key === 'Enter'){
            // props.onAddFruit(pname);
            // 直接派发动作修改状态
            dispatch({type: "add", payload: pname})
            setPname("")
        }
    }
    return (
        <div>
            <input 
                type="text"
                value={pname}
                onChange={e => setPname(e.target.value)}
                onKeyDown={onAddFruit}
            />
        </div>
    )
}

// 添加fruit状态维护fruitReducer
function fruitReducer(state, action){
    switch(action.type){
        case "init":
            return action.payload;
        case "add":
            return [...state, action.payload]
        default:
            return state;
    }
}

export default function HooksTest() {
    const [ fruit, setFruit ] = useState("");
    // const [fruits, setFruits] = useState([]);

    // 参数1是reducer
    // 参数2是初始值
    const [fruits, dispatch] = useReducer(fruitReducer, []);


    // 异步获取水果列表
    useEffect(()=>{
        console.log('useEffect')
        setTimeout(()=>{
            // setFruits(['香蕉','西瓜'])
            dispatch({type: 'init', payload: ['香蕉','西瓜']})
        },1000)
    }, [])

    useEffect(()=>{
        document.title = fruit;
    },[fruit])

    useEffect(()=> {
        const timer = setInterval(()=>{
            console.log('msg')
        },1000)

        return function() {
            clearInterval(timer)
        }
    },[])

    return (
        <Context.Provider value={{fruits, dispatch}}>
            <div>
                {/* <FruitAdd 
                    // onAddFruit={pname => setFruits([...fruits,pname])} 
                    onAddFruit={pname => dispatch({type: 'add', payload: pname})} 
                /> */}
                <FruitAdd />
                <p>{fruit === "" ? "清选择喜爱的水果：" : `您的选择是：${fruit}`}</p>
                {/* 列表 */}
                <FruitList fruits={fruits} onSetFruit={setFruit}></FruitList>
            </div>
        </Context.Provider>
    )
}



