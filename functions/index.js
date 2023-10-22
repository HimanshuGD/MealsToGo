const functions = require("firebase-functions");
const {geocodeRequest} = require("./geocode")
const {placesRequest} = require('./places');
const { payRequest } = require("./pay");

const { Client } = require("@googlemaps/google-maps-services-js");
const stripeClient = require("stripe")(functions.config().stripe.key);
const googleClient = new Client({});
const client = new Client({});


exports.geocode = functions.https.onRequest((request, response) => {
  geocodeRequest(request, response);
});

exports.placesNearby = functions.https.onRequest((request, response) => {
  // placesRequest(request, response);
  placesRequest(request, response);
});

exports.pay = functions.https.onRequest((request, response) => {
  payRequest(request, response, stripeClient);
});



