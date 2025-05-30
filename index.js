var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
    var q = url.parse(req.url, true).query; 
    var contentType = 'text/html';

    if (q.json === 'true') {
        contentType = 'application/json';
    }

    res.writeHead(200, { 'Content-Type': contentType });

    if (contentType === 'text/html') {
        res.write('<html><body><h1>Hello, World!</h1></body></html>');
    } else if (contentType === 'application/json') {
        res.write(JSON.stringify({ message: "Hello, World!" }));
    }
    res.end();
}).listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});