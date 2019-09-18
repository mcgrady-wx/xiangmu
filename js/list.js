$(function(){
	$.getJSON("../mock/list.json",function(data){
		// 渲染模板
		let rendData = { // 准备渲染的数据
			products : data.res_body.data
		};
		let html=template("prolists",rendData);//渲染
		// 显示
		$(".prolist").prepend(html);
	})
})

//滚动事件
$(function(){
	//添加滚动事件
	$(window).scroll(function(){
		let _scroll= document.documentElement.scrollTop || document.body.scrollTop;//获取窗口滚动距离
		//固定导航
		if (_scroll>=224) {
			$("nav").css({"position":"fixed","top":"0px","z-index":"999"});
		} else {
			$("nav").css({"position":"static"});
		}
		//显示返回顶部按钮
		if (_scroll>=90) {
			$(".gototop").css({"display":"block","position":"fixed","bottom":"0px"});
		}  else if(_scroll<90){
			$(".gototop").css("display","none");
		}
	})
})
