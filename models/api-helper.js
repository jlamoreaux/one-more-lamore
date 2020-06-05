const request = require('request');
const authToken = process.env.GOOGLE_CLIENT_SECRET;
const apiEndpoint = process.env.GOOGLE_ALBUMS_API_ENDPOINT;

const api_helper = async function () {
	// Make a GET request to load the albums with optional parameters (the
	// pageToken if set).
	const result = await request.get(apiEndpoint + '/v1/albums', {
		headers: { 'Content-Type': 'application/json' },
		json: true,
		auth: { 'bearer': authToken },
	});
};

module.exports = api_helper;