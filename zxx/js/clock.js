// JavaScript Document
function toDou(iNum){
	return iNum<10?'0'+iNum:''+iNum;
}
function clock(id){
	var oClock=document.getElementById(id);
	var aImg = oClock.getElementsByTagName('img');
	function tick(){
		var oDate = new Date();
		var h = oDate.getHours();
		var m = oDate.getMinutes();
		var s = oDate.getSeconds();
		var str = toDou(h)+toDou(m)+toDou(s);
		for(var i = 0;i<aImg.length;i++){
			aImg[i].src='Sample Pictures/clock/'+str.charAt(i)+'.png';
		}
	}
	tick();
	setInterval(tick,1000);

	
}