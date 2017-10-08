

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
var gid = getParam().gid;
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


$(document).on("click",".del",function(){//修改成这样的写法  
    $(this).parents("#carBox").hide();
});
    /**
     * 页面加载完毕打印键值对对象
     */
    window.onload = function () {
        $.showLoading();//加载
        var gid = getParam().gid;
        $.ajax({
            type:"get",
             url : apiRoot+'/api/goods-detail?sign='+sign+'&operator_id='+ operator_id,
            data: {
              gid: gid
            },
            dataType : 'json',
            success : function(data){
                console.log(data);  
                //是否收藏
                var is_collect = data.data.goodsDetail.is_collect;
                if(is_collect == 1){
                    $("#qiehuan").attr('src','../images/love.png'); 
                }
                $(".good_name").html(data.data.goodsDetail.good_name);
                $("#expenses").html(data.data.goodsDetail.expenses);
                $("#good_name").html(data.data.goodsDetail.good_name);
                if(data.data.goodsDetail.high_price==data.data.goodsDetail.low_price){
                    $(".high_price").html(); 
                }else{
                    $(".high_price").html('~'+data.data.goodsDetail.high_price);
                }
                $(".low_price").html(data.data.goodsDetail.low_price);
                $("#sales_volume").html(data.data.goodsDetail.sales_volume);
                $(".total_stock").html(data.data.goodsDetail.total_stock);
                // 轮播
                var picture = data.data.goodsDetail.picture; 
                if(picture.length != 0){
                  var informArr1="";
                  var informArr2="";
                  for(var i=0;i<picture.length;i++){
                    var informStr1="<div class=\"swiper-slide\">"+
                                      "<img src=\""+picture[i]+"\" alt=\"\">"+
                                  "</div>";
                    var informStr2 ="<span class=\"swiper-pagination-bullet\"></span>";
                        informArr1+=informStr1;
                        informArr2+=informStr2;
                    }
                  document.getElementById("swiper").innerHTML=informArr1;
                  document.getElementById("pagination").innerHTML=informArr2;
                  $("#pagination .swiper-pagination-bullet:first-child").addClass('swiper-pagination-bullet-active');
                 
                }else{
                  console.log("null")
                }
                //图片详情
                var content = data.data.goodsDetail.content;
                if(content.length != 0){
                  var informArr1="";
                  for(var i=0;i<content.length;i++){
                        if(content[i].length == 0){
                            content[i]==picture[0]
                        }else if(content[i].length != 0){
                            var informStr1="<img src="+content[i]+">";
                            informArr1+=informStr1;
                        }
                   }
                  document.getElementById("allImg").innerHTML=informArr1;
                }else{
                  console.log("null")
                }
                //属性
                var attribute = data.data.goodsDetail.attribute;
                if(attribute.length!=0){
                    var informArr1="";
                    for(var i=0;i<attribute.length;i++){
                        var informStr1="<i>"+attribute[i].attribute_name+"</i>";
                        informArr1+=informStr1;
                    }
                    document.getElementById("shuxing").innerHTML=informArr1;
                }else{
                    $("#xuanze").hide;
                }
                $.hideLoading();//加载完成
            },
            error:function(e){
                console.log(e)
            }
        });
    }

//加入购物车
 function addCar(){
    $("#carBox").show();
    var gid = getParam().gid;
    console.log(gid);
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
//收藏
function like(){
    var num = $("input.num").val();
    var attribute = "";//先默认为空
    //console.log(gid,num,attribute)
    $.ajax({
        type:"get",
        url : apiRoot+'/api/collect-goods?sign='+sign+'&operator_id='+ operator_id,
        data: {
          gid: gid
        },
        dataType : 'json',
        success : function(data){
            console.log(data);  
            if(data.status==1){
                $.toast("收藏成功！");
                $("#qiehuan").attr('src','../images/love.png'); 
            }else{
                 $.ajax({
                    type:"get",
                    url : apiRoot+'/api/remove-collection?sign='+sign+'&operator_id='+ operator_id,
                    data: {
                      gid: gid
                    },
                    dataType : 'json',
                    success : function(data){
                        console.log(data);  
                        $.toast("取消收藏成功！");
                        $("#qiehuan").attr('src','../images/like.png'); 
                       
                    },
                    error:function(e){
                        console.log(e)
                    }
                });
            }
            
        },
        error:function(e){
            console.log(e)
        }
    });
}