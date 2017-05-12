var http = require('http');
var fs = require('fs');

fs.readFile('page.html', function(err, html) {
	if (err) {
		res.writeHead(404, {'Content-Type': 'text/html'});
		return res.end("404 Not Found");
	}
	http.createServer(function(req, res) {  
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(html);
		res.end();
	}).listen(8080, '127.0.0.1');
});
console.log('Server running at http://127.0.0.1:8080');
