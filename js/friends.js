    $(document).ready(function(){
        $.ajax({
            type:"get",
            url : apiRoot+'/api/friend-list?sign='+sign+'&operator_id='+ operator_id,
            dataType : 'json',
            success : function(data){
                console.log(data); 
                var friendList = data.data.friendList;
                if(friendList.length!=0){
                    $(".nullCar,.noOrder").hide();
                  var informArr="";
                  for(var i=0;i< friendList.length;i++){
                    var informStr="<div class=\"weui-panel__bd daili\">"+
                                        "<a href=\"javascript:void(0);\" class=\"weui-media-box weui-media-box_appmsg\">"+
                                            "<div class=\"weui-media-box__hd\">"+
                                                "<img class=\"weui-media-box__thumb\" src=\""+friendList[i].avatarurl+"\" alt=\"\">"+
                                            "</div>"+
                                            "<div class=\"weui-media-box__bd\">"+
                                                "<h4 class=\"weui-media-box__title\">"+
                                                "<img class=\"star\" src=\"../images/star.png\">"+friendList[i].wx_name+"<span class=\"littleMeb\">2</span></h4>"+
                                                "<p class=\"weui-media-box__desc\">成为代理商时间："+friendList[i].sharer_time+"</p>"+
                                            "</div>"+
                                            "<div class=\"weui-media-box__hd right\">"+
                                                "<h4 class=\"weui-media-box__desc\">"+friendList[i].mid+"</h4>"+
                                                "<p class=\"weui-media-box__desc\">"+friendList[i].countMember+"个成员</p>"+
                                            "</div>"+
                                        "</a>"+
                                    "</div>";
                        informArr+=informStr;
                  }
                  document.getElementById("friends").innerHTML=informArr;
                }else{
                  console.log("null");
                  $(".nullCar,.noOrder").show();
                }
            },
            error:function(e){
                console.log(e);
            }
        })
    });
     $(document).on("click",".weui-navbar a",function(){
        $(".weui-navbar a").removeClass("weui-bar__item--on");
        $(this).addClass("weui-bar__item--on");
        var order = $(".weui-navbar a.weui-bar__item--on").attr("order");
        console.log(order);
        $.ajax({
            type:"get",
            url : apiRoot+'/api/friend-list?sign='+sign+'&operator_id='+ operator_id,
            data:{
                page : 1,
                order :order 
            },
            dataType : 'json',
            success : function(data){
                console.log(data); 
                var friendList = data.data.friendList;
                if(friendList.length!=0){
                    $(".nullCar,.noOrder").hide();
                  var informArr="";
                  for(var i=0;i< friendList.length;i++){
                    var informStr="<div class=\"weui-panel__bd daili\">"+
                                        "<a href=\"javascript:void(0);\" class=\"weui-media-box weui-media-box_appmsg\">"+
                                            "<div class=\"weui-media-box__hd\">"+
                                                "<img class=\"weui-media-box__thumb\" src=\""+friendList[i].avatarurl+"\" alt=\"\">"+
                                            "</div>"+
                                            "<div class=\"weui-media-box__bd\">"+
                                                "<h4 class=\"weui-media-box__title\">"+
                                                "<img class=\"star\" src=\"../images/star.png\">"+friendList[i].wx_name+"<span class=\"littleMeb\">2</span></h4>"+
                                                "<p class=\"weui-media-box__desc\">成为代理商时间："+friendList[i].sharer_time+"</p>"+
                                            "</div>"+
                                            "<div class=\"weui-media-box__hd right\">"+
                                                "<h4 class=\"weui-media-box__desc\">"+friendList[i].mid+"</h4>"+
                                                "<p class=\"weui-media-box__desc\">"+friendList[i].countMember+"个成员</p>"+
                                            "</div>"+
                                        "</a>"+
                                    "</div>";
                        informArr+=informStr;
                  }
                  document.getElementById("friends").innerHTML=informArr;
                }else{
                  console.log("null");
                  $(".nullCar,.noOrder").show();
                }
                
            },
            error:function(e){
                console.log(e);
            }
        })
     })