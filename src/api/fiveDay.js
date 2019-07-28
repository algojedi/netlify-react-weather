const axios = require('axios');


exports.handler = function (event, context, callback) {

	const { API_KEY, API_URL } = process.env;
	
	const send = body => {
		callback(null, {
			statusCode: 200,
			body: JSON.stringify(body)
		});
	}

	const cityName = event.queryStringParameters.city;
	const units = event.queryStringParameters.units;
	const URL = `${API_URL}forecast?q=${cityName}&units=${units}&appid=${API_KEY}`;
	//api call
	const fiveDay = () => {
		axios.get(URL)
			.then(res => send(res.data))
			.catch(err => send(err));
	}

	if (event.httpMethod === 'GET') {
		fiveDay();
	}
}