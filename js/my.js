
$(document).ready(function(){
   
    //数目
    $.ajax({
        type:"post",
        url : apiRoot+'/api/mine?sign='+sign+'&operator_id='+ operator_id,
        dataType : 'json',
        success : function(data){
            console.log(data);
            var countPayment = data.data.countPayment;
            var countDeliver = data.data.countDeliver;
            var countReceipt = data.data.countReceipt; 
            var countFinish  = data.data.countFinish; 
            if(countPayment!=0){
                $(".num1").text(countPayment).show();
            }
            if(countDeliver!=0){
                $(".num2").text(countDeliver).show();
            }
            if(countReceipt!=0){
                $(".num3").text(countReceipt).show();
            }
            if(countFinish!=0){
                $(".num4").text(countFinish).show();
            }
            var is_membership = data.data.is_membership; 
            if(is_membership == false){
                $(".daren,.user").hide();
            }else{
                $(".daren,.user").show();
            }
            var service = data.data.service;
            $("#service").attr("href","tel:"+service+"");
        },
        error:function(e){
            console.log(e)
        }
    });
});