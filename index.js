import express from "express";
import cors from "cors";
import axios from "axios";
const app = express();
app.use(cors());
let countryData = [];
(async () => {
  let fetchData = await axios.get(
    "https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries%2Bstates%2Bcities.json"
  );
    fetchData.data.forEach((data) => {
      let obj = {
        name: data.name,
        states: [],
      };
      if (data.states) {
        data.states.forEach((state) => {
          let citiesData = [];
          state.cities.forEach((city) => {
            citiesData.push({
              name: city.name,
            });
          });
          obj["states"].push({
            name: state.name,
            cities: citiesData,
          });
        });
      }
      countryData.push(obj);
    });
})();
app.get("/api/v1/geoLocation", (req, res) => {
  res.send(countryData);
});

const port = 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
