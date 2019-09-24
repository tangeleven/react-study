
import {call, put, takeEvery} from 'redux-saga/effects'

const UserService = {
    login(uname) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (uname === 'Jerry') {
                    resolve({id: 1, name: 'Jerry', age: 18})
                } else {
                    reject('用户名或密码错误')
                }
            }, 1000)
        })
    }
}

// worker saga
function* login(action) {
    debugger
    try {
        
        yield put({type: 'requestLogin'});
        const result = yield call(UserService.login, action.uname);
        yield put({type: "loginSuccess", result});

    } catch (message) {
        yield put({type: "loginFailure", payload: message})
    }
}


function* mySaga() {
    debugger
    yield takeEvery("login", login);
    debugger
}


export default mySaga;





