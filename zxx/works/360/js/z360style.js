// JavaScript Document
window.onload = function(){
	//搜索
	var oSearchBtn = document.getElementById('search_btn');
	var oSearchBox = document.getElementById('search_box');
	oSearchBtn.onclick = function(){
		if(oSearchBox.style.display == 'none' || oSearchBox.style.display == ''){
			oSearchBox.style.display = 'block';
		}else{
			oSearchBox.style.display = 'none';
		}
	}
	//观看记录
	var oAdsBtn = document.getElementById('ads_btn');
	var oAdsBox = document.getElementById('ads_box');
	oAdsBtn.onclick = function(){
		if(oAdsBox.style.display == 'none' || oAdsBox.style.display == ''){
			oAdsBox.style.display = 'block';
		}else{
			oAdsBox.style.display = 'none';
		}
	}
	//主导航
	var aNavBtn = document.getElementById('nav_btn');
	var aNavA = aNavBtn.getElementsByTagName('a');
		for(var i=0; i<aNavA.length; i++){
			aNavA[i].index = i;
			aNavA[i].onclick = function(){
				//var aNavA = this.getElementsByTagName('a')[0];
				var aNavSpan = this.getElementsByTagName('span')[0];
				for(var i=0; i<aNavA.length; i++){
					aNavA[i].className = '';
					aNavSpan[i].className = '';
				}
				this.className = 'active';
				aNavSpan.className = 'span_bg active1';
			}
		}
}



