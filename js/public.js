
var apiRoot = "https://shop.playonwechat.com";
var operator_id = 67; //67
var sign  = localStorage.getItem("sign1");

var sign  = '7a35f625adde565ccb20855ff646465c';

// localStorage.getItem(sign1);
// localStorage.getItem(nickname1); //昵称
// localStorage.getItem(avatar); //头像
// localStorage.setItem('myCat', 'Tom');
// localStorage.getItem('myCat', 'Tom');
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

