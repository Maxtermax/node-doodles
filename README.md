![Alt text]( https://pbs.twimg.com/media/B8AuB46IIAANL63.png:large  "doodle 2015")

overview
============
This is a small module with which you can harness the REST API for google images known as doodles, can get images specifying the year and month of the doodle you want.

This program has no malicious intent, with which it may be problematic to google servers.
 

## Getting Started
Run following commands:

* **Install node-doodles via npm** 
 

 `npm install node-doodles -g`
 
 
* **Or cloning the git repository** 
 

`git clone https://github.com/Maxtermax/node-doodles.git`

* **Usage** 
 Run the main directive in the command prompt

  `doodles` 

   if you get this error:

  `Please provides a year`


   is ok, mean the module was installed fine, when you execute that command node-doodles start to question two simples things    for make a request to API-REST from google and get the doodles, the firt thing is the year of the doodle image wanna get     and the second thing is he month.
   
   to say that to node-doodles you must pásaselo as parameters as follows:


   `doodles -y 2014 -m 12`

    or   

   `doodles --year 2014 --month 12`

  now exist one folder in you system calls doodles this folder is in the place where you executed the previous command. in case google doesn't have doodle for one date node-doodle tell it and the program will be end.
 
 too can get doodles from a range a time with:
  `doodles -Y 2014..2015 -M 1..2`   
 note this way is make reference to the date with Y and M for year and month in uppercase
 
  

## How it works
Node-doodles make one ´GET´ request to google API-REST and then search the images called doodles,and then with help node.js  the program make a folder called doodles and finally download all images required. 

## Conclusion
for future versions more advanced commands are expected to make smarter obtaining doodles that existed over a range of time and things like that searches.

This program is open source, whoever look at the source code could do it and help it if he so wills.

Acknowledgements to [julian david duque](https://github.com/julianduque "julian david duque")  for their contributions and tips for node-doodles.

