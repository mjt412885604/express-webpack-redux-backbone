import html from '../pages/mine.html'
import {
    doFetch,
    local
} from '../utils';
import { store, http } from '../store'
import Login from './common/login'

var Mine = Backbone.View.extend({
    el: '#app',

    events: {

    },

    initialize: function() {
        this.render();
        this.getMine();
    },

    render: function() {
        this.$el.html(html)
    },

    getMine() {
        const { isLogin, userInfo } = store();
        if (isLogin == 1) {
            doFetch({
                url: http.mine,
                data: {
                    userId: userInfo.userId
                }
            }).then((data) => {
                let phone = data.phone.slice(0, 3) + '****' + data.phone.slice(-4);
                $('.phone').html(phone);
                $('.photo img').attr('src', data.photo);
            }).catch((error) => {
                console.log(error)
            });
        } else {
            $('.phone').html('未登录');
            Login();
        }

    }
});

module.exports = new Mine;
