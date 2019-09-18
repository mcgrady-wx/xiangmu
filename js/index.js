$(function(){
	//轮播
	var ads=$(".lun li"),//获取所有药轮播得图片元素
		len=ads.length,//获取图片总个数
		startindex=0,//当前图片的下标
		nextindex=1,//下一个要显示图片的下标
		yuans=$(".yuan>i"),//获得所有的小圆点
		timer=null;
		
	//动画函数
	function move(){
		//图片淡出淡入
		out(ads[startindex],500);
		goin(ads[nextindex],500);
		//小圆点样式改变
		yuans[startindex].className="";
		yuans[nextindex].className="liang";
		//更改要显示图片下标
		startindex=nextindex;
		nextindex++;
		if (nextindex>=len) {
			nextindex=0;
		}
	};
	
	//启动计时器实现自动轮播
	timer=setInterval(move,3000);
	
	//鼠标移入移除事件
	$(".lun").hover(function(){//移入停止轮播
		clearInterval(timer);
	},function(){//移除启动轮播
		timer=setInterval(move,3000);
	})
	
	//左右按钮点击事件
	$(".left").click(function(){
		//下一个显示的图片为当前的前面一个
		nextindex=startindex-1;
		if (nextindex<0) {
			nextindex=len-1;	
		}
		//启动动画
		move();
	})
	$(".right").click(function(){
		move();
	})
	
	//小圆点移入事件，使用事件委派
	$(".yuan").delegate("i","mouseover",function(){
		//遍历小圆点，判断移入的小圆点是否是当前的小圆点
		for (var i=0;i<len;i++) {//遍历
			//判断
			if (this===yuans[i]) {//如果移入的小圆点是当前小圆点
				//下一个显示的图片下标为i
				nextindex=i;
				//启动动画
				move();
				break;//跳出循环
			}
		}
	})
			
})
//倒计时
$(function(){
	
	//计算倒计时时间
	function date(){
		let endtime=new Date("2019-09-13 00:00:00"),//设置结束时间
			starttime=new Date(),//获取当前时间
			t=endtime.getTime()-starttime.getTime();//计算时间差
		let day="",hours="",minutes="",seconds="",fseconds="";
		day=Math.floor(t/1000/60/60/24);//剩余天数
		hours=Math.floor(t/1000/60/60%24);//剩余小时
		minutes=Math.floor(t/1000/60%60);//剩余分钟
		seconds=Math.floor(t/1000%60);//剩余秒数
		$(".day>i").text(day);
		$(".hour>i").text(hours);
		$(".minute>i").text(minutes);
		$(".second>i").text(seconds);
		//倒计时结束，停止
		if (t<=0) {
			clearInterval(time);
		}
	}
	//启动倒计时
	let time=setInterval(date,1000);
	
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

//搜索栏跨域请求jsonp淘宝AIP
$(function(){
	$(".select1").keyup(function(){
		let val=$(this).val(),
			url=`https://suggest.taobao.com/sug?code=utf-8&q=${val}&callback=?`;
		//跨域请求
//		$.ajax({
//			type:"get",
//			url:url,
//			dataType:"jsonp",
//			success:function(data){
//				let html="";
//				data.result.forEach(function(curr){
//					html+=`<div>${curr[0]}</div>`;
//				});
//				$(".suggest_info").html(html).show();
//			}
//		});
		//另外一种方法
		$.getJSON(url,function(data){
				let html="";
				data.result.forEach(function(curr){
					html+=`<div>${curr[0]}</div>`;
				});
				$(".suggest_info").html(html).show();			
		})
	});
})
