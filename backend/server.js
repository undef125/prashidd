const express = require("express");
const bodyParser = require("body-parser");
const PORT = 5000;
const DBconnection = require("./conn");
const cors = require("cors");
const router = require("./routes/routes");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("./images"));
app.use("/", router);

DBconnection();
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
