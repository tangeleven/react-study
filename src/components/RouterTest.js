import React, { Component } from 'react'
import { BrowserRouter, Link, Route, Switch, Redirect } from 'react-router-dom'

function ProductList(props) {
    return (
        <div>
            <h3>ProductList</h3>
            <Link to="/detail/web">web全栈</Link>
        </div>
    )
}
function Detail({ match, history, location }) {
    console.log(match, history, location)
    return (
        <div>
            <h3>Detail</h3>
            {match.params.name}
        </div>
    )
}
function ProductMgt(props) {
    return (
        <div>
            <h3>ProductMgt</h3>
        
            <Link to='/management/add'>新增</Link>
            <Link to='/management/search'>搜索</Link>
            <Route path='/management/add' component={()=><div>add</div>}></Route>
            <Route path='/management/search' component={()=><div>search</div>}></Route>
            <Redirect to="/management/add"></Redirect>
                
        </div>
    )
}

// 路由守卫：通过高阶组件包装Route得到一个PrivateRoute
// 为其扩展一个用户状态检查功能

function PrivateRoute({component: Component, isLogin, ...rest}) {
    return (
        <Route {...rest} render={
            
            props => {
                console.log(props)
                return isLogin ? (
                    <Component></Component>
                ) : (
                    <Redirect to={{pathname: '/login', state: {redirect: props.location.pathname}}}></Redirect>
                )
            }
        }></Route>
    )
}

export default class RouterTest extends Component {
    render() {
        return (
            <BrowserRouter>
                <nav>
                    <Link to='/'>商品列表</Link>
                    <Link to='/management'>商品管理</Link>
                </nav>
                {/*  */}
                <Switch>
                    <Route path='/' exact component={ProductList}></Route>
                    <Route path='/detail/:name' exact component={Detail}></Route>
                    <PrivateRoute path='/management' component={ProductMgt} isLogin={true}></PrivateRoute>
                    <Route  path='/login' component={() => <h1>登录</h1>}></Route>
                    <Route component={()=><h3>404</h3>}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}


