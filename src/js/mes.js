//点击tab切换方法
export function roleChooseFun(obj) {
    var targetDom = $(obj).attr("data");
    $(obj).fadeIn(100);
    $("#"+targetDom).fadeOut(100);
}
//适配屏幕2倍图和3倍图
export function autoDeviceImgFun(){
	let drp = window.devicePixelRatio;
	if(drp == '3'){
		var imgList = document.getElementsByTagName('img');
		for(var i=0;i<imgList.length;i++){
			var autoImgStr = imgList[i].getAttribute("data-src");
			console.log(autoImgStr);
			imgList[i].setAttribute('src',autoImgStr);
		}
	}
}
