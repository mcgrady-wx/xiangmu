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