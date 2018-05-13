console.log('starting lambda function')

/***********************************************************************************
AWS Lambda boilerplate for API functions
This boilerplate is designed to be used with AWS API gateway and to return information
to a client
***********************************************************************************/

const util = require("util");
const Chatkit = require('@pusher/chatkit-server');

const chatkit = new Chatkit.default({
	instanceLocator: process.env.instanceLocator,
	key: process.env.secretKey,
});

exports.handler = (event, context, callback) => {
	const done = (err, response) => {
		// return the required callback function
		callback(null, {
			headers: {
				"Access-Control-Allow-Origin": "*", // need if calling API from WebView which is just a browser
				"Content-Type": "application/json",
				"Access-Control-Allow-Headers":
					"Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token"
			},
			statusCode: err ? "400" : "200",
			body: err
				? JSON.stringify({
						type: "error",
						err
					})
				: JSON.stringify({
						type: "success",
						response
					})
		});
	};

	const createChatUser = user => {
		chatkit.createUser({
			id: user.id,
			name: `${user.first_name} ${user.last_name}`,
		})
		.then(response => {
			console.log('User created successfully');
			done(null, response);
		}).catch((err) => {
			console.log(err);
			done(err);
		});
	};

	/*************************************************
	 * Enter here
	 */
	// view the event that was received
	console.log(
		"event: ",
		util.inspect(event, {
			showHidden: false,
			depth: null
		})
	);

	// try to execute API calls
	try {
		switch (event.queryStringParameters.action) {
			case "create-user":
				console.log('creating chat user');
				createChatUser(JSON.parse(event.body));
				break;
			default:
				console.log('wrong api endpoint');
				done("invalid query string");
				break;
		}
	} catch (error) {
		console.log('application error', error);
		done(error);
	}
};
