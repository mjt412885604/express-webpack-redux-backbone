var prevToast;
class Toast {
    constructor(opt) {
        if (!opt) return;

        if (prevToast) {
            prevToast.destroy();
        }
        this.timeout = opt.timeout || 2000;
        this.callback = opt.callback;

        if (typeof arguments[0] == 'string' || typeof arguments[0] == 'number') {
            this.message = arguments[0];
        } else {
            this.message = opt.message;
        }

        this.target = $(`
            <div class="native-toast">
                <div class="native-toast-msg">${this.message}</div>
            </div>
        `)

        this.show();
        prevToast = this;
    }

    show() {
        setTimeout(() => {
            $('body').append(this.target);
            this.target.on('touchmove', function (e) {
                e.preventDefault();
            })
            this.hide();
        }, 10)
    }

    hide() {
        setTimeout(() => {
            this.destroy()
        }, this.timeout)
    }

    destroy() {
        if (!this.target) return;
        this.target.find('.native-toast-msg').addClass('active');
        setTimeout(() => {
            if (this.target) {
                this.target.remove()
                this.target = null;
                typeof this.callback == 'function' && this.callback();
            }
        }, 100)
    }
}

function toast(opt) {
    return new Toast(opt)
}

export default toast;