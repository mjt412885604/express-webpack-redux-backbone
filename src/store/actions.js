import * as types from './mutation-types';

export function login(data) {
    return {
        type: types.USER_LOGIN,
        data
    }
}

export function loginOut() {
    return {
        type: types.USER_LOGIN_OUT
    }
}