import * as auth from '@/utils/auth'
import * as types from '../mutation-types';
import {
    local,
    localRemove
} from '@/utils'

const USER_INFO = 'USER_INFO'
const USER_PHONE = 'USER_PHONE'

const initState = () => ({
    userInfo: local(USER_INFO) || null,
    phone: local(USER_PHONE) || null,
    Authorization: auth.getToken() || null
})

export default function userInfo(state = initState(), action) {
    switch (action.type) {
        case types.USER_LOGIN:
            const {
                userInfo,
                phone,
                token
            } = action.data
            local(USER_INFO, userInfo)
            local(USER_PHONE, phone)
            token && auth.setToken(token) // cookies缓存token

            return initState();
        case types.USER_LOGIN_OUT:
            localRemove(USER_INFO)
            localRemove(USER_PHONE)
            auth.removeToken()
            
            return initState();
        default:
            return state;
    }
}