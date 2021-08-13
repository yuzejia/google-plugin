console.log('dom ----');

setTimeout(() => {
    const J =   $('#J_bought_main').find('span[data-nick]').html('<span class="dxm-btn dxm-btn-primary dxm-fetch-btn dxmFetchBtn bindPlatformOrder" style="padding: 0 5px;color: #428bac; cursor: pointer;">' +
    '<span style="display:inline-block;margin-top:2px;width: 15px;height: 15px;vertical-align:top;">' +
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 46" enable-background="new 0 0 50 46"><path d="M25 0c1 0 1.7.3 2.3 1 .6.6 1 1.3 1 2.2 0 1-.4 1.7-1 2.3-.6.6-1.4 1-2.3 1-1 0-1.6-.4-2.3-1-.6-.6-1-1.4-1-2.3 0-1 .4-1.6 1-2.3.7-.7 1.4-1 2.3-1z" fill-rule="evenodd" clip-rule="evenodd" fill="#FFF"/><path d="M25 15c-.6 0-1.2-.6-1.2-1.4V6.2c0-.8.6-1.4 1.3-1.4.8 0 1.4.6 1.4 1.4v7.4c0 .8-.6 1.4-1.3 1.4z" fill="#FFF"/><path d="M41 46H9c-1.8 0-3.2-.6-4.4-1.8C3.4 43 2.8 41.5 2.8 40V18c0-1.8.6-3.2 1.8-4.4 1.2-1.2 2.6-1.8 4.3-1.8h32c1.8 0 3.3.6 4.5 1.8 1.2 1.2 1.8 2.6 1.8 4.3v22c0 1.5-.6 3-1.8 4.2-1.2 1.2-2.7 1.8-4.4 1.8zM9 15.2c-1 0-1.5.3-2 .8-.5.6-.8 1.2-.8 2v22c0 .6.3 1.2.8 1.8.5.5 1 .8 2 .8h32c1 0 1.5-.3 2-.8.6-.6.8-1.2.8-2V18c0-.6-.2-1.2-.8-1.8-.5-.5-1-.8-2-.8H9z" fill="#FFF"/><path d="M16.7 13c0-1.4 1-2.2 3.2-2.2h10c2 0 3.2.8 3.2 2.3H16.7zM4.8 22.7V35H2.3C.8 35 0 34.2 0 32.6V25c0-1.6.8-2.3 2.3-2.3h2.5zM47.7 22.7c1.5 0 2.3.7 2.3 2.3v7.6c0 1.6-.8 2.4-2.3 2.4h-2.5V22.7h2.5zM13.3 22.8c.6-.6 1.3-1 2-1 1 0 1.7.5 2.3 1.3.6 1 1 2 1 3s-.4 2-1 3c-.6.7-1.4 1-2.3 1-.8 0-1.6-.3-2.2-1-.5-1-.8-2-.8-3 0-.6 0-1 .2-1.6.5-1 .7-1.2 1-1.6zM36.7 22.8c-.6-.6-1.2-1-2-1-1 0-1.6.5-2.2 1.3-.7 1-1 2-1 3s.3 2 1 3c.6.7 1.3 1 2.2 1 1 0 1.6-.3 2.2-1 .5-1 .8-2 .8-3 0-.6 0-1-.2-1.6-.5-1-.7-1.3-1-1.6zM28.2 33.2c-.5 2-1.5 3-3 3.3-1.6 0-2.7-1.2-3.3-3.3 2 2.4 4.2 2.4 6.2 0z" fill-rule="evenodd" clip-rule="evenodd" fill="#FFF"/></svg>' +
    '</span> 关联采购单</span>');

    // 获取订单列表
    const list = $('#tp-bought-root .js-order-container');
    console.log('订单列表list ---', list);

    order_list(list);


}, 1000);

// 获取订单详情信息
var orderList = [];

var order_list = function(list) {
    let order_obj = {
        time: null,
        name: null,
        order_id: null
    }

    const listData = $(list).find('div[data-id]');
    console.log('listData---', listData);

    for (let index = 0; index < list.length; index++) {
        
        // 获取每项的订单号
        const order_id = orderIdList(list[index]);
        order_obj.order_id = order_id;

        // 获取每项的 日期
        const time = timeName(list[index]);
        order_obj.time = time;

        orderList.push(order_obj);
    }


    // 订单号 dom 

    
    console.log('订单号列表 获取成功---', orderList);


}

// 获取订单号
function orderIdList(item) {
    const orderId = $(item).find('.bought-wrapper-mod__head-info-cell___29cDO>span:first>span:last').text();
    return orderId;
}

// 获取订单日期
function timeName(item) {
    const time = $(item).find('.bought-wrapper-mod__head-info-cell___29cDO>.bought-wrapper-mod__checkbox-label___3Va60>span:last').text();
    return time;
}