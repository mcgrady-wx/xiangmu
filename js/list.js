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

//搜索栏跨域请求jsonp淘宝AIP
$(function(){
	$(".select1").keyup(function(){
		let val=$(this).val(),
			url=`https://suggest.taobao.com/sug?code=utf-8&q=${val}&callback=?`;
		$.getJSON(url,function(data){
			let html="";
				data.result.forEach(function(curr){
					html+=`<div>${curr[0]}</div>`;
				});
			$(".suggest_info").html(html).show();		
		})
	})
})

//读取用户信息，修改登陆栏信息
$(function(){
	$.cookie.json=true;
	let loginuser=$.cookie("loginUser");
	$(".border>a").text(loginuser.email);
	$(".noborder>a").text("退出");
})

//加入购物车
$(function(){
	//绑定点击事件
	$(".prolist-main").on("click","li",function(){
		//保存当前商品信息
		let product={
			pid:$(this).find(".pid").text(),
			img:$(this).find(".pdImg").attr("src"),
			title:$(this).find(".gl-name").find("a").attr("title"),
			price:$(this).find(".okprice").text(),
			amount:1
		}
		/* cookie */
		$.cookie.json=true;
		// 先查找cookie中是否已有保存购物车,存在读取，不存在定义一个
		let _products=$.cookie("products") || [];
		/*把商品添加到cookie中*/
		//判断商品是否已经存在与数组
		let index=panduan(product.pid,_products);
		console.log(index);
		if (index===-1) {//不存在，添加到数组
			_products.push(product);
		} else{//存在，数量加一
			_products[index].amount++
		};
		//重新保存回cookie
		$.cookie("products",_products,{expires:7,path:"/"});
		alert("购买成功");
		/* 显示选购的所有商品总价 */
		let sum=0;
		$.each(_products, function(index,element) {
			sum+=Number(Number(element.price)*element.amount);
		});
		$(".cart1>b").text("("+sum+")");
		return false;
	})
})


//判断一个id是否存在与一个数组中，存在返回该id所在的下标 不存在返回-1
function panduan(id,array){
	//遍历数组，用它的pid属性值和id比较
	for (let i=0;i<array.length;i++) {
		if (array[i].pid==id) {
			return i;
		}
	}
	return -1;
}
