  
  var p1=/^(13[0-9]\d{8}|15[0-35-9]\d{8}|18[0-9]\d{8}|14[57]\d{8})$/;//手机号码格式验证
  //保存
  $("#save").click(function(){
      var name    = document.getElementById("name").value;
      var tel     = document.getElementById("tel").value;
      var start   = document.getElementById("start").value;
      var dizhi = document.getElementById("dizhi").value;
      var code    = document.getElementById("code").value;
      console.log(name,tel,start,dizhi,code);
      if(!name){
          $.toast("姓名不能为空", "text");return;
      }else if(!tel.match(p1)){
          $.toast("手机号码格式不正确！", "text");return;
      }else if(!start){
          $.toast("收货地址不能为空", "text");return;
      }else if(!dizhi){
          $.toast("收货地址详情不能为空", "text");return;
      }
      localStorage.setItem("name1", name);
      localStorage.setItem("tel", tel);
      localStorage.setItem("start", start);
      localStorage.setItem("dizhi", dizhi);
      localStorage.setItem("code", code);
  });
  // 删除
  $("#del").click(function(){

  });
  //取消
  $("#no").click(function(){

  });
   
 // $.ajax({
 //      type:"get",
 //      url : apiRoot+'/api/get-category?sign='+sign+'&operator_id='+ operator_id,
 //      dataType : 'json',
 //      success : function(data){
          
 //      },
 //      error:function(e){
 //          console.log(e)
 //      }
 //  });
 $(document).ready(function(){
      $("#start").cityPicker({
          title: "选择出发地",
          onChange: function (picker, values, displayValues) {
            //console.log(values, displayValues);
          }
      });
 })
  
