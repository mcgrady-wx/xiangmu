$(function(){
	//判断是否已经注册
	let isExist = true; // 标记邮箱是否被占用，true--占用 false--未被占用
	$("#mobile").blur(function(){
		$.getJSON("../php/check.php",{email:$(this).val()},function(data){
			if (data.res_body.status==0) {
				isExist=false;
				$(".mobiletrue").show();
				$(".mobilefalse").hide();
			} else {
				isExist = true;
				$(".mobilefalse").show();
				$(".mobiletrue").hide();
			}
		})
	})
	
	/* 提交注册表单，注册用户 */
	$("form").submit(function(){
		if(!isExist){//没被占用，注册账号
			let _email=$("#mobile").val(),
				_password=$("#password").val()
				_data="email="+_email+"&password="+_password;
			if ($("#code").val()==3147) {
				$.ajax({
					type:"post",
					url:"../php/register.php",
					data:_data,
					dataType:"json",
					success:function(data){
						if (data.res_code===0) {
							// 保存注册成功的用户信息到 cookie 中
							$.cookie.json=true;// 自动调用JSON.stringify()、JSON.parse()来转换JS值与JSON字符串
							$.cookie("loginUser",data.res_body, {path:"/"});
							location = "../index.html";//跳转到首页							
						} else {
							alert("用户注册失败，请稍后重试...");
						}
					}
				});
			} else {
				$(".imagesfalse").show()
				return false;
			}
		}
		
		return false;
	})
})