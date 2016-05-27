// JavaScript Document
window.onload=function(){
	var oHead=document.getElementById('headR');
	var aLi=oHead.getElementsByTagName('li');
	for(var i=0;i<aLi.length;i++){
		aLi[i].onmouseover=function(){
			alert(1)
			var oSpan1=aLi[0].getElementsByTagName('span')[0];
			var oSpan2=aLi[0].getElementsByTagName('span')[0];
			var oSpan3=aLi[0].getElementsByTagName('span')[0];
			oSpan1.style.backgroundPosition='0 -100px;';	
			
		}
		
	}
	
	
}