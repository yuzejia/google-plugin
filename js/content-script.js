console.log('这是content script!');


    chrome.extension.onRequest.addListener(
        function (request, sender, sendResponse) {
            if (request.hello == "ok") {

                console.log(document);
                document.title = document.forms[0].kw && document.forms[0].kw.value + "|" + new Date().getTime();
                sendResponse({ kw: document.forms[0].kw.value});
                sendMessageToBackground()
                return true;
            }
        }
    ); 
 
    // // 获取百度点击 事件 获取 搜索内容
    // document.getElementById('su').onclick = (e) => {
    //     console.log('点击触发 ');
    //    const v =  document.forms[0].kw.value;
    //    console.log(v);

    //    sendMessageToBackground('m_1')
    // }


    // // 向 back 后台发送数据
    // function sendMessageToBackground(key, message) {
    //     chrome.runtime.sendMessage({
    //         name: key,
    //         greeting: message || '你好，我是content-script呀，我主动发消息给后台！'
    //     }, function(response) {
    //         console.log('收到来自后台的回复：' + response);
    //     });
    // }


