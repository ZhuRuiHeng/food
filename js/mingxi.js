    $(document).ready(function(){
        $.ajax({
            type:"get",
            url : apiRoot+'/api/commission-list?sign='+sign+'&operator_id='+ operator_id,
            data:{
                page:1
            },
            dataType : 'json',
            success : function(data){
                console.log(data); 
                var commissionList = data.data.commissionList;
                if(commissionList.length!=0){
                    $(".nullCar,.noOrder").hide();
                      var informArr="";
                      for(var i=0;i< commissionList.length;i++){
                        var informStr="<div class=\"weui-panel__bd daili\">"+
                                            "<a href=\"javascript:void(0);\" class=\"weui-media-box weui-media-box_appmsg\">"+
                                                "<div class=\"weui-media-box__hd\">"+
                                                    "<img class=\"weui-media-box__thumb\" src=\""+commissionList[i].avatarurl+"\" alt=\"\">"+
                                                "</div>"+
                                                "<div class=\"weui-media-box__bd\">"+
                                                    "<h4 class=\"weui-media-box__title\">"+
                                                    "<img class=\"star\" src=\"../images/star.png\">"+commissionList[i].wx_name+"<span class=\"littleMeb\">2</span></h4>"+
                                                    "<p class=\"weui-media-box__desc\">成为代理商时间："+commissionList[i].sharer_time+"</p>"+
                                                "</div>"+
                                                "<div class=\"weui-media-box__hd right\">"+
                                                    ""+commissionList[i].commission_fee+"</h4>"+
                                                "</div>"+
                                            "</a>"+
                                        "</div>";
                            informArr+=informStr;
                      }
                      document.getElementById("mingxi").innerHTML=informArr;
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