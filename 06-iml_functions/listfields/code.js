function listfields(body) {

	let arr = [];
	body.forEach(item => {
		let obj = {};
		obj.name = item.id;
		obj.label = iml.capitalize(item.name);
		obj.required = item.required === true;
		obj.help = item.help || "Sample: please enter " + obj.label + " value";
		
		if(item.choices) {
			obj.type = "select";
			obj.options = [];
			for (let [key, value] of Object.entries(item.choices)) {
				let obj1 = {};
				obj1.label = iml.capitalize(key);
				obj1.value = value;
				
				obj.options.push(obj1);
			}
		}
		
		else obj.type = "text";
		
		arr.push(obj);
		
	});
	
	return {
		name: "params",
		label: "Fields",
		type: "collection",
		spec: arr
	};

}