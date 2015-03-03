app.filter('getByEditable', function() {
	return function(input){
		for(var i = 0; i<input.length; i++){
			if(input[i].editing === true){
				return input[i];
			}
		}
		return "hi";
	};
});

app.filter('getByDone', function() {
	return function(input){
		var newTodos = [];
		for(var i = 0; i<input.length; i++){
			if(input[i].isDone === true){
				newTodos.push(input[i]);
			}
			
		}
		return newTodos;
	};
});
