layui.config({
  base: '/www/layui验证模板/js/'
}).extend({
  verify: 'verify'
});

layui.use(['jquery', 'form', 'verify'], function () {
  var $ = layui.$,
    form = layui.form,
    verify = layui.verify;

  // 自定义表单验证
  form.verify({
    oldPwd: function (value) {  // 旧密码
      return verify.checkPwd({ value: value, minlength: 6, maxlength: 12 })
    },
    newPwd: function (value) { // 新密码
      return verify.checkPwd({ value: value, minlength: 6, maxlength: 12 })
    },
    newPwdAgain: function (value) { // 确认新密码
      var _newPwdValue = $('input[lay-verify*="newPwd"]').val();
      return _newPwdValue === value ? '' : "两次输入密码不正确"
    },
    payPwd: function (value) { // 支付密码
      return verify.checkPwd({ value: value, minlength: 6, maxlength: 6 })
    },
    payPwdAgain: function (value) { // 确认支付密码
      var _newPwdValue = $('input[lay-verify*="payPwd"]').val();
      return _newPwdValue === value ? '' : "两次输入密码不正确"
    },
    money: function (value) {  // 检测是否为金额
      var _value = verify.changeCurrency({
        value: value,
        accuracy: 2
      });
      return value == _value ? '' : '输入金额有误'
    },
    code: function (value) {  // 检测是否为积分
      var _value = verify.changeCurrency({
        value: value,
        accuracy: 4
      });
      return value == _value ? '' : '输入积分有误'
    },
  });
});