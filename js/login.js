$(function(){
	//账号登陆和扫码登陆切换
	$(".left").click(function(){
		$("#mobile").show();
		$("#password").show();
		$("#login_btn").show();
		$(".mima").show();
		$(".qr_code").hide();
		$(".word").hide();
		$(".down").hide();
		$(this).css("color","#d70057");
		$(".right").css("color","black");
		
	});
	$(".right").click(function(){
		$(".qr_code").show();
		$(".word").show();
		$(".down").show();
		$("#mobile").hide();
		$("#password").hide();
		$("#login_btn").hide();
		$(".mima").hide();
		$(this).css("color","#d70057");
		$(".left").css("color","black");
		
	})
	//移入移除二维码，运动事件
	$(".qr_code").hover(function(){
		yundong($(".qr_code")[0],{left:30},800);
		yundong($(".prompt")[0],{opacity:1},800);
		
	},function(){
		yundong($(".qr_code")[0],{left:115},800);
		yundong($(".prompt")[0],{opacity:0},800);
	})
})

//用户登录
$(function(){
	$("form").submit(function(){
		$.post("/xiangmu/php/login.php",$(this).serialize(),function(data){
			if (data.res_code===0) {
				// 保存登录成功的用户信息到 cookie 中
				$.cookie.json=true;// 自动调用JSON.stringify()、JSON.parse()来转换JS值与JSON字符串
				$.cookie("loginUser", data.res_body, {path:"/"});
				location = "/xiangmu/index.html";//跳转到首页
			} else{
				$(".mobilefalse").show();
			}
		},"json");
		return false;
	})
})
