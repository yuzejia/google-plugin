eruda.init();

console.log('popup 执行~~');

document.getElementById('get_current_tabs').onclick = ( e ) => {
  chrome.tabs.query({
      active: true,
      currentWindow: true
  }, function(t) {
      console.log(t);
  })
   const bg = chrome.extension.getBackgroundPage();
   bg.getTabs((tab) => {
       console.log(tab);
   })
}


document.getElementById('get_doc_title').onclick = (e) => {
        chrome.tabs.getSelected(null, function (tab) {
            chrome.tabs.sendRequest(tab.id, { "hello": "ok" }, function (response) {
                document.getElementById('text').innerHTML = response.kw;
            });
        });
}


// 监听来自content-script的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{


    if(request.name === 'm_1' ) {
        console.log('m_1', request.greeting);
    } else {
        console.log('收到来自content-script的消息：');
        console.log(request, sender, sendResponse);
        sendResponse('我是后台，我已收到你的消息：' + JSON.stringify(request));
    }
	
});





