var request = require("request")
,		fs = require("fs")
,		subprocess = require("child_process").exec;

var argvSeparator = String(process.argv[2]).split(":");
var googleProvider = "http://www.google.com/doodles/json/"+argvSeparator[0]+"/"+ argvSeparator[1] +"?hl=es_419";

function formatSizeUnits(bytes){
  if      (bytes>=1000000000) {bytes=(bytes/1000000000).toFixed(2)+' GB';}
  else if (bytes>=1000000)    {bytes=(bytes/1000000).toFixed(2)+' MB';}
  else if (bytes>=1000)       {bytes=(bytes/1000).toFixed(2)+' KB';}
  else if (bytes>1)           {bytes=bytes+' bytes';}
  else if (bytes==1)          {bytes=bytes+' byte';}
  else                        {bytes='0 byte';}
  return bytes;
};
 
function getDoodles(path,url) {
	//is folder exist 
	request(url, function(error, res, body) {
		if (!error && res.statusCode == 200) {
			var doodles = JSON.parse(body);//convert string content to json
		//doodles is a array what content all doodles information
			if(!doodles[0]) console.log("Sorry google dont have doodles for this data:",argvSeparator[0]+"/"+argvSeparator[1]);
			doodles.forEach(function(doodle) {
		 	var url = "http:"+doodle.url;//url to do the request dont has the http:	
				var fsExtention = url.slice(url.length-3,url.length);//gif,jpg,png...	
				var bytesSize = 0;

		  request.get(String(url))
			.on("data",function(chuck) {
				//chuck is a buffer to content binary data of the file 
				//some thing like [a2,34,4,54......]
				bytesSize += chuck.length;
			})
			.on("end",function() {
				console.log(doodle.name, "is ready done");
				console.log(doodle.name,"have",formatSizeUnits(bytesSize));
			})
			.pipe(fs.createWriteStream(path+"/"+doodle["name"]+"."+fsExtention));
			}); 	
			//if request success 

		}else{
			console.log(new Error("Sorry something bad in the request to:"),url);
		};
 	});

};//end get doodle

subprocess('mkdir doodles')
	.on("close",function(){
		getDoodles("./doodles",googleProvider);
	});


















































	