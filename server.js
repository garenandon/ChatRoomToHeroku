const express = require("express");
const bodyParser = require("body-parser");

const port = process.env.PORT || 8080;
const app = express();
const http = require("http").Server(app);
//const db = require("./dbConfig");

const io = require("socket.io")(http);

//const connectionUrl = `mongodb+srv://${db.username}:${db.password}@cluster0-b9umh.mongodb.net/test?retryWrites=true&w=majority`;

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let messagesStorage = [];

app.get("/messageEndpoint", (request, response) => {
  response.send(messagesStorage);
});

app.post("/messageEndpoint", (request, response) => {
  messagesStorage.push(request.body);
  io.emit("messageIncome", request.body);
  response.sendStatus(200);
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

http.listen(port, () => {
  console.log(`server is runnig on the port ${port}`);
});
