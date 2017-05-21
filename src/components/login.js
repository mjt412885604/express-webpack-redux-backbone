import html from '../pages/login.html'
import {
    doFetch,
    platform,
    Form
} from '../utils'
import toast from './common/toast'
import { http, store } from '../store'

var Login = Backbone.View.extend({
    el: '#app',

    events: {
        'click .page-login .login': 'Login',
        'click .page-login .cancel': 'Cancel'
    },

    initialize: function() {
        this.render();
        this.userPhone();

    },

    render: function() {
        this.$el.html(html)
    },

    userPhone(){
        $('input[type="tel"]').focus(() => {
            $('.cancel').show();
        }).blur(() => {
        })
    },

    Cancel(){
        $('input[name="account"]').val('');
        $('.cancel').hide();
    },

    Login() {
        var info = Form();
        if (!(/^1[\d]{10}$/g).test(info.account)) {
            toast('手机号码格式有误');
            return;
        } else if (!info.pwd) {
            toast('请输入密码');
            return;
        }
        doFetch({
            url: http.login,
            method: 'post',
            data: info
        }).then(data => {
            store({
                type: 'SET_LOGIN',
                data: {
                    userInfo: data,
                    isLogin: 1,
                    phone: info.account
                }
            })
            weui.toast('登录成功', {
                duration: 2000,
                callback: function() {
                    appRouter.navigate('index', true);
                }
            });
        }, error => {
            toast(error.message)
        });
    }

});

module.exports = new Login;
