/* Get home page */
const homelist = (req, res) => {
  res.render("locations-list", { title: "Home   by 박서연_2020710026" });
};

/* Get location info page */
const locationInfo = (req, res) => {
  res.render("location-info", {
    title: "Location Info   by 박서연_2020710026",
  });
};

/* Get add review page */
const addReview = (req, res) => {
  res.render("location-review-form", {
    title: "Add review   by 박서연_2020710026",
  });
};

module.exports = {
  homelist,
  locationInfo,
  addReview,
};
