const express = require("express");
const logger = require("morgan");
const path = require("path");

const teamRouter = require("./routes/team");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//middleware
app.use(logger("dev"));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

//app.method(path, handler); app === express. method === http req method. path === path on the server. handler is the function that executes when the route is matched.
app.use("/api/team", teamRouter);

app.listen(3000, function () {
  console.log(`Server is running on PORT: ${3000}`);
});
