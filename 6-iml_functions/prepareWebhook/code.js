function prepareWebhook(webhook) {
	let string = "";
	if(webhook && webhook.length > 0) {
		string = ', "callback": {"data": "' + webhook + '"}';
		return string;
	}
	
	return "";
}