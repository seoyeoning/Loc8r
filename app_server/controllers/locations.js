const { response } = require("express");
const request = require("request");

const apiOptions = {
  server: "http://localhost:3000",
};
if (process.env.NODE_ENV === "production") {
  apiOptions.server = "https://loc8r-sy.herokuapp.com/";
}

const homelist = (req, res) => {
  const path = "/api/locations";
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: "GET",
    json: {},
    qs: {
      lng: 126.9976,
      lat: 37.4817,
      maxDistance: 200000000,
    },
  };
  request(requestOptions, (err, { statusCode }, body) => {
    let data = [];
    if (statusCode === 200 && body.length) {
      data = body.map((item) => {
        item.distance = formatDistance(item.distance);
        return item;
      });
    }
    renderHomepage(req, res, body);
  });
};

const formatDistance = (distance) => {
  let thisDistance = 0;
  let unit = "m";
  if (distance > 1000) {
    thisDistance = parseFloat(distance / 1000).toFixed(1);
    unit = "km";
  } else {
    thisDistance = Math.floor(distance);
  }
  return thisDistance + unit;
};

const renderHomepage = function (req, res, responseBody) {
  let message = null;
  if (!(responseBody instanceof Array)) {
    message = "API lookup error";
    responseBody = [];
  } else {
    if (!responseBody.length) {
      message = "No places found nearby";
    }
  }
  res.render("locations-list", {
    title: "Loc8r - find a place to work with wifi",
    pageHeader: {
      title: "Loc8r",
      strapline: "Find places to work with wifi near you!",
    },
    sidebar:
      "Looking for wifi and a seat? Loc8r helps you find \
    places to work when out and about. Perhaps with coffee, cake or a \
    pint? Let Loc8r help you find the place you're looking for.",
    locations: responseBody,
    message,
  });
};

///////////////////////////////////////////////////////////////////////////

const rederDetailPage = function (req, res, location) {
  res.render("location-info", {
    title: location.name,
    pageHeader: {
      title: location.name,
    },
    sidebar: {
      context:
        "is on Loc8r beacaus it has accessible wifi and \
        space to list down with your laptop and get some work done.",
      callToAction:
        "If you've been and you like it - or if you \
        don't - please leave a review to help other people just like you.",
    },
    location,
  });
};

const locationInfo = (req, res) => {
  const path = `/api/locations/${req.params.locationid}`;
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: "GET",
    json: {},
  };
  request(requestOptions, (err, { statusCode }, body) => {
    const data = body;
    if (statusCode === 200) {
      data.coords = {
        lng: body.coords[0],
        lat: body.coords[1],
      };
      rederDetailPage(req, res, data);
    } else {
      showError(req, res, statusCode);
    }
  });
};

const showError = (req, res, status) => {
  let title = "";
  let content = "";
  if (status === 400) {
    title = "404, page not found";
    content = "Oh dear, Looks like you can't find this page. Sorry";
  } else {
    title = `${status}, something's gone wrong`;
    content = "Something, somewhere, has gone just a little a bit wrong.";
  }
  res.status(status);
  res.render("generic-text", {
    title,
    content,
  });
};

/* Get home page */
/* const homelist = (req, res) => {
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
 */
/* Get location info page */
/* const locationInfo = (req, res) => {
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
}; */

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
