const http = require("http");
const fs = require("fs");
const path=require("path");

fs.writeFile("index.html","<h1>Hello World</h1>",(err)=> console.log(err));

const server = http.createServer((req, res) => {
    // fs.readFile('./index.html', (err, data) => {
    fs.readFile(path.join(__dirname,"index.html"), (err, data) => {
        console.log("File readed");
        // res.write(data);
        res.end(data);
    });
})

server.listen(3000, () => console.log("server is listening in port 3000"));