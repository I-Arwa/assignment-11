





const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const locationBtn = document.getElementById("locationBtn");
const msg = document.querySelector(".msg");


getData("cairo");
async function getData(city){
try{
  let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=cc7c282813e7441784c135438242406&q=${city || 'cairo'}&days=3`);
  let weatherData = await weatherResponse.json();
  displayData(weatherData);
  msg.classList.add("d-none");
}

catch (error){
  msg.classList.remove("d-none");
  if (searchInput.value == "") {
    msg.classList.add("d-none");
  }
}
}



function displayData(data){
  var box = ``;
  for( let i = 0 ; i < data.forecast.forecastday.length ; i++ ){
    let dayData = data.forecast.forecastday[i];
      let date = new Date(dayData.date);
    if(i == 0){
      box += `<div class="col-lg-4">
      <div class="items p-3">
        <div class=" date d-flex justify-content-between align-items-center">
          <p>${date.toLocaleDateString('en-US', { weekday: 'long' })}</p>
          <p>${date.getDate()+date.toLocaleDateString('en-US', { month: 'short' })}</p>
        </div>
        
        <div class="d-flex flex-column">
          <p class="name">${data.location.name}</p>

          <h1 class="temp">${data.current.temp_c}°C</h1>

          <img src="https:${
                  data.current.condition.icon
                }" class="w-25" alt="img">

          <span class="text">${data.current.condition.text}</span>

          <div class="icons d-flex justify-content-between align-items-center mt-3">
            <span><i class='bx bx-water'></i> ${data.current.humidity}%</span>
            <span><i class='bx bx-wind'></i> ${data.current.wind_kph} km/h</span>
            <span><i class='bx bxs-compass'></i> ${data.current.wind_dir}</span>
          </div>

        </div>
      </div>
  </div>


  
  `
    }
    else{
      box += `<div class="col-lg-4">
      <div class="items p-3">
        <div class="date d-flex justify-content-between align-items-center">
          <p>${date.toLocaleDateString('en-US', { weekday: 'long' })}</p>
          <p>${date.getDate()+date.toLocaleDateString('en-US', { month: 'short' })}</p>
        </div>
        
        <div class="d-flex flex-column">

          <h1 class="temp">${data.forecast.forecastday[i].day.maxtemp_c}°C</h1>
           <p class="name">${data.forecast.forecastday[i].day.mintemp_c}°C</p>
          <img src="https:${
                  data.forecast.forecastday[i].day.condition.icon
                }" class="w-25" alt="img">

          <span class="text">${data.forecast.forecastday[i].day.condition.text}</span>

          <div class="icons d-flex gap-5 align-items-center mt-3">
            <span><i class='bx bx-water'></i> ${data.forecast.forecastday[i].day.avghumidity}%</span>
            <span><i class='bx bx-wind'></i> ${data.forecast.forecastday[i].day.maxwind_kph} km/h</span>
          </div>

        </div>
      </div>
  </div>


  
  `
    }
  }

  document.getElementById('rowData').innerHTML = box;
}


async function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async function(position) {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      try {
        let weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=cc7c282813e7441784c135438242406&q=${lat},${lon}&days=3`);
        let weatherData = await weatherResponse.json();
        displayData(weatherData);
        msg.classList.add("d-none");
      } catch (error) {
        console.error("Error fetching weather data: ", error);
        msg.classList.remove("d-none");
      }
    }, function(error) {
      console.error("Error getting current location: ", error);
      msg.classList.remove("d-none");
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}





searchBtn.addEventListener("click", function () {
  const term = searchInput.value;
  getData(term);
  searchInput.value = null; 
});

locationBtn.addEventListener('click', function() {
  getCurrentLocation();
});

searchInput.addEventListener("input", function () {
  const term = searchInput.value;
  getData(term);
});





