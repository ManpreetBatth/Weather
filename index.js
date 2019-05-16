const ct = require('countries-and-timezones');
const fetch = require('node-fetch')

/**
 * openweathermap API KEY .This is used for get wether information
 */
let apiKey = 'a4c8504f57a8d7a1111739fc7e39225b'


/**
 * calculateTime is a function used for calculating local time of every timezone
 * @param {*} city - City name to display the name of that place
 * @param {*} offset - this is a time which is added in UTC time
 */
async function calculateTime(city, offset) {
    d = new Date();
    utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    nd = new Date(utc + (3600000 * offset / 60));
    return "The local time in " + city + " is " + nd.toLocaleString();
}


/**
 * weather function is used to console weater and local time
 */
async function weather() {
    let cityArray = ['Mumbai,IN', 'Chandigarh,IN', 'New York,US', 'Dublin,IE', 'Auckland,NZ']

    for (let i = 0; i < cityArray.length; i++) {
        console.log()
        console.log(cityArray[i])
        let city = cityArray[i]

        /**
         * Below is a third party api call for get all weather related information
         */
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

        country_code = cityArray[i].split(',')

        /**
         * countries-and-timezones npm is used to get timezone of place 
         */
        let mxTimezones = ct.getTimezonesForCountry(country_code[1]);
        let timeadd = mxTimezones[0].utcOffset

        await fetch(url, {
                method: 'GET'
            })
            .then(res => res.json())
            .then(async json => {
                if (json) {
                    console.log(await calculateTime(country_code[0], timeadd))
                    console.log('Place : ' + json.name)
                    console.log('Weather : ' + json.main.temp + ' Degree')
                    console.log('Temperature : ' + json.weather[0].main + ' ,' + json.weather[0].description)
                } else {
                    console.log('Error')
                }
            })
    }
}

weather()