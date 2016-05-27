// JavaScript Document
//导航吸顶
function nav(id4){
	var oNav=document.getElementById(id4);
	var oNavT=oNav.offsetTop;
	var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
	if(scrollTop>=oNavT){
			oNav.style.position='fixed';
			oNav.style.top=0;
	}else{
			oNav.style.position='';
	}	
}