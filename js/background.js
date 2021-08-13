console.log('背景页面执行--');

// 新标签 打开 插件页面-
let tabId = null;
chrome.browserAction.onClicked.addListener(function(){
    var main = chrome.extension.getURL("main.html");
    tabId ? chrome.tabs.update(tabId, {selected: true}) : chrome.tabs.create({"url": main}, function(tab){
        tabId = tab.id;
    });
});


var dataListOrder = null
// 监听来自content-script的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){

    if (request && request.sign === 'signDxm') {

         if(request.action === 'getHtml'){
            backEvent.getHtml(request.data, sendResponse);
            return true
        }

        if(request.action === 'postHtml'){
           backEvent.postHtml(request.data, sendResponse);
           return true
       }


    }
	
});

// 获取当前 执行的 tab 页面
var getTabs = function (callback) {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs){
        console.log(tabs);
        if(callback) callback(tabs.length ? tabs[0] : null)
    })
}

// 事件 对象
var backEvent = {

    getHtml: function(data, call) {

        console.log('开始进行 数据请求---', data);
        var url = data.url,
        try_times = data.try_times ,
        callback = data.callback,
        sync = data.sync == 'false' ? false : true;
        $.ajax({
            url: url,
            type: "GET",
            async: sync,
            timeout: 60000,
            data: {},
            success: function (data) {
                typeof(data) == "object" && (data = JSON.stringify(data));
                call({html: data});
            },
            complete: function (XMLHttpRequest, status) {
                if (status == 'timeout') {
                    try_times >= 3 ? call({html: ""}) :
                        setTimeout(function () {
                            var dataNew = {
                                url: url,
                                try_times: try_times + 1,
                                callback: callback
                            };
                            backEvent.getHtml(dataNew, call);
                        }, 5000);
                } else if (status == 'parsererror') {
                    var data = XMLHttpRequest.responseText;
                    call({html: data});
                } else if (status == 'error') {
                    call({html: ""});
                }
            }
        });
    },

    postHtml: function(data, call){
        var url = data.url,
            params = data.params,
            try_times = data.try_times ,
            async = data.sync == 'false' ? false : true;

        //console.log(params);
        $.ajax({
            url: url,
            type: "POST",
            timeout: 300000,
            async: async,
            data: params,
            dataType: "json",
            success: function (data) {
                call(data);
            }, error: function () {//增加访问出错信息返回
                call({"code": 0, "msg": ""});
            }
            ,
            complete: function (XMLHttpRequest, status) {
                if (status == 'error') {
                    call({"code": -1, "msg": "请求出错"});
                } else if (status == 'parsererror') {
                    call({"code": -1, "msg": "您的店小秘账号sk请先登录店小秘"});
                } else if (status == 'timeout') {
                    call({"code": 0, "msg": ""});
                }
            }
        });
    },
    
}




