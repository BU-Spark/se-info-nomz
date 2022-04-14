$(function() {
    $('#btn_check').click(function() { checkCurrentTab(); });
});

$(function() {
    $('#query_allsides').click(function() { queryFunction(); });
});

$(function() {
    $('#display_urls').click(function() { log_urls(); });
});

$(function() {
    $('#display_bias').click(function() { log_bias(); });
});

$(function() {
    $('#reset_urls').click(function() { reset_urls(); });
});


function checkCurrentTab() {
    //alert('debug1!');
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        // gets current tab's url and stores in var url
        var url = tabs[0].url;
        $(".pg_url").text(url);

        alert(url);

        var jsonString = localStorage.getItem("InfoNomz");
        var jsonObject = JSON.parse(jsonString);
        jsonObject.urls.push(url);
        localStorage.setItem("InfoNomz", JSON.stringify(jsonObject));
        
        // request content_script to retrieve title element innerHTML from current tab
        chrome.tabs.sendMessage(tabs[0].id, "getHeadTitle", null, function(obj) {
            console.log("getHeadTitle.from content_script:", obj);
        });

    });
}

async function queryAllsides(){

    const response = await fetch('http://www.allsides.com/bias/bias-ratings?field_news_source_type_tid=2&field_news_bias_nid=1&field_featured_bias_rating_value=All&title=new york times');
    const query = await response.text();

    return query;
}

function queryFunction(){

    queryAllsides().then(queryResult => {
        var h = $("#test").html();
        //$("#test").html(h + "Test html response: " + queryResult);
        const pub_bias = parseBias(queryResult);
        $("#test").html(h + "Article bias: " + pub_bias);
    });

    // alert('debug');
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

function log_urls(){
    var current_json = JSON.parse(localStorage.getItem("InfoNomz"));
    $("#log_urls").html(current_json.urls.join(", "));
}

function reset_urls(){
    var current_json = JSON.parse(localStorage.getItem("InfoNomz"));
    current_json.urls = [];
    localStorage.setItem("InfoNomz", JSON.stringify(current_json));
    //console.log(javaObject);
    $("#log_urls").html("URLS Reset!");
    //alert(jQuery.type(jsonString));
}

function log_bias(){
    var bias_json = JSON.parse(localStorage.getItem("InfoNomz")).political_bias;
    $("#log_urls").html(JSON.stringify(bias_json));
}

function updateBias(bias_string){
    var current_json = JSON.parse(localStorage.getItem("InfoNomz"));
    //current_json.political_bias
}


/*
 * Parses the Bias of an allsides HTML response page.
 */
function parseBias(input_string){
    // create array of regex values for each political leaning on allsides
    const biases = [/media-bias\/left-center/, 
    /media-bias\/left/, 
    /media-bias\/right-center/, 
    /media-bias\/right/, 
    /media-bias\/center/];

    // create array of strings to return, respectively for each regex, above
    const bias_returns = ["Left Leaning",
    "Left",
    "Right Leaning",
    "Right",
    "Center"];

    // iterate through biases to check for each one.
    // *Note: the "___-center" biases are checked first because they are more specific.
    for (var i = 0; i < biases.length; i++){
        if (input_string.match(biases[i])) {
            return (bias_returns[i]);
        }
    }

    // If there are no matches, return default return
    return("NO MATCHES");
  }
