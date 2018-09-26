import runner from './lib/runner.js'
import md5Str from './lib/md5str.js'
let HttpCore = {};

const timeStamp = "sunnyfix_timestamp";
const token = "token";
const zyqtSigns = "sunnyfix_sign";
const status = "code";
const object = "object";

HttpCore.post = function(url,...args){
  let _this = this;
  let prams = {};
  let cb = new Function;
  if (args.length == 1) {
    cb = args[0];
  }else{
    prams = args[0];
    cb = args[1];
  };
  let config = {};
  config.url = url;
  config.type = "post";
  config.data = prams;
  config.data[timeStamp] = new Date().getTime();

  config.data[token] = localStorage.getItem(token);
  //config.data[token] = 'e10adc3949ba59abbe56e057f20f883e';

  //加入加密字段
  let zyqtSign = md5Str( config.url,config.data );
  config.data[zyqtSigns] = zyqtSign;
  //加入加密字段

  return new Promise((resolve,reject ) => {
    config.success = (res) => {
      if(res[status] == 0){
        try{
          _this.$parent.$parent[_this.name].loading = false;
          _this.$parent.$parent[_this.name].modal = false;
        }catch(e){}
        resolve(res);
        cb.call(_this,res);
      }else{
        try{
          _this.$parent.$parent[_this.name].loading = false;
        }catch(e){}
        if (res.message) {
          _this.$Message.warning(res.message);
        }else if(res[status]){
          _this.$Message.warning(`服务器出错，状态码<span class='text text-xl'>${res[status]}</span>`);
        }else{
          _this.$Message.warning(`服务器出现不明错误，请检查后台代码！`);
        }
      }
    };
    config.error = (e) => {
      _this.$Message.warning('请检查网络是否连接或后台服务是否启动');
      console.log(e)
      try{
        _this.$parent.$parent[_this.name].loading = false;
      }catch(e){}
      reject(e);
    };
    $.ajax(config);
  });
};
HttpCore.get = function(url,...args){
  let _this = this;
  let prams = {};
  let cb = new Function;
  if (args.length == 1) {
    cb = args[0];
  }else{
    prams = args[0];
    cb = args[1];
  };
  let config = {};
  config.url = url;
  config.type = "get";
  config.data = prams;
  config.data[timeStamp] = new Date().getTime();
  config.data[token] = localStorage.getItem(token);
  //config.data[token] = "e10adc3949ba59abbe56e057f20f883e";
  //加入加密字段
  let zyqtSign = md5Str( config.url,config.data );
  config.data[zyqtSigns] = zyqtSign;
  //加入加密字段

  return new Promise((resolve,reject) => {
    config.success = (res) => {
      if(res[status] == 0){
        resolve(res);
        cb.call(_this,res);
      }else{
        if (res.message) {
          _this.$Message.warning(res.message);
        } else{
          _this.$Message.warning(`服务器出错，状态码<span class='text text-xl'>${res[status]}</span>`);
        }
      }
    };
    config.error = (e) => {
      _this.$Message.warning('请检查网络是否连接或后台服务是否启动');
      console.log(e)
      reject(e);
    };
    $.ajax(config);
  });
};

HttpCore.http = function (config){
  let _this = this;
  let prams = {};
  prams.url = config.url;
  prams.type = config.type || "post";
  prams.data = config.data || {};
  prams.data[timeStamp] = new Date().getTime();
  prams.data[token] = localStorage.getItem(token);
  //config.data[token] = "11275ada3494a391fa66e852c8bc84d5";
  //加入加密字段
  let zyqtSign = md5Str( prams.url,prams.data );
  prams.data[zyqtSigns] = zyqtSign;
  //加入加密字段

  return new Promise((resolve,reject) => {
    prams.success = (res) => {
      if(res[status] == 0){
        resolve(res);
      }else{
        if (res.message) {
          _this.$Message.warning(res.message);
        } else{
          _this.$Message.warning(`服务器出错，状态码<span class='text text-xl'>${res[status]}</span>`);
        }
      }
    };
    prams.error = (e) => {
      _this.$Message.warning('请检查网络是否连接或后台服务是否启动');
      console.log(e)
      reject(e);
    };
    $.ajax(prams);
  });
};

//runner 函数
HttpCore.runner = runner;
const install = function (Vue,options) {
  let _this = this;
  this.options = options || {};
  Vue.prototype.get = HttpCore.get;
  Vue.prototype.post = HttpCore.post;
  Vue.prototype.http = HttpCore.http;
  Vue.prototype.runner = HttpCore.runner;
}

const zyqtCore = {
  install
};

export default zyqtCore