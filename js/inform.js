
var good_name = '';
var low_price = "";
var _low_price = "";//传下页面
var poster    = "";
var _picture  = "";//商品小图
var _priceGroup = "";//价格表
var _attr     = ""; //在价格表里查找
var _attr1    = "";//传下页面
var nowPrice  = "";
var types     = "";//型号
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

$(".swiper-container").swiper({
      loop: true,
      autoplay: 3000
});
$(".share").click(function(){
  $(".shareBox").show();
})
$(".zhuangfa").click(function(){
    console.log(22);
    $(".shareImg,.bodybg").show();
})
$(".bodybg").click(function() {
   $(".shareImg,.bodybg").hide();
});
$(".weui-gallery").click(function() {
   $(".weui-gallery").hide();
});
$("#haibao").on("click",function() {
   window.location.href="share.html?good_name="+good_name+"&low_price="+low_price+"&poster="+poster+"";
});

// 加减
function bindMinus () {
    var num = $("input.num").val();
    var shuliang = $("span.shuliang").val();
    var total_stock = $(".total_stock").html();
    
    if (num > 1) {
        num--;
        total_stock++;
    }
    //console.log('total_stock:',total_stock);
    $(".total_stock").html(total_stock);
    total_stock == total_stock;
    $('input.num').val(num);
    shuliang == num;
}
/* 点击加号 */
function bindPlus() {
    var num = $("input.num").val();
    var shuliang = $("span.shuliang").val();
    var total_stock = $(".total_stock").html();
    num++;
    if (total_stock > 1) {
        total_stock--;
    }
    //console.log('total_stock:',total_stock);
    $(".total_stock").html(total_stock);
    total_stock == total_stock;
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
    $(document).ready(function(){
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
                    _low_price = data.data.goodsDetail.low_price;
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
                //赋值海报值
                good_name = data.data.goodsDetail.good_name;
                low_price = data.data.goodsDetail.low_price;
                poster    = data.data.goodsDetail.picture[0];
                // 轮播
                var picture = data.data.goodsDetail.picture; 
                   _picture  = data.data.goodsDetail.picture[0];
                if(picture.length != 0){
                  var informArr0="";
                  var informArr1="";
                  var informArr2="";
                  for(var i=0;i<picture.length;i++){
                    // var informStr1="<div class=\"swiper-slide\">"+
                    //                   "<img src=\""+picture[i]+"\" alt=\"\">"+
                    //               "</div>";
                    // var informStr2 ="<span class=\"swiper-pagination-bullet\"></span>";
                   var informStr0="<div class=\"swiper-slide\"><img src=\""+picture[i]+"\"></div>";
                    // var informStr0="<div class=\"swiper-slide\" style=\"background: url("+carouselGoods[i].icon+") no-repeat;text-align: center;background-size:100%;\"></div>"
                    var informStr1 ="<div class=\"swiper-slide\"><img src=\""+picture[0]+"\"></div>";
                    var informStr2 ="<span class=\"swiper-pagination-bullet \"></span>"
                    informArr0+=informStr0;
                    informArr1=informArr0+informStr1;
                    informArr2+=informStr2;
                  }
                  document.getElementById("swiper").innerHTML=informArr0;
                  //document.getElementById("pagination").innerHTML=informArr2;
                  //$("#pagination .swiper-pagination-bullet:first-child").addClass('swiper-pagination-bullet-active');
                   var mySwiper = new Swiper('.swiper-container',{ 
                        autoplay : 3000,//自动运行 
                        direction: 'horizontal',//水平方向 
                        loop : true,//可以循环点击 
                        pagination : '.swiper-pagination',//点 
                        paginationClickable: true,
                    }); 
                 
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
    })

//加入购物车
 function addCar(obj,id){
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
                                                            informArr+= "<div class=\"text white\" onclick=\"xuanze(this,"+goodsDetail.attribute[0].anid+","+goodsDetail.attribute[0].attribute_value[k].active+","+goodsDetail.attribute[0].attribute_value[k].avid+",'"+goodsDetail.attribute[0].attribute_value[k].figure+"')\"    data-active=\""+goodsDetail.attribute[0].attribute_value[k].active+"\" name=\""+goodsDetail.attribute[0].attribute_value[k].avid+"\"  \">"+goodsDetail.attribute[0].attribute_value[k].attribute_value+"</div>";
                                                        };
                                      informArr+= "</div>"+
                                      "</div>"+
                                    "</div>"
                                    }
                                }
                           informArr+="<div class=\"mid\" style=\"padding:10px\">"+
                                          "<div class=\"buy\">"+
                                              "<span class=\"shuliang\">购买数量：<i class=\"shuliang\">1</i></span>"+
                                              "<span class=\"gray\">剩余<i class=\"total_stock\">"+goodsDetail.total_stock+"</i>件</span>"+
                                          "</div>"+
                                          "<div class=\"num\">"+
                                              "<button class=\"reduce\" onclick=\"bindMinus()\">-</button>"+
                                               "<input type=\"number\"  value=\"1\" class=\"num\" readonly=\"readonly\"/>"+
                                              "<button class=\"add normal\" onclick=\"bindPlus()\">+</button>"+
                                          "</div>"+
                                      "</div>";
                                      if(id==1){
                                          informArr+="<div class=\"btn\">"+
                                            "<button class=\"addCar\" onclick=\"addCars(this,"+gid+")\">加入购物车</button>"+
                                            "<button class=\"buy\" >立即购买</button>"+
                                          "</div>";
                                      }else if(id==2){
                                        informArr+="<div class=\"btn\">"+
                                            "<button class=\"addCar buy\" onclick=\"addCars(this,"+gid+")\">确定</button>"+
                                          "</div>";
                                      }
                                      else if(id==3){
                                        informArr+="<div class=\"btn\">"+
                                            "<button class=\"addCar buy\" onclick=\"buy(this,"+gid+")\">下一步</button>"+
                                          "</div>";
                                      }
                             informArr+= "</div>"
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
    types    = $(obj).html();
    console.log("types",types);
    var attr  = 'attr'+anid+':'+avid;
    var attr1 = anid+':'+avid;
    _attr  = attr;
    _attr1 = attr1;
    if(figure == ''){ //if figure没有新图片则用大图_picture
        figure = _picture;
    }
    $(".left img").attr("src",""+figure+"");
    $(".leibie .text").removeClass("red");
    $(obj).addClass("red");
    setTimeout(function () {     // 获取当前商品的选中状态
      for (var i = 0; i < _priceGroup.length; i++) {
           console.log(_attr);
          if (_priceGroup[i].key == _attr) {
            console.log("iiiiii", i);
            var i = i;
            nowPrice = _priceGroup[i].price;
            console.log('nowPrice:', nowPrice);
            $(".low_price").text(nowPrice);
            $(".high_price").parent("span").hide();
          }
      }
     
    },100)
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
                $("#carBox").hide();
            }else{
              $.toast("加入购物车失败！", "text");
            }
            
        },
        error:function(e){
            console.log(e)
        }
    });
}
//购买
function buy(obj,gid){
    var num = $("input.num").val();
    var attr  = _attr1;
    console.log(nowPrice);
    if(!nowPrice){
      nowPrice = _low_price;
    }
    window.location.href="buy.html?gid="+gid +"&nowPrice="+nowPrice +"&attr="+attr+"&num="+num+"&types="+types;
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


    
   
      // 合成图片
      //document.createElement("canvas").toDataURL();
      // $("#haibao").on("click", function() {  
      //     $(".haibao").show();
      //     setTimeout(function(){
      //       // event.preventDefault();  
      //               html2canvas(document.body, {  
      //                 allowTaint: true,  
      //                 taintTest: false,  
      //                 onrendered: function(canvas) {  
      //                     canvas.id = "mycanvas";  
      //                     //document.body.appendChild(canvas);  
      //                     //生成base64图片数据  
      //                     var dataUrl = canvas.toDataURL();  
      //                     var newImg = document.createElement("img");  
      //                     //newImg.id=newimg;
      //                     newImg.src =  dataUrl;  
      //                     console.log(newImg);
      //                     $("#newsimg").html(newImg);
      //                     $("#demo").hide();
      //                     //document.body.appendChild(newImg);  
      //                 } 
      //       })
      //       },1000);  
      //   }); 