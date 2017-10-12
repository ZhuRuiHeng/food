      var apiRoot = "https://shop.playonwechat.com";
      var operator_id = 67; //67
      //var sign  = localStorage.getItem("sign");

      var sign  = '524947f4f57689e5bc4d52b84c29ede9';
      // var nickname = localStorage.getItem(nickname);
      // var avatar   = localStorage.getItem(avatar);
      // if(!avatar){
      //     avatar = '../images/user.png';
      // }
      // if(!nickname){
      //     nickname = 'user';
      // }
      // console.log(avatar);
      // console.log(sign);
      // $("#avatar").attr("src",avatar);
      // $("#nickname").html(nickname);

      // if (!sign) {
      //   window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc7b71ea532a9982c&redirect_uri=https%3a%2f%2fshop.playonwechat.com%2fapi%2fh5-auth&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
      // }
      //时间
      function time(unixtime, withTime) {
            if (!unixtime) {
                unixtime = (new Date()).getTime();
            } else {
                unixtime *= 1000;
            }
            var nd = new Date(unixtime), year = nd.getFullYear(), month = nd.getMonth() + 1, day = nd.getDate();
            if (month < 10) {
                month = '0' + month;
            }
            if (day < 10) {
                day = '0' + day;
            }
            if (!withTime) {
                return year + '-' + month + '-' + day;
            }
            var hour = nd.getHours(), minute = nd.getMinutes(),second = nd.getSeconds();
            if (hour < 10) {
                hour = '0' + hour;
            }
            if (minute < 10) {
                minute = '0' + minute;
            }
            if (second < 10) {
               second = '0' + second;
            }

            return year + '-' + month + '-' + day + ' ' + hour + ':' + minute +':'+ second;
            // return month + '/' + day + ' ' + hour + ':' + minute +':'+ second;
        };

