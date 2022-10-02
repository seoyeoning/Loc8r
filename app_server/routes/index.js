const express = require("express");
const router = express.Router();

const ctrlLocations = require("../controllers/locations");
const ctrlOthers = require("../controllers/others");

/* GET home page. */
/* router.get("/", function (req, res, next) {
  res.render("index", { title: "Express &Nodemon by 박서연_2020710026" });
}); */

/* const homepageController = (req, res) => {
  res.render("index", { title: "Express &Nodemon by 박서연_2020710026" });
};
 */

/* GET home page. */
/* router.get("/", ctrlMain.index); */

/* Locations pages */
router.get("/", ctrlLocations.homelist);
router.get("/location", ctrlLocations.locationInfo);
router.get("/location/review/new", ctrlLocations.addReview);

/* Other pages */
router.get("/about", ctrlOthers.about);

module.exports = router;
