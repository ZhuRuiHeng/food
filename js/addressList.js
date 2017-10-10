
 $(document).ready(function(){
    $.ajax({
	    type:"get",
	    url : apiRoot+'/api/get-category?sign='+sign+'&operator_id='+ operator_id,
	    dataType : 'json',
	    success : function(data){
	          
	    },
	    error:function(e){
	        console.log(e)
	    }
   });
 });
 function set(){
 	console.log("编辑");
 };
$(document).on("click",".choice",function(){
	
   if($(this).hasClass("checked")){
        $(this).removeClass("checked").children("input").attr("checked",false);
        console.log(2);
    }else{
        $(this).addClass("checked").children("input").attr("checked",true);
        $(".choice").removeClass("checked").children("input").attr("checked",false);
        console.log(1);
    }
})