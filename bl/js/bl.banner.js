function Banner(){
//	1.绑定事件
   this.left=document.getElementById("left")
   this.right=document.getElementById("right")
   this.aItems=document.querySelector(".imgbox").children;
   
   
   this.index = 0;
   this.num = 2;
	
	this.addEvent()
}
Banner.prototype.addEvent = function(){
	var that = this;
	 this.right.onclick=function(){
	 	that.changeIndex()
	 }
}	
Banner.prototype.changeIndex = function(){
	if(this.index==this.aItems.length-1){
		 this.index= 0;
	}else{
		 this.index++	
	}
	
	this.display()
}
Banner.prototype.display = function(){
	this.aItems[this.index].style.zindex = this.num++;
}
new Banner();