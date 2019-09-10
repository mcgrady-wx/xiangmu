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
		out(ads[startindex],400);
		goin(ads[nextindex],400);
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