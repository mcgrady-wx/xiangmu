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
//读取cookie
$(function(){
	//读取用户信息，修改登陆栏信息
	$.cookie.json=true;
	let loginuser=$.cookie("loginUser");
	$(".border>a").text(loginuser.email);
	$(".noborder>a").text("退出");
	/* 显示购物车数据 */
	let _products=$.cookie("products") || [];
	//判断是否登录，判断购物车中是否有数据
	if (loginuser.length===0) {//没登陆
		$(".nocart").show();
		$(".cart_table").hide();
		$(".cart1>b").text("(0)");
	} else{//登录
		if (_products.length===0) {//没有数据
			$(".nocart").show();
			$(".cart_table").hide();
			$(".cart1>b").text("(0)");
		} else{//有数据
			$(".nocart").hide();
			$(".cart_table").show();
			//读取商品信息显示总价
			let sum=0;
			$.each(_products, function(index,element) {
				sum+=Number(Number(element.price)*element.amount);
			});
			$(".cart1>b").text("("+sum+")");
		};
	}
	
	// 渲染模板
	let rendData={products:_products},
		html=template("cart_template",rendData);
	$(".cart_table > tbody").html(html);
	
	// 将_products中每个元素缓存到行中
	$(".cart_table > tbody > tr").each(function(index, element){
		// 在当前遍历到的行中缓存与之对应的商品对象数据
		$(this).data("prod", _products[index]);
	});
	
	/***********购物车操作****************************/
	/* 删除 */
	$(".cart_table").on("click", ".del", function(){
		//找到要删除的元素
		let _prod = $(this).parents("tr").data("prod");
		//查找其在_products数组中的索引
		let index=$.inArray(_prod, _products);
		//在数组中删除，并重新保存cookie
		_products.splice(index,1);
		$.cookie("products",_products,{expires:7,path:"/"});
		//在DOM中删除
		$(this).parents("tr").remove();
		// 计算合计
		calcTotal();
	})
	
	/* 数量+/- */
	$(".cart_table").on("click", ".add,.minus", function(){
		//找出所在行中的商品对象
		let _prod = $(this).parents("tr").data("prod");
		//获取数量
		let _amount=Number(_prod.amount);
		//计算+、-
		if ($(this).is(".add")) {//加
			_amount++;
		} else{//减
			if (_amount<=1) {
				return;
			}
			_amount--;
		}
		//重新赋值
		_prod.amount=_amount;
		// 保存cookie
		$.cookie("products", _products, {expires:7, path:"/"});
		//修改显示信息
		$(this).parents("td").children(".amount").val(_amount);
		$(this).parents("tr").children(".sub").text((_prod.price * _amount).toFixed(2));
		// 计算合计
		calcTotal();
	})
	/*输入数量修改*/
	$(".cart_table").on("blur", ".amount", function(){
		//找出所在行中的商品对象
		let _prod = $(this).parents("tr").data("prod");
		//给商品数量赋值
		_prod.amount=$(this).val();
		// 保存cookie
		$.cookie("products", _products, {expires:7, path:"/"});
		//修改显示信息
		$(this).parents("tr").children(".sub").text((_prod.price * _prod.amount).toFixed(2));
		// 计算合计
		calcTotal();
	})
	/* 全选 */
	$(".ck_all").click(function(){
		//获取“全选”复选框选中状态
		let status=$(this).prop("checked");
		// 设置所有行前复选框选中状态与“全选”一致
		$(".ck_prod").prop("checked",status);
		// 计算合计
		calcTotal();
	})
	/* 部分选中 */
	$(".cart_table").on("click", ".ck_prod", function(){
		if ($(".ck_prod:checked").legnth === _products.length)
			$(".ck_all").prop("checked", true);
		else
			$(".ck_all").prop("checked", false);

		// 计算合计
		calcTotal();
	});
	/* 计算合计金额 */
	function calcTotal(){
		let total=0;
		//遍历勾选了复选框元素计算价格
		$(".ck_prod:checked").each(function(){
			total+=Number($(this).parents("tr").children(".sub").text());
		})
		$(".total").text(total);
		//购物框价格改变
		let _products=$.cookie("products");
		let sum=0;
		$.each(_products, function(index,element) {
			sum+=Number(Number(element.price)*element.amount);
		});
		$(".cart1>b").text("("+sum+")");
	}
})