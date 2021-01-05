(function(){

    'use strict';

    angular.module('NarrowItDownApp')
    .directive('foundItems', foundItemsDirective);

    function foundItemsDirective(){

        return {
            templateUrl:"found-items/foundItems.tpl.html",
            scope:{
                items:"<",
                remove:"&onRemove"
            },
            bindToController: true,
            controller: foundItemsController,
            controllerAs: "FoundItemsCtrl"
        };
    }

    function foundItemsController(){

        var foundItemsCtrl = this;
    }

})();