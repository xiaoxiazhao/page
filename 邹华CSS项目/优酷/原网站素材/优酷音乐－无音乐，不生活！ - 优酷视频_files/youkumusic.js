(function(){
    xmloadingjs('http://www.laifeng.com/cms/youku/music',function(){
    var _xm_container = document.getElementById('XM_LIVING_SOURCE');
    if(!_xm_container || typeof _xingmeng_live_data=='undefined') return;
    var _html = '';
    for(var i=0,len=Math.min(2,_xingmeng_live_data.length);i<len;i++) {
        var data = _xingmeng_live_data[i];
        if(i==1) {
            _html+='<div class="yk-col4 yk-w970-hide">';
        }
        else {
            _html+='<div class="yk-col4">';
        }
        _html+='<div class="v">'+
              '<div class="v-thumb">'+
              '<img alt="'+data.title+'" src="'+data.faceUrl+'">';
        if(data.showing) {
            _html+='<div class="xm-icon-living"></div>';
        }
        _html+='</div>'+
         '<div class="v-link">'+
         '<a title="'+data.title+'" target="_blank" href="'+data.url+'"></a>'+
         '</div>'+
         ' <div class="v-meta va">'+
        '<div class="v-meta-title">'+
        '<a target="_blank" href="'+data.url+'">'+data.title+'</a>'+
        '</div>'+
        '<div class="v-meta-entry">'+
        '<i title="播放" class="ico-statplay"></i><span class="v-num">';
        if(data.showing && !data.livehouse){
          _html+=data.people+'人正在观看';
        }else{
            _html+='<a target="_blank" href="'+data.url+'">查看详情</a>';
        }
        _html+='</span></div>'+
        '</div></div></div>';              
    }
    _xm_container.innerHTML = _html;
    });

    function xmloadingjs(url,callback,id) {
        var road = document.createElement('script');
        road.type = 'text/javascript';
        road.src = url;
        if(typeof id !='undefined') road.id = id;
        document.getElementsByTagName('head')[0].appendChild(road);
        if(road.readyState) {
            road.onreadystatechange = function() {
                if(road.readyState == 'loaded' || road.readyState == 'complete') {
                    road.onreadystatechange = null;
                    if(callback && Object.prototype.toString.call(callback)==='[object Function]') callback(road);
                }
            }
        }
        else {
            road.onload = function() {
                callback(road);
            }
        }
    }

})();
