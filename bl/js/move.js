function move(ele,json,callback){
	clearInterval(ele.t)
	ele.t = setInterval(function(){
		var i = true;
		for(var attr in json){
			if(attr === "opacity"){
				var iNow = getStyle(ele,attr) * 100;
			}else{
				var iNow = parseInt(getStyle(ele,attr));
			}
			var speed = (json[attr] - iNow)/8;
			speed = speed<0 ? Math.floor(speed) : Math.ceil(speed);
			if(attr == "opacity"){
				ele.style[attr] = (iNow + speed)/100;
			}else{
				ele.style[attr] = iNow + speed + "px";
			}
			if(iNow != json[attr]){
				i = false;
			}
		}
		if(i){
			clearInterval(ele.t);
			callback && callback();
		}
	},30)
}
function getStyle(ele,attr){
	if(getComputedStyle){
		return getComputedStyle(ele,false)[attr];
	}else{
		return ele.currentStyle[attr];
	}
}