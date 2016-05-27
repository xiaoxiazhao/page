/**
  * 侧边栏
  * add by xingfei 2014-03-12（植树节）
  *
  */
(function(){
	
	UC_DOMAIN = window.UC_DOMAIN || "i.youku.com";
	
	var SideTool = {
		tool: 'sideTool',
		token: '',
		curpanel: '',
		isLogin: false,
		loginUID: 0,
		tmpUDI: 0,
		isfirstcome: true,
		issinitnotice: true,
		freq: 30000,
		settingisshow: false,
		shoppingisshow: true,

		classOpen: 'yk-toolbar-group-open',
		classHover: 'yk-toolbar-group-hover',
		$curOpenGroup:null,
		scrollBarWidth:null,

		userinfo:{
			userid: '',
			username: '',
			usericonsmall:''
		},
		modleicon:{
        	user: {modlename:'user',modleitemid:'iconitemuser',modlegroupid:'icongroupuser',callback:'SideTool.showUserMsg'},
        	collect: {modlename:'collect',modleitemid:'iconitemcollect',modlegroupid:'icongroupcollect',callback:'SideTool.showCollectList'},
        	record: {modlename:'record',modleitemid:'iconitemrecord',modlegroupid:'icongrouprecord',callback:'SideTool.showRecordList'},
        	subscript: {modlename:'subscript',modleitemid:'iconitemsubscript',modlegroupid:'icongroupsubscript',callback:'SideTool.showSubscriptList'},
        	notice: {modlename:'notice',modleitemid:'iconitemnotice',modlegroupid:'icongroupnotice',callback:'SideTool.showNoticeList'},
        	member: {modlename:'member',modleitemid:'iconitemmember',modlegroupid:'icongroupmember',callback:'SideTool.showMemberList'},
        	eshop: {modlename:'eshop',modleitemid:'iconitemshopping',modlegroupid:'icongroupshopping',callback:'SideTool.showShoppingList'},
        	setting: {modlename:'setting',modleitemid:'iconitemset',modlegroupid:'icongroupset',callback:'SideTool.showSetList'},
        	gotop: {modlename:'gotop',modleitemid:'iconitemgotop',modlegroupid:'icongroupgotop',callback:''},
        	lightoff: {modlename:'lightoff',modleitemid:'iconitemlighton',modlegroupid:'lightoff',callback:''},
        	feedback: {modlename:'feedback',modleitemid:'iconitemfeedback',modlegroupid:'icongroupfeedback',callback:''}
		},
		panel: {
			user:     		'paneluser',
			userinfo:     	'paneluserinfo',
			collect:  		'panelcollect',
			collectlist:	'panelcollectlist',
			collectinfo:	'panelcollectinfo',
			record:			'panelrecord',
			recordlist:		'panelrecordlist',
			recordinfo:		'panelrecordinfo',
			subscript:  	'panelsubscript',
			subscriptlist:	'panelsubscriptlist',
			subscriptinfo:	'panelsubscriptinfo',
			notice:  		'panelnotice',
			noticelist:		'panelnoticelist',
			noticeinfo:		'panelnoticeinfo',
			member:			'panelmember',
			memberinfo:     'panelmemberinfo',
			memberlist:     'panelmemberlist',
			shopping:		'panelshopping',
			shoppinginfo:   'panelshoppinginfo',
			shoppinglist:   'panelshoppinglist',
			set:			'panelset',
			setinfo:    	'panelsetinfo',
			setlist:    	'panelsetlist'
		},
		toolbar:{
			service:         'toolbarservice',
			setting:		 'toolbarsetting',
			util:			 'toolbarutil'
        },
		light:{
			isshow:			false,
			lstatus:		'on',
			mask:			'playshow_mask',
			dark:			'sideToolDark',
			on:				'lighton',
			cookie:			{ name: 'light', value: { on:  'on', off: 'off' }, expires: 3600 }
		},
		tips:{
			user: {showmodle:'icongroupuser',modleotherid:'',text:'您有新任务哦~',cookietime:365,isshow:false},
			collect: {showmodle:'icongroupcollect',modleotherid:'collect',text:'',cookietime:365,isshow:false},
			record: {showmodle:'icongrouprecord',modleotherid:'record',text:'',cookietime:365,isshow:false},
			subscript: {showmodle:'icongroupsubscript',modleotherid:'subscription',text:'刚订阅的在这里哦~',cookietime:365,isshow:false},
			notice: {showmodle:'icongroupnotice',modleotherid:'',text:'',cookietime:365,isshow:false},
			member: {showmodle:'icongroupmember',modleotherid:'',text:'',cookietime:365,isshow:false},
			eshop: {showmodle:'icongroupshopping',modleotherid:'cart',text:'',cookietime:365,isshow:false}
		},
		
		noticetotal:		0,
		subnoticetotal:		0,
		shownoticetotal:	0,
		noticeDetails:{
			sysmsg: 			{nid:'7',label:'sysmsg', count: 0, url:'/u/home/type_sysmsg',time:0},
			dms:				{nid:'3',label:'dms',count:0,url:'/u/home/type_privatemsg',time:0},
			video_reply:		{nid:'4',label:'video_reply',count:0,url:'/u/comments/gt_reces_ct_2',time:0},
			statuses_comments:	{nid:'',label:'statuses_comments',count:0,url:'/u/comments',time:0},
			//statuses_mentions:	{nid:5,label:'statuses_mentions',count:0,url:'/u/home/type_mentions',time:0},	
			followers:			{nid:'6',label:'followers',count:0,url:'/u/profile/type_friends_s_fans',time:0},
			hudong: 			{nid:'',label:'hudong', count: 0,time:0},
			xingmeng_live:		{nid:'8',label:'xingmeng_live', count: 0,time:0}
		},
		noticeDetailsOrder:		null,
		
		subDetails:{
			star_statuses:		{nid:'',label:'star_statuses',count:0,time:0},
			new_subscribe:		{nid:'1',label:'new_subscribe',count:0,url:'/u/home?type=subscribe',time:0}
		},
		
		showDetails:{
			show_statuses :		{nid:'2',label:'show_statuses',count:0,time:0}
		},
		
		noticeMember:{
			start: '2014-11-27',
			end: '2014-12-10',
			cookietime:	365
		},

		logoutcollect: '<div class="yk-toolbar-mod-bd"><div class="yk-toolbar-collect-nologin"><span>登录后才可以查看收藏</span><a class="yk-toolbar-link-block yk-toolbar-link-block-blue" href="javascript:;" onclick="login({type:\'toolbar\',callBack:\'SideTool.showModleEvent\'},SideTool.modleicon.collect);return false;">立即登录</a><img src="http://static.youku.com/index/img/toolbar/toolbar_tips_01.jpg"></div></div>',
		collectfooter: '<div class="yk-toolbar-mod-ft"><div class="yk-toolbar-mod-links"><a href="http://'+UC_DOMAIN+'/u/home?type=favorite" target="_blank">查看全部</a></div></div>',
		nocollectfooter: '<div class="yk-toolbar-mod-ft"><div class="yk-toolbar-mod-links  yk-toolbar-mod-links-disabled ">查看全部</div></div>',
		collectheader: '<div class="yk-toolbar-mod-hd"><div class="yk-toolbar-mod-title"><a class="mod-title-link" href="http://'+UC_DOMAIN+'/u/home?type=favorite" target="_blank"><span class="yk-toolbar-group-item-icon icon-collect-hd"></span><span class="yk-toolbar-mod-title-txt">我的收藏</span></a></div></div>',
		collectnull: '<div class="yk-toolbar-mod-bd"><div class="yk-toolbar-collect-empty"><span class="yk-toolbar-collect-null-txt"></span><img src="http://static.youku.com/index/img/toolbar/toolbar_tips_01.jpg"></div></div>',
			
		logoutrecord: '<div class="yk-toolbar-record-nologin"><a class="yk-toolbar-link-block yk-toolbar-link-block-blue" href="javascript:;" onclick="login({type:\'toolbar\',callBack:\'SideTool.showRecordList\'});return false;">立即登录</a></div>',
		recordfooter: '<div class="yk-toolbar-mod-ft"><div class="yk-toolbar-mod-links"><a href="http://'+UC_DOMAIN+'/u/home?type=watch_timeline" target="_blank">查看全部</a></div></div>',
		norecordfooter: '<div class="yk-toolbar-mod-ft"><div class="yk-toolbar-mod-links  yk-toolbar-mod-links-disabled ">查看全部</div></div>',
		recordheader: '<div class="yk-toolbar-mod-hd"><div class="yk-toolbar-mod-title"><a class="mod-title-link" href="http://'+UC_DOMAIN+'/u/home?type=watch_timeline" target="_blank"><span class="yk-toolbar-group-item-icon icon-record-hd"></span><span class="yk-toolbar-mod-title-txt">我的记录</span></a></div></div>',
		recordnull: '<div class="yk-toolbar-record-null"><span class="yk-toolbar-record-null-txt"></span></div>',
		
		logoutsubscript: '<div class="yk-toolbar-mod-bd"><div class="yk-toolbar-subscript-nologin"><span>登录后才可以查看订阅~</span><a class="yk-toolbar-link-block yk-toolbar-link-block-blue" href="javascript:;" onclick="login({type:\'toolbar\',callBack:\'SideTool.showModleEvent\'},SideTool.modleicon.subscript);return false;">立即登录</a><img src="http://static.youku.com/index/img/toolbar/toolbar_tips_02.jpg"></div></div>',
		subscriptfooter: '<div class="yk-toolbar-mod-ft"><div class="yk-toolbar-mod-links"><a href="http://'+UC_DOMAIN+'/u/home?type=subscribe" target="_blank">查看全部</a></div></div>',
		nosubscriptfooter: '<div class="yk-toolbar-mod-ft"><div class="yk-toolbar-mod-links  yk-toolbar-mod-links-disabled ">查看全部</div></div>',
		subscriptheader: '<div class="yk-toolbar-mod-hd"><div class="yk-toolbar-mod-title"><a class="mod-title-link" href="http://'+UC_DOMAIN+'/u/home?type=subscribe" target="_blank"><span class="yk-toolbar-group-item-icon icon-subscription-hd"></span><span class="yk-toolbar-mod-title-txt">我的订阅</span></a></div><span class="hd-action" id="clearallunreadstatus"  data-stat-role="ck">全部已读</span></div>',
		subscriptnull: '<div class="yk-toolbar-mod-bd"><div class="yk-toolbar-subscript-null"><span class="yk-toolbar-subscript-null-txt"></span><img src="http://static.youku.com/index/img/toolbar/toolbar_tips_02.jpg"></div></div>',
		
		logoutnotice: '<div class="yk-toolbar-mod-bd"><div class="yk-toolbar-subscript-nologin"><span>登录后才可以查看通知~</span><a class="yk-toolbar-link-block yk-toolbar-link-block-blue" href="javascript:;" onclick="login({type:\'toolbar\',callBack:\'SideTool.showModleEvent\'},SideTool.modleicon.notice);return false;">立即登录</a></div></div>',
		noticefooter: '<div class="yk-toolbar-mod-ft"><div class="yk-toolbar-mod-links"><a href="http://'+UC_DOMAIN+'/u/comments" target="_blank">查看全部</a></div></div>',
		nonoticefooter: '<div class="yk-toolbar-mod-ft"><div class="yk-toolbar-mod-links  yk-toolbar-mod-links-disabled ">查看全部</div></div>',
		noticeheader: '<div class="yk-toolbar-mod-hd"><div class="yk-toolbar-mod-title"><a class="mod-title-link" href="http://'+UC_DOMAIN+'/u/comments" target="_blank"><span class="yk-toolbar-group-item-icon icon-notice-hd"></span><span class="yk-toolbar-mod-title-txt">我的通知</span></a></div></div>',
		noticenull: '<div class="yk-toolbar-mod-bd"><div class="yk-toolbar-notice-null"><span>还没有任何通知！</span></div></div>',
		
		memberfooter: '<div class="yk-toolbar-mod-ft"><div class="yk-toolbar-mod-links"><a href="http://cps.youku.com/redirect.html?id=0000f1ad" target="_blank">进入会员中心</a></div></div>',
		memberheader: '<div class="yk-toolbar-mod-hd"><div class="yk-toolbar-mod-title"><a class="mod-title-link" href="http://cps.youku.com/redirect.html?id=0000f1ad" target="_blank"><span class="yk-toolbar-group-item-icon icon-member-hd"></span><span class="yk-toolbar-mod-title-txt">会员</span></a></div></div>',

		logoutshopping: '<div class="yk-toolbar-subscript-nologin"><span>登录后，购物车中的商品将永久保存~</span><a class="yk-toolbar-link-block yk-toolbar-link-block-blue" href="javascript:;" onclick="login({type:\'toolbar\',callBack:\'SideTool.showModleEvent\'},SideTool.modleicon.eshop);return false;">立即登录</a></div>',
		shoppingfooter: '<div class="yk-toolbar-mod-ft"><img src="http://static.youku.com/index/img/toolbar/scroll_cover_ft.png" class="yk-toolbar-scover yk-toolbar-scover-ft"><div class="yk-toolbar-mod-links "><a href="http://'+UC_DOMAIN+'/i/">查看全部</a></div></div>',
		noshoppingfooter: '<div class="yk-toolbar-mod-ft"><img src="http://static.youku.com/index/img/toolbar/scroll_cover_ft.png" class="yk-toolbar-scover yk-toolbar-scover-ft"><div class="yk-toolbar-mod-links "><a href="http://'+UC_DOMAIN+'/i/">查看全部</a></div></div>',
		shoppingheader: '<div class="yk-toolbar-mod-hd"><img src="http://static.youku.com/index/img/toolbar/scroll_cover_hd.png" class="yk-toolbar-scover yk-toolbar-scover-hd"><div class="yk-toolbar-mod-title"><a class="mod-title-link mod-title-link-extend"><span class="yk-toolbar-group-item-icon yk-toolbar-group-item-icon-extend icon-cart-hd"></span><span class="yk-toolbar-mod-title-txt">购物车</span></a></div><span class="hd-cart-num" id="goodsnum"></span></div>',
		shoppingnull: '<div class="yk-toolbar-mod-bd"><div class="yk-toolbar-cart-11ad"><a onclick="SideTool._eshopStatisticsClothCoad(\'click\',\'cart_banner \',\'\',\'\',\'\',\'\',\''+encodeURIComponent('http://c.youku.com/bkbm/index')+'\');" href="http://c.youku.com/bkbm/index.html" target="_blank"></a></div><div class="yk-toolbar-subscript-nologin"><span>您还没有选购商品呢~</span></div><img class="cart-tips" src="http://static.youku.com/index/img/toolbar/toolbar_tips_04.png"></div>',
		
		loading: '<div class="yk-toolbar-loading-wrap" style="display:;"><div class="yk-toolbar-loading"><span class="ico__loading_64"></span></div></div>',

		init:function(){
			var _this = this;
			var isHide = _this.isHideSideTool();
			if(isHide){
				return;	
			}
			_this.initSideToolFrame();
			setTimeout(function(){
				//初始化头像及notice轮询
				_this.initSideTool();
				window['update_login_status_hook_sidetooluserimg'] = SideTool.initSideTool;
				
				_this.bind();			
			},100);
		},
		isHideSideTool: function(){
			if($(this.light.mask) && $(this.light.dark)){
				this.light.isshow = true;	
			}
			if(window.yk_hpage_style &&  window.yk_hpage_style == 'individual'){
				this.settingisshow = true;
			}
			if(window.yk_hpage_style &&  window.yk_hpage_style == 'individual'){
				this.shoppingisshow = false;
			}
			/*else if(typeof(window.catId) == 'undefined' || (window.catId != 99 && window.catId != 100 && window.catId != 85) ){
				this.shoppingisshow = false;
			}*/
			if(typeof(window.yk_toolbar_close) != "undefined"){
				return true;
			}
			var ua = navigator.userAgent.toLowerCase();
			if(ua.match(/iphone|ipod|itouch|android|windows phone/i) || (ua.match(/ipad/i) && $('padsideTool'))){
				return true;
			}
		},
		initSideToolFrame: function(){
            var sideTool = document.createElement('div');
			sideTool.style.cssText = "display:none;";
            sideTool.setAttribute("id","sideTool");
            sideTool.className = "yk-toolbar";

            var sideToolService = document.createElement('div');
			sideToolService.className = "yk-toolbar-service js-toolbar";
            sideToolService.setAttribute("id","toolbarservice");
			sideToolService.setAttribute("data-stat-role","ck");
			var sideTooluser = document.createElement('div');
			sideTooluser.className = "yk-toolbar-group yk-toolbar-group";
			sideTooluser.setAttribute('id' , 'icongroupuser');
			sideTooluser.innerHTML = '<div class="yk-toolbar-group-item yk-toolbar-group-item-top" id="iconitemuser" data-stat-role="ck"><div id="iconnologinuserimg"><div class="yk-toolbar-group-item-icon icon-user"></div><div class="yk-toolbar-group-item-txt">用户</div></div><a href="javascript:void(0);" class="yk-toolbar-icon-user icon-user" id="iconloginuserimg"></a></div><div class="yk-toolbar-group-panel" id="paneluser"></div><iframe class="mask" scrolling="0" frameborder="0" id="userinfomask"></iframe>';
			sideToolService.appendChild(sideTooluser);
			var sideToolfavo = document.createElement('div');
			sideToolfavo.className = "yk-toolbar-group";
            sideToolfavo.setAttribute('id' , 'icongroupcollect');
			sideToolfavo.innerHTML = '<div class="yk-toolbar-group-item yk-toolbar-group-item-top js-dest-collect" id="iconitemcollect" data-stat-role="ck"><div class="yk-toolbar-notice-aim" id="newnoticeiconshow" style="display:none"></div><div class="yk-toolbar-group-item-icon icon-collect"></div><div class="yk-toolbar-group-item-txt">收藏</div></div><div class="yk-toolbar-group-panel"  id="panelcollectinfo"><div class="yk-toolbar-mod" id="panelcollectlist"></div></div><iframe class="mask" scrolling="0" frameborder="0" id="collectmask"></iframe>';
			sideToolService.appendChild(sideToolfavo);
			var sideToolhistory = document.createElement('div');
			sideToolhistory.className = 'yk-toolbar-group';
            sideToolhistory.setAttribute('id' , 'icongrouprecord');
			sideToolhistory.innerHTML = '<div class="yk-toolbar-group-item yk-toolbar-group-item-top js-dest-record" id="iconitemrecord" data-stat-role="ck"><div class="yk-toolbar-group-item-icon icon-record"></div><div class="yk-toolbar-group-item-txt">记录</div></div><div class="yk-toolbar-group-panel" id="panelrecordinfo"><div class="yk-toolbar-mod" id="panelrecordlist"></div></div><iframe class="mask" scrolling="0" frameborder="0" id="recordmask"></iframe>';
			sideToolService.appendChild(sideToolhistory);
			var sideToolsubscription = document.createElement('div');
			sideToolsubscription.className = "yk-toolbar-group";
            sideToolsubscription.setAttribute('id' , 'icongroupsubscript');
			sideToolsubscription.innerHTML = '<div class="yk-toolbar-group-item yk-toolbar-group-item-top js-dest-subscription" id="iconitemsubscript" data-stat-role="ck"><div class="yk-toolbar-notice-aim" id="newnoticeiconsub" style="display:none"></div><div class="yk-toolbar-group-item-icon icon-subscription"></div><div class="yk-toolbar-group-item-txt">订阅</div></div><div class="yk-toolbar-group-panel"  id="panelsubscriptinfo"><div class="yk-toolbar-mod" id="panelsubscriptlist"></div></div><iframe class="mask" scrolling="0" frameborder="0" id="subscriptmask"></iframe>';
			sideToolService.appendChild(sideToolsubscription);
			var sideToolnotice = document.createElement('div');
			sideToolnotice.className = 'yk-toolbar-group';
            sideToolnotice.setAttribute('id' , 'icongroupnotice');
			sideToolnotice.innerHTML = '<div class="yk-toolbar-group-item yk-toolbar-group-item-top js-dest-notice" id="iconitemnotice" data-stat-role="ck"><div class="yk-toolbar-notice-aim" id="newnoticeicon" style="display:none"></div><div class="yk-toolbar-group-item-icon icon-notice"></div><div class="yk-toolbar-group-item-txt">通知</div></div><div class="yk-toolbar-group-panel" id="panelnoticeinfo"><div class="yk-toolbar-mod" id="panelnoticelist"></div></div><iframe class="mask" scrolling="0" frameborder="0" id="noticemask"></iframe>';
			sideToolService.appendChild(sideToolnotice);
			var sideToolmember = document.createElement('div');
			sideToolmember.className = "yk-toolbar-group";
			sideToolmember.setAttribute('id' , 'icongroupmember');
			sideToolmember.innerHTML = '<div class="yk-toolbar-group-item yk-toolbar-group-item-top js-dest-member" id="iconitemmember" data-stat-role="ck"><div class="yk-toolbar-notice-aim" id="newnoticeiconmember" style="display:none"></div><div class="yk-toolbar-group-item-icon icon-member"></div><div class="yk-toolbar-group-item-txt">会员</div></div><div class="yk-toolbar-group-panel"  id="panelmemberinfo"><div class="yk-toolbar-mod" id="panelmemberlist"></div></div><iframe class="mask" scrolling="0" frameborder="0" id="membermask"></iframe>';
			sideToolService.appendChild(sideToolmember);
			sideTool.appendChild(sideToolService);
			if(this.shoppingisshow){
				var sideToolshopping = document.createElement('div');
				sideToolshopping.className = "yk-toolbar-group";
				sideToolshopping.setAttribute('id' , 'icongroupshopping');
				sideToolshopping.innerHTML = '<div class="yk-toolbar-group-item yk-toolbar-group-item-top js-dest-cart" id="iconitemshopping" data-stat-role="ck"><div class="yk-toolbar-notice-aim yk-toolbar-notice-aim-extend" id="newnoticeiconshopping" style="display:none"></div><div class="yk-toolbar-group-item-icon icon-cart"></div><div class="yk-toolbar-group-item-txt">购物车</div></div><div class="yk-toolbar-group-panel"  id="panelshoppinginfo"><div class="yk-toolbar-mod" id="panelshoppinglist"></div></div><iframe class="mask" scrolling="0" frameborder="0" id="shoppingmask"></iframe>';
				sideToolService.appendChild(sideToolshopping);
				sideTool.appendChild(sideToolService);
			}
			
			if(this.settingisshow){
				var sideToolSetting = document.createElement('div');
				sideToolSetting.className = "yk-toolbar-setting js-toolbar";
				sideToolSetting.setAttribute("id","toolbarsetting");
				sideToolSetting.setAttribute("data-stat-role","ck");
				var sideToolset = document.createElement('div');
				sideToolset.className = "yk-toolbar-group";
				sideToolset.setAttribute('id' , 'icongroupset');
				sideToolset.innerHTML = '<div class="yk-toolbar-group-item js-dest-setting" id="iconitemset" data-stat-role="ck"><div class="yk-toolbar-group-item-icon icon-setting">'+
										'</div><div class="yk-toolbar-group-item-icon icon-setting icon-setting-clone"></div><div class="yk-toolbar-group-item-txt">订制<br>首页</div></div>';
				sideToolSetting.appendChild(sideToolset);
				sideTool.appendChild(sideToolSetting);
			}

			//抽奖入口
			if(window.lottery_open_sidetool){
				var sideToollottery = document.createElement('div');
				sideToollottery.className = "yk-toolbar-draw js-draw";
				sideToollottery.setAttribute('id' , 'lotteryToolbar');
				sideToollottery.style.marginTop = "30px";
				sideToollottery.style.position = "relative";
				sideToollottery.style.zIndex = "50";
				sideTool.appendChild(sideToollottery);
			}

			var sideToolUtil = document.createElement('div');
			sideToolUtil.className = "yk-toolbar-util js-toolbar";
            sideToolUtil.setAttribute("id","toolbarutil");
            var sideToolgotop = document.createElement('div');
			sideToolgotop.className = "yk-toolbar-group yk-toolbar-group";
			sideToolgotop.setAttribute('id' , 'icongroupgotop');
			sideToolgotop.style.visibility = 'hidden';
			sideToolgotop.innerHTML = '<div class="yk-toolbar-group-item js-dest-goTop" data-stat-role="ck" id="iconitemgotop"><div class="yk-toolbar-group-item-icon icon-gotop"></div></div>';
			sideToolUtil.appendChild(sideToolgotop);
			if(this.light.isshow == true){
				var sideToollighton = document.createElement('div');
				sideToollighton.className = "yk-toolbar-group";
	            sideToollighton.setAttribute('id' , 'lightoff');
				sideToollighton.innerHTML = '<div class="yk-toolbar-group-item js-dest-lightOn" id="iconitemlighton" data-stat-role="ck"><div class="yk-toolbar-group-item-icon icon-lightoff" title="关灯"></div></div>';
				sideToolUtil.appendChild(sideToollighton);
			}
			var sideToolfeedback = document.createElement('div');
			sideToolfeedback.className = "yk-toolbar-group";
			sideToolfeedback.setAttribute('id' , 'icongroupfeedback');
			sideToolfeedback.innerHTML = '<div class="yk-toolbar-group-item js-dest-feedback" id="iconitemfeedback" data-stat-role="ck"><a href="http://www.youku.com/service/feed/subtype_16/" target="_blank" title="反馈"><div class="yk-toolbar-group-item-icon icon-feedback"></div></a></div>';
			sideToolUtil.appendChild(sideToolfeedback);
			sideTool.appendChild(sideToolUtil);

			document.body.appendChild(sideTool);
			
			this.sideT = document.getElementById(this.tool);
			if(!this.sideT){
				return false;
			}else{
				this.sideT.style.display='block';
			}
			
			setTimeout(function(){
				document.body.style.cssText += "padding-right:50px;min-width:1002px;";
				SideTool._removeHover(document.body , 'yk-toolbar-type');
			},200);
        },
		bind: function(){
			var _this = this;
			
			//用户信息
			_this.showModleEventBind(_this.modleicon.user);
			//收藏
			_this.showModleEventBind(_this.modleicon.collect);		
			//记录
			_this.showModleEventBind(_this.modleicon.record);
			//订阅
			_this.showModleEventBind(_this.modleicon.subscript);
			//通知
			_this.showModleEventBind(_this.modleicon.notice);	
			//会员
			_this.showModleEventBind(_this.modleicon.member);	
			//购物车
			_this.showModleEventBind(_this.modleicon.eshop);
			//设置
			if(_this.settingisshow){
				_this.showModleEventBind(_this.modleicon.setting);
			}
			
			//gototop
			if($(_this.modleicon.gotop.modleitemid)){
				_this.showModleEventBind(_this.modleicon.gotop);
				
				this.sideToolGoTop();
				this._addEvent(window,'scroll',function(){
					_this.sideToolGoTop();
				});
			}

			//开灯关灯
			if(_this.light.isshow == true){
				_this.showModleEventBind(_this.modleicon.lightoff);
				
				var lightOff = $(_this.modleicon.lightoff.modleitemid);
				var lightOn = $(_this.light.on);
				
				if(lightOff){
					lightOff.onclick = function(){
						_this.curpanel = '';
						if(Light) Light.off();
					};
				}
				if(lightOn){
					lightOn.onclick = function(){
						if(Light) Light.on();
					};  
				}  
				var stat = window.location.href.indexOf("_l_off");
				if(stat !== -1){ 
					if(Light) Light.off(); 
				}
			}
			
			//反馈
			_this.showModleEventBind(_this.modleicon.feedback);
			
			//窗口点击关闭右侧工具栏浮层
			if(this.sideT){
				this.sideT.onclick = function(event){
					var e =  event || window.event;
					if(e.stopPropagation) { 
						e.stopPropagation(); 
					}else{ 
						e.cancelBubble = true; 
					}
				}
			}
			if($('qheader_userlog')){
				$('qheader_userlog').onclick = function(event){
					var e =  event || window.event;
					if(e.stopPropagation) { 
						e.stopPropagation(); 
					}else{ 
						e.cancelBubble = true; 
					}
				}
			}
			_this._addEvent(document,'click',function(){
				if($(_this.modleicon.user.modlegroupid) && $(_this.modleicon.user.modlegroupid).className.indexOf(_this.classOpen) != -1){
					_this.showModleEvent(SideTool.modleicon.user , 2);
				}
				if($(_this.modleicon.collect.modlegroupid) && $(_this.modleicon.collect.modlegroupid).className.indexOf(_this.classOpen) != -1){
					_this.showModleEvent(SideTool.modleicon.collect , 2);
				}
				if($(_this.modleicon.record.modlegroupid) && $(_this.modleicon.record.modlegroupid).className.indexOf(_this.classOpen) != -1){
					_this.showModleEvent(SideTool.modleicon.record , 2);
				}
				if($(_this.modleicon.subscript.modlegroupid) && $(_this.modleicon.subscript.modlegroupid).className.indexOf(_this.classOpen) != -1){
					_this.showModleEvent(SideTool.modleicon.subscript , 2);
				}
				if($(_this.modleicon.notice.modlegroupid) && $(_this.modleicon.notice.modlegroupid).className.indexOf(_this.classOpen) != -1){
					_this.showModleEvent(SideTool.modleicon.notice , 2);
				}
				if($(_this.modleicon.member.modlegroupid) && $(_this.modleicon.member.modlegroupid).className.indexOf(_this.classOpen) != -1){
					_this.showModleEvent(SideTool.modleicon.member , 2);
				}
				if($(_this.modleicon.eshop.modlegroupid) && $(_this.modleicon.eshop.modlegroupid).className.indexOf(_this.classOpen) != -1){
					_this.showModleEvent(SideTool.modleicon.eshop , 2);
				}
				_this.curpanel = '';
			});
			
			//抽奖
			_this.lottery();
			
			//飞动效果
			_this.flyInit();
			
		},
		
		showModleEventBind: function(modleobj){
			if(!modleobj.modlename || !modleobj.modleitemid || !modleobj.modlegroupid){
				return false;
			}
			var modlename = modleobj.modlename;
			var modleitemid = modleobj.modleitemid;
			var modlegroupid = modleobj.modlegroupid;
			var callback = '';
			if(modleobj.callback){
				callback = eval(modleobj.callback);
			}
			if($(modleitemid)){
				SideTool._addEvent($(modleitemid), 'mouseenter', function(){ 
					if($(modlegroupid).className.indexOf(SideTool.classOpen) == -1){
						SideTool._addHover($(modlegroupid) , SideTool.classHover);
					}
				});
				SideTool._addEvent($(modleitemid), 'mouseleave', function(){
					SideTool._removeHover($(modlegroupid) , SideTool.classHover);
				});
				
				if(modlename != 'gotop' && modlename != 'lightoff' && modlename != 'feedback'){
					$(modleitemid).onclick  = function(){
						if(modlename != 'setting'){
							SideTool.slideToggle.call(this , SideTool);
						}
						setTimeout(function(){
							if($(modlegroupid).className.indexOf(SideTool.classOpen) != -1){
								SideTool.curpanel = modlename;
								if(callback){
									callback();
								}
							}else{
								SideTool.curpanel = '';
								if(modlename == 'setting' && callback){
									callback();
								}
							}
						},50);
						
						//购物车统计布点
						if(modlename == 'eshop'){
							SideTool._eshopStatisticsClothCoad('click' , 'cart_icon' , '' , '' , '' , '' , '');
						}
					};
				}
			}
		},
		showModleEvent: function(modleobj , type){
			if(!modleobj.modlename || !modleobj.modleitemid || !modleobj.modlegroupid){
				return false;
			}
			var modlename = modleobj.modlename;
			var modleitemid = modleobj.modleitemid;
			var modlegroupid = modleobj.modlegroupid;
			if(typeof(type) == 'undefined'){
				type = 1;
			}
			var callback = '';
			if(modleobj.callback){
				callback = eval(modleobj.callback);
			}
			if($(modleitemid)){
				if(modlename != 'gotop' && modlename != 'lightoff' && modlename != 'feedback' && modlename != 'setting'){
					if(type == 1){//1 展开面板
						SideTool.curpanel = modlename;
						if($(modlegroupid).className.indexOf(SideTool.classOpen) == -1){
							SideTool.slideToggle.call($(modleitemid) , SideTool);
						}
						setTimeout(function(){
							if(callback){
								callback();
							}
						},50);
					}else if(type == 2){//2 关闭面板	
						SideTool.curpanel = '';
						if($(modlegroupid).className.indexOf(SideTool.classOpen) != -1){
							SideTool.slideToggle.call($(modleitemid) , SideTool);
						}
					}
				}
			}
		},
		
		showTips: function(showmodle,text){
			var _this = this;
			for(var item in _this.tips){
				var showmodleid = item;
				var tipsid = "sttips_"+showmodleid;
				var cookieKey = 'st_t_'+showmodleid;
				var tmpCookieKey = 'st_t_tmp_'+showmodleid;
				if(showmodle){
					if(showmodle == item || showmodle == _this.tips[item]['showmodle'] || (_this.tips[item]['modleotherid'] && showmodle == _this.tips[item]['modleotherid'])){
						if($(tipsid)){
							$(tipsid).parentNode.removeChild($(tipsid));
						}
						var showText = !text ? _this.tips[item]['text'] : text;
						var tipsDiv = document.createElement('div');
						tipsDiv.className = "yk-toolbar-group-hint";
						tipsDiv.setAttribute("id",tipsid);
						tipsDiv.innerHTML = '<span class="toolbar-hint-txt">'+showText+'</span><span class="yk-toolbar-group-item-icon icon-hint-close" id="sttipclose_'+showmodleid+'"></span><span class="toolbar-hint-arrow"></span>';
						$(_this.tips[item]['showmodle']).appendChild(tipsDiv);
						if(!Nova.Cookie.get(tmpCookieKey)){
							Nova.Cookie.set(tmpCookieKey,showText,365);
						}
						_this.tipsClose(1 , showmodleid);
						break;
					}
				}else if(_this.tips[item]['isshow'] == true || Nova.Cookie.get(tmpCookieKey)){
					if(!Nova.Cookie.get(cookieKey) || Nova.Cookie.get(cookieKey) != 1 || Nova.Cookie.get(tmpCookieKey)){
						if($(tipsid)){
							$(tipsid).parentNode.removeChild($(tipsid));
						}
						var showText = !Nova.Cookie.get(tmpCookieKey) ? _this.tips[item]['text'] : Nova.Cookie.get(tmpCookieKey);
						var tipsDiv = document.createElement('div');
						tipsDiv.className = "yk-toolbar-group-hint";
						tipsDiv.setAttribute("id",tipsid);
						tipsDiv.innerHTML = '<span class="toolbar-hint-txt">'+showText+'</span><span class="yk-toolbar-group-item-icon icon-hint-close" id="sttipclose_'+showmodleid+'"></span><span class="toolbar-hint-arrow"></span>';
						$(_this.tips[item]['showmodle']).appendChild(tipsDiv);
						_this.tipsClose(1 , showmodleid);	
					}
				}
			}
		},
		tipsClose: function(type , showmodle){
			if(!showmodle){
				return false;
			}
			var _this = this;
			var cookieKey = 'st_t_'+showmodle;
			var tmpCookieKey = 'st_t_tmp_'+showmodle;
			var closeId = 'sttipclose_'+showmodle;
			var clickId = 'sttips_'+showmodle;
			setTimeout(function(){
				if(type == 1){
					if($(clickId)){
						$(clickId).onclick = function(){
							_this.showModleEvent(_this.modleicon[showmodle]);
							this.parentNode.removeChild(this);
							if(Nova.Cookie.get(tmpCookieKey)){
								Nova.Cookie.set(tmpCookieKey,'',0);
							}else{
								Nova.Cookie.set(cookieKey,1,_this.tips[showmodle]['cookietime']);
							}
						}
					}
					if($(closeId)){
						$(closeId).onclick = function(){
							//阻止冒泡
							var e =  event || window.event;
							if(e.stopPropagation) { 
								e.stopPropagation(); 
							}else{ 
								e.cancelBubble = true; 
							}
							this.parentNode.parentNode.removeChild(this.parentNode);
							if(Nova.Cookie.get(tmpCookieKey)){
								Nova.Cookie.set(tmpCookieKey,'',0);
							}else{
								Nova.Cookie.set(cookieKey,1,_this.tips[showmodle]['cookietime']);
							}
						}
					}
				}else{
					if($(clickId)){
						$(clickId).parentNode.removeChild($(clickId));
						if(Nova.Cookie.get(tmpCookieKey)){
							Nova.Cookie.set(tmpCookieKey,'',0);
						}else{
							Nova.Cookie.set(cookieKey,1,_this.tips[showmodle]['cookietime']);
						}
					}
				}
			},100);
		},

		initSideTool: function(){
			if(islogin()){
				SideTool.isLogin = true;
				SideTool.loginUID = SideTool.getUID();
			}else{
				SideTool.tmpUID = Nova.Cookie.get('__ysuid');
			}
			
			if(SideTool.isfirstcome && SideTool.isLogin){ 
				var url = 'http://nc.youku.com/index_QSideToolJSONP?function[]=getUserBasicInfo&callback[]=SideTool.upUserImg';
		        Nova.addScript(url);
		        
		        //购物车登陆后自动导入
		        if(SideTool.shoppingisshow){
		        	var img = new Image();
					img.src = 'http://hudong.pl.youku.com/interact/eshop/do/importgoods';
		        }
			}
			
			//会员图标红点提示
			var startObj = SideTool.noticeMember['start'].split('-');
			var endObj = SideTool.noticeMember['end'].split('-');
			var starttime = (new Date(startObj[0],parseInt(startObj[1])-1,startObj[2],0,0,0)).valueOf();
			var endtime = (new Date(endObj[0],parseInt(endObj[1])-1,endObj[2],23,59,59)).valueOf();
			var nowtime = (new Date()).valueOf(); 
			if(nowtime > starttime && nowtime < endtime && !Nova.Cookie.get('st_n_m_'+starttime) && $('newnoticeiconmember')){
				$('newnoticeiconmember').style.display = 'block';
			}
			
			//购物车未读数添加
			var curUid = SideTool.loginUID;
			if(!SideTool.isLogin){
				curUid = SideTool.tmpUID;
			}
			var unreadNum = Nova.Cookie.get('st_n_s'+curUid) || 0;
			if(unreadNum > 0 && $('newnoticeiconshopping')){
				$('newnoticeiconshopping').innerHTML = unreadNum;
				$('newnoticeiconshopping').style.display = 'block';
			}
				
			//tips提示弹层
			SideTool.showTips();
		},
		
		upUserImg: function(data){
			if(data && data['user_name'] && data['user_id'] && data['user_icons_small']){
				SideTool.isfirstcome = false;
				$('iconloginuserimg').innerHTML = '<img src="'+data['user_icons_small']+'" alt="">';
				if($('iconnologinuserimg')){
					$('iconnologinuserimg').style.display="none";
				}
				
				SideTool.userinfo.userid = data['user_id'];
				SideTool.userinfo.username = data['user_name'];
				//SideTool.userinfo.userencodeid = data['encodeid'];
				SideTool.userinfo.usericonsmall = data['user_icons_small'];
				
				//header头像点击展开用户信息
				if($('qheader_username')){
					var newInner = '<a title="'+data['user_name']+'"><i class="ico-user-l2"></i>' + SideTool._cutStr(data['user_name'], 10 , '...') + '</a>';
					$('qheader_username').innerHTML = newInner;
					$('qheader_username').onclick  = function(){
						SideTool.slideToggle.call($(SideTool.modleicon.user.modleitemid) , SideTool);
						SideTool.curpanel = 'user';
						SideTool.showUserMsg();
					}
				}
				//通知红点添加
				SideTool.noticePoll();
			}else{

			}
        },
		
		noticePoll: function(){
			if(this.timer){ return; }
			this.updateNoticeNum();
			var _this = this;
			this.timer = setInterval(function(){
				if(_this.issinitnotice){
					_this.updateNoticeNum();
				}
			}, this.freq); 	
		},
		
		updateNoticeNum: function(){
			var uid = this.userinfo.userid;
			if(uid){	
				var cb =  'SideTool.updateNoticeNumCallback';
				var url = 'http://notify.youku.com/notify/get.json?uid='+uid+'&types=["umc_notice"]&callback='+cb;
				Nova.addScript(url);
			}else{
				this.issinitnotice = false;	
			}
		},
		
		updateNoticeNumCallback:function(data){
			if(data && data['notify'] && data['notify']['umc_notice']){
				var notifyInfo = data['notify']['umc_notice'][0];
				var noticeTotal = 0;
				var subTotal = 0;
				var showTotal = 0;
				var newNoticeDetails = [];
				var oldNoticeDetails = [];
				for(var item in SideTool.noticeDetails){
					var curNoticeNid = SideTool.noticeDetails[item]['nid'];
					if(notifyInfo[curNoticeNid]){
						SideTool.noticeDetails[item]['count'] = notifyInfo[curNoticeNid];
						if(data['last_update_time'] && data['last_update_time'][item]){
							SideTool.noticeDetails[item]['time'] = data['last_update_time'][item];
						}
						newNoticeDetails.push(item);
						noticeTotal += notifyInfo[curNoticeNid];
					}else{
						oldNoticeDetails.push(item);	
					}
				}	
				for(var item in SideTool.subDetails){
					var curSubNid = SideTool.subDetails[item]['nid'];
					if(notifyInfo[curSubNid]){
						SideTool.subDetails[item]['count'] = notifyInfo[curSubNid];
						if(data['last_update_time'] && data['last_update_time'][item]){
							SideTool.subDetails[item]['time'] = data['last_update_time'][item];
						}
						subTotal += notifyInfo[curSubNid];
					}
				}
				var curCollectNid = SideTool.showDetails['show_statuses']['nid'];
				if(notifyInfo[curCollectNid]){
					SideTool.showDetails['show_statuses']['count'] = notifyInfo[curCollectNid];
					if(data['last_update_time'] && data['last_update_time']['show_statuses']){
						SideTool.showDetails['show_statuses']['time'] = data['last_update_time']['show_statuses'];
					}
					showTotal += notifyInfo[curCollectNid];
				}
				if(noticeTotal > 0){
					SideTool.noticeDetailsOrder = newNoticeDetails.concat(oldNoticeDetails);
					SideTool.noticetotal = noticeTotal;
					if($('newnoticeicon')){
						$('newnoticeicon').style.display = 'block';
					}
				}else{
					SideTool.noticeDetailsOrder = oldNoticeDetails;
				}
				if(subTotal > 0){
					SideTool.subnoticetotal = subTotal;
					if($('newnoticeiconsub')){
						$('newnoticeiconsub').style.display = 'block';
					}
				}
				if(showTotal > 0){
					SideTool.shownoticetotal = showTotal;
					if($('newnoticeiconshow')){
						$('newnoticeiconshow').style.display = 'block';
					}
				}
			}
		},
		
		resetNoticeNum: function(fields){
			var uid = this.userinfo.userid;
			if(uid && fields){
				var fields = fields;
				var url = 'http://nc.youku.com/index_QSideToolJSONP?function[]=resetNoticeNumUMC&type=' + fields;
				var img = new Image();
				img.src = url;
			}
		},
        
		showUserMsg: function(){
			var userInfoObj = $(SideTool.panel.user);
			if(!userInfoObj){
				return false;
			}
			userInfoObj.innerHTML = SideTool.loading;
			Nova.addScript('http://nc.youku.com/index_QSideToolJSONP?function[]=getUserInfo&callback[]=SideTool.showUserMsgCallback');
		},
		
		showUserMsgCallback: function(data){
			if(data){
				if(SideTool.isLogin && data['icon']){
					$('iconnologinuserimg').style.display = 'none';
					$('iconloginuserimg').innerHTML = '<img src="'+data['icon']+'" alt="">';
				}
				
				$(SideTool.panel.user).innerHTML = '';
				var userInfoDiv = document.createElement('div');
				userInfoDiv.className = "yk-toolbar-user-info";
				if(SideTool.isLogin){
					var userInfoAvatar = '<div class="yk-toolbar-user-avatar">'+
					 '<a href="http://'+UC_DOMAIN+'/u/'+data['userIdEncode']+'" target="_blank"><img src="'+data['icon']+'"></a></div>'; 

					var userInfoProfile = '<div class="yk-toolbar-user-profile"><div class="yk-toolbar-user-name"><a href="http://'+UC_DOMAIN+'/u/'+data['userIdEncode']+'" target="_blank" title="'+data['userName']+'">'+
										  SideTool._cutStr(data['userName'],12,'...')+'</a></div>';

                    userInfoProfile += '<div class="yk-toolbar-user-credit">';
					if(data['isvip'] || data['isverified']){
						if(data['isvip']){
							userInfoProfile += '<a href="http://vip.youku.com" target="_blank"><i class="yk-toolbar-ico ico__vipsuper" title="优酷会员"></i></a>';
						}
						if(data['isverified']){
							userInfoProfile += '<a href="http://'+UC_DOMAIN+'/u/rz" target="_blank"><i class="yk-toolbar-ico ico-cert" title="认证用户"></i></a>';
						}
					}
					if(data['is_verify_email'] != 0){
                        userInfoProfile += '<div class="yk-toolbar-user-valid yk-toolbar-user-valid-email"><a class="yk-toolbar-ico ico-valid-email"'+
                        'href="http://'+UC_DOMAIN+'/u/setting/sec_security/tab_mail.html" target="_blank"></a></div>';
                    }else{
                        userInfoProfile += '<div class="yk-toolbar-user-valid yk-toolbar-user-valid-email"><a class="yk-toolbar-ico ico-valid-email-done" href="http://i.youku.com/u/setting/sec_security.html" target="_blank"></a></div>';
                    }
					if(data['is_verify_mobile'] != true){
						userInfoProfile += '<div class="yk-toolbar-user-valid yk-toolbar-user-valid-phone"><a class="yk-toolbar-ico ico-valid-phone" href="http://'+UC_DOMAIN+'/u/setting/sec_security/tab_mobile.html" target="_blank"></a>';
						if(data['is_verify_email'] == 0){
							userInfoProfile += '<div class="qtips qtips_valid qtips_valid_email"><div class="yk-toolbar-ico ico-arrow-left"></div><div class="content"><span class="yk-toolbar-ico ico-min-close" onclick="this.parentNode.parentNode.style.display=\'none\'"></span>手机未绑定，<a href="http://i.youku.com/u/setting/sec_security/tab_mobile.html" target="_blank">去绑定</a></div></div>';
						}
						if(data['is_verify_email'] != 0){
							userInfoProfile += '<div class="qtips qtips_valid qtips_valid_email"><div class="yk-toolbar-ico ico-arrow-left"></div><div class="content"><span class="yk-toolbar-ico ico-min-close" onclick="this.parentNode.parentNode.style.display=\'none\'"></span><a href="http://i.youku.com/u/setting/sec_security/tab_mobile.html" target="_blank">去绑定手机、邮箱</a></div></div>';
						}
						userInfoProfile += '</div>';
					}else{
						userInfoProfile += '<div class="yk-toolbar-user-valid yk-toolbar-user-valid-phone-done"><a class="yk-toolbar-ico ico-valid-phone-done" href="http://i.youku.com/u/setting/sec_security/tab_mobile.html" target="_blank"></a></div>';
					}
                    userInfoProfile += '</div>';
					
					var integral = typeof(data['integral']) == "undefined" ? 0 : data['integral'];
                    userInfoProfile += 	'<div class="yk-toolbar-user-finance">'+
                        '<div class="finance-item finance-item-currency">优豆：<span class="yk-currency">'+data['youdou']+'</span></div>'+
                        '<span class="yk-toolbar-split"> | </span>'+
                        '<div class="finance-item finance-item-integral">积分：<span class="yk-integral">'+integral+'</span></div><a class="finance-exchange" href="http://mall.youku.com/" target="_blank">去兑换</a></div>'+
                        '<div class="yk-toolbar-user-extend"><a href="http://'+UC_DOMAIN+'/u/setting/base_profile.html" target="_blank">设置</a>'+
                        '<span class="yk-toolbar-split">|</span><a href="javascript:;" onclick="SideTool.showModleEvent(SideTool.modleicon.user , 2);setTimeout(function(){logout();},200);return false;">登出</a></div></div>';
					
					var qrcodePanel = '<div class="yk-toolbar-code"><div class="ykcode-flag" id="sidetoolqrcodepanelshow"><span></span></div><div class="ykcode-cover">'+
									  '<img class="ykcode-cover-img" src="http://static.youku.com/index/img/toolbar/codecover.png"></div></div>';
					
					userInfoDiv.innerHTML = userInfoAvatar + userInfoProfile + qrcodePanel;
				}else{
					var logoutUserInfo = '<div class="yk-toolbar-user-avatar"><a><img src="http://static.youku.com/index/img/toolbar/toolbar_avatar.jpg" alt=""></a></div>'+
										 '<div class="yk-toolbar-user-profile"><div class="yk-toolbar-user-name">Hi, 您好～～</div>'+
										 '<p>登录可以攒时长玩升级哦~</p></div><div class="yk-toolbar-code"><div class="ykcode-flag" id="sidetoolqrcodepanelshow"><span></span></div>'+
										 '<div class="ykcode-cover"><img class="ykcode-cover-img" src="http://static.youku.com/index/img/toolbar/codecover.png"></div></div>';

					userInfoDiv.innerHTML = logoutUserInfo; 
				}
				$(SideTool.panel.user).appendChild(userInfoDiv);
				
				var userGradeDiv = document.createElement('div');
				userGradeDiv.className = "yk-toolbar-user-grade";
				if(SideTool.isLogin){
					if(data['nextRank'] <= 50){
						var nextRank = data['nextRank'];
						var perRank = parseInt(nextRank) - 1;
					}else{
						var perRank = 50;
						var nextRank = 0;
					}
					var nextRankIcon = SideTool._getWatchLevelIcon(nextRank);
					var perRankIcon = SideTool._getWatchLevelIcon(perRank);
					var userGradeInner = '<a class="yk-toolbar-user-grade-cur" href="http://'+UC_DOMAIN+'/u/watchRankIntro" target="_blank"><span class="ico-watchlevel-'+perRankIcon+'">'+perRank+'</span></a>'+
										 '<div class="yk-toolbar-user-grade-bar"><div class="yk-toolbar-user-grade-bar-progress" style="width:'+data['nowPercent']+'%"></div></div>'+
										 '<div class="yk-toolbar-user-grade-detail">'+data['detail']+'</div>';
					if(perRank < 50 && nextRank > perRank){
						userGradeInner += '<div class="yk-toolbar-user-grade-next"><span class="ico-watchlevel-'+nextRankIcon+'-middle">'+nextRank+'</span></div>';
					}  
					userGradeDiv.innerHTML = userGradeInner;
				}else{
					var watchTime = Nova.Cookie.get('u_l_v_t');
					if(!watchTime){
						watchTime = 1;
					}
					var percent = Math.round((watchTime/21600)*100);
					watchTime = watchTime > 3600 ? Math.round(watchTime/3600)+'小时' : (watchTime > 60 ? Math.round(watchTime/60)+'分钟' : watchTime+'秒');
					var logoutuserGradeInner = '<div class="yk-toolbar-user-grade-bar notlogin">'+
											   '<div class="yk-toolbar-user-grade-bar-progress" style="width:'+percent+'%"></div></div>'+
											   '<div class="yk-toolbar-user-grade-detail yk-toolbar-user-grade-detail-notlogin">已看'+watchTime+'，'+percent+'%的小伙伴给你跪了</div>'+
											   '<div class="yk-toolbar-user-grade-next"><span class="ico-watchlevel-0-middle">1</span></div>';
					userGradeDiv.innerHTML = logoutuserGradeInner;
				}
				$(SideTool.panel.user).appendChild(userGradeDiv);
				
				if(!SideTool.isLogin){
					var logoutoauthlogin = document.createElement('div');
					logoutoauthlogin.className = "yk-toolbar-oauth-login";
					var logoutOauthloginInner = '<button class="btn btn-large" href="jsvascript:;" onclick="login({type:\'toolbar\',callBack:\'SideTool.showModleEvent\'},SideTool.modleicon.user);return false;">立即登录</button>'+
											    '<a onclick="login({type:\'toolbar\',callBack:\'SideTool.showModleEvent\'},SideTool.modleicon.user);return false;" class="yk-toolbar-ico ico-qq" title="QQ"><span>qq</span></a>'+
											    '<a onclick="login({type:\'toolbar\',callBack:\'SideTool.showModleEvent\'},SideTool.modleicon.user);return false;" class="yk-toolbar-ico ico-weibo" title="微博"><span>微博</span></a>'+
											    '<a onclick="login({type:\'toolbar\',callBack:\'SideTool.showModleEvent\'},SideTool.modleicon.user);return false;" class="yk-toolbar-ico ico-alipay" title="通过支付宝扫描可直接注册、登录优酷了"><span>支付宝</span></a>'+
											    '<span class="extend">没有账号? <a href="http://www.youku.com/user/signup" target="_blank">免费注册</a></span>';
					logoutoauthlogin.innerHTML = logoutOauthloginInner;
					$(SideTool.panel.user).appendChild(logoutoauthlogin);
				}
				
				if(SideTool.isLogin){
					if(data['signinfo']){
						var signinfo_mcnt = typeof(data['signinfo']['mcnt']) == 'undefined' ? 0 : data['signinfo']['mcnt'];
                        var userSignDiv = document.createElement('div');
                        userSignDiv.className = "yk-toolbar-signin";
                        userSignDiv.setAttribute('id' , 'usersigninfosidetool');
                        var userSignInner = '<span>本月已签<em class="yk-toolbar-signin-count">'+signinfo_mcnt+'</em>天</span>';
						if(data['signinfo']['is_sign']){
							userSignInner += '<button class="btn btn-large btn-disabled"><span class="icon-signin icon-signin-signed"></span>已签到</button>';
						}else{
							userSignInner += '<button class="btn btn-large" id="usersignsidetool">签 到</button>';
						}
						userSignDiv.innerHTML = userSignInner;
						$(SideTool.panel.user).appendChild(userSignDiv);
					}
				}else{
					if(data['signinfo']){
						var userSignDiv = document.createElement('div');
						userSignDiv.className = "yk-toolbar-signin  yk-toolbar-signin-notlogin";
						var userSignInner = '<p class="toolbar-signin-entry"><span>连续签到7天</span><span>可享受观看时长<em class="yk-toolbar-signin-count">翻倍</em>哦~</span></p>'+
				        					'<button class="btn btn-large btn-minor" onclick="SideTool.showModleEvent(SideTool.modleicon.user , 2);'+
				        					'login({type:\'toolbar\',callBack:\'SideTool.showModleEvent\'},SideTool.modleicon.user);return false;">签 到</button>';
						userSignDiv.innerHTML = userSignInner;
						$(SideTool.panel.user).appendChild(userSignDiv);
					}
				}
				
				var userTaskDiv = document.createElement('div');
				userTaskDiv.className = "yk-toolbar-u-task";
				var userTaskInner = '<div class="u-task-title"><span>我的任务</span><a class="u-task-t-link-all" target="_blank" href="http://'+UC_DOMAIN+'/u/home?type=user_task">查看全部</a></div>';
				userTaskDiv.innerHTML = userTaskInner;
				var userTaskListDiv = document.createElement('div');
				userTaskListDiv.className = "u-task-list";
				userTaskListDiv.setAttribute('id' , 'tasklistsidetool');
				var userTaskListDivinner = '';
                if(SideTool.isLogin){
                    var userServices = document.createElement('div');
                    userServices.className = "yk-toolbar-userservices";
                    userServices.innerHTML = '<ul class="yk-userservices-list yk-userservices-list-topborder"><li class="u-service-chanel">'+
                    '<a href="http://'+UC_DOMAIN+'/u/'+data['userIdEncode']+'" target="_blank"><i class="yk-toolbar-ico ico-myspace-l2"></i>我的频道</a></li>'+
                    '<li class="u-service-manage"><a href="http://'+UC_DOMAIN+'/u/videos" target="_blank"><i class="yk-toolbar-ico ico-videomanage-l2"></i>'+
                    '视频管理</a></li><li class="service-li service-li-favor"><a href="http://yikan.youku.com/u/home?from=y1.1.1.0" target="_blank">'+
                    '<i class="yk-toolbar-ico ico-yourfavor-l2"></i>猜你喜欢</a></li></ul>';
                    $(SideTool.panel.user).appendChild(userServices);
                }
				if(data['tasklist'] && data['tasklist'].length > 0){
					var isShowTips = false;
					for(var i = 0;i < data['tasklist'].length;i++){
						var tasklistclass = 'u-task-meta';
						if(data['tasklist'][i]['status'] == 2){
							tasklistclass = 'u-task-meta u-task-meta-done';
						}else if(data['tasklist'][i]['status'] == 1){
							tasklistclass = 'u-task-meta';
						}
						userTaskListDivinner += '<div class="'+tasklistclass+'" id="task_list_'+data['tasklist'][i]['tid']+'" name="tasklistidetool" tid="'+data['tasklist'][i]['tid']+'" ttype="'+data['tasklist'][i]['type']+'">'+
												'<a class="u-task-m-link"><img src="'+data['tasklist'][i]['icon']+'"><span class="u-task-link-icon-done"></span></a>'+
												'<div class="u-task-m-entry"><a class="u-task-m-e-title" title="'+data['tasklist'][i]['name']+'">'+data['tasklist'][i]['name']+'</a>'+
												'<span title="'+data['tasklist'][i]['desc']+'">'+data['tasklist'][i]['desc']+'</span>'+
												'<div class="u-task-m-e-reward"><span>奖励：</span>';
						for(var j = 0;j < data['tasklist'][i]['awards'].length;j++){
							if(data['tasklist'][i]['awards'][j]['type'] == 1 && isShowTips == false){
								isShowTips = true;
							}
							if(data['tasklist'][i]['awards'][j]['detail']){
								userTaskListDivinner += '<span class="reward-entry">'+data['tasklist'][i]['awards'][j]['detail']+'</span>';
							}
						}
						userTaskListDivinner += '</div></div>';
						if(data['tasklist'][i]['status'] == 2){
							userTaskListDivinner += '<span class="u-task-m-status u-task-m-status-done" id="task_receive_'+data['tasklist'][i]['tid']+'">领奖励</span>';
						}else if(data['tasklist'][i]['status'] == 1){
							if(data['tasklist'][i]['type'] == 10){
								if(data['tasklist'][i]['special_task_type'] && data['tasklist'][i]['special_task_type'] == 2){
									var special_task_source = !data['tasklist'][i]['special_task_source'] ? 'http://www.youku.com' : data['tasklist'][i]['special_task_source'];
									userTaskListDivinner += '<span class="u-task-m-status u-task-m-status-progress"><a href="'+special_task_source+'" target="_blank">做任务</a></span>';
								}else{
									userTaskListDivinner += '<span class="u-task-m-status u-task-m-status-progress" id="do_task_'+data['tasklist'][i]['tid']+'">做任务</span>';
								}
							}else{
								userTaskListDivinner += '<span class="u-task-m-status u-task-m-status-undo">未完成</span>';
							}
						}
						userTaskListDivinner += '</div>';
					}
					if(isShowTips){
						if(data['isvip']){
							userTaskListDivinner += '<div class="u-task-meta-hint"><i class="yk-toolbar-ico ico__vipsuper"></i><span>会员双倍积分</span></div>';
						}else{
							userTaskListDivinner += '<div class="u-task-meta-hint u-task-meta-hint-no"><i class="yk-toolbar-ico ico__vipsuper_no"></i><span>会员双倍积分</span></div>';
						}
					}
				}else{
					userTaskListDivinner = '<div class="u-task-meta u-task-meta-null"><p class="u-task-e-null-status">更多精彩</p><p>敬请期待...</p></div>';
				}
				userTaskListDiv.innerHTML = userTaskListDivinner;
				userTaskDiv.appendChild(userTaskListDiv);
				$(SideTool.panel.user).appendChild(userTaskDiv);

				setTimeout(function(){
					SideTool.userMsgShowHover();
				},500);
			}
		},
		userMsgShowHover: function(){
			if($('sidetoolqrcodepanelshow')){
				$('sidetoolqrcodepanelshow').onclick  = function(){
					SideTool.qrcodeShow();
				}
			}
			
			if($('usersignsidetool')){
				$('usersignsidetool').onclick  = function(){
					Nova.addScript('http://nc.youku.com/index_QSideToolJSONP?function[]=userSign&callback[]=SideTool.userSignCallback');
				}
			}
			
			var taskDivList = SideTool._getElementsByName('div','tasklistidetool');
			if(taskDivList){
				var listLen = taskDivList.length;
				for(var i = 0; i<listLen; i++){
					var tid = taskDivList[i].getAttribute('tid');
					(function(tid){
						if($('task_receive_'+tid)){
							$('task_receive_'+tid).onclick  = function(){
								Nova.addScript('http://nc.youku.com/index_QSideToolJSONP?function[]=userReceiveAward&callback[]=SideTool.userReceiveAwardCallback&tid='+tid);
							}
						}
						if($('do_task_'+tid)){
							$('do_task_'+tid).onclick  = function(){
								taskUpdateUserInfo(tid , 0);
							}
						}
					})(tid);
				}
			}
		},
		completeTaskById: function(taskId){
			if(!taskId){
				return false;
			}
			if($('do_task_'+taskId)){
				$('do_task_'+taskId).className  = 'u-task-m-status u-task-m-status-done';
				$('do_task_'+taskId).innerHTML  = '领奖励';
				setTimeout(function(){
					$('do_task_'+taskId).onclick  = function(){
						Nova.addScript('http://nc.youku.com/index_QSideToolJSONP?function[]=userReceiveAward&callback[]=SideTool.userReceiveAwardCallback&tid='+taskId);
					}
				},50);
			}
		},
        //二维码展示
        qrcodeShow: function(){
            var hParentDom = $(SideTool.modleicon.user.modlegroupid).select('.yk-toolbar-code')[0];
            if (qrcodeLogin.getObj('toolbar')){ //清除可能存在的轮询
                qrcodeLogin.getObj('toolbar').delInterval();
            }

            var params = {
                size: 138,
                loginfrom: 'toolbar',
                stfrom: 'toolbar',
                hParentDom: hParentDom,
                isPageExist: function(){return SideTool.curpanel=='user'?true:false;},
				getQrcodeCallback: function(){SideTool.qrcodeShowAnimation();},
                callback: function(){window.toolbarQrloginObj.isQrloginSucc=true; window.login_callback(); SideTool.showModleEvent(SideTool.modleicon.user);}
            };
            qrcodeLogin.init('toolbar', params);
            setTimeout(function(){window.toolbarQrloginObj = qrcodeLogin.getObj('toolbar');}, 500);
        },
        qrcodeShowAnimation: function(){
			setTimeout(function(){
				SideTool.qrcodePanelShow.call($('sidetoolqrcodepanelshow'),SideTool);
				setTimeout(function(){
					if($('sidetoolqrcodepanelclose')){
						$('sidetoolqrcodepanelclose').onclick  = function(){
							SideTool.qrcodePanelClose.call($('sidetoolqrcodepanelclose'),SideTool);
							setTimeout(function(){SideTool.qrcodeHide();},600);
						}
					}
				},100);
			},100);
		},
        //二维码关闭
        qrcodeHide: function(){
        	var qrcodeDom = $(SideTool.modleicon.user.modlegroupid).select('.yk-toolbar-code .ykcode-container')[0];
        	if(qrcodeDom){
        		qrcodeDom.remove();
        	}
            if (qrcodeLogin.getObj('toolbar')){ //清除可能存在的轮询
                qrcodeLogin.getObj('toolbar').delInterval();
            }
        },
		userReceiveAwardCallback: function(data){
			if(data && data['ret'] && data['ret'] == 'OK' && data['tid']){
				if($('task_list_'+data['tid'])){
					SideTool.userReceiveAward.call($('task_list_'+data['tid']),SideTool);
				}
			}
		},
		getUserTaskList: function(){
			if($('tasklistsidetool')){
				Nova.addScript('http://nc.youku.com/index_QSideToolJSONP?function[]=getUserTaskList&callback[]=SideTool.getUserTaskListCallback');
			}
		},
		getUserTaskListCallback: function(data){
			if(data['tasklist'] && data['tasklist'].length > 0 && $('tasklistsidetool')){
				var len = 3 - $('tasklistsidetool').childNodes.length;
				for(var i = 0;i < len;i++){
					if($('task_list_'+data['tasklist'][i]['tid'])){
						++len;

					}else{
						var tasklistclass = 'u-task-meta';
						if(data['tasklist'][i]['status'] == 2){
							tasklistclass = 'u-task-meta u-task-meta-done';
						}else if(data['tasklist'][i]['status'] == 1){
							tasklistclass = 'u-task-meta';
						}
						var userTaskDiv = document.createElement('div');
						userTaskDiv.className = tasklistclass;
						userTaskDiv.setAttribute('id' , 'task_list_'+data['tasklist'][i]['tid']);
						userTaskDiv.setAttribute('name' , 'tasklistidetool');
						userTaskDiv.setAttribute('tid' , data['tasklist'][i]['tid']);
						userTaskDiv.setAttribute('ttype' , data['tasklist'][i]['type']);
						userTaskDiv.style.cssText = "display:none;"; 
						var userTaskDivinner = '<a class="u-task-m-link"><img src="'+data['tasklist'][i]['icon']+'"><span class="u-task-link-icon-done"></span></a>'+
											   '<div class="u-task-m-entry"><a class="u-task-m-e-title">'+data['tasklist'][i]['name']+'</a><span>'+data['tasklist'][i]['desc']+'</span>'+
											   '<div class="u-task-m-e-reward"><span>奖励：</span>';
						for(var j = 0;j < data['tasklist'][i]['awards'].length;j++){
							userTaskDivinner += '<span class="reward-entry">'+data['tasklist'][i]['awards'][j]['detail']+'</span>';
						}
						userTaskDivinner += '</div></div>';
						if(data['tasklist'][i]['status'] == 2){
							userTaskDivinner += '<span class="u-task-m-status u-task-m-status-done" id="task_receive_'+data['tasklist'][i]['tid']+'">领奖励</span>';
						}else if(data['tasklist'][i]['status'] == 1){
							if(data['tasklist'][i]['type'] == 10){
								if(data['tasklist'][i]['special_task_type'] && data['tasklist'][i]['special_task_type'] == 2){
									var special_task_source = !data['tasklist'][i]['special_task_source'] ? 'http://www.youku.com' : data['tasklist'][i]['special_task_source'];
									userTaskListDivinner += '<span class="u-task-m-status u-task-m-status-progress"><a href="'+special_task_source+'" target="_blank">做任务</a></span>';
								}else{
									userTaskListDivinner += '<span class="u-task-m-status u-task-m-status-progress" id="do_task_'+data['tasklist'][i]['tid']+'">做任务</span>';
								}
							}else{
								userTaskDivinner += '<span class="u-task-m-status u-task-m-status-undo">未完成</span>';
							}
						}
						userTaskDiv.innerHTML = userTaskDivinner;
						$('tasklistsidetool').appendChild(userTaskDiv);
						jQuery(userTaskDiv).fadeIn(300);
						
						setTimeout((function(tid){
							if($('task_receive_'+tid)){
								$('task_receive_'+tid).onclick  = function(){
									Nova.addScript('http://nc.youku.com/index_QSideToolJSONP?function[]=userReceiveAward&callback[]=SideTool.userReceiveAwardCallback&tid='+tid);
								}
							}
							if($('do_task_'+tid)){
								$('do_task_'+tid).onclick  = function(){
									taskUpdateUserInfo(tid , 0);
								}
							}
						})(data['tasklist'][i]['tid']),100);
					}
				}
			}else if($('tasklistsidetool') && $('tasklistsidetool').childNodes.length == 0){
				$('tasklistsidetool').innerHTML = '<div class="u-task-meta u-task-meta-null"><p class="u-task-e-null-status">更多精彩</p><p>敬请期待...</p></div>';
			}
		},
		userSignCallback: function(data){
			if(data && data['ret'] && $('usersigninfosidetool')){
				$('usersigninfosidetool').innerHTML = '<span>本月已签<em class="yk-toolbar-signin-count">'+data['ret']['mcnt']+'</em>天</span>'+
													  '<button class="btn btn-large btn-disabled btn-larger">连续签到'+data['ret']['cont']+'天</button>';
			}
		},
        
		showCollectList: function(){
			var collectListObj = $(SideTool.panel.collectlist);
			if(!collectListObj){
				return false;
			}
			collectListObj.innerHTML = SideTool.loading;
			if(SideTool.isLogin){
				Nova.addScript('http://nc.youku.com/index_QSideToolJSONP?function[]=viewCollect&callback[]=SideTool.showCollectListCallback');
			}else{
				collectListObj.innerHTML = SideTool.collectheader + SideTool.logoutcollect + SideTool.nocollectfooter;
			}
		},
		
		showCollectListCallback: function(data){
			var collectListObj = $(SideTool.panel.collectlist);
			var collectList = "";
			if(data){
				var liShowList = '';
				var liVideoList = '';
				if(data['subscribe'] && data['subscribe'].length > 0){
					liShowList = '<div class="yk-toolbar-vlist-label yk-toolbar-vlist-label-update">'+
								 '<span class="yk-toolbar-link-block yk-toolbar-link-block-blue collect-vlist-label">更新</span></div>'+
								 '<div class="yk-toolbar-vlist yk-toolbar-vlist-update">';
					showListLen = data['subscribe'].length;
					showListLen = showListLen > 3 ? 3 : showListLen;
					for(var i = 0 ; i < showListLen ; i++){
						var showName = SideTool._cutStr(data['subscribe'][i]['realData']['showname'] , 24 , '...');
						var firstTime = '';
						if(data['subscribe'][i]['realData']['percent'] && data['subscribe'][i]['realData']['percent'] != '100%' && data['subscribe'][i]['realData']['po']){
							firstTime = Math.ceil(data['subscribe'][i]['realData']['po'] / 1000);
						}else{
							firstTime = 0;
						}
						var showUrl = 'http://v.youku.com/v_show/id_'+data['subscribe'][i]['realData']['videoid']+'.html?firsttime='+firstTime;
						liShowList += '<div class="v v-mini v-horiz v-toolbar-mini" id="toolbar_show_'+data['subscribe'][i]['realData']['videoid']+'" name="subscribelist" encodeid="'+data['subscribe'][i]['realData']['videoid']+'">'+
									  '<div class="v-thumb"><img src="'+data['subscribe'][i]['realData']['thumburl']+'" title="'+data['subscribe'][i]['realData']['showname']+'">'+
									  '<div class="v-thumb-tagrb"><div class="v-meta"><span class="v-meta-status">'+data['subscribe'][i]['realData']['vepisode']+'</span></div></div><div class="v-meta-overlay"></div>'+
									  '<div class="v-link"><a href="'+showUrl+'" title="'+data['subscribe'][i]['realData']['showname']+'" target="video"></a></div></div><div class="v-meta">';
						if(data['subscribe'][i]['realData']['showid']){
							liShowList += '<div class="v-meta-title"><span class="yk-toolbar-group-item-icon icon-serial"></span>';
						}else{
							liShowList += '<div class="v-meta-title v-meta-title-v">';
						}
						liShowList += '<a href="'+showUrl+'" title="'+data['subscribe'][i]['realData']['showname']+'" target="video">'+showName+'</a></div><div class="v-meta-entry">';  
						if(data['subscribe'][i]['realData']['devicename'] == 'pc'){
							liShowList += '<span class="yk-toolbar-group-item-icon icon-pc" title="电脑"></span>';
						}else if(data['subscribe'][i]['realData']['devicename'] == 'pad'){
							liShowList += '<span class="yk-toolbar-group-item-icon icon-pad" title="平板"></span>';
						}else if(data['subscribe'][i]['realData']['devicename'] == 'phone'){
							liShowList += '<span class="yk-toolbar-group-item-icon icon-phone" title="手机"></span>';
						}else if(data['subscribe'][i]['realData']['devicename'] == 'tv'){
							liShowList += '<span class="yk-toolbar-group-item-icon icon-tv" title="电视"></span>';
						}               
						liShowList += '<span class="v-meta-detailtxt">'+data['subscribe'][i]['realData']['playlogtext']+'</span></div></div><div class="v-action">'+
									  '<a href="'+showUrl+'" title="播放" class="v-action-play" target="_blank">播放</a></div></div>';
					}
					liShowList += '</div>';
				}
				if(liShowList){
					collectList = liShowList;
				}
				if(data['fav'] && data['fav'].length > 0){
					liVideoList = '<div class="yk-toolbar-vlist-label yk-toolbar-vlist-label-collect">'+
					 			  '<span class="yk-toolbar-link-block yk-toolbar-link-block-blue collect-vlist-label">收藏</span></div>'+
					              '<div class="yk-toolbar-vlist yk-toolbar-vlist-update">';
					videoListLen = data['fav'].length;
					videoListLen = videoListLen > 15 ? 15 : videoListLen;
					for(var i = 0 ; i < videoListLen ; i++){
						var videoName = SideTool._cutStr(data['fav'][i]['data']['title'] , 42 , '...');
						var favTime = SideTool._formatDate(data['fav'][i]['data']['favTime']); 
						var videosUrl = 'http://v.youku.com/v_show/id_'+data['fav'][i]['data']['encodedId']+'.html';
						var second_format = Math.floor(data['fav'][i]['data']['seconds']/60) + ':' + Math.round(data['fav'][i]['data']['seconds']%60);
						
						liVideoList += '<div class="v v-mini v-horiz v-toolbar-mini" id="toolbar_video_'+data['fav'][i]['data']['encodedId']+'" name="subscribelist" encodeid="'+data['fav'][i]['data']['encodedId']+'">'+
									  '<div class="v-thumb"><img src="'+data['fav'][i]['data']['thumburl']+'" title="'+data['fav'][i]['data']['title']+'">'+
									  '<div class="v-thumb-tagrb"><div class="v-meta"><span class="v-time">'+second_format+'</span></div></div>'+
									  '<div class="v-meta-overlay"></div><div class="v-link"><a href="'+videosUrl+'" title="'+data['fav'][i]['data']['title']+'" target="video"></a></div></div><div class="v-meta">';
						if(data['fav'][i]['data']['showid']){
							liVideoList += '<div class="v-meta-title"><span class="yk-toolbar-group-item-icon icon-serial"></span>';
						}else{
							liVideoList += '<div class="v-meta-title v-meta-title-v">';
						}
						liVideoList += '<a href="'+videosUrl+'" title="'+data['fav'][i]['data']['title']+'" target="video">'+videoName+'</a></div><div class="v-meta-entry">';    
						liVideoList += '<span>'+favTime+'</span></div></div><div class="v-action">'+
									  '<a href="'+videosUrl+'" title="播放" class="v-action-play" target="_blank">播放</a></div></div>';
					}
					liVideoList += '</div>';
				}
				if(liVideoList){
					collectList += liVideoList;	
				}	
			}
					
			if(collectList){
				collectListObj.innerHTML = SideTool.collectheader + '<div class="yk-toolbar-mod-bd">' + collectList + '</div>' + SideTool.collectfooter;				
//				setTimeout(function(){
//					SideTool.collectShowHover();
//				},300);
			}else{
				collectListObj.innerHTML = SideTool.collectheader + SideTool.collectnull + SideTool.nocollectfooter;
			}

            //清除节目notice更新
			if(SideTool.showDetails.show_statuses.count > 0){
				SideTool.resetNoticeNum('[5]');
			}
            SideTool.shownoticetotal = 0;
            SideTool.showDetails.show_statuses.count = 0;
            $('newnoticeiconshow').style.display = "none";
		},
		collectShowHover: function(){
			var subLiList = SideTool._getElementsByName('div','subscribelist');
			if(subLiList){
				var listLen = subLiList.length;
				for(var i = 0; i<listLen; i++){
					var encodeid = subLiList[i].getAttribute('encodeid');
					if($('del_col_'+encodeid)){
						SideTool._addEvent($('del_col_'+encodeid), 'mouseenter', function(){ 
							this.style.display = "block";
						});
						SideTool._addEvent($('del_col_'+encodeid), 'mouseleave', function(){
							this.style.display = "none";
						});	
					}
				}
			}
		},
		showRecordList: function(){
			var recordListObj = $(SideTool.panel.recordlist);
			if(!recordListObj){
				return false;
			}
			recordListObj.innerHTML = SideTool.loading;
			Nova.addScript('http://nc.youku.com/index_QSideToolJSONP?function[]=viewRecord&callback[]=SideTool.showRecordListCallback');
		},
		showRecordListCallback: function(data){
			SideTool.token = data['token'];
			var recordListObj = $(SideTool.panel.recordlist);
			recordListObj.innerHTML = SideTool.loading;
			
			if(data && data['playtag']){
				var playTagW = '';
				if(data['playtag']['w'] && data['playtag']['w'].length > 0){
					var playTagWList = SideTool.getPlayTagList(data['playtag']['w'] , 1);
					playTagW = '<div class="yk-toolbar-vlist-label yk-toolbar-vlist-label-todo">'+
			            	   '<span class="yk-toolbar-link-block yk-toolbar-link-block-grey record-vlist-label">待看（<span>'+
			            	   playTagWList.playlistlen+'</span>）</span><a class="yk-toolbar-ico ico-play-min act-playall" target="_blank" '+
			            	   'href="http://nc.youku.com/index_QSideToolJSONP?function[]=waitPlayLogPage">播放全部</a>'+
			            	   '</div><div class="yk-toolbar-vlist yk-toolbar-vlist-todo">';
					playTagW += playTagWList.playlist;
					if(data['playtag']['w'].length > 3){
						playTagW += '<div class="yk-toolbar-more-slidecover"></div><div id="recordlaterviewlist" class="yk-toolbar-link-more yk-toolbar-record-more" data-stat-role="ck">'+
			                		'<span>查看更多</span><span class="icon-more"></span></div>';
					}
					playTagW += '</div>';
				}
				
				var playTagA = '';
				if(data['playtag']['a'] && data['playtag']['a'].length > 0){
					var playTagAList = SideTool.getPlayTagList(data['playtag']['a'] , 0);
					playTagA = '<div class="yk-toolbar-vlist-label yk-toolbar-vlist-label-done">'+
							   '<span class="yk-toolbar-link-block yk-toolbar-link-block-blue record-vlist-label">今天 周<span>'+data['week']['today']+'</span></span></div><div class="yk-toolbar-vlist yk-toolbar-vlist-update">';
					playTagA += playTagAList.playlist;
					playTagA += '</div>';
				}

				var playTagB = '';
				if(data['playtag']['b'] && data['playtag']['b'].length > 0){
					var playTagBList = SideTool.getPlayTagList(data['playtag']['b'] , 0);
					playTagB = '<div class="yk-toolbar-vlist-label yk-toolbar-vlist-label-done">'+
					   '<span class="yk-toolbar-link-block yk-toolbar-link-block-blue record-vlist-label">昨天 周<span>'+data['week']['yesterday']+'</span></span></div><div class="yk-toolbar-vlist yk-toolbar-vlist-update">';
					playTagB += playTagBList.playlist;
					playTagB += '</div>';
				}
				
				var playTagC = '';
				if(data['playtag']['c'] && data['playtag']['c'].length > 0){
					var playTagCList = SideTool.getPlayTagList(data['playtag']['c'] , 0);
					playTagC = '<div class="yk-toolbar-vlist-label yk-toolbar-vlist-label-done">'+
					   '<span class="yk-toolbar-link-block yk-toolbar-link-block-blue record-vlist-label">一周内</span></div><div class="yk-toolbar-vlist yk-toolbar-vlist-update">';
					playTagC += playTagCList.playlist;
					playTagC += '</div>';
				}
				
				var playTagD = '';
				if(data['playtag']['d'] && data['playtag']['d'].length > 0){
					var playTagDList = SideTool.getPlayTagList(data['playtag']['d'] , 0);
					playTagD = '<div class="yk-toolbar-vlist-label yk-toolbar-vlist-label-done">'+
					   '<span class="yk-toolbar-link-block yk-toolbar-link-block-blue record-vlist-label">更 早</span></div><div class="yk-toolbar-vlist yk-toolbar-vlist-update">';
					playTagD += playTagDList.playlist;
					playTagD += '</div>';
				}
			}
			var playTagList = playTagW + playTagA + playTagB + playTagC + playTagD;
			
			if(playTagList){
				if(SideTool.isLogin){
					var playTag = SideTool.recordheader + '<div class="yk-toolbar-mod-bd">' + playTagList + '</div>' + SideTool.recordfooter;
					recordListObj.innerHTML = playTag;
				}else{
					var playTag = SideTool.recordheader + '<div class="yk-toolbar-mod-bd">' + SideTool.logoutrecord + playTagList + '</div>' + SideTool.recordfooter;
					recordListObj.innerHTML = playTag;
				}
				
				setTimeout(function(){
					SideTool.recordShowHover();
				},500);
			}else{
				var playTag = SideTool.recordheader + '<div class="yk-toolbar-mod-bd">' + SideTool.recordnull + '</div>' + SideTool.norecordfooter;
				recordListObj.innerHTML = playTag;
			}
		},
		
		getPlayTagList: function(data , type){
			var playList = '';
			var dataLen = data.length;
			var playListLen = data.length;
			if(data && dataLen > 0){
				for(var i = 0 ; i < dataLen ; i++){
					if((!data[i]['showname'] && !data[i]['title']) || !data[i]['vidEncoded']){
						playListLen--;
						continue;	
					}
					var videouUrl = '';
					if(data[i]['percent']=='100%'){
						videouUrl = 'http://v.youku.com/v_show/id_'+data[i]['vidEncoded']+'.html?firsttime=0';
					}else{
						videouUrl = 'http://v.youku.com/v_show/id_'+data[i]['vidEncoded']+'.html?firsttime='+data[i]['sec'];
					}
					if(data[i]['folderid']){
						videouUrl += '&f='+data[i]['folderid'];
					}
					var videoImg = '';
					if(data[i]['show_thumburl']){
						videoImg = data[i]['show_thumburl'];
					}else if(data[i]['thumburl_v2']){
						videoImg = data[i]['thumburl_v2'];
					}else if(data[i]['thumburl']){
						videoImg = data[i]['thumburl'];
					}
					var videoName1 = videoName2 = videoName3 = '';
					if((data[i]['category'] == '娱乐' || data[i]['category'] == '资讯') && type != 1){
						if(data[i]['title']){
							videoName1 = SideTool._cutStr(data[i]['title'],24,'...');
							if(data[i]['showname']){
								videoName2 = SideTool._cutStr(data[i]['showname'],24,'...');
							}
						}else{
							videoName1 = SideTool._cutStr(data[i]['showname'],48,'...');
						}
					}else{
						videoName1 = !data[i]['showname'] ? SideTool._cutStr(data[i]['title'],48,'...') : SideTool._cutStr(data[i]['showname'],48,'...');
					}
					videoName3 = !data[i]['title'] ? data[i]['showname'] : data[i]['title'];
					
					playList += '<div class="v v-mini v-horiz v-toolbar-mini" name="recordlist" id="recordlist_'+type+'_'+data[i]['vidEncoded']+'" encodeid="'+data[i]['vidEncoded']+'" ';
					if(i > 2 && type == 1){
						playList += 'style="display:none">';
					}else{
						playList += '>';
					}
					
					playList += '<div class="v-thumb"><img src="'+videoImg+'" title="'+videoName3+'">';
					if(data[i]['updateStage']){
						playList += '<div class="v-thumb-tagrb"><div class="v-meta"><span class="v-meta-status">'+data[i]['updateStage']+'</span></div></div>';
					}
					playList += '<div class="v-meta-overlay"></div><div class="v-link"><a href="'+videouUrl+'" title="'+videoName3+'" target="video"></a></div></div><div class="v-meta">';
					if(data[i]['showname']){
						playList += '<div class="v-meta-title"><span class="yk-toolbar-group-item-icon icon-serial"></span>';
					}else{
						playList += '<div class="v-meta-title v-meta-title-v">';
					}
					playList += '<a href="'+videouUrl+'" title="'+videoName3+'" target="video">'+videoName1+'</a></div>';
					if(videoName2){
						playList += '<div class="v-meta-entry v-meta-entry-zy"><span class="v-meta-zy-title">'+videoName2+'</span><div class="v-meta-zy-entry">';
					}else{
						playList += '<div class="v-meta-entry">';
					}
					if(type != 1){
						if(data[i]['devicename']=='平板'){
							playList += '<span class="yk-toolbar-group-item-icon icon-pad"  title="平板"></span>';
						}else if(data[i]['devicename']=='电视'){
							playList += '<span class="yk-toolbar-group-item-icon icon-tv"  title="电视"></span>';
						}else if(data[i]['devicename']=='手机'){
							playList += '<span class="yk-toolbar-group-item-icon icon-phone"  title="手机"></span>';
						}else{
							playList += '<span class="yk-toolbar-group-item-icon icon-pc"  title="电脑"></span>';
						}
						if(data[i]['showid']){
							if(data[i]['percent']=='0%'){
								if(data[i]['watchStage']){
									playList += '<span class="v-meta-detailtxt">看到' + data[i]['watchStage'] + '的</span><span>1%</span>';
								}else{
									playList += '<span class="v-meta-detailtxt">看到</span><span>1%</span>';
								}
							}else if(data[i]['percent']=='100%'){
								playList += '<span class="v-meta-detailtxt">看完</span>';
								if(data[i]['watchStage']){
									playList += '<span>'+data[i]['watchStage']+'</span>';
								}
							}else{
								if(data[i]['watchStage']){
									playList += '<span class="v-meta-detailtxt">看到' + data[i]['watchStage'] + '的</span><span>' + data[i]['percent']+'</span>';
								}else{
									playList += '<span class="v-meta-detailtxt">看到</span><span>' + data[i]['percent'] + '</span>';
								}
							}
						}else{
							if(data[i]['percent']=='0%'){
								playList += '<span class="v-meta-detailtxt">看到</span><span>1%</span>';
							}else if(data[i]['percent']=='100%'){
								playList += '<span class="v-meta-detailtxt">看完</span>';
							}else{
								playList += '<span class="v-meta-detailtxt">看到</span><span>' + data[i]['percent'] + '</span>';
							}
						}
					}else{
						playList += '<span class="yk-toolbar-group-item-icon icon-toview"></span><span class="v-meta-detailtxt">待看</span>';
					}
					if(videoName2){
						playList += '</div></div></div>';
					}else{
						playList += '</div></div>';
					}
					
					var vid = !data[i]['videoid'] ? 0 : data[i]['videoid'];
					var shid = !data[i]['showid'] ? 0 : data[i]['showid'];
					var fid = !data[i]['folderid'] ? 0 : data[i]['folderid'];
					playList += '<div class="v-action">'+
								'<a href="javascript:;" title="删除" class="v-action-del" id="del_rec_'+data[i]['vidEncoded']+'" v="'+vid+'" s="'+shid+'" f="'+fid+'" data-stat-role="ck">'+
								'<span class="yk-toolbar-group-item-icon icon-del"></span></a>';
					if(type != 1){
						var playStatus = data[i]['percent']=='100%' ? '重播' : (data[i]['percent']=='0%' ? '播放' : '继续看');
						if(data[i]['nextid'] && data[i]['showid']){
							playList += '<a href="http://v.youku.com/v_nextstage/id_'+data[i]['showid']+'.html?p='+data[i]['show_videoseq']+'&v='+data[i]['videoid']+'" title="下一集" target="_blank" class="v-action-play v-action-play-next">下一集</a>'+
										'<span class="v-action-play v-action-play-segment">|</span>'+
										'<a href="'+videouUrl+'" title="'+playStatus+'" class="v-action-play v-action-play-ctu" target="_blank">'+playStatus+'</a>';
						}else{
							playList += '<a href="'+videouUrl+'" title="'+playStatus+'" class="v-action-play" target="_blank">'+playStatus+'</a>';
						}	
					}else{
						playList += '<a href="'+videouUrl+'" title="播放" class="v-action-play" target="_blank">播放</a>';
					}
                	playList += '</div></div>';
				}
			}
			return {playlist:playList,playlistlen:playListLen};
		},

		recordShowHover: function(){
			if($('recordlaterviewlist')){
				$('recordlaterviewlist').onclick = function(){
					var $ = jQuery;
					var $hiddenRows = $(this).siblings(".v-toolbar-mini:hidden"),
					$cover = $(this).parent().find('.yk-toolbar-more-slidecover'),
					$list = $(this).parent(),
				 	bar_h = $(this).height(),
				 	list_h = $list.height(),
					h = list_h + $hiddenRows.length*70 - bar_h,
					speed = 200;

					if($hiddenRows.length != 0){
						speed = 200 + ($hiddenRows.length - 1)*150;
						if(speed > 600){
							speed = 600;
						}
						$(this).hide();
						$cover.delay(50).show();
						$hiddenRows.show();
						$list.css({
							position : "relative",
							height : list_h
						}).animate({
							height : h
						},speed,function(){
							$list.css("position",'');
							$cover.hide();
						});
	
					}
				}
			}
			
			var recordLiList = SideTool._getElementsByName('div','recordlist');
            if(recordLiList){
                var listLen = recordLiList.length;
                for(var i = 0; i<listLen; i++){
					var encodeid = recordLiList[i].getAttribute('encodeid');
					if($('del_rec_'+encodeid)){
						$('del_rec_'+encodeid).onclick = function(){
							var vid = this.getAttribute('v');
							var shid = this.getAttribute('s');
							var fid = this.getAttribute('f');
							this.parentNode.parentNode.parentNode.style.height="auto";
							this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
							var delUrl = 'http://yus.navi.youku.com/playlog/delete.json?token='+SideTool.token+'&v='+vid+'&fid='+fid+'&shid='+shid+'&';

							var img = new Image();
							img.src = delUrl;
						}
					}
                }
            }				
		},
		
		showSubscriptList: function(){
			var subscriptListObj = $(SideTool.panel.subscriptlist);
			if(!subscriptListObj){
				return false;
			}
			subscriptListObj.innerHTML = SideTool.loading;
			//if(SideTool.isLogin || SideTool.tmpUID){
			if(SideTool.isLogin){
				Nova.addScript('http://nc.youku.com/index_QSideToolJSONP?function[]=getSubscriptList&callback[]=SideTool.showSubscriptListCallback');
			}else{
				subscriptListObj.innerHTML = SideTool.subscriptheader + SideTool.logoutsubscript + SideTool.nosubscriptfooter;
				if($('clearallunreadstatus')){
					$('clearallunreadstatus').parentNode.removeChild($('clearallunreadstatus'));
				}
			}
		},
		
		showSubscriptListCallback: function(data){
			var subscriptListObj = $(SideTool.panel.subscriptlist);
			subscriptListObj.innerHTML = SideTool.loading;
			var subscriptList = '';
			//if(data['total_count'] || data['starlist'] || data['list'] || data['just_list']){
			if(data['starlist'] || data['list'] || data['just_list']){
				subscriptList = '<div class="yk-toolbar-mod-bd"><div class="yk-toolbar-sublist">';
                /*准登陆代码
				if(data['total_count'] && SideTool.isLogin == false){
                    if(data['total_count'] >= 20){
                        subscriptList += '<div class="yk-toolbar-subitem-hd"><ul class="list"><li class="item item-xk-full"><span class="yk-toolbar-ico-xk ico-xk-full"></span></li><li class="item item-entry-full"><p class="title">小酷记不住了！</p><p class="detail">现在<a class="act-login" href="javascript:;" onclick="login({type:\'toolbar\',callBack:\'SideTool.showModleEvent\'},SideTool.modleicon.subscript);return false;">登录</a>，可以订阅更多频道哦~ </p></li></ul></div>';
                    }else{
                        subscriptList += '<div class="yk-toolbar-subitem-hd"><ul class="list"><li class="item item-xk"><span class="yk-toolbar-ico-xk ico-xk"></span></li><li class="item item-entry"><p class="title">你知道吗？</p><p class="detail">你订阅了<span class="subnum">'+data['total_count']+'</span>个频道，<br>来试试更舒服的方式吧~</p></li><li class="item item-act"><span class="btn btn-major">体验新版</span></li></ul></div>';
                    }
                }*/
				if(data['starlist']){
					subscriptList += '<div class="yk-toolbar-subitem yk-toolbar-subitem-s" name="subscriptlist" userid="substarstatus" data-stat-role="ck" id="toolbar_subscribe_one_substarstatus">'+
									 '<div class="yk-toolbar-n-submark" data-stat-role="ck"><span class="yk-toolbar-submark" data-stat-role="ck"></span></div>'+
									 '<ul class="subitem-u"><li class="subitem-u-link" data-stat-role="ck"><a></a></li>'+
									 '<li class="subitem-u-thumb"><img src="http://static.youku.com/index/img/toolbar/icon-fans.png" alt="明星动态" replace="false"></li>'+
									 '<li class="subitem-u-meta" data-stat-role="ck"><div class="subitem-u-meta-title" data-stat-role="ck"><a title="明星动态">明星动态</a>'+
									 '<span class="meta-update-time"></span></div><div class="subitem-u-meta-entry" data-stat-role="ck"><span>'+data['starlist']['name']+
									 ': '+data['starlist']['status']+'</span></div></li></ul><div class="v-segment"></div></div>';
				}
                //添加"刚订阅"模块
                if(data['just_list']){
                     var sublistlen = data['just_list'].length;
                     for(var i = 0;i < sublistlen;i++){
                         subscriptList +=
                         '<div class="yk-toolbar-subitem yk-toolbar-subitem-s yk-toolbar-subitem-s-new" name="subscriptlist" userid="'+data['just_list'][i]['id']+'" data-stat-role="ck"'+'username="'+data['just_list'][i]['name']+'" id="toolbar_subscribe_one_'+data['just_list'][i]['id']+'"><div class="yk-toolbar-n-submark" data-stat-role="ck">'+
                         '<span class="yk-toolbar-submark" data-stat-role="ck"></span></div><ul class="subitem-u"><li class="subitem-u-link subitem-u-link-u" data-stat-role="ck"><a></a></li>'+
                         '<li class="subitem-u-thumb subitem-u-thumb-u"><img src="'+data['just_list'][i]['photo']+'" alt="'+data['just_list'][i]['name']+'"></li>';
                         subscriptList +=  '<li class="subitem-u-meta" data-stat-role="ck"><div class="subitem-u-meta-title" data-stat-role="ck"><a title="'+data['just_list'][i]['name']+'">'+SideTool._cutStr(data['just_list'][i]['name'],16,'...')+'</a>';
                         if(data['just_list'][i]['verified'] == 1){
                            subscriptList += '<a title="认证用户"><span class="ico_cert"></span></a>';
                         }
                         subscriptList += '<span class="meta-update-time meta-update-time-new">刚订阅</span></div><div class="subitem-u-meta-entry" data-stat-role="ck"><span>'+SideTool._cutStr(data['just_list'][i]['description'], 60,'...')+'</span></div></li></ul><div class="v-segment"></div></div>';
                     }
                 }
				if(data['list']){	
					var sublistlen = data['list'].length;
					for(var i = 0;i < sublistlen;i++){
						subscriptList += '<div class="yk-toolbar-subitem yk-toolbar-subitem-s" name="subscriptlist" lastviewtime="'+data['list'][i]['last_view_time']+'" userid="'+data['list'][i]['uid']+'" data-stat-role="ck"'+
										 'username="'+data['list'][i]['name']+'" id="toolbar_subscribe_one_'+data['list'][i]['uid']+'"><div class="yk-toolbar-n-submark" data-stat-role="ck">'+
										 '<span class="yk-toolbar-submark" data-stat-role="ck"></span></div><ul class="subitem-u"><li class="subitem-u-link subitem-u-link-u" data-stat-role="ck"><a></a></li>'+
										 '<li class="subitem-u-thumb subitem-u-thumb-u"><img src="'+data['list'][i]['icon']+'" alt="'+data['list'][i]['name']+'"></li>';
						if(data['list'][i]['count'] && data['list'][i]['count'] > 0){
							subscriptList += '<li class="yk-subscription-num" name="subunreadicon" id="newsubicon_'+data['list'][i]['uid']+'" data-stat-role="ck"></li>';
						}				 
						subscriptList +=  '<li class="subitem-u-meta" data-stat-role="ck"><div class="subitem-u-meta-title" data-stat-role="ck"><a title="'+data['list'][i]['name']+'">'+SideTool._cutStr(data['list'][i]['name'],16,'...')+'</a>';
						if(data['list'][i]['verified']){
							subscriptList += '<a title="认证用户"><span class="ico_cert"></span></a>';
						}
						subscriptList += '<span class="meta-update-time">'+data['list'][i]['statuses_created_time']+'</span></div><div class="subitem-u-meta-entry" data-stat-role="ck"><span>'+
										 SideTool._cutStr(data['list'][i]['statuses_txt'], 60,'...')+'</span></div></li></ul><div class="v-segment"></div></div>';
					}
				}
				subscriptList += '</div></div>';
			}
			

			if(subscriptList){
				subscriptListObj.innerHTML = '<div id="hideshowsubscriptlist" style="position: absolute;width: 330px;height: 100%;">' + SideTool.subscriptheader + subscriptList + SideTool.subscriptfooter + '</div>';				
				var subunreadicon = SideTool._getElementsByName('li','subunreadicon');
				if(subunreadicon.length == 0 && $('clearallunreadstatus')){
					$('clearallunreadstatus').parentNode.removeChild($('clearallunreadstatus'));
				}
				setTimeout(function(){
					SideTool.subscriptShowHover();
					
					//清除订阅notice更新
					if(SideTool.subDetails.new_subscribe.count > 0 || SideTool.subDetails.star_statuses.count > 0){
						SideTool.resetNoticeNum('[2,3,24,4,21]');
					}
					if($('newnoticeiconsub')){
		            	$('newnoticeiconsub').style.display = "none";
		            }
					SideTool.subnoticetotal = 0;
					SideTool.subDetails.new_subscribe.count = 0;
					SideTool.subDetails.star_statuses.count = 0;
				},300);
			}else{
				subscriptListObj.innerHTML = SideTool.subscriptheader + SideTool.subscriptnull + SideTool.nosubscriptfooter;
			}
		},
		
		subscriptShowHover: function(){
			var subscriptLiList = SideTool._getElementsByName('div','subscriptlist');
            if(subscriptLiList){
                var listLen = subscriptLiList.length;
                for(var i = 0; i<listLen; i++){
					SideTool._addEvent(subscriptLiList[i], 'mouseenter', function(){ 
						SideTool._addHover(this , ' yk-toolbar-subitem-hover');
					});
					SideTool._addEvent(subscriptLiList[i], 'mouseleave', function(){
						SideTool._removeHover(this , ' yk-toolbar-subitem-hover');
					});
                	subscriptLiList[i].onclick = function(){
                		var thishoverid = this.getAttribute('userid');
                		var thishovername = this.getAttribute('username');
                		var lastviewtime = this.getAttribute('lastviewtime');
                		if($('upvideo_'+thishoverid)){
                			SideTool.slideToggleTwoPanels('hideshowsubscriptlist' , 'upvideo_'+thishoverid , 'go');
                			SideTool.gobacksublist(thishoverid);
                		}else{
                			if(thishoverid == 'substarstatus'){
                				var star_statues_num = SideTool.subDetails.star_statuses.count > 30 ?　30 : SideTool.subDetails.star_statuses.count;
                				Nova.addScript('http://nc.youku.com/index_QSideToolJSONP?function[]=getUserSubStarStatus&callback[]=SideTool.showUserUploadVideoCallback&num='+star_statues_num);
                    		}else{
                    			Nova.addScript('http://nc.youku.com/index_QSideToolJSONP?function[]=getUserUploadVideo&callback[]=SideTool.showUserUploadVideoCallback&uid='+thishoverid+'&uname='+thishovername+'&lastviewtime='+lastviewtime);
                    		}
                		}
					}
                }
            }
            if($('clearallunreadstatus')){
	            $('clearallunreadstatus').onclick = function(){
					Nova.addScript('http://nc.youku.com/index_QSideToolJSONP?function[]=consumeAllUnreadNews&callback[]=SideTool.consumeAllUnreadNewsCallback');
				}
            }
		},
		
		consumeAllUnreadNewsCallback: function(data){
			if(data){
				var subunreadicon = SideTool._getElementsByName('li','subunreadicon');
				if(subunreadicon){
					var listLen = subunreadicon.length;
					for(var i = 0; i<listLen; i++){
						subunreadicon[i].style.display = 'none';
					}
				}
			}
		},
		
		showUserUploadVideoCallback: function(data){
			var subscriptListObj = $(SideTool.panel.subscriptlist);
			var uploadvideoList = '';
			if(data && data['list'] && data['list'].length > 0){
				uploadvideoList = '<div class="yk-toolbar-mod-bd">';
				if(data['subtype'] == 'user'){
					uploadvideoList += '<div class="yk-toolbar-subscript-subpage">';
				}else if(data['subtype'] == 'star'){
					uploadvideoList += '<div class="yk-toolbar-sublist">';
				}
				var uplistlen = data['list'].length;
				for(var i = 0;i < uplistlen;i++){
					if(data['subtype'] == 'user'){
                        uploadvideoList += '<div class="yk-toolbar-subpage-item" id="toolbar_subscribe_two_'+i+'"><a class="yk-toolbar-subpage-item-thumb" href="'+data['list'][i]['vedio_sourceurl']+'" target="video" >'+
                        '<img src="'+data['list'][i]['vedio_thumbnail']+'" alt="'+data['list'][i]['vedio_title']+'"></a>'+
                        '<div class="yk-toolbar-subpage-item-meta"><div class="yk-toolbar-subpage-item-meta-title">';
                        uploadvideoList += '<a href="'+data['list'][i]['vedio_sourceurl']+'" target="video" title="'+data['list'][i]['vedio_title']+'">';
                        
						//判断文案字数
						var videoTitle = data['list'][i]['vedio_title'];
						var checkVideoTitle = SideTool._strLen(videoTitle);
						var videoTitleEnd = '';
						if(data['list'][i]['is_top'] == 1){
                            uploadvideoList += '<span class="yk-toolbar-ico ico-ontop"></span>';
							if(checkVideoTitle <= 40){
								videoTitleEnd = SideTool._cutStr(videoTitle,26,'...');
							}else{
								videoTitleEnd = SideTool._cutStr(videoTitle,60,'...');
							}
                        }else{
							if(checkVideoTitle <= 40){
								videoTitleEnd = SideTool._cutStr(videoTitle,30,'...');
							}else{
								videoTitleEnd = SideTool._cutStr(videoTitle,64,'...');
							}
						}
                        uploadvideoList += videoTitleEnd;
                        uploadvideoList += '</a></div>'+
                        '<div class="yk-toolbar-subpage-item-meta-entry"><span class="meta-update-time">'+data['list'][i]['created_at']+'</span></div></div><div class="v-segment" style=""></div></div>';
					}else if(data['subtype'] == 'star'){
						uploadvideoList += '<div class="yk-toolbar-subitem" id="toolbar_subscribe_two_'+i+'"><ul class="subitem-u"><li class="subitem-u-link">'+
	                        			   '<a title="'+data['list'][i]['name']+'"></a></li>'+
	                        			   '<li class="subitem-u-thumb"><img src="'+data['list'][i]['icon']+'" alt="'+data['list'][i]['name']+'"></li>'+
	                                       '<li class="subitem-u-meta"><div class="subitem-u-meta-title"><a '+
	                                       'title="'+data['list'][i]['name']+'">'+data['list'][i]['name']+'</a>';
						if(data['list'][i]['verified']){
							uploadvideoList += '<a href="http://'+UC_DOMAIN+'/u/rz" title="认证用户" target="_blank"><span class="ico_cert"></span></a>';
						}
						uploadvideoList += '<span class="meta-update-time">'+data['list'][i]['statuses_created_time']+'</span></div><div class="subitem-u-meta-entry">'+
	                            		   '<span style="display: block;margin-bottom: 5px;">'+SideTool._cutStr(data['list'][i]['statuses_title'], 24, '...')+'</span><i class="ico-statcomment" title="评论"></i>'+
	                            		   '<span class="v-num">'+data['list'][i]['statuses_reply_count']+'</span>'+
	                            		   '<a href="'+data['list'][i]['statuses_url']+'" title="播放" class="subfans-v-action-play-link" target="_blank">'+
	                            		   '<span class="icon-subfans-v-action-play"></span>播放</a></div></li></ul><div class="v-segment" style=""></div></div>';
					}
				}
				uploadvideoList += '</div></div>';
			}
			if(uploadvideoList){				
				var gobacktype = data['subtype'] == 'user'?data['user']['user_id']:data['subtype'];
				var headername = data['subtype'] == 'user'?SideTool._cutStr(data['user']['user_name'], 16, '...'):'明星动态';
				var upvedioheader = '<div class="yk-toolbar-mod-hd"><div class="yk-toolbar-mod-title"><div class="yk-toolbar-btn-back" id="gobacksublist_'+gobacktype+'" data-stat-role="ck">'+
									'<span class="yk-toolbar-group-item-icon icon-subscription-back"></span><span class="mod-hd-action-back">返回</span></div>'+
									'<a class="mod-title-link" href="http://'+UC_DOMAIN+'/u/'+data['user']['user_id_encode']+'/videos" target="_blank"><span class="yk-toolbar-mod-title-txt">'+
									headername+'</span></a></div></div>';
				var upvediofooter = '';
				if(data['subtype'] == 'user'){
					upvediofooter = '<div class="yk-toolbar-mod-ft"><div class="yk-toolbar-mod-links"><a href="http://'+UC_DOMAIN+'/u/'+data['user']['user_id_encode']+'/videos" target="_blank">查看全部</a></div></div>';
				}else if(data['subtype'] == 'star'){
					upvediofooter = SideTool.nosubscriptfooter;
				}
				subscriptListObj.innerHTML += '<div id="upvideo_'+gobacktype+'" style="height: 100%; position: absolute; width: 330px; right: -330px;">' + upvedioheader + uploadvideoList + upvediofooter + '</div>';
				
				SideTool.slideToggleTwoPanels('hideshowsubscriptlist' , 'upvideo_'+gobacktype , 'go');
				
				setTimeout(function(){
					SideTool.gobacksublist(gobacktype);
					//清除订阅notice更新
					/*if(data['subtype'] == 'user'){
						SideTool.resetNoticeNum('["new_subscribe","star_statuses"]');
						SideTool.resetNoticeNum('["new_subscribe"]');
			            SideTool.subnoticetotal -= SideTool.subDetails.new_subscribe.count;
			            SideTool.subDetails.new_subscribe.count = 0;
					}else if(data['subtype'] == 'star'){
						SideTool.resetNoticeNum('["star_statuses"]');
						SideTool.subnoticetotal -= SideTool.subDetails.star_statuses.count;
						SideTool.subDetails.star_statuses.count = 0;
					}*/
					if($('newsubicon_'+gobacktype)){
						$('newsubicon_'+gobacktype).style.display = 'none';
					}
				},100);
			}
		},
		
		gobacksublist: function(gobacktype){
			$('gobacksublist_'+gobacktype).onclick = function(){
        		SideTool.slideToggleTwoPanels('hideshowsubscriptlist' , 'upvideo_'+gobacktype , 'goback');
        		SideTool.subscriptShowHover();
			}
		},

		showNoticeList: function(){
			var noticeListObj = $(SideTool.panel.noticelist);
			if(!noticeListObj){
				return false;
			}
			noticeListObj.innerHTML = SideTool.loading;
			if(SideTool.isLogin){
				var url = 'http://nc.youku.com/index_QSideToolJSONP?function[]=getNoticeInfo&callback[]=SideTool.showNoticeListCallback';
				Nova.addScript(url);
			}else{
				noticeListObj.innerHTML = SideTool.noticeheader + SideTool.logoutnotice + SideTool.nonoticefooter;
			}
		},
		
		showNoticeListCallback: function(data){
			var noticeListObj = $(SideTool.panel.noticelist);
			noticeListObj.innerHTML = SideTool.loading;
			var comment_is_have_cycle = false;
			var comment_count = 0;
			var noticeList = '';
			if(SideTool.noticeDetailsOrder && SideTool.noticeDetailsOrder.length > 0){
				noticeList += '<div class="yk-toolbar-n-list">';
				var noticedetaillen = SideTool.noticeDetailsOrder.length;
				for(var i=0;i<noticedetaillen;i++){
					var noticeinfo = '';  		
					if(SideTool.noticeDetailsOrder[i] == 'sysmsg'){
						noticeList += '<div class="yk-toolbar-n-item yk-toolbar-n-item-sys" name="noticelist" data-stat-role="ck" id="toolbar_notice_sysmsg" noticetype="sysmsg">'+
									  '<div class="yk-toolbar-n-submark" data-stat-role="ck"><span class="yk-toolbar-submark" data-stat-role="ck"></span></div>'+
									  '<ul class="n-item-ul n-item-ul-sys"><li class="n-item-logo n-item-logo-sys" data-stat-role="ck"><span class="ico-notice ico-notice-sys"></span>';
						if(SideTool.noticeDetails['sysmsg']['count'] > 0){
							if(data['sysmsg']){
								noticeList += '<span class="yk-toolbar-notice-num" id="newnoticeiconsysmsg"></span>';
							}else{
								SideTool.resetNoticeNum('[13,14,15,16,17,18,19,20]');
								SideTool.noticetotal -= SideTool.noticeDetails.sysmsg.count;
								SideTool.noticeDetails.sysmsg.count = 0
							}
						}
						noticeList += '</li><li class="n-item-meta" data-stat-role="ck"><span class="n-item-meta-title">系统通知</span>';
						if(data['sysmsg']){
							if(SideTool.noticeDetails['sysmsg']['count'] > 0){
								noticeList += '<span class="n-item-meta-author">'+data['sysmsg']['sender_name']+' 发来系统通知</span>'+
								  			  '<span class="n-item-meta-content">'+SideTool._cutStr(data['sysmsg']['content'],60,'...')+'</span>';
								if(data['sysmsg']['create_time']){
									noticeList += '<span class="n-item-meta-update-time">'+data['sysmsg']['create_time']+'</span>';
								}
							}else{
								noticeList += '<span class="n-item-meta-author">暂无未读消息</span>';
							}
						}else{
							noticeList += '<span class="n-item-meta-author" id="notice_nodata_sysmsg">暂无此类消息</span>';
						}
						noticeList += '</li></ul></div>';
					}else if(SideTool.noticeDetailsOrder[i] == 'dms'){
						noticeList += '<div class="yk-toolbar-n-item yk-toolbar-n-item-letter" name="noticelist" data-stat-role="ck" id="toolbar_notice_dms" noticetype="dms">'+
									  '<div class="yk-toolbar-n-submark" data-stat-role="ck"><span class="yk-toolbar-submark" data-stat-role="ck"></span></div>'+
									  '<ul class="n-item-ul n-item-ul-letter"><li class="n-item-logo n-item-logo-letter" data-stat-role="ck"><span class="ico-notice ico-notice-letter"></span>';
						if(SideTool.noticeDetails['dms']['count'] > 0){
							if(data['dms']){
								noticeList += '<span class="yk-toolbar-notice-num" id="newnoticeicondms"></span>';
							}else{
								SideTool.resetNoticeNum('[6]');
								SideTool.noticetotal -= SideTool.noticeDetails.dms.count;
								SideTool.noticeDetails.dms.count = 0;
							}
						}                    
						noticeList += '</li><li class="n-item-meta" data-stat-role="ck"><span class="n-item-meta-title">站内信</span>';
						if(data['dms']){
							if(SideTool.noticeDetails['dms']['count'] > 0){
								noticeList += '<span class="n-item-meta-author">'+data['dms']['nick_name']+' 发来站内信</span>'+
											  '<span class="n-item-meta-content">'+SideTool._cutStr(data['dms']['content'],60,'...')+'</span>';
								if(data['dms']['create_time']){
									noticeList += '<span class="n-item-meta-update-time">'+data['dms']['create_time']+'</span>';
								}
							}else{
								noticeList += '<span class="n-item-meta-author">暂无未读消息</span>';
							}
						}else{
							noticeList += '<span class="n-item-meta-author"  id="notice_nodata_dms">暂无此类消息</span>';
						}
						noticeList += '</li></ul></div>';
					}else if(SideTool.noticeDetailsOrder[i] == 'video_reply' || SideTool.noticeDetailsOrder[i] == 'statuses_comments'){
						if(!comment_is_have_cycle){
							if(SideTool.noticeDetails['video_reply']['count'] > 0 || SideTool.noticeDetails['statuses_comments']['count'] > 0){
								comment_count += SideTool.noticeDetails['video_reply']['count'] + SideTool.noticeDetails['statuses_comments']['count'];
								noticeList += '<div class="yk-toolbar-n-item yk-toolbar-n-item-comments" name="noticelist" data-stat-role="ck" id="toolbar_notice_comments" '+
											  'noticetype="comments"><div class="yk-toolbar-n-submark" data-stat-role="ck"><span class="yk-toolbar-submark" data-stat-role="ck"></span></div>'+
											  '<ul class="n-item-ul n-item-ul-comments"><li class="n-item-logo n-item-logo-comments" data-stat-role="ck"><span class="ico-notice ico-notice-comments">'+
											  '</span><span class="yk-toolbar-notice-num" id="newnoticeiconcomments"></span></li><li class="n-item-meta" data-stat-role="ck">'+
											  '<span class="n-item-meta-title">评论</span>';
								if(data['video_reply'] && SideTool.noticeDetails['video_reply']['count'] > 0){
									noticeList += '<span class="n-item-meta-author">'+data['video_reply']['nick_name']+' 评论了你的视频</span>'+
												  '<span class="n-item-meta-content">'+SideTool._cutStr(data['video_reply']['content'],60,'...')+'</span>';
									if(data['video_reply']['create_time']){
										noticeList += '<span class="n-item-meta-update-time">'+data['video_reply']['create_time']+'</span>';
									}
								}else if(data['statuses_comments']){
									noticeList += '<span class="n-item-meta-author">'+data['statuses_comments']['nick_name']+' 评论了你的空间</span>'+
									  			  '<span class="n-item-meta-content">'+SideTool._cutStr(data['statuses_comments']['content'],60,'...')+'</span>';
									if(data['statuses_comments']['create_time']){
										noticeList += '<span class="n-item-meta-update-time">'+data['statuses_comments']['create_time']+'</span>';
									}
								}
								noticeList += '</li></ul></div>';
							}
							comment_is_have_cycle = true;

						}else if(comment_count == 0){
							noticeList += '<div class="yk-toolbar-n-item yk-toolbar-n-item-comments" name="noticelist" data-stat-role="ck" id="toolbar_notice_comments" '+
										  'noticetype="comments"><div class="yk-toolbar-n-submark" data-stat-role="ck"><span class="yk-toolbar-submark" data-stat-role="ck"></span></div>'+
										  '<ul class="n-item-ul n-item-ul-comments"><li class="n-item-logo n-item-logo-comments" data-stat-role="ck"><span class="ico-notice ico-notice-comments"></span>';            
							noticeList += '</li><li class="n-item-meta" data-stat-role="ck"><span class="n-item-meta-title">评论</span>';
							if(!data['video_reply'] && !data['statuses_comments']){
								noticeList += '<span class="n-item-meta-author"  id="notice_nodata_comments" nodata="true">暂无此类消息</span>';
							}else{
								noticeList += '<span class="n-item-meta-author">暂无未读消息</span>';
							}
							noticeList += '</li></ul></div>';
						}
					}else if(SideTool.noticeDetailsOrder[i] == 'statuses_mentions'){
						noticeList += '<div class="yk-toolbar-n-item yk-toolbar-n-item-at" name="noticelist" data-stat-role="ck" id="toolbar_notice_mentions" '+
									  'noticetype="mentions"><div class="yk-toolbar-n-submark" data-stat-role="ck"><span class="yk-toolbar-submark" data-stat-role="ck"></span></div>'+
		                			  '<ul class="n-item-ul n-item-ul-at"><li class="n-item-logo n-item-logo-at" data-stat-role="ck"><span class="ico-notice ico-notice-at"></span>';
						if(SideTool.noticeDetails['statuses_mentions']['count'] > 0){
							noticeList += '<span class="yk-toolbar-notice-num" id="newnoticeiconmentions"></span>';
						}             
						noticeList += '</li><li class="n-item-meta" data-stat-role="ck"><span class="n-item-meta-title">@提到我的</span>';
		                if(data['statuses_mentions']){
		                	if(SideTool.noticeDetails['statuses_mentions']['count'] > 0){
		                		noticeList += '<span class="n-item-meta-author">'+data['statuses_mentions']['nick_name']+' 提到了你</span>'+
								  			  '<span class="n-item-meta-content">'+SideTool._cutStr(data['statuses_mentions']['content'],60,'...')+'</span>';
								if(data['statuses_mentions']['create_time']){
									noticeList += '<span class="n-item-meta-update-time">'+data['statuses_mentions']['create_time']+'</span>';
								}
							}else{
								noticeList += '<span class="n-item-meta-author">暂无未读消息</span>';
							}
						}else{
							noticeList += '<span class="n-item-meta-author" id="notice_nodata_mentions">暂无此类消息</span>';
						}
						noticeList += '</li></ul></div>';
					}else if(SideTool.noticeDetailsOrder[i] == 'followers' && SideTool.noticeDetails['followers']['count'] > 0){
						noticeList += '<div class="yk-toolbar-n-item yk-toolbar-n-item-fans" name="noticelist" data-stat-role="ck" id="toolbar_notice_followers" '+
									  'noticetype="followers"><div class="yk-toolbar-n-submark" data-stat-role="ck"><span class="yk-toolbar-submark" data-stat-role="ck"></span></div>'+
	      			  				  '<ul class="n-item-ul n-item-ul-fans"><li class="n-item-logo n-item-logo-fans" data-stat-role="ck"><span class="ico-notice ico-notice-fans"></span>';
						if(SideTool.noticeDetails['followers']['count'] > 0){
							noticeList += '<span class="yk-toolbar-notice-num" id="newnoticeiconfollowers"></span>';
						}             
						noticeList += '</li><li class="n-item-meta" data-stat-role="ck"><span class="n-item-meta-title">新粉丝</span>'+
	      			  				  '<span class="n-item-meta-author">'+SideTool.noticeDetails['followers']['count']+'人 刚刚订阅了你</span>';
	      			  	//新粉丝更新时间todo

						noticeList += '</li></ul></div>';
					}else if(SideTool.noticeDetailsOrder[i] == 'hudong' && SideTool.noticeDetails['hudong']['count'] > 0){
						noticeList += '<div class="yk-toolbar-n-item yk-toolbar-n-item-live" name="noticelist" data-stat-role="ck" id="toolbar_notice_hudong" '+
									  'noticetype="hudong"><div class="yk-toolbar-n-submark" data-stat-role="ck"><span class="yk-toolbar-submark" data-stat-role="ck"></span></div>'+
									  '<ul class="n-item-ul n-item-ul-live"><li class="n-item-logo n-item-logo-live" data-stat-role="ck"><span class="ico-notice ico-notice-live"></span>';
						if(SideTool.noticeDetails['hudong']['count'] > 0){
							noticeList += '<span class="yk-toolbar-notice-num" id="newnoticeiconhudong"></span>';
						}             
						noticeList += '</li><li class="n-item-meta" data-stat-role="ck"><span class="n-item-meta-title">直播</span>';
					    if(data['hudong']){
					    	noticeList += '<span class="n-item-meta-author" id="notice_nodata_hudong"><a href="'+data['hudong']['url']+'" target="_blank">'+SideTool._cutStr(data['hudong']['nick_name'],60,'...')+'</a></span>';
					    	//互动直播更新时间todo
						}
						noticeList += '</li></ul></div>';
					}else if(SideTool.noticeDetailsOrder[i] == 'xingmeng_live' && SideTool.noticeDetails['xingmeng_live']['count'] > 0){
						noticeList += '<div class="yk-toolbar-n-item yk-toolbar-n-item-star" name="noticelist" data-stat-role="ck" id="toolbar_notice_xingmeng_live" '+
									  'noticetype="xingmeng_live"><div class="yk-toolbar-n-submark" data-stat-role="ck"><span class="yk-toolbar-submark" data-stat-role="ck"></span></div>'+
					      			  '<ul class="n-item-ul n-item-ul-star"><li class="n-item-logo n-item-logo-star" data-stat-role="ck"><span class="ico-notice ico-notice-star"></span>';
						if(SideTool.noticeDetails['xingmeng_live']['count'] > 0){
							noticeList += '<span class="yk-toolbar-notice-num" id="newnoticeiconxingmeng_live"></span>';
						}             
						noticeList += '</li><li class="n-item-meta" data-stat-role="ck"><span class="n-item-meta-title">星梦</span>';
					    if(data['xingmeng_live']){
					      	noticeList += '<span class="n-item-meta-author">'+data['xingmeng_live']['nick_name']+' 直播即将开始</span>';
					      	//星梦更新时间todo
						}
						noticeList += '</li></ul></div>';
					}
				}
				noticeList += '</div>';
			}
			
			if(SideTool.noticetotal <= 0){
            	$('newnoticeicon').style.display = "none";
            }
			
			if(noticeList){
				noticeListObj.innerHTML = '<div id="hideshownoticelist" style="position: absolute;width: 330px;height: 100%;">' + SideTool.noticeheader + '<div class="yk-toolbar-mod-bd">' + noticeList + '</div>' + SideTool.noticefooter + '</div>';				
				
				var addDisableclass = function(type){
					if($('notice_nodata_'+type)){
						$('notice_nodata_'+type).parentNode.parentNode.parentNode.className += ' yk-toolbar-n-item-disable';
						$('notice_nodata_'+type).parentNode.parentNode.parentNode.setAttribute('name','');
					}
				};
				addDisableclass('sysmsg');
				addDisableclass('dms');
				addDisableclass('comments');
				addDisableclass('mentions');
				addDisableclass('hudong');
				
				setTimeout(function(){
					SideTool.noticeShowHover();
				},300);
			}else{
				noticeListObj.innerHTML = SideTool.noticeheader + SideTool.noticenull + SideTool.nonoticefooter;
			}
		},
		
		noticeShowHover: function(){
			//打开通知面板清除互动通知
			if(SideTool.noticeDetails.hudong.count > 0){
				//SideTool.resetNoticeNum('["hudong"]');
    			SideTool.noticetotal -= SideTool.noticeDetails.hudong.count;
	            SideTool.noticeDetails.hudong.count = 0;
	            if(SideTool.noticetotal <= 0){
	            	$('newnoticeicon').style.display = "none";
	            }
			}
			
			var noticeLiList = SideTool._getElementsByName('div','noticelist');
            if(noticeLiList){
                var listLen = noticeLiList.length;
                for(var i = 0; i<listLen; i++){
					SideTool._addEvent(noticeLiList[i], 'mouseenter', function(){ 
						SideTool._addHover(this , ' yk-toolbar-subitem-hover');
					});
					SideTool._addEvent(noticeLiList[i], 'mouseleave', function(){
						SideTool._removeHover(this , ' yk-toolbar-subitem-hover');
					});
					
                	noticeLiList[i].onclick = function(){
                		var noticetype = this.getAttribute('noticetype');
                		SideTool.shownoticeinfo(noticetype);
					}
                }
            }				
		},
		
		shownoticeinfo: function(type){
			if($('noticeinfo_'+type)){
    			SideTool.slideToggleTwoPanels('hideshownoticelist' , 'noticeinfo_'+type , 'go');
    			SideTool.gobacknoticelist(type);
    		}else{
    			var url = 'http://nc.youku.com/index_QSideToolJSONP?function[]=getNotice'+type+'&callback[]=SideTool.showNoticeInfoCallback';
    			if(type == 'followers' && SideTool.noticeDetails['followers']['count'] > 0){
    				url += '&num='+SideTool.noticeDetails['followers']['count'];
    			}
    			Nova.addScript(url);
    		}
		},
		
		showNoticeInfoCallback: function(data){
			var noticeListObj = $(SideTool.panel.noticelist);
			noticeListObj.innerHTML += '<div id="noticeinfo_'+data['noticetype']+'" style="height: 100%; position: absolute; width: 330px; right: -330px;">'+SideTool.loading+'</div>';
			var noticeInfoList = '';
			if(data['noticetype'] == 'sysmsg'){
				noticeInfoList = SideTool.getNoticeInfoDetail('sysmsg' , data);
				
				if(SideTool.noticeDetails.sysmsg.count > 0){
					SideTool.resetNoticeNum('[13,14,15,16,17,18,19,20]');
		            SideTool.noticetotal -= SideTool.noticeDetails.sysmsg.count;
		            SideTool.noticeDetails.sysmsg.count = 0;
		            $('newnoticeiconsysmsg').style.display = 'none';
				}
    		}else if(data['noticetype'] == 'dms'){
    			noticeInfoList = SideTool.getNoticeInfoDetail('dms' , data);
    			
    			if(SideTool.noticeDetails.dms.count > 0){
	    			SideTool.resetNoticeNum('[6]');
	    			SideTool.noticetotal -= SideTool.noticeDetails.dms.count;
		            SideTool.noticeDetails.dms.count = 0;
		            $('newnoticeicondms').style.display = 'none';
    			}
    		}else if(data['noticetype'] == 'comments'){
    			noticeInfoList = SideTool.getNoticeInfoDetail('comments' , data);
    			
    			if(SideTool.noticeDetails.video_reply.count > 0 || SideTool.noticeDetails.statuses_comments.count > 0){
    				SideTool.resetNoticeNum('[7,8,9]');
        			SideTool.noticetotal -= SideTool.noticeDetails.video_reply.count;
    	            SideTool.noticeDetails.video_reply.count = 0;
        			SideTool.noticetotal -= SideTool.noticeDetails.statuses_comments.count;
    	            SideTool.noticeDetails.statuses_comments.count = 0;
    	            $('newnoticeiconcomments').style.display = 'none';
    			}
    		}else if(data['noticetype'] == 'mentions'){
    			noticeInfoList = SideTool.getNoticeInfoDetail('mentions' , data);
    			
    			if(SideTool.noticeDetails.statuses_mentions.count > 0){
    				//SideTool.resetNoticeNum('[11]');
        			SideTool.noticetotal -= SideTool.noticeDetails.statuses_mentions.count;
    	            SideTool.noticeDetails.statuses_mentions.count = 0;
    	            $('newnoticeiconmentions').style.display = 'none';
    			}
    		}else if(data['noticetype'] == 'followers'){
    			noticeInfoList = SideTool.getNoticeInfoDetail('followers' , data);
    			
    			if(SideTool.noticeDetails.followers.count){
    				SideTool.resetNoticeNum('[12]');
        			SideTool.noticetotal -= SideTool.noticeDetails.followers.count;
    	            SideTool.noticeDetails.followers.count = 0;
    	            $('newnoticeiconfollowers').style.display = 'none';
    			}
    		}
			if(SideTool.noticetotal <= 0){
            	$('newnoticeicon').style.display = "none";
            }
			
			var noticeinfoheader = '<div class="yk-toolbar-mod-hd"><div class="yk-toolbar-mod-title"><div class="yk-toolbar-btn-back" id="gobacknoticelist_'+data['noticetype']+
								   '" data-stat-role="ck"><span class="yk-toolbar-group-item-icon icon-subscription-back"></span>'+
								   '<span class="mod-hd-action-back">返回</span></div><a class="mod-title-link" href="'+data['noticemoreurl']+'" target="_blank">'+
								   '<span class="yk-toolbar-mod-title-txt">'+data['noticename']+'</span></div></div>';
			var noticeinfofooter = '<div class="yk-toolbar-mod-ft"><div class="yk-toolbar-mod-links  yk-toolbar-mod-links">'+
								   '<a href="'+data['noticemoreurl']+'" target="_blank">查看全部</a></div></div>';
	
			$('noticeinfo_'+data['noticetype']).innerHTML += noticeinfoheader + noticeInfoList + noticeinfofooter;
			SideTool.slideToggleTwoPanels('hideshownoticelist' , 'noticeinfo_'+data['noticetype'] , 'go');
			setTimeout(function(){
				SideTool.gobacknoticelist(data['noticetype']);
			},100);
		},
		
		getNoticeInfoDetail: function(noticetype , data){
			var noticeInfoList = '';
			if(noticetype == 'sysmsg'){
				if(data && data['datas']){
    				noticeInfoList += '<div class="yk-toolbar-mod-bd"><div class="yk-toolbar-sublist">';
    				var infolen = data['datas'].length;
    				for(var i = 0;i < infolen;i++){
    					noticeInfoList += '<div class="yk-toolbar-subitem" id="toolbar_notice_sysmsg_two_'+i+'"><ul class="subitem-u subitem-u-h"><li class="subitem-u-thumb">'+
    									  '<img src="'+data['datas'][i]['avatar']+'" alt="'+data['datas'][i]['sender_name']+'" replace="false"></li>'+
    		                              '<li class="subitem-u-meta"><div class="subitem-u-meta-title subitem-u-meta-title-blue">'+
    		                              '<a target="_blank" title="'+SideTool._cutStr(data['datas'][i]['sender_name'],16,'...')+'">'+data['datas'][i]['sender_name']+'</a>'+
    		                              '<span class="meta-update-time">'+data['datas'][i]['ctime_format']+'</span></div><div class="subitem-u-meta-entry"><span>';
    		            var sys_content = data['datas'][i]['content'];
    					if(data['datas'][i]['title']){
    						sys_content = '《'+data['datas'][i]['title']+'》' + sys_content;
    		            }
    					noticeInfoList += SideTool._cutStr(sys_content,60,'...')+'</span><a class="subitem-u-meta-sys-dlink" target="_blank" href="http://'+UC_DOMAIN+'/u/home/type_sysmsg">'+
    									  '查看详情</a></div></li></ul><div class="v-segment" style=""></div></div>';
    				}
    				noticeInfoList += '</div></div>';
    			}
    		}else if(noticetype == 'dms'){
    			if(data && data['data']){
    				noticeInfoList += '<div class="yk-toolbar-mod-bd"><div class="yk-toolbar-sublist">';
    				var infolen = data['data'].length;
    				for(var i = 0;i < infolen;i++){
    					if(data['data'][i]['msg_state'] != 1){
    						noticeInfoList += '<div class="yk-toolbar-subitem" id="toolbar_notice_dms_two_'+i+'"><ul class="subitem-u subitem-u-m"><li class="subitem-u-link">'+
					              			  '<a href="http://'+UC_DOMAIN+'/u/'+data['data'][i]['encode_cuid']+'" target="_blank" title="'+data['data'][i]['nick_name']+'"></a></li>'+
					              			  '<li class="subitem-u-thumb"><img src="'+data['data'][i]['avater']+'" alt="'+data['data'][i]['nick_name']+'"></li>'+
				                              '<li class="subitem-u-meta"><div class="subitem-u-meta-title subitem-u-meta-title-blue"><a href="http://'+UC_DOMAIN+'/u/'+data['data'][i]['encode_cuid']+
				                              '" target="video" title="'+data['data'][i]['nick_name']+'">'+SideTool._cutStr(data['data'][i]['nick_name'],16,'...')+':</a>'+
				                              '<span class="meta-update-time">'+data['data'][i]['format_time']+'</span></div><div class="subitem-u-meta-entry">'+
				                              '<span class="meta-entry-ctx-2">'+data['data'][i]['content']+'</span><div>'+
				                              '<a href="http://'+UC_DOMAIN+'/u/home/type_privatemsg/subType_one/cuid_'+data['data'][i]['encode_cuid']+'" target="_blank" '+
				                              'class="v-action-sub-link">全部'+data['data'][i]['msg_num']+'条对话</a></div></div></li></ul><div class="v-segment" style=""></div></div>';
    					}
    					
    				}
    				noticeInfoList += '</div></div>';
    			}
    		}else if(noticetype == 'comments'){
    			if(data && data['data']){
    				noticeInfoList += '<div class="yk-toolbar-mod-bd"><div class="yk-toolbar-sublist">';
    				var infolen = data['data'].length;
    				for(var i = 0;i < infolen;i++){
    					noticeInfoList += '<div class="yk-toolbar-subitem  yk-toolbar-subitem-nolimit" id="toolbar_notice_comments_two_'+i+'"><ul class="subitem-u subitem-u-m"><li class="subitem-u-link">'+
                            			  '<a href="http://'+UC_DOMAIN+'/u/'+data['data'][i]['user']['encodeuid']+'" target="_blank" title="'+data['data'][i]['user']['name']+'"></a></li>'+
                            			  '<li class="subitem-u-thumb"><img src="'+data['data'][i]['user']['profile_image_url']['middle']+'" alt="'+data['data'][i]['user']['name']+'"></li>'+
                            			  '<li class="subitem-u-meta"><div class="subitem-u-meta-title subitem-u-meta-title-blue">'+
                            			  '<a href="http://'+UC_DOMAIN+'/u/'+data['data'][i]['user']['encodeuid']+'" target="_blank" title="'+data['data'][i]['user']['name']+'">'+
                            			  SideTool._cutStr(data['data'][i]['user']['name'],16,'...')+':</a><span class="meta-update-time">'+data['data'][i]['create_at_formate']+'</span></div>'+
                            			  '<div class="subitem-u-meta-entry"><span class="meta-entry-ctx">'+data['data'][i]['text_formate']+'</span><div>';
    					if(data['data'][i]['videoinfo'] && data['data'][i]['videoinfo']['videoId']){
    						noticeInfoList += '<span class="u-meta-c">评论了<a class="u-meta-c-author" href="http://'+UC_DOMAIN+'/u/'+data['data'][i]['videoinfo']['ownerEncode']+'" target="_blank">'+
    										  '@'+data['data'][i]['videoinfo']['ownerUserName']+'</a>的视频<a class="u-meta-c-vt" target="_blank" '+
    										  'href="http://v.youku.com/v_show/id_'+data['data'][i]['videoinfo']['videoIdEncode']+'">'+data['data'][i]['videoinfo']['title']+'</a></span>';
    					}else{
    						noticeInfoList += '<span class="u-meta-c">评论视频已被屏蔽</span>';
    					}
    					noticeInfoList += '</div></div></li></ul></div>';
    				}
    				noticeInfoList += '</div></div>';
    			}
    		}else if(noticetype == 'mentions'){
    			if(data && data['statuses']){
    				noticeInfoList += '<div class="yk-toolbar-mod-bd"><div class="yk-toolbar-sublist">';
    				var infolen = data['statuses'].length;
    				for(var i = 0;i < infolen;i++){
    					noticeInfoList += '<div class="yk-toolbar-subitem  yk-toolbar-subitem-nolimit" id="toolbar_notice_mentions_two_'+i+'"><ul class="subitem-u"><li class="subitem-u-link">'+
    	                        		  '<a href="http://'+UC_DOMAIN+'/u/'+data['statuses'][i]['user']['encode_id']+'" target="_blank" title="'+data['statuses'][i]['user']['name']+'"></a></li>'+
    	                        		  '<li class="subitem-u-thumb"><img src="'+data['statuses'][i]['user']['icon']+'" alt="'+data['statuses'][i]['user']['name']+'"></li>'+
    	                        		  '<li class="subitem-u-meta"><div class="subitem-u-meta-title subitem-u-meta-title-blue">'+
    	                        		  '<a href="http://'+UC_DOMAIN+'/u/'+data['statuses'][i]['user']['encode_id']+'" target="_blank" title="'+data['statuses'][i]['user']['name']+'">'+
    	                        		  SideTool._cutStr(data['statuses'][i]['user']['name'],16,'...')+':</a><span class="meta-update-time">'+data['statuses'][i]['created_at_format']+'</span></div>'+
    	                        		  '<div class="subitem-u-meta-entry">';
    					if(data['statuses'][i]['retweeted_status']){
    						noticeInfoList += '<span>'+data['statuses'][i]['text']+'</span>';
    						if(data['statuses'][i]['retweeted_status']['stat'] != 0){
    							noticeInfoList += '<div class="u-meta-c-h-ctx">此条动态已被原作者删除</div>';
    						}else{
    							noticeInfoList += '<div class="u-meta-c-h-ctx">转发自<a href="'+data['statuses'][i]['retweeted_status']['user']['link']+
    											  '">@'+data['statuses'][i]['retweeted_status']['user']['name']+'</a>';
    							
    							if(data['statuses'][i]['retweeted_status']['user']['ucicon']){
    								noticeInfoList += data['statuses'][i]['retweeted_status']['user']['ucicon']+'：';
    							}
    							noticeInfoList += data['statuses'][i]['retweeted_status']['text']+'</div>';
    						}
    					}else{
    						noticeInfoList += '<span class="meta-entry-ctx">'+data['statuses'][i]['text']+'</span>';
    					}
    					noticeInfoList += '</div></li></ul><div class="v-segment"></div></div>';
    					
    				}
    				noticeInfoList += '</div></div>';
    			}
    		}else if(noticetype == 'followers'){
    			if(data && data['list']){
    				noticeInfoList += '<div class="yk-toolbar-mod-bd"><div class="yk-toolbar-sublist">';
    				var infolen = data['list'].length;
    				for(var i = 0;i < infolen;i++){
    					noticeInfoList += '<div class="yk-toolbar-subitem" id="toolbar_notice_followers_two_'+i+'"><ul class="subitem-u"><li class="subitem-u-link">'+
                            			  '<a href="http://'+UC_DOMAIN+'/u/'+data['list'][i]['encodeuid']+'" target="_blank" title="'+data['list'][i]['name']+'"></a></li>'+
                            			  '<li class="subitem-u-thumb"><img src="'+data['list'][i]['profile_image_url']+'" alt="'+data['list'][i]['name']+'"></li>'+
                            			  '<li class="subitem-u-meta"><div class="subitem-u-meta-title subitem-u-meta-title-blue">'+
                            			  '<a href="http://'+UC_DOMAIN+'/u/'+data['list'][i]['encodeuid']+'" target="video" title="'+data['list'][i]['name']+'">'+
                            			  SideTool._cutStr(data['list'][i]['name'],16,'...')+'</a><span class="meta-update-time">'+data['list'][i]['relation_time_formate']+'</span></div>'+
                            			  '<div class="subitem-u-meta-entry"><span>视频：<em>'+data['list'][i]['statuses_count']+'</em></span><span class="v-segment-mini">|</span>'+
                            			  '<span>订阅：<em>'+data['list'][i]['friends_count']+'</em></span><span class="v-segment-mini">|</span><span>粉丝：<em>'+data['list'][i]['followers_count']+
                            			  '</em></span><div></div></div></li></ul><div class="v-segment" style=""></div></div>';
    				}
    				noticeInfoList += '</div></div>';
    			}
    		}
			return noticeInfoList;
		},
		
		gobacknoticelist: function(type){
			$('gobacknoticelist_'+type).onclick = function(){
        		SideTool.slideToggleTwoPanels('hideshownoticelist' , 'noticeinfo_'+type , 'goback');
        		SideTool.noticeShowHover();
			}
		},
		
		showMemberList: function(){
			var memberListObj = $(SideTool.panel.memberlist);
			if(!memberListObj){
				return false;
			}
			memberListObj.innerHTML = SideTool.loading;
			Nova.addScript('http://nc.youku.com/index_QSideToolJSONP?function[]=getMemberInfo&callback[]=SideTool.showMemberListCallback');
		},
		
		showMemberListCallback: function(data){
			var memberListObj = $(SideTool.panel.memberlist);
			memberListObj.innerHTML = SideTool.loading;
			var memberInfo = '';
			if(SideTool.isLogin){
				memberInfo += '<div class="yk-toolbar-mod-bd"><div class="yk-toolbar-member-user">'+
				      		  '<a href="http://'+UC_DOMAIN+'/u/'+data['userIdEncode']+'" target="_blank"><img src="'+data['icon']+'"></a>'+
				      		  '<div class="m-u-meta"><a href="http://'+UC_DOMAIN+'/u/'+data['userIdEncode']+'" target="_blank">'+SideTool._cutStr(data['userName'],12,'...')+'</a>';
				if(data['isvip']){
					memberInfo += '<a href="http://vip.youku.com/" target="_blank" title="优酷会员"><span class="yk-toolbar-ico ico__vipsuper"><span class="ico__vipflash"></span></span></a>'+
								  '</div></div><div class="yk-toolbar-member-benefit"><div class="m-b-list"><a href="http://cps.youku.com/redirect.html?id=0000f1b0" target="_blank" class="m-b-li m-b-li-free">'+
								  '<span class="m-b-li-icon m-b-icon-free"></span><span class="m-b-li-txt">免费</span></a><a href="http://cps.youku.com/redirect.html?id=0000f1b1" target="_blank" class="m-b-li m-b-li-k m-b-li-noad">'+
				          		  '<span class="m-b-li-icon m-b-icon-noad"></span><span class="m-b-li-txt">免广告</span></a><a href="http://cps.youku.com/redirect.html?id=0000f1b2" target="_blank" class="m-b-li m-b-li-k m-b-li-discount">'+
				          		  '<span class="m-b-li-icon m-b-icon-discount"></span><span class="m-b-li-txt">5折</span></a><a href="http://cps.youku.com/redirect.html?id=0000f1b3" target="_blank" class="m-b-li m-b-li-k m-b-li-1080">'+
				          		  '<span class="m-b-li-icon m-b-icon-1080"></span><span class="m-b-li-txt">1080P</span></a><a href="http://cps.youku.com/redirect.html?id=0000f1b4" target="_blank" class="m-b-li m-b-li-k m-b-li-boost">'+
				          		  '<span class="m-b-li-icon m-b-icon-boost"></span><span class="m-b-li-txt">提速</span></a></div></div>'+
				          		  '<div class="yk-toolbar-member-meta"><span class="m-meta-validity">会员有效期至<span class="m-deadline">'+data['member_endtime']+'</span>'+
				          		  ',还剩余<span class="m-remained">'+data['lastdays']+'</span>天</span><a class="yk-toolbar-link-block yk-toolbar-link-block-orange" '+
				          		  'href="http://cps.youku.com/redirect.html?id=0000f1ac" target="_blank">续费</a></div>';
				}else{
					memberInfo += '<a href="http://vip.youku.com/" target="_blank" title="优酷会员"><span class="ico_no_vipsuper"><span class="ico__vipflash"></span></span></a>'+
								  '<a href="http://cps.youku.com/redirect.html?id=0000f1ab" target="_blank" title="优酷会员" class="get-vip-link">开通会员</a>'+
								  '</div></div><div class="yk-toolbar-member-benefit"><div class="m-b-list"><a href="http://cps.youku.com/redirect.html?id=0000f1b0" target="_blank" class="m-b-li m-b-li-free">'+
								  '<span class="m-b-li-icon m-b-icon-free-grey"></span><span class="m-b-li-txt m-b-li-txt-grey">免费</span></a><a href="http://cps.youku.com/redirect.html?id=0000f1b1" target="_blank" class="m-b-li m-b-li-k m-b-li-noad">'+
								  '<span class="m-b-li-icon m-b-icon-noad-grey"></span><span class="m-b-li-txt m-b-li-txt-grey">免广告</span></a><a href="http://cps.youku.com/redirect.html?id=0000f1b2" target="_blank" class="m-b-li m-b-li-k m-b-li-discount">'+
								  '<span class="m-b-li-icon m-b-icon-discount-grey"></span><span class="m-b-li-txt m-b-li-txt-grey">5折</span></a><a href="http://cps.youku.com/redirect.html?id=0000f1b3" target="_blank" class="m-b-li m-b-li-k m-b-li-1080">'+
								  '<span class="m-b-li-icon m-b-icon-1080-grey"></span><span class="m-b-li-txt m-b-li-txt-grey">1080P</span></a><a href="http://cps.youku.com/redirect.html?id=0000f1b4" target="_blank" class="m-b-li m-b-li-k m-b-li-boost">'+
								  '<span class="m-b-li-icon m-b-icon-boost-grey"></span><span class="m-b-li-txt m-b-li-txt-grey">提速</span></a></div></div>'+ 
								  '<div class="yk-toolbar-member-meta"><a class="yk-toolbar-link-block yk-toolbar-link-block-orange" '+
								  'href="http://cps.youku.com/redirect.html?id=0000f1ab" target="_blank">开通会员</a></div>';
				}
			}else{
				memberInfo +='<div class="yk-toolbar-mod-bd"><div class="yk-toolbar-member-user"><a href="http://vip.youku.com/" target="_blank">'+
							 '<img src="http://static.youku.com/index/img/toolbar/toolbar_avatar.jpg"></a><div class="m-u-intro"><span class="m-u-intro-title">Hi，你好~</span>'+
							 '<span class="m-u-intro-entry">开通会员可享受多种特权~</span></div></div><div class="yk-toolbar-member-benefit"><div class="m-b-list">'+
							 '<a href="http://cps.youku.com/redirect.html?id=0000f1b0" target="_blank" class="m-b-li m-b-li-free"><span class="m-b-li-icon m-b-icon-free-grey"></span><span class="m-b-li-txt m-b-li-txt-grey">免费</span></a>'+
							 '<a href="http://cps.youku.com/redirect.html?id=0000f1b1" target="_blank" class="m-b-li m-b-li-k m-b-li-noad"><span class="m-b-li-icon m-b-icon-noad-grey"></span><span class="m-b-li-txt m-b-li-txt-grey">免广告</span></a>'+
							 '<a href="http://cps.youku.com/redirect.html?id=0000f1b2" target="_blank" class="m-b-li m-b-li-k m-b-li-discount"><span class="m-b-li-icon m-b-icon-discount-grey"></span><span class="m-b-li-txt m-b-li-txt-grey">5折</span></a>'+
							 '<a href="http://cps.youku.com/redirect.html?id=0000f1b3" target="_blank" class="m-b-li m-b-li-k m-b-li-1080"><span class="m-b-li-icon m-b-icon-1080-grey"></span><span class="m-b-li-txt m-b-li-txt-grey">1080P</span></a>'+
							 '<a href="http://cps.youku.com/redirect.html?id=0000f1b4" target="_blank" class="m-b-li m-b-li-k m-b-li-boost"><span class="m-b-li-icon m-b-icon-boost-grey"></span><span class="m-b-li-txt m-b-li-txt-grey">提速</span></a></div></div>'+
							 '<div class="yk-toolbar-member-meta"><a class="yk-toolbar-link-block yk-toolbar-link-block-orange" '+
							 'href="http://cps.youku.com/redirect.html?id=0000f1ab" target="_blank">开通会员</a></div>';
			}
			if(data['cms_content']){
				memberInfo += '<div class="yk-toolbar-member-activity">'+data['cms_content']+'</div>';
			}
			memberInfo += '</div>';
			memberListObj.innerHTML = SideTool.memberheader + memberInfo + SideTool.memberfooter;
			
			//清除红点
			if($('newnoticeiconmember')){
				$('newnoticeiconmember').style.display = 'none';
				var actStartObj = SideTool.noticeMember['start'].split('-');
				var actStart = (new Date(actStartObj[0],parseInt(actStartObj[1])-1,actStartObj[2],0,0,0)).valueOf();
				Nova.Cookie.set('st_n_m_'+actStart,1,SideTool.noticeMember['cookietime']);
			}
		},
		
		showShoppingList: function(){
			var shoppingListObj = $(SideTool.panel.shoppinglist);
			if(!shoppingListObj){
				return false;
			}
			shoppingListObj.innerHTML = SideTool.loading;
			Nova.addScript('http://nc.youku.com/index_QSideToolJSONP?function[]=getGoodsList&callback[]=SideTool.showShoppingListCallback');
		},
		
		showShoppingListCallback: function(data){
			var shoppingListObj = $(SideTool.panel.shoppinglist);
			var shoppingList = "";
			if(data && data['goodslist']){
				var listlen = data['goodslist'].length;
				for(var i = 0;i < listlen;i++){
					shoppingList += '<div class="yk-toolbar-cart-items" name="shoppinglist" is_viewed="'+data['goodslist'][i]['is_viewed']+'" id="goods_hover_'+data['goodslist'][i]['id']+
									'" gid="'+data['goodslist'][i]['id']+'" mid="'+data['goodslist'][i]['mid']+'" vid="'+data['goodslist'][i]['video_id_encode']+'">';
					if(data['goodslist'][i]['m_status'] == 1){
						shoppingList += '<a target="_blank" href="http://nc.youku.com/index_shoppingCartToBuy?vid='+data['goodslist'][i]['video_id_encode']+'&mid='+data['goodslist'][i]['mid']+'&murl='+
										encodeURIComponent(data['goodslist'][i]['m_url'])+'" onclick="SideTool._eshopStatisticsClothCoad(\'click\',\'buy\',\'\',\''+
										data['goodslist'][i]['video_id_encode']+'\',\''+data['goodslist'][i]['mid']+'\',\'\',\''+encodeURIComponent(data['goodslist'][i]['m_url'])+
										'\');">';
					}
					shoppingList += '<div class="yk-toolbar-cart-icon"><img class="product-from" src="'+data['goodslist'][i]['m_source_icon']+'" alt=""><img src="'+
									data['goodslist'][i]['m_image']+'" alt="'+data['goodslist'][i]['m_title']+'"></div><div class="yk-toolbar-cart-title" title="'+
									data['goodslist'][i]['m_title']+'">'+data['goodslist'][i]['m_title']+'</div><div class="yk-toolbar-cart-price">'+
									'<span class="yk-toolbar-cart-curren-price">¥ '+data['goodslist'][i]['m_cprice']+'</span><span class="yk-toolbar-cart-old-price"><del>¥ '+
									data['goodslist'][i]['m_price']+'</del></span></div>';
					if(data['goodslist'][i]['m_status'] == 1){
						shoppingList += '</a>';
					}
					shoppingList += '<div class="yk-toolbar-cart-link"><div class="yk-toolbar-cart-link-icon"></div><a onclick="SideTool._eshopStatisticsClothCoad(\'click\',\'cart_video\',\'\',\''+
									data['goodslist'][i]['video_id_encode']+'\',\''+data['goodslist'][i]['mid']+'\',\'\',\'http://v.youku.com/v_show/id_'+data['goodslist'][i]['video_id_encode']+
									'.html?firsttime='+data['goodslist'][i]['video_time']+'\');" href="http://v.youku.com/v_show/id_'+data['goodslist'][i]['video_id_encode']+'.html?firsttime='+
									data['goodslist'][i]['video_time']+'" title="'+data['goodslist'][i]['video_title']+'" target="_blank">'+SideTool._cutStr(data['goodslist'][i]['video_title'], 18 , '...')+'</a></div>';
					if(data['goodslist'][i]['m_status'] == 1){
						shoppingList += '<div class="yk-toolbar-cart-goshoping"><a target="_blank" href="http://nc.youku.com/index_shoppingCartToBuy?vid='+
										data['goodslist'][i]['video_id_encode']+'&mid='+data['goodslist'][i]['mid']+'&murl='+encodeURIComponent(data['goodslist'][i]['m_url'])+
										'" onclick="SideTool._eshopStatisticsClothCoad(\'click\',\'buy\',\'\',\''+data['goodslist'][i]['video_id_encode']+'\',\''+
										data['goodslist'][i]['mid']+'\',\'\',\''+encodeURIComponent(data['goodslist'][i]['m_url'])+'\');">去购买&gt;</a></div>';
					}else if(data['goodslist'][i]['m_status'] == -4){
						shoppingList += '<div class="yk-toolbar-cart-unshoping">已下架</div>';
					}
					shoppingList += '<div class="yk-toolbar-item-closeicon" id="goods_del_'+data['goodslist'][i]['id']+'"></div></div>';
				}
			}
					
			if(shoppingList){
				if(!SideTool.isLogin){
					shoppingList = SideTool.logoutshopping + shoppingList;
				}
				shoppingListObj.innerHTML = SideTool.shoppingheader + '<div class="yk-toolbar-mod-bd" id="shoppinglists"><div class="yk-toolbar-cart-11ad">'+
											'<a onclick="SideTool._eshopStatisticsClothCoad(\'click\',\'cart_banner\',\'\',\'\',\'\',\'\',\''+
											encodeURIComponent('http://c.youku.com/bkbm/index')+'\');" href="http://c.youku.com/bkbm/index.html" target="_blank"></a></div>'+
											shoppingList + '</div>';	
				setTimeout(function(){
					SideTool.shoppingShowHover();
				},300);
			}else{
				shoppingListObj.innerHTML = SideTool.shoppingheader + SideTool.shoppingnull;
			}
			
			var max_total = 20;
			if(SideTool.isLogin){
				max_total = 100;
			}
			if($('goodsnum') && data['total']){
				$('goodsnum').innerHTML = '<span id="realgoodsnum">'+data['total']+'</span>/<span>'+max_total+'</span>';
			}

            //清除购物车红点提示
            $('newnoticeiconshopping').style.display = "none";
            $('newnoticeiconshopping').innerHTML = "";
            
            //购物车统计布点
			SideTool._eshopStatisticsClothCoad('show' , 'cart_list' , data['total'] , '' , '' , '' , '');
		},
		shoppingShowHover: function(){
			var shoppingDivList = SideTool._getElementsByName('div','shoppinglist');
			if(shoppingDivList){
				var not_viewed_id = '';
				var listLen = shoppingDivList.length;
				for(var i = 0; i<listLen; i++){
					var gid = shoppingDivList[i].getAttribute('gid');
					var is_viewed = shoppingDivList[i].getAttribute('is_viewed');
					var mid = shoppingDivList[i].getAttribute('mid');
					var vid = shoppingDivList[i].getAttribute('vid');
					if(parseInt(is_viewed) === 0){
						not_viewed_id += gid+',';
					}
					(function(gid , mid , vid){
						if($('goods_hover_'+gid)){
							SideTool._addEvent($('goods_hover_'+gid), 'mouseenter', function(){
								this.className = "yk-toolbar-cart-items yk-toolbar-cart-items-mouseover";
							});
							SideTool._addEvent($('goods_hover_'+gid), 'mouseleave', function(){
								this.className = "yk-toolbar-cart-items";
							});	
						}
						if($('goods_del_'+gid)){
							$('goods_del_'+gid).onclick = function(){
								Nova.addScript('http://nc.youku.com/index_QSideToolJSONP?function[]=shoppingCartDelGoods&callback[]=SideTool.shoppingCartDelGoodsCallback&gid='+gid);
								
								//统计布点
								SideTool._eshopStatisticsClothCoad('click' , 'delete' , '' , vid , mid , '' , '');
							};
						}
					})(gid , mid , vid);
				}
				
				//清除未读数
				not_viewed_id = not_viewed_id.substr(0 , not_viewed_id.length - 1);
				if(not_viewed_id){
					var img = new Image();
					img.src = 'http://hudong.pl.youku.com/interact/eshop/do/updatestatus?data={"ids":"'+not_viewed_id+'"}';
				}
				var curUid = SideTool.loginUID;
				if(!SideTool.isLogin){
					curUid = SideTool.tmpUID;
				}
	            if(Nova.Cookie.get('st_n_s'+curUid)){
	        		Nova.Cookie.set('st_n_s'+curUid , '' , -1);
	        	}
			}
		},
		shoppingCartDelGoodsCallback: function(data){
			if(data && data['ret'] === true && data['gid']){
				if($('goods_hover_'+data['gid'])){
					$('goods_hover_'+data['gid']).parentNode.removeChild($('goods_hover_'+data['gid']));
				}
				if($('realgoodsnum')){
					var realgoodsnum = parseInt($('realgoodsnum').innerHTML) - 1;
					if(realgoodsnum <= 0){
						realgoodsnum = 0;
					}
					$('realgoodsnum').innerHTML = realgoodsnum;
					if(realgoodsnum === 0){
						$(SideTool.panel.shoppinglist).innerHTML = SideTool.shoppingheader + SideTool.shoppingnull;
					}
				}
			}
		},
		playerDoAction: function(obj){
			if(!obj || !obj.type){ 
				return false; 
			}
			if(!obj.unread){
				obj.unread = 1;
			}
			var curUid = SideTool.loginUID;
			if(!SideTool.isLogin){
				curUid = SideTool.tmpUID;
			}
            var unreadNumKey = 'st_n_s'+curUid;
            var isShowLayerKey = 'st_e_g_l';
			if(obj.type == 1){
            	if(!Nova.Cookie.get(isShowLayerKey)){
        			var shoppingGuidLayer = document.createElement('div');
        			shoppingGuidLayer.className = 'yk-cart-cover';
        			shoppingGuidLayer.setAttribute("id","sidetoolshoppingguidlayer");
        			shoppingGuidLayer.innerHTML = '<div class="yk-cart-cover-left"></div><div class="yk-cart-cover-right"></div><div class="yk-cart-cover-tips">'+
        										  '<span class="yk-cart-cover-tips-title">您选的宝贝在这里哟</span><span class="yk-cart-cover-tips-btn"><a>我知道了</a></span></div>';
        			document.body.appendChild(shoppingGuidLayer);
        			setTimeout(function(){
        				if($('sidetoolshoppingguidlayer')){
        					$('sidetoolshoppingguidlayer').onclick = function(event){
        						//阻止冒泡
        						var e =  event || window.event;
        						if(e.stopPropagation) { 
        							e.stopPropagation(); 
        						}else{ 
        							e.cancelBubble = true; 
        						}
        						$('sidetoolshoppingguidlayer').parentNode.removeChild($('sidetoolshoppingguidlayer'));
        						SideTool.showModleEvent(SideTool.modleicon.eshop);
        					}
        				}
        			},100);
        			Nova.Cookie.set(isShowLayerKey , 1 , 365);
        			//购物车统计布点
        			SideTool._eshopStatisticsClothCoad('show' , 'cart_cover' , '' , '' , '' , '' , '');
            	}
            	if($('newnoticeiconshopping')){
					$('newnoticeiconshopping').innerHTML = obj.unread;
					$('newnoticeiconshopping').style.display = 'block';
				}
        		Nova.Cookie.set(unreadNumKey , obj.unread , 30);
			}else if(obj.type == 2){
				if($('sidetoolshoppingguidlayer')){
					$('sidetoolshoppingguidlayer').parentNode.removeChild($('sidetoolshoppingguidlayer'));
				}
				if(Nova.Cookie.get(isShowLayerKey)){
					Nova.Cookie.set(isShowLayerKey , '' , -1);
				}
				SideTool.showModleEvent(SideTool.modleicon.eshop);
			}else if(obj.type == 3){
				SideTool.showModleEvent(SideTool.modleicon.eshop , 2);
				SideTool.checkPositionOfCart(obj.xcoor , obj.ycoor , 'cart' , SideTool);
				setTimeout(function(){
					if($('newnoticeiconshopping')){
						if(!$('newnoticeiconshopping').innerHTML){
							$('newnoticeiconshopping').innerHTML = obj.unread;
							$('newnoticeiconshopping').style.display = 'block';
							Nova.Cookie.set(unreadNumKey , obj.unread , 30);
						}else{
							var oldNum = parseInt($('newnoticeiconshopping').innerHTML);
							$('newnoticeiconshopping').innerHTML = oldNum + 1;
							$('newnoticeiconshopping').style.display = 'block';
							Nova.Cookie.set(unreadNumKey , oldNum + 1 , 30);
						}
					}
				},1000);
			}
		},
		
		showSetList: function(){
			customize.initCustize();
		},
		
		sideToolGoTop:function(){
			var _this = this;
			var sideT = this.sideT;
			var goTop = document.getElementById(_this.modleicon.gotop.modlegroupid);
			var clientHeight = this.getWindowHeight();
			var scrollTop = this.getScrollTop();
			if(parseInt(navigator.userAgent.substring(navigator.userAgent.indexOf("MSIE")+5))==6){//IE6
				var h = sideT.offsetHeight;
				var top = scrollTop + clientHeight - h - 20;
				sideT.style.top = top + 'px';
				var t = scrollTop + clientHeight - 58 - 20;
				lightopen.style.top =  t + 'px';
			}
			if(!scrollTop || !clientHeight || scrollTop < clientHeight / 2){
				goTop.style.visibility = 'hidden';
			}else{
				goTop.style.visibility = 'visible';
				goTop.onclick = function(){
					document.body.scrollTop = 0;
					document.documentElement.scrollTop = 0;
				};
			}
		},
		
		//飞动初始化
		flyInit: function(){
			var _this = this;
			var jqueryUrl = [location.protocol, '//', 'static.youku.com', '/v/js/jquery.min.js'].join('');
			_this._sidetoolLoadJS(jqueryUrl, function(){
				jQuery.noConflict();
				var baseEasings = {};
				var $ = jQuery;
				$.each( [ "Quad", "Cubic", "Quart", "Quint", "Expo" ], function( i, name ) {
					baseEasings[ name ] = function( p ) {
						return Math.pow( p, i + 2 );
					};
				});
				$.extend( baseEasings, {
					Sine: function( p ) {
						return 1 - Math.cos( p * Math.PI / 2 );
					},
					Circ: function( p ) {
						return 1 - Math.sqrt( 1 - p * p );
					},
					Elastic: function( p ) {
						return p === 0 || p === 1 ? p :
							-Math.pow( 2, 8 * (p - 1) ) * Math.sin( ( (p - 1) * 80 - 7.5 ) * Math.PI / 15 );
					},
					Back: function( p ) {
						return p * p * ( 3 * p - 2 );
					},
					Bounce: function( p ) {
						var pow2,
							bounce = 4;

						while ( p < ( ( pow2 = Math.pow( 2, --bounce ) ) - 1 ) / 11 ) {}
						return 1 / Math.pow( 4, 3 - bounce ) - 7.5625 * Math.pow( ( pow2 * 3 - 2 ) / 22 - p, 2 );
					}
				});
				$.each( baseEasings, function( name, easeIn ) {
					$.easing[ "easeIn" + name ] = easeIn;
					$.easing[ "easeOut" + name ] = function( p ) {
						return 1 - easeIn( 1 - p );
					};
					$.easing[ "easeInOut" + name ] = function( p ) {
						return p < 0.5 ?
							easeIn( p * 2 ) / 2 :
							1 - easeIn( p * -2 + 2 ) / 2;
					};
				});	
				
				//浏览器缩放适配
				setTimeout(function(){
					_this.RESIZEAgent();
				},100);	
			});
		},
		//播放器飞动初始化
		checkPositionOfCart: function(offsetX,offsetY,modle,self){
			var $ = jQuery;
			var _this = self;
	        var playBox = document.getElementById('playerBox'),
	        	offset_x = offsetX+'px',
				offset_y = offsetY+'px',
				cartDiv = $('<div data-dest = "'+modle+'"></div>')
	                .appendTo(playBox)
	                .css('position','absolute')
	                .css('top',offset_y)
	                .css('left',offset_x);
	        _this.flyShowInfo(cartDiv);
	        cartDiv.remove();
	    },
	    //飞动效果
		flyShowInfo:function($el){
			var $ = jQuery,
			_this = this;
			var $this = $($el),
			type  = $this.data('dest'),
			$dest = $(_this.sideT).find('.js-dest-'+type),
			$sprite= $('<div class="yk-toolbar-sprite"><span style="margin-top: 0" class="yk-toolbar-group-item-icon sprite-icon-'+type+'"></span></div>').appendTo($dest),
			OffsetThis = $this.offset(),
			OffsetSprite = $sprite.offset();
			var $thisGroup = $dest.parent();
	        var flyDistance = 1000,
	            timeFly = 1000,
	            breatheDelay = 1000,
	            delay = 0;
	        var cloneItem = null;
	
	        if($(".yk-toolbar-group-panel:visible").length !== 0){
	        	delay = 200;
	        }else{
	        	delay = 0;
	        }
	        var w = 22,h = 22;
	        if(type == 'cart'){
	        	w = 32;
	        	h = 32;
	        }
			$sprite.delay(delay).css({
				top: 12 + OffsetThis.top - OffsetSprite.top, 
				left: 12 + OffsetThis.left - OffsetSprite.left 
			}).animate({
				top: 9,
				left: 14,
				width: w,
				height: h
			},timeFly,function(){
				$dest.parent().find('.yk-toolbar-group-item-clone') && $dest.parent().find('.yk-toolbar-group-item-clone').remove();
				cloneItem = $dest.clone().addClass('yk-toolbar-group-item-clone');
				$(cloneItem).appendTo($dest.parent());
				$sprite.animate({
					opacity : 0
				},breatheDelay,function(){
					$sprite.remove();
				});
				$(cloneItem).animate({opacity : 0},breatheDelay,function(){
					$(cloneItem).remove();
				});
				//弹出气泡
				if(type == 'subscription'){
					setTimeout(function(){
						_this.showTips(type);
					},600);
				}
				}
			);
		},
		
		//一级面板展示和隐藏
		slideToggle: function(self){
			var $ = jQuery;
			var _this = self;
			var ClassOpen = _this.classOpen,
			ClassHover = _this.classHover,
			ClassFake = 'yk-toolbar-fake-bak',
			YkToolbarPanel = 'yk-toolbar-group-panel';
			var $thisGroup = $(this).parent();
			var $thisPanel = $thisGroup.find("." + YkToolbarPanel);
			var $groups = $(".yk-toolbar-group");
			var $groupItems = $(".yk-toolbar .yk-toolbar-group-item");
			var $mask = $thisGroup.find("iframe.mask");
			var $hint;

			if($thisGroup.hasClass(ClassOpen)){
				$thisGroup.removeClass(ClassOpen);
				_this.$curOpenGroup = null;
				$hint = $(".hint-tmp");

				if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE6.0"){
					$thisPanel.css("display","none");
					$mask.css("display","none").css("right","-330px");
					if($hint.length != 0){
						$hint.removeClass("hint-tmp").show();
					}
				}else{
					$thisPanel.animate({
						right:0,
						opacity:0
					},{
						duration: +200,
						specialEasing:{
							top:"easeOutCubic",
							left:"linear"
						},
						done:function(){
							$("."+ClassFake).remove();
							$groupItems.css("position","");
							$thisPanel.css("z-index",10);
							$thisPanel.css("display","none");
							if(navigator.userAgent.indexOf("MSIE")>0){
								$groups.css("z-index","20");
							}
						}
					});
					$mask.animate({
						right : -330
					},200,function(){
						$mask.css("display","none");
					});
					if($hint.length != 0){
						$hint.removeClass("hint-tmp").show();
					}
				}
			}else{
				$("."+ClassFake).remove();
				$hint = $(".yk-toolbar-group-hint:visible");
				if(_this.$curOpenGroup){
					$(_this.$curOpenGroup).removeClass(ClassOpen);
				}

				$thisGroup.addClass(ClassOpen);
				$thisGroup.removeClass(ClassHover);

				if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE6.0"){
					$thisPanel.css("display","block");
					$thisPanel.css("height",window.screen.availHeight +"px");
					$(_this.$curOpenGroup).find("." + YkToolbarPanel).css("display","none");
					$(_this.$curOpenGroup).find("iframe.mask").css("display","none").css("right","-330px");
					$mask.css("display","block").css("right","50px");
					_this.$curOpenGroup = $thisGroup;
					if($hint.length != 0){
						$hint.addClass("hint-tmp").hide();
					}
				}else{
					$('<div class=' + ClassFake + '></div>').appendTo($thisGroup);
					$groupItems.css("position","relative");

					$(_this.$curOpenGroup).find("." + YkToolbarPanel).css("display","none");
					$(_this.$curOpenGroup).find("iframe.mask").css("display","none").css("right","-330px");
					if(navigator.userAgent.indexOf("MSIE")>0){
						$groups.css("z-index","50");
						$thisGroup.css("z-index","20");
					}
					if(_this.$curOpenGroup){
						_this.$curOpenGroup = $thisGroup;
						$thisPanel.css({"display":"block","right":"50px","opacity":1});
						$mask.css("display","block").css("right","50px");
					}else{
						_this.$curOpenGroup = $thisGroup;
						$thisPanel.css({
							right:0,
							opacity:0,
							display:"block"
						}).animate({
							right:50,
							opacity:1
							},{
								duration: +200,
								specialEasing:{
								top:"easeOutCubic",
								right:"linear"
							},
							done:function(){
								if($hint.length != 0){
									$hint.addClass("hint-tmp").hide();
								}
							}
						});
						$mask.css({
							display : "block"
						}).animate({
							right : 50
						},200)
					}
				}
			}
		},

		//二级面板展开收起动画
		slideToggleTwoPanels: function(onepanelid , twopanelid , action){
			if(action == 'go'){
				if(jQuery("#"+onepanelid)){
	        		jQuery("#"+onepanelid).animate({
							right:330
						},{
							duration: +200,
							specialEasing:{
								top:"easeOutCubic",
								right:"linear"
							},
							done:function(){
								jQuery(this).css("display","none");
							}
						});
	        	}
				if(jQuery('#'+twopanelid)){
					jQuery('#'+twopanelid).css({
						display:"block"
					}).animate({
						right:0
					},{
						duration: +200,
						specialEasing:{
							top:"easeOutCubic",
							right:"linear"
						},
						done:function(){
			
						}
					});
				}
			}else if(action == 'goback'){
				if(jQuery("#"+onepanelid)){
					jQuery("#"+onepanelid).css({
        				display:"block"
					}).animate({
						right:0
					},{
						duration: +200,
						specialEasing:{
							top:"easeOutCubic",
							right:"linear"
						},
						done:function(){
						}
					});
        		}
        		if(jQuery('#'+twopanelid)){
        			jQuery('#'+twopanelid).animate({
						right:-330
					},{
						duration: +200,
						specialEasing:{
							top:"easeOutCubic",
							right:"linear"
						},
						done:function(){
							jQuery(this).css("display","none");
						}
					});
        		}
			}
		},
		
		// 二维码展开事件
		qrcodePanelShow: function(e){
			var $ = jQuery;
			var _this = e;
			var Sys = _this._getUA();
			var $code = $(this).parent(),
				$container = $code.find(".ykcode-container"),
				$cover = $code.find(".ykcode-cover"),
				$cover_img = $cover.find(".ykcode-cover-img");
			var timer = 300;
			$(this).hide();
			$container.css('display','block');
			// 低版本IE无动画
			if (Sys.ie && parseInt(Sys.ie) < 10) {
				$code.css({
					height: "330px",
					width: "274px",
					zIndex: "100"
				});
				return;
			}
			$cover.show();
			$code.on("hover", function() {
				return false;
			}).css({
				width: "32px",
				height: "32px",
				zIndex: "100",
				overflow: "hidden"
			}).animate({
				width: "330px",
				height: "274px"
			}, timer, function() {
				$cover_img.css({
					"transition": "transform 0.35s",
					"-webkit-transition": "-webkit-transform 0.35s",
					"-moz-transition": "-moz-transform 0.35s",
					"-o-transition": "-o-transform 0.35s",
					"-ms-transition": "-ms-transform 0.35s",
					"transform": "rotate(-55deg)",
					"-webkit-transform": "rotate(-55deg)",
					"-moz-transform": "rotate(-55deg)",
					"-o-transform": "rotate(-55deg)",
					"-ms-transform": "rotate(-55deg)"
				});
				$cover.delay(timer + 350).hide(1);
			});
		},

		// 二维码收起事件
		qrcodePanelClose: function(e){
			var $ = jQuery;
			var _this = e;
			var Sys = _this._getUA();
			var $code = $(this).parent().parent(),
				$container = $(this).parent(),
				$flag = $code.find(".ykcode-flag"),
				$cover = $code.find(".ykcode-cover"),
				$cover_img = $cover.find(".ykcode-cover-img");
			var timer = 300;
			// 低版本IE无动画
			if (Sys.ie && parseInt(Sys.ie) < 10) {
				$container.hide();
				$flag.show();
				$code.css({
					height: "auto",
					width: "auto",
					overflow: ""
				});
				return;
			}

			$cover.show();
			$cover_img.css("display");
			$cover_img.css({
				"transition": "transform 0.25s",
				"-webkit-transition": "-webkit-transform 0.25s",
				"-moz-transition": "-moz-transform 0.25s",
				"-o-transition": "-o-transform 0.25s",
				"-ms-transition": "-ms-transform 0.25s",
				"transform": "rotate(0deg)",
				"-webkit-transform": "rotate(0deg)",
				"-moz-transform": "rotate(0deg)",
				"-o-transform": "rotate(0deg)",
				"-ms-transform": "rotate(0deg)"
			});
			$code.delay(230).animate({
				width: "32px",
				height: "32px"
			}, timer, function() {
				$container.hide();
				$cover.hide();
				$flag.show();
			});
		},
		
		// 成功领取奖励
		userReceiveAward: function(e){
			var $ = jQuery;
			var _this = e;
			var reward = $(this).find("span.reward-entry"),
			yk_integral = $(".yk-integral");
			var status = $("<span class='task-reward-status'>领取成功</span>"),
				meta = $("<div class='task-reward-meta'></div>");
			var ykInteOffset = yk_integral.offset();
	
			$.each(reward, function(i) {
				$(reward[i]).appendTo(meta);
			});
	
			$(this).fadeOut("fast", function() {
				$(this).html("");
				$(this).addClass("u-task-meta-reward");
				$(this).append(status).append(meta);
				$(this).removeClass("u-task-meta-done");
				$(this).fadeIn(function() {
					var integral = $(this).find(".reward-entry-integral");
					if (integral.length !== 0) {
						var fakeInte = integral.clone().addClass("reward-integral-fake").appendTo($("body"));
						var inteOffet = integral.offset();
	
						var fakeCount = parseInt(fakeInte.html()),
							count = "";
	
						fakeInte.css({
							position: "absolute",
							top: inteOffet.top,
							left: inteOffet.left,
							display: "none"
						}).delay(1700).show(1).animate({
							top: ykInteOffset.top,
							left: ykInteOffset.left
						}, 800, function() {
							var finance = $(".yk-toolbar-user-finance p");
							var sprite = $("<span class='integral-hint'>+" + fakeCount + "</span>");
							finance.css("position", "relative").append(sprite);
							sprite.animate({
								top: "-14px",
								opacity: 1
							}, 300, function() {
								sprite.delay(1500).animate({
									top: "-21px",
									opacity: 0
								}, 300, function() {
									sprite.remove();
								});
							});
							count = parseInt(yk_integral.html().split(",").join("")) + fakeCount + "";
							yk_integral.html(_this._formatCount(count,3,","));
							fakeInte.remove();
						});
					}
					$(this).delay(1700).slideUp(300,function(){
						$(this).remove();
						_this.getUserTaskList();
					});
				});
			});
		},
		
		// 窗口宽度改变toolbar显示/隐藏事件listener
		RESIZEAgent: function(){
			var $ = jQuery;
			var _this = this;
			var $toolbar = $(_this.sideT);
			var fn = function(){
				var w = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth, 
	        		r = 1040,
	        		hoverline = 990,
	        		right = -50;
	        	var timer = null;
	        	var isVisible = false;
	        	var openGroup = $toolbar.find('.yk-toolbar-group-open');

	        	if(!_this.scrollBarWidth){
	        		_this.scrollBarWidth = _this.getScrollWidth();
	        	}
	        	if(navigator.appName == "Microsoft Internet Explorer"){
	        		var version = navigator.appVersion .split(";")[1].replace(/[ ]/g,"");
	        		if(parseInt(version.charAt(4)) > 6 && parseInt(version.charAt(4)) < 10){
	        			r = r + 12;
	        			hoverline =  hoverline + 12;
	        		}else if(parseInt(version.charAt(4)) === 1){
	        			r = r + 12 + _this.scrollBarWidth;
	        			hoverline = hoverline + 12 + _this.scrollBarWidth;
	        		}
	        	}else{
	        		r = r + 12 + _this.scrollBarWidth;
	        		hoverline = hoverline + 12 + _this.scrollBarWidth;
	        	}
	        	if(w < r && openGroup.length === 0){
	        		if(w > hoverline){
	            		right = w-hoverline < 50 ? -(50 - (w-hoverline)) : -50;
	            		$toolbar.css("right",right + "px");
	            		$toolbar.unbind("mouseenter").bind("mouseenter",function(){
	            			if($toolbar.find('.yk-toolbar-group-open').length === 0){
	            				if(timer){
	            					clearTimeout(timer);
	            				}
	            				timer = setTimeout(function(){
	            					$toolbar.css("right","0");
	            				},300);
	            			}
	            		})
	            		.unbind("mouseout").bind("mouseout",function(){
	            			if($toolbar.find('.yk-toolbar-group-open').length === 0){
	            				if(timer){
	            					clearTimeout(timer);
	            				}
	            				timer = setTimeout(function(){
	            					w = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth;
	            					if(w < hoverline){
	            						$toolbar.css("right","-55px");
	            					}else{
	            						$toolbar.css("right",right + "px");
	            					}
	            				},300);
	            			}
	            		});
	            	}else{
	            		$toolbar.unbind("mouseenter").bind("mouseenter",function(){})
	            		.unbind("mouseout").bind("mouseout",function(){
	            			$toolbar.css("right","-50px");
	            		});
						$toolbar.css("right","-50px");
	            	}
	        	}else if(w < r && openGroup.length !== 0){	
	        		$toolbar.unbind("mouseenter").bind("mouseenter",function(){})
	        		.unbind("mouseout").bind("mouseout",function(){
	        			if($toolbar.find('.yk-toolbar-group-open').length === 0){
	        				if(timer){
	            					clearTimeout(timer);
	            				}
	            				timer = setTimeout(function(){
	            					$toolbar.css("right","-50px");
	            				},300);
	            			}
	        		});
	        	}else{
	        		$toolbar.unbind("mouseenter").unbind("mouseout");
	        		$toolbar.css("right","0");
	        	}
	    	};
	    	if(window.addEventListener){
	        	window.addEventListener('resize', function(){ fn(); });
	    	}else if(window.attachEvent){
	        	window.attachEvent('onresize', function(){ fn(); });
	    	}
	    	fn();
		},

		onResizeEvent: function(){		
			//横向位置
			var windowWidth = this.getWindowWidth();
			var toolbarRight = 0;
			if(windowWidth < 1255) {
				if(windowWidth > 1110) {
					toolbarRight = (windowWidth - 970)/2-65;
				} else {
					toolbarRight = 15;
				}
			} else {
				if(windowWidth > 1330) {
					toolbarRight = (windowWidth - 1190)/2-65;
				} else {
					toolbarRight = 15;
				}
			} 
			$(this.toolbar.service).style.right = toolbarRight + 'px';
			$(this.toolbar.util).style.right = toolbarRight + 'px';

			if(this.light.isshow == true){
				$(this.light.dark).style.right = toolbarRight + 'px';
			}
		},
		
		getUID: function(){
			if(!islogin()){ return 0; }
			var ckie = Nova.Cookie.get('yktk');
			var uid = 0;
			if(ckie){
				try{
					var u_info = decode64(decodeURIComponent(ckie).split('|')[3]);
					if(u_info.indexOf(',') > -1 && u_info.indexOf('nn:') > -1 && u_info.indexOf('id:') > -1){
						uid = u_info.split(',')[0].split(':')[1];
					}
				}catch(e){ }
			}
			
			return parseInt(uid);
		},

		//获取滚动条宽度
		getScrollWidth: function(){
			var __scrollBarWidth;
	        var scrollBarHelper = document.createElement("div");

	        scrollBarHelper.style.cssText = "overflow:scroll;width:100px;height:100px;"; 
	        document.body.appendChild(scrollBarHelper);
	        if (scrollBarHelper) {
	            __scrollBarWidth = scrollBarHelper.offsetWidth - scrollBarHelper.clientWidth
	        }
	        document.body.removeChild(scrollBarHelper);
	        return __scrollBarWidth;
	       
	    },

		//获取可视宽度
		getWindowWidth:function(){
			return document.documentElement.clientWidth || document.body.clientWidth;//不包含滚动条 
		},
		//获取可视高度
		getWindowHeight:function(){
			return document.documentElement.clientHeight || document.body.clientHeight;
		},
		//获取滚动Top
		getScrollTop:function(){
			return document.documentElement.scrollTop || document.body.scrollTop;
		},
		
		_addHover: function(obj , cname){
			if(!obj.className){
				obj.className = cname;
			}else if(obj.className.indexOf(cname) == -1){
				obj.className += ' '+cname; 
			}
			return this;
		},
		_removeHover: function(obj , cname){
			if(obj.className && obj.className.indexOf(' '+cname) != -1){
				obj.className = obj.className.replace(' '+cname, '');
			}else if(obj.className && obj.className.indexOf(cname) != -1){
				obj.className = obj.className.replace(cname, '');
			}
			return this;
		},
		_addExpand: function(idname){
			if($(idname).className.indexOf(this.classOpen) == -1){
				$(idname).className += ' yk-toolbar-group-open';
			}
			return this;
		},
		_removeExpand: function(idname){
			if($(idname).className.indexOf(this.classOpen) != -1){
				$(idname).className = $(idname).className.replace(/ yk-toolbar-group-open/, '');
			}		
			return this;
		},
		_addEvent: function(dom, eventname, func){
			if(window.addEventListener){
				if(eventname == 'mouseenter' || eventname == 'mouseleave'){
					function fn(e){
						var a = e.currentTarget, b = e.relatedTarget;
						if(!elContains(a, b) && a!=b){
							func.call(e.currentTarget,e);
						}	
					}
					function elContains(a, b){
						try{ return a.contains ? a != b && a.contains(b) : !!(a.compareDocumentPosition(b) & 16); }catch(e){}
					}
					if(eventname == 'mouseenter'){
						dom.addEventListener('mouseover', fn, false);
					}else{
						dom.addEventListener('mouseout', fn, false);
					}
				}else{
					dom.addEventListener(eventname, func, false);
				}
			}else if(window.attachEvent){
				dom.attachEvent('on' + eventname, func);
			}
		},
		_delEvent: function(dom, eventname, func){
			if(window.addEventListener){
				dom.removeEventListener(eventname, func, true);
			}else if(window.attachEvent){
				dom.detachEvent("on"+ eventname, func);
			}
		},
		
		_getWatchLevelIcon: function(watchlevel){
			var watchLevelIcon = 0;
			if(watchlevel > 40){
				watchLevelIcon = 4;
			}else if(watchlevel > 30 && watchlevel <= 40){
				watchLevelIcon = 3;
			}else if(watchlevel > 20 && watchlevel <= 30){
				watchLevelIcon = 2;
			}else if(watchlevel > 10 && watchlevel <= 20){
				watchLevelIcon = 1;
			}else{
				watchLevelIcon = 0;
			}
			return watchLevelIcon;
		},

		_getElementsByName: function(tag, name){
			var returns = document.getElementsByName(name);
			if(returns.length > 0) return returns;
			returns = [];
			var e = document.getElementsByTagName(tag);
			for(var i = 0; i < e.length; i++){
				if(e[i].getAttribute("name") == name){
					returns[returns.length] = e[i];
				}
			}
			return returns;
		},
		
		_sidetoolLoadJS: function(url, callback, cleanNode){
			var script = document.createElement('script');
			var head = document.getElementsByTagName('head')[0];
			script.type = "text/javascript";
			script.src = url;
			script.onload = script.onreadystatechange = function (){
				if(!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete'){
					if(callback && typeof(callback) == 'function'){
						callback();
					}
					if(cleanNode){
						head.removeChild(script);
					}
				}
			};
			head.appendChild(script);
		},
			
		_cutStr: function(str , len , truncation){
			if(!str){
                return '';
            }
			var str_length = SideTool._strLen(str);
			if(str_length <= len){
				return  str;
			}else{
				var str_cur_len = 0;
				var str_len = 0;
				str_cut = String();
				str_len = str.length;
				for(var i = 0; i < str_len; i++){
					str_cur_len++;
					a = str.charAt(i);
					if(escape(a).length > 4){
						//中文字符的长度经编码之后大于4  
						str_cur_len++;
					}
					if(str_cur_len>len){
						if(truncation){
							str_cut = str_cut.concat(truncation);
						}
						return str_cut;  
					}
					str_cut = str_cut.concat(a);
				}
			}
		},
		_strLen: function(str){
			if(!str){
                return 0;
            }
			var str_length = 0;  
			var str_len = 0;   
			str_len = str.length;  
			for(var i = 0; i < str_len; i++){  
				str_length++;  
				a = str.charAt(i);  
				if(escape(a).length > 4)  {  
					//中文字符的长度经编码之后大于4  
					str_length++;  
				}   
			}  
			return  str_length;  		 
		},
		
		_formatDate: function(fdate){
			var fDate = new Date(Date.parse(fdate.replace(/-/g,"/"))); 	
			var ftime = fDate.valueOf();
			var cDate = new Date();
			var ctime = cDate.valueOf();
			var diff = ctime - ftime;
			var cyear = cDate.getFullYear();
			var cmonth = cDate.getMonth() + 1;
			var cday = cDate.getDate();
			var cdate0 = cyear+'/'+cmonth+'/'+cday+' 00:00:00';
			var cDate0 = new Date(cdate0);
			var ctime0 = cDate0.valueOf();
			var fhours = fDate.getHours();
			if(fhours < 10 && fhours.toString().length < 2){
				fhours = '0'+fhours;
			}
			var fminutes = fDate.getMinutes();
			if(fminutes < 10 && fminutes.toString().length < 2){
				fminutes ='0'+fminutes;
			}

			if(diff > 0 &&diff < 60000){
				fdate = '刚刚';
			}else if(diff >= 60000 && diff <= 3600000){
				fdate = (Math.floor(diff/60000)) + '分钟前';
			}else if(diff > 3600000 && ftime > ctime0){
				fdate = (Math.floor(diff/3600000)) + '小时前';
			}else if(ftime < ctime0 && ftime >= (ctime0-3600000*24)){
				fdate = '昨天'+ fhours + ':' + fminutes;
			}else if(ftime < (ctime0-3600000*24) && ftime >= (ctime0-3600000*24*2)){
				fdate = '前天'+ fhours + ':' + fminutes;
			}else if(ftime < (ctime0-3600000*24*2) && ftime >= (ctime0-3600000*24*7)){
				fdate = (Math.floor(diff/(3600000*24)))	+ '天前';
			}else if(cDate.getFullYear() == fDate.getFullYear()){
				fdate = fdate.substr(5,5);
			}else{
				fdate = fdate.substr(0,10);
			}
			return fdate;
		},
		
		_formatCount: function(str, step, sep) {
			var length = str.length,
				floor = parseInt(length / step),
				mod = str.length % step;
			var arr = [],
				result = "";
			if(mod != 0){
				arr.push(str.substring(0,mod));
			}
			for(var i = 0;i<floor;i++){
				arr.push(str.substr(mod + step*i,step));
			}
			result = arr.join(sep);

			return result;
		},

        _addScript: function(src){
            if (typeof arguments[0] != 'string'){ return; }
            var head = document.getElementsByTagName('HEAD')[0];
            var script = document.createElement('SCRIPT');
            script.type = 'text/javascript';
            script.src = src;
            head.appendChild(script);
        },

        _getUA: function() {
    		var Sys = {};
    		var ua = navigator.userAgent.toLowerCase();
    		var s;
    		(s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] :
    			(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
    			(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
    			(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
    			(s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
    			(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
    		return Sys;
    	},
        
        //抽奖
        lottery:function(){
			if(!window.lottery_open_sidetool || window.lottery_open_sidetool == '') {
				return false;
			}
			if(!window.lottery_sidetool_start || window.lottery_sidetool_start == '') {
				return false;
			}
			if(!window.lottery_sidetool_end || window.lottery_sidetool_end == '') {
				return false;
			}
			if(!window.lottery_sidetool_type || window.lottery_sidetool_type == '') {
				return false;
			}
			if(!window.lottery_sidetool_background || window.lottery_sidetool_background == '') {
				return false;
			}
			if(window.lottery_sidetool_type == 1 && (!window.lottery_sidetool_url || window.lottery_sidetool_url == '')) {
				return false;
			}
			if(window.lottery_sidetool_type == 2 && (!window.lottery_sidetool_function || window.lottery_sidetool_function == '')) {
				return false;
			}
			var lotterystart = window.lottery_sidetool_start; //活动开始时间
			var lotteryend = window.lottery_sidetool_end; //活动结束时间 
			var lotterybackground = window.lottery_sidetool_background; //抽奖背景图片
			var lotterytype = window.lottery_sidetool_type; //1 跳转 ， 2 弹层
			var lotteryurl = ''; //跳转地址
			if(lotterytype == 1){
				lotteryurl = window.lottery_sidetool_url;
			}
			var lotteryfunction = ''; //抽奖弹层方法
			if(lotterytype == 2){
				lotteryfunction = window.lottery_sidetool_function;
			}
			
			var startObj = lotterystart.split('-');
			var endObj = lotteryend.split('-');
			var starttime = (new Date(startObj[0],parseInt(startObj[1])-1,startObj[2],0,0,0)).valueOf();
			var endtime = (new Date(endObj[0],parseInt(endObj[1])-1,endObj[2],23,59,59)).valueOf();
			var nowDate = new Date();
			var nowtime = nowDate.valueOf(); 
			var nowDay = nowDate.getDate().toString();
			var nowMonth = nowDate.getMonth().toString();
			var nowYear = nowDate.getFullYear().toString();
			var clolseCookieValueNow = nowYear + nowMonth + nowDay;
			
			var lotteryToolbarInner = '';
			if(nowtime > starttime && nowtime < endtime){
				lotteryToolbarInner = '<div id="lotteryYK" class="yk-toolbar-group yk-toolbar-group-draw"><div style="width: 50px;height: 100px;display:none;" class="ykDraw-mark" '+
									  'id="lotteryRight"><a style="position: relative;display:block;height: 85px;" ';
				if(lotterytype == 1){
					lotteryToolbarInner += 'href="'+lotteryurl+'" target="_blank" onclick="Log.log(1, \'tp=1&cp=4009804&cpp=1000217\');">';
				}else if(lotterytype == 2){
					lotteryToolbarInner += 'onclick="'+lotteryfunction+'Log.log(1, \'tp=1&cp=4009804&cpp=1000217\');">';//lottery({id:'+lottery_id+'});
				}
				lotteryToolbarInner += 	'<span style="background: url('+lotterybackground+') no-repeat;width: 100%;height: 100%;background-position: 0 0;z-index: 1;display: block;margin: 0 auto;" '+
										'class="ykDraw-m-item ykDraw-m-item-bag"></span></a></div><a id="lotteryLeft" ';
				if(lotterytype == 1){
					lotteryToolbarInner += 'href="'+lotteryurl+'" target="_blank" onclick="Log.log(1, \'tp=1&cp=4009804&cpp=1000217\');">';
				}else if(lotterytype == 2){
					lotteryToolbarInner += 'onclick="'+lotteryfunction+'Log.log(1, \'tp=1&cp=4009804&cpp=1000217\');">';//lottery({id:'+lottery_id+'})
				}
				lotteryToolbarInner += '<div class="ykDraw-panel ykDraw-panel-reward" style="position: absolute;right: 0;top: -32px;background: url('+lotterybackground+') no-repeat;width: 120px;height: 160px;background-position: -62px -17px;">'+
									   '<span id="lotteryHand" style="background: url('+lotterybackground+') no-repeat;background-position: 0 -85px;position: absolute;width: 20px;height: 20px;top: -5px;left: 0px;z-index: 1;cursor: pointer;" '+
									   'class="ykDraw-p-itemykDraw-p-item-close"></span></div></a></div>';
				$('lotteryToolbar').innerHTML = lotteryToolbarInner;
				
				if(clolseCookieValueNow == Nova.Cookie.get('lottery_day')){
					$('lotteryLeft').style.display = 'none';
					$('lotteryRight').style.display = 'block';
				}
				if($('lotteryHand')){
					$('lotteryHand').onclick = function(event){
						$('lotteryLeft').style.display = 'none';
						$('lotteryRight').style.display = 'block';
						Log.log(1,"tp=1&cp=4009622&cpp=1000217");
						var myDate = new Date();
						var myDay = myDate.getDate().toString();
						var myMonth = myDate.getMonth().toString();
						var myYear = myDate.getFullYear().toString();
						var clolseCookieValueMy = myYear + myMonth + myDay;
						Nova.Cookie.set('lottery_day', clolseCookieValueMy, 1);
						//阻止冒泡
						var e =  event || window.event;
						if(e.stopPropagation) e.stopPropagation(); 
						return false;
					};
				}
			}
		},
		
		//购物车统计布点
		_eshopStatisticsClothCoad: function(type , type_code , ext , videoid , pkgid ,  plugindata , target_url){
			var winTypeOBJ = {1:103,2:101,3:100,4:104,5:102};
			var winType = 200;
			var playmode = window.playmode || '';
			if(playmode && typeof(winTypeOBJ[playmode]) != 'undefined'){
				winType = winTypeOBJ[playmode];
			}
			var sid = window.logPvid || '';
			var showid = window.showid || '';
			var vid = videoid || '';
			var video_curtime = 0;
			var PkgId = pkgid || '';
			var fullscreen = 0;
			var ref_url = encodeURIComponent(window.location.href);
			var subtype = 1;
			var plugintype = 'rim';
			if(ext){
				ext = 'rim_num='+ext;
				ext = encodeURIComponent(ext);
			}else{
				ext = '';
			}
			if(target_url){
				target_url = encodeURIComponent(target_url);
			}
			
			var sendUrl = 'http://p.l.youku.com/interact?vvid='+sid+'&sid='+showid+'&vid='+vid+'&cpt='+video_curtime+'&pid='+PkgId+'&ptype='+plugintype+'&pdata='+plugindata+'&type='+type+'&tcode='+type_code+'&full='+fullscreen+'&wintype='+winType+'&turl='+target_url+'&rurl='+ref_url+'&ext='+ext+'&stype='+subtype;
			
			var img = new Image();
			img.src = sendUrl;
		},
        
		//原来的扫一扫弹层方法，不确定去了以后是否还会加上，暂时保留
		scanQrcode:function(){
			var scanqrcode =  this.scanqrcode;
			if(scanqrcode){
				Event.observe(scanqrcode,'click', function(event){
					event.preventDefault&&event.preventDefault();
					var scanQrcodeWin = null;
					var background    = scanqrcode.select('.sidebar-overlay')[0];
					background.addClassName('sidebar-on');
					var url = location.href;
					var info = PlayerInfo();
					var time = 0;
					if(info && info['time']){
						time = parseInt(info['time']);
					}
					var prefix = url.indexOf('?') == -1 ? '?' : '&';
					url += prefix + 'firsttime=' + time;
					var statUrl = '/v_sideToolShare/?url='+encodeURIComponent(url);
					if(!scanQrcodeWin){
						scanQrcodeWin = new Qwindow({
							title:		'扫一扫',
							size:		{width:500, height:360},
							content:	{type: 'iframe', value: statUrl},
							onhide:     function(){
								background.removeClassName('sidebar-on');
							} 
						});	
					}
					Element.extend(scanQrcodeWin.getElements().wintitle).setStyle({border:'none'});
					scanQrcodeWin.show();
					return false;	
				})
			
			}
		}
	};

/**
 * 对外接口
 */

window['SideTool'] = SideTool;

window.nova_init_hook_toobarinit = function(){SideTool.init();}; 
})();
