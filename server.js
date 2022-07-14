require('dotenv').config();
const http = require('http');
const app = require('./index');
const port =process.env.PORT;
const server = http.createServer(app);
//server.listen(5000);
server.listen(port,() => console.log('listening on port ${port}'));