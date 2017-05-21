import html from '../pages/index.html'
import {
    doFetch,
    session
} from '../utils'
import  toast from './common/toast'
import { store, http } from '../store'

var Index = Backbone.View.extend({
    el: '#app',

    events: {
        'click .page-index .name': 'clickSpan',
        'click #desktop-name': 'desktopName',
        'click .page-index .weui-grid': 'weuiGrid'
    },

    initialize: function() {
        this.render();
        this.desktop();

    },

    render: function() {
        this.$el.html(html)
    },

    weuiGrid(){
        toast('这是第一页');
        
    },

    desktop() {
        const { isLogin, userInfo } = store();
        if (isLogin == 1) {
            var $loading = weui.loading();
            doFetch({
                url: http.dsaktop,
                data: {
                    userId: userInfo.userId
                },
                complete(){
                    $loading.hide();
                }
            }).then(data => {
                if (data) {
                    session('switch__alam', JSON.stringify({
                        gluSwitch: data.gluSwitch,
                        reSwitch: data.reSwitch
                    }));
                    session('DESKTOP_DATA', JSON.stringify(data));

                    $('#desktop-name').html(data.name);
                    if (data.msg > 0) {
                        $('.user-message').append(`<span class="weui-badge">${data.msg}</span>`);
                    }
                    $('#desktop-calories').html(data.calories);
                    $('#desktop-glu').html(data.glu);

                    // 是否已经添加健康档案(0:未添加 1:已添加)
                    if (data.ehr == 0) {
                        weui.confirm('请先完善健康档案', {
                            buttons: [{
                                label: '取消',
                                type: 'default',
                                onClick() {}
                            }, {
                                label: '立即完善',
                                type: 'primary',
                                onClick() {}
                            }]
                        });
                    }

                    // 血糖数据判断
                    $('#has_blood').attr('href', parseInt(data.glu) ? '#/my-data' : '#/blood-manage')
                }
            });
        } else {
            $('#desktop-name').html('未登录');
        }

    },

    desktopName(e) {
        let name = $(e.target).html();
        appRouter.navigate(name == '未登录' ? 'login' : 'mine', true);
    },

    clickSpan: function(e) {
        toast('index.html');
    }
});

module.exports = new Index;
