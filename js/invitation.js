     $(document).ready(function(){
        $.ajax({
            type:"get",
            url : apiRoot+'/api/member-center?sign='+sign+'&operator_id='+ operator_id,
            data: {
               page:1
            },
            dataType : 'json',
            success : function(data){
                console.log(data); 
                $("#countCommission").text(parseInt(data.data.memberInfo.countCommission));
                $("#friends").text(parseInt(data.data.memberInfo.friends));
                $("#wallet").text(parseInt(data.data.memberInfo.wallet).toFixed(2));
                $("#withdraw_fee").text(parseInt(data.data.memberInfo.withdraw_fee).toFixed(2));
                var inviter = "";
                var wallet = $("#wallet").text();
                var wallet = Number(wallet);
                var withdraw_fee = $("#withdraw_fee").text();
                var withdraw_fee = Number(withdraw_fee);
                $("#inviter").text(wallet+withdraw_fee);
            },
            error:function(e){
                console.log(e);
            }
        })
    })