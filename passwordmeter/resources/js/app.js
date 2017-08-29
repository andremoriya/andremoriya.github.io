var app = angular.module("passwordMeterApp", ['ngResource']);

var context = "http://localhost:8081/";

app.controller("passwordController", function ($scope, PasswordCheck) {

    var score = [
        {type:"VERY_SHORT",  labelCss:"label-danger"},
        {type:"VERY_WEAK",   labelCss:"label-danger"},
        {type:"WEAK",        labelCss:"label-warning"},
        {type:"GOOD",        labelCss:"label-info"},
        {type:"STRONG",      labelCss:"label-success"},
        {type:"VERY_STRONG", labelCss:"label-primary"}
    ];

    $scope.onChangePassword = function () {
        if($scope.password != '') {            
            PasswordCheck.get({ password: $scope.password }, function(data) {                
                $scope.score = data.score.value;                
                showComplexity(data.complexity);
            });
        }else{
            init();
        }
    };

    function showComplexity(type) {
        for (var t in score) {
            var value = score[t];
            if(value.type === type){
                $scope.labelCss = value.labelCss;
                $scope.complexity = value.type;
                break;
            }
        }
    }

    function init() {
        $scope.score = 0;
        showComplexity("VERY_SHORT");
    }

    init();

});


app.factory("PasswordCheck", function($resource) {    
    return $resource(context + "check/:password");
});