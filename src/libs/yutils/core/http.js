import axios from 'axios'
import runner from 'lib/runner.js'
/*class Http{
  constructor(options){
    let {method,url,data,resolveResData,proxy} = options;
    let config = {};
    config.method = method || "get";
    config.url = url || "./";
    config.data = data || {};
    config.transformResponse = [resolveResData] || [data=>data];
    proxy && config.proxy = proxy;
    this.config = config;
  }
  init(){
    return axios(this.config)
  }
};


let httpClient = function (options){
  let $http = {};
  let All = function(method, url, ...args){
    let _this = this;
    if (args.length == 1) {
      cb = args[0];
    }else{
      options.data = args[0];
      cb = args[1];
    };
    options.method = "get";
    let http = new Http(options);
    http.init().then(res=>{
      cb.call(_this,res);
    }).catch(e => {
      options.resolveMsg()
    });
  };
  $http.get = function(url, ...args){
    All("get",url, ...args)
  };
  $http.post = function(url, ...args){
    All("post",url, ...args)
  };
  $http.runner = runner;

  return $http
};*/

let httpClient = function(resolveSuccess,resolveError){
  let $http = {};
  $http.get = function(url,...args) {
      let _this = this;
      let data = {};
      let cb = new Function;
      if (args.length == 1) {
        cb = args[0];
      }else{
        data = args[0];
        cb = args[1];
      };
      axios.get(url,{params:data},config).then(res=>{
        resolveSuccess(res)
        cb.call(_this,res)
      }).catch(e => {
        resolveSuccess(e)
      })
  };
}



const install = function (Vue,options) {
  this.options = options || {};
  Vue.prototype.get = $http.get;
  Vue.prototype.post = $http.post;
  Vue.prototype.runner = $http.runner;
};

const getHttp = {
  install
};



export default getHttp