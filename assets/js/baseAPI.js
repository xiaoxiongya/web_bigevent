// 注意：每次调用$.get或者$.post或者$.ajax的时候，都会先调用ajaxPrefilter这个函数
$.ajaxPrefilter(function(options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url;
});