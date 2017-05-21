import { local, localRemove } from '../utils'

const LOGIN_STATUS = 'LOGIN_STATUS';
const USER_INFO = 'USER_INFO';
const USER_PHONE = 'USER_PHONE';

function store({
	type = '',
	data
}={}) {
    var userInfo = local(USER_INFO) || {},
        isLogin = local(LOGIN_STATUS) || 0,
        phone = local(USER_PHONE) || '';
    switch (type) {
        case 'SET_LOGIN':
            local(USER_INFO, data.userInfo)
            local(LOGIN_STATUS, data.isLogin)
            local(USER_PHONE, data.phone)
            return {
                userInfo: data.userInfo,
                isLogin: data.isLogin,
                phone: data.phone
            };
        case 'SET_LOGINOUT':
            localRemove(USER_INFO);
            localRemove(LOGIN_STATUS);
            localRemove(USER_PHONE);
            return {
                userInfo: {},
                isLogin: 0,
                phone: ''
            };
        default:
            return {
                userInfo,
                isLogin,
                phone
            }
    }
}

export default store;
