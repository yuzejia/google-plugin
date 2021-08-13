let element = document.createElement('div')
let attr =  document.createAttribute('id')
attr.value = 'appPlugin'
element.setAttributeNode(attr)

document.getElementsByTagName('body')[0].appendChild(element)

console.log(element);
var app = new Vue({
    el: '#appPlugin',
    data: {
        title:'pageon'
    }
  })