import React, { Component } from 'react'
import { BrowserRouter, Link, Route, Switch, Redirect } from 'react-router-dom'

import {connect} from 'react-redux'
import {login} from '../store/user'

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

const PrivateRoute = connect(state => ({isLogin: state.user.isLogin}))(function({component: Component, isLogin, ...rest}) {
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
})

const Login = connect(
    state => ({
        isLogin: state.user.isLogin,
        loading: state.user.loading,
        error: state.user.error
    }),
    {login}
)(({location, isLogin, login, loading, error}) => {
    const redirect = location.state.redirect || '/';

    if (isLogin) return <Redirect to={redirect} />;

    return (
        <div>
            <p>用户登录</p>
            <hr />
            {error && <p>{error}</p>}
            <button onClick={() => {
                debugger
                login('Jerry')
            }} disabled={loading}>
                {loading ? "登录中..." : "登录"}
            </button>
        </div>
    )
})

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
                    <PrivateRoute path='/management' component={ProductMgt}></PrivateRoute>
                    <Route  path='/login' component={Login}></Route>
                    <Route component={()=><h3>404</h3>}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}


