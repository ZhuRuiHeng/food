
var price = '';
var low_price = '';
var type = '';
//缓存拿收货地址
var receiver1 = localStorage.getItem("receiver1");
var phone1    = localStorage.getItem("phone1");
var address1  = localStorage.getItem("address1");
if(!receiver1 || !phone1 || !address1){
    $("#liebiao").hide();
}else{
    $("#newadd").hide();
}


$("#name").text(receiver1);
$("#phone").text(phone1);
$("#address").text(address1);
// 地址结束
var getParam = function () {
    try{
    var url      = window.location.href;
    var result   = url.split("?")[1];
    var keyValue = result.split("&");
    var obj      = {};
    for (var i = 0; i < keyValue.length; i++) {
        var item = keyValue[i].split("=");
        obj[item[0]] = item[1];
    }
    return obj;}catch(e){
        console.warn("没有参数");
    }
};
//页面参
var gid    = getParam().gid;
var nowPrice = getParam().nowPrice;
var attr   = getParam().attr;
var num    = getParam().num;
var types  = decodeURI(getParam().types);

var allPrice = nowPrice*num;
$(".nowPrice").html(nowPrice);
$("#num").html(num);
$("#types").html(types);
$(".allPrice").html(parseInt(allPrice).toFixed(2));
//留言
$(function(){  
  	$('#message').bind('input propertychange', function() {  
	    var message = $('#message').val();
	    console.log(message);
	});  
})  
// console.log('gid:',gid);
// console.log('nowPrice:',nowPrice);
// console.log('attr:',attr);
// console.log('num:',num);
// console.log(allPrice);
    $(document).ready(function(){
        $.ajax({
            type:"get",
            url : apiRoot+'/api/goods-detail?sign='+sign+'&operator_id='+ operator_id,
            data: {
	          gid: gid
	        },
            dataType : 'json',
            success : function(data){
                console.log(data); 
                var picture =data.data.goodsDetail.picture[0];
                $("#good_name").text(data.data.goodsDetail.good_name);
                // 运费
                var expenses = data.data.goodsDetail.expenses;
	          	if(expenses<1){
	      				$(".expenses").text('免运费');
	      				$(".yunfei").hide();
	          	}else{
	          		$(".expenses").text(expenses);
	          		$(".yunfei").show();
	          	}
                $("#good_name").text(data.data.goodsDetail.good_name);
                $("#good_name").text(data.data.goodsDetail.good_name);
                $(".expenses").text('免运费');
            },
            error:function(e){
                console.log(e);
            }
        })
    });