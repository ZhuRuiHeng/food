 var _addressList ='';
 $(document).ready(function(){
 	//默认地址
 	var checkgid = localStorage.getItem("gid1");
    $("#aid"+checkgid).addClass("checked").children("input").attr("checked",true);

    $.ajax({
          type:"get",
          url : apiRoot+'/api/address-list?sign='+sign+'&operator_id='+ operator_id,
          dataType : 'json',
          success : function(data){
              console.log(data);
              var addressList = data.data.addressList;
                 _addressList = data.data.addressList;
	            if( addressList.length != 0){
	              var informArr="";
	              for(var i=0;i< addressList.length;i++){
	                var informStr=" <div class=\"weui-cell weui-check__label relative\">"+
										"<div class=\"weui-cell__hd choice\" id=\"aid"+addressList[i].aid+"\">"+
											"<input type=\"checkbox\" class=\"\" name=\"checkbox1\" checked=\"checked\">"+
										"</div>"+
										"<div class=\"weui-cell__bd relative\">"+
											"<div class=\"weui-panel__bd\">"+
												"<a href=\"javascript:void(0);\" class=\"weui-media-box weui-media-box_appmsg\">"+
													"<div class=\"weui-media-box__bd\">"+
														"<h4 class=\"weui-media-box__desc\">"+
															"<span class=\"name\">"+
																""+addressList[i].receiver+""
																+"</span>，<span class=\"phone\">"+
																""+addressList[i].phone+""
																+"</span>"+
														"</h4>"+
														"<div class=\"weui-cell caozuo afterNone\">"+
															"<div class=\"weui-cell__bd service-price\">"+
																"<p>收货地址：<span class=\"add\">"+
																	""+addressList[i].area+addressList[i].address+""+
																	"</span></p>"+
															"</div>"+
														"</div>"+
													"</div>"+
													"<div class=\"weui-media-box__hd\" onclick=\"set(this,2,'"+addressList[i].receiver+"',"+addressList[i].phone+","+addressList[i].aid+",'"+addressList[i].area+"','"+addressList[i].address+"',"+addressList[i].postalcode+")\">"+
														"<img src=\"../images/bianji.png\" class=\"weui-media-box__thumb\">"+
													"</div>"+
												"</a>"+
											"</div>"+
										"</div>"+
									"</div>";
	                    informArr+=informStr;
	              }
	              document.getElementById("addressList").innerHTML=informArr;

	            }else{
	              console.log("null")
	            }
          },
          error:function(e){
              
          }
    });
 });
 function set(obj,type,receiver,phone,aid,area,address,postalcode){
 	console.log("编辑");
 	window.location.href="address.html?type="+type+'&receiver='+receiver+'&phone='+phone+'&aid='+aid+'&area='+area+'&aid='+aid+'&address='+address+'&postalcode='+postalcode;
 };
$(document).on("click",".choice",function(){
	if($(this).hasClass("checked")){
        $(this).removeClass("checked").children("input").attr("checked",false);
    }else{
        $(".choice").removeClass("checked").children("input").attr("checked",false);
        $(this).addClass("checked").children("input").attr("checked",true);
        var aid = $(this).attr('id');
        var receiver = $(this).parent('.relative').find(".name").html();
        var phone = $(this).parent('.relative').find(".phone").html();
        var add = $(this).parent('.relative').find(".add").html();
        console.log(receiver,phone,add);
        localStorage.setItem("aid1",aid);
        localStorage.setItem("receiver1",receiver);
        localStorage.setItem("phone1",phone);
        localStorage.setItem("address1",add);
        setTimeout(function(){
          	window.history.back();
        },300)
    }
});

