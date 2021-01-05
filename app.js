(function () {

    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', narrowItDownController)
        .service('MenuSearchService', menuSearchService)
        .constant('apiUrl', 'https://davids-restaurant.herokuapp.com/menu_items.json');


    narrowItDownController.$inject = ['MenuSearchService', '$timeout'];
    function narrowItDownController(MenuSearchService, $timeout) {

        var narrowItDownCtrl = this;
        narrowItDownCtrl.foundItems = [];
        narrowItDownCtrl.searchItem = '';
        narrowItDownCtrl.showLoader = false;
        narrowItDownCtrl.searchClicked = false;

        narrowItDownCtrl.search = function () {
            narrowItDownCtrl.searchClicked = false;
            narrowItDownCtrl.foundItems = [];

            if (narrowItDownCtrl.searchItem !== '') {
                narrowItDownCtrl.showLoader = true;

                MenuSearchService.getMatchedMenuItems(narrowItDownCtrl.searchItem).then(
                    function (founds) {
                        narrowItDownCtrl.foundItems = founds;
                        narrowItDownCtrl.searchClicked = true;
                        narrowItDownCtrl.showLoader = false;

                    });

            } else {

                narrowItDownCtrl.searchClicked = true;
            }

            // narrowItDownCtrl.showLoader = false;
        };

        narrowItDownCtrl.removeItem = function (index) {
            narrowItDownCtrl.foundItems.splice(index, 1);
        };
    }

    menuSearchService.$inject = ['$http', 'apiUrl', '$q'];
    function menuSearchService($http, apiUrl, $q) {

        var menuService = this;

        menuService.getMatchedMenuItems = function (searchItem) {

            return $http.get(apiUrl).then(function (response) {

                if (response.data.menu_items.length > 0) {

                    var foundItems = response.data.menu_items.filter(function (item) {
                        return item.description.indexOf(searchItem) > -1;
                    });
                    // deferred.resolve(foundItems);
                    return foundItems;
                } else {
                    // deferred.resolve(response.data);
                    return response.data.menu_items;
                }

            }, function (error) {
                // $q.reject(error);
                return error;
            });

            // return deferred.promise;
        }
    }

})();

