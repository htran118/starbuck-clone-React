const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: "us-east-2"});
const TableName = "StarbuckUserData";

function SignupResponse (statusCode, ResponseBody) {
	return {statusCode: statusCode,
			headers: {'Access-Control-Allow-Origin': '*',
					  'Access-Control-Allow-Credentials': true,},
			body: JSON.stringify(ResponseBody),};
}

exports.handler = async (event, context, callback) => {
	var response;
	const RequestBody = JSON.parse(event.body);
	const CheckParams = {TableName: TableName, Key: {"EmailAddress": RequestBody.EmailAdd},
						 AttributesToGet: ["Password"]};
	let result = await docClient.get(CheckParams).promise();
	if(result.Item !== undefined && result.Item !== null && result.Item.Password == RequestBody.Password) {
		response = SignupResponse(200, JSON.stringify('Login for ' + JSON.stringify(RequestBody.EmailAdd)));
	}
	else {
		response = SignupResponse(200, 'Wrong data');
	}
	return response;
};