const express = require("express");
const router = express.Router();
const ctrlMain = require("../controllers/main");

/* GET home page. */
/* router.get("/", function (req, res, next) {
  res.render("index", { title: "Express &Nodemon by 박서연_2020710026" });
}); */

/* const homepageController = (req, res) => {
  res.render("index", { title: "Express &Nodemon by 박서연_2020710026" });
};
 */

/* GET home page. */
router.get("/", ctrlMain.index);

module.exports = router;
