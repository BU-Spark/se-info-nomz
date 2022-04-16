const request = require('request');
// var rp = require('request-promise'); //maybe later :)
const cheerio = require('cheerio');
var lodash = require('lodash');
var underscoreDeepExtend = require('underscore-deep-extend');
var fs = require('fs');

var file = fs.createWriteStream('biasRatings.txt');

var _ = require('lodash');
_.mixin({deepExtend: underscoreDeepExtend(_)});

var data = {};

var options = { method: 'GET',
  url: 'https://www.allsides.com/bias/bias-ratings',
  qs: 
   { field_news_source_type_tid: '2',
     field_news_bias_nid: '1',
     field_featured_bias_rating_value: 'All',
     title: ''
   },
  form: {} };

['', '1', '2'].forEach(function(page) {
  
  var optionsPages = _.deepExtend(options, {qs: {page: page}});

  request(optionsPages, function (error, response, body) {
    if (error) throw new Error(error);

    var $ = cheerio.load(body);
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

      var options = { method: 'GET',
        url: pageLink
      };

      request(options, function (error2, response, body2) {
        if (error2) throw new Error(error);

          var $ = cheerio.load(body2);
          var test_string = $('body').html();

          console.log(test_string);

          var doc = $(test_string);
          var links = $('a', doc);

          console.log(links);

          // $('#dynamic-grid').each(function (j, element2) {
          //   console.log("Hello");
          //   var url = element2.attribs.href;
          //   console.log(url);
          //   var domain = url.replace(/^https?:\/\//,''); // Strip off https:// and/or http://
          //   domain = domain.replace(/^www\./,''); // Strip off www.
          //   domain = domain.split('/')[0]; // Get the domain and just the domain (not the path)
            
          //   console.log('Title: ' + title);
          //   console.log('Rating: ' + rating[1]);
          //   console.log('url: ' + url);

          //   data[domain] = {title: title, rating: rating[1], url: url}; 
          // });

          //write to file
          fs.writeFile('biasRatings.json', JSON.stringify(data), function (err) {
            if (err) throw new Error(error);
            console.log('Writing to file...');
          });
      });
      
    });
  });
})

