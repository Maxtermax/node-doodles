#!/usr/bin/env node

var doodles = require("commander")
  , request = require("request")
  , mkdirp  = require("mkdirp")
  , path    = require("path")
  , util    = require("util")
  , fs      = require("fs");

doodles
  .version(require('./package').version)
  .description("fetch all doodles of an specific month in a year")
  .option("-y, --year <n>", "Year")
  .option("-m, --month <n>", "Month")
  .parse(process.argv);

if (!doodles.year) {
  console.error("Please provide a year");
  process.exit(1);
}

if (!doodles.month) {
  console.error("Please provide a month");
  process.exit(1);
}

var googleProvider = util.format("http://www.google.com/doodles/json/%s/%s?hl=es_419", doodles.year, doodles.month);
var doodlesDir = "./doodles";

function formatSizeUnits(bytes) {
  if      (bytes>=1000000000) {bytes=(bytes/1000000000).toFixed(2)+' GB';}
  else if (bytes>=1000000)    {bytes=(bytes/1000000).toFixed(2)+' MB';}
  else if (bytes>=1000)       {bytes=(bytes/1000).toFixed(2)+' KB';}
  else if (bytes>1)           {bytes=bytes+' bytes';}
  else if (bytes==1)          {bytes=bytes+' byte';}
  else                        {bytes='0 byte';}
  return bytes;
}

function getDoodles(dir, url) {
  //is folder exist
  request(url, function(error, res, body) {
    if (!error && res.statusCode == 200) {
      var doodles;
      try {
        doodles = JSON.parse(body); //convert string content to json
      } catch (e) {
        console.error("There was a problem processing the doodles response: %s", err.message);
      }

      // doodles is an array with all the doodles information
      if (!doodles[0]) {
        console.error("Sorry google don't have doodles for this date: %s/%s", doodles.year, doodles.month);
        process.exit(1);
      }

      doodles.forEach(function(doodle) {
        var url = util.format("http:%s", doodle.url); //url doesn't have the protocol information
        var fsExtention = url.slice(url.length - 3, url.length); //gif,jpg,png...
        var bytesSize = 0;
        var filename = path.join(dir, util.format("%s.%s", doodle["name"], fsExtention));

        request.get(url)
          .on("data", function(chunk) {
            // chunk is a buffer to content binary data of the file
            // something like [a2,34,4,54......]
            bytesSize += chunk.length;
          })
          .on("end", function() {
            console.log(doodle.name, "done");
            console.log(doodle.name, "length is", formatSizeUnits(bytesSize));
          })
          .pipe(fs.createWriteStream(filename));
      });
    } else {
      console.error("Sorry, something went wrong with the request to: ", url);
    }
  });
}

mkdirp(doodlesDir, function (err) {
  if (err) {
    console.error("There was an error creating the doodles folder: %s", err.message);
    process.exit(1);
  }

  getDoodles(doodlesDir, googleProvider);
});














































