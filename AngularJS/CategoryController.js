//CategoryController manages the business logic for api.meetup.com/2/categories
app.controller('CategoryController', function($http, $sce, $scope, PreferenceSvc){
	
	var vm = this;
	var categories = [];
	
	//url for api.meetup.com/2/categories - getting all categories for groups 
	var url = "https://api.meetup.com/2/categories?key=5f49861e74434dc342893235c26&sign=true";
	//setting trust for api url
	var trustedUrl = $sce.trustAsResourceUrl(url);
	
	//getData() returns data from api.meetup.com/find/groups
	vm.getData = function(){
		return $http.jsonp(trustedUrl, {jsonpCallbackParam: 'callback'})
		.then(function onSuccess(response){
			
		});
	};
	
	//setData() sets data from api to categories array
	vm.setData = function(){
		$http.jsonp(trustedUrl, {jsonpCallbackParam: 'callback'})
		.then(function onSuccess(response){
			//setting array categories to data retrieved from api
			vm.categories = response.data;
			
		});
	};
	
	//Getting initial data from api
	vm.getData();
	
	
	//Preferred Categories from dropdown list
	var prefCategory = {};
	
	//Additional Categories from checkboxes
	var addCategories = [];
	
	//Setting the Preferred Category bound to the drop down list
	vm.savePreferred = function(prefCategory){
		//Uses service method to set preferred category
		PreferenceSvc.setPreferred(prefCategory);

		//Uses service method to set additional categories
		PreferenceSvc.setAdditional(addCategories);
		alert("Your preferences have been saved. Please navigate to the Groups page.");
	};
	
	//addCat() pushes each checked category to the additional categories array
	vm.addCat = function(name){
		if(document.getElementById('check').checked){
			return;
		}else{
			addCategories.push(name);
		}
	};
	
	//Refreshing data request for cache
	vm.getData();
	//Setting data to categories
	vm.setData();
});