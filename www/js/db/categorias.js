/**
 * Created by Rafael on 16/01/2016.
 */
//add listener when device ready
    document.addEventListener("deviceready", onDeviceReady, false);
var db = window.openDatabase("HappinessJar", "1.0", "Base de dados do App HappinessJar", 200000); //will create database Dummy_DB or open it

//function will be called when device ready
function onDeviceReady(){
    db.transaction(populateDB, errorCB, successCB);
}



//function will be called when an error occurred
function errorCB(err) {
    alert("Erro ao abrir a base de dados: "+err.code);
}

//function will be called when process succeed
function successCB() {
    console.log("Base conectada com sucesso!");
    db.transaction(queryDB,errorCB);
}

//criar tabelas e popular com dados
function populateDB(tx) {
    tx.executeSql(
        'CREATE TABLE IF NOT EXISTS categoria ('+
        'id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,'+
        'categoria text UNIQUE,'+
        'date_created TEXT,'+
        'last_updated TEXT);'
    )
    tx.executeSql(
        'CREATE TABLE IF NOT EXISTS felicidade ('+
        'id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,'+
        'date_created TEXT,'+
        'felicidade TEXT,'+
        'categoria_id INTEGER,'+
        'last_updated TEXT);'
    )

    tx.executeSql('INSERT OR IGNORE INTO status(categoria,date_created,last_updated) VALUES ("Trabalho", "2016-01-13 11:48:00.000", "2016-01-13 11:48:00.000")');
    tx.executeSql('INSERT OR IGNORE INTO status(categoria,date_created,last_updated) VALUES ("Amigos", "2016-01-13 11:48:00.000", "2016-01-13 11:48:00.000")');
    tx.executeSql('INSERT OR IGNORE INTO status(categoria,date_created,last_updated) VALUES ("Família", "2016-01-13 11:48:00.000", "2016-01-13 11:48:00.000")');
/*
    // STATUS
    tx.executeSql('INSERT OR IGNORE INTO status(nome,date_created,last_updated,cor) VALUES ("Aberto", "2016-01-13 11:48:00.000", "2016-01-13 11:48:00.000", "#bff2bf")');
    tx.executeSql('INSERT OR IGNORE INTO status(nome,date_created,last_updated,cor) VALUES ("Fechado", "2016-01-13 11:48:00.000", "2016-01-13 11:48:00.000", "#b0a7a7")');
    tx.executeSql('INSERT OR IGNORE INTO status(nome,date_created,last_updated,cor) VALUES ("Pago", "2016-01-13 11:48:00.000", "2016-01-13 11:48:00.000", "#f2c18a")');
    tx.executeSql('INSERT OR IGNORE INTO status(nome,date_created,last_updated,cor) VALUES ("Cancelado", "2016-01-13 11:48:00.000", "2016-01-13 11:48:00.000", "#d17171")');

    // REGIÃO
    tx.executeSql('INSERT OR IGNORE INTO regiao(nome,date_created,last_updated) VALUES ("Abranches", "2016-01-13 11:48:00.000", "2016-01-13 11:48:00.000")');
    tx.executeSql('INSERT OR IGNORE INTO regiao(nome,date_created,last_updated) VALUES ("Atuba", "2016-01-13 11:48:00.000", "2016-01-13 11:48:00.000")');
    tx.executeSql('INSERT OR IGNORE INTO regiao(nome,date_created,last_updated) VALUES ("Bacaheri", "2016-01-13 11:48:00.000", "2016-01-13 11:48:00.000")');
    tx.executeSql('INSERT OR IGNORE INTO regiao(nome,date_created,last_updated) VALUES ("Batel", "2016-01-13 11:48:00.000", "2016-01-13 11:48:00.000")');
    tx.executeSql('INSERT OR IGNORE INTO regiao(nome,date_created,last_updated) VALUES ("Centro", "2016-01-13 11:48:00.000", "2016-01-13 11:48:00.000")');
    tx.executeSql('INSERT OR IGNORE INTO regiao(nome,date_created,last_updated) VALUES ("Pinheirinho", "2016-01-13 11:48:00.000", "2016-01-13 11:48:00.000")');
    tx.executeSql('INSERT OR IGNORE INTO regiao(nome,date_created,last_updated) VALUES ("Portão", "2016-01-13 11:48:00.000", "2016-01-13 11:48:00.000")');

    // SEGMENTO
    tx.executeSql('INSERT OR IGNORE INTO regiao(nome,date_created,last_updated) VALUES ("Autopeças", "2016-01-13 11:48:00.000", "2016-01-13 11:48:00.000")');
    tx.executeSql('INSERT OR IGNORE INTO regiao(nome,date_created,last_updated) VALUES ("Ferragens", "2016-01-13 11:48:00.000", "2016-01-13 11:48:00.000")');
    tx.executeSql('INSERT OR IGNORE INTO regiao(nome,date_created,last_updated) VALUES ("Bares e Restaurantes", "2016-01-13 11:48:00.000", "2016-01-13 11:48:00.000")');
    tx.executeSql('INSERT OR IGNORE INTO regiao(nome,date_created,last_updated) VALUES ("Colchões", "2016-01-13 11:48:00.000", "2016-01-13 11:48:00.000")');
    tx.executeSql('INSERT OR IGNORE INTO regiao(nome,date_created,last_updated) VALUES ("Atacado de Calçados", "2016-01-13 11:48:00.000", "2016-01-13 11:48:00.000")');
    //tx.executeSql('CREATE TABLE IF NOT EXISTS SoccerPlayer (id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT NOT NULL, Club TEXT NOT NULL)');
    //tx.executeSql('INSERT INTO SoccerPlayer(Name,Club) VALUES ("Alexandre Pato", "AC Milan")');
    //tx.executeSql('INSERT INTO SoccerPlayer(Name,Club) VALUES ("Van Persie", "Arsenal")');
*/}

//select all from SoccerPlayer
function queryDB(tx){
    tx.executeSql('SELECT * FROM categoria',[],querySuccessStatus,errorCB);
}

function querySuccessStatus(tx,result){
    $('#list-categoria').empty();
    $.each(result.rows,function(index){
        var row = result.rows.item(index);
        $('#list-categoria').append('<li><p id="'+row['id']+'" class="name" >'+row['nome']+'</p></li>');
    });
}

/*function querySuccess(tx,result){
 $('#SoccerPlayerList').empty();
 $.each(result.rows,function(index){
 var row = result.rows.item(index);
 $('#SoccerPlayerList').append('<li><a href="#"><h3 class="ui-li-heading">'+row['Name']+'</h3><p class="ui-li-desc">Club '+row['Club']+'</p></a></li>');
 });

 $('#SoccerPlayerList').listview();
 }*/