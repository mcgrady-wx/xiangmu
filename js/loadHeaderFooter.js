define(["jquery", "cookie"], function() {
	$("header").load("/html/include/header.html", function(){
		/* 绑定搜索键盘事件 */
		

		/* 查询是否有登录用户 */
		let user = $.cookie("loginUser");
		if (user)
			$(".login_reg").html(`<a href="${user}"></a>`);
	});
});