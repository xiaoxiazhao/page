// JavaScript Document
function rnd(n,m){
     return parseInt(n+Math.random()*(m-n));
}
function skill(id,id2){
	var oBox = document.getElementById(id);
	var oSkill=document.getElementById(id2);
	var R = oBox.offsetWidth/2;
	var N = 10;
	var arr=['html','css','js','ajax','json','jsonp','jQuery','cookie','seajs','Node.js'];
	for(var i=0;i<N;i++){
		var oS = document.createElement('span');
		oS.innerHTML=arr[i];
		oS.style.background='rgba('+rnd(0,256)+','+rnd(0,256)+','+rnd(0,256)+',0.5)';
		oS.a=0;
		oBox.appendChild(oS);
	}
	var aSpan = oBox.getElementsByTagName('span');
	var bOk = true;
	oSkill.onclick=function(){
		if(bOk){
			for(var i=0;i<aSpan.length;i++){
				startMove(aSpan[i],360/N*i);
			}
		}else{
			for(var i=0;i<aSpan.length;i++){
				startMove(aSpan[i],0);
			}
	
		}
		bOk=!bOk;
	};
	function startMove(obj,iTarget){
		var start = obj.a;
		var dis = iTarget-start;
		var count = Math.floor(700/30);
		var n =0;
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			n++;
			var b = n/count;
			var cur = start+dis*b;
			obj.style.left=R+Math.sin(cur*Math.PI/180)*R+'px';
			obj.style.top=R-Math.cos(cur*Math.PI/180)*R+'px';
			obj.a=cur;
			if(n==count){
				clearInterval(obj.timer);
			}
		},30);
	}
};
function backColor(id){
	var oSkillMall=document.getElementById(id);
	aLi=oSkillMall.getElementsByTagName('li');
	for(var i=0;i<aLi.length;i++){
		aLi[i].style.background='rgba('+rnd(0,256)+','+rnd(0,256)+','+rnd(0,256)+',0.5)';	
	}
}