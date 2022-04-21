const request = require('request');
// var rp = require('request-promise'); //maybe later :)
const cheerio = require('cheerio');
var lodash = require('lodash');
var underscoreDeepExtend = require('underscore-deep-extend');
var fs = require('fs');
const fetch = require('node-fetch');

var file = fs.createWriteStream('biasRatings.json');

var _ = require('lodash');
_.mixin({deepExtend: underscoreDeepExtend(_)});

const queryAllsides = async function(url){
  let returnValueRaw = await fetch(url);
  let returnValue = await returnValueRaw.text();
  return returnValue;
}

const queryAllsides2 = function (value){
  return new Promise(function (resolve, reject) {
      const options = {
          method: 'GET',
          url: value
      }

      request(options, function(error, response, body){
          if(error)
              throw new Error(error)
          else{
              resolve(body)
          }
      })
  })
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

  queryAllsides2(url).then(queryResult => {
  
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

      queryAllsides(pageLink).then(queryResult => {
        // if (error) throw new Error(error);
          if(queryResult){
            console.log('DEBUGURL'+ pageLink)
            console.log('Query Result: ' + queryResult);
          }else{
            console.log('Nothing returned for get request');
          }
          var $ = cheerio.load(queryResult);

          $("a").each(function (i, element) {
            // console.log("HELOOOOOOOOOOOOOOOOOOOOOOOOOOo");
            // Make sure the element has a child (otherwise it is the wrong link)
            if (element.children[0] != undefined) {
              // Make sure the child has attributes (otherwise it is the wrong link)
              if (element.children[0].attribs != undefined) {
                var image = element.children[0].attribs.style;
                // Make sure the style attribute is not undefined (otherwise it is the wrong link)
                if (image != undefined) {
                  // Make sure the image style is "background-image ..." (otherwise it is the wrong link)
                  if (image.match(/background-image*/)){
                    var url = element.attribs.href;
                    if (url != undefined) {
                      console.log(url);
                      if (url.match(/^http:\/\//) || url.match(/^www\./) || url.match(/^https:\/\//)) {
                        console.log("***OK");
                        var domain = url.replace(/^https?:\/\//,''); // Strip off https:// and/or http://
                        domain = domain.replace(/^www\./,''); // Strip off www.
                        domain = domain.split('/')[0]; // Get the domain and just the domain (not the path)
                        

                        setTimeout(function(){
                        console.log("*******Put to Data********");
                        putData(domain, title, rating, url);}, 10000);
                      }else{
                        console.log('debug if 6');
                      }
                    }else{
                      console.log('debug if 5');
                    }
                  }else{
                    console.log('debug if 4');
                    console.log(url);
                  }
                }else{
                  // console.log('debug if 3');
                }
              }else{
                // console.log('debug if 2');
              }
            }else{
              console.log('debug if 1');
            }
          });

          // write to file
          // fs.writeFileSync('biasRatings.json', JSON.stringify(data), function (err) {
          //   if (err) throw new Error(error);
          //   // console.log('Writing to file...');
          // });
      });
          }, 9000);
    });
  });

});
return data;
}

function writeData() {
  fs.writeFileSync('biasRatings.json', JSON.stringify(data), function (err) {
    if (err) throw new Error(error);
    console.log('Writing to file...');
  });
}

function buildJson(writeData) {
  getData(putData);
  setTimeout(function(){
  console.log("*******Wrote to file********");
  writeData();}, 60000);
  };

buildJson(writeData);
console.log("*******DONE********");
