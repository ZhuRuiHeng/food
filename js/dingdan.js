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
    // 确认收货弹窗
     $(document).on("click", ".show-confirm,#show-confirm", function() {
        var oid = $(this).attr('name');
        console.log(oid);
        $("#tanchuang").show();
         $(".weui-dialog__ft a").click(function(){
            var s = $(this).attr('name');
            if(s=='1'){
               $("#tanchuang").hide();//no
            }else{
                //del
                $.ajax({
                    type:"get",
                    url : apiRoot+'/api/user-confirm-receipt?sign='+sign+'&operator_id='+ operator_id,
                    data: {
                        oid: oid
                    },
                    dataType : 'json',
                    success : function(data){
                        console.log(data); 
                        var status = data.status; 
                        if (status == 1) {
                            $.toast("确认收货成功", "text");
                            location.reload();//刷新页面
                        } else {
                            $.toast("确认收货失败", "text");
                        }
                        $("#tanchuang").hide();
                    },
                    error:function(e){
                        console.log(e);
                        //$.toast("您取消了确认收货", "text");
                    }
                });
            }
         })
         
     })
    /**
     * 页面加载完毕打印键值对对象
     */
    window.onload = function () {
        var status = getParam().status;
        console.log(status);
        if (status == 'payment') {
            $(".find_nav_list ul li").removeClass("find_nav_cur");
            $("#payment").addClass("find_nav_cur");
        }else if(status == 'deliver'){
            $(".find_nav_list ul li").removeClass("find_nav_cur");
            $("#deliver").addClass("find_nav_cur");
        }else if(status == 'receipt'){
            $(".find_nav_list ul li").removeClass("find_nav_cur");
            $("#receipt").addClass("find_nav_cur");
        }else if(status == 'finish'){
            $(".find_nav_list ul li").removeClass("find_nav_cur");
            $("#finish").addClass("find_nav_cur");
        }else if(status == 'all'){
            $(".find_nav_list ul li").removeClass("find_nav_cur");
            $("#all").addClass("find_nav_cur");
        }
        // 订单
        $.ajax({
            type:"get",
            url : apiRoot+'/api/order-list?sign='+sign+'&operator_id='+ operator_id,
            data: {
                  status: status
            },
            dataType : 'json',
            success : function(data){
                console.log(data);  
                var orderList = data.data.orderList;
                if( orderList.length != 0){
                $(".noOrder").hide();
                 var informArr="";
                  for(var i=0;i< orderList.length;i++){
                    var informStr="<div class=\"weui-panel weui-panel_access\">"+
                                        "<div class=\"weui-cells marginNone write\">"+
                                            "<a href=\"javascript:;\" class=\"weui-cell weui-cell_access shopTitle\">"+
                                                "<div class=\"weui-cell__bd\">"+
                                                    "<p>"+ "店铺："+orderList[i].store_name+""
                                                            if(orderList[i].status=='payment'){
                                                               informStr+="<span class=\"red\">待付款</span>";
                                                            }else if(orderList[i].status=='deliver'){
                                                                informStr+="<span class=\"red\">待发货</span>";
                                                            }else if(orderList[i].status=='receipt'){
                                                                informStr+="<span class=\"red\">待收货</span>";
                                                            }else if(orderList[i].status=='finish'){
                                                                informStr+="<span class=\"red\">已完成</span>";
                                                            }else if(orderList[i].status=='close'){
                                                                informStr+="<span class=\"red\">交易关闭</span>";
                                                            }
                                            informStr+= "</p>"+
                                                    "<p class=\"bianhao\">"+
                                                        "订单编号："+orderList[i].out_trade_no+""+
                                                    "</p>"+
                                                "</div>"+
                                            "</a>"+
                                        "</div>"+
                                        "<div class=\"weui-panel__bd addBefore\">"+
                                            "<a href=\"javascript:;\" class=\"weui-media-box weui-media-box_appmsg\">"+
                                                "<div class=\"weui-media-box__hd\">"+
                                                        "<img src=\""+orderList[i].figure+" \""+
                                                        "class=\"weui-media-box__thumb\">"+
                                                    "</div>"+
                                                    "<div class=\"weui-media-box__bd\">"+
                                                        "<div class=\"spTtle\">"+
                                                            "<p class=\"left\">";
                                                                if(orderList[i].type==1){
                                                                    informStr+="<span class=\"coubg\">拼团</span>"
                                                                }else if(orderList[i].type==2){
                                                                    informStr+="<span class=\"coubg\">秒杀</span>"
                                                                }else{

                                                                }
                                                            informStr+=orderList[i].good_name+"</p>"+
                                                            "<p class=\"right\">￥"+orderList[i].price+"</p>"+
                                                        "</div>"+
                                                    "<div class=\"spNum\">"+
                                                        "<p class=\"left\">"+orderList[i].attribute_value+"</p>"+
                                                        "<p class=\"right\">x"+orderList[i].number+"</p>"+
                                                    "</div>"+
                                                "</div>"+
                                            "</a>"+
                                        "</div>"+
                                        "<div class=\"weui-cell cell-padding\">"+
                                            "<div class=\"weui-cell__bd\">"+
                                                "<p></p>"+
                                            "</div>"+
                                            "<div class=\"weui-cell__ft heji\">合计：<span class=\"red\">￥"+orderList[i].price*orderList[i].number+"</span></div>"+
                                        "</div>"+
                                        "<div class=\"weui-cell cell-padding beforeNone\">"+
                                            "<div class=\"weui-cell__bd\">"+
                                                "<p></p>"+
                                            "</div>"+
                                            "<div class=\"weui-cell__ft\">"
                                                if(orderList[i].status=='payment'){
                                                   informStr+= "<span class=\"button\">确认付款</span> ";
                                                }else if(orderList[i].status=='deliver'){
                                                    // informStr+= "<span class=\"button\">"确认付款"</span> ";
                                                }else if(orderList[i].status=='receipt'){
                                                    informStr+= "<span class=\"button show-confirm\" name=\""+orderList[i].order_id+"\">确认收货</span> ";
                                                }else if(orderList[i].status=='finish'){
                                                    // informStr+= "<span class=\"button\">"确认收货"</span> ";
                                                }else{
                                                    
                                                }
                                            informStr+= "</div>"+
                                        "</div>"+
                                    "</div>";
                        informArr+=informStr;
                  }
                  document.getElementById("dingdan").innerHTML=informArr;

                }else{
                  console.log("null")
                }
            },
            error:function(e){
                console.log(e)
            }
        });
    }


    // 切换
   $(document).on("click",".find_nav_list ul li",function(){//修改成这样的写法  
        var status = $(this).attr("id");
        $(".find_nav_list ul li").removeClass("find_nav_cur");
        $(this).addClass("find_nav_cur");
        // 订单
        $.ajax({
            type:"get",
            url : apiRoot+'/api/order-list?sign='+sign+'&operator_id='+ operator_id,
            data: {
                status:status
            },
            dataType : 'json',
            success : function(data){
                console.log(status);
                console.log(data);  
                var orderList = data.data.orderList;
               if( orderList.length != 0){
                  var informArr="";
                  for(var i=0;i< orderList.length;i++){
                   var  informStr="<div class=\"weui-panel weui-panel_access\">"+
                                        "<div class=\"weui-cells marginNone write\">"+
                                            "<a href=\"javascript:;\" class=\"weui-cell weui-cell_access shopTitle\">"+
                                                "<div class=\"weui-cell__bd\">"+
                                                    "<p>"+ "店铺："+orderList[i].store_name+""
                                                            if(orderList[i].status=='payment'){
                                                               informStr+="<span class=\"red\">待付款</span>";
                                                            }else if(orderList[i].status=='deliver'){
                                                                informStr+="<span class=\"red\">待发货</span>";
                                                            }else if(orderList[i].status=='receipt'){
                                                                informStr+="<span class=\"red\">待收货</span>";
                                                            }else if(orderList[i].status=='finish'){
                                                                informStr+="<span class=\"red\">已完成</span>";
                                                            }else if(orderList[i].status=='close'){
                                                                informStr+="<span class=\"red\">交易关闭</span>";
                                                            }
                                            informStr+= "</p>"+
                                                    "<p class=\"bianhao\">"+
                                                        "订单编号："+orderList[i].out_trade_no+""+
                                                    "</p>"+
                                                "</div>"+
                                            "</a>"+
                                        "</div>"+
                                        "<div class=\"weui-panel__bd addBefore\">"+
                                            "<a href=\"javascript:;\" class=\"weui-media-box weui-media-box_appmsg\">"+
                                                "<div class=\"weui-media-box__hd\">"+
                                                        "<img src=\""+orderList[i].figure+" \""+
                                                        "class=\"weui-media-box__thumb\">"+
                                                    "</div>"+
                                                    "<div class=\"weui-media-box__bd\">"+
                                                        "<div class=\"spTtle\">"+
                                                            "<p class=\"left\">";
                                                                if(orderList[i].type==1){
                                                                    informStr+="<span class=\"coubg\">拼团</span>"
                                                                }else if(orderList[i].type==2){
                                                                    informStr+="<span class=\"coubg\">秒杀</span>"
                                                                }else{

                                                                }
                                                            informStr+=orderList[i].good_name+"</p>"+
                                                            "<p class=\"right\">￥"+orderList[i].price+"</p>"+
                                                        "</div>"+
                                                    "<div class=\"spNum\">"+
                                                        "<p class=\"left\">"+orderList[i].attribute_value+"</p>"+
                                                        "<p class=\"right\">x"+orderList[i].number+"</p>"+
                                                    "</div>"+
                                                "</div>"+
                                            "</a>"+
                                        "</div>"+
                                        "<div class=\"weui-cell cell-padding\">"+
                                            "<div class=\"weui-cell__bd\">"+
                                                "<p></p>"+
                                            "</div>"+
                                            "<div class=\"weui-cell__ft heji\">合计：<span class=\"red\">￥"+orderList[i].price*orderList[i].number+"</span></div>"+
                                        "</div>"+
                                        "<div class=\"weui-cell cell-padding beforeNone\">"+
                                            "<div class=\"weui-cell__bd\">"+
                                                "<p></p>"+
                                            "</div>"+
                                            "<div class=\"weui-cell__ft\">"
                                                if(orderList[i].status=='payment'){
                                                   informStr+= "<span class=\"button\">确认付款</span> ";
                                                }else if(orderList[i].status=='deliver'){
                                                    // informStr+= "<span class=\"button\">"确认付款"</span> ";
                                                }else if(orderList[i].status=='receipt'){
                                                    informStr+= "<span class=\"button show-confirm\" name=\""+orderList[i].order_id+"\">确认收货</span> ";
                                                }else if(orderList[i].status=='finish'){
                                                    // informStr+= "<span class=\"button\">"确认收货"</span> ";
                                                }
                                            informStr+= "</div>"+
                                        "</div>"+
                                    "</div>";
                        informArr+=informStr;
                  }
                  document.getElementById("dingdan").innerHTML=informArr;

                }else{
                  console.log("null");
                  $(".noOrder").show();
                  document.getElementById("dingdan").innerHTML='';
                }
            },
            error:function(e){
                console.log(e)
            }
        });
    });
    //分页
    var loading = false;
    var page = 1;
    $(document.body).infinite().on("infinite", function() {
        var oldPage = page;
        var reqPage = oldPage + 1;
       console.log("成功");
        if(loading) return;
        loading = true;
        $("#loadMsg").show();
        $.ajax({
              type: "get",
              async: false,
              url: apiRoot+'/api/goods-list?sign='+sign+'&operator_id='+ operator_id,
              data: {
                //page: reqPage
                status: status
              },
              cache: false,
              dataType: "json",
              success : function(data){
                    console.log(status);
                    console.log(data);  
                    var orderList = data.data.orderList;
                    if( orderList.length != 0){
                      var informArr="";
                      for(var i=0;i< orderList.length;i++){
                       var  informStr="<div class=\"weui-panel weui-panel_access\">"+
                                            "<div class=\"weui-cells marginNone write\">"+
                                                "<a href=\"javascript:;\" class=\"weui-cell weui-cell_access shopTitle\">"+
                                                    "<div class=\"weui-cell__bd\">"+
                                                        "<p>"+ "店铺："+orderList[i].store_name+""
                                                                if(orderList[i].status=='payment'){
                                                                   informStr+="<span class=\"red\">待付款</span>";
                                                                }else if(orderList[i].status=='deliver'){
                                                                    informStr+="<span class=\"red\">待发货</span>";
                                                                }else if(orderList[i].status=='receipt'){
                                                                    informStr+="<span class=\"red\">待收货</span>";
                                                                }else if(orderList[i].status=='finish'){
                                                                    informStr+="<span class=\"red\">已完成</span>";
                                                                }else if(orderList[i].status=='close'){
                                                                    informStr+="<span class=\"red\">交易关闭</span>";
                                                                }
                                                informStr+= "</p>"+
                                                        "<p class=\"bianhao\">"+
                                                            "订单编号："+orderList[i].out_trade_no+""+
                                                        "</p>"+
                                                    "</div>"+
                                                "</a>"+
                                            "</div>"+
                                            "<div class=\"weui-panel__bd addBefore\">"+
                                                "<a href=\"javascript:;\" class=\"weui-media-box weui-media-box_appmsg\">"+
                                                    "<div class=\"weui-media-box__hd\">"+
                                                            "<img src=\""+orderList[i].figure+" \""+
                                                            "class=\"weui-media-box__thumb\">"+
                                                        "</div>"+
                                                        "<div class=\"weui-media-box__bd\">"+
                                                            "<div class=\"spTtle\">"+
                                                                "<p class=\"left\">";
                                                                    if(orderList[i].type==1){
                                                                        informStr+="<span class=\"coubg\">拼团</span>"
                                                                    }else if(orderList[i].type==2){
                                                                        informStr+="<span class=\"coubg\">秒杀</span>"
                                                                    }else{

                                                                    }
                                                                informStr+=orderList[i].good_name+"</p>"+
                                                                "<p class=\"right\">￥"+orderList[i].price+"</p>"+
                                                            "</div>"+
                                                        "<div class=\"spNum\">"+
                                                            "<p class=\"left\">"+orderList[i].attribute_value+"</p>"+
                                                            "<p class=\"right\">x"+orderList[i].number+"</p>"+
                                                        "</div>"+
                                                    "</div>"+
                                                "</a>"+
                                            "</div>"+
                                            "<div class=\"weui-cell cell-padding\">"+
                                                "<div class=\"weui-cell__bd\">"+
                                                    "<p></p>"+
                                                "</div>"+
                                                "<div class=\"weui-cell__ft heji\">合计：<span class=\"red\">￥"+orderList[i].price*orderList[i].number+"</span></div>"+
                                            "</div>"+
                                            "<div class=\"weui-cell cell-padding beforeNone\">"+
                                                "<div class=\"weui-cell__bd\">"+
                                                    "<p></p>"+
                                                "</div>"+
                                                "<div class=\"weui-cell__ft\">"
                                                    if(orderList[i].status=='payment'){
                                                       informStr+= "<span class=\"button\">确认付款</span> ";
                                                    }else if(orderList[i].status=='deliver'){
                                                        // informStr+= "<span class=\"button\">"确认付款"</span> ";
                                                    }else if(orderList[i].status=='receipt'){
                                                        informStr+= "<span class=\"button show-confirm\" name=\""+orderList[i].order_id+"\">确认收货</span> ";
                                                    }else if(orderList[i].status=='finish'){
                                                        // informStr+= "<span class=\"button\">"确认收货"</span> ";
                                                    }
                                                informStr+= "</div>"+
                                            "</div>"+
                                        "</div>";
                            informArr+=informStr;
                      }
                      document.getElementById("dingdan").innerHTML=informArr;

                    }else{
                      console.log("null");
                      $(".noOrder").show();
                      document.getElementById("dingdan").innerHTML='';
                    }
              },
              error:function(e){
                console.log(e)
              }
        });
        loading = false;
    });