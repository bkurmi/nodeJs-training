const http = require('http')

http.createServer((req, res) =>  {
    const url = req.url;
    if(url === '/'){
        console.log("Inide default block")
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Assignment 1</title></head>');
        res.write(
        '<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body>'
        );
        res.write('</html>');
        res.end();
    } else if (url === '/users'){
        console.log("Inide users block")
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Assignment 1</title></head>');
        res.write('<body><ul><li>User 1</li><li>User 2</li></ul></body>');
        res.write('</html>');
        return res.end();
    } else if (url === '/create-user') {
        console.log('inside create user')
        const body = [];
        req.on('data', chunk => {
          body.push(chunk);
        });
        req.on('end', () => {
          const parsedBody = Buffer.concat(body).toString();
          console.log(parsedBody.split('=')[1]); // username=whatever-the-user-entered
        });
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Assignment 1</title></head>');
        res.write('<body><ul><li>Welcome</li></ul></body>');
        res.write('</html>');
        return res.end();
        res.end();
    }
}).listen(3000);