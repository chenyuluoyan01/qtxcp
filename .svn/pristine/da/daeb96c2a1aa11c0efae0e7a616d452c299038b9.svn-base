import makePy from './lib/getPY.js'
let utils = {};
utils.makePy = makePy;

//处理localStorage
utils.getData = function( key ){
  let tmp = localStorage.getItem(key);
  if( tmp == null || tmp == undefined ){
    tmp = "";
  }else{
    if(tmp.indexOf("{") != -1 && tmp.indexOf(":") != -1){
      tmp = JSON.parse(tmp)
    }
  };
  return tmp;
};


utils.setData = function( key , value ) {
  if(typeof value === "object"){
    localStorage.setItem(key , JSON.stringify(value))
  }else{
    localStorage.setItem(key , value)
  };
}

utils.removeData = function( key ) {
  localStorage.removeItem( key );
}


//set 对象数据
utils.set = function( arr, key, val) {
  if(arr instanceof Array){
    for(let i in arr){
      arr[i][key] = val;
    };
  }else{
    arr[key] = val;
  }
  return arr
}

//fomat时间
utils.formatDate = function(date, fmt) {
  date = new Date(date);
  fmt = fmt || 'yyyy-MM-dd hh:mm:ss';
  function padLeftZero (str) {
    return ('00' + str).substr(str.length)
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  return fmt
};

//根据keys 获取 object 的部分数据
utils.getByKeys = function(obj1,obj2){
  for(let o in obj1){
    if(obj2[o] != null && obj2[o] != undefined){
      obj1[o] = obj2[o];
    }else{
      throw new Error(`The key ${o} is " ${obj2[o]} " in source object!`);
      break;
    }
  };
  return obj1
};

//id => name
utils.resolveDec = function(obj,id){
  let key = obj.listId;
  let value = obj.listName;
  let list = obj.list;
  let Dec = '';
  for(let i in list){
    if(list[i][key] == id){
      Dec = list[i][value];
    }
  };
  return Dec
}

//json数组中获取只有莫一项的数组
utils.getSingleItem = function(obj,key){
  let arr = [];
  let arr1 = [];
  for(let i in obj){
    arr.push(obj[i][key])
  };
  arr = [...new Set(arr)];
  for(let i in arr){
    arr1[i] = {}
  }
  for(let i in arr){
    arr1[i][key] = arr[i]
  }
  return arr1
}

//json数组中获取只有某一项的值数组
utils.getSingleStr = function(obj,key){
  let arr = [];
  let arr1 = [];
  for(let i in obj){
    arr.push(obj[i][key])
  };
  arr = [...new Set(arr)];
  return arr
}


//数字排序
utils.sortNum = function(arr){
  function sequence(a,b){
      return a - b;
  }
  return arr.sort(sequence);
}

//对象深拷贝
utils.assign = function(obj){
  return JSON.parse(JSON.stringify(obj))
}

//对象根据key分组
utils.groupBykey = function(list,key){
  let keys = [];
  let map = {};
  keys = utils.getSingleStr(list,key);
  keys.map(e=>{
    map[e] = [];
  });
  keys.map(e=>{
    list.map(item=>{
      if(item[key] == e){
        map[e].push(item)
      }
    })
  });
  return map;
};

const install = function (Vue,options) {
  this.options = options || {};
  Vue.prototype.utils = utils;
};

const zyqtUtils = {
  install
};


export default zyqtUtils