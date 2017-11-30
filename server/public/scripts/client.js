var app = angular.module('RestaurantApp', []);

app.controller('FoodController', ['$http', function ($http){
    console.log('Food Controller has been loaded');
    var self = this;
    self.message = 'Zip zap partner!';
    self.foodArray = [];

    self.getFood = function () {
        $http({
            method: 'GET',
            url: '/food'
        }).then(function(response) {
            console.log('response', response.data);
            self.foodArray = response.data;
        });
    };
    
    self.getFood();
    
}]);