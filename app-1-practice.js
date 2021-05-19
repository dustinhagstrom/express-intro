const express = require("express"); //the built in req function is the easiest way to include modules that exist in seperate files. js reads the file, executes the file, and returns the exports objects.
const { get } = require("http");
const logger = require("morgan");
const path = require("path");

const app = express(); //express is a routing and middleware framework. by calling express(), I am allowing express to access the request and response objects. this is a "top-level function".

app.set("views", path.join(__dirname, "views")); // basically setting the entire path through the views folder to something called "views". app.set("name", value);
app.set("view engine", "ejs"); //ejs === embedded javascript templates. it sets ejs as the view engine.

//middleware
app.use(logger("dev")); //this logs the path of the req
app.use(express.json()); //this helps to read and interpret the res json (ex in class was putting an object into get req and res was the object in the console of postman).

app.use(express.static(path.join(__dirname, "public"))); //express.static(root, [options]). allow the application to serve up files within the given directory public

app.get("/", function (req, res) {
  res.render("index", {
    user: "Michael Jordan",
    teams: [{ team: "knicks" }, { team: "magic" }],
  }); // res.render() function compiles your template (in this case is index.ejs)
});

app.get("/:product/:id", function (req, res) {
  console.log(req.params); //params === key, input in url by user === value;
  res.json({
    price: 100,
    type: req.params.product, //localhost:3000/product/id
    id: req.params.id,
  }); //this gives back an object with key/values matching user input
});

app.post("/create-product", function (req, res) {
  console.log(req.body); //the body is input on postman
  res.json({
    data: req.body, // this returns an object that has a key === data && a value object === user input in object form
  });
});

//post, get, put, delete === create, read, update, delete

//the app starts a server and listens on port 3000 for connections. it responds with the message for requests to the root URL (/). for every other requests it responds with a 404 message.
app.listen(3000, function () {
  console.log(`Server is running on PORT: ${3000}`);
});
