$(function(){
	//轮播
	var ads=$(".lun li"),//获取所有药轮播得图片元素
		len=ads.length,//获取图片总个数
		startindex=0,//当前图片的下标
		nextindex=1,//下一个要显示图片的下标
		yuans=$(".yuan>i"),//获得所有的小圆点
		timer=null;
		
	//轮播动画函数
	function move(){
		//图片轮播
		out(ads[startindex],400);
		goin(ads[nextindex],400)
		//小圆点切换
		yuans[startindex].className="";
		yuans[nextindex].className="liang";
		startindex=nextindex;
		nextindex++;
		if (nextindex>=len) {
			nextindex=0;
		}
	};
		
	//启动计时器实现自动轮播
	timer=setInterval(move,3000);
	
	//鼠标移入移出事件
	$(".lun").hover(function(){
		clearInterval(timer);//结束自动轮播
	},function(){
		timer=setInterval(move,3000);//启动自动轮播
	});
	
	//给左右绑定事件
	$(".left").click(function(){
		//下一个显示的图片为当前的前面一个
		nextindex=startindex-1;
		if (nextindex<0) {
			nextindex=len-1;
		}
		//启动动画
		move();
	});
	$(".right").click(function(){
		move();
	})
	
	//给小圆点绑定事件,添加委派
	$(".yuan").delegate("i","mouseover",function(){
		//console.log(this);
		for (let i=0;i<len;i++) {//遍历小圆点
			if (this===yuans[i]) {//判断进入的小圆点是否与遍历的小圆点相同，如果相同，那么显示的小圆点下标和图片的下标设置成下一个显示
				nextindex=i;
				move();//启动动画
				break;//跳出遍历
			}
		}
	})
	
}) 