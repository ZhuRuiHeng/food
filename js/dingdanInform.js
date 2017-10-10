
    var getParam = function () {
        try{
        var url = window.location.href;
        var result = url.split("?")[1];
        var keyValue = result.split("&");
        var obj = {};
        for (var i = 0; i < keyValue.length; i++) {
            var item = keyValue[i].split("=");
            obj[item[0]] = item[1];
        }
        return obj;}catch(e){
            console.warn("没有参数");
        }
    };
    var oid = getParam().oid;

    $.ajax({
        type:"get",
        url : apiRoot+'/api/order-detail?sign='+sign+'&operator_id='+ operator_id,
        data: {
           oid: oid
        },
        dataType : 'json',
        success : function(data){
            console.log(data); 
            var status =  data.data.orderDetail.status;
            if(status == 'payment'){
            	$("#status").text('等待买家付款');
            }else if(status == 'deliver'){
            	$("#status").text('等待卖家发货');
            }else if(status == 'receipt'){
            	$("#status").text('等待买家收货');
            }else if(status == 'finish'){
            	$("#status").text('已完成');
            }else if(status == 'group'){
            	$("#status").text('拼团中');
            }else if(status == 'close'){
            	$("#status").text('交易关闭');
            }
          	$("#out_trade_no").text(data.data.orderDetail.out_trade_no);
          	//缓存拿收货地址
          	var name="周三",phone="1321423534",address="深圳";
          	$("#name").text(name);
          	$("#phone").text(phone);
          	$("#address").text(address);
          	// 地址结束
          	var expenses = data.data.orderDetail.expenses;
          	if(expenses<1){
      				$(".expenses").text('免运费');
      				$(".yunfei").hide();
          	}else{
          		$(".expenses").text(expenses);
          		$(".yunfei").show();
          	}
          	//留言
          	var message = data.data.orderDetail.message;
          	if(message == ''){
          		$(".weui-cell.weui-cell_access.write").hide();
          	}else{
          		$("#message").text(message);
          	}
          	$(".total_fee").text(data.data.orderDetail.total_fee);
          	//商品列表
          	var goodsList = data.data.orderDetail.goods_list;
            if( goodsList.length != 0){
	              var informArr="";
	              for(var i=0;i< goodsList.length;i++){
	              	var informStr="<div class=\"weui-panel__bd\">"+
							"<a href=\"javascript:;\" class=\"weui-media-box weui-media-box_appmsg\">"+
								"<div class=\"weui-media-box__hd\">"+
									"<img src=\""+goodsList[i].figure+"\" class=\"weui-media-box__thumb\">"+
								"</div>"+
								"<div class=\"weui-media-box__bd\">"+
									"<h4 class=\"weui-media-box__desc\">"+
										""+goodsList[i].good_name+""+
									"</h4>"+
									"<p class=\"leixings\">10英寸</p>"+
									"<div class=\"weui-cell caozuo\">"+
										"<div class=\"weui-cell__bd service-price\">"+
											"<p> ￥"+goodsList[i].price+"</p>"+
										"</div>"+
										"<div  class=\"weui-cell__ft service-gouwu service\">x1</div>"+
									"</div>"+
								"</div>"+
							"</a>"+
						"</div>"
	                    informArr+=informStr;
	              }
	              document.getElementById("list").innerHTML=informArr;
	        }else{
              console.log("null")
            }
        },
        error:function(e){
            console.log(e)
        }
    });

