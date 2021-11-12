$(function () {
  //点击注册连接
  $("#link_reg").on('click', function () {

    $(".login-box").hide()
    $(".reg-box").show()
  })
  //点击登录连接
  $("#link_login").on('click', function () {
    $(".login-box").show()
    $(".reg-box").hide()
  })
  //从layui获取from对象
  var form = layui.form
  var layer = layui.layer
  //自定规则
  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    repwd: function (value) {
      var pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致'
      }
    }
  })
  //监听注册组件的提交时间
  $("#form_reg").on('submit', function (e) {
    //阻止默认事件
    //preventDefault()[dom标准写法(ie678不兼容)]
    //ie678用returnValue
    //或者利用return false也能阻止默认行为,没有兼容问题(只限传统注册方式)
    e.preventDefault()
    var data = {
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val()
    }
    $.post('/api/reguser', data, function (e) {
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      layer.msg('注册成功，请登录')
      $("#link_login").click()
    })


  });
  //监听登录时间提交事件
  $("#form_login").submit(function (e) {
    e.preventDefault()
    $.ajax({
      method: "post",
      url: "/api/login",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('登录失败！')
        }
        layer.msg('登陆成功 ')
        localStorage.setItem('token', res.token)
        location.href = '/index.html'
      }
    });
  })
})