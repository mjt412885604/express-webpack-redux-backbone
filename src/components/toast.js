var target,
    timer;

function toast({
    message = '',
    time = 2500,
    callback
} = {}) {
    if (target) {
        hide()
    }

    target = document.createElement('div');
    target.className = 'native-toast';

    var msg = document.createElement('div');
    msg.className = 'native-toast-msg';

    if (typeof arguments[0] == 'string' || typeof arguments[0] == 'number') {
        msg.innerHTML = arguments[0];
    } else {
        msg.innerHTML = message
    }

    target.appendChild(msg);
    document.body.appendChild(target);

    target && target.addEventListener('touchmove', (e) => {
        e.preventDefault();
    }, false);

    timer = setTimeout(() => {
        hide();
        if (callback instanceof Function) {
            callback();
        }
    }, time);

    function hide() {
        msg.classList.add('active');
        setTimeout(() => {
            document.body.removeChild(target);
            target = null;
            clearTimeout(timer);
        }, 100)
    }
}

export default toast;