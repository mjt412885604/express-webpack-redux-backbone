var isLoading,
    timer;
class Loading {
    constructor({
        message = '加载中...',
        time = 30000,
        el = $('body')
    } = {}) {
        if (typeof arguments[0] == 'string') {
            message = arguments[0];
        }

        this.message = message;
        this.time = time;
        this.el = el;
        if (isLoading) this.destroy();

        this.target = $(`<div class="native-loading-content modal-in">
                        <div class="native-loading-mask"></div>
                        <div class="native-loading-dialog">
                            <div class="preloader"></div>
                            ${this.message ? '<div class="modal-title">' + this.message + '</div>' : ''}
                        </div></div>`);

        this.show();
        isLoading = this;
    }

    show() {
        setTimeout(() => {
            this.el.append(this.target);
            this.target.on('touchmove', function (e) {
                e.preventDefault();
            })
            timer = setTimeout(() => {
                this.destroy();
            }, this.time)
        }, 10)
    }

    title(text) {
        if (text && this.message) {
            this.message = text;
            this.target.find('.modal-title').html(this.message);
        }
    }

    hide() {
        this.destroy()
        timer && clearTimeout(timer)
    }

    destroy() {
        if (!this.target) return;
        setTimeout(() => {
            if (this.target) {
                $('.native-loading-content').remove();
                this.target = null
            }
        }, 100)
    }
}

function loading(options) {
    return new Loading(options)
}

export default loading;