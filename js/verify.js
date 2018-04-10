// 共用模板
layui.define(['jquery', 'layer'], function (exports) {
  var $ = layui.$,
    layer = layui.layer;
  var verify = {
    /** 检测密码长度
     * 返回值 string
     *  1. '输入密码在' + obj.minlength + '位'
     *  2. '输入密码在' + (obj.minlength + '到' + obj.maxlength + '之间')
     * @param obj 
     *   value ：值  string
     *   minlength   ：最小长度  int
     *   maxlength   ：最大长度  int
     */
    checkPwd: function (obj) {
      var _value = obj.value,
        _flag = obj.minlength === obj.maxlength ? true : false
      var reg = new RegExp('^.{' + obj.minlength + ',' + obj.maxlength + '}$');
      if (!reg.test(_value)) {
        return _flag ? '输入密码在' + obj.minlength + '位' : '输入密码在' + (obj.minlength + '到' + obj.maxlength + '之间')
      }
    },

    /** 转化为货币格式
     * 返回转化为货币值 string
     * @param obj
     *  value : 值  string
     *  accuracy ：精度(小数点后几位) int
     *  max : 最大值 int
     */
    changeCurrency: function (obj) {
      var value = obj.value, _ds = '';

      //清除"数字"和"."以外的字符
      value = value.replace(/[^\d.]/g, "");
      //验证第一个字符是数字而不是``
      value = value.replace(/^\./g, "");
      //只保留第一个. 清除多余的
      value = value.replace(/\.{2,}/g, ".");
      value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
      //只能输入四个小数
      for (var i = 0; i < obj.accuracy; i++) {
        _ds += '\\d'
      }
      value = value.replace(new RegExp('^(\-)*(\\d+)\.(' + _ds + ').*$'), '$1$2.$3');
      value = value.replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/, '$1$2.$3');
      value = value > obj.max ? obj.max : value
      return value
    },
    /** 发送短信验证码
    * 返回值 无
    * @param obj
    *  url : 获取后台验证码的值 string
    *  el : 传入获取验证码按钮  
    */
    SendCode: function (obj) {
      obj.el.attr("disabled", "disabled").addClass("layui-btn-disabled")
      $.post(obj.url, { Phone: obj.phone }, function (res) {
        console.log(res)
        result = (res.Data.status == 0 ? true : false);
        if (result) layer.msg("发送成功");
        obj.fn(result);
      })
    },
    /** 获取短信验证码
     * 返回值 无
     * @param obj
     *  url : 获取后台验证码的值 string
     *  el : 传入获取验证码按钮  
     */
    SetSMSCheckCodeTimeOut: function (obj) {
      var surplus = obj.surplus;
      var timer = setInterval(function () {
        if (surplus > 0) {
          obj.el.attr("disabled", "disabled").addClass("layui-btn-disabled").text("重新获取(" + surplus + "s)");
          return surplus--
        }
        else {
          surplus = 0;
          obj.el.removeAttr("disabled").removeClass("layui-btn-disabled").text("获取验证码");
          clearInterval(timer);
        }
      }, 1000);
    },
    GetCodeTimeSpan: function (obj) {
      $.post(obj.url, function (data) {
        console.log(data)
        obj.fn(data)
      })
    },
    CheckPhone: function (obj) {
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!myreg.test(obj)) {
        layer.msg("手机号码格式有误");
        return false;
      } else {
        return true;
      }
    }

  }
  exports('verify', verify);
});
