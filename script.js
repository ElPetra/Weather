let content = document.querySelector(".content");
let api = "2043de6158b66418eae691f84dffa055";
let lat = null;
let lon = null;
let tempResult = null;

document.querySelector(".change").addEventListener("click", changeCity);

function changeCity() {
  content.innerHTML = `<input type="text" name="" class="city" placeholder="Type your city here"/><br />
        <button class="btn">Find</button>`;
}

content.addEventListener("click", function (event) {
  if (event.target.classList == "btn") {
    findCity(event);
  }
});

content.addEventListener("keyup", function (event) {
  if (event.keyCode == 13) {
    findCity(event);
  }
});

function findCity(event) {
  let cityName = event.target
    .closest(".content")
    .querySelector(".city")
    .value.trim();
  city(cityName);
}

content.addEventListener("click", function (event) {
  if (event.target.classList.contains("btn_again")) {
    content.innerHTML = `<input type="text" name="" class="city" placeholder="Type your city here"/><br />
        <button class="btn">Find</button>`;
  }
});

async function city(cityName) {
  const geo = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=en&appid=${api}`
  );
  const data = await geo.json();
  console.log(data);
  if (data.cod === "404") {
    errorCity();
  }
  dataAtSite(data);
  return data;
}

function errorCity() {
  content.innerHTML = `<p class="error">Ooops. Something went wrong.</p>
    <p class="info">Error info</p>
    <button class="btn btn_again">Try again</button>`;
}

function dataAtSite(data) {
  let temp = Math.round(data.main.temp);
  let weather = data.weather[0].main;
  let cityValue = data.name;
  let img = data.weather[0].icon;
  content.innerHTML = `<img src="https://openweathermap.org/img/wn/${img}@2x.png" alt="" class="img__icon"><p class="temp">${temp}°С</p>
        <p class="condition">${weather} in ${cityValue}</p>
        <button class="change">Change city</button>`;
  document.querySelector(".change").addEventListener("click", changeCity);
}

navigator.geolocation.getCurrentPosition(success, error);

function success(data) {
  lat = data.coords.latitude;
  lon = data.coords.longitude;
  tempResult = tempFunction(lat, lon);
  tempResult.then((data) => dataAtSite(data));
  console.log(data);
}

async function tempFunction(lat, lon) {
  const geo = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=en&appid=${api}`
  );
  const data = await geo.json();
  return data;
}

async function error() {
  console.log("ERROR");
  await fetch("https://api.ipify.org/?format=json")
    .then((res) => res.json())
    .then((data) => getIP(data))
    .catch(console.log("IP is not found"));
}

window.onload = function (data) {
  tempFunction(lat, lon);
  getIP();
  dataAtSite(data);
};

async function getIP(json) {
  console.log("IPPPPP", json.ip);
  let IPData = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_MjSo7gov72CRBSM8cv1js7LKSu2DA&ipAddress=${json.ip}`
  )
    .then((res) => res.json())
    .then((res) => city(res.location.region));
  city(IPData.name);
  console.log(IPData.name);
}
