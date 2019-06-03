// modules
// create file system
const fs = require('fs');
const http = require('http');
const url = require('url');

// readfilesynchronously - can use sychronously here bc this only happens once and happens when you start your app. 
const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
// parse to js object from string 
const laptopData = JSON.parse(json);

// PRODUCTS OVERVIEW
const server = http.createServer((req, res) => {
    // console.log('someone did access the server');
    const pathName = url.parse(req.url, true).pathname;
    // console.log(req.url);
    console.log(pathName);
    // read id from url
    const id = url.parse(req.url, true).query.id;
    // console.log(url.parse(req.url, true))

    if (pathName === '/products' || '/') {
        res.writeHead(200, { 'Content-type': 'text/html'});
        
        fs.readFile(`${__dirname}/templates/template-overview.html`, 'utf-8', (err, data) => {
            let overviewOutput = data;
            // is inside bc we only want to read card template as soon as the overview template is read 
            fs.readFile(`${__dirname}/templates/template-card.html`, 'utf-8', (err, data) => {
                const cardsOutput = laptopData.map(el => replaceTemplate(data, el)).join('');
                // console.log(cardsOutput);
                overviewOutput = overviewOutput.replace('{%CARDS%}', cardsOutput);

                res.end(overviewOutput);
            });
        });

    // LAPTOP DETAILS
    } else if (pathName === '/laptop' && id < laptopData.length) {
        res.writeHead(200, { 'Content-type': 'text/html'});
        
        // happens asynchronously as to not block other code from running and stop app
        fs.readFile(`${__dirname/template-laptopData.html}`, 'utf-8', (err, data) => {
            // if id = 3, access laptopdata at position number 3. and get productName from that object 
            const laptop = laptopData[id];
            const output = replaceTemplate(data, laptop);
            res.end(output);
        });
    }  

    // IMAGE
    else if ((/\.(jpg|jpeg|png|gif)$/i).test(pathName)) {
        fs.readFile(`${__dirname}/data/img${pathName}`, (err, data) => {
            res.writeHead(200, { 'Content-type': 'image/jpg'});
            res.end(data);
        });
    }

    // URL NOT FOUND
    else {
        res.writeHead(404, { 'Content-type': 'text/html'});
        res.end('URL was not found on the server');
    }

    
});

// listen on a certain port on a certain ip address 
server.listen(1337, '127.0.0.1', () => {
    console.log('listening for requests now');
});

const replaceTemplate = (originalHtml, laptop) => {
    let output = originalHtml.replace(/{%PRODUCTNAME%}/g, laptop.productName);
    output = output.replace(/{%IMAGE%}/g, laptop.image);
    output = output.replace(/{%PRICE%}/g, laptop.price);
    output = output.replace(/{%SCREEN%}/g, laptop.screen);
    output = output.replace(/{%CPU%}/g, laptop.cpu);
    output = output.replace(/{%STORAGE%}/g, laptop.storage);
    output = output.replace(/{%RAM%}/g, laptop.ram);
    output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
    output = output.replace(/{%ID%}/g, laptop.id);
    return output;
}