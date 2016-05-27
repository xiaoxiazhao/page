//页面中的非大图的横屏滚动 如合作伙伴
(function(jq){
	var hslider = function(o, options){
		this.parent = jq("#"+ o);
		if (this.parent.length <= 0) { 
			return false;
		}
		this.options = jq.extend({}, hslider.options, options);
		this.data = this.parent.find(".yk-col4");
		this.total = this.data.length;
		this.pageNow = 1;
		this.reset();
		//处理页面resize
		var _this = this;
		jq(window).resize(function(){
			_this.reset();
		});
	};
	hslider.prototype = {
		reset: function(options){
			if(typeof(options) == 'object'){//页面宽度改变的时候，需要重置内容
				jq.extend(this.options, options);
			}	
			if(this.options.autoMove) this.stop();//停止之前的定时，重新设置，防止重叠
			this.content = this.parent.find(".yk-slide-pages")[0];
			var itemWidth = parseInt(this.data.outerWidth());
			itemWidth += 10 + 10;//左右间距各10px
			this.totalWidth = itemWidth * this.total;
			this.content.style.width = this.totalWidth + 'px';
			this.content.style.overflow = 'hidden';
			this.offsetWidth = parseInt(this.parent.outerWidth()) + 10 + 10;
			//console.log("set offsetWidth", this.offsetWidth);
			this.canScroll = true;
			if(this.totalWidth <= this.offsetWidth){
				this.canScroll = false;	
			}
			this.perwidth = itemWidth;
			this.perpage = parseInt(this.offsetWidth/this.perwidth);
			

			if(this.canScroll){
				var left = Math.abs(parseInt(this.parent.find(".yk-slide-pages").css("left")));
				this.leftNav = this.parent.find(".yk-slide-btnprev");
				this.rightNav = this.parent.find(".yk-slide-btnnext");
				
				//左右切换
				if(left != 0)this.leftNav.css({visibility: 'visible'});
				else this.leftNav.css({visibility: 'hidden'});
				if(left < this.totalWidth - this.offsetWidth)this.rightNav.css({visibility: 'visible'});
				else this.rightNav.css({visibility: 'hidden'});
				
				//分页
				if(this.options.pager){
						this.parent.find(".yk-slide-pager").remove();
						this.pages = Math.ceil(this.totalWidth/this.offsetWidth);
						var pager = document.createElement("DIV");
						pager.className = "yk-slide-pager";
						var str = '';
						for(var i=1; i <= this.pages; i++){
							str += '<div pagenum="'+i+'"';
							if(this.pageNow == i) str += ' class="current"';
							str += '></div>';
					  }
					  pager.innerHTML = str;
					  this.parent.append(pager);
				}
				this.bind();
				if(this.options.autoMove) this.start();
				this.turnpage(this.pageNow);
			}	
		},
		bind: function(){	
			var _this = this;
			this.parent.mouseover(function(){
				if(_this.options.autoMove) _this.stop();
			});
			this.parent.mouseout(function(){
				if(_this.options.autoMove) _this.start();
			});
			
			
			_this.leftNav.click(function(){
				_this.turn("right");					 
			});
			_this.rightNav.click(function(){
				_this.turn("left");					 
			});
			
			if(_this.options.pager){
					_this.parent.find(".yk-slide-pager div").click(function(){
							var page = parseInt(this.getAttribute("pagenum"));
							if(_this.pageNow == page) return false;
							_this.turnpage(page);
					});
			}
			
		},
		initBottomNav: function(){
				this.parent.find(".yk-slide-pager div").removeClass("current");
				this.parent.find(".yk-slide-pager div:nth-child("+this.pageNow+")").addClass("current");
		},
		start: function(){
			var _this = this;
			_this.timerId = setInterval(function(){
				if(_this.options.direct == "left"){
					_this.turn("left");	
				}else{
					_this.turn("right");	
				}
			}, _this.options.delay);
		},
		stop: function(){
			clearInterval(this.timerId);
		},
		turn: function(dir){
			var _this = this;
			_this.offsetWidth = _this.parent.outerWidth() + 20;
			if(_this.locked) return false;
			_this.locked = true;
			
			var run = function(dir, t){
				var left = Math.abs(parseInt(_this.parent.find(".yk-slide-pages").css("left")));
				if(dir == "left"){
					var moveTo = left + _this.perpage*_this.perwidth;
					if(_this.options.pager){
						_this.pageNow = _this.pageNow + 1;
						_this.initBottomNav();
					}
				}else{
					var moveTo = left - _this.perpage*_this.perwidth;
					if(_this.options.pager){
						_this.pageNow = _this.pageNow - 1;
						_this.initBottomNav();
					}
				}
				if(moveTo < 100) moveTo = 0;
				
				if(moveTo > _this.totalWidth - _this.offsetWidth + 20){
					moveTo = _this.totalWidth-_this.offsetWidth;
				}
				_this.parent.find(".yk-slide-pages").animate({left: -moveTo + 'px'},t, "", function(){
					_this.locked=false;
					if(_this.canScroll){
						var left = Math.abs(parseInt(_this.parent.find(".yk-slide-pages").css("left")));
						if(left != 0)_this.leftNav.css({visibility: 'visible'});
						else _this.leftNav.css({visibility: 'hidden'});
						if(left < _this.totalWidth - _this.offsetWidth)_this.rightNav.css({visibility: 'visible'});
						else _this.rightNav.css({visibility: 'hidden'});
					}
				});
			};
			
			run(dir,_this.options.speed);					
			
		},
		turnpage: function(page){
			var _this = this;
			if(_this.locked) return false;
			_this.locked = true;
			if(page < 0) page = 1;
			if(page > _this.pages) page = _this.pages;
			var run = function(page, t){
				var moveTo = (page-1)*_this.perpage*_this.perwidth;
				if(moveTo < 20) moveTo = 0;
				if(moveTo > _this.totalWidth - _this.offsetWidth + 20) moveTo = _this.totalWidth-_this.offsetWidth;
				_this.parent.find(".yk-slide-pages").animate({left: -moveTo + 'px'},t, "", function(){
					_this.locked=false;
					if(_this.canScroll){
						var left = Math.abs(parseInt(_this.parent.find(".yk-slide-pages").css("left")));
						if(left != 0)_this.leftNav.css({visibility: 'visible'});
						else _this.leftNav.css({visibility: 'hidden'});
						if(left < _this.totalWidth - _this.offsetWidth)_this.rightNav.css({visibility: 'visible'});
						else _this.rightNav.css({visibility: 'hidden'});
					}
				});
				_this.pageNow = page;
				_this.initBottomNav();
			};
			
			run(page,_this.options.speed);					
			
		}
		
	};

	hslider.options = {
		direct : "left",//滚动的方向
		autoMove : false,//默认关闭自动滚动
		delay : 5000,//滚动间隔（毫秒）
		speed : 400, //滚动速度毫秒
		pager : false//默认不出分页按钮
	};
	window.hslider = hslider;

	//带时间轴翻页组件
	var timeslider = function(o, options){
		var parent = new hslider(o, options);
		
		parent.prevNav = parent.parent.find('.yk-timeline-prev');
		parent.nextNav = parent.parent.find('.yk-timeline-next');
		if(parent.prevNav.length){
			parent.prevNav.on('click',function(){parent.turn('right');});
			parent.leftNav = parent.leftNav.add(parent.prevNav);
		}
		if(parent.prevNav.length){
			parent.nextNav.on('click',function(){parent.turn('left')});
			parent.rightNav= parent.rightNav.add(parent.nextNav);
		}
		return parent;
	};
	window.timeslider = timeslider;
})(jQuery);
