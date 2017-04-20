// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting
var helpers = require('../helpers/archive-helpers.js');


exports.fetcher = function () {
  helpers.readListOfUrls(helpers.downloadUrls);
};


// readListOfUrls(downloadUrls)