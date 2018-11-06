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
      <h3>删除用户</h3>
    <input type="text" placeholder="用户id" id="id">
    <input type="button" value="确定删除" id="submit">
  </form>
  <script>
    var csrftoken = $.cookie('csrfToken');

    function csrfSafeMethod(method) {
      // these HTTP methods do not require CSRF protection
      return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    $.ajaxSetup({
      beforeSend: function (xhr, settings) {
        xhr.setRequestHeader('Authorization', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjcsImlhdCI6MTU0MDU0ODE5MiwiZXhwIjoxNTQwNTkxMzkyfQ.lFPVcMfriHQYhfmjVEDtzQtRQgD9JjgdUzjahzlMkfg");
      },
    });
    $('#submit').click(function () {
      $.ajax({
        url: '/getUser',
        type: 'DELETE',
        data: {
          id: $('#id').val(),
        },
        success(res) {
          console.log(res);
        }
      })
    })
  </script>
</body>

</html>