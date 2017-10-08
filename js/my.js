
$(document).ready(function(){
    //数目
    $.ajax({
        type:"post",
        url : apiRoot+'/api/mine?sign='+sign+'&operator_id='+ operator_id,
        dataType : 'json',
        success : function(data){
            console.log(data);  
           
            
        },
        error:function(e){
            console.log(e)
        }
    });
});