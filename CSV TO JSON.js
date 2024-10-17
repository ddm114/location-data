// CSV to JSON converter function
function csvJSON(csv) {
  var lines = csv.split("\n");
  var result = [];
  var headers = lines[0].split(",");

  for (var i = 1; i < lines.length; i++) {
    var obj = {};
    var currentline = lines[i].split(",");

    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }
    result.push(obj);
  }

  return result; // Returning JavaScript object (array of objects)
}



// Initialize the map search with dynamic lat/lng
function initMap(lat, lng) {
  const service = new google.maps.places.PlacesService(document.createElement("div"));
  
  const latLng = { lat: lat, lng: lng };

  const request = {
    location: latLng,
    radius: "500", // Search within 500 meters
    types: [
      "accounting",
      "airport",
      "amusement_park",
      "aquarium",
      "art_gallery",
      "atm",
      "bank",
      "bowling_alley",
      "bus_station",
      "cafe",
      "campground",
      "car_dealer",
      "car_rental",
      "car_repair",
      "car_wash",
      "casino",
      "cemetery",
      "church",
      "city_hall",
      "clothing_store",
      "convenience_store",
      "courthouse",
      "dentist",
      "department_store",
      "doctor",
      "drugstore",
      "electrician",
      "electronics_store",
      "embassy",
      "fire_station",
      "florist",
      "funeral_home",
      "furniture_store",
      "gas_station",
      "hair_care",
      "hardware_store",
      "hindu_temple",
      "home_goods_store",
      "hospital",
      "insurance_agency",
      "jewelry_store",
      "laundry",
      "lawyer",
      "library",
      "light_rail_station",
      "local_government_office",
      "locksmith",
      "lodging",
      "gym",
      "beauty_salon",
      "bicycle_store",
      "book_store",
      "restaurant",
      "bakery",
      "bar",
      "school",
      "store",
      "supermarket",
      "liquor_store",
      "parking",
      "park",
      "university"
    ] // Types of places to search
  };

  // Perform a nearby search using the Google Places API
  service.nearbySearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      results.forEach((place) => {
        console.log(`Place Name: ${place.name}`);
        console.log(`Place Types: ${place.types}`);
      });
    } else {
      console.error("PlacesService error:", status);
    }
  });
}

// Handle the file upload and trigger the search for each location
document.addEventListener('DOMContentLoaded', function () {
  const fileInput = document.getElementById('csvFileInput');
  const convertBtn = document.getElementById('convertBtn');

  convertBtn.addEventListener('click', function () {
    const input = fileInput.files[0];

    if (input && input.name === "FakeLocationData.csv") {
      const reader = new FileReader();
      reader.onload = function (e) {
        const csv = e.target.result;
        const jsonData = csvJSON(csv);

        // Assuming 'latitude' and 'longitude' are headers in your CSV file
        jsonData.forEach(location => {
          const lat = parseFloat(location.Lat);
          const lng = parseFloat(location.Long);
         // console.log(`Lat: ${lat}, Lng: ${lng}`); 

          // Call initMap for each location from the CSV
          initMap(lat, lng);
        });
      };

      reader.readAsText(input);
    } else {
      alert('Please upload FakeLocationData.csv.');
    }
  });
});
