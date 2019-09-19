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
