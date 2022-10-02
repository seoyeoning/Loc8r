/* Get home page */
const homelist = (req, res) => {
  res.render("locations-list", {
    title: "Loc8r - find a place to work with wifi",
    pageHeader: {
      title: "Loc8r",
      strapLine: "Find places to work with wifi near you!",
    },
    sidebar:
      "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
    locations: [
      {
        name: "Starcups",
        address: "대학민국 서울특별시 서초구 방배로 87",
        rating: 3,
        facilities: ["Hot drinks", "Food", "Premium wifi"],
        distance: "100m",
      },
      {
        name: "Cafe Hero",
        address: "서울특별시 서초구 방배동 908-3",
        rating: 4,
        facilities: ["Hot drinks", "Food", "Premium wifi"],
        distance: "200m",
      },
      {
        name: "Burger Queen",
        address: "서울특별시 서초구 방배동 984-4",
        rating: 2,
        facilities: ["Food", "Premium wifi"],
        distance: "250m",
      },
    ],
  });
};

/* Get location info page */
const locationInfo = (req, res) => {
  res.render("location-info", {
    title: "Starcups",
    pageHeader: {
      title: "Loc8r",
    },
    sidebar: {
      context:
        "is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.",
      callToAction:
        "If you've been and you like it - or if you don't - please leave a review to help other people just like you.",
    },
    location: {
      name: "Starcups",
      address: "대학민국 서울특별시 서초구 방배로 87",
      rating: 3,
      facilities: ["Hot drinks", "Food", "Premium wifi"],
      coords: { lat: 37.48224, lng: 126.99689 },
      openingTimes: [
        {
          days: "Monday - Friday",
          opening: "7:00am",
          closing: "7:00pm",
          closed: false,
        },
        {
          days: "Saturday",
          opening: "8:00am",
          closing: "5:00pm",
          closed: false,
        },
        {
          days: "Sunday",
          closed: true,
        },
      ],
      reviews: [
        {
          author: "박서연",
          rating: 5,
          timestamp: "21 October 2022",
          reviewText: "맛있다.",
        },
        {
          author: "seoyeon",
          rating: 4,
          timestamp: "20 October 2022",
          reviewText: "good",
        },
      ],
    },
  });
};

/* Get add review page */
const addReview = (req, res) => {
  res.render("location-review-form", {
    title: "Review Starcups on Loc8r",
    pageHeader: { title: "Review Starcups" },
  });
};

module.exports = {
  homelist,
  locationInfo,
  addReview,
};
