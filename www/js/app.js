// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// angular.module('todo', ['ionic'])




// .run(function($ionicPlatform) {
//   $ionicPlatform.ready(function() {
//     // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
//     // for form inputs)
//     if(window.cordova && window.cordova.plugins.Keyboard) {
//       cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
//     }
//     if(window.StatusBar) {
//       StatusBar.styleDefault();
//     }
//   });
// })



// sort by completed or not
// edit on doubble click
  




var app = angular.module('todoApp', ['ionic', 'ui.sortable', 'LocalStorageModule'])
  .config(['localStorageServiceProvider', function(localStorageServiceProvider){
    localStorageServiceProvider.setPrefix('ls');
  }])
  .factory('Projects', function() {
  return {
    all: function() {
      var projectString = window.localStorage['projects'];
      if(projectString) {
        return angular.fromJson(projectString);
      }
      return [];
    },
    save: function(projects) {
      window.localStorage['projects'] = angular.toJson(projects);
    },
    newProject: function(projectTitle) {
      // Add a new project
      return {
        title: projectTitle,
        tasks: []
      };
    },
    getLastActiveIndex: function() {
      return parseInt(window.localStorage['lastActiveProject']) || 0;
    },
    setLastActiveIndex: function(index) {
      window.localStorage['lastActiveProject'] = index;
    }
  };
})
  .controller('TodoCtrl',['$scope', '$timeout', 'Projects', '$ionicSideMenuDelegate','$ionicModal', 'localStorageService','$filter',
   function($scope, $timeout, Projects, $ionicSideMenuDelagate, $ionicModal, localStorageService, $filter){

//     if(localStorageService.isSupported) {
//     console.log("yes");
//     var storageType = localStorageService.getStorageType();
//     console.log(storageType);
//   }

//     // var todosInStore = localStorageService.get('todos');

//     // $scope.todos = todosInStore || [];

//     $scope.$watch('todos', function () {
//       localStorageService.set('todos', $scope.todos);
//     }, true);


//     $scope.todoSortable = {
//     // containment : "parent",//Dont let the user drag outside the parent
//     cursor : "move",//Change the cursor icon on drag
//     tolerance : "pointer"//Read http://api.jqueryui.com/sortable/#option-tolerance
//     };

//     $scope.addTodo = function(todo){
//       todo.editing = false;
//       todo.isDone = false;
//       $scope.todos.push(todo);
//       console.log($scope.todo);
//       $scope.todo = '';

//     };

//     $scope.doneTodo = function(todo){
      
//       if(todo.isDone === false){
//         todo.isDone = true;
//         console.log(todo);
//       } else {
//         todo.isDone = false;
//         console.log(todo);
//       }

//     };

//     $scope.deleteTodo = function(index){
//       $scope.todos.splice(index,1);

//     };

//     $scope.clearTodo = function(){
//       $scope.todos = [];
//     };

//     $scope.edit = function(){
//       console.log("hello!");
//     };

//    $scope.editTodo = function (todo) {
//     console.log("Editing");
//         todo.editing = true;
//     };

//     $scope.doneEditing = function (todo) {
//       var found = $filter('getByEditable')($scope.todos);
//       found.name = todo.name;
//       todo.editing = false;

//     };


// $scope.launch = function(){
//   dlg = $dialogs.confirm('Please Confirm','Is this awesome or what?');
//         dlg.result.then(function(btn){
//           $scope.confirmed = 'You thought this quite awesome!';
//         },function(btn){
//           $scope.confirmed = 'Shame on you for not thinking this is awesome!';
//         });
// };


  // A utility function for creating a new project
  // with the given projectTitle
  var createProject = function(projectTitle) {
    var newProject = Projects.newProject(projectTitle);
    $scope.projects.push(newProject);
    Projects.save($scope.projects);
    $scope.selectProject(newProject, $scope.projects.length-1);
  }


  // Load or initialize projects
  $scope.projects = Projects.all();

  // Grab the last active, or the first project
  $scope.activeProject = $scope.projects[Projects.getLastActiveIndex()];

  // Called to create a new project
  $scope.newProject = function() {
    var projectTitle = prompt('Project name');
    if(projectTitle) {
      createProject(projectTitle);
    }
  };

  // Called to select the given project
  $scope.selectProject = function(project, index) {
    $scope.activeProject = project;
    Projects.setLastActiveIndex(index);
    $ionicSideMenuDelegate.toggleLeft(false);
  };

  // Create our modal
  $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope
  });

  $scope.createTask = function(task) {
    if(!$scope.activeProject || !task) {
      return;
    }
    $scope.activeProject.tasks.push({
      title: task.title
    });
    $scope.taskModal.hide();

    // Inefficient, but save all the projects
    Projects.save($scope.projects);

    task.title = "";
  };

  $scope.newTask = function() {
    $scope.taskModal.show();
  };

  $scope.closeNewTask = function() {
    $scope.taskModal.hide();
  };

  $scope.toggleProjects = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };


  // Try to create the first project, make sure to defer
  // this by using $timeout so everything is initialized
  // properly
  $timeout(function() {
    if($scope.projects.length === 0) {
      while(true) {
        var projectTitle = prompt('Your first project title:');
        if(projectTitle) {
          createProject(projectTitle);
          break;
        }
      }
    }
  });


        
}]);
// .run(['$templateCache',function($templateCache){
//   $templateCache.put('/dialogs/whatsyourname.html','<div class="modal"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h4 class="modal-title"><span class="glyphicon glyphicon-star"></span> User\'s Name</h4></div><div class="modal-body"><ng-form name="nameDialog" novalidate role="form"><div class="form-group input-group-lg" ng-class="{true: \'has-error\'}[nameDialog.username.$dirty && nameDialog.username.$invalid]"><label class="control-label" for="username">Name:</label><input type="text" class="form-control" name="username" id="username" ng-model="user.name" ng-keyup="hitEnter($event)" required><span class="help-block">Enter your full name, first &amp; last.</span></div></ng-form></div><div class="modal-footer"><button type="button" class="btn btn-default" ng-click="cancel()">Cancel</button><button type="button" class="btn btn-primary" ng-click="save()" ng-disabled="(nameDialog.$dirty && nameDialog.$invalid) || nameDialog.$pristine">Save</button></div></div></div></div>');
// }]);








