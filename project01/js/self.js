console.log($('input[type="checkbox"]').prop('checked'))
$('#btn').click(function () {
    if ($('input[type="checkbox"]').prop('checked')){
        var data = {
            "user_mobile": $('#user').val(),
            "password": $('#pwd').val()
        }
        $.post("daanli.php", data, function (data) {
            console.log(data)
        })
    }else {
        alert("请同意服务于隐私协议")
    }
})

