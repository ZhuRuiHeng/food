  //加入购物车
 var _attribute_value = '';
 var _goodsDetail = "";
 var _attr = ""; 
 var _priceGroup ="";
 var low_price = "";
 var high_price = "";
$(document).on("click",".del",function(){//修改成这样的写法  
    $(this).parents("#carBox").hide();
});

// 加减
function bindMinus () {
    var num = $("input.num").val();
    var shuliang = $("span.shuliang").val();
    if (num > 1) {
        num--;
    }
    $('input.num').val(num);
    shuliang == num;
}
/* 点击加号 */
function bindPlus() {
    var num = $("input.num").val();
    var shuliang = $("span.shuliang").val();
    num++;
    
   $('input.num').val(num);
   shuliang == num;
}

/* 输入框事件 */
function bindManual(e) {
    var num = $("input.num").val();
    // 将数值与状态写回 
   
}
 //跳转详情
function url(obj,gid){
    window.location.href="inform.html?gid="+gid;
}
//购买
 function addCar(obj,gid){
    $("#carBox").show();
    var gid = gid;
    //console.log(gid);
    //goods-detai
    $.ajax({
        type:"get",
        url : apiRoot+'/api/goods-detail?sign='+sign+'&operator_id='+ operator_id,
        data: {
          gid: gid
        },
        dataType : 'json',
        success : function(data){ 
            console.log(data);
            var  goodsDetail = data.data.goodsDetail;
            if(data.data.goodsDetail.attribute[0]==null){
                //alert(1);
                var attribute_value = "";
            }else{
                var  attribute_value = data.data.goodsDetail.attribute[0].attribute_value;
            }
            var  priceGroup  = data.data.goodsDetail.priceGroup;
                _goodsDetail = goodsDetail;
                _attribute_value = attribute_value;
                _priceGroup =priceGroup;
            console.log(attribute_value);
            console.log(goodsDetail);
            console.log(goodsDetail.attribute+'attribute'); 
            if( goodsDetail.length != 0){
              var informArr="";
              informArr = "<div class=\"weui-mask weui-mask--visible service\" ></div>"+
                          "<div class=\"carBox service\" >"+
                              "<div class=\"padding\">"+
                                "<div class=\"top\">"+
                                    "<div class=\"left\">"+
                                      "<image src=\" "+goodsDetail.picture[0]+" \"></image>"+
                                    "</div>"+
                                    "<div class=\"right\">"+
                                        "<span class=\"shuoming\">"+goodsDetail.good_name+"</span>"+
                                        "<span class=\"price\">";
                                        if(goodsDetail.low_price == goodsDetail.high_price){
                                             informArr+="<span>￥"+"<i class=\"low_price\">"+goodsDetail.low_price+"</i>"+"</span>"
                                        }else{
                                          informArr+="<span>￥"+"<i class=\"low_price\">"+goodsDetail.low_price+"</i>"+"</span> <span>~￥"+"<i class=\"high_price\">"+goodsDetail.high_price+"</i>"+"</span>"+
                                        "</span>"
                                        }
                                informArr+="</div>"+
                                    "<div class=\"del\" onclick=\"close()\">"+
                                        "<image src=\"https://qncdn.playonwechat.com/shangcheng/icon_close.png\" mode=\"widthFix\"></image>"+
                                    "</div>"+
                                "</div>";
                                if(goodsDetail.attribute!=''){
                                   var attrs = ''; 
                                    for(var j=0;j< goodsDetail.attribute.length;j++){
                                      informArr+="<div class=\"kuanshi\">"+
                                                    "<div class=\"title\">"+goodsDetail.attribute[0].attribute_name+"：</div>"+
                                                    "<div class=\"leibie\" >";
                                                        for(var k=0;k< goodsDetail.attribute[0].attribute_value.length;k++){
                                                            informArr+= "<div class=\"text white\" onclick=\"xuanze(this,"+goodsDetail.attribute[0].anid+","+goodsDetail.attribute[0].attribute_value[k].active+","+goodsDetail.attribute[0].attribute_value[k].avid+","+goodsDetail.attribute[0].attribute_value[k].figure+")\"    data-active=\""+goodsDetail.attribute[0].attribute_value[k].active+"\" name=\""+goodsDetail.attribute[0].attribute_value[k].avid+"\"  \">" +goodsDetail.attribute[0].attribute_value[k].attribute_value+"</div>";
                                                        };
                                      informArr+= "</div>"+
                                      "</div>"+
                                    "</div>"
                                    }
                                }
                           informArr+="<div class=\"mid\">"+
                                          "<div class=\"buy\">"+
                                              "<span class=\"shuliang\">购买数量：<i class=\"shuliang\">1</i></span>"+
                                              "<span class=\"gray\">剩余"+goodsDetail.total_stock+"件</span>"+
                                          "</div>"+
                                          "<div class=\"num\">"+
                                              "<button class=\"reduce\" onclick=\"bindMinus()\">-</button>"+
                                               "<input type=\"number\"  value=\"1\" class=\"num\" readonly=\"readonly\"/>"+
                                              "<button class=\"add normal\" onclick=\"bindPlus()\">+</button>"+
                                          "</div>"+
                                      "</div>"+
                                      "<div class=\"btn\">"+
                                          "<button class=\"addCar\" onclick=\"addCars(this,"+gid+")\">加入购物车</button>"+
                                          "<button class=\"buy\" >立即购买</button>"+
                                    "</div>"+
                             "</div>"
              document.getElementById("carBox").innerHTML=informArr;
            }else{
              console.log("null")
            }
        },
        error:function(e){
            console.log(e)
        }
    });
 }
 //////////////////////////////////////////////
  //选择型号
  function xuanze(obj,anid,active,avid,figure) {
    console.log(_attribute_value+':_attribute_value');
    console.log(_goodsDetail+':_goodsDetail');
    console.log(obj);
    console.log(anid);
    console.log(active);
    console.log(avid);
    console.log(figure);
    $(".leibie .text").removeClass("red");
    $(obj).addClass("red");
    setTimeout(function () {     // 获取当前商品的选中状态
      var active = true;
      for (var j = 0; j < _attribute_value.length; j++) {
          _attribute_value[j].active = false;
          if (avid == _attribute_value[j].avid) {
                _attribute_value[j].active = true;
               //console.log(attribute_value[j].active);
                var avid1 = _attribute_value[j].avid;
                var figure = _attribute_value[j].figure;
                if (figure != '') {
                  figure = _attribute_value[j].figure;
                } else {
                  figure = _goodsDetail.picture[0];
                  //console.log(figure);
                }

                var attr = anid+':'+avid;
                console.log(attr);
                _attr = attr;
          }
      }
     
      for (var i = 0; i < _priceGroup.length; i++) {
           //console.log(_priceGroup);
          if (_priceGroup[i].key == _attr) {
            console.log("iiiiii", i);
            var i = i;
            var nowPrice = _priceGroup[i].price;
            console.log('nowPrice:', nowPrice);
            $(".low_price").text(nowPrice);
            $(".high_price").parent("span").hide();
          }
      }
     
    })
  }
//////////////////////////////////////////

$.ajax({
    type:"get",
    url : apiRoot+'/api/my-collections?sign='+sign+'&operator_id='+ operator_id,
    dataType : 'json',
     success : function(data){
            console.log(data);  
             var myCollections = data.data.myCollections;
            if( myCollections.length != 0){
                $("#kong").hide();
                  var informArr="";
                  for(var i=0;i< myCollections.length;i++){
                    console.log(myCollections[i].picture);
                    var informStr="<div class=\"weui-panel weui-panel_access\">"+
                                        "<div class=\"weui-panel__bd\">"+
                                          "<a href=\"javascript:;\"  class=\"weui-media-box weui-media-box_appmsg\">"+
                                            "<div class=\"weui-media-box__hd\" onclick=\"url(this,"+myCollections[i].gid+")\">"+
                                                "<img class=\"weui-media-box__thumb\" src=\""+myCollections[i].picture+"\">"+
                                            "</div>"+
                                            "<div class=\"weui-media-box__bd\">"+
                                                "<h4 class=\"weui-media-box__desc\">"+myCollections[i].good_name+"</h4>"+
                                                "<div class=\"weui-cell caozuo\">"+
                                                    "<div class=\"weui-cell__bd service-price\">"+
                                                        "<p>￥"+myCollections[i].price+"</p>"+
                                                    "</div>"+
                                                    "<div class=\"weui-cell__ft service-gouwu service buy addCar\" onclick=\"addCar(this,"+myCollections[i].gid+")\">"+
                                                        "<img src=\"https://qncdn.playonwechat.com/shangcheng/car.png\">"+
                                                    "</div>"+
                                                "</div>"+
                                            "</div>"+
                                          "</a>"+
                                        "</div>"+
                                    "</div>";
                        informArr+=informStr;
                  }
              document.getElementById("shoucang").innerHTML=informArr;

            }else{
              $(".shoucang").hide();
              console.log("null")
            }
        },
        error:function(e){
            console.log(e)
        }
});

    //加入购物车
    function addCars(obj,gid){
        var num = $("input.num").val();
        var attribute = "";//先默认为空
        console.log(gid,num,attribute)
        $.ajax({
            type:"post",
            url : apiRoot+'/api/add-carts?sign='+sign+'&operator_id='+ operator_id,
            data: {
              gid: gid,
              num: num,
              attribute: attribute
            },
            dataType : 'json',
            success : function(data){
                console.log(data);  
                if(data.status==1){
                    $.toast("加入购物车成功！", "text");
                }else{
                  $.toast("加入购物车失败！", "text");
                }
                
            },
            error:function(e){
                console.log(e)
            }
        });
    }
