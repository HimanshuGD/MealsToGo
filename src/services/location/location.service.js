import camelize from "camelize";
import { host, isMock } from "../../utils/env";


export const locationRequest = (searchTerm) => {
  // return fetch(`${host}/geocode?city=${searchTerm}`).then((res) => {
  //   return res.json();
  // });
  // const encodedSearchTerm = encodeURIComponent(searchTerm);
  // return fetch(`${host}/geocode?city=${searchTerm}`).then((res) => {
  return fetch(`${host}/geocode?city=${searchTerm}&mock=${isMock}`).then((res) => {
    console.log(res);
    return res.json();
  });

  // http://127.0.0.1:5001/mealstogo-fbbeb/us-central1/geocode?city=Antwerp&mock=true




  // return fetch(`${host}/geocode?city=${searchTerm}`)
  //   .then((res) => {
  //     if (!res.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     return res.json();
  //   })
  //   .catch((error) => {
  //     console.error("Location request error:", error);
  //     throw error;
  //   });
};

export const locationTransform = (result) => {
  const formattedResponse = camelize(result);
  console.log(result);

  const { geometry = {} } = formattedResponse.results[0];
  const { lat, lng } = geometry.location;
  return { lat, lng, viewport: geometry.viewport };
};

