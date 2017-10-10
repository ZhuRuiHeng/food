
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
            if(status == 'payment'){  //待付款
            	$("#status").text('等待买家付款');
              $(".true").show();
              $(".false").hide();
              $("#time").html('');
              //倒计时
                  var order_time = "2017-10-10 14:42:47"; //data.data.orderDetail.order_time
                  var xiaTime = (new Date(order_time)).getTime() / 1000;//下单时间
                  console.log(xiaTime);
                  var begin_time = parseInt(xiaTime) + parseInt(1800); //超时时间
                  console.log(begin_time);
                  var nowTime = Date.parse(new Date()); //现在时间
                    console.log('11111', nowTime,begin_time);
                  var ge_nowTime = time(nowTime / 1000, 1); // 下单时间
                  console.log("ge_nowTime:",ge_nowTime);
                  var be_gainTime = time(begin_time, 1);  //超时时间
                  console.log("be_gainTime:",be_gainTime);
                    console.log('22222', ge_nowTime,be_gainTime);
                  var Countdown = begin_time * 1000 - nowTime; //倒计时
                  console.log(begin_time * 1000 - nowTime)
                  if (Countdown > 0) {
                    function dateformat(micro_second) {
                      // 秒数
                      var second = Math.floor(micro_second / 1000);
                      // 小时位
                      var day = Math.floor(second / 86400);
                      if (day < 10) {
                        day = '0' + day;
                      }
                      var hr = Math.floor((second - day * 86400) / 3600);
                      // 分钟位
                      if (hr < 10) {
                        hr = '0' + hr;
                      }
                      var min = Math.floor((second - hr * 3600 - day * 86400) / 60);
                      if (min < 10) {
                        min = '0' + min;
                      }
                      // 秒位
                      var sec = (second - hr * 3600 - min * 60 - day * 86400); // equal to => var sec = second % 60;
                      // 毫秒位，保留2位
                      if (sec < 10) {
                        sec = '0' + sec;
                      }
                      var micro_sec = Math.floor((micro_second % 1000) / 10);
                      return day + ":" + hr + ":" + min + ":" + sec;
                    }

                    setInterval(function () {
                      Countdown -= 1000;
                      var time = dateformat(Countdown);
                      var splitArr = time.split(":");
                      var _Countdown = [{
                        day: splitArr[0],
                        hr: splitArr[1],
                        min: splitArr[2],
                        sec: splitArr[3],
                      }];
                       // console.log(_Countdown);
                       // console.log(_Countdown[0].day);
                       // console.log(_Countdown[0].hr);
                       // console.log(_Countdown[0].min);
                       // console.log(_Countdown[0].sec);
                       $("#time1").text(_Countdown[0].min);
                       $("#time2").text(_Countdown[0].sec);
                    }, 1000)

                  } else {
                    countDown_tatic: false
                  }

                  begin_time = time(begin_time, 1);
            //倒计时结束
            }else{
                if(status == 'deliver'){  //非待付款
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
                $(".true").hide();
                $(".false").show();
                $("#out_trade_no").text(data.data.orderDetail.out_trade_no);
             }
            
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

