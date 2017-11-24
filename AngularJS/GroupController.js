//GroupController manages the business logic for api.meetup.com/find/groups
app.controller('GroupController', function($http, $sce, $scope, PreferenceSvc) {
	var vm = this;
	var groups = [];
	//Preferred Category
	var pCategory;
	//Additional Categories
	var additionalCat = [];
	//url for api.meetup.com/find/groups - getting all groups in johannesburg
	var url = "https://api.meetup.com/find/groups?key=5f49861e74434dc342893235c26&city=johannesburg&sign=true";
	//setting trust for api url
	var trustedUrl = $sce.trustAsResourceUrl(url)
	var trustAsHtml;
	pCategory = PreferenceSvc.getPreferred();
	//getting data from api.meetup.com/find/groups
	$http.jsonp(trustedUrl, {jsonpCallbackParam: 'callback'})
		.then(function onSuccess(response){
			//setting array groups to data retrieved from api
			vm.groups = response.data;
			
			//getting preferred category from service 
			vm.pCategory = PreferenceSvc.getPreferred();
    });
			vm.additionalCat=[];
			//getting additional categories array from service
			vm.additionalCat = PreferenceSvc.getAdditional();

});