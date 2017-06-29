import es6Promise from 'es6-promise';
es6Promise.polyfill();

export function doFetch({
    url = '',
    method = 'get',
    params = {},
    data = {},
    headers = {},
    complete,
    beforeSend
} = {}) {
    if (store().userInfo) {
        headers['Authorization'] = '';
    }

    var promise = new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            type: method,
            data: data,
            headers: headers,
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
                
                }
            }
        })
    })
    return promise;
}

export function query(name, str) {
    var reg = new RegExp("(^|&)" + name + "=([^&|^#]*)(&|#|$)");
    var str = str ? str : window.location.href;
    var r = str.substr(str.indexOf("?") + 1).match(reg);
    return (r != null) ? unescape(r[2]) : null;
}

export function session(aKey, aVal) {
    if (typeof aVal == "undefined") {
        return JSON.parse(sessionStorage.getItem(aKey));
    } else {
        sessionStorage.setItem(aKey, JSON.stringify(aVal));
    }
}

export function local(aKey, aVal) {
    if (typeof aVal == "undefined") {
        return JSON.parse(localStorage.getItem(aKey));
    } else {
        localStorage.setItem(aKey, JSON.stringify(aVal));
    }
}

export function sessionRemove(aKey) {
    sessionStorage.removeItem(aKey);
}

export function localRemove(aKey) {
    localStorage.removeItem(aKey);
}

export function Form(elm = 'form') {
    var Form = {},
        form = $(elm).serializeArray();
    for (let val in form) {
        Form[form[val].name] = form[val].value
    }
    return Form;
}

export function render(tpl, data) {
    const code = 'var p=[];with(this){p.push(\'' +
        tpl
        .replace(/[\r\t\n]/g, ' ')
        .split('<%').join('\t')
        .replace(/((^|%>)[^\t]*)'/g, '$1\r')
        .replace(/\t=(.*?)%>/g, '\',$1,\'')
        .split('\t').join('\');')
        .split('%>').join('p.push(\'')
        .split('\r').join('\\\'') + '\');}return p.join(\'\');';
    return new Function(code).apply(data);
}