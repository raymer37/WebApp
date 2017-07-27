var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var express = require('express');

var username = "matt";
var password = "abc123"

// Create a server
http.createServer(function (request, response) {
    // Parse the request containing file name
    var pathname = url.parse(request.url).pathname;

    // Print the name of the file for which request is made
    console.log("Request for " + pathname + " received.");

    var imagePath = "/images/";

    // If the request pathname is for an image
    if (pathname.indexOf(imagePath) != -1) {
        var img = fs.readFileSync(pathname.substr(1));
        response.writeHead(200, { 'Content-Type': 'image/jpg' });
        response.end(img, 'binary');
    }
    // If the request pathname is for a webpage
    else {
        // Read the requested file content from file system
        fs.readFile(pathname.substr(1), function (err, data) {
            if (err) {
                console.log(err);
                // HTTP Status: 404 : NOT FOUND
                // Content Type: text/plain
                response.writeHead(404, { 'Content-Type': 'text/html' });
            } else {
                //Page found
                // HTTP Status: 200 : OK
                // Content Type: text/plain
                response.writeHead(200, { 'Content-Type': 'text/html' });

                // Write the content of the file to response body
                response.write(data.toString());
            }
            // Send the response body
            response.end();
        });
    }
}).listen(8080);

console.log('Server running at http://10.0.0.205:8080');
