function onInstall(e) {
  onOpen(e);
}

function onOpen(e) {
  SpreadsheetApp.getUi().createAddonMenu()
      .addItem('Choose Image', 'showSidebar')
      .addToUi();
}

function showSidebar() {
  var ui = HtmlService.createHtmlOutputFromFile('sidebar')
      .setTitle('Pixel Sheet');
  SpreadsheetApp.getUi().showSidebar(ui);
}

function getData(url,width,y,x,s){
  Logger.log("getting: "+url);
  var data = {
    'url': url,
    'width': width
  }
  var options = {
    'method' : 'post',
    'contentType': 'application/json',
    'payload' : JSON.stringify(data)
  };
  var map = JSON.parse(UrlFetchApp.fetch('http://test-temptest.7e14.starter-us-west-2.openshiftapps.com', options).getContentText());
  
  printMap(map,parseInt(x),parseInt(y),parseInt(s));
}

function printMap(map, xi, yi,s){
  if(map.error){
    Logger.log(map.error);
    throw "error getting image";
  }
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var last = sheet.getLastColumn();
  if(last==0)last++;
  if(map.data.length > (last-xi)){sheet.insertColumnsAfter(last,(map.data.length-last+xi));}
  
  for (var x = 0;x < map.data.length; x++){
    sheet.setColumnWidth(x+1+xi,s);
    for (var y = 0;y < map.data[0].length; y++){
      if(x==0){sheet.setRowHeight(y+1+yi,s)};
  //    if(map.data[x][y].r&&map.data[x][y].g&&map.data[x][y].b)
        sheet.getRange(yi+y+1,xi+x+1).setBackgroundRGB(map.data[x][y].r,map.data[x][y].g,map.data[x][y].b);
    }
  }
}