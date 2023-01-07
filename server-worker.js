
// 確認使用者瀏覽器是否支援 推播通知
if(!('Notification' in window)){
  console.log('this browser does not support notification!')
}


// 授權彈窗設定
var notifyConfig = {
  body: '\\ ^o^ /',
  icon: './favicon.ico',
  tag: 'new Arrival'
}

// 請求授權，若還沒授權過，就問他願不願意
if(Notification.permission === 'default' || Notification.permission === 'underfined'){
  Notification.requestPermission(function(permission){
    // 執行授權處理
    // 建立請求授權的實體
    var myNotify = new Notification("Hi there!", notifyConfig)

    // 點擊通知後導向某個頁面
    myNotify.onclick = function(e){
      e.preventDefault()
      window.open('https://google.com')
    }
  })
}

