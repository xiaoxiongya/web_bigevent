(function() {
    $('.link-login').click(function() {
        $('.login').hide();
        $('.reg').show();
    });

    $('.link-reg').click(function() {
        $('.login').show();
        $('.reg').hide();
    });

    // layui获取form，然后自定义规则
    let layForm = layui.form;
    // 自定义规则
    layForm.verify({
        pwd: [
            // 定义正则表达式
            /^[\S]{6,12}$/
            ,'密码必须是6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            // 获取密码输入框的值
            let pwd = $('.reg [name=password]').val();
            // 判断两个值是否相同
            if (value !== pwd) {
                return '两次密码不一致'
            }
        }   
    });

    // 获取弹层组件的对象
    let layer = layui.layer;
    // 监听注册表单事件
    $('#reg_form').on('submit', function(e) {
        // 阻止默认行为
        e.preventDefault();
        // 发起Ajax的post请求
        $.post(
            'http://www.liulongbin.top:3007/api/reguser',
            {username: $('#regTxt').val(), password: $('#regPwd').val()},
            function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message, {icon: 5});
                }
                layer.msg('注册成功，请登录', {icon: 6});
                $('#link-reg').click();
            }
        );
    });

    // 监听登录表单事件
    $('#login_form').on('submit', function(e) {
        //阻止默认行为
        e.preventDefault();
        // 发起ajax的post请求
        $.ajax({
            method: 'post',
            url: 'http://www.liulongbin.top:3007/api/login',
            // data: {username: $('#loginTxt').val(), password: $('#loginPwd').val()},
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message, {icon: 2});
                }
                layer.msg('登录成功', {icon: 1});
                // 将成功得到的token字符串存储到localStorage中
                localStorage.setItem('token', res.token);
                // 跳转到后台主页
                location.href = './index.html';
            }
        });
    });
})();