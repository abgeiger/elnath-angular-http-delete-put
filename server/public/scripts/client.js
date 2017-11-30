var app = angular.module('RestaurantApp', []);

app.controller('FoodController', ['$http', function ($http){
    console.log('Food Controller has been loaded');
    var self = this;
    self.message = 'Zip zap partner!';
    self.foodArray = [];

    self.newFood = { is_hot: false };

    self.getFood = function () {
        $http({
            method: 'GET',
            url: '/food'
        }).then(function(response) {
            console.log('response', response.data);
            self.foodArray = response.data;
        });
    };

    self.addNewFood = function(newFood) {
        $http({
            method: 'POST',
            url: '/food',
            data: newFood
        }).then(function(response) {
            console.log('response', response);
            self.newFood = { is_hot: false };
            self.getFood();
        });
    };

    self.deleteFood = function(foodToDelete) {
        $http({
            method: 'DELETE',
            url: '/food/' + foodToDelete.id,
        }).then(function(response) {
            console.log('response', response);
            self.getFood();
        });
    };

    self.editFood = function(foodToEdit) {
        $http({
            method: 'PUT',
            url: '/food',
            data: foodToEdit
        }).then(function(response) {
            console.log('response', response);
            self.getFood();
        });
    };
    
    self.getFood();
    
}]);