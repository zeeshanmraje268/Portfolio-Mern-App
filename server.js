const expess = require("express");
const app = expess();
const dotenv = require("dotenv");
const cors = require("cors");
const colors = require("colors");
const morgan = require("morgan");
const path = require("path");

dotenv.config();
const port = process.env.PORT || 8080;
app.use(expess.json());
app.use(morgan("dev"));
app.use(cors());

app.use(expess.static(path.join(__dirname, "./client/build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.use("/api/v1/portfolio", require("./routes/portfolioRoutes"));

app.get("/", (req, res) => {
  res.send("<h1>This is Default</h1>");
});

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`The server is running on ${port}`.bgRed);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
