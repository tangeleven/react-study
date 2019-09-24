
export const user = (
    state = {isLogin: false, loading: false, error: ""},
    action
) => {
    debugger
    switch(action.type) {
        case "requestLogin":
            debugger
            return {isLogin: false, loading: true, error: ""};
        case "loginSuccess":
                debugger
            return {isLogin: true, loading: false, error: ""};
        case "loginFailure":
                debugger
            return {isLogin: false, loading: false, error: action.message};
        default:
                debugger
            return state
    }
}

export function login(uname) {
    debugger
    return {type: "loginSuccess", uname}
}










