/* GET home page. */
const index = (req, res) => {
  res.render("index", { title: "Express &Nodemon by 박서연_2020710026" });
};

module.exports = {
  index,
};
