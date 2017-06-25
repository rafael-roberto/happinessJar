/**
 * Created by Rafael Roberto on 30/06/2016.
 */

document.addEventListener("deviceready",onDeviceReady,false);

var db = window.openDatabase("happinessJar", "1.0", "Base do Sistema HappinessJar", 200000);
var debugScript = true;
var happinessCategorias = {};

function onDeviceReady(){
    gravarLog('Aplicação iniciada');
    /*window.sqlitePlugin.selfTest(function() {
      console.log('SELF test OK');
  });*/
    var domElement = document.getElementById('appHTML');
    angular.bootstrap(domElement, ["happinessJar"]);
    db.transaction(populateDomains, errorHandler, loadCategorias);
}


var happinessJar = angular.module('happinessJar', ['ngRoute','ngResource','ngAnimate', 'ngCordova']);

happinessJar.directive('happinessMenu', function(){
    return {
        restrict: 'E',
        templateUrl: 'templates/happiness-menu.html'
    };
});

happinessJar.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'views/happinessCreate.html',
            controller: 'happinessController'
        }).
        when('/happinessRandShow', {
            templateUrl: 'views/happinessRandShow.html',
            controller: 'happinessController'
        }).
        when('/happinessCategoriaShow/:idCategoria', {
            templateUrl: 'views/happinessCategoriaShow.html',
            controller: 'happinessController'
        }).
        when('/happinessCategoriaList/', {
            templateUrl: 'views/happinessCategoriaList.html',
            controller: 'happinessController'
        }).
        when('/happinessConsultarLote/', {
            templateUrl: 'views/happinessConsultarLote.html',
            controller: 'happinessController'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

function nullHandler(msg) { //exibe os erros ocorridos, caso ocorra algum
    if(typeof msg!=="undefined"){gravarLog(msg)}
}

function errorHandler(error){
    if(typeof error!=='undefined'){
        if (error.message=="could not execute statement due to a constaint failure (19 constraint failed)"){
            //alert('Ocorreu um erro! Uma condição da base de dados não foi atendida durante essa ação!');
            console.log(error.message);
        } else {
            //alert('Ocorreu um erro! Mensagem: ' + error.message + ' Código: ' + error.code);
            console.log(error.message);
        }
    } else {
        alert('Ocorreu um erro!');
        console.log('Ocorreu um erro!');
    }
}

function gravarLog(log){
    if (debugScript) console.log(log);
}
