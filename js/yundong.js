//element 表示要运动的元素
//options: 多属性运动终值对象  {left:1000, top:500, width:1000}
//speed 运动时长
//fn 表示 运动运动执行结束后需要继续执行的函数
function yundong(element,options,speed,fn){
				// 停止待添加运动动画元素上已有的动画计时器
				clearInterval(element.timer);
				//遍历对象获得多属性的初值、范围值
				//初始和范围值也可能是多个，也用对象来表示
				var _start={},range={};
				for (var arrtname in options) {
					//获得初始位置距离
					_start[arrtname]=parseFloat(getComputedStyle(element)[arrtname]);
					//运动区间
					range[arrtname]=options[arrtname]-_start[arrtname];
				};
				//启动计时器前，记录运动开始时间
				var staertime=Date.now();
				//启动计时器，将计时器id保存到element元素的自定义属性
				element.timer=setInterval(function(){
					//记录当前次函数被调用时的时间
					var contenttime=Date.now();
					//计算获得运动经过时间
					var elapsed=contenttime-staertime;
					//求运动经过时间与设置运动总时间之间的较小值
					elapsed=Math.min(elapsed,speed);
					//遍历对象计算各属性运动的距离
					for (var arrtname in options) {
						//获得运动经过时间所移动的距离
						var result=elapsed*(range[arrtname]/speed)+_start[arrtname];
						//设置CSS样式
						element.style[arrtname]=result+(arrtname==="opacity" ? "" :"px");
					};
					//判断当经过时间和总时间相等时候，停止计时器
					if (elapsed===speed) {
						clearInterval(element.timer);
						// 如果有运动执行结束后需要继续执行的函数，则调用执行
						fn && fn();
					}
				},1000/60);
			};
			

//淡出
function out(element,speed,fn){
	 yundong(element,{opacity:0},speed,function(){
	 	element.style.display="none";
	 	fn && fn();
	 });
	
};

//淡入
function goin(element,speed,fn){
	 element.style.display="block";
	 yundong(element,{opacity:1},speed,fn);
	 fn && fn();
};