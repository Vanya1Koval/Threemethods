const http = require ('http');
let users = ['name', 'name1', 'name2'];

http.createServer(async (req, res) => {
if (req.url === '/user' && req.method === 'GET') { 
    res.end(JSON.stringify(users));
  } 
if (req.url === '/user' && req.method === 'POST') {
    const buffers = [];
    for await (const chunk of req) {
        buffers.push(chunk);
      }

    const data = Buffer.concat(buffers).toString();

    users.push(data);

    res.end(JSON.stringify(users));
} 
if (req.url === '/user' && req.method === 'PUT') {
    users = [];
    const buffers = [];
    for await (const chunk of req) {
        buffers.push(chunk);
      }

    const data = Buffer.concat(buffers).toString();

    users.push(data);

    res.end(JSON.stringify(users));
} 
}).listen(3000, '127.0.0.1', () => {
    console.log('server work on port 3000');
})
