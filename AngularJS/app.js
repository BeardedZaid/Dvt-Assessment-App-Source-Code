
var app = angular.module('meetUpApp', ['ngSanitize', 'ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider  ){
	//setting the default route to current page
	$urlRouterProvider.otherwise('/');
	
	//routes
	$stateProvider
		//routing to Groups Page
		.state('Groups',{
			url:'/',
			templateUrl:'Groups.html',
			controller:'GroupController'
		})
		//routing to Settings Page
		.state('Settings',{ 
			url:'/',
			templateUrl:'Settings.html',
			controller:'CategoryController',
			cache: false
		});
	//removing ! from url
	$locationProvider.hashPrefix('');
}]);

//Communication service between GroupController and CategoryController
app.service('PreferenceSvc', function(){
	
	//Returns the preferred category
	this.getPreferred = function(){
		return this.prefCategory;
	};
	//Returns additional categories array
	this.getAdditional = function(){
		return addCategory;
	};
	
	//Preferred Category
	var prefCategory = '';
	//Array of additional categories
	var addCategory = [];
	
	//Sets Preferred category based on argument
	this.setPreferred = function(preferredCat){
		this.prefCategory = preferredCat;
	};
	
	//Sets additional category based on array of categories argument
	this.setAdditional = function(arrCat){
		//clearing the array of additional categories
		addCategory = [];
		
		//loops through argument array to populate additional categories array
		for (var x in arrCat){
			addCategory.push(arrCat[x]);	
		}

	};

});





