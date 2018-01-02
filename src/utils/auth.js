import Cookies from 'js-cookie'

const Authorization = 'Authorization'

export function getToken() {
    return Cookies.get(Authorization)
}

export function setToken(token) {
    return Cookies.set(Authorization, token, { expires: 30 }) // 设置有效期30天
}

export function removeToken() {
    return Cookies.remove(Authorization)
}