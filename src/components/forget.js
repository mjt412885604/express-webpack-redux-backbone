import html from '../pages/forget.html'
import toast from './common/toast'
import { store, http } from '../store'
import {
    doFetch,
    Form
} from '../utils'

var Forget = Backbone.View.extend({
    el: '#app',

    events: {
        'click #forget-submit': 'submit',
        'click .page-forget .cancel': 'cancel',
        'click .page-forget .countDown': 'countDown'
    },

    initialize() {
        this.render();
        this.userPhone();
    },

    render() {
        this.$el.html(html)
    },

    countDown() {
        let tel = $('input[name="tel"]').val();
        if (!(/^1[\d]{10}$/g).test(tel)) {
            toast('手机号码格式不正确');
            return;
        }
    },

    userPhone() {
        $('input[type="tel"]').focus(() => {
            $('.cancel').show();
        }).blur(() => {})
    },

    cancel() {
        $('input[name="tel"]').val('');
        $('.cancel').hide();
    },

    valid() {
        let form = Form('form');
        if (!(/^1[\d]{10}$/g).test(form.tel)) {
            toast('手机号码格式不正确');
            return;
        } else if (!form.code) {
            toast('请输入验证码');
            return;
        } else if (form.password.length < 6 || !(/^[0-9a-zA-Z]+$/.test(form.password))) {
            toast('密码为6-20位数字和字母组成');
            return;
        } else if (form.password != form.reset) {
            toast('密码不一致');
            return;
        } else {
            return true;
        }
    },

    submit(e) {
        if (this.valid()) {
            $(e.target).prop('disabled', true);
            let form = Form('form');
            doFetch({
                url: http.forgetPwd,
                method: 'post',
                data: {
                    phone: form.tel,
                    captcha: form.code,
                    pwd: form.reset
                },
                complete() {
                    $(e.target).prop('disabled', false);
                }
            }).then((data) => {
                console.log(data);
                store({
                    type: 'SET_LOGIN',
                    data: {
                        isLogin: 1,
                        userInfo: data,
                        phone: form.tel
                    }
                })
                weui.toast('修改成功', {
                    duration: 2000,
                    callback: function() {
                        appRouter.navigate('login', true);
                    }
                });

            }, (error) => {
                weui.topTips(error.message);
            });
        }
    }


});

module.exports = new Forget;
