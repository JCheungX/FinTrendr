"use strict";

const request = require('request');
const Correlation = require('node-correlation');
const qs = require('querystring');
const db = require('./db/db-model');

module.exports = {
  getResult: function(req, res) {
    let keyword = req.query.keyword;

    db.getKeyword({keyword: keyword}).then((data) => {
        //handle response if it already exists
    }).catch((err) => {
        console.log('no result found', err);
        db.getKeyword({}).then( (data) => {

    let url = 'http://www.google.com/trends/fetchComponent?hl=en-US&geo=US&q=' + keyword + '&cid=TIMESERIES_GRAPH_0&export=3';

    request.get(url, function(err, response, body) {
      if (err) {
        res.send('Error making a get request to google trends');
      } else {
        console.log('the request return with', body.slice(61));
        let info = eval(body.slice(61));
        let results = [];
        for (var i = 26; i > 2; i--) {
          results.push(info.table.rows[info.table.rows.length - i].c[1].v);
        }
        let max = 100 / Math.max.apply(Math, results);
        let scaledArray = results.map(function(result) {
          return result * max;
        });

        let updated = {};

        data.forEach(function(node) {
            let numberArray = []
            node.data.forEach(function(dateObj) {
                let parsedObj = JSON.parse(dateObj);
                for(var key in parsedObj) {
                    numberArray.push(parsedObj[key])
                }
            });
            let max = Math.max.apply(Math,numberArray);
            updated[node.keyword] = [];
            for(var i = 0; i < numberArray.length; i++) {
                if(Number.isNaN(numberArray[i]/max*100)) {
                   updated[node.keyword].push(.01) 
                } else {
                updated[node.keyword].push(numberArray[i]/max*100);
                }
            }   
        });

        var corrObj = {};
        for(var keyword in updated) {
            corrObj[keyword] = Correlation.calc(updated[keyword], scaledArray);
        }
        res.send({ corr: corrObj });
        }
    })
    });
    });
  }

};
