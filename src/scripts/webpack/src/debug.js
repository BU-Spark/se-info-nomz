/**
 * This page is meant strictly for debugging and many of these functions may be deprecated.
 */
$(function() {
    $('#btn_check').click(function() { checkCurrentTab(); });
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

// gets current tab's url
function checkCurrentTab() {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        
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

/**
 * This function was primarily derrived from the following allsides scraper by sautumn on github.
 * See the source here: https://github.com/sautumn/AllSides-Scraper
 * Several adjustments were made to their code, as it was very old and not optimized.
 * The button "test scraper" runs this function on the debug tab, takes around 2-3 minutes for it to create
 * the biasRatings json and write it into local storage; there will be an alert at the end that signals when
 * the function has finished writing to local storage
 */  
async function test_scraper() {
  alert("scraper started")

  // Cheerio is a package that helps with HTML parsing when we query allsides
  const cheerio = require('cheerio');

  // simple function to make a get request to the input url.
  async function makeGetRequest(url){

    const response = await fetch(url);
    const query = await response.text();
    // console.log(query);
  
    return query;
  }
    
  // writes data into the 'data' dictionary/hash object declared below
  function putData(domain, title, rating, url) {
    data[domain] = {title: title, rating: rating[1], url: url};
  }
    
  var data = {};
  
  // gets data from all of the Allsides pages (currently there are 11 pages of data, hence the 11)
  async function getData() {
    var pages = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
    // var pages = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99'];
  
  pages.forEach(function(page) {
    var url = 'https://www.allsides.com/media-bias/ratings?field_featured_bias_rating_value=All&field_news_source_type_tid%5B%5D=2&field_news_bias_nid_1%5B1%5D=1&field_news_bias_nid_1%5B2%5D=2&field_news_bias_nid_1%5B3%5D=3&title=';
    url = url + "&page=" + page;
    console.log("URL********** " + url);
    // uses .then to ensure that operations are performed in the correct order, since JS is asynchronous.
    makeGetRequest(url).then(queryResult => {

      // load the html response so that it can be parsed with cheerio
      var $ = cheerio.load(queryResult);

      // parse the page for the 'source-title' class name, since this is a unique identifier on Allsides' media biases page
      $(".source-title").each(function (i, element) {
        var title = element.parent.children[0].next.children[0].next.children[0].data;
        var rating = element.parent.children[2].next.children[0].next.children[0].attribs.title;
  
        var rating = rating.split(': ');
  
        var link = element.parent.children[0].next.children[0].next.children[0].parent.attribs.href;

        //we must go deeper to get the urls!!

        var pageLink = 'https://www.allsides.com' + link;
        
        // Timeout function to ensure that things do not happen out of order.
        setTimeout(function(){
  
        makeGetRequest(pageLink).then(queryResult => {
          // load the html response so that it can be parsed with cheerio
          var $ = cheerio.load(queryResult);

          // searching for the 'a' html tag to search for the correct link to the publisher's website.
          $("a").each(function (i, element) {
            try {
              if (element.children[0].attribs.style.match(/background-image*/)){
                var url = element.attribs.href;

                if (url.match(/^http:\/\//) || url.match(/^www\./) || url.match(/^https:\/\//)) {
                  var domain = url.replace(/^https?:\/\//,''); // Strip off https:// and/or http://
                  domain = domain.replace(/^www\./,''); // Strip off www.
                  domain = domain.split('/')[0]; // Get the domain and just the domain (not the path)
                  
                  // another timeout to make sure things go in order (CURSE YOU JS ASYNCHRONICITY)
                  setTimeout(function(){
                  // write data to dictionary
                  putData(domain, title, rating, url);}, 10000);
                }
              }
            } catch {
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
  
  /**
   * Writes data in the 'data' dictionary to the local storage of the browser.
   * This writes with the key of 'biasRatings'
   */
  async function writeData() {
    await localStorage.setItem('biasRatings', JSON.stringify(data), function (err) {
      if (err) throw new Error(error);
      console.log('Writing to file...');
    });
  }
  
  /**
   * effective "main" function for this scraper test
   */
  async function buildJson(writeData) {
    getData(putData);
    // timeout for writing to file to ensure that all data is in memory before writing
    setTimeout(function(){
    alert("*******Wrote to file********");
    writeData();}, 90000);
    };
  
  buildJson(writeData);
}

/**
 * outputs the biasRatings json from local storage (if it exists).
 */
function check_biasRatings() {
  alert(localStorage.getItem('biasRatings'));
}