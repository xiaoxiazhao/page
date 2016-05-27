// JavaScript Document
window.onload = function(){

	//搜索
	(function(){
		var aBtn = document.getElementById('search_btn');
		var oConBox = document.getElementById('search_box');
		aBtn.onclick = function(){
			aBtn.value = '';
			if(oConBox.style.display == 'none' || oConBox.style.display == ''){
				oConBox.style.display = 'block';
			}else{
				oConBox.style.display = 'none';
			}
		}
		aBtn.onblur = function(){
			aBtn.value = '爸爸去哪儿2';
			oConBox.style.display = 'none';
		}
	})();
	
	//观看记录
	(function(){
		var aBtn = document.getElementById('ads_btn');
		var oConBox = document.getElementById('ads_box');
		aBtn.onclick = function(){
			if(oConBox.style.display == 'none' || oConBox.style.display == ''){
				oConBox.style.display = 'block';
			}else{
				oConBox.style.display = 'none';
			}
		}
	})();
	
	//主导航
	(function(){
		var oBox = document.getElementById('nav_btn');
		var aBtn = oBox.getElementsByTagName('a');
		var aBtn1 = oBox.getElementsByTagName('span')
			for(var i=0; i<aBtn.length; i++){
				aBtn[i].index=i;
				aBtn[i].onclick = function(){
					for(var i=0; i<aBtn.length; i++){
						aBtn[i].className = '';
						aBtn1[i].className = 'span_bg';
					}
					this.className = 'active';
					aBtn1[this.index].className = 'span_bg active1';
				}
			}
	})();
	
	//banner-自动播放选项卡
	(function(){
		var oBtnBox = document.getElementById('btn_box');
		var oBox = oBtnBox.children;	//左右按钮
		var aBtn= oBox[3].children;		//选项卡按钮
		var oConBox = document.getElementById('ul1');
		var aCon = oConBox.children;	//选项卡内容
		var iNow = 0;
		var timer = null;
		//选项卡按钮
		for(var i=0; i<aBtn.length; i++){
			aBtn[i].index = i;
			aBtn[i].onmouseover = function(){
				for(var i=0; i<aBtn.length; i++){
					aBtn[i].className = '';
					aCon[i].style.display = 'none';
				}
				this.className = 'active';
				aCon[this.index].style.display = 'block';
			}
		}
		//next
		oBox[1].onclick = function(){
			for(var i=0; i<aBtn.length; i++){
				aBtn[i].className = '';
				aCon[i].style.display = 'none';
			}
			iNow++;
			if(iNow == aBtn.length){
				iNow = 0;
			}
			aBtn[iNow].className = 'active';
			aCon[iNow].style.display = 'block';
		};
		//prev
		oBox[2].onclick = function(){
			for(var i=0; i<aBtn.length; i++){
				aBtn[i].className = '';
				aCon[i].style.display = 'none';
			}
			iNow--;
			if(iNow <= 0){
				iNow = aBtn.length-1;
			}
			aBtn[iNow].className = 'active';
			aCon[iNow].style.display = 'block';
		};
		//自动播放定时器
		function autoPlay(){
			for(var i=0; i<aBtn.length; i++){
				aBtn[i].className = '';
				aCon[i].style.display = 'none';
			}
			iNow++;
			if(iNow == aBtn.length){
				iNow = 0;
			}
			aBtn[iNow].className = 'active';
			aCon[iNow].style.display = 'block';
		}
		timer = setInterval(autoPlay,3000);
		//移入显示按钮
		oBtnBox.onmouseover = function(){
			oBox[1].style.display = oBox[2].style.display = 'block';
			clearInterval(timer);
		}
		//移出
		oBtnBox.onmouseout = function(){
			oBox[1].style.display = oBox[2].style.display = 'none';
			timer = setInterval(autoPlay,3000);
		};
	})();
	//bannerR
	(function(){
		var oBtnBox = document.getElementById('banner_tab');
		var aBtn = oBtnBox.getElementsByTagName('a');
		var oConBox = document.getElementById('banner_item');
		var aCon = oConBox.getElementsByTagName('ul');
		for(var i=0; i<aBtn.length; i++){
			aBtn[i].index = i;
			aBtn[i].onmouseover = function(){
				for(var i=0; i<aBtn.length; i++){
					aBtn[i].className = '';
					aCon[i].style.display = 'none';
				}
				this.className = 'active';
				aCon[this.index].style.display = 'block';
			}
		}
	})();
	//今日
	(function(){
		var oBtnBox = document.getElementById('hot_ul1');
		var aBtn = oBtnBox.getElementsByTagName('li');
		var oConBox = document.getElementById('hot_box');
		var aCon = oConBox.children;
		for(var i=0; i<aBtn.length; i++){
			aBtn[i].index = i
			aBtn[i].onmouseover = function(){
				for(var i=0; i<aBtn.length; i++){
					aBtn[i].className = '';
					aCon[i].style.display = 'none';
				}
				this.className = 'active';
				aCon[this.index].style.display = 'block';
			}
		}
	})();
	//电视剧
	(function(){
		var oBtnBox = document.getElementById('tv_btn');
		var aBtn = oBtnBox.getElementsByTagName('li');
		var oConBox = document.getElementById('tv_box');
		var aCon = oConBox.children;
		for(var i=0; i<aBtn.length; i++){
			aBtn[i].index = i;
			aBtn[i].onmouseover = function(){
				for(var i=0; i<aBtn.length; i++){
					aBtn[i].className = '';
					aCon[i].style.display = 'none';
				}
				this.className = 'active';
				aCon[this.index].style.display = 'block';
			}
		}
	})();
	//电影
	(function(){
		var oBtnBox = document.getElementById('film_btn');
		var aBtn = oBtnBox.getElementsByTagName('li');
		var oConBox = document.getElementById('film_box');
		var aCon = oConBox.children;
		for(var i=0; i<aBtn.length; i++){
			aBtn[i].index = i;
			aBtn[i].onmouseover = function(){
				for(var i=0; i<aBtn.length; i++){
					aBtn[i].className = '';
					aCon[i].style.display = 'none';
				}
				this.className = 'active';
				aCon[this.index].style.display = 'block';
			}
		}
	})();
	//热播榜
	(function(){
		var oBtnBox = document.getElementById('hot_play_btn');
		var aBtn = oBtnBox.getElementsByTagName('li');
		var oConBox = document.getElementById('hot_play_box');
		var aCon = oConBox.children;
		for(var i=0; i<aBtn.length; i++){
			aBtn[i].index = i;
			aBtn[i].onmouseover = function(){
				for(var i=0; i<aBtn.length; i++){
					aBtn[i].className = '';
					aCon[i].className = 'list_box';
				}
				this.className = 'active';
				aCon[this.index].className = 'list_box hot_active';
			}
		}
	})();
	//卫视热播
	(function(){
		var oBtnBox = document.getElementById('hit_btn');
		var aBtn = oBtnBox.getElementsByTagName('li');
		var oConBox = document.getElementById('hit_box');
		var aCon = oConBox.children;
		for(var i=0; i<aBtn.length; i++){
			aBtn[i].index = i;
			aBtn[i].onmouseover = function(){
				for(var i=0; i<aBtn.length; i++){
					aBtn[i].className = '';
					aCon[i].style.display = 'none';
				}
				this.className = 'active';
				aCon[this.index].style.display = 'block';
			}
		}
	})();
	//排行榜
	(function(){
		var oBtnBox = document.getElementById('rink_btn');
		var aBtn = oBtnBox.getElementsByTagName('li');
		var oConBox = document.getElementById('rink_box');
		var aCon = oConBox.children;
		for(var i=0; i<aBtn.length; i++){
			aBtn[i].index = i;
			aBtn[i].onmouseover = function(){
				for(var i=0; i<aBtn.length; i++){
					aBtn[i].className = '';
					aCon[i].style.display = 'none';
				}
				this.className = 'active';
				aCon[this.index].style.display = 'block';
			}
		}
	})();
}



