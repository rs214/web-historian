var fs = require('fs');
var path = require('path');
var _ = require('underscore');
// var http = require('http');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!


// exports.readListOfUrls(exports.downloadUrls) downloads html
// exports.isUrlArchived(url) adds url to downloads list if it is unarchived


exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf8', (err, data) => {
    var urlArray = data.split('\n');
    callback(urlArray);
  });
};

// executes callback if url isnt in list
exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls((sites) => {
    var found = _.any(sites, function (site, i) {
      return site.match(url);
    });
    callback(found);
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, url + '\n', function(err, file) {
    callback();
  });
};

exports.isUrlArchived = function(url, callback) {
  fs.readFile(`${exports.paths.archivedSites}/${url}`, 'utf8', (err, data) => {
    console.log('isUrlArchived:', url);
    callback(err, data);
  });
};

exports.downloadUrls = function(urlArray) { // urls is array ['www.google.com', 'www.facebook.com']

  for (var url of urlArray) {
    request('http://' + url, function (error, response, body) {
      if (!error) {
        console.log('downloadUrls:', url);
        fs.writeFile(`${exports.paths.archivedSites}/${url}`, body, (err) => {
          // if (err) { console.log(err); }
        });
      }
    });
  }
  fs.writeFile(exports.paths.list, '', (err) => {
    if (err) { console.log(err); }
  });
};





