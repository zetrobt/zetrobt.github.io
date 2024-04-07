function mapToJSON(map) {
  return JSON.stringify(Object.fromEntries(map));
}

const successCallback = (position) => {
	const coords = position.coords;
	console.log(coords.latitude);
    console.log(coords.longitude);
    console.log(coords.accuracy);
};

const errorCallback = (error) => {
  console.log(error);
};

const request = async () => { // Calling a "synchronous" fetch
    let tg = window.Telegram.WebApp;
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();

    // Declaring variables
    var ip = data.ip;

    var provider = data.org + " (" + data.asn + ")";

    var timezone = data.timezone;
    var country = data.country_name;
    var countryCode = data.country_code;
    var region = data.region + " (" + data.region_code + ")";
    var city = data.city;
    
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }

    var zip = data.postal;
    var lat = data.latitude;
    var lon = data.longitude;

    const map = new Map([
	["ip", ip],
	["provider", provider],
	["timezone", timezone],
	["country", country],
	["country_code", countryCode],
	["region", region],
	["city", city],
	["zip", zip],
	["latitude", lat],
	["longitude", lon]
    ]);

    console.log(ip);
    console.log(provider);
    console.log(timezone);
    console.log(country);
    console.log(countryCode);
    console.log(region);
    console.log(city);
    console.log(zip);
    console.log(`IP Latitude: ` + lat);
    console.log(`IP Longitude: ` + lon);

    const log = mapToJSON(map);
    tg.sendData(log);
}

request();
