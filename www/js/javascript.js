// sort by completed or not
// edit on doubble click
	




var app = angular.module('todoApp', ['ui.sortable', 'LocalStorageModule', 'ui.bootstrap','dialogs'])
  .config(['localStorageServiceProvider', function(localStorageServiceProvider){
    localStorageServiceProvider.setPrefix('ls');
  }])
	.controller('TodoCtrl',['$scope','localStorageService','$filter', '$dialogs',
	 function($scope, localStorageService, $filter, $dialogs){


		var todosInStore = localStorageService.get('todos');

    $scope.todos = todosInStore || [];

    $scope.$watch('todos', function () {
      localStorageService.set('todos', $scope.todos);
    }, true);


    $scope.todoSortable = {
    // containment : "parent",//Dont let the user drag outside the parent
    cursor : "move",//Change the cursor icon on drag
    tolerance : "pointer"//Read http://api.jqueryui.com/sortable/#option-tolerance
    };

		$scope.addTodo = function(){
			$scope.todo.editing = false;
			$scope.todo.isDone = false;
			$scope.todos.push($scope.todo);
			console.log($scope.todo);
			$scope.todo = '';

		};

		$scope.doneTodo = function(todo){
			
			if(todo.isDone === false){
				todo.isDone = true;
				console.log(todo);
			} else {
				todo.isDone = false;
				console.log(todo);
			}

		};

		$scope.deleteTodo = function(index){
			$scope.todos.splice(index,1);

		};

		$scope.clearTodo = function(){
			$scope.todos = [];
		};

		$scope.edit = function(){
			console.log("hello!");
		};

	 $scope.editTodo = function (todo) {
	 	console.log("Editing");
        todo.editing = true;
    };

    $scope.doneEditing = function (todo) {
    	var found = $filter('getByEditable')($scope.todos);
    	found.name = todo.name;
      todo.editing = false;

    };

$scope.launch = function(){
	dlg = $dialogs.confirm('Please Confirm','Is this awesome or what?');
        dlg.result.then(function(btn){
          $scope.confirmed = 'You thought this quite awesome!';
        },function(btn){
          $scope.confirmed = 'Shame on you for not thinking this is awesome!';
        });
};

        
}])
.run(['$templateCache',function($templateCache){
  $templateCache.put('/dialogs/whatsyourname.html','<div class="modal"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h4 class="modal-title"><span class="glyphicon glyphicon-star"></span> User\'s Name</h4></div><div class="modal-body"><ng-form name="nameDialog" novalidate role="form"><div class="form-group input-group-lg" ng-class="{true: \'has-error\'}[nameDialog.username.$dirty && nameDialog.username.$invalid]"><label class="control-label" for="username">Name:</label><input type="text" class="form-control" name="username" id="username" ng-model="user.name" ng-keyup="hitEnter($event)" required><span class="help-block">Enter your full name, first &amp; last.</span></div></ng-form></div><div class="modal-footer"><button type="button" class="btn btn-default" ng-click="cancel()">Cancel</button><button type="button" class="btn btn-primary" ng-click="save()" ng-disabled="(nameDialog.$dirty && nameDialog.$invalid) || nameDialog.$pristine">Save</button></div></div></div></div>');
}]);








