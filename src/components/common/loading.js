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
			                <div class="modal-inner">
			                    <div class="modal-title">${title}</div>
			                    <div class="modal-text">
			                        <div class="preloader"></div>
			                    </div>
			                </div>
			            </div>`;
                        
        this.fullContent = `<div class="native-loading-full">
                            <div>
                                <div class="container">
                                  <div class="stick"></div>
                                  <div class="stick"></div>
                                  <div class="stick"></div>
                                  <div class="stick"></div>
                                  <div class="stick"></div>
                                  <div class="stick"></div>
                                  <h1>Loading...</h1>
                                </div>
                            </div>
                        </div>`;

        this.show();
        isLoading = this;
    }

    show() {
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
