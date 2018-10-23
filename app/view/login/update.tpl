<html>
<head>
  <title>Hacker News</title>
  <script src="http://lib.sinaapp.com/js/jquery/1.9.1/jquery-1.9.1.min.js"></script>
  <script src="http://lib.sinaapp.com/js/jquery.cookie/jquery.cookie.js"></script>
  <style>
    .login-box{
        width: 300px;
        margin: 300px auto;
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 20px;
      }
      .login-box input{
        border: none;
        border: 1px solid rgb(66,139,202);
        background-color: #ffffff;
        width: 300px;
        color: #666;
        font-size: 14px;
        height: 40px;
        margin-top: 20px;
        display: block;
        text-align: center;
        letter-spacing: 4px;
      }
      #submit{
          width: 200px;
          margin: 20px auto;
          background-color: rgb(66,139,202);
          color: #ffffff;
          border: none;
      }
    </style>
</head>

<body>
  <form class="login-box">
      <h3>修改用户信息</h3>
    <input type="text" placeholder="用户id" id="id">
    <input type="text" placeholder="用户名" id="username">
    <input type="text" placeholder="密码" id="password">
    <input type="button" value="提交修改" id="submit">
  </form>
  <script>
    var csrftoken = $.cookie('csrfToken');

    function csrfSafeMethod(method) {
      // these HTTP methods do not require CSRF protection
      return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    $.ajaxSetup({
      beforeSend: function (xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
          xhr.setRequestHeader('x-csrf-token', csrftoken);
        }
      },
    });
    $('#submit').click(function () {
      $.ajax({
        url: '/user/update',
        type: 'POST',
        data: {
          id:$("#id").val(),
          username: $('#username').val(),
          password: $('#password').val()
        },
        success(res) {
          console.log(res);
        }
      })
    })
  </script>
</body>

</html>