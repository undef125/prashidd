const express = require("express");
const bodyParser = require("body-parser");
const PORT = 5000;
const DBconnection = require("./conn");
const cors = require("cors");
const router = require("./routes/routes");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("./images"));
app.use("/", router);

DBconnection();

//verify student
app.get("/verifyuser", (req, res) => {
  
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }
  jwt.verify(
    token,
    "myjwtsecrectisverygoodandyoucantdecrytpit",
    (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Failed to authenticate token" });
      }
      res.status(200).json({ id: decoded.id, message: "verified" });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
