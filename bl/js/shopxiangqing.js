function Magnifier(){
//		获取元素
			this.s_box = document.querySelector("#s_box")
			this.s_img = document.querySelector("#s_box img")
			this.b_box = document.querySelector("#b_box")
			this.b_img = document.querySelector("#b_box img")
			this.oimg = document.querySelectorAll("#photo img")
//		绑定事件
			this.addEvent()
			this.changeIndex()
		}
		Magnifier.prototype.changeIndex = function(){
			var that = this
			for (var i=0;i<this.oimg.length;i++) {
				this.oimg[i].onclick=function(){
					that.s_img.src = this.src;
					that.b_img.src = this.src;
				}
				console.log(this.oimg[i])
			}
		}

		
		Magnifier.prototype.addEvent = function(){
//		1.进入事件
			var that = this
			s_box.onmouseenter = function(){
				that.show()				
			}
//		2.离开事件
			s_box.onmouseleave = function(){
				that.hidd()				
			}
//		3.移动事件	
			s_box.onmousemove = function(ele){
				var e =ele || window.event
				that.move(e)				
			}
		}
		Magnifier.prototype.show = function(){
//				1-1.b_box显示	
			b_box.style.display = "block";
//				1-2.创建蒙版 设置蒙版样式 并 提前判断,将来的实例身上是否有span属性,有就显示,没有就创建
			if(!this.span){
				this.span = document.createElement("span")
				
				var w = this.b_box.offsetWidth / this.b_img.offsetWidth * this.s_box.offsetWidth
				var h = this.b_box.offsetHeight / this.b_img.offsetHeight * this.s_box.offsetHeight
				this.span.style.cssText = `width:${w}px;height:${h}px;background:rgba(200,200,200,0.6);position:absolute;left:0;top:0`
				this.s_box.appendChild(this.span)
			}	
//				1-2.有span就显示
			this.span.style.display = "block"
		}
		Magnifier.prototype.hidd = function(){
//				2-1.b_box消失	
			this.b_box.style.display = "none";	
//				2-2.蒙版消失		
			this.span.style.display = "none"
			
		}
		Magnifier.prototype.move = function(e){
//				3-1.图片移动	 
			
//				3-2.蒙版移动	
			var l = e.pageX - this.s_box.offsetLeft - this.span.offsetWidth/2
			var t = e.pageY - this.s_box.offsetTop - this.span.offsetHeight/2
			
			if(l < 0 ) l = 0;
			if(t < 0 ) t = 0;
			if(l > this.s_box.offsetWidth - this.span.offsetWidth ) l = this.s_box.offsetWidth - this.span.offsetWidth;
			if(t > this.s_box.offsetHeight - this.span.offsetHeight ) t = this.s_box.offsetHeight - this.span.offsetHeight;
			
			this.span.style.left = l +"px"
			this.span.style.top = t +"px"
			
//				3-3.b_box的img移动	
			var x = l / (this.s_box.offsetWidth - this.span.offsetWidth)
			var y = t / (this.s_box.offsetHeight - this.span.offsetHeight)
			
			this.b_img.style.left = -x * (this.b_img.offsetWidth - this.b_box.offsetWidth) +"px";
			this.b_img.style.top = -y * (this.b_img.offsetHeight - this.b_box.offsetHeight) +"px"	
			
		}
		
		new Magnifier()	
		
		
		var s_img = document.querySelector(".s_img")
		var ph = document.querySelector(".ph")
		var p_img = document.querySelector(".p_img")
		var p_img1 = document.querySelector(".p_img1")
		var b_img = document.querySelector(".b_img")
		
		
		onload = function(){
			var goodId = window.location.href;
			var id = goodId.split("?")[1];
			var url = "http://localhost/百联网/data/goods.json";
			ajaxGet(url,function(res){
				var res = JSON.parse(res);
				
				for(var i=0;i<res.length;i++){
					if(res[i].goodsId == id){
						s_img.setAttribute("src",`${res[i].url}`);
						ph.innerHTML = `${res[i].name}`;
						p_img.setAttribute("src",`${res[i].url}`);
						p_img1.setAttribute("src",`${res[i].url}`);
						b_img.setAttribute("src",`${res[i].url}`);
					}
				}
			})
		}
		
