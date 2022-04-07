chrome.runtime.onMessage.addListener(function(cmd, sender, sendResponse) {

    switch(cmd) {
    // sendResponse retrieves document HTML and sends back to popup.js
    case "getHtml":
        sendResponse({title: document.title, url: window.location.href, html: document.documentElement.innerHTML});
        break;
    case "getHeadTitle":
        sendResponse(document.getElementsByTagName("title")[0].innerHTML);
        break;      
    default:
        sendResponse(null);
    }
});