// require('style-loader!css-loader!./css/benefit.css') 
import reset from './css/reset.css'
import benefit from './css/benefit.css'

// require("html-loader?attrs[]=img:src&attrs[]=img:srcset!./index.html");
//引入三方库js
// require('./js/jquery.js');



// import {roleChooseFun} from './js/mes'
console.log(window.devicePixelRatio)
window.roleChooseFuns = function(showDom,hideDom,btnShow,btnHide){
    $("#"+showDom).fadeIn(100);
    $("#"+hideDom).fadeOut(100);
    $("#"+btnShow).addClass("benefit-role-list-choose");
    $("#"+btnHide).removeClass("benefit-role-list-choose");
}

//js调用
var mes = require('./js/mes');
mes.autoDeviceImgFun();