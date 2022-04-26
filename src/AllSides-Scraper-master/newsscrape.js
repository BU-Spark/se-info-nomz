// const request = require('request');
// var rp = require('request-promise'); //maybe later :)
const cheerio = require('cheerio');
// var lodash = require('lodash');
// var underscoreDeepExtend = require('underscore-deep-extend');
// var fs = require('fs');
const fetch = require('node-fetch');

// var _ = require('lodash');
// _.mixin({deepExtend: underscoreDeepExtend(_)});


async function makeGetRequest(url){

  const data = {};
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
  
    console.log(queryResult.length);
  // request(optionsPages, function (error, response, body) {
    // if (error) throw new Error(error);

    var $ = cheerio.load(queryResult);
    // console.log($);

    var dataObj = {title: null, rating: null, url: null};

    $('.source-title').each(function(i, element) {
      var title = element.parent.children[0].next.children[0].next.children[0].data;
      var rating = element.parent.children[2].next.children[0].next.children[0].attribs.title;
      
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
              if (element.children[0].attribs.style.match(/background-image*/)){
                var url = element.attribs.href;

                console.log(url);
                if (url.match(/^http:\/\//) || url.match(/^www\./) || url.match(/^https:\/\//)) {
                  console.log("***OK");
                  var domain = url.replace(/^https?:\/\//,''); // Strip off https:// and/or http://
                  domain = domain.replace(/^www\./,''); // Strip off www.
                  domain = domain.split('/')[0]; // Get the domain and just the domain (not the path)
                  

                  setTimeout(function(){
                  console.log("*******Put to Data********");
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
  await localStorage.setItem('biasRatings', "data = " + JSON.stringify(data), function (err) {
  // await console.log(JSON.stringify(data), function (err) {
    if (err) throw new Error(error);
    console.log('Writing to file...');
  });
}

async function buildJson(writeData) {
  
  getData(putData);
  // timeout for writing to file to ensure that all data is in memory before writing
  setTimeout(function(){
  console.log("*******Wrote to file********");
  writeData();}, 90000);
  };

buildJson(writeData);
console.log("*******DONE********");
