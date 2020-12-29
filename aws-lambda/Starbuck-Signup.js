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
						 AttributesToGet: ["EmailAddress"]};
	let result = await docClient.get(CheckParams).promise();
	if(result.Item !== undefined && result.Item !== null) {
		response = SignupResponse(200, 'Data existed');
	}
	else {
		const InputParams = {
			TableName: TableName,
			Item: {
				date: Date.now(),
				FirstName: RequestBody.FirstName,
				LastName: RequestBody.LastName,
				EmailAddress: RequestBody.EmailAdd,
				Password: RequestBody.Password,
				Subscription: RequestBody.Subscription,
			},
		};
		result = await docClient.put(InputParams).promise();
		response = SignupResponse(200, JSON.stringify('Data submitted for ' + RequestBody.EmailAdd));
	}
	return response;
};