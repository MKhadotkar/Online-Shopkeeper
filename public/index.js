var app = angular.module("shopkeeparapp",["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "home.html"
    })
    .when("/signup", {
        templateUrl : "signup.html",
        controller :"signup_controller"
    })
    .when("/sklogin", {
        templateUrl : "sklogin.html",
        controller : "skcloginontroller"
    })
    .when("/custlogin", {
        templateUrl : "custlogin.html",
        controller  : "custlogin_contoller"
    })
    .when("/start", {
        templateUrl : "custlogin.html",
          controller  : "custlogin_contoller"
    })
    .when("/forget", {
        templateUrl : "forget.html",
    })
});

var urls ="http://localhost:3333/"

app.controller("shopkeeparcontroller",function($scope,$http){
  console.log("i am in controllers");
})
