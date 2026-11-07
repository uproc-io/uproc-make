function showErrors(errors) {
	let string = "";
	if(Array.isArray(errors)) {
		errors.forEach(item => {
			string = string + "◉ " + item.msg + "\n";
		});
		
		return string;
	}
	
	return errors;
}