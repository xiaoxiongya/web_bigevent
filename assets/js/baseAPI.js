// 注意：每次调用$.get或者$.post或者$.ajax的时候，都会先调用ajaxPrefilter这个函数
$.ajaxPrefilter(function (options) {
    // 在发起请求之前，统一拼接请求的路径
    options.url = 'http://www.liulongbin.top:3007' + options.url;

    // 统一为有权限的接口，设置请求头headers
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {Authorization: localStorage.getItem('token') || ''};
    }
    // 全局统一挂载complete回调函数
    options.complete = function(res) {
        // 通过responseJSON获取到服务器响应回来的数据
        if (res.responseJSON.status !== 1 && res.responseJSON.message == '身份认证失败！') {
            // 强制清空token
            localStorage.removeItem('token');
            // 跳转到登录页面
            location.href = 'login.html';
        }
    }
});