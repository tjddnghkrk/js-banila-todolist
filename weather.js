const weather = document.querySelector(".js-weather");

const COORDS = 'coords'
const API_KEY = "954ade120fd0d7ef2bb8d58291a8b5fe";

function getWeather(lat, lon)
{
  fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      let now = new Date();
      let str = now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate();
      console.log(json);
      const temperature = Math.floor(json.main.temp);
      const place = json.name;
      weather.innerText=`${str}\n${place}, ${temperature}℃`;
    });
  }

function saveCoords(coordsObj)
{
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
  console.log(position);
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };

  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError(){
  console.log("cant");
}

function askForCoords(){
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){

  const loadedCoords = localStorage.getItem(COORDS);
  if(loadedCoords === null){
    askForCoords();
  }
  else{
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
    //console.log("ME");
  }
}

function init(){

  loadCoords();

}

init();
