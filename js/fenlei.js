

 var _attribute_value = '';
 var _goodsDetail = "";
 var _attr = ""; 
 var _priceGroup ="";
 var low_price = "";
 var high_price = "";
 var html='';
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
            return obj;
        }catch(e){
            console.warn("没有参数");
        }
    };

    var cate_id = getParam().cate_id;
    var ind = getParam().ind;
    console.log(ind);
    console.log(cate_id);
    
$(document).ready(function(){
    $.showLoading();
    $.ajax({
          type:"get",
          url : apiRoot+'/api/get-category?sign='+sign+'&operator_id='+ operator_id,
          dataType : 'json',
          success : function(data){ 
              var  categorys   = data.categorys;//父列表
              var  contentTip  = categorys[ind];//当前子列表
              var  sonCategory = categorys[ind].sonCategory;//子导航
              console.log('categorys',categorys); //父列表
              console.log('contentTip',contentTip);//子列表
              console.log('sonCategory',sonCategory);//子导航
              //导航
            console.log('111*',sonCategory.length)
            if(sonCategory.length!=0){
                var tabs="";
                for(var i=0;i< sonCategory.length;i++){ 
                    //tab="<li cate_id="+sonCategory[i].cate_id+"><a href=\"javascript:void(0)\">"+sonCategory[i].cate_name+" </a></li>";
                    tab="<div cate_id="+sonCategory[i].cate_id+" class=\"swiper-slide\">"+sonCategory[i].cate_name+"</div>";
                    tabs+=tab;
                }
                $("#tab").html(tabs);
                $("#tab div:first-child").addClass('swiper-slide-active active');
                $("#tab div:nth-child(2)").addClass('swiper-slide-next');
            }else if(sonCategory.length==0){
                $("#header").hide();
            }
              setTimeout(function () {
                  var lengths = sonCategory.length;
                  if (lengths==0){  //无子cate_id
                        console.log("无子cate_id：", cate_id);
                        $.ajax({
                              type:"get",
                              url : apiRoot+'/api/goods-list?sign='+sign+'&operator_id='+ operator_id,
                              data: {
                                  cate_id: cate_id
                                },
                              dataType : 'json',
                              success : function(data){
                                  console.log("分类",data);  
                                  var  goodsList = data.data.goodsList;
                                  console.log(data.data.goodsList.length); 
                                  if( goodsList.length != 0){
                                    var informArr="";
                                    for(var i=0;i< goodsList.length;i++){
                                         informArr = "<div class=\"weui-mask weui-mask--visible service\" ></div>"+
                                                        "<div class=\"carBox service\" >"+
                                                          "<div class=\"padding\">"+
                                                            "<div class=\"top\">"+
                                                                "<div class=\"left\">"+
                                                                  "<image src=\" "+goodsList.picture+" \"></image>"+
                                                                "</div>"+
                                                                "<div class=\"right\">"+
                                                                    "<span class=\"shuoming\">"+goodsList.good_name+"</span>"+
                                                                    "<span class=\"price\">";
                                                                    if(goodsList.low_price == goodsList.high_price){
                                                                         informArr+="<span>￥"+"<i class=\"low_price\">"+goodsList.low_price+"</i>"+"</span>"
                                                                    }else{
                                                                      informArr+="<span>￥"+"<i class=\"low_price\">"+goodsList.low_price+"</i>"+"</span> <span>~￥"+"<i class=\"high_price\">"+goodsList.high_price+"</i>"+"</span>"+
                                                                    "</span>"
                                                                    }
                                                            informArr+="</div>"+
                                                                "<div class=\"del\" onclick=\"close()\">"+
                                                                    "<image src=\"https://qncdn.playonwechat.com/shangcheng/icon_close.png\" mode=\"widthFix\"></image>"+
                                                                "</div>"+
                                                            "</div>";
                                                        if(goodsList.attribute!=''){
                                                           var attrs = ''; 
                                                            for(var j=0;j< goodsList.attribute.length;j++){
                                                              informArr+="<div class=\"kuanshi\">"+
                                                                            "<div class=\"title\">"+goodsList.attribute[0].attribute_name+"：</div>"+
                                                                            "<div class=\"leibie\" >";
                                                                                for(var k=0;k< goodsList.attribute[0].attribute_value.length;k++){
                                                                                    informArr+= "<div class=\"text white\" onclick=\"xuanze(this,"+goodsList.attribute[0].anid+","+goodsList.attribute[0].attribute_value[k].active+","+goodsList.attribute[0].attribute_value[k].avid+","+goodsList.attribute[0].attribute_value[k].figure+")\"    data-active=\""+goodsList.attribute[0].attribute_value[k].active+"\" name=\""+goodsList.attribute[0].attribute_value[k].avid+"\"  \">" +goodsList.attribute[0].attribute_value[k].attribute_value+"</div>";
                                                                                };
                                                              informArr+= "</div>"+
                                                              "</div>"+
                                                            "</div>"
                                                            }
                                                        }
                                                   informArr+="<div class=\"mid\">"+
                                                                  "<div class=\"buy\">"+
                                                                      "<span class=\"shuliang\">购买数量：<i class=\"shuliang\">1</i></span>"+
                                                                      "<span class=\"gray\">剩余"+goodsList.total_stock+"件</span>"+
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
                                            }
                                      document.getElementById("goodsList").innerHTML=informArr;
                                  }else{
                                    $(".noOrder").show();
                                    console.log("null")
                                  }
                              },
                              error:function(e){
                                  console.log(e)
                              }
                          });
                  }else{ //有cate_id
                    cate_id = contentTip.sonCategory[0].cate_id;
                    console.log('cate_id:', cate_id);
                    $.ajax({
                              type:"get",
                              url : apiRoot+'/api/goods-list?sign='+sign+'&operator_id='+ operator_id,
                              data: {
                                  cate_id: cate_id
                                },
                              dataType : 'json',
                              success : function(data){
                                  console.log("分类",data);  
                                  var  goodsList = data.data.goodsList;
                                  console.log(data.data.goodsList.length); 
                                  if( goodsList.length != 0){
                                    var informArr="";
                                    for(var i=0;i< goodsList.length;i++){
                                         informArr = "<div class=\"weui-mask weui-mask--visible service\" ></div>"+
                                                        "<div class=\"carBox service\" >"+
                                                          "<div class=\"padding\">"+
                                                            "<div class=\"top\">"+
                                                                "<div class=\"left\">"+
                                                                  "<image src=\" "+goodsList.picture+" \"></image>"+
                                                                "</div>"+
                                                                "<div class=\"right\">"+
                                                                    "<span class=\"shuoming\">"+goodsList.good_name+"</span>"+
                                                                    "<span class=\"price\">";
                                                                    if(goodsList.low_price == goodsList.high_price){
                                                                         informArr+="<span>￥"+"<i class=\"low_price\">"+goodsList.low_price+"</i>"+"</span>"
                                                                    }else{
                                                                      informArr+="<span>￥"+"<i class=\"low_price\">"+goodsList.low_price+"</i>"+"</span> <span>~￥"+"<i class=\"high_price\">"+goodsList.high_price+"</i>"+"</span>"+
                                                                    "</span>"
                                                                    }
                                                            informArr+="</div>"+
                                                                "<div class=\"del\" onclick=\"close()\">"+
                                                                    "<image src=\"https://qncdn.playonwechat.com/shangcheng/icon_close.png\" mode=\"widthFix\"></image>"+
                                                                "</div>"+
                                                            "</div>";
                                                        if(goodsList.attribute!=''){
                                                           var attrs = ''; 
                                                            for(var j=0;j< goodsList.attribute.length;j++){
                                                              informArr+="<div class=\"kuanshi\">"+
                                                                            "<div class=\"title\">"+goodsList.attribute[0].attribute_name+"：</div>"+
                                                                            "<div class=\"leibie\" >";
                                                                                for(var k=0;k< goodsList.attribute[0].attribute_value.length;k++){
                                                                                    informArr+= "<div class=\"text white\" onclick=\"xuanze(this,"+goodsList.attribute[0].anid+","+goodsList.attribute[0].attribute_value[k].active+","+goodsList.attribute[0].attribute_value[k].avid+","+goodsList.attribute[0].attribute_value[k].figure+")\"    data-active=\""+goodsList.attribute[0].attribute_value[k].active+"\" name=\""+goodsList.attribute[0].attribute_value[k].avid+"\"  \">" +goodsList.attribute[0].attribute_value[k].attribute_value+"</div>";
                                                                                };
                                                              informArr+= "</div>"+
                                                              "</div>"+
                                                            "</div>"
                                                            }
                                                        }
                                                   informArr+="<div class=\"mid\">"+
                                                                  "<div class=\"buy\">"+
                                                                      "<span class=\"shuliang\">购买数量：<i class=\"shuliang\">1</i></span>"+
                                                                      "<span class=\"gray\">剩余"+goodsList.total_stock+"件</span>"+
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
                                            }
                                      document.getElementById("goodsList").innerHTML=informArr;
                                  }else{
                                    $(".noOrder").show();
                                    console.log("null")
                                  }
                              },
                              error:function(e){
                                  console.log(e)
                              }
                          });
                  }
               }, 300)
          },
          error:function(e){
              console.log(e)
          }
      });
      $.hideLoading();
})
$("#searchBar").click(function(){
    window.location.href="searchbar.html";
});
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
            var  goodsDetail = data.data.goodsDetail;
            var  attribute_value = data.data.goodsDetail.attribute[0].attribute_value;
            var  priceGroup  = data.data.goodsDetail.priceGroup;
                _goodsDetail = goodsDetail;
                _attribute_value = attribute_value;
                _priceGroup =priceGroup;
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
                                             informArr+="<span>￥"+goodsDetail.low_price+"</span>"
                                        }else{
                                          informArr+="<span>￥"+goodsDetail.low_price+"</span> ~<span>￥"+goodsDetail.high_price+"</span>"+
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


//切换

    $(function(){
        $(document).on("click","#tab div",function(){
            var _cate_id = $(this).attr("cate_id");//子cate_id
            $("#tab div").removeClass('active');
            $(this).addClass('active');
            console.log(_cate_id);
             $.ajax({
                  type:"get",
                  url : apiRoot+'/api/goods-list?sign='+sign+'&operator_id='+ operator_id,
                  data: {
                      cate_id: _cate_id
                    },
                  dataType : 'json',
                  success : function(data){
                      console.log("分类",data);  
                      var  goodsList = data.data.goodsList;
                      console.log(data.data.goodsList.length); 
                      if( goodsList.length != 0){
                        var informArr="";
                        for(var i=0;i< goodsList.length;i++){
                             informArr = "<div class=\"weui-mask weui-mask--visible service\" ></div>"+
                                            "<div class=\"carBox service\" >"+
                                              "<div class=\"padding\">"+
                                                "<div class=\"top\">"+
                                                    "<div class=\"left\">"+
                                                      "<image src=\" "+goodsList.picture[0]+" \"></image>"+
                                                    "</div>"+
                                                    "<div class=\"right\">"+
                                                        "<span class=\"shuoming\">"+goodsList.good_name+"</span>"+
                                                        "<span class=\"price\">";
                                                        if(goodsList.low_price == goodsList.high_price){
                                                             informArr+="<span>￥"+"<i class=\"low_price\">"+goodsList.low_price+"</i>"+"</span>"
                                                        }else{
                                                          informArr+="<span>￥"+"<i class=\"low_price\">"+goodsList.low_price+"</i>"+"</span> <span>~￥"+"<i class=\"high_price\">"+goodsList.high_price+"</i>"+"</span>"+
                                                        "</span>"
                                                        }
                                                informArr+="</div>"+
                                                    "<div class=\"del\" onclick=\"close()\">"+
                                                        "<image src=\"https://qncdn.playonwechat.com/shangcheng/icon_close.png\" mode=\"widthFix\"></image>"+
                                                    "</div>"+
                                                "</div>";
                                            if(goodsList.attribute!=''){
                                               var attrs = ''; 
                                                for(var j=0;j< goodsList.attribute.length;j++){
                                                  informArr+="<div class=\"kuanshi\">"+
                                                                "<div class=\"title\">"+goodsList.attribute[0].attribute_name+"：</div>"+
                                                                "<div class=\"leibie\" >";
                                                                    for(var k=0;k< goodsList.attribute[0].attribute_value.length;k++){
                                                                        informArr+= "<div class=\"text white\" onclick=\"xuanze(this,"+goodsList.attribute[0].anid+","+goodsList.attribute[0].attribute_value[k].active+","+goodsList.attribute[0].attribute_value[k].avid+","+goodsList.attribute[0].attribute_value[k].figure+")\"    data-active=\""+goodsList.attribute[0].attribute_value[k].active+"\" name=\""+goodsList.attribute[0].attribute_value[k].avid+"\"  \">" +goodsList.attribute[0].attribute_value[k].attribute_value+"</div>";
                                                                    };
                                                  informArr+= "</div>"+
                                                  "</div>"+
                                                "</div>"
                                                }
                                            }
                                       informArr+="<div class=\"mid\">"+
                                                      "<div class=\"buy\">"+
                                                          "<span class=\"shuliang\">购买数量：<i class=\"shuliang\">1</i></span>"+
                                                          "<span class=\"gray\">剩余"+goodsList.total_stock+"件</span>"+
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
                                }
                          document.getElementById("goodsList").innerHTML=informArr;
                      }else{
                        $(".noOrder").show();
                        console.log("null")
                      }
                  },
                  error:function(e){
                      console.log(e)
                  }
              });
          });
    });