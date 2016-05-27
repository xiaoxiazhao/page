// 导航显示隐藏事件
function showHideNav(mO,Snbox){
	var oCol = document.getElementById(mO);
	var oSnbox = document.getElementById(Snbox);
	oCol.onmouseover = function(){
		oSnbox.style.display = 'block';
	}
	oCol.onmouseout = function(){
		oSnbox.style.display = 'none';
	}
}
// banner 移入事件
function oMover(){
	var oBbbox =document.getElementById('bannerbox');
	var oImgbox =document.getElementById('imgbox');
	var aLi = oBbbox.getElementsByTagName('li');

	for (var i = 0; i < aLi.length; i++) {
		aLi[i].index = i;
		aLi[i].onmouseover = function(){
			for (var i = 0; i < aLi.length; i++) {
				aLi[i].className = '';
			};
			this.className = 'active';
			oImgbox.style.backgroundImage = 'url(img/banner'+(this.index+1)+'.jpg)'
		};
		// setTimeout(aLi[i].onmouseover,100)
	};
};
//有侧边的选项卡
function xxk(id2,tag2){
	var oBox2 = document.getElementById(id2);
	var aLi2 = oBox2.getElementsByTagName(tag2);
	for (var i = 0; i < aLi2.length; i++) {
		aLi2[i].onmouseover = function(){
			for (var i = 0; i < aLi2.length; i++) {
				aLi2[i].className = '';
			};
			this.className = 'btn';
		};
	};
}; 
//这个是鼠标移入显示，移出隐藏的事件
function showHide(id,tag){
	var oBox = document.getElementById(id);
	var aLi = oBox.getElementsByTagName(tag);

	for (var i = 0; i < aLi.length; i++) {
		aLi[i].onmouseover = function(){
			this.className = 'btn';
		};
		aLi[i].onmouseout = function(){
			this.className = '';
		};
	};
};