const Router = require("express");

const router = Router();

const groceryList = [
  {
    item: "milk",
    quantity: 2,
  },
  {
    item: "cereal",
    quantity: 1,
  },
  {
    item: "pop-tarts",
    quantity: 1,
  },
];

//CHECK USER
router.use((req, res, next) => {
  console.log("Inside Groceries Auth Check Middleware");
  console.log(req.user);
  //if req.user is truthy (user logged), next
  if (req.user) next();
  // if user is not logged, send code status 401 - Unauthorized
  else res.send(401);
});

//GET -  get all products
router.get("/", (req, res) => {
  res.send(groceryList);
});

//GET+":item" - get a specific product based on the "item" params
router.get("/:item", (req, res) => {
  console.log(req.cookies);
  const { item } = req.params;
  const groceryItem = groceryList.find((g) => g.item === item);
  console.log(groceryItem);
  res.send(groceryItem);
});

//POST - create a new product
router.post("/", (req, res) => {
  console.log(req.body);
  groceryList.push(req.body);
  res.send(201);
});

//GET - send data to the user
router.get("/shopping/cart", (req, res) => {
  const { cart } = req.session;
  console.log("Cart");

  //if the cart is empty, send this message:
  if (!cart) {
    res.send("You have not cart session!");
  }

  //else, show the cart to the user!
  else {
    res.send(cart);
  }
});

//POST - add products to cart
router.post("/shopping/cart/item", (req, res) => {
  const { item, quantity } = req.body;
  const cartItem = { item, quantity };
  const { cart } = req.session;
  if (cart) {
    req.session.cart.items.push(cartItem);
  } else {
    req.session.cart = {
      items: [cartItem],
    };
  }
  res.send(201);
});

module.exports = router;
