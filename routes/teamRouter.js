const express = require("express");

//use the express.Router() class to create modular, mountable route handlers. A Router instance is a complete middleware and routing system.
const router = express.Router();
//routing refers to how an application responds to a client request to a particular endpoint, which is  a URI (or path) and a specific http req method (get, post, put, etc.)

const uuidv4 = require("uuid").v4;

let teamArray = [
  {
    id: uuidv4(),
    name: "lakers",
  },
  {
    id: uuidv4(),
    name: "knicks",
  },
  {
    id: uuidv4(),
    name: "nets",
  },
];

router.get("/", function (req, res) {
  //if the request query name is a name in teamArray the initialize the variable 'foundteam' and loop through teamArray. for each object within array if that object's 'name:' value === the query name then assign variable to that object and the response will be an object with a key of 'foundTeam': and the object that matches will be the value to that key.
  if (req.query.name) {
    let foundTeam;
    teamArray.forEach((item) => {
      if (item.name === req.query.name) {
        foundTeam = item;
      }
    });

    if (!foundTeam) {
      res.json({
        message: "Sorry, team not found!",
      });
    } else {
      res.json({
        foundTeam: foundTeam,
      });
    }

    res.json({
      foundTeam: foundTeam,
    });
  } else {
    res.json({
      data: teamArray,
    });
  }
});

router.get("/get-team-by-name/:name", function (req, res) {
  const name = req.params.name;

  let foundTeam;

  teamArray.forEach((item) => {
    if (item.name === name) {
      foundTeam = name;
    }
  });

  if (!foundTeam) {
    res.json({
      message:
        "The team name that you are looking for is incorrect, please check name.",
    });
  } else {
    res.json({
      foundTeam,
    });
  }
});

router.get("/get-team-by-id/:id", function (req, res) {
  //this is before uuid because we have to convert string to number
  const id = Number(req.params.id);

  let foundTeam;

  teamArray.forEach((item) => {
    if (item.id === id) {
      foundTeam = id;
    }
  });

  if (!foundTeam) {
    res.json({
      message:
        "The team ID that you are looking for does not exist please check ID.",
    });
  } else {
    res.json({
      foundTeam,
    });
  }
});

router.post("/create-team", function (req, res) {
  let newTeamObj = {
    id: uuidv4(),
    name: req.body.name,
  };
  teamArray.forEach((item) => {
    if (newTeamObj.name === item.name) {
      res.json({ message: "This team already exists!" });
    } else {
      teamArray.push(newTeamObj);
    }
  });

  res.json({ teamArray });
});

//exporting file
module.exports = router;
