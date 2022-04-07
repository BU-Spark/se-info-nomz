chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    // alert(changeInfo.url);
    // alert('alert 1');
});

chrome.tabs.onActivated.addListener(function(activeInfo){
    chrome.tabs.get(activeInfo.tabId, function(tab){
        // alert(tab.url);
        // alert('alert 2');
    });
});

chrome.webNavigation.onTabReplaced.addListener(function(activeTab){
    chrome.tabs.get(activeTab.tabId, function(tab){
        // alert(tab.url);
        // alert('alert 3');
    });
});