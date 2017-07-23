/**
 * Created by Rafael Roberto on 02/07/2016.
 */

happinessJar.controller("happinessController", function($scope, $routeParams, $cordovaSQLite, $log, $location) {

    /*$scope.categorias = {};

    angular.element(document).ready(function () {

        $scope.popularCategorias = function() {
            var dataAtual = new Date();
            $cordovaSQLite.execute(db, 'INSERT OR REPLACE INTO happinessCategorias (dataModificado, categoria) VALUES ("'+dataAtual+'", "Objetivos")', []).then(function(res) {$log.info("Categoria inserida!");}, function (err) {$log.error(err);});
            $cordovaSQLite.execute(db, 'INSERT OR REPLACE INTO happinessCategorias (dataModificado, categoria) VALUES ("'+dataAtual+'", "Relacionamentos")', []).then(function(res) {$log.info("Categoria inserida!");}, function (err) {$log.error(err);});
            $cordovaSQLite.execute(db, 'INSERT OR REPLACE INTO happinessCategorias (dataModificado, categoria) VALUES ("'+dataAtual+'", "Família")', []).then(function(res) {$log.info("Categoria inserida!");}, function (err) {$log.error(err);});
            $cordovaSQLite.execute(db, 'INSERT OR REPLACE INTO happinessCategorias (dataModificado, categoria) VALUES ("'+dataAtual+'", "Amigos")', []).then(function(res) {$log.info("Categoria inserida!");}, function (err) {$log.error(err);});
            $cordovaSQLite.execute(db, 'INSERT OR REPLACE INTO happinessCategorias (dataModificado, categoria) VALUES ("'+dataAtual+'", "Trabalho")', []).then(function(res) {$log.info("Categoria inserida!");}, function (err) {$log.error(err);});
            $cordovaSQLite.execute(db, 'INSERT OR REPLACE INTO happinessCategorias (dataModificado, categoria) VALUES ("'+dataAtual+'", "Estudos")', []).then(function(res) {$log.info("Categoria inserida!");}, function (err) {$log.error(err);});
            $cordovaSQLite.execute(db, 'INSERT OR REPLACE INTO happinessNotas (dataModificado, idCategoria, nota) VALUES ("'+dataAtual+'", 1, "1")', []).then(function(res) {$log.info("Categoria inserida!");}, function (err) {$log.error(err);});
            $cordovaSQLite.execute(db, 'INSERT OR REPLACE INTO happinessNotas (dataModificado, idCategoria, nota) VALUES ("'+dataAtual+'", 1, "2")', []).then(function(res) {$log.info("Categoria inserida!");}, function (err) {$log.error(err);});
            $cordovaSQLite.execute(db, 'INSERT OR REPLACE INTO happinessNotas (dataModificado, idCategoria, nota) VALUES ("'+dataAtual+'", 1, "3")', []).then(function(res) {$log.info("Categoria inserida!");}, function (err) {$log.error(err);});
            $cordovaSQLite.execute(db, 'INSERT OR REPLACE INTO happinessNotas (dataModificado, idCategoria, nota) VALUES ("'+dataAtual+'", 1, "4")', []).then(function(res) {$log.info("Categoria inserida!");}, function (err) {$log.error(err);});
            $cordovaSQLite.execute(db, 'INSERT OR REPLACE INTO happinessNotas (dataModificado, idCategoria, nota) VALUES ("'+dataAtual+'", 1, "5")', []).then(function(res) {$log.info("Categoria inserida!");}, function (err) {$log.error(err);});
            $log.info('Criadas categorias de Felicidade modelo!');
            $scope.carregaCategorias();
        }

        var db = $cordovaSQLite.openDB({ name: "happinessJar.db", location: 'default', androidDatabaseImplementation: 2 });

        var query = "DROP TABLE IF EXISTS happinessNotas";
        $cordovaSQLite.execute(db, query, []).then(function(res) {
          $log.info("Tabela de Felicidades Removidas!");
        }, function (err) {
          $log.error(err);
        });

        var query = "DROP TABLE IF EXISTS happinessCategorias";
        $cordovaSQLite.execute(db, query, []).then(function(res) {
          $log.info("Tabela de Categorias Removidas!");
        }, function (err) {
          $log.error(err);
      });

        var query = 'CREATE TABLE IF NOT EXISTS happinessCategorias ('+
        'idCategoria INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,'+
        'dataModificado TEXT NOT NULL,'+
        'categoria TEXT NOT NULL UNIQUE);';
        $cordovaSQLite.execute(db, query, []).then(function(res) {
          $log.info("Tabela de Categorias criada!");
          $scope.popularCategorias();
        }, function (err) {
          $log.error(err);
        });

        var query = 'CREATE TABLE IF NOT EXISTS happinessNotas ('+
        'idNota INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,'+
        'idCategoria INTEGER NOT NULL,'+
        'dataModificado TEXT NOT NULL,'+
        'nota TEXT NOT NULL UNIQUE);';
        $cordovaSQLite.execute(db, query, []).then(function(res) {
          $log.info("Tabela de Felicidades criada!");
        }, function (err) {
          $log.error(err);
      });

    });

    $scope.carregaCategorias = function(){
        var db = $cordovaSQLite.openDB({ name: "happinessJar.db", location: 'default', androidDatabaseImplementation: 2 });
        $cordovaSQLite.execute(db, 'SELECT * FROM happinessCategorias ORDER BY categoria', []).then(function(res) {
            for (var i = 0; i < res.rows.length; i++) {
                //$scope.categorias.push(res.rows.item(i));
                happinessCategorias[res.rows.item(i).idCategoria] = res.rows.item(i).categoria;
                $('#select-happinessCategorias').append('<option value="'+res.rows.item(i).idCategoria+'" >'+res.rows.item(i).categoria+'</option>');
                $('#select-ShowhappinessCategorias').append('<option value="'+res.rows.item(i).idCategoria+'" >'+res.rows.item(i).categoria+'</option>');
            }
            $('select').material_select();
        }, function (err) {
            $log.error(err);
        });
    };

    $scope.listarCategorias = function(){
        var db = $cordovaSQLite.openDB({ name: "happinessJar.db", location: 'default', androidDatabaseImplementation: 2 });
        $cordovaSQLite.execute(db, 'SELECT * FROM happinessCategorias ORDER BY categoria;', []).then(function(res) {
            var html="";
            for (var i = 0; i < res.rows.length; i++) {
                html+='<li class="collection-item">'+res.rows.item(i).categoria+'</li>';
                categorias.push(res.rows.item(i).categoria);
            }
            $("#list-happinessNotas").html(html);
        }, function (err) {
            $log.error(err);
        });
    };


    $scope.showCategoriaNotas = function(){
        var db = $cordovaSQLite.openDB({ name: "happinessJar.db", location: 'default', androidDatabaseImplementation: 2 });
        $cordovaSQLite.execute(db, 'SELECT a.categoria, b.nota, b.dataModificado FROM happinessCategorias AS a JOIN happinessNotas as b on a.idCategoria=bidCategoria WHERE b.idCategoria=?;', [idCategoria]).then(function(res) {
            $("#show-happinessCategorias").text(results.rows.item(0).categoria);
            for (var i = 0; i < results.rows.length; i++) {
                $("#show-happinessNotas").html('<div class="input-field"><i class="material-icons left">&#xE873;</i><span><b>'+results.rows.item(i).dataModificado+'</b> - '+results.rows.item(i).nota+'</span></div>');
            }
        }, function (err) {
            $log.error(err);
        });
    };

    $scope.createCategorias = function(){
        $("div.card-content").addClass('center-align');
        $("#form-happinessList").addClass('hide');
        $("#loading-happinessList").removeClass('hide');
        var dataAtual = new Date(); //pega a data atual
        categoria = $("#input-happinessList").val();
        setTimeout(
            function()
            {
                var db = $cordovaSQLite.openDB({ name: "happinessJar.db", location: 'default', androidDatabaseImplementation: 2 });
                $cordovaSQLite.execute(db, 'INSERT INTO happinessCategorias (categoria,dataModificado) VALUES (?,?)',[categoria,dataAtual]).then(function(res) {
                    $scope.listarCategorias();
                    $("#form-happinessList").removeClass('hide');
                    $("div.card-action").removeClass('center-align');
                    $("#loading-happinessList").addClass('hide');
                    $("#input-happinessNotas").val('');
                    Materialize.toast('Categoria registrada!', 4000)
                }, function (err) {
                    $("#form-happinessList").removeClass('hide');
                    $("div.card-action").removeClass('center-align');
                    $("#loading-happinessList").addClass('hide');
                    $log.error(err);
                });
            }, 2000);
    };

    $scope.createNotas = function(){
        $("div.card-content").addClass('center-align');
        $("#form-happinessCreate").addClass('hide');
        $("#loading-happinessCreate").removeClass('hide');
        var dataAtual = new Date(); //pega a data atual
        idCategoria = $("#select-happinessCategorias option:selected").val();
        nota = $("#input-happinessNotas").val();
        setTimeout(
            function()
            {
                var db = $cordovaSQLite.openDB({ name: "happinessJar.db", location: 'default', androidDatabaseImplementation: 2 });
                $cordovaSQLite.execute(db, 'INSERT INTO happinessNotas (idCategoria,dataModificado,nota) VALUES (?,?,?)',[idCategoria,dataAtual,nota]).then(function(res) {
                    $("#form-happinessCreate").removeClass('hide');
                    $("div.card-action").removeClass('center-align');
                    $("#loading-happinessCreate").addClass('hide');
                    $("#input-happinessNotas").val('');
                    Materialize.toast('Felicidade registrada!', 4000)
                },function (err) {
                    $log.error(err);
                    $("#form-happinessCreate").removeClass('hide');
                    $("div.card-action").removeClass('center-align');
                    $("#loading-happinessCreate").addClass('hide');
                    Materialize.toast('Ocorreu algum erro ao salvar essa felicidade!', 4000)
                })
            }, 2000);
    };

    $scope.showRandHappiness = function(){
        var db = $cordovaSQLite.openDB({ name: "happinessJar.db", location: 'default', androidDatabaseImplementation: 2 });
        /*$cordovaSQLite.execute(db, 'SELECT count(*) AS thecount FROM happinessNotas;', []).then(function(results) {
            var randomNum = Math.floor(Math.random() * results.rows.item(0).thecount) + 1;
            $log.info(randomNum);
            $cordovaSQLite.execute(db, 'SELECT idNota FROM happinessNotas WHERE idNota NOT IN (SELECT idNota FROM happinessNotas LIMIT '+(randomNum - 1)+') LIMIT 1', []).then(function(results) {
                $log.info(results.rows.item(0).idnota);
                $cordovaSQLite.execute(db, 'SELECT b.categoria as categoria, a.nota as nota FROM happinessNotas AS a JOIN happinessCategorias AS b ON a.idCategoria=b.idCategoria WHERE idNota =?',[results.rows.item(0).idNota]).then(function(results) {
                    $log.info(results.rows.item(0).categoria);
                    $("#show-happinessCategorias").text(results.rows.item(0).categoria);
                    $("#show-happinessNotas").text(results.rows.item(0).nota);
                }, function (err) {
                    $log.error(err);
                });
            }, function (err) {
                $log.error(err);
            });
        }, function (err) {
            $log.error(err);
        });
        $cordovaSQLite.execute(db, 'SELECT b.categoria as categoria, a.nota as nota FROM happinessNotas AS a JOIN happinessCategorias AS b ON a.idCategoria=b.idCategoria',[]).then(function(res) {
            $log.info(res.rows.item(0).categoria);
            $("#show-happinessCategorias").text(res.rows.item(0).categoria);
            $("#show-happinessNotas").text(res.rows.item(0).nota);
        }, function (err) {
            $log.error(err);
        });
    };

    $scope.reloadRandHappiness = function(){
        $("#show-happinessRandShow").addClass('hide');
        $("#loading-happinessRandShow").removeClass('hide');
        $scope.showRandHappiness();
        setTimeout(
            function()
            {
                $("#loading-happinessRandShow").addClass('hide');
                $("#show-happinessRandShow").removeClass('hide');
            }, 2000);
    };


    $scope.loadRandHappiness = function(){
        $location.path("/happinessRandShow");
        $scope.showRandHappiness();
    };*/

});
