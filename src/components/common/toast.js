var target,
    timer;

function toast({
    message = '',
    time = 2000,
    callback
} = {}) {
    if (target) {
        hide()
    }

    target = document.createElement('div');
    target.className = 'native-toast';

    var msg = document.createElement('div');
    msg.className = 'native-toast-msg';

    if (typeof arguments[0] == 'string') {
        msg.innerHTML = arguments[0];
    } else {
        msg.innerHTML = message
    }

    target.appendChild(msg);
    document.body.appendChild(target);

    setTimeout(() => {
        msg.classList.add('active');
    }, 10);

    timer = setTimeout(() => {
        hide();
        if (callback instanceof Function) {
            callback();
        }
    }, time);

    function hide() {
        document.body.removeChild(target);
        target = null;
        clearTimeout(timer);
    }
}


export default toast;
