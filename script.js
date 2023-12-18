
var request = new XMLHttpRequest();
var apiUrl = "https://restcountries.com/v3.1/all";
request.open("GET", apiUrl, true);
request.onload = function () {
  if (request.status === 200) {
    var data = JSON.parse(request.responseText);
    var asiaCountries = data.filter(function (country) {
      return country.region.includes("Asia");
    });

    console.log("Countries in Asia:", asiaCountries);
    var lowPopulationCountries = data.filter(function (country) {
      return country.population < 200000;
    });

    console.log("Countries with population less than 2 lakhs:", lowPopulationCountries);
    console.log("Details of countries:");
    data.forEach(function (country) {
      console.log("Name:", country.name.common);
      console.log("Capital:", country.capital);
      console.log("Flag:", country.flags.svg);
      console.log("--------------------");
    });
    var totalPopulation = data.reduce(function (accumulator, country) {
      return accumulator + country.population;
    }, 0);
    console.log("Total population of countries:", totalPopulation);
    var usDollarCountry = data.find(function (country) {
      return country.currencies.hasOwnProperty("USD");
    });
    console.log("Country that uses US dollars:", usDollarCountry);
  } else {
    console.error("Error fetching data. Status code:", request.status);
  }
};


request.onerror = function () {
  console.error("Network error occurred");
};
request.send();
