const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 3000;

const server = http.createServer(function (req, res) {
    let filePath = 'index.html';
    let contentType = 'text/html';

    if (req.url === '/styles.css') {
        filePath = 'styles.css';
        contentType = 'text/css';
    }

    fs.readFile(filePath, function (error, data) {
        if (error) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.write('Error: File Not Found');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.write(data);
        }
        res.end();
    });
});

server.listen(port, function (error) {
    if (error) {
        console.log('Something went wrong', error);
    } else {
        console.log('Server is listening on port', port);
    }
});
