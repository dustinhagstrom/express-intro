const express = require("express");

//use the express.Router() class to create modular, mountable route handlers. A Router instance is a complete middleware and routing system.
const router = express.Router();
//routing refers to how an application responds to a client request to a particular endpoint, which is  a URI (or path) and a specific http req method (get, post, put, etc.)

let teamArray = [
  {
    id: 1,
    name: "lakers",
  },
  {
    id: 2,
    name: "knicks",
  },
  {
    id: 3,
    name: "nets",
  },
];
router.get("/", function (req, res) {
  console.log(req.query);
  let foundTeam;
  if (req.query.name) {
    teamArray.forEach((team) => {
      if (team.name === req.query.name) {
        foundTeam = team;
      }
    });
    res.json({
      data: foundTeam,
    });
  } else {
    res.json({
      data: teamArray,
    });
  }
});
//exporting file
module.exports = router;
