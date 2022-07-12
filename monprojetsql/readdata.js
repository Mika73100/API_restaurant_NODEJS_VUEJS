let mysql = require('mysql');

console.log('Get connection ...');

var connection = mysql.createConnection({
    database: 'testnodejs',
    host: "localhost",
    user: "root",
    password: "root"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    var sql_template = "Select * from ?? WHERE ?? > '20/11/1995'";

    var replaces = ['Employes','Hire_date'];

    sql = mysql.format(sql_template, replaces);

    connection.query(sql, function(err, rows) {
        if (err) throw err;
        
    console.log(rows)
// Ecrire ici la boucle qui permet d’afficher dans la console le résultat de recherche //(utiliser console.log();
    for (var i = 0; i < rows.length; i++) {
    console.log(rows[i].Id + ' ' +rows[i].FirstName);
    }
    });
});