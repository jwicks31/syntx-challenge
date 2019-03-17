import resource from 'resource-router-middleware';
import fetch from 'node-fetch';

const toLatLongString = ({ lat, lng }) => `${lat},${lng}`;
const findCityByZip = async (zipCode) => {
	try {
		const response = await fetch(`https://www.zipcodeapi.com/rest/GaufizMLSvdzZfMvgs72U1RWprK4SZKCTKRvVYkqC2gDp1aZsoLA175LS51bQ4mn/info.json/${zipCode}/degrees`)
		const json = await response.json();
		return toLatLongString(json);
	} catch (e) {
		throw new Error(e);
	}
}

const findBestCity = async ({ name, zipCode }) => {
	try {
		if (name) {
			const response = await fetch(`https://www.metaweather.com/api/location/search/?query=${name}`)
			const json = await response.json();
			if (json[0]) return json[0];
			  else throw new Error('No City Found');
		}
		if (zipCode) {
			const lattlong = await findCityByZip(zipCode);
			const response = await fetch(`https://www.metaweather.com/api/location/search/?lattlong=${lattlong}`);
			const json = await response.json();
			return json && json[0];
		}
		else throw new Error('No city name or zip code');
	} catch (e) {
		throw new Error(e);
	}
}

const getFiveDayForecast = async (woeid) => {
	try {
		const response = await fetch(`https://www.metaweather.com/api/location/${woeid}/`)
		const json = await response.json();
		return json;
	} catch (e) {
		throw new Error(e);
	}
}

const getSevenDayForecast = async (woeid) => {
	try {
		const date = new Date();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();
		const day = date.getDate();
		const fiveDayForecast = await getFiveDayForecast(woeid);
		const sixthDay = await fetch(`https://www.metaweather.com/api/location/${woeid}/${year}/${month}/${day + 6}/`)
		const seventhDay = await fetch(`https://www.metaweather.com/api/location/${woeid}/${year}/${month}/${day + 7}/`)
		const sixthDayJSON = await sixthDay.json();
		const seventhDayJSON = await seventhDay.json();
		return {
			forecast: [...fiveDayForecast.consolidated_weather, sixthDayJSON[0], seventhDayJSON[0]],
			city: fiveDayForecast.title,
			state: fiveDayForecast.parent.title
		};
	} catch (e) {
		throw new Error(e);
	}
}

export default ({ config, db }) => resource({
	/** GET / - List all entities */
	async index({ query }, res) {
		if (query.city) {
			try {
				const cityInfo = await findBestCity({ name: query.city });
				const forecastInfo = await getSevenDayForecast(cityInfo.woeid);
				res.json(forecastInfo);
			} catch (e) {
				if (e.message === 'Error: No City Found') 
					res.send({
						message: e.message
					});
				else 
					res.send({
						message: 'Error Retrieving Forecast'
					});
			}
		}
		if (query.zipCode) {
			try {
				const cityInfo = await findBestCity({ zipCode: query.zipCode });
				const forecastInfo = await getSevenDayForecast(cityInfo.woeid);
				res.json(forecastInfo);
			} catch (e) {
				res.send({
					message: 'Error Retrieving Forecast'
				});
			}
		} else {
			res.send({
				message: 'Please provide city or zip code'
			})
		}
	},
});
