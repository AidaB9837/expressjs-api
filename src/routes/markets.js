const { Router } = require("express");

const router = Router();

const supermarkets = [
  {
    id: 1,
    store: "Whole Foods",
    headquarters: "Austin",
    miles: 0.6,
  },
  {
    id: 2,
    store: "Trader Joes",
    headquarters: "Los Angeles",
    miles: 2.5,
  },
  {
    id: 3,
    store: "Albertsons",
    headquarters: "Boise",
    miles: 2.8,
  },
  {
    id: 4,
    store: "Shaws",
    headquarters: "Massachusetts",
    miles: 3.5,
  },
  {
    id: 5,
    store: "Giant",
    headquarters: "Carlisle",
    miles: 1.8,
  },
];

//CHECK USER
router.use((req, res, next) => {
  //if req.session.user is truthy (user logged), go to the next middleware
  if (req.session.user) next();
  // if user is not logged, send code status 401 - Unauthorized
  else res.send(401);
});

//GET - get all supermarkets
router.get("/", (req, res) => {
  const { miles } = req.query;
  const parsedMiles = parseInt(miles);

  if (!isNaN(parsedMiles)) {
    const filteredStores = supermarkets.filter((s) => s.miles <= parsedMiles);
    res.send(filteredStores);
  }
  res.send(supermarkets);
});

//GET+":headquarters" - get a specific market based on the "headquarters" params
router.get("/:headquarters", (req, res) => {
  const { headquarters } = req.params;
  const market = supermarkets.find((m) => m.headquarters === headquarters);
  res.send(market);
});

//POST - create a new supermarket
router.post("/", (req, res) => {
  console.log(req.body);
  supermarkets.push(req.body);
  res.send(201);
});

module.exports = router;
