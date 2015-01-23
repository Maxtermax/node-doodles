#!/usr/bin/env node
var errorCode = require("./error.json")
  , doodles   =  require("commander")
  , mkdirp    =  require("mkdirp")
  , _         =  require("underscore")
  , fs        =  require("fs")
  , util       =  require("util")
  , path      =  require("path")
  , request   =  require("request")
  var doodlesDir = "./doodles";

function range (val) {
  var ranges = val.split('..').map(Number);//[min,max]
  return  _.range( _.min(ranges) , _.max(ranges)+1 );
  /*
  TEST
    1-  var ranges = '2010..2012';
        range(ranges) //[2010,2011,2012,2013]
    
    2-  var ranges = '2012..2010';
        range(ranges) //[2010,2011,2012,2013]
  */
};//return range from a to b numbers

doodles
  .version(require('../package').version)
  .description("fetch all doodles of an specific month in a year")
  .option("-y, --year <n>", "Year")//get and save year in doodle from the arguments
  .option("-m, --month <n>", "Month")//get and save month in doodle from the arguments
  .option("-r, --range <a>..<b>", "return a range from a to b number separated by ..", range)
  .parse(process.argv);
  //promise things 

if (!doodles.year) {
  console.error("Please provide a year");
  process.exit(1);
}

if (!doodles.month) {
  console.error( "Please provide a month" );
  process.exit(1);
}

var toJson = function(json){
  try {
    return JSON.parse(json); 
  } catch (e) {
    console.error( color.error("There was a problem processing the doodles response: %s"), err.message);
  };  
}//parse string As Json

var noDoodles = function() {
  console.error(errorCode.status["404"] ,doodles.year, doodles.month);
  process.exit(1);
};//The program ends when no images

var formatSizeUnits = function(bytes) {
  if      (bytes>=1000000000) {bytes=(bytes/1000000000).toFixed(2)+' GB';}
  else if (bytes>=1000000)    {bytes=(bytes/1000000).toFixed(2)+' MB';}
  else if (bytes>=1000)       {bytes=(bytes/1000).toFixed(2)+' KB';}
  else if (bytes>1)           {bytes=bytes+' bytes';}
  else if (bytes==1)          {bytes=bytes+' byte';}
  else                        {bytes='0 byte';}
  return bytes;
};//convert for human 

var download = function(doodle,index,matrix) {
  var url         = util.format("http:%s", doodle.url) //url doesn't have the protocol information
  ,   fsExtention = url.slice(url.length - 3, url.length) //gif,jpg,png...
  ,   bytesSize   = 0
  ,   filename    = path.join(doodlesDir, util.format("%s.%s", doodle["name"], fsExtention));

  request.get(url)
  .on("data", function(chunk) {
    // chunk is a buffer to content binary data of the file
    // something like [a2,34,4,54......]
    bytesSize += chunk.length;
  })
  .on("end", function() {
    console.log( doodle.name,"done");
    console.log( doodle.name,"length is",formatSizeUnits(bytesSize));
  })
  .pipe(fs.createWriteStream(filename));
};//download the doodles into the doodles folder

var requestHandler = function(err,res,body) {
  if (!err && res.statusCode === 200) {
    var PicDoodles = toJson(body);// PicDoodles is an array with all the doodles information
    if (_.isEmpty(PicDoodles)) noDoodles(); 
    PicDoodles.forEach(download);
  }else {
    console.error(errorCode.status["500"], url);
  };
};

var getDoodles = function(dir,url) {
  request(url,requestHandler);
};//main function 


module.exports = function() {
  mkdirp(doodlesDir, function (err) {
    var googleProvider = util.format("http://www.google.com/doodles/json/%s/%s?hl=es_419", doodles.year, doodles.month);
    if (err) {
      console.error( "There was an error creating the doodles folder: %s", err.message);
      process.exit(1);
    }
    getDoodles(doodlesDir, googleProvider);
      //normal way
  }); 
};































