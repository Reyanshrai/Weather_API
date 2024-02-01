
const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-containner");

const grantAccessContainner = document.querySelector(".grant-location-containner");
const searchForm = document.querySelector("[data-searchForm]");
const searchInp = document.querySelector("[data-searchInput]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");

// initially variable

let currentTab = userTab;
const API_KEY = "0026ed608193492086c62012d5aaaa12";

currentTab.classList.add("current-tab");
getfromSessionStorage();


function switchTab(clickedTab){
    if(clickedTab !== currentTab){
        currentTab.classList.remove("current-tab");
        currentTab = clickedTab;
        currentTab.classList.add("current-tab");

        if(!searchForm.classList.contains("active")){
            userInfoContainer.classList.remove("active");
            grantAccessContainner.classList.remove("active");
            searchForm.classList.add("active");

        }
        else{
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            getfromSessionStorage();

        }
    }
}

userTab.addEventListener("click",() => {
    switchTab(userTab);

});

searchTab.addEventListener("click",() => {
    switchTab(searchTab);

});

function getfromSessionStorage(){
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates){
        grantAccessContainner.classList.add("active");
    }
    else{
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinates){
    const { lat, lon } = coordinates;
    grantAccessContainner.classList.remove("active");
    loadingScreen.classList.add("active");

    // API call

    try{
        const response = await fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);

        const data = await response.json();

        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);

    }
    catch(err){
        loadingScreen.classList.remove("active");
    }

}

function renderWeatherInfo(weatherInfo){
    // we have to fetch the element

    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");

    // fetch values from weatherInfo object and put it UI elements

    cityName.innerText = weatherInfo?.name;

    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
   

    desc.innerText = weatherInfo?.weather?.[0]?.description;

    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;

    temp.innerText = `${weatherInfo?.main?.temp} °C`;

    windspeed.innerText = `${weatherInfo?.wind?.speed.toFixed(2)} m/s`;
    windspeed.innerText = `${weatherInfo?.wind?.speed.toFixed(2)} m/s`;

    humidity.innerText = `${weatherInfo?.main?.humidity} %`;

    cloudiness.innerText = `${weatherInfo?.clouds?.all} %`;

}



function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{

    }
}

function showPosition(position){
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);

}

const grantAccessbutton = document.querySelector("[data-grantAccess]");
grantAccessbutton.addEventListener("click", getLocation);

const searchInput = document.querySelector("[data-searchInput]");

searchForm.addEventListener("submit",(e) => {
    e.preventDefault();
    let cityName = searchInput.value;

    if(cityName === "")
        return;
    else
        fetchSearchWeatherInfo(cityName);
});

async function fetchSearchWeatherInfo(city){
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainner.classList.remove("active");

    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch(err){

    }
}




////////////////////////////// ANOTHER API FETCH ////////////////////////////////////////////

/* 
const API_KEY = "0026ed608193492086c62012d5aaaa12";

function renderWeatherInfo(data){
    let newPara = document.createElement('p');
 
     newPara.textContent = `${data?.main?.temp.toFixed(2)} °C`
 
     document.body.appendChild(newPara);
}

async function fetchWeather(){
    //let latitude = 15.333;
    //let longitude = 74.0833;
    // d1845658f92b31c64bd94f06f7188c9c

    //0026ed608193492086c62012d5aaaa12

    try{

        let city = "goa";


     const response  = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
 
     const data = await response.json();
 
     console.log("Weather data:->" , data);
 
    
     renderWeatherInfo(data);


    }

    catch(err){

    }

   // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_kEY}&units=metric
}

async function getCustomWeatherDetails(){

    try{

        let latitude = 17.6333;
     let longitude = 18.3333;
 
     let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric
     `);
     
     let data = await result.json();
 
     console.log(data);
    }

    catch(err){
        console.log("Error  found",err);
    }

    
}

function switchTab(clickedTab) {
    apiErrorContainer.classList.remove("active");

    if (clickedTab !== currentTab){
        currentTab.classList.remove("currenr-tab");
        currentTab = clickedTab;
        currentTab.classList.add("current-tab");

    

     if (!searchForm.classlist.contains("active")) {
         userInfoContainer.classList.remove("active");
         grantAccessContainer.classList.remove("active");
         searchForm.classList.add("active");
     } 
     else {
         searchForm.classList.remove("active");
         userInfoContainer.classList.remove("active");
         getFrommSessionStorage();
     }

     // console.log("Current Tab",currentTab)

    }
}

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        console.log("No geoLocation Support")
    }
}

function showPosition(position){
    let lat = position.coords.latitude;
    let longi = position.coords.longitude;

    console.log(lat);
    console.log(longi);

}
*/
