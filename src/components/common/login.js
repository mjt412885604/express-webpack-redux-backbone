function Login(isTrue = false) {
    var that = this;
    weui.confirm('<p class="font13px">请立即登录<br>您的数据将永久保存在云端</p>', {
        title: '<span class="fontRed">您的数据有丢失危险!</span>',
        buttons: [{
            label: '取消',
            type: 'default',
            onClick: function() {
                if (!isTrue) {
                    history.go(-1);
                } else {
                    if (isTrue == 'refresh') { // 刷新当前页面
                        window.location.reload();
                    }
                }
            }
        }, {
            label: '立即登录',
            type: 'primary',
            onClick: function() {
                appRouter.navigate('login', true);
                // that.showLogin();
            }
        }]
    });
}

export default Login;
