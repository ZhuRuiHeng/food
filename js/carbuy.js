 


    //缓存拿收货地址
    var receiver1 = localStorage.getItem("receiver1");
    var phone1    = localStorage.getItem("phone1");
    var address1  = localStorage.getItem("address1");
    var gouwu = JSON.parse(localStorage.getItem("gouwu")); //缓存拿数据
    console.log(gouwu);
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
    var totalPrice  = getParam().totalPrice;
    $(".allPrice").html(totalPrice);
    //留言
    $(function(){  
        $('#message').bind('input propertychange', function() {  
            var message = $('#message').val();
            console.log(message);
        });  
    }) 
    //循环列表
        if( gouwu.length != 0){
          var informArr="";
          for(var i=0;i< gouwu.length;i++){
            var informStr=("<div class=\"weui-panel__bd\" id=\"gid"+gouwu[i].gid+"\">"+
                                "<a href=\"javascript:;\" class=\"weui-media-box weui-media-box_appmsg\">"+
                                    "<div class=\"weui-media-box__hd\">"+
                                        "<img src=\""+gouwu[i].figure+"\" class=\"weui-media-box__thumb\">"+
                                    "</div>"+
                                    "<div class=\"weui-media-box__bd\">"+
                                        "<h4 class=\"weui-media-box__desc\" id=\"good_name\">"+gouwu[i].good_name+"</h4>"+
                                        "<p  class=\"chicun\" id=\"types\">"+gouwu[i].detail+"</p>"+
                                        "<div class=\"weui-cell caozuo\">"+
                                            "<div class=\"weui-cell__bd service-price\">"+
                                                "<p> ￥<span class=\"nowPrice\">"+gouwu[i].price+"</span></p>"+
                                            "</div>"+
                                            "<div class=\"weui-cell__ft service-gouwu service\">x <span id=\"num\">"+gouwu[i].number+"</span></div>"+
                                        "</div>"+
                                    "</div>"+
                                "</a>"+
                            "</div>");
                informArr+=informStr;
          }
          document.getElementById("list").innerHTML=informArr;
    }
 
