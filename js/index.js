$(function(){
	//轮播
	var ads=$(".lun>li"),//获取所有药轮播得图片元素
		len=ads.length,//获取图片总个数
		startindex=0,//当前图片的下标
		nextindex=1,//下一个要显示图片的下标
		yuans=$(".yuan>i");//获得所有的小圆点
	
	
	//轮播动画函数
	var move=function(){
		ads.forEach(function(){
			ads[startindex].css("display","none");
			ads[nextindex].css("display","block");
		})
		
	};
		
	//启动计时器实现自动轮播
	var timer=setInterval(move(),1000);
}) 