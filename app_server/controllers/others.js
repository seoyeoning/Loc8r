/* GET about page. */
const about = (req, res) => {
  res.render("generic-text", { title: "About   by 박서연_2020710026" });
};

module.exports = {
  about,
};
