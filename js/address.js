  
  var p1=/^(13[0-9]\d{8}|15[0-35-9]\d{8}|18[0-9]\d{8}|14[57]\d{8})$/;//手机号码格式验证
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
  var  type = getParam().type;
  var _receiver = decodeURI(getParam().receiver);
  var _phone   = getParam().phone;
  var _area = decodeURI(getParam().area);
  var _address = decodeURI(getParam().address);
  var _postalcode = decodeURI(getParam().postalcode);
  if(type==1){
      $("#del").hide();
      aid = '';
  }else{
    var aid = getParam().aid;
    $("#name").val(_receiver);
    $("#tel").val(_phone);
    $("#start").val(_area);
    $("#dizhi").val(_address);
    $("#code").val(_postalcode);
  }
  
  
  console.log(aid,_area,_address,_postalcode,_phone);
  //保存
  $("#save").click(function(){
      var receiver   = document.getElementById("name").value;
      var phone      = document.getElementById("tel").value;
      var area       = document.getElementById("start").value;
      var address    = document.getElementById("dizhi").value;
      var postalcode = document.getElementById("code").value;
      console.log(receiver,phone,area,address,postalcode,aid);
      if(!receiver){
          $.toast("姓名不能为空", "text");return;
      }else if(!phone.match(p1)){
          $.toast("手机号码格式不正确！", "text");return;
      }else if(!area){
          $.toast("收货地址不能为空", "text");return;
      }else if(!address){
          $.toast("收货地址详情不能为空", "text");return;
      }

      
      //post 参数receiver,phone,area,address,postalcode
        $.ajax({
            type:"post",
            url : apiRoot+'/api/address-manage?sign='+sign+'&operator_id='+ operator_id+'&aid='+aid,
            dataType : 'json',
            data:{
              receiver:receiver,
              phone:phone,
              area:area,
              address:address,
              postalcode:postalcode
            },
            success : function(data){
                console.log(data);
                var status = data.status;
                if(status == 1){
                    $.toast("地址保存成功！", "text");
                    setTimeout(function(){
                      window.location.href="addressList.html";
                    },300)
                    
                }else{
                    $.toast("地址保存失败！", "text");
                }
            },
            error:function(e){
                console.log(e)
            }
        });
  });
  // 删除
  $("#del").click(function(){
      $.ajax({
            type:"get",
            url : apiRoot+'/api/delete-address?sign='+sign+'&operator_id='+ operator_id,
            dataType : 'json',
            data:{
              aid:aid
            },
            success : function(data){
                console.log(data);
                var status = data.status;
                if(status == 1){
                    $.toast("删除地址成功！", "text");
                    setTimeout(function(){
                      window.location.href="addressList.html";
                    },300)
                    
                }else{
                    $.toast("删除地址失败！", "text");
                }
            },
            error:function(e){
                console.log(e)
            }
        });
  });

  //取消
  $("#no").click(function(){
      window.history.back();
      $("input").val("");
  });
   

 $(document).ready(function(){
      $("#start").cityPicker({
          title: "选择出发地",
          onChange: function (picker, values, displayValues) {
            //console.log(values, displayValues);
          }
      });
 })
  
