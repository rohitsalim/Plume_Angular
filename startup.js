
var http=require('http');
var fs = require('fs');
var url = require('url');

var indexhtml = "";
var loginhtml = "";

var fileReader = function(path, continuation) {
	fs.readFile(path, function(err, html) {
		continuation()
	});
}

fs.readFile('./index.html', function (err, html) {
    if (err) {
		indexhtml = indexhtml + err;
    } else {
		indexhtml = html;
	}
});

fs.readFile('./login.html', function (err, html) {
    if (err) {
		loginhtml = loginhtml + err;
    } else {
		loginhtml = html;
	}
});

http.createServer(function (req, res) {
  var url_obj = url.parse(req.url);
  var path = url_obj.pathname;

	if (path === '/index.html' || path === '/') {
		res.writeHead(200, {'Content-Type':'text/html'});
		res.end(indexhtml);
	} else if (path === '/login.html') {
		res.writeHead(200, {'Content-Type':'text/html'});
		res.end(loginhtml);
	} else {
		res.writeHead(200, {'Content-Type': 'text/plain'});
	  	res.end('Hello World\n');		
	}

}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');



