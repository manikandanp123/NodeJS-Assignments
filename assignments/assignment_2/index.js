const http = require("http");
const fs = require("fs");

fs.writeFile("index.html","<h1>Hello World</h1>",()=> console.log("File Created"));

const server = http.createServer((req, res) => {
    fs.readFile('./index.html', (err, data) => {
        console.log("File readed");
        // res.write(data);
        res.end(data);
    });
})

server.listen(3000, () => console.log("server is listening in port 3000"));