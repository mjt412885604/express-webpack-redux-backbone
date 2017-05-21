import es6Promise from 'es6-promise';
es6Promise.polyfill();

function doFetch({
    url = '',
    method = 'get',
    params = {},
    data = {},
    headers = {},
    complete,
    beforeSend
} = {}) {
    let _headers = {};
    var promise = new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            type: method,
            data: data,
            headers: Object.assign(_headers, headers),
            beforeSend: beforeSend,
            complete: complete,
            success: resolve,
            error(error) {
                if (error.status != 401) {
                    if (error.responseText) {
                        console.log(JSON.parse(error.responseText));
                        reject(JSON.parse(error.responseText));
                    }
                } else {
                    alert('请重新登录')
                }
            }
        })
    })
    return promise;
}

function query(name, str) {
    var reg = new RegExp("(^|&)" + name + "=([^&|^#]*)(&|#|$)");
    var str = str ? str : window.location.href;
    var r = str.substr(str.indexOf("?") + 1).match(reg);
    return (r != null) ? unescape(r[2]) : null;
}

function session(aKey, aVal) {
    if (typeof aVal == "undefined") {
        return JSON.parse(sessionStorage.getItem(aKey));
    } else {
        sessionStorage.setItem(aKey, JSON.stringify(aVal));
    }
}

function local(aKey, aVal) {
    if (typeof aVal == "undefined") {
        return JSON.parse(localStorage.getItem(aKey));
    } else {
        localStorage.setItem(aKey, JSON.stringify(aVal));
    }
}

function sessionRemove(aKey) {
    sessionStorage.removeItem(aKey);
}

function localRemove(aKey) {
    localStorage.removeItem(aKey);
}

function platform() {
    var u = navigator.userAgent,
        app = navigator.appVersion;
    return { //移动终端浏览器版本信息
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
        iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
    };
}

function Form(elm = 'form') {
    var Form = {},
        form = $(elm).serializeArray();
    for (let val in form) {
        Form[form[val].name] = form[val].value
    }
    return Form;
}

export {
    doFetch,
    query,
    session,
    local,
    sessionRemove,
    localRemove,
    platform,
    Form
};
