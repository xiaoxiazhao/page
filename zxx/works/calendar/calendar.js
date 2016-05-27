// JavaScript Document
(function(){
	var bAdd=true;
	window.calendar=function(oTxt){
		var oDiv=document.createElement('div');
		oDiv.className='my_calendar';
		oDiv.innerHTML='<a href="javascript:;" class="prev">&lt;&lt;</a><h2>2015年6月</h2><a href="javascript:;" class="next">&gt;&gt;</a><ol><li>一</li><li>二</li> <li>三</li><li>四</li><li>五</li><li class="weekend">六</li><li class="weekend">日</li></ol><ul></ul>'
		oTxt.parentNode.insertBefore(oDiv,oTxt);
		
		oTxt.onfocus=function(){
			oDiv.style.left=oTxt.offsetLeft+'px';
			oDiv.style.top=	oTxt.offsetHeight+oTxt.offsetTop+10+'px';
			oDiv.style.display='block';
		}
		var oUl=oDiv.getElementsByTagName('ul')[0];
		var aLi=oUl.children;
		var oPrev=oDiv.getElementsByTagName('a')[0];
		var oNext=oDiv.getElementsByTagName('a')[1];
		var oH2=oDiv.getElementsByTagName('h2')[0];
		var iNow=0;
		function calendar(){
			var oDate=new Date();
			oDate.setMonth(oDate.getMonth()+iNow,1);
			oH2.innerHTML=oDate.getFullYear()+'年'+(oDate.getMonth()+1)+'月'
			oUl.innerHTML='';
			
			var oDate=new Date();
			oDate.setDate(1);
			var w=oDate.getDay();
			if(w==0)w=7;
			w--;
			for(var i=0;i<w;i++){
				var oLi=document.createElement('li');
				oUl.appendChild(oLi);
			}
			
			var oDate=new Date();
			oDate.setMonth(oDate.getMonth()+iNow,1);
			oDate.setMonth(oDate.getMonth()+1,0);
			var n=oDate.getDate();
			for(var i=0;i<n;i++){
				var oLi=document.createElement('li');
				oLi.innerHTML=i+1;
				oUl.appendChild(oLi);
				oLi.onclick=function(){
					var oDate=new Date();
					oDate.setMonth(oDate.getMonth()+iNow,1);
					oTxt.value=oDate.getFullYear()+'-'+(oDate.getMonth()+1)+'-'+this.innerHTML;
					oDiv.style.display='none';
				}
			}
			var oDate=new Date();
			var today=oDate.getDate();
			for(var i=0;i<aLi.length;i++){
				if(iNow<0){
					aLi[i].className='past';
				}else if(iNow==0){
					if(aLi[i].innerHTML<today){
						aLi[i].className='past';	
					}else if(aLi[i].innerHTML==today){
						aLi[i].className='today';	
					}		
				}	
			}	
			
		};
		calendar();
		
		oPrev.onclick=function(){
			iNow--;
			calendar();
		};
		oNext.onclick=function(){
			iNow++;
			calendar();
		};
		
		if(bAdd==false)return;
		bAdd=false;
		var oLink=document.createElement('link');
		oLink.rel='stylesheet';
		oLink.href='calendar.css';
		oHead=document.documentElement.children[0];
		oHead.appendChild(oLink);
	}
})()