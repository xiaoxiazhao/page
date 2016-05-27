/**************************************************
    Recommended For Me Modules v4.0
***************************************************/
var MYYOUKUTOOL = {};

MYYOUKUTOOL.namespace = function(str) {
    var arr = str.split("."), o = MYYOUKUTOOL;
    for (i = (arr[0] == "MYYOUKUTOOL") ? 1 : 0; i < arr.length; i++) {
        o[arr[i]] = o[arr[i]] || {};
        o = o[arr[i]];
    }
};

MYYOUKUTOOL.namespace("Dom");

MYYOUKUTOOL.Dom.getElementsByClassName = function(className, element) {
    var children = (element || document).getElementsByTagName('*');
    var elements = [];
    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        var classNames = child.className.split(' ');
        for (var j = 0; j < classNames.length; j++) {
            if (classNames[j] == className) {
                elements.push(child);
                break;
            }
        }
    }
    return elements;
};

MYYOUKUTOOL.Dom.addClass = function(node, str) {
    if (!new RegExp("(^|\\s+)" + str).test(node.className)) {
        node.className = node.className + " " + str;
    }
};

MYYOUKUTOOL.Dom.removeClass = function(node, str) {
    node.className = node.className.replace(new RegExp("(^|\\s+)" + str), " ");
};

MYYOUKUTOOL.namespace("Event");

MYYOUKUTOOL.Event.on = function(node, eventType, handler, scope) {
    node = typeof node == "string" ? document.getElementById(node) : node;
    scope = scope || node;
    if (document.all) {
        node.attachEvent("on" + eventType, function() {
            handler.apply(scope, arguments) 
        });
    } else {
        node.addEventListener(eventType, function() {
            handler.apply(scope, arguments) 
        }, false);
    }
};

function MyYoukuTab(config) {
    this._root = config.root;
    this._currentClass = config.currentClass;
    var trigger = config.trigger || "click";
    this._handler = config.handler;
    var autoPlay = config.autoPlay;
    this.timerTabs = null;
    var playTime = config.playTime || 3000;
    this._tabMenus = MYYOUKUTOOL.Dom.getElementsByClassName("my-tab", this._root);
    this._tabContents = MYYOUKUTOOL.Dom.getElementsByClassName("my-container", this._root);
    this.currentIndex = 0;
    var _this = this;
    if (autoPlay) {
        setInterval(function() {
            This._autoHandler()
        }, playTime);
    }
    for (var i = 0; i < this._tabMenus.length; i++) {
        this._tabMenus[i]._index = i;
        MYYOUKUTOOL.Event.on(this._tabMenus[i], trigger, function() {
            var index = this._index;
            _this.timerTabs = setTimeout(function() {
                _this.showItem(index);
            }, 200);
        });
        MYYOUKUTOOL.Event.on(this._tabMenus[i], 'mouseout', function() {
            var index = this._index;
            clearTimeout(_this.timerTabs);
        });
    }
}

MyYoukuTab.prototype = {
    showItem : function(n) {

        if (!MYYOUKU.LOGINSTAT) {
            if (n == 0) {} else if ( n == 1) {} else if ( n == 2) {
                MYYOUKU.domCollect.innerHTML = '<div class="my-null""><span>收藏精彩视频，请<a href="http://www.youku.com/user/login/?cburl=' + encodeURI('http://www.youku.com') + '" target="_blank">登录</a></span></div>';
            } else if (n == 3) {
                MYYOUKU.domSubscribe.innerHTML = '<div class="my-null""><span>订阅精彩视频，请<a href="http://www.youku.com/user/login/?cburl=' + encodeURI('http://www.youku.com') + '" target="_blank">登录</a></span></div>';
            }
        }

        for (var i = 0; i < this._tabContents.length; i++) {
            this._tabContents[i].style.display = "none";
        }
        this._tabContents[n].style.display = "block";
        if (this._currentClass) {
            var currentMenu = MYYOUKUTOOL.Dom.getElementsByClassName("current", this._root)[0];
            if (currentMenu) {
                MYYOUKUTOOL.Dom.removeClass(currentMenu, this._currentClass);
            }
        }
        MYYOUKUTOOL.Dom.addClass(this._tabMenus[n], this._currentClass);
        if (this._handler) {
            this._handler(n);
        }
        this.currentIndex = this._index;
        MYYOUKU.show(n);
    },
    _autoHandler : function() {
        this.currentIndex++;
        if (this.currentIndex >= this._tabMenus.length) {
            this.currentIndex = 0;
        }
        this.showItem(this.currentIndex);
    }
};

var MYYOUKU = {

    // Config
    MAXHEIGHT : 456,
    ANONYMOUSMAXHEIGHT : 246,
    TRYJSONTIMES : 3,
    TRYDATATIMES : 3,
    SHOWNUMBER : 10,
    ANONYMOUSRECOMMENDNUMBER : 5,
    ANONYMOUSREMEMBERNUMBER : 5,
    CURRENTRECORDSTATUS : 0,
    CURRENTRECOMMENDSTATUS : 0,
    CURRENTCOLLECTSTATUS : 0,
    CURRENTPICKSTATUS : 0,
    CURRENTDATASTATUS : 0,
    CURRENTSUBSCRIBESTATUS : 0,
    CURRENTMEMBRTATUS : 0,
    CURRENTSTAT : 0,
    TOKEN : 0,
    RECOMMENDCHANCE : 5,
    TITLELENGTH : 24,
    CURRENTINDEX : 0,
    LOGINSTAT : false,
    RANDOMARRAY : [],
    REQ_ID : '',

    UserInfo : null,

    // Timer
    timer : null,
    timerData : null,
    timerAnonymous : null,
    timerRecords : null,
    timerCollect : null,
    timerPick : null,
    timerSubscribe : null,
    timerMember : null,
    timerTabCheck : null,
    timeSpan : 800,

    // Data
    dataList : [],
    dataRecommend : [],
    dataShow : [],
    dataShowInsert : [],
    dataRecords : [],
    dataSubscribe : [],
    dataCollect : [],
    dataMember : [],
    dataPick : [],
    dataAnonymous : [],

    // Dom
    dom : null,
    domRecommend : null,
    domSubscribe : null,
    domCollect : null,
    domRecords : null,
    domPick : null,
    domMember : null,
    domTabs : null,
    domMemberV : null,

    // Flag
    flagRecommend : false,
    flagRecords : false,
    flagCollect : false,
    flagSubscribe : false,
    flagPick : false,
    flagMember : false,

    // Cookies
    cookieYsuid : '',
    cookieUid : '',

    // Lock
    lockVideo : true,
    lockSubscribe : true,
    lockCollect : true,
    lockLogin : true,
    lockData : true,
    lockRecords : true,
    lockPick : true,
    lockRecommend : true,
    lockMember : true,
    lockAnonymousRecommend : true,

    // Data interface
    getRecordJson : 'http://nc.youku.com/index_cookielist?s=jsonp&xthumb=true&callback=MYYOUKU.getRecordsData&timestamp=',
    //getRecommendJson : 'http://nc.youku.com/index_videocommend?apptype=1&xthumb=true&callback=MYYOUKU.getRecommendData&pz=20&timestamp=',
    getRecommendJson : 'http://ykrec.youku.com/personal/packed/list.json?',
    getCollectJson : 'http://nc.youku.com/index/subfav?xthumb=true&pz=20&pn=1&callback=MYYOUKU.getCollectData&timestamp=',
    getSubJson : 'http://nc.youku.com/index/subscribe?xthumb=true&pz=20&pn=1&callback=MYYOUKU.getSubscribeData&timestamp=',
    getMemberJson : 'http://nc.youku.com/index/showPaidByMon?__callback=MYYOUKU.getMemberData&timestamp=',
    getUserinfoJson : 'http://nc.youku.com/index/getUserinfo?nu=1&__callback=MYYOUKU.getUserinfo&timestamp=',
    //getPickJson : 'http://nc.youku.com/index_playlogshow?pz=20&callback=MYYOUKU.getPickData&timestamp=',
    getAnonymousRecommendJson : 'http://ykrec.youku.com/personal/packed/list.json?',

    // URL
    urlVideo : 'http://v.youku.com/v_show/id_',
    urlUser : 'http://yikan.youku.com/u/home?from=y1.1-1.0.1',
    urlOfficial : 'http://i.youku.com/u/official',

    // String
    strLoading : '<div class="my-loading"><div class="ico__loading_32"></div></div>',

    // IE Hack
    isIE : document.all,

    init : function() {
        var _this = this;
        // init dom
        _this.dom = document.getElementById('MYYOUKU');
        _this.domRecommend = document.getElementById('MYYOUKU-Recommend');
        _this.domRecords = document.getElementById('MYYOUKU-Records');
        _this.domCollect = document.getElementById('MYYOUKU-Collect');
        _this.domSubscribe = document.getElementById('MYYOUKU-Subscribe');
        _this.domPick = document.getElementById('MYYOUKU-Pick');
        _this.domMember = document.getElementById('MYYOUKU-Member');
        _this.domTabs = document.getElementById('MYYOUKU-Tabs');

        // get cookies
        _this.cookieYsuid = Nova.Cookie.get('__ysuid');
        _this.cookieUid = get_username('all').userid;
        _this.LOGINSTAT = islogin();
        _this.getRandomNumber();
        _this.initTabs();
        _this.REQ_ID = _this.randomStr(3);

        // logon
        if (_this.LOGINSTAT) {
            _this.getRecommendJson += 'apptype=1&pg=8&module=1&pl=15&uid=' + _this.cookieUid + '&guid=' + _this.cookieYsuid + '&picSize=1&module=1&callback=MYYOUKU.getRecommendData&pz=30&req_id=' + _this.REQ_ID + '&timestamp=';
            _this.getJson(_this.getRecommendJson);
            _this.getJson(_this.getUserinfoJson);
            _this.timerData = setInterval(function() {
                if (!_this.lockRecommend) {
                    try {
                        _this.initRecommendDom(_this.dataRecommend, _this.domRecommend, 0 , _this.SHOWNUMBER);
                        _this.showContent(_this.MAXHEIGHT);
                    } catch (e) {}
                    clearInterval(_this.timerData);
                    _this.lockData = false;
                }
            }, _this.timeSpan);
            _this.dom.parentNode.setAttribute('id', 'MYYOUKU-loginAfter');
        } else {
            _this.cookieUid = '';
            _this.getAnonymousRecommendJson += 'apptype=1&pg=8&module=3&pl=15&guid=' + _this.cookieYsuid + '&picSize=1&callback=MYYOUKU.getAnonymousRecommendData&pz=30&req_id=' + _this.REQ_ID + '&timestamp=';
            _this.getJson(_this.getAnonymousRecommendJson);
            _this.timerAnonymous = setInterval(function() {
                if (!_this.lockAnonymousRecommend) {
                    _this.showContent(_this.ANONYMOUSMAXHEIGHT);
                    clearInterval(_this.timerAnonymous);
                }
            }, _this.timeSpan);
            _this.dom.parentNode.setAttribute('id', 'MYYOUKU-loginBefore');
        }
        //_this.bind();
    },

    // Bind
    bind : function() {
},

    bindMemberV : function(o) {
        var _this = this;
        _this.domMemberV = MYYOUKUTOOL.Dom.getElementsByClassName ('v', o);
        _this.domMemberV.each(function(item) {
            item.observe('mouseenter', function(event) {
                this.addClassName('cps');
            });
            item.observe('mouseleave', function(event) {
                this.removeClassName('cps');
            });
        });


    },

    bindDelete : function(obj) {
        var lists = obj.getElementsByTagName('DIV');
        for (var i = 0; i < lists.length; i++) {
            if (lists[i].className.indexOf('v') >= 0 ) {
                lists[i].onmouseover = function() {
                    var cl = this.getElementsByTagName('DIV');
                    for (var j = 0; j < cl.length; j++) {
                        if (cl[j].className.indexOf('v-close') >= 0) {
                            cl[j].style.display = 'block';
                        }
                    }
                };
                lists[i].onmouseout = function() {
                    var cl = this.getElementsByTagName('DIV');
                    for (var j = 0; j < cl.length; j++) {
                        if (cl[j].className.indexOf('v-close') >= 0) {
                            cl[j].style.display = 'none';
                        }
                    }
                }
            }
        }
    },

    show : function(type) {
        var _this = this;
        var theData = [];
        var theJsonUrl = '';
        var theLock = '';
        _this.LOGINSTAT = islogin();

        if (type == 0) {
} else if ( type == 1 ) {
            if (!!this.flagRecords) {
                return false;
            } else {
                this.flagRecords = true;
                this.getJson(this.getRecordJson);
                this.timerRecords = setInterval(function() {
                    if (!_this.lockRecords) {
                        _this.initRecordsDom(_this.dataRecords, 0, _this.dataRecords.length);
                        _this.flagRecords = true;
                        clearInterval(_this.timerRecords);
                    }
                }, _this.timeSpan);
            }
        } else if ( type == 2) {
            if (!!this.flagCollect) {
                return false;
            } else {
                if (_this.LOGINSTAT) {
                    this.flagCollect = true;
                    this.getJson(this.getCollectJson);
                    this.timerCollect = setInterval(function() {
                        if (!_this.lockCollect) {
                            _this.initCollectDom(_this.dataCollect, 0, _this.SHOWNUMBER);
                            _this.flagCollect = true;
                            clearInterval(_this.timerCollect);
                        }
                    }, _this.timeSpan);
                } else {
                    MYYOUKU.domCollect.innerHTML = '<div class="my-null""><span>收藏精彩视频，请<a href="http://www.youku.com/user/login/?cburl=' + encodeURI('http://www.youku.com') + '" target="_blank">登录</a></span></div>';
                }
            }
        } else if ( type == 3) {
            if (!!this.flagSubscribe || !_this.LOGINSTAT) {
                return false;
            } else {
                if (_this.LOGINSTAT) {
                    this.flagSubscribe = true;
                    this.getJson(this.getSubJson);
                    this.timerSubscribe = setInterval(function() {
                        if (!_this.lockSubscribe) {
                            _this.initSubscribeDom(_this.dataSubscribe, 0, _this.SHOWNUMBER);
                            _this.flagSubscribe = true;
                            clearInterval(_this.timerSubscribe);
                        }
                    }, _this.timeSpan);
                } else {
                    MYYOUKU.domSubscribe.innerHTML = '<div class="my-null""><span>订阅精彩视频，请<a href="http://www.youku.com/user/login/?cburl=' + encodeURI('http://www.youku.com') + '" target="_blank">登录</a></span></div>';
                }
            }
        } else if ( type == 4 ) {
            if (!!this.flagMember) {
                return false;
            } else {
                this.flagMember = true;
                this.getJson(this.getMemberJson);
                this.timerMember = setInterval(function() {
                    if (!_this.lockMember) {
                        _this.initMemberDom(_this.dataMember, 0, _this.dataMember.length);
                        _this.flagMember = true;
                        clearInterval(_this.timerMember);
                    }
                }, _this.timeSpan);
            }
        }
    },

    // Get Data
    getRecordsData : function(data) {
        if (!data || data.playtag.length == 0 && data.playtag_show.length == 0) {
            if (this.CURRENTRECORDSTATUS < this.TRYTIMES) {
                this.tryRequest(this.getRecordJson);
                this.CURRENTRECORDSTATUS++;
            } else {
                this.initData(data.playtag, this.dataRecords);
                this.lockRecords = false;
            }
        } else {
            this.initData(data.playtag, this.dataRecords);
            this.TOKEN = data.token;
            this.lockRecords = false;
        }
    },

    getRecommendData : function(dt) {
        var data = dt.data;
        if (typeof data == 'undefined') {
            return false;
        }
        if (data.length < this.SHOWNUMBER) {
            if (this.CURRENTRECOMMENDSTATUS < this.TRYJSONTIMES) {
                this.tryRequest(this.getRecommendJson);
                this.CURRENTRECOMMENDSTATUS++;
            } else {
                this.hideDom(this.dom);
                return false;
            }
        } else {
            this.initData(data, this.dataRecommend);
            this.lockRecommend = false;
        }
    },

    getSubscribeData : function(data) {
        if (typeof data == 'undefined') {
            return false;
        }
        if (!data.results) {
            if (this.CURRENTCOLLECTSTATUS < this.TRYTIMES) {
                this.tryRequest(this.getCollectJson);
                this.CURRENTCOLLECTSTATUS++;
            } else {
                data.results = [];
                this.initData(data.results, this.dataSubscribe);
                this.lockSubscribe = false;
                return false;
            }
        } else {
            this.initData(data.results, this.dataSubscribe);
            this.lockSubscribe = false;
        }
    },

    getCollectData : function(data) {
        if (typeof data == 'undefined') {
            return false;
        }
        if (!data) {
            if (this.CURRENTCOLLECTSTATUS < this.TRYTIMES) {
                this.tryRequest(this.getCollectJson);
                this.CURRENTCOLLECTSTATUS++;
            } else {
                data.subscribe = [];
                data.fav = [];
                this.initData(data.subscribe, this.dataCollect);
                this.initData(data.fav, this.dataCollect);
                this.lockCollect = false;
                return false;
            }
        } else {
            this.initData(data.subscribe, this.dataCollect);
            this.initData(data.fav, this.dataCollect);
            this.lockCollect = false;
        }
    },

    getMemberData : function(data) {
        if (typeof data == 'undefined') {
            return false;
        }
        if (!data) {
            if (this.CURRENTMEMBERSTATUS < this.TRYTIMES) {
                this.tryRequest(this.getMemberJson);
                this.CURRENTMEMBERSTATUS++;
            } else {
                data = [];
                this.initData(data, this.dataMember);
                this.lockMember = false;
                return false;
            }
        } else {
            this.initData(data, this.dataMember);
            this.lockMember = false;
        }
    },

    getUserinfo : function(data) {
        if (typeof data == 'undefined') {
            return false;
        }
        this.UserInfo = data;
    },

    getAnonymousRecommendData : function(dt) {
        var data = dt.data;
        var len = 0;
        if (!!data.length) {
            len = data.length;
        }
        if (len > this.ANONYMOUSRECOMMENDNUMBER) {
            this.initData(data, this.dataAnonymous);
            this.initAnonymousRecommendDom(this.dataAnonymous);
        } else {
            if (this.GETANONYMOUSDATANUMBER < this.TRYTIMES) {
                this.getJson(this.getAnonymousComJson + this.randomStr(10));
                this.GETANONYMOUSDATANUMBER++;
            }
        }
    },

    // 3 Times
    tryRequest : function(url) {
        this.getJson(url);
    },

    // Init Data
    initData : function(data, o, num) {
        var dataLen = 0;
        if (!!data.length) {
            var dataLen = data.length;
        }
        if (!!num && num < dataLen ) {
            len = this.MAXSHOWNUMBER;
        } else {
            len = dataLen;
        }
        for (var i = 0; i < len; i++) {
            o.push(data[i]);
        }
    },

    // Check Data
    checkShowData : function(data) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].showcategory == '电影') {
                if (parseInt(data[i].percent) < 95) {
                    this.dataShowInsert.push(data[i]);
                }
            } else {
                this.dataShowInsert.push(data[i]);
            }
        }
    },

    // Hide Dom
    hideDom : function(dom) {
        dom.style.display = 'none';
    },

    // Init Dom
    initTabs : function() {
        var str = '';
        str += '<ul class="yk-tab">';
        str += '<li class="my-tab current"><a href="http://yikan.youku.com/u/home?from=y1.1-1.0.0" target="_blank">猜你喜欢</a></li>';
        str += '<li class="my-tab"><a href="http://i.youku.com/u/home?type=watch_timeline" target="_blank">观看记录</a></li>';
        str += '<li class="my-tab"><a href="http://i.youku.com/u/home?type=favorite" target="_blank">我的收藏</a></li>';
        str += '<li class="my-tab"><a href="http://i.youku.com/u/home?type=subscribe" target="_blank">我的订阅</a></li>';
        str += '<li class="my-tab"><div class="my-tab-member"><a href="http://cps.youku.com/redirect.html?id=00005390" target="_blank">会员专享</a></div></li>';
        str += '</ul>';
        this.domTabs.innerHTML = str;
        new MyYoukuTab({
            root: this.dom,
            trigger: "mouseover",
            currentClass: "current"
        });
    },

    initRecommendDom : function(data, dom, start, end) {
        var _this = this;
        var str = '';
        var folderid = '';
        var tModule = 1;
        var showCount = 0;
        var watchUVT = 1;
        var watchTime = '';
        var wt = 0;
        var wtstr = '';

        if (_this.LOGINSTAT) {
            showContent = _this.SHOWNUMBER;
        } else {
            var wt = Nova.Cookie.get('u_l_v_t');
            if (!wt) {
                wt = 0
            }
            watchUVT = Math.ceil((wt / (6 * 60 * 60)) * 100);
            if (watchUVT < 1) {
                watchUVT = 0
            }
            if (watchUVT > 21600) {
                watchUVT = 100
            }
            if (wt > 60 && wt < 3600) {
                wtstr = '已看' + Math.ceil(wt / 60) + '分钟';
            } else if (wt >= 3600) {
                wtstr = '已看' + Math.ceil(wt / 3600) + '小时';
            } else if ( wt < 60 && wt > 0) {
                wtstr = '已看1分钟';
            } else {
                wtstr = '已看0分钟';
            }
            showContent = _this.ANONYMOUSRECOMMENDNUMBER + 1;
            tModule = 3 
        }

        for (var i = start ; i < end ; i++) {
            var index = 0;
            var stat = '';
            var vshowtitle = '';
            var uReUrl = '';
            var vtitle = _this.removeHTMLTag(data[i].title);

            if (_this.GetCharacterCount(vtitle) >= _this.TITLELENGTH) {
                vshowtitle = vtitle.substring(0, _this.TITLELENGTH) + '... ';
            } else {
                vshowtitle = vtitle;
            }
            var logdatastr = '{"uid":"' + _this.cookieUid + '","cookie_id":"' + _this.cookieYsuid + '","apt":"1","pg":"8","md":"' + tModule + '","dvid":"' + data[i].id + '","abver":"A","dma":"' + data[i].dma + '","pos":"' + i + '","ord":"0","algInfo":"' + data[i].algInfo + '","dct":"' + data[i].dct + '","req_id":"' + _this.REQ_ID + '"}';
            logdatastr = encodeURIComponent(logdatastr);

            if (i + 1 == showContent) {
                var lastLogdatastr = encodeURIComponent('{"abver":"' + data[i].ver + '","dma":"' + data[i].dma + '","ord":"0","dct":"' + data[i].dct + '","req_id":"' + _this.REQ_ID + '"}');
                var uReUrl = _this.urlUser;
                if (!_this.LOGINSTAT) {
                    uReUrl = 'http://www.youku.com/user/login/?cburl=' + encodeURI('http://www.youku.com');
                }
                str += '<div class="v v-show-more" logdata="' + logdatastr + '">';
                str += '<div class="v-thumb">';
                str += '<img src="' + data[i].picUrl + '" title="' + vtitle + '" />';
                str += '<div class="v-thumb-taglt"></div>';
                str += '<div class="v-thumb-tagrt"></div>';
                str += '<div class="v-thumb-tagrb"></div>';
                str += '</div>';
                str += '<div class="v-link">';
                str += '<a href="' + uReUrl + '" target="_blank"></a>';
                str += '</div>';
                // str += '<div class="v-isdrama"></div>';
                str += '<div class="v-meta va">';
                str += '<div class="v-meta-entry-more"><a href="' + _this.urlUser + '" target="_blank">查看更多</a></div>';
                str += '</div>';
                str += '</div>';
            } else {
                str += '<div class="v" logdata="' + logdatastr + '">';
                str += '<div class="v-thumb">';
                str += '<img src="' + data[i].picUrl + '" title="' + vtitle + '" />';
                str += '<div class="v-thumb-taglt"></div>';
                str += '<div class="v-thumb-tagrt"></div>';
                str += '<div class="v-thumb-tagrb"><span class="v-time">' + _this.secondTofMinute(data[i].totalTime) + '</span></div>';
                str += '</div>';
                str += '<div class="v-link">';
                str += '<a href="' + data[i].playLink + '" title="' + vtitle + '" target="_blank" onclick="MYYOUKU.submitVideoCommend(this)"></a>';
                str += '</div>';
                str += '<div class="v-meta va">';
                str += '<div class="v-meta-title">';
                str += '<a href="' + data[i].playLink + '" title="' + vtitle + '" target="_blank" onclick="MYYOUKU.submitVideoCommend(this)">' + vshowtitle + '</a>';
                str += '</div>';
                str += '<div class="v-meta-entry">';
                str += '<i class="ico-statplay" title="播放"></i>';
                str += '<span class="v-num">' + this.formatnum(data[i].playAmount) + '</span>';
                str += '<i class="ico-statcomment" title="评论"></i>';
                str += '<span class="v-num">' + this.formatnum(data[i].commentCount) + '</span>';
                str += '</div>';
                str += '<div class="v-meta-overlay"></div>';
                str += '</div>';
                str += '</div>';
            }

        }
        if (_this.LOGINSTAT) {
            var lastLogdatastr = encodeURIComponent('{"abver":"' + data[i].ver + '","dma":"' + data[i].dma + '","ord":"0","dct":"' + data[i].dct + '"}');
            uReUrl = _this.urlUser;
            var rankIcoIndex1 = 0;
            var rankIcoIndex2 = 0;
            var userRankNum = _this.UserInfo.nextRank;
            if (userRankNum > 10 && userRankNum < 21) {
                rankIcoIndex2 = 1;
            } else if (userRankNum > 20 && userRankNum < 31) {
                rankIcoIndex2 = 2;
            } else if (userRankNum > 30 && userRankNum < 41) {
                rankIcoIndex2 = 3;
            } else if (userRankNum > 40 && userRankNum <= 51) {
                rankIcoIndex2 = 4;
            }

            if ((userRankNum - 1)%10 == 0 && userRankNum > 0) {
                rankIcoIndex1 = rankIcoIndex2 - 1;
            } else {
                rankIcoIndex1 = rankIcoIndex2;
            }
            if (userRankNum >= 51) {
                str += '<div class="my-watchgrade"><div class="yk-watchgrade"><h6>' + _this.UserInfo.userName + '</h6><div class="yk-userlog-grade"><div class="yk-userlog-grade-info"><div class="yk-userlog-grade-detail">已看' + _this.UserInfo.dayViewdura + ', 击败<em>' + _this.UserInfo.percent + '</em>小伙伴</div><div class="yk-watchgrade"><div class="yk-watchgrade-time">恭喜您,观看等级已达到顶级</div><div class="yk-watchgrade-level left"><div class="ico-watchlevel-4-small"><em>' + (userRankNum - 1) + '</em></div></div><div class="yk-watchgrade-bar"><div style="width:' + _this.UserInfo.nowPercent + '%"></div></div></div></div></div> </div></div>';
            } else {
                str += '<div class="my-watchgrade"><div class="yk-watchgrade"><h6>' + _this.UserInfo.userName + '</h6><div class="yk-userlog-grade"><div class="yk-userlog-grade-info"><div class="yk-userlog-grade-detail">已看' + _this.UserInfo.dayViewdura + ', 击败<em>' + _this.UserInfo.percent + '</em>小伙伴</div><div class="yk-watchgrade"><div class="yk-watchgrade-time">距升级还有' + _this.UserInfo.nextViewdura + '</div><div class="yk-watchgrade-level left"><div class="ico-watchlevel-' + rankIcoIndex1 + '-small"><em>' + (userRankNum - 1) + '</em></div></div><div class="yk-watchgrade-bar"><div style="width:' + _this.UserInfo.nowPercent + '%"></div></div><div class="yk-watchgrade-level right"><div class="ico-watchlevel-' + rankIcoIndex2 + '-small"><em>' + userRankNum + '</em></div></div></div></div></div> </div></div>';
            }
        } else {
            str += '<div class="my-watchgrade"><div class="yk-watchgrade"><h6>Hi, 你好</h6><div class="yk-userlog-grade"><div class="yk-userlog-curgrade"><a href="http://i.youku.com/u/watchRankIntro" target="_blank"></a></div><div class="yk-userlog-grade-info"><div class="yk-userlog-grade-detail">' + wtstr + ', 击败<em>' + watchUVT + '%</em>小伙伴</div><div class="yk-watchgrade"><div class="yk-watchgrade-bar"><div style="width:' + watchUVT + '%"></div></div><div class="yk-watchgrade-level right"><div class="ico-watchlevel-0-small"><em>1</em></div></div></div></div><div class="yk-userlogin"><p>登录可以攒时长玩升级哦~~</p><div class="yk-userlogin-btn"><a href="javascript:MYYOUKU.mylogin(\'http://hz.youku.com/red/click.php?tp=1&cp=4009303&cpp=1000494&from=spaceindex\');">马上体验</a></div></div></div></div></div>';
        }

        str += '<div class="my-more" id="MYYOUKU-More"><a href="http://yikan.youku.com/u/home?from=y1.1-1.0.2" target="_blank">进入个人中心</a></div>';
        dom.innerHTML = str;
        _this.lockRecommend = false;
        _this.lockAnonymousRecommend = false;
    },

    initRecordsDom : function(data, start, end) {
        var _this = this;
        var len = data.length;
        var str = '';

        if (len == 0 ) {
            str += '<div class="my-null"><span>暂无观看记录, 去看看<a href="http://i.youku.com/u/home" target="_blank">更多精彩内容<a></span></div>';
        } else {
            if (len < end) {
                end = len;
            }
            for (var i = start ; i < end ; i++) {
                var index = 0;
                var stat = '';
                var vshowtitle = '';
                var vtitle = '';
                var vstage = '';
                var vurl = _this.urlVideo + data[i].vidEncoded + '.html';
                var vtime = 0;

                if (!!data[i].showcategory) {
                    vtitle = '[' + data[i].showcategory + '] ' + _this.removeHTMLTag(data[i].showname);
                } else {
                    vtitle = _this.removeHTMLTag(data[i].title) ;
                }

                if (parseInt(data[i].percent) === 100) {
                    vstage += '完';
                } else if (parseInt(data[i].percent) === 0) {
                    if (!data[i].watchStage) {
                        vstage += '到1%';
                    } else {
                        vstage += '到' + data[i].watchStage + '1%';
                    }
                } else {
                    vtime = data[i].sec;
                    if (data[i].showcategory == "综艺" || data[i].showcategory == "资讯" || data[i].showcategory == "电视剧") {
                        if (!data[i].watchStage) {
                            vstage += '到1%';
                        } else {
                            vstage += '到' + data[i].watchStage + '的' + data[i].percent
                        }
                    } else if (data[i].showcategory == "动漫") {
                        vstage += '到' + data[i].stage + '的' + data[i].percent
                    } else {
                        vstage += '到' + data[i].percent;
                    }
                }

                if (vtime != 0) {
                    vurl += '?firsttime=' + vtime;
                }

                if (_this.GetCharacterCount(vtitle) >= _this.TITLELENGTH) {
                    vshowtitle = vtitle.substring(0, _this.TITLELENGTH) + '... ';
                } else {
                    vshowtitle = vtitle;
                }
                str += '<div class="v">';
                str += '<div class="v-thumb">';
                str += '<img src="' + data[i].thumb_medium + '" title="' + vtitle + '" />';
                str += '<div class="v-thumb-taglt"></div>';
                str += '<div class="v-thumb-tagrt"></div>';
                str += '<div class="v-thumb-tagrb"><span class="v-time">' + _this.secondTofMinute(data[i].seconds) + '</span></div>';
                str += '</div>';
                str += '<div class="v-link">';
                str += '<a href="' + vurl + '" title="' + vtitle + '" target="_blank"></a>';
                str += '</div>';
                str += '<div class="v-meta va">';
                str += '<div class="v-meta-title">';
                str += '<a href="' + vurl + '" title="' + vtitle + '" target="_blank">' + vshowtitle + '</a>';
                str += '</div>';
                str += '<div class="v-meta-entry">已在' + data[i].devicename + '上看' + vstage;
                str += '</span>';
                str += '</div>';
                str += '<div class="v-meta-overlay"></div>';
                str += '<div class="v-close"><a href="javascript:;" onclick="MYYOUKU.deleteList(\'' + _this.TOKEN + '\',\'' + data[i].videoid + '\',\'' + data[i].folderid + '\',\'' + data[i].showid + '\',\'' + data[i].videoid + '\',\'MYYOUKU-Records\',\'\');">删除</a></div>';
                str += '</div>';
                str += '</div>';
            }
            str += '<div class="my-more" id="MYYOUKU-More"><a href="http://i.youku.com/u/home?type=watch_timeline" target="_blank">查看全部</a></div>';
        }
        _this.domRecords.innerHTML = str;
        _this.bindDelete(_this.domRecords);
        _this.lockRecords = false;
    },

    initMemberDom : function(data, start, end) {
        var _this = this;
        var len = data.length;
        var str = '';

        if (!_this.LOGINSTAT) {
            end = _this.ANONYMOUSREMEMBERNUMBER;
        }

        for (var i = start ; i < end ; i++) {
            var index = 0;
            var num = _this.RANDOMARRAY[i] - 1;
            var stat = '';
            var vshowtitle = '';
            var vtitle = '';
            var vstage = '';
            var vtime = 0;
            var vurl = data[num].firstepisode_videourl;

            vshowname = _this.removeHTMLTag(data[num].showname) ;
            vtitle = _this.removeHTMLTag(data[num].firstepisode_videotitle) ;
            if (_this.GetCharacterCount(vtitle) >= _this.TITLELENGTH) {
                vshowname = vshowname.substring(0, _this.TITLELENGTH) + '... ';
                vtitle = vtitle.substring(0, _this.TITLELENGTH) + '... ';
            } else {
                vshowname = vshowname;
                vtitle = vtitle;
            }

            str += '<div class="v">';
            str += '<div class="v-thumb">';
            str += '<img src="' + data[num].show_thumburl_big + '" title="' + vtitle + '" widt="200" height="110" />';
            str += '<div class="v-thumb-taglt"></div>';
            str += '<div class="v-thumb-tagrt"></div>';
            str += '<div class="v-thumb-tagrb"><span class="v-time">' + _this.secondTofMinute(data[num].showlength * 60) + '</span></div>';
            str += '</div>';

            if (i + 1 == _this.SHOWNUMBER) {
                str += '<div class="v-link"><a href="http://cps.youku.com/redirect.html?id=00005390" title="查看更多" target="_blank"></a></div>';
                str += '<div class="v-isdrama"></div>';
                str += '<div class="v-meta va">';
                str += '<div class="v-meta-entry-more"><a href="http://cps.youku.com/redirect.html?id=00005390" target="_blank">查看更多</a></div>';
                str += '</div>';
            } else {
                str += '<div class="v-link">';
                str += '<a href="' + vurl + '" title="' + vshowname + '" target="_blank"></a>';
                str += '</div>';
                str += '<div class="v-meta va">';
                str += '<div class="v-meta-title">';
                str += '<a href="' + vurl + '" title="' + vshowname + '" target="_blank">' + vshowname + '</a>';
                str += '</div>';
                //str += '<div class="v-meta-entry"><a href="' + vurl + '" target="_blank" style="color:#909090">' + vtitle + '</a></div>';
                str += '<div class="v-meta-entry"><span style="display:inline-block;*display:inline;*zoom:1;vertical-align:middle;width:16px;height:16px;background:transparent url(/index/img/2013/video/yk.8.png) no-repeat -120px 0px;"></span><del>' + _this.fen2Yuan(data[num].price) + '</del><span style="color:#ff6600;margin-left:10px;">会员免费</span><span class="cps-member"><a href="http://cps.youku.com/redirect.html?id=0000f1e9" target="_blank">立即开通</a></span></div>';
                str += '<div class="v-meta-overlay"></div>';
                str += '</div>';
            }
            str += '</div>';
        }
        str += '<div class="my-more" id="MYYOUKU-More"><a href="http://cps.youku.com/redirect.html?id=00005390" target="_blank">更多会员专享</a></div>';

        _this.domMember.innerHTML = str;
        _this.bindMemberV(_this.domMember);
        _this.lockMember = false;
    },

    initCollectDom : function(d, start, end) {
        var _this = this;
        var len = d.length;
        var str = '';

        if (!len) {
            str += '<div class="my-null"><span>暂无收藏, 去看看<a href="http://i.youku.com/u/home" target="_blank">更多精彩内容</a></span></div>';
        } else {
            if (len < end) {
                end = len;
            }
            for (var i = start ; i < end ; i++) {
                var index = 0;
                var stat = '';
                var vshowtitle = '';
                var vtitle = '';
                var vurl = '';
                var vthumblurl = '';
                var vseconds = '';
                var vepisode = '';
                var vtitlelength = _this.TITLELENGTH;

                if (!!d[i].data) {
                    vtitle = _this.removeHTMLTag(d[i].data.title);
                    vurl = _this.urlVideo + d[i].data.encodedId + '.html';
                    vthumburl = 'http://res.mfs.ykimg.com/' + d[i].data.thumb0;
                    vseconds = d[i].data.seconds;
                } else {
                    vtitlelength = 12;
                    vtitle = _this.removeHTMLTag(d[i].realData.title);
                    if (!d[i].realData.videoid) {
                        vurl = 'http://www.youku.com/show_page/id_z' + d[i].shid + '.html';
                    } else {
                        vurl = _this.urlVideo + d[i].realData.videoid + '.html';
                        if (d[i].realData.po != 0) {
                            vurl += '?firsttime=' + d[i].realData.po;
                        }
                    }
                    vthumburl = d[i].realData.thumburl;
                    vseconds = d[i].realData.seconds;


                    if (d[i].category == "资讯" || d[i].category == "综艺") {
                        if (d[i].realData.episode_last.length > 4) {
                            vepisode = d[i].realData.episode_last.substring(d[i].realData.episode_last.length, 4) + '期';
                        } else {
                            vepisode = d[i].realData.episode_last + '期';
                        }
                    } else {
                        vtitle = _this.removeHTMLTag(d[i].realData.showname);
                        vepisode = d[i].realData.episode_last;
                        if (d[i].realData.category == "电视剧") {
                            vepisode += '集';
                        } else {
                            vepisode = d[i].realData.episode_last + '期';
                        }
                    }
                    if (d[i].realData.completed == 1) {
                        vepisode = '全' + vepisode;
                    } else {
                        vepisode = '更新至' + vepisode;
                    }

                }

                if (_this.GetCharacterCount(vtitle) >= vtitlelength) {
                    vshowtitle = vtitle.substring(0, vtitlelength) + '... ';
                } else {
                    vshowtitle = vtitle;
                }


                str += '<div class="v">';
                str += '<div class="v-thumb">';
                str += '<img src="' + vthumburl + '" title="' + vtitle + '" />';
                str += '<div class="v-thumb-taglt"></div>';
                str += '<div class="v-thumb-tagrt"></div>';
                str += '<div class="v-thumb-tagrb">';
                str += '</div>';
                str += '</div>';
                str += '<div class="v-link"><a href="' + vurl + '" title="' + vtitle + '" target="_blank"></a></div>';
                str += '<div class="v-meta va">';
                str += '<div class="v-meta-title">';
                str += '<a href="' + vurl + '" title="' + vtitle + '" target="_blank">' + vshowtitle + '</a>';
                str += '</div>';
                if (!!d[i].data) {
                    str += '<div class="v-meta-entry"><span>' + _this.shortDate(d[i].data.favTime) + ' 收藏</span></div>';
                } else {
                    if (d[i].realData.category == "资讯" || d[i].realData.category == "综艺") {
                        str += '<div class="v-meta-entry">' + d[i].realData.showname + '</div>';
                    }
                    str += '<div class="v-meta-entry">';
                    if (parseInt(d[i].realData.percent) === 100) {
                        if (d[i].realData.devicename == 'pc') {
                            str += '已在PC上看';
                        } else {
                            str += '已在' + d[i].realData.devicename + '上看';
                        }
                        if (d[i].realData.category == "电视剧") {
                            str += '完第' + d[i].realData.stg + '集';
                        } else {
                            str += '完第' + d[i].realData.stg + '期';
                        }
                    } else if (parseInt(d[i].realData.percent) === 0 || d[i].realData.percent === null) {} else {
                        if (d[i].realData.devicename == 'pc') {
                            str += '已在PC上看';
                        } else {
                            str += '已在' + d[i].realData.devicename + '上看';
                        }
                        str += '到第' + d[i].realData.stg + '集' + d[i].realData.percent;
                    }
                    str += '</span>';
                    str += '</div>';
                }
                str += '<div class="v-meta-overlay"></div>';
                str += '</div>';
                str += '</div>';
            }
            str += '<div class="my-more" id="MYYOUKU-More"><a href="http://i.youku.com/u/home?type=favorite" target="_blank">查看全部</a></div>';
        }
        _this.domCollect.innerHTML = str;
        _this.lockCollect = false;
    },

    initSubscribeDom : function(data, start, end) {
        var _this = this;
        var len = data.length;
        var str = '';
        var shownum = 0;

        if (!len) {
            str += '<div class="my-null""><span>暂无订阅更新, 去看看精彩的<a href="http://i.youku.com/u/official/" target="_blank">视频官网</a></span></div>';
        } else {
            if (len < end) {
                end = len;
            }
            for (var i = start ; i < end ; i++) {
                var index = 0;
                var stat = '';
                var vshowtitle = '';
                var vtitle = _this.removeHTMLTag(data[i].title);
                var vurl = _this.urlVideo + data[i].videoid + '.html';

                if (_this.GetCharacterCount(vtitle) >= _this.TITLELENGTH) {
                    vshowtitle = vtitle.substring(0, _this.TITLELENGTH) + '... ';
                } else {
                    vshowtitle = vtitle;
                }
                str += '<div class="v">';
                str += '<div class="v-thumb">';
                str += '<img src="' + data[i].thumb_medium + '" title="' + vtitle + '" />';
                str += '<div class="v-thumb-taglt"></div>';
                str += '<div class="v-thumb-tagrt"></div>';
                if (i + 1 == _this.SHOWNUMBER) {
                    str += '</div>';
                    str += '<div class="v-link"><a href="http://i.youku.com/u/home?type=subscribe" title="查看更多" target="_blank"></a></div>';
                    str += '<div class="v-isdrama"></div>';
                    str += '<div class="v-meta va">';
                    str += '<div class="v-meta-entry-more"><a href="http://i.youku.com/u/home?type=subscribe" target="_blank">查看更多</a></div>';
                    str += '</div>';
                } else {
                    str += '<div class="v-thumb-tagrb"><span class="v-time">' + _this.secondTofMinute(data[i].seconds) + '</span></div>';
                    str += '</div>';
                    str += '<div class="v-link"><a href="' + vurl + '" title="' + vtitle + '" target="_blank"></a></div>';
                    str += '<div class="v-meta va">';
                    str += '<div class="v-meta-title">';
                    str += '<a href="' + vurl + '" title="' + vtitle + '" target="_blank">' + vshowtitle + '</a>';
                    str += '</div>';
                    str += '<div class="v-meta-entry"><i class="ico-user"></i> <a href="' + data[i].userlink + '" target="_blank" title="' + _this.removeHTMLTag(data[i].username) + '">' + _this.removeHTMLTag(data[i].username) + '</a></span></div>';
                    str += '<div class="v-meta-overlay"></div>';
                    str += '</div>';
                }
                str += '</div>';
            }
            str += '<div class="my-more" id="MYYOUKU-More"><a href="http://i.youku.com/u/home?type=subscribe" target="_blank">查看更多</a></div>';
        }
        _this.domSubscribe.innerHTML = str;
        _this.lockSubscribe = false;
    },

    initPickDom : function(data, start, end) {
        var _this = this;
        var len = data.length;
        var str = '';
        var arr = [];

        for (var j = 0; j < data.length; j++) {
            if (data[j].episode_last != 0) {
                arr.push(data[j]);
            }
        }

        if (!len) {
            str += '<div class="my-null"><span>暂无追剧, 去看看<a href="http://i.youku.com/u/home" target="_blank">更多精彩内容</a></span></div>';
        } else {
            if (len < end) {
                end = len;
            }
            for (var i = start ; i < arr.length ; i++) {
                var index = 0;
                var stat = '';
                var vshowtitle = '';
                var vtitle = '';
                var vurl = _this.urlVideo + arr[i].videoid + '.html';
                var vepisode = '';

                if (arr[i].category == "资讯" || arr[i].category == "综艺") {
                    vtitle = _this.removeHTMLTag(arr[i].title);
                    if (arr[i].episode_last.length > 4) {
                        vepisode = arr[i].episode_last.substring(arr[i].episode_last.length, 4) + '期';
                    } else {
                        vepisode = arr[i].episode_last + '期';
                    }
                } else {
                    vtitle = _this.removeHTMLTag(arr[i].showname);
                    vepisode = arr[i].episode_last;
                    if (arr[i].category == "电视剧") {
                        vepisode += '集';
                    } else {
                        vepisode = arr[i].episode_last + '期';
                    }
                }
                if (arr[i].completed == 1) {
                    vepisode = '全' + vepisode;
                } else {
                    vepisode = '更新至' + vepisode;
                }

                if (!!arr[i].po) {
                    vurl += '?f=' + arr[i].po;
                }

                str += '<div class="v">';
                str += '<div class="v-thumb">';
                str += '<img src="' + arr[i].thumburl + '" title="' + vtitle + '" />';
                str += '<div class="v-thumb-taglt"></div>';
                str += '<div class="v-thumb-tagrt"></div>';
                str += '<div class="v-thumb-tagrb"></div>';
                str += '</div>';
                if (i + 1 == _this.SHOWNUMBER) {
                    str += '<div class="v-link"><a href="http://i.youku.com/u/home?type=showfriends_timeline" title="查看更多" target="_blank"></a></div>';
                    str += '<div class="v-isdrama"></div>';
                    str += '<div class="v-meta va">';
                    str += '<div class="v-meta-neck"></div>';
                    str += '<div class="v-meta-entry-more"><a href="http://i.youku.com/u/home?type=showfriends_timeline" target="_blank">查看更多</a></div>';
                    str += '</div>';
                } else {
                    str += '<div class="v-link">';
                    str += '<a href="' + vurl + '" title="' + vtitle + '" target="_blank"></a>';
                    str += '</div>';
                    str += '<div class="v-meta va">';
                    str += '<div class="v-meta-neck"><span class="v-status">' + vepisode + '</span></div>';
                    str += '<div class="v-meta-title">';
                    str += '<a href="' + vurl + '" title="' + vtitle + '" target="_blank">' + vtitle + '</a>';
                    str += '</div>';
                    if (arr[i].category == "资讯" || arr[i].category == "综艺") {
                        str += '<div class="v-meta-entry">' + arr[i].showname + '</div>';
                    }
                    str += '<div class="v-meta-entry">';
                    if (parseInt(arr[i].percent) === 100) {
                        if (arr[i].devicename == 'pc') {
                            str += '已在PC上看';
                        } else {
                            str += '已在' + arr[i].devicename + '上看';
                        }
                        if (arr[i].category == "电视剧") {
                            str += '完第' + arr[i].stg + '集';
                        } else {
                            str += '完第' + arr[i].stg + '期';
                        }
                    } else if (parseInt(arr[i].percent) === 0 || arr[i].percent === null) {} else {
                        if (arr[i].devicename == 'pc') {
                            str += '已在PC上看';
                        } else {
                            str += '已在' + arr[i].devicename + '上看';
                        }
                        str += '到第' + arr[i].stg + '集' + arr[i].percent;
                    }
                    str += '</span>';
                    str += '</div>';
                    str += '<div class="v-meta-overlay"></div>';
                    str += '</div>';
                }
                str += '</div>';
            }
            str += '<div class="my-more" id="MYYOUKU-More"><a href="http://i.youku.com/u/home?type=showfriends_timeline" target="_blank">管理我的追剧</a></div>';
        }
        _this.domPick.innerHTML = str;
        _this.lockPick = false;
    },

    initAnonymousRecommendDom : function(data) {
        this.initRecommendDom(this.dataAnonymous, this.domRecommend, 0, this.ANONYMOUSRECOMMENDNUMBER);
    },

    getLastVideo : function(vid, reUrl, lastHz, thumburl, vtitle) {
        var str = '';
        str += '<ul class="p">';
        str += '<li class="p_link"><a title="查看更多" href="' + this.returnHzUrl(lastHz , reUrl) + '" target="_blank" onclick="MYYOUKU.submitVideoCommend(this)"></a></li>';
        str += '<li class="p_thumb"><img src="' + thumburl + '" title="' + vtitle + '" alt="' + vtitle + '" /></li>';
        str += '<li class="p_status"><span class="status">查看更多</span><span class="bg"></span></li>';
        str += '</ul>';
        return str;
    },

    showContent: function(height) {
        var _this = this;
        _this.dom.style.display = 'block';
        var slidingTimer = null;
        var b = 10, c = height, d = 5, t = 0;
        function easeOut(t, b, c, d) {
            return - c * (t/=d) * (t - 2) + b;
        }
        function Sliding() {
            _this.dom.style.height = easeOut(t, b, c, d) + 'px';
            if (t < d) {
                t++;
                slidingTimer = setTimeout(Sliding, 1);
            } else {
                window.clearInterval(slidingTimer);
            }
        }
        Sliding();
    },

    // For IE
    getImages : function(imglistid) {
        var _this = this;
        var doms = [];
        var imgs = [];
        var index = 0;
        for (var i = 0 ; i < imglistid.length; i++) {
            var thumb = document.getElementById(imglistid[i]);
            doms.push(thumb);
            imgs.push(thumb.getAttribute('_src'));
        }
        var timer = setInterval(function() {
            try {
                var img = new Image();
                doms[index].appendChild(img);
                img.src = imgs[index];
                if (index >= _this.SHOWNUMBER) {
                    clearInterval(timer);
                } else {
                    index++;
                }
            } catch (e) {}
        }, 5);
    },

    // Delete Records
    deleteList : function(tk, vid, fid, shid, lild, list) {
        var vnum = 0;
        var e = window.event || arguments.callee.caller.arguments[0];
        var obj = e.target || e.srcElement;
        if (!tk || !vid || !lild) 
            return;
        if (fid == undefined) 
            fid = 0;
        if (shid == undefined) 
            shid = 0;
        var delUrl = "http://yus.navi.youku.com/playlog/delete.json?token=" + tk + "&v=" + vid + "&fid=" + fid + "&shid=" + shid + "&" + Math.random();
        var listObj = document.getElementById(list);
        var listDiv = listObj.getElementsByTagName('DIV');
        var itemObj = obj.parentNode.parentNode.parentNode;
        for (var i = 0; i < listDiv.length; i++) {
            if (listDiv[i].className == 'v') {
                vnum++;
            }
        }
        if (vnum == 1) {
            if (list == 'MYYOUKU-Records') {
                var str = '<div class="my-null"><span>暂无观看记录, 去看看<a href="http://i.youku.com/u/home" target="_blank">更多精彩内容<a></span></div>';
            }
            listObj.innerHTML = str;
        } else {
            listObj.removeChild(itemObj);
        }

        var img = new Image();
        img.src = delUrl;
        img = null;
    },

    // Request Images SRC
    requestImg : function(url) {
        var imgReq = new Image();
        imgReq.src = url;
        imgReq = null;
    },

    submitVideoCommend : function(o) {
        var req = '';
        if (o.parentNode.className == "v-link") {
            req = o.parentNode.parentNode.getAttribute('logdata');
        } else {
            req = o.parentNode.parentNode.parentNode.getAttribute('logdata');
        }
        req = decodeURIComponent(req);
        var d = eval('(' + req + ')');
        if (d) {
            var logstr = 'uid=' + d.uid + '&cookie_id=' + d.cookie_id + '&apt=1&pg=8&md=' + d.md + '&dvid=' + d.dvid + '&algInfo=' + d.algInfo + '&abver=' + d.abver + '&dma=' + d.dma + '&pos=' + d.pos + '&ord=0&dct=' + d.dct + '' + '&req_id=' + d.req_id + '&timestamp=' + this.randomStr(5);
            var url = 'http://r.l.youku.com/recpclick?';
            var imgReq = new Image();
            imgReq.src = url + logstr;
            imgReq = null;
        }
    },

    // Get Random String
    randomStr : function(l) {
        var x = "0123456789qwertyuioplkjhgfdsazxcvbnm";
        var tmp = "";
        var timestamp = new Date().getTime();
        for (var i = 0; i < l; i++) {
            tmp += x.charAt(Math.ceil(Math.random() * 100000000)%x.length);
        }
        return timestamp + tmp;
    },

    // Format Number
    formatnum : function(n) {
        n = n + '';
        if (n.indexOf(',') > 0) {
            n = n.replace(/,/gi, '') + '';
        }
        var re = /(-?\d+)(\d{3})/;
        while (re.test(n)) {
            n = n.replace(re, '$1,$2')
        }
        return n;
    },

    GetCharacterCount : function(str) {
        var characterCount = str.length;
        return characterCount;
    },

    // Format Time Second to Minute
    secondTofMinute : function(t) {
        var m = parseInt(t / 60);
        var s = parseInt(t%60);
        if (m < 10) {
            m = '0' + m;
        } else {
            m = m.toString();
        }
        if (s < 10) {
            s = '0' + s;
        } else {
            s = s.toString();
        }
        return m + ':' + s;
    },

    //Short Date 
    shortDate: function(tp) {
        var str = tp;
        var new_tp = str.replace(/:/g, '-');
        new_tp = new_tp.replace(/ /g, '-');
        var arr = new_tp.split('-');
        var datum = new Date(Date.UTC(arr[0], arr[1] - 1, arr[2], arr[3] - 8, arr[4], arr[5]));
        tp = datum.getTime() / 1000;
        var d, now = new Date(), delta;
        tp = parseInt(tp);
        if (!tp || isNaN(tp)) 
            return '';
        d = new Date(tp * 1000);
        delta = Math.round((now - d) / 1000);

        var yyyy = d.getFullYear();
        var mm = d.getMonth() + 1;
        mm = this.fillzero(mm);
        var dd = d.getDate();
        dd = this.fillzero(dd);
        var HH = d.getHours();
        HH = this.fillzero(HH);
        var MM = d.getMinutes();
        MM = this.fillzero(MM);

        var t0 = new Date(now.getFullYear(), now.getMonth(), now.getDate()) / 1000;
        var t1 = d.getTime() / 1000;

        //1分钟内
        if (delta < 60) {
            return '刚刚';
        }
        //1小时内
        else if (delta < 3600) {
            return Math.floor(delta / 60) + '分钟前';
        }
        //当天内
        else if (t1 > t0) {
            return Math.floor(delta / 3600) + '小时前';
        }
        //昨天
        else if (t0 - t1 < 24 * 3600) {
            return '昨天 ' + HH + ':' + MM;
        }
        //前天
        else if (t0 - t1 < 48 * 3600) {
            return '前天 ' + HH + ':' + MM;
        }
        //一周内
        else if (delta < 7 * 24 * 3600) {
            return Math.floor(delta / (24 * 3600)) + '天前';
        } else {
            //本年内 || 去年但是当前是1月份
            if (yyyy == now.getFullYear() || (now.getFullYear() - yyyy == 1 && now.getMonth() == 0)) {
                return mm + '-' + dd + ' ' + HH + ':' + MM;
            }
            //全年但当前是2月份及以后
            else {
                return yyyy + '-' + mm + '-' + dd;
            }
        }
        return delta;
    },

    fillzero: function(n) {
        if (n < 10) {
            return '0' + n;
        }
        return '' + n;
    },

    // Login
    mylogin : function (url) {
        var _this = this;
        _this.requestImg(url);
        login();
    },

    refresh : function () {
        window.location.reload();
    },

    fen2Yuan : function (str) {
        //如果是"0",直接返回"0"
        if ((str == "undefined") || (str == "0") || str.length == 0) {
            return "0.00";
        }

        str = trimString(str);
        if (str.length == 1) {
            str = "0.0" + str;
        } else if (str.length == 2) {
            str = "0." + str;
        } else {
            str = str.substring(0, str.length - 2) + "." + str.substr(str.length - 2, 2);
        }
        return str;

        function trimString(str) {
            while ((str.substring(0, 1) == 0) && (str.length != 1) ) {
                str = str.substring(1);
            }
            return str;
        }

    },

    // Filter HTML Tag
    removeHTMLTag : function (str) {
        if (!str) {
            str = ''
        }
        return str.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&quot;");
    },

    // Get Random Number
    getRandomNumber : function() {
        var _this = this;
        var count = 60;
        for (var i = 0; i < count; i++) {
            _this.RANDOMARRAY[i] = i + 1;
        }
        _this.RANDOMARRAY.sort(function() {
            return 0.5 - Math.random();
        });
    },

    // Get Json Data
    getJson : function(url) {
        var _this = this;
        var _script = document.createElement("script");
        _script.type = "text/javascript";
        _script.src = url + _this.randomStr(10);
        if (! /*@cc_on!@*/
        0) {
            _script.onload = _this.callBackScript;
        } else {
            _script.onreadystatechange = function () {
                if (_script.readyState == 'loaded' || _script.readyState == 'complete') {
                    _this.callBackScript();
                }
            }
        }
        document.getElementsByTagName("head")[0].appendChild(_script);
    },

    callBackScript : function() {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    }
};

window.update_login_status_hook_myyouku = function() {
    MYYOUKU.init();
};





