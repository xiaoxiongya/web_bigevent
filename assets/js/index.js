(function () {

    function getUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            // headers请求头配置对象
            /*  headers: {
                 Authorization: localStorage.getItem('token') || ''
             }, */
            success: function (res) {
                if (res.status !== 0) {
                    console.log(res.message);
                }
            }
        });
    }
    getUserInfo();

    // 退出按钮的点击事件，实现退出功能
    $('#logOuut').on('click', function () {
        // 提示用户是否退出
        layui.layer.confirm('is not?', { icon: 3, title: '提示' }, function (index) {
            // 清空本地的token
            localStorage.removeItem('token');
            // 跳转到登录页面
            location.href = 'login.html';
            // 关闭提示框
            layui.layer.close(index);
        });
    });
})();