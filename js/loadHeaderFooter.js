$(function(){
	//加载头部
	$.ajax({
		type:"get",
		url:"/html/include/header.html",
		success:function(html){
			//向body最前面加入代码
			$("body").prepend(html);
			// 加载 header.js 文件
			$.getScript("/js/header.js");
		}
	});
	//追加尾部，另一种方法
	$.get("/html/include/footer.html",function(html){
		$("footer").append(html);
	})
})