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

$(function() {
    $('#check_json').click(function() { check_json(); });
});

$(function() {
  $('#test_scraper').click(function() { test_scraper(); });
});

$(function() {
  $('#check_biasRatings').click(function() { check_biasRatings(); });
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

function check_json(){
    var temp = JSON.stringify(testData);
    localStorage.setItem("biasRatings", temp);
    localStorage.removeItem("4/21/2022");
    alert('reset date')
}

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

  
async function test_scraper() {
  alert("scraper started")
  const cheerio = require('cheerio');
  async function makeGetRequest(url){

    const response = await fetch(url);
    const query = await response.text();
    // console.log(query);
  
    return query;
  }
    
  function putData(domain, title, rating, url) {
    data[domain] = {title: title, rating: rating[1], url: url};
  }
    
  var data = {};
  
  async function getData() {
    var pages = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
    // var pages = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99'];
  
  pages.forEach(function(page) {
    var url = 'https://www.allsides.com/media-bias/ratings?field_featured_bias_rating_value=All&field_news_source_type_tid%5B%5D=2&field_news_bias_nid_1%5B1%5D=1&field_news_bias_nid_1%5B2%5D=2&field_news_bias_nid_1%5B3%5D=3&title=';
    url = url + "&page=" + page;
    console.log("URL********** " + url);
    makeGetRequest(url).then(queryResult => {
  
      // var el = document.createElement( 'html' );
      // el.innerHTML = queryResult;
      // alert(typeof(queryResult));
      // alert(queryResult);
      //   alert(JSON.stringify(el.getElementsByClassName( 'source-title' ).parentNode.firstChild.nextSibling.firstChild.nextSibling.firstChild.nodeValue));

      // console.log(queryResult);
      // var parser = new DOMParser();
      // var htmlDoc = parser.parseFromString(queryResult, 'text/html');
      // do whatever you want with htmlDoc.getElementsByTagName('a');
      // alert((htmlDoc.getElementsByTagName( 'source-title' )[0].parentNode.childNodes[0].nextSibling.childNode[0].nextSibling.childNode[0].nodeValue));
      
      // var dom_nodes = $($.parseHTML((queryResult)));
      // alert(JSON.stringify(dom_nodes.find('.source-title')));
      // var dataObj = {title: null, rating: null, url: null};

      // var title_nodelist = htmlDoc.getElementsByClassName( 'source-title' );
      // alert(JSON.stringify(title_nodelist));

      var $ = cheerio.load(queryResult);
      
      // for (let i = 0; i < title_nodelist.length; i++) {
      // htmlDoc.getElementsByClassName( 'source-title' ).forEach(function(i, element) {
      $(".source-title").each(function (i, element) {
        // var element = title_nodelist.item(i);
        var title = element.parent.children[0].next.children[0].next.children[0].data;
        // alert("parsing underway 1");
        var rating = element.parent.children[2].next.children[0].next.children[0].attribs.title;
        // alert(title);
        // alert("parsing underway 2");
        // console.log('Title: ' + title);
        // console.log('Rating: ' + rating[1]);
  
        var rating = rating.split(': ');
  
  
        var link = element.parent.children[0].next.children[0].next.children[0].parent.attribs.href;
        // console.log(link);
        
        //we must go deeper to get the urls!!
  
        var pageLink = 'https://www.allsides.com' + link;
  
        console.log(pageLink);
  
        setTimeout(function(){
          // console.log("*******Querying to for url********");
  
        makeGetRequest(pageLink).then(queryResult => {
          // if (error) throw new Error(error);
          var $ = cheerio.load(queryResult);

          $("a").each(function (i, element) {
            try {

              // alert("entering try statement");
              if (element.children[0].attribs.style.match(/background-image*/)){
                var url = element.attribs.href;
                  
                  // alert("somewhat in try");

                // console.log(url);
                if (url.match(/^http:\/\//) || url.match(/^www\./) || url.match(/^https:\/\//)) {
                  // console.log("***OK");
                  var domain = url.replace(/^https?:\/\//,''); // Strip off https:// and/or http://
                  domain = domain.replace(/^www\./,''); // Strip off www.
                  domain = domain.split('/')[0]; // Get the domain and just the domain (not the path)
                  

                  setTimeout(function(){
                  // console.log("*******Put to Data********");
                  putData(domain, title, rating, url);}, 10000);
                }
              }
            } catch {
              // console.log("incorrect link");
              // Do nothing.
            }
  
          });
        });
            }, 2000);
      });
    });
  
  });
  return data;
  }
  
  async function writeData() {
    await localStorage.setItem('biasRatings', JSON.stringify(data), function (err) {
    // await console.log(JSON.stringify(data), function (err) {
      if (err) throw new Error(error);
      console.log('Writing to file...');
    });
  }
  
  async function buildJson(writeData) {
    
    getData(putData);
    // timeout for writing to file to ensure that all data is in memory before writing
    setTimeout(function(){
    alert("*******Wrote to file********");
    writeData();}, 90000);
    };
  
  buildJson(writeData);
  // alert("*******DONE********");
}

function check_biasRatings() {
  alert(localStorage.getItem('biasRatings'));
}