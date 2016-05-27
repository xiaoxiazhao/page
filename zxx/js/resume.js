// JavaScript Document
function resume(id1,id2){
	var oResume=document.getElementById(id1);
	var oBar=document.getElementById(id2);
	var aSp=oBar.getElementsByTagName('span');
	var timer=null;
	var iNow=0;
	window.onscroll=function(){
		var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
		if(scrollTop>oResume.offsetHeight){
			clearInterval(timer);
		}else{
			clearInterval(timer);
			timer=setInterval(function(){
				move(aSp[iNow],{width:150});
				iNow++;
				iNow=iNow%5;
				oResume.style.backgroundImage='url(Sample%20Pictures/back'+(iNow+1)+'.jpg)';
				for(var i=0;i<aSp.length;i++){
					aSp[i].style.width=0;
				}
			},1000)		
		}
	}
}
