import camelize from "camelize";
import { host, isMock } from "../../utils/env";

export const restaurantsRequest = (location) => {
  return fetch(`${host}/placesNearby?location=${location}&mock=${isMock}`).then((res) => {
  // return fetch(`http://127.0.0.1:5001/mealstogo-fbbeb/us-central1/placesNearby?location=${location}&mock=true`).then((res) => {
    return res.json();
  });
};

// https://us-central1-mealstogo-fbbeb.cloudfunctions.net
// http://127.0.0.1:5001/mealstogo-fbbeb/us-central1/placesNearby?location=37.7749295,-122.4194155&mock=true

export const restaurantsTransform = ({ results = [] }) => {
  const mappedResults = results.map((restaurant) => {
    return {
      ...restaurant,
      address: restaurant.vicinity,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.business_status === "CLOSED_TEMPORARILY",
    };
  });

  return camelize(mappedResults);
};
