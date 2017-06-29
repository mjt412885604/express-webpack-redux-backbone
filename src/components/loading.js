var isLoading = null;
class Loading {
    constructor({
        title = 'Loading...',
        time = 30000,
        full = false,
        el = document.body
    } = {}) {
        if (typeof arguments[0] == 'string') {
            title = arguments[0];
        }
        this.content = '';
        this.time = time;
        this.el = el;
        this.full = full;
        if (isLoading) this.destroy();

        this.target = $('<div class="native-loading-content"></div>');
        this.content = `<div class="native-loading-mask"></div>
                        <div class="native-loading-dialog">
                            <div class="preloader"></div>
                        </div>`;

        this.fullContent = `<div class="oa-loading">
                                <div class="mask"></div>
                                <div class="loader-inner">
                                    <div class="loader-line-wrap">
                                        <div class="loader-line"></div>
                                    </div>
                                    <div class="loader-line-wrap">
                                        <div class="loader-line"></div>
                                    </div>
                                    <div class="loader-line-wrap">
                                        <div class="loader-line"></div>
                                    </div>
                                    <div class="loader-line-wrap">
                                        <div class="loader-line"></div>
                                    </div>
                                    <div class="loader-line-wrap">
                                        <div class="loader-line"></div>
                                    </div>
                                </div>
                            </div>`;

        this.show();
        isLoading = this;
    }

    show() {
        this.target && this.target.on('touchmove', (e) => {
            e.preventDefault();
        })

        if (this.full) {
            this.target.html(this.fullContent);
            this.el.appendChild(this.target[0]);
            setTimeout(() => {
                this.destroy();
            }, this.time)
            return;
        }

        this.target.html(this.content);
        this.el.appendChild(this.target[0]);
        setTimeout(() => {
            this.target.addClass('modal-in');
            setTimeout(() => {
                this.destroy();
            }, this.time)
        }, 10);
    }

    title(title) {
        if (title && !this.full) {
            this.target.find('.modal-title').html(title);
        }
    }

    hide() {
        this.destroy();
    }

    destroy() {
        $('.native-loading-content').remove();
        this.target = null
    }
}

function loading(options) {
    return new Loading(options)
}

export default loading;