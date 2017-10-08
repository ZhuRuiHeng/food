    
    var carList = "";
    var change_carts = '';

    $(function() {
        FastClick.attach(document.body);
    })
   // 编辑
    $(document).on("click","#bianji",function(e){//修改成这样的写法  
        var s = $(this).html();
        if(s == "完成"){
            $(this).html("编辑");
            $(".caozuo,#heji").show();
            $("#dels,.mid").hide();
            $("#dels").parents(".weui-cell.weui-check__label").css("height","42px");
            for (var i = 0; i < carList.length; i++) {
                if (carList[i].str != undefined){
                  change_carts += carList[i].str + ";"; //拼接字符
                }
            }
            change_carts = change_carts.substr(0, change_carts.length - 1); // 截取最后一位字符

            console.log("change_carts:", change_carts);
            if (change_carts.length != 0){
               //编辑post访问接口
                $.ajax({
                    type:"post",
                    url : apiRoot+'/api/carts-manage?sign='+sign+'&operator_id='+ operator_id,
                    data: {
                        change_carts: change_carts
                    },
                    dataType : 'json',
                    success : function(data){
                        console.log(data); 
                        var status = data.status;
                        if (status == 1) {
                            $.toast("编辑商品成功", "text");
                            change_carts="";
                        } else {
                            $.toast("编辑商品失败", "text");
                            change_carts="";
                        }
                        change_carts="";//清空
                    },
                    error:function(e){
                        console.log(e)
                    }
                });
            }
        }else{
            $(this).html("完成");
            $(".caozuo,#heji").hide();
            $("#dels,.mid").show();
        }
    });
    // 加减
    function bindMinus (e,gid,index) {
        var num = $("input.num"+gid+"").val();
        if (num > 1) {
            num--;
        }
        $('input.num'+gid+'').val(num);
        $('.shuliang'+gid+'').text(num);
        TotalPrice();
        var key = carList[index].key; //添加字段
        var str = key + '|' + num;
        carList[index].str = str;
        console.log(str);
        console.log(carList);
    }
    /* 点击加号 */
    function bindPlus(e,gid,index) {
        var num = $("input.num"+gid+"").val();
        num++;
        $('input.num'+gid+'').val(num);
        $('.shuliang'+gid+'').text(num);
        TotalPrice();
        var key = carList[index].key;//添加字段
        var str = key + '|' + num;
        carList[index].str = str;
        console.log(str);
        console.log(carList);
    }

    /* 输入框事件 */
    function bindManual(e,gid,index) {
        var num = $("input.num"+gid+"").val();
        var num = $("shuliang"+gid+"").text();
        // 将数值与状态写回 
       
    }
    //全选
    $(document).on("click","#all",function(){
        if($(this).hasClass('checked')){
            $(this).removeClass("checked").children("input").attr("checked",false);
            $("#cars .weui-check__label .weui-cell__hd").removeClass('checked').children("input").attr("checked",false);
            TotalPrice();
        }else{
            $(this).addClass("checked").children("input").attr("checked",true);
            $("#cars .weui-check__label .weui-cell__hd").addClass('checked').children("input").attr("checked",true);
            TotalPrice();
        }
    });
  
    //单选
    $(document).on("click","#cars .weui-cell__hd",function(){
       if($(this).hasClass("checked")){
            $(this).removeClass("checked").children("input").attr("checked",false);
             TotalPrice();
        }else{
            $(this).addClass("checked").children("input").attr("checked",true);
            TotalPrice();
        }
    })
    //总价
    function TotalPrice() {
        var allprice = 0; //总价
        var oprice = 0; //店铺总价
        $("#cars .weui-cell__hd.checked").each(function() { //循环店铺里面的商品
              var num = parseInt($(this).siblings('.relative').find("input.num").val()); //得到商品的数量
              //console.log("num:"+num);
              var price = parseFloat($(this).siblings('.relative').find(".caozuo p .sum").text()); //得到商品的单价
              //console.log("price:"+price);
              var total = price * num; //计算单个商品的总价
              oprice += total; //计算该店铺的总价
              //console.log("oprice:"+oprice);
          });
        $("#allPrice").text(oprice.toFixed(2)); //输出全部总价
    };
    //删除
     $(document).on("click", "#dels-show", function() {
        $("#tanchuang").show();
        var allKey = "";
        $("#cars .weui-cell__hd.checked").each(function() { //循环店铺里面的商品
            var m = $(this).attr("name");
            // console.log($("#cars .weui-cell__hd").attr("name"));
            // console.log($(this).attr("name"));
            allKey += carList[m].key + ";"; //拼接字符
        });
        var key = allKey.substr(0, allKey.length - 1); // 截取最后一位字符
        //console.log("key:", key);
         $(".weui-dialog__ft a").click(function(){
            var s = $(this).attr('name');
            if(s=='1'){
               $("#tanchuang").hide();//no
            }else{
                //del
                $.ajax({
                    type:"get",
                    url : apiRoot+'/api/remove-cart-by-key?sign='+sign+'&operator_id='+ operator_id,
                    data: {
                        keys: key
                    },
                    dataType : 'json',
                    success : function(data){
                        console.log(data); 
                        var status = data.status; 
                        if (status == 1) {
                            $.toast("删除商品成功！", "text");
                            location.reload();//刷新页面
                        } else {
                            $.toast("删除商品失败", "text");
                        }
                        $("#tanchuang").hide();
                    },
                    error:function(e){
                        console.log(e)
                    }
                });
            }
         })
     })
    //显示列表
    $(document).ready(function(){
        $("input[type='checkbox']").attr("checked",true);
        $("#cars .weui-check__label .weui-cell__hd,#all").addClass('checked');
        TotalPrice(); 
        $.ajax({
            type:"get",
            url : apiRoot+'/api/get-carts?sign='+sign+'&operator_id='+ operator_id,
            dataType : 'json',
            success : function(data){
                console.log(data);  
                var carts = data.data.carts;
                carList = carts;
                if( carts.length != 0){
                    $(".kong").hide();
                  var informArr="";
                  for(var i=0;i< carList.length;i++){
                    var informStr="<div class=\"weui-cell weui-check__label relative\">"+
                                    "<div class=\"weui-cell__hd checked\" name=\""+i+"\">"+
                                        "<input type=\"checkbox\"  name=\"checkbox1\" id=\"s"+carts[i].gid+"\" checked=\"checked\">"+
                                     "</div>"+
                                    "<div class=\"weui-cell__bd relative\">"+
                                        "<div class=\"weui-panel__bd\">"+
                                            "<a href=\"javascript:void(0);\" class=\"weui-media-box weui-media-box_appmsg\">"+
                                                    "<div class=\"weui-media-box__hd\">"+
                                                        "<img src=\""+carts[i].figure+"\""+
                                                    "class=\"weui-media-box__thumb\">"+
                                                    "</div>"+
                                                    "<div class=\"weui-media-box__bd\">"+
                                                        "<h4 class=\"weui-media-box__desc\">"+
                                                        ""+carts[i].good_name+""+
                                                        "</h4>"+
                                                        "<div class=\"mid\">"+
                                                        "<div class=\"num\">"+
                                                            "<button class=\"reduce\" onclick=\"bindMinus(this,"+carts[i].gid+","+i+")\">-</button>"+
                                                            "<input type=\"number\"  value=\""+carts[i].number+"\" class=\"num num"+carts[i].gid+"\" readonly=\"readonly\"/>"+
                                                            "<button class=\"add normal\" onclick=\"bindPlus(this,"+carts[i].gid+","+i+")\">+</button>"+
                                                        "</div>"+
                                                    "</div> "+
                                                    "<div class=\"weui-cell caozuo afterNone\">"+
                                                        "<div class=\"weui-cell__bd service-price\">"+
                                                            "<p>￥<span class=\"sum\">"+carts[i].price+"</span></p>"+
                                                        "</div>"+
                                                        "<div id=\"service-gouwu\" class=\"weui-cell__ft service-gouwu service\"><span>x<i class=\"shuliang"+carts[i].gid+"\">"+carts[i].number+"</i></span></div>"+
                                                    "</div>"+
                                                   "</div>"+
                                             "</a>"+
                                           "</div>"+
                                     "</div>"+
                                    "<!-- <div class=\"del\">删除</div> -->"+
                                    "</div>";
                        informArr+=informStr;
                  }
                  document.getElementById("cars").innerHTML=informArr;

                }else{
                   $(".kong").show();
                   $(".weui-check__label,.marginNone").hide();
                  console.log("null");
                 
                }
            },
            error:function(e){
                console.log(e)
            }
        });
       
    }); 