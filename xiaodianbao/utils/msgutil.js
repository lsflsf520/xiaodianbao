const alert = (content, options, yes) => {
  //layer.alert(content, options, yes);
  console.log(content);
}
  
const error = (content) => {
  toast(content, { icon: 2 });
}
  
const success = (content) => {
  toast(content, { icon: 1 });
}
  
const warn = (content) => {
  toast(content, { icon: 0 });
}

//消息提示框，会自动消失
const toast = (content, options, end) => {
  //layer.msg(content, options, end);
  alert(content);
}
  
//弹出加载层
const loading = (icon, options) => {
  return layer.load(icon, options);
}

module.exports = {
  alert: alert,
  error: error,
  success: success,
  warn: warn,
  toast: toast,
  loading: loading
}