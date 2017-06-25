/**
 * Created by Rafael Roberto on 02/07/2016.
 */

function populateDomains(tx) {

    //tx.executeSql('DROP TABLE IF EXISTS happinessCategorias');
    //tx.executeSql('DROP TABLE IF EXISTS happinessNotas');

    var dataAtual = new Date();

    tx.executeSql(
        'CREATE TABLE IF NOT EXISTS happinessCategorias ('+
        'idCategoria INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,'+
        'dataModificado TEXT NOT NULL,'+
        'categoria TEXT NOT NULL UNIQUE);'
    );

    gravarLog('Criado tabela de Categorias de Felicidade');

    tx.executeSql('INSERT OR REPLACE INTO happinessCategorias (idCategoria, dataModificado, categoria) VALUES (1, date("now"), "Objetivos")');
    tx.executeSql('INSERT OR REPLACE INTO happinessCategorias (idCategoria, dataModificado, categoria) VALUES (2, date("now"), "Relacionamentos")');
    tx.executeSql('INSERT OR REPLACE INTO happinessCategorias (idCategoria, dataModificado, categoria) VALUES (3, date("now"), "Família")');
    tx.executeSql('INSERT OR REPLACE INTO happinessCategorias (idCategoria, dataModificado, categoria) VALUES (4, date("now"), "Amigos")');
    tx.executeSql('INSERT OR REPLACE INTO happinessCategorias (idCategoria, dataModificado, categoria) VALUES (5, date("now"), "Trabalho")');
    tx.executeSql('INSERT OR REPLACE INTO happinessCategorias (idCategoria, dataModificado, categoria) VALUES (6, date("now"), "Estudos")');

    gravarLog('Criadas categorias de Felicidade modelo');

    tx.executeSql(
        'CREATE TABLE IF NOT EXISTS happinessNotas ('+
        'idNota INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,'+
        'idCategoria INTEGER NOT NULL,'+
        'dataModificado TEXT NOT NULL,'+
        'nota TEXT NOT NULL UNIQUE);'
    );

    /*tx.executeSql('INSERT OR REPLACE INTO happinessNotas (idCategoria, dataModificado, nota) VALUES (1,date("now"), "1")');
    tx.executeSql('INSERT OR REPLACE INTO happinessNotas (idCategoria, dataModificado, nota) VALUES (1,date("now"), "2")');
    tx.executeSql('INSERT OR REPLACE INTO happinessNotas (idCategoria, dataModificado, nota) VALUES (1,date("now"), "3")');
    tx.executeSql('INSERT OR REPLACE INTO happinessNotas (idCategoria, dataModificado, nota) VALUES (1,date("now"), "4")');
    tx.executeSql('INSERT OR REPLACE INTO happinessNotas (idCategoria, dataModificado, nota) VALUES (2,date("now"), "5")');
    tx.executeSql('INSERT OR REPLACE INTO happinessNotas (idCategoria, dataModificado, nota) VALUES (2,date("now"), "6")');
    tx.executeSql('INSERT OR REPLACE INTO happinessNotas (idCategoria, dataModificado, nota) VALUES (3,date("now"), "7")');*/

    gravarLog('Criado tabela de Anotações de Felicidade');

}

function loadCategorias(){
    db.transaction(function(tx) {tx.executeSql('SELECT * FROM happinessCategorias ORDER BY categoria',[],function(tx,results){
        for (var i = 0; i < results.rows.length; i++) {
            happinessCategorias[results.rows.item(i).idCategoria] = results.rows.item(i).categoria;
            $('#select-happinessCategorias').append('<option value="'+results.rows.item(i).idCategoria+'" >'+results.rows.item(i).categoria+'</option>');
            //$('#select-ShowhappinessCategorias').append('<option value="'+results.rows.item(i).idCategoria+'" >'+results.rows.item(i).categoria+'</option>');
        }
        $('select').material_select();
    },function(error){
        errorHandler(error);
    })});
}

function showRandHappiness(){
    db.transaction(function(tx) {tx.executeSql('SELECT count(*) AS thecount FROM happinessNotas;',[],function(tx,results){
        var randomNum = Math.floor(Math.random() * results.rows.item(0).thecount) + 1;
        db.transaction(function(tx) {tx.executeSql('SELECT idNota FROM happinessNotas WHERE idNota NOT IN (SELECT idNota FROM happinessNotas LIMIT '+(randomNum - 1)+') LIMIT 1',[],function(tx,results){
            db.transaction(function(tx) {tx.executeSql('SELECT b.categoria, a.nota FROM happinessNotas AS a JOIN happinessCategorias AS b ON a.idCategoria=b.idCategoria WHERE idNota =?',[results.rows.item(0).idNota],function(tx,results){
                $("#show-happinessCategorias").text(results.rows.item(0).categoria);
                $("#show-happinessNotas").text(results.rows.item(0).nota);
            },errorHandler)});
        },errorHandler)});
    },errorHandler)})
}

function reloadRandHappiness(){
    $("#show-happinessRandShow").addClass('hide');
    $("#loading-happinessRandShow").removeClass('hide');
    showRandHappiness();
    setTimeout(
        function()
        {
            $("#loading-happinessRandShow").addClass('hide');
            $("#show-happinessRandShow").removeClass('hide');
        }, 2000);
}

function createNotas(){
    $("div.card-content").addClass('center-align');
    $("#form-happinessCreate").addClass('hide');
    $("#loading-happinessCreate").removeClass('hide');
    var dataAtual = new Date(); //pega a data atual
    idCategoria = $("#select-happinessCategorias option:selected").val();
    nota = $("#input-happinessNotas").val();
    setTimeout(
        function()
        {
            db.transaction(function(tx) {tx.executeSql('INSERT INTO happinessNotas (idCategoria,dataModificado,nota) VALUES (?,date("now"),?)',[idCategoria,nota],function(){
                $("#form-happinessCreate").removeClass('hide');
                $("div.card-action").removeClass('center-align');
                $("#loading-happinessCreate").addClass('hide');
                $("#input-happinessNotas").val('');
                Materialize.toast('Felicidade registrada!', 4000)
            },function(tx, error){
                errorHandler(error)
                $("#form-happinessCreate").removeClass('hide');
                $("div.card-action").removeClass('center-align');
                $("#loading-happinessCreate").addClass('hide');
                Materialize.toast('Ocorreu algum erro ao salvar essa felicidade!', 4000)
            });});
        }, 2000);
}

function createCategorias(){
    $("div.card-content").addClass('center-align');
    $("#form-happinessList").addClass('hide');
    $("#loading-happinessList").removeClass('hide');
    var dataAtual = new Date(); //pega a data atual
    categoria = $("#input-happinessList").val();
    setTimeout(
        function()
        {
            db.transaction(function(tx) {tx.executeSql('INSERT INTO happinessCategorias (categoria,dataModificado) VALUES (?,date("now"))',[categoria],function(){
                listCategorias();
                $("#form-happinessList").removeClass('hide');
                $("div.card-action").removeClass('center-align');
                $("#loading-happinessList").addClass('hide');
                $("#input-happinessNotas").val('');
                Materialize.toast('Categoria registrada!', 4000)
            },function(tx, error){
                //alert(error.message);
                //alert(error.code);
                errorHandler(error);
                $("#form-happinessList").removeClass('hide');
                $("div.card-action").removeClass('center-align');
                $("#loading-happinessList").addClass('hide');
                if (error.message=="could not execute statement due to a constaint failure (19 constraint failed)"){
                    Materialize.toast('Ocorreu algum erro ao salvar essa categoria! Uma condição da base de dados não foi atendida durante essa ação!', 4000)
                } else {
                    Materialize.toast('Ocorreu algum erro ao salvar essa categoria!', 4000)
                }
            });});
        }, 2000);
}

function showCategoriaNotas(idCategoria){
    db.transaction(function(tx) {tx.executeSql('SELECT a.categoria, b.nota, b.dataModificado FROM happinessCategorias AS a JOIN happinessNotas as b on a.idCategoria=b.idCategoria WHERE b.idCategoria=?;',[idCategoria],function(tx,results){
        $("#show-happinessCategorias").text(results.rows.item(0).categoria);
        for (var i = 0; i < results.rows.length; i++) {
            $("#show-happinessNotas").html('<div class="input-field"><i class="material-icons left">&#xE873;</i><span><b>'+results.rows.item(i).dataModificado+'</b> - '+results.rows.item(i).nota+'</span></div>');
        }
    },function(error){
        errorHandler(error);
    })});
}

var categorias = [];

function listCategorias(){
    db.transaction(function(tx) {tx.executeSql('SELECT * FROM happinessCategorias ORDER BY categoria;',[],function(tx,results){
        var html="";
        for (var i = 0; i < results.rows.length; i++) {
            html+='<li class="collection-item">'+results.rows.item(i).categoria+'</li>';
            categorias.push(results.rows.item(i).categoria);
        }
        $("#list-happinessNotas").html(html);
    },function(error){
        errorHandler(error);
    })});
}

function consultarLote(periodo){
    $("#select-happinessConsultarLote").addClass('hide');
    $("#loading-happinessConsultarLote").removeClass('hide');
    switch(periodo) {
        case 1:
            var dataInicial=new Date();
            dataInicial.setMonth(dataInicial.getMonth() - 1);
            var dataFinal=new Date();
            break;
        case 2:
            var dataInicial=new Date();
            dataInicial.setFullYear(dataInicial.getFullYear() - 1);
            var dataFinal=new Date();
            break;
        case 3:
            var dataInicial=Date.parse($('#consultarLote-dataInicial').val());
            var dataFinal=Date.parse($('#consultarLote-dataFinal').val());
            break;
    }
    dataInicial=dataInicial.toString('yyyy-MM-dd');
    dataFinal=dataFinal.toString('yyyy-MM-dd');
    var idCategoria=$('#select-happinessCategorias').val();
    var render="";
    db.transaction(function(tx) {tx.executeSql('SELECT a.categoria, b.nota, b.dataModificado FROM happinessCategorias AS a JOIN happinessNotas as b on a.idCategoria=b.idCategoria WHERE b.idCategoria=? AND b.dataModificado>=? AND b.dataModificado<=?;',[idCategoria,dataInicial,dataFinal],function(tx,results){
        if(results.rows.length>0){
            $("#show-happinessCategorias").text(results.rows.item(0).categoria);
            for (var i = 0; i < results.rows.length; i++) {
                dataNota=Date.parse(results.rows.item(i).dataModificado).toString('dd/MM/yyyy');
                render=render+'<div class="input-field row"><i class="material-icons left">&#xE873;</i><span><b>'+dataNota+'</b> - '+results.rows.item(i).nota+'</span></div>';
            }
            $("#show-happinessNotas").html(render);
            $("#loading-happinessConsultarLote").addClass('hide');
            $("#show-happinessConsultarLote").removeClass('hide');
        } else {
            $("#show-happinessCategorias").text($('#select-happinessCategorias option:selected').text());
            $("#show-happinessNotas").html('<div class="input-field row"><i class="material-icons left">&#xE873;</i><span>Nenhuma nota foi encontrada para essa categoria no período selecionado!</span></div>');
            $("#loading-happinessConsultarLote").addClass('hide');
            $("#show-happinessConsultarLote").removeClass('hide');
        }
    },function(error){
        $("#show-happinessCategorias").text($('#select-happinessCategorias option:selected').text());
        $("#show-happinessNotas").html('<div class="input-field row"><i class="material-icons left">&#xE873;</i><span>Nenhuma nota foi encontrada para essa categoria no período selecionado!</span></div>');
        $("#loading-happinessConsultarLote").addClass('hide');
        $("#show-happinessConsultarLote").removeClass('hide');
        errorHandler(error);
    })});
}

function reloadConsultarLote(){
    $("#select-happinessConsultarLote").removeClass('hide');
    $("#show-happinessConsultarLote").addClass('hide');
}
