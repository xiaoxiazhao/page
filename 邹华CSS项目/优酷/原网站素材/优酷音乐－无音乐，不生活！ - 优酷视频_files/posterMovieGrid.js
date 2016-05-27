//电视剧大图滚动
(function($){
	var posterMovieGrid = function(option){
		if(typeof(arguments[0]) == 'undefined'){ return false; }
		var option = typeof(arguments[0]) == 'object' ? arguments[0] : {};
		this.option = option;
		this.reset();
		var _this = this;
		jQuery(window).resize(function(){
			//_this.reset();
		});
	};

	posterMovieGrid.prototype = {
		reset:function(o){
			if(typeof(o) == 'object'){
					for(i in o) this.option[i] = o[i];
			}
			option = this.option;
			this.parent = option.parent ? document.getElementById(option.parent) : 'document';
			if(!this.parent) return false;
			this.parent.innerHTML = '';
			this.stop();
			this.delay = option.delay ? option.delay : 6000;
			this.rect = this.parent.offsetWidth;//this.rect = option.rect ? option.rect : this.parent.offsetWidth;
			this.rotatetype = option.rotatetype ? option.rotatetype : 'product';
			this.perpage = option.perpage ? option.perpage : 2;
			this.initnum = option.initnum ? option.initnum : 1;
			this.data = option.data ? (typeof(option.data) == 'object' ? option.data : []) : [];
			
			if(this.data.length == 0){ return; }
			
			this.total = this.data.length;
			this.pagesize = Math.ceil(this.total/this.perpage); 
			if(!this.pagenow)this.pagenow = this.initnum;
			this.pages = [];
			this.pagenums = [];
			this.timer = null;
			this.locked = false;
			this.imgplace = 'http://static.youku.com/index/img/spacer.gif';
			this.paused = false;
			this.pos_start = 0;
			this.gestures = false; //双手指协同
			this.hotcode = option.hotcode ? option.hotcode : false;
			/*
			if(parseInt(jQuery('body').outerWidth())>1255 || navigator.userAgent.indexOf('iPad') !== -1){
					this.width = 1190;	
			}else{
					this.width = 970;	
			}	
			*/
			this.posterVideoPlaying = false;
			this.init();
			this.initpage(this.pagenow);	
		},
		paging: function(){
			var group = document.createElement('DIV');
			group.className = 'page';
			
				var datafrom	= '';
				for(var i=0; i<this.total; i++){
					var data = this.data[i];
					var item = document.createElement('UL');
					item.className = 'item';
					item.setAttribute('sn', i+1);
					var itemStr = '';
					datafrom = this.hotcode ? 'data-from="1-' + (i + 1) + '"' : '';
					itemStr += '<li class="item_img"><img src="'+ data.img +'"></li>';
					itemStr += '<li class="item_url"><a href="'+ data.url +'" target="video" title="'+ data.title +'" ' + datafrom + '></a></li>';					
					item.innerHTML  = itemStr;
					group.appendChild(item);
					if((i+1)%this.perpage == 0 || (i+1) == this.total){
						this.pages.push(group);
						group.setAttribute('pagenum', Math.ceil((i+1)/this.perpage));
						group.className = 'page';
						group = document.createElement('DIV');
					}
				}
				for(var i=0; i<this.pagesize; i++){
					var pagenum = document.createElement('DIV');
					pagenum.setAttribute('pagenum', i+1);
					this.pagenums.push(pagenum);
					this.dompager.appendChild(pagenum);
				}	
		},
		loadimage: function(pagenum){
			var index = pagenum -1;
			var pagecon = this.pages[index];
			var imgs = pagecon.getElementsByTagName('IMG');
			for(var i=0; i<imgs.length; i++){
				var img = imgs[i]; 
				if(img.getAttribute('_src')){
					img.setAttribute('src', img.getAttribute('_src'));
					img.removeAttribute('_src');	
				}
			}
		},
		initpage: function(pagenum){
			var pagenum = (pagenum > this.pagesize) ? this.pagesize : ((pagenum<1) ? 1 :  pagenum);
			var index = pagenum -1;
			var pagecon = this.pages[index];		

			this.posterVideoPlaying = false;
			if( typeof(showPosterAd) == 'function'){
				showPosterAd(pagenum);
			}	

			return this.domitems.appendChild(pagecon);
		},
		turnpage: function(pagenum, type){
			if(this.locked){ return; }
			if(pagenum == this.pagenow){ return; }
			this.locked = true;

			var direction = '';
			if(type == 'auto'){
				if(pagenum>this.pagenow){//后
					direction = 'left';	 
				}else{//前
					direction = 'right';
				}
			}else if(type == 'keep-right'){
				direction = 'right';	
			}else if(type == 'keep-left'){
				direction = 'left';
			}
			
			this.pagenums[pagenum-1].className = 'current';	
			this.pagenums[this.pagenow-1].className = '';
			
			var next = this.initpage(pagenum);
			if(direction == 'left'){next.style.left = this.rect + 'px';}
			else{next.style.left = -this.rect + 'px';}
			
			var _this = this;
			
			var c = direction == 'left' ? -this.rect : this.rect;
			var b = direction == 'left' ? 0 : 0;
			
		var d = 300,t=0;
		
	   
		for (var k = 0; k <=d; k++) { (function(t) {
			   window.setTimeout(function() {
						var ww = c*t/d + b;
				   _this.domitems.style.left = ww + 'px';
				 },
				   t)
			 })(k)
		}
	   setTimeout(function(){
						_this.loadimage(pagenum);
						_this.pages[pagenum - 1].style.left = '0px';
						_this.domitems.style.left = '0px';
						_this.domitems.removeChild(_this.pages[_this.pagenow - 1]);
						_this.pagenow = pagenum;
						_this.locked = false;
		 }, d);	
			if(this.rotatetype == "proinfo") {
				this.stop();
			}
		},
		prev: function(type){
			var pageto = (this.pagenow -1) < 1 ? this.pagesize : this.pagenow - 1; 
			this.turnpage(pageto, typeof(type) == 'undefined' ? 'auto' : type);	
		},
		next: function(type){
			var pageto = (this.pagenow + 1) > this.pagesize ? 1 : this.pagenow + 1; 
			this.turnpage(pageto, typeof(type) == 'undefined' ? 'auto' : type);
		},
		start: function(){
			var _this = this;
			if(_this.paused){ _this.paused = false; }
			if(this.timer){ return; }
			this.timer = setInterval(function(){
				if(!_this.paused){ _this.next('keep-left'); }
			}, this.delay);
		},
		stop: function(){
			clearInterval(this.timer);
			this.timer = null;
		},
		pause: function(){
			this.paused = true;
		},
		init: function(){
			var _this = this;
			this.dom = document.createElement('DIV');
			this.dom.className = 'posterMovieGrid';
			this.domitems = document.createElement('DIV');
			this.domitems.className = 'pages';
			this.dompager = document.createElement('DIV');
			this.dompager.className = 'pager';
		
			this.btnprev = document.createElement('DIV');
			this.btnprev.className = 'btnprev';
			this.btnnext = document.createElement('DIV');
			this.btnnext.className = 'btnnext';
				
			this.paging();
			
			this.dom.appendChild(this.domitems);
			this.dom.appendChild(this.dompager);
			
			this.dom.appendChild(this.btnprev);
			this.dom.appendChild(this.btnnext);
			this.parent.appendChild(this.dom);
			
			this.initpage(this.pagenow);
			this.loadimage(this.pagenow);
			
			if(this.rotatetype == "product") {
				this.pagenums[this.pagenow-1].className = 'current';
			}

			this.bind();
			
			if(this.pagesize > 1){ 
				this.start(); 
			}

		},
		bind: function(){
			var _this = this;
			var ua = navigator.userAgent.toLowerCase();
			var isIOS = ua.match(/ipad|iphone|ipod|itouch/i);
			this.btnprev.style.visibility = 'visible';
			this.btnnext.style.visibility = 'visible';
			for(var i=0; i<this.pagesize; i++){
					this.pagenums[i].ontouchstart = this.pagenums[i].onclick = function(){
						var pagenum = parseInt(this.getAttribute('pagenum'), 10);	
						_this.turnpage(pagenum, 'auto');
					}
			}
			

			this.btnprev.ontouchstart = this.btnprev.onclick = function(){ _this.prev('keep-right'); };
			this.btnnext.ontouchstart = this.btnnext.onclick = function(){ _this.next('keep-left'); };
			//for IOS
			if(isIOS){
				this.dom.ontouchstart = function(e){
					var e = e.targetTouches[0];
					_this.pos_start = e.pageX;
					_this.stop(); 
				};
				this.dom.ontouchend = this.dom.ontouchend = function(){ 
					_this.start();
				};
				this.dom.ontouchmove = function(e){
					if(_this.gestures){ return; }
					var e = e.targetTouches[0];
					//e.stopPropagation();
					//e.preventDefault(); 
					var end = e.pageX;
					var offset = end - _this.pos_start;
					if(offset >= 50){ _this.prev('keep-right'); }
					else if(offset <= -50){ _this.next('keep-left'); }				
					return false;
				};
				this.dompager.ontouchmove = function(){ return false; };
				this.dom.ongesturestart = function(){ _this.gestures = true; };
				this.dom.ongestureend = function(){ _this.gestures = false; }
				
			}else{
				this.dom.onmouseover = function(){ _this.stop(); };
				if(this.rotatetype == 'circle' || this.rotatetype == "product") {
					this.dom.onmouseout = function(){
						if (!_this.posterVideoPlaying) {
							_this.start();
						}
					}	
				}
			}
		}
	};

	window.posterMovieGrid = posterMovieGrid;
})(jQuery);
