$(function() {
    $('#btn_check').click(function() { checkCurrentTab(); });
});

function checkCurrentTab() {
    // alert('debug1!');
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        // gets current tab's url and stores in var url
        var url = tabs[0].url;
        $(".pg_url").text(url);

        // alert('URL:');
        alert(url);
        // alert('AFTER URL');
        
        // request content_script to retrieve title element innerHTML from current tab
        chrome.tabs.sendMessage(tabs[0].id, "getHeadTitle", null, function(obj) {
            console.log("getHeadTitle.from content_script:", obj);
        });

    });
}

// inject contentscripts into current tab
document.addEventListener('DOMContentLoaded', function () {
    chrome.windows.getCurrent(function (currentWindow) {
        chrome.tabs.query({active: true, windowId: currentWindow.id}, function(activeTabs) {
            // alert('inside chrome tabs query');
            // alert(activeTabs[0].id);
            chrome.tabs.executeScript(activeTabs[0].id, {file: "scripts/contentScript.js", allFrames: false});
            // alert('after chrome tabs execute Script');
        });
    });
});

function log(txt) {
    var h = $("#log").html();
    $("#log").html(h+"<br>"+txt);
}