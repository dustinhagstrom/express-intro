const express = require("express");
const logger = require("morgan");
const path = require("path");

const app = express();

// console.log("dir__name");
// console.log(__dirname);
// console.log("path.join");
// console.log(path.join(__dirname, "views"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//middleware
app.use(logger("dev")); //this logs the path of the req
app.use(express.json()); //this helps read returned json. for ex. "/create-product" input object-> send -> displays the object in the console

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.render("index", {
    //render is a word reserved to serve up webpages, second input is an object
    user: "Michael Jordan",
    teams: [{ team: "knicks" }, { team: "magic" }],
  });
  //res.send("Hello class");
  //   res.json({
  //     name: "hamster",
  //     friends: ["tommy", "geo", "john"],
  //     food: {
  //       food1: "candies",
  //       food2: "burgers",
  //     },
  //     boolean1: true,
  //     boolean2: false,
  //     number: 123,
  //   });
});
app.get("/:product/:id", function (req, res) {
  console.log(req.params);
  res.json({
    price: 100,
    type: req.params.product,
    id: req.params.id,
  });
});

app.post("/create-product", function (req, res) {
  console.log(req.body);
  res.json({
    data: req.body,
  });
});

app.listen(3000, function () {
  console.log(`Server is running on PORT: ${3000}`);
});
