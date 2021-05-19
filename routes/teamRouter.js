const express = require("express");

//use the express.Router() class to create modular, mountable route handlers. A Router instance is a complete middleware and routing system.
const router = express.Router();
//routing refers to how an application responds to a client request to a particular endpoint, which is  a URI (or path) and a specific http req method (get, post, put, etc.)

const uuidv4 = require("uuid").v4;

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

//function to use for time stamp and as an example for the use case of the 'next' function
const timeStamp = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

//the timeStamp should work for all request and put a timestamp on the req in the browser
router.use(timeStamp);

router.get("/", function (req, res) {
  if (req.query.name) {
    let foundTeam;
    teamArray.forEach((item) => {
      if (item.name === req.query.name) {
        foundTeam = item;
      }
    });
    if (!foundTeam) {
      res.json({ message: "Sorry, team not found!" });
    } else {
      res.json({ foundTeam: foundTeam });
    }
  } else {
    res.json({ data: teamArray });
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
  // res.json({message: "path hit!"})
  let newTeamObj = {
    id: uuidv4(),
    name: req.body.name,
  };
  let isFound;
  teamArray.forEach((item) => {
    if (newTeamObj.name === item.name) {
      isFound = true;
    }
  });
  if (isFound) {
    res.json({ message: "team already exists" });
  } else {
    teamArray.push(newTeamObj);
    res.json({ teamArray });
  }
});

//if the team exists then you can take the input and make changes, then give the res back that has the update
// router.put("/update-team/:name", function (req, res) {
//   let newName = req.body.updatedName; //pay attention to this variable's location in the body
//   let canUpdate;
//   let teamToUpdate;
//   let nameAlreadyExists = false;
//   teamArray.forEach((item) => {
//     if (item.name === req.params.name) {
//       canUpdate = true;
//       teamToUpdate = item;
//     }
//     if (newName === item.name) {
//       nameAlreadyExists = true;
//     }
//   });
//   if (canUpdate && !nameAlreadyExists) {
//     teamToUpdate.name = newName;
//     res.json({
//       teamArray,
//     });
//   }
//   if (canUpdate && nameAlreadyExists) {
//     res.json({
//       message:
//         "We cannot update this team's name with a name for another team.",
//     });
//   } else {
//     res.json({
//       message:
//         "We cannot update the team name because the team name you provided does not match any of our teams.",
//     });
//   }
// });

router.put("/update-team/:name", function (req, res) {
  let canUpdate = false;
  let foundTeam;
  teamArray.forEach(function (item) {
    if (item.name === req.params.name) {
      canUpdate = true;
      foundTeam = item;
    }
  });
  if (canUpdate) {
    //CHECK IF incoming name already exists in the array!
    let isFound = teamArray.findIndex(
      (item) => item.name === req.body.updatedName
    );
    if (isFound > -1) {
      res.json({ message: "Cannot update because already team exists" });
    } else {
      foundTeam.name = req.body.updatedName;
      res.json({ foundTeam });
    }
  } else {
    res.json({ message: "Team not found! Cannot update!" });
  }
});

router.delete("/delete-by-id/:id", function (req, res) {
  let isFound = teamArray.findIndex((item) => item.id == req.params.id);
  if (isFound > -1) {
    teamArray.splice(isFound, 1);
    res.json({
      teamArray,
    });
  } else {
    res.json({
      message: "The ID you provided does not match any teams in our system.",
    });
  }
});

//exporting file
module.exports = router;
