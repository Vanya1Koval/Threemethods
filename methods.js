const http = require ('http');

let users = [{name: "vanya"}];

async function getData(req) {
    const buffers = [];
    for await (const chunk of req) {
        buffers.push(chunk);
      }
    const data = Buffer.concat(buffers).toString();
    return data;
}

http.createServer(async (req, res) => {
if (req.url === '/user') { 
    switch (req.method) {
        case 'GET':
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(users));
            break;

        case 'POST':
            res.writeHead(200, {"Content-Type": "application/json"});
            users.push(await getData(req));
            res.end(JSON.stringify(users));
            break;

        case 'PUT':
            res.writeHead(200, {"Content-Type": "application/json"});
            users = [];
            users.push(await getData(req));
            res.end(JSON.stringify(users));
            break;
    }
} else {
    res.end('Wrong url!')
}
}).listen(8000, '127.0.0.1', () => {
    console.log('server work on port 8000');
})