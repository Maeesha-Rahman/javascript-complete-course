// modules
// create file system
const fs = require('fs');
const http = require('http');
const url = require('url');

const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
// parse to js object from string 
const laptopData = JSON.parse(json);

const server = http.createServer((req, res) => {
    // console.log('someone did access the server');
    const pathName = url.parse(req.url, true).pathname;
    // console.log(req.url);
    // read id from url
    const id = url.parse(req.url, true).query.id;
    // console.log(url.parse(req.url, true))

    if (pathName === '/products' || '/') {
        res.writeHead(200, { 'Content-type': 'text/html'});
        res.end('this is the products page');

    } else if (pathName === '/laptop' && id < laptopData.length) {
        res.writeHead(200, { 'Content-type': 'text/html'});
        res.end(`this is the laptop page for laptop ${id}.`);

    } else {
        res.writeHead(404, { 'Content-type': 'text/html'});
        res.end('URL was not found on the server');
    }

    
});

// listen on a certain port on a certain ip address 
server.listen(1337, '127.0.0.1', () => {
    console.log('listening for requests now');
});