var arrayAds = new Array('utm_source', 'utm_medium', 'utm_term', 'utm_content', 'utm_campaign', 'hmsr');

function detectDuty() {
  var queryInfo = {
    currentWindow: true,
    active: true
  };
  chrome.tabs.query(queryInfo, function(tab) {
    cleanDuty(tab[0]);
  });
}
//chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
chrome.webNavigation.onCommitted.addListener(function(details) {
  //detectDuty(); 
  //alert(JSON.stringify(details)); 
  chrome.tabs.get(details.tabId, function(tab) {
    cleanDuty(tab); 
  }); 
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
  //detectDuty(); 
  //alert(JSON.stringify(activeInfo)); 
  chrome.tabs.get(activeInfo.tabId, function(tab) {
    cleanDuty(tab); 
  }); 
}); 

chrome.webNavigation.onCompleted.addListener(function(tab) {
  var queryInfo = {
    currentWindow: true,
    active: true
  };
  chrome.tabs.query(queryInfo, function(tab) {
    xituEx(tab[0]);
  });

}); 

function xituEx(tab) {
  
}

function cleanDuty(tab) {
  var components = tab.url.split('?');
  var baseUrl = components[0];
  var queries = components[1].split('&');
  var newQuery = '?';
  queries.forEach(function(item, index, array) {
    newQuery += checkAds(item);
  });

  if (newQuery == '?') {
    newQuery = '';
  } else {
    newQuery = newQuery.substring(0, newQuery.length - 1);
  }
  var newUrl = baseUrl + newQuery;
  if (newUrl != tab.url) {
    chrome.tabs.update(tab.id, {
      url: baseUrl + newQuery
    });
  }
}

function checkAds(query) {
  /* 
  arrayAds.forEach(function(item, index, array) {
    if (query.startsWith(item)) {
      return '';
    }
  });
  */
  /*
  for (i = 0; i < arrayAds.length; i++) {
    if (query.startsWith(arrayAds[i])) {
      return ''; 
    }
  }
  return query + '&';
  */
  return arrayAds.filter(function(item) {
    return query.startsWith(item); 
  }).length == 0 ? (query + '&') : ''; 
}
