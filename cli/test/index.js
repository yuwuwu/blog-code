const express = require("express");
const app = express();

const cors = require("cors");

const bodyParser = require("body-parser");

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const server = app.listen(8000, "0.0.0.0", () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log("app start listening at http://%s:%s", host, port);
});
