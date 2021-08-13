
// (function() {
    console.log('main ~~~');

    // 获取 初始化 执行 dom 节点获取  
    const startCaiDom =  $('#startCai');
    const textarea_1 = $("#textarea_1");
    const box = $('#box');
    const getOrderList = $('#getOrderList');

    // 数据发送
    var sendMessageToBackground = function (action, options, callback) {
        chrome.runtime.sendMessage('', {sign: 'signDxm', action: action, data: options}, callback)
    };

    // 开始采集
    const startGatherDomInit =   (e) => {

        // 获取 文本内容
        var textarea_1_val = textarea_1.val();
        if(textarea_1_val) {
            getHtml(textarea_1_val, true, function(data) {
                console.log('1111111', data);
            })
        
        } else {
        alert('请输入地址--')

        }
    }

    startCaiDom.click(startGatherDomInit);


    getOrderList.click(function(res) {
        sendMessageToBackground('ok_1', null, function(data) {
            console.log('订单信息数据---', data);
        })
    })

    /**
     * 
     * @param {*} url 采集的网页地址
     * @param {*} sync 异步请求
     * @param {*} callback 回调
     */

    const getHtml = function (url, sync, callback) {

        const data = {
            url: url,
            try_times: 0,
            sync: sync == 'false' ? false : true
        };

        const getHtmlEnd = function(data){
            console.log('getHtmlEnd--', data);
            getHtmlSuccess(data);
        };

        sendMessageToBackground('getHtml', data, getHtmlEnd);

    }

    const getHtmlSuccess = (data) => {
        console.log('数据请求成功-- 开始进行数据解析', data);
        var div = $( '<div></div>' );
        div.html(data.html);
        console.log(div);
        box.html(div)
    }
 
    window.onload = function() {
    }

    // 结束 dom  发送过来的信息
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
            console.log(request);
            if(request.action === googlePluginEnumLibs.ORDER_LIST) {
                console.log('订单数据获取到了---', request.data);
                sendResponse('main - 收到 数据~~~')
                
            }
        
    })

// })()