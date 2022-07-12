const express = require('express');
const app = express();

let mysql = require('mysql');
console.log('Get connection ...');

var connection = mysql.createConnection({
    database: 'restaurants',
    host: "localhost",
    user: "root",
    password: "root"
});

app.listen(5000, ()=> {
	console.log("Server is listening @5000") ;
});


// /////////////////////////CREATION TABLE RESTAURANT//////////////////////////////
// var sql2 = "CREATE TABLE restaurants (Id INT(11) AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100), city VARCHAR(100), nbcouverts INT(10), terrasse VARCHAR(3), parking VARCHAR(3))";

// connection.query(sql2, function(err, results) {
//     if (err) throw err;
//     console.log("Table retaurant créée");

// });


// ///////////////////////////CREATION TABLE EMPLOYES//////////////////////////////
// var sql3 = "CREATE TABLE employes (Id INT(11) AUTO_INCREMENT PRIMARY KEY, first_name VARCHAR(100), last_name VARCHAR(100), hire_date DATE, restaurant_id INT)";

// connection.query(sql3, function(err, results) {
//     if (err) throw err;
//     console.log("Table employée créée");
// });





// Middleware  ici je crée les routes
app.use(express.json());


////////////////////Mehtod POST pour ajouter un restaurant////////////////////
app.post('/restaurant', (req, res) => {
    let sql = "INSERT INTO restaurants (name, city, nbcouverts, terrasse, parking) " +
        " VALUES ('" + req.body.name + "', '" 
                    + req.body.city + "', '"
                    + req.body.nbcouverts + "', '"
                    + req.body.terrasse + "', '"
                    + req.body.parking  + "')";

    connection.query(sql, function(err, results) {
        if (err) throw err;
        console.log("Insert a record !");
    });

    res.status(200);
});


//////////Method GET pour afficher la liste des restaurants///////////
app.get('/restaurants', (req, res) => {
    var sql_template = "Select * from ?? ";
    var replaces = ['restaurants'];

    sql = mysql.format(sql_template, replaces);

    connection.query(sql, function(err, rows) {
        if (err) throw err;
        res.send(rows)
    });
    res.status(200);
});


///////////////Method GET pour afficher un restaurant particulier///////
app.get('/restaurants/:id', (req, res) => {
    let id = parseInt(req.params.id);
    
    let sql_template = "Select * from ?? WHERE ?? = " + id;
    let replaces = ['restaurants', 'id'];

    sql = mysql.format(sql_template, replaces);

        connection.query(sql, function(err, row, fields) {
            if (err) throw err;
		res.send(row);
    });
        res.status(200);
});



////////Method PUT pour modifier un restaurant en particulier////////
app.put('/restaurants/:id', (req, res) => {

    console.log("requete put");
    let id = parseInt(req.params.id);
    
    // Coder ici la requête
    let sql_update = "UPDATE ?? SET name='" + req.body.name + "', city='" + req.body.city + "', nbcouverts='" + req.body.nbcouverts + "', terrasse='" + req.body.terrasse + "', parking='" + req.body.parking + "' WHERE ?? =" + id;
    console.log(sql_update);
    // Formater la requête
    let replaces = ['restaurants', 'id'];
    sql = mysql.format(sql_update, replaces);
    
    // Executer la requête
    connection.query(sql, function (err, rows) {
    if (err) throw err;
    res.send(rows)
    });
    
    res.status(200);
    })



// //////////Mehtod POST pour ajouter un employe selon le restaurant//////
//     app.delete('/restaurants/:id', (req, res) => {
//         let id = parseInt(req.params.id)
        
//         var sql_template = "Delete from ?? WHERE Id="+id;
//         var replaces = ['restaurants'];
    
//         sql = mysql.format(sql_template, replaces);
    
//         connection.query(sql, function(err, rows) {
//             if (err) throw err;
//             res.send(rows)
//         });

//         res.status(200);
//     });



///////Mehtod POST pour ajouter un employe selon le restaurant////////
app.post('/restaurants/:idResto/employes', (req, res) => {
    let id = parseInt(req.params.idResto);
    let sql = "INSERT INTO employes (first_name, last_name, hire_date, restaurant_id) " +
    " VALUES ('" + req.body.first_name + "', '"
    + req.body.last_name + "', '"
    + req.body.hire_date + "', '"
    + req.body.restaurant_id + "')";

    connection.query(sql, function (err, results) {
        if (err) throw err;
        console.log("Insert a record !");
        });
        res.status(200);
    });


/////Method GET pour afficher tous les employes d'un restaurant en particulie/////
app.get('/restaurants/:idResto/employes', (req, res) => {
    let id = parseInt(req.params.idResto);
    var sql_template = "Select * from ?? WHERE restaurant_id="+id;
    var replaces = ['employes'];

    sql = mysql.format(sql_template, replaces);

    connection.query(sql, function(err, rows) {
        if (err) throw err;
        res.send(rows)
    });
    res.status(200);
});



//Method GET pour afficher un employe en particulier dans un restaurant en particulier//
app.get('/restaurants/:idResto/employes/:idEmploye', (req, res) => {
    let id = parseInt(req.params.idResto);
    var sql_template = "SELECT * FROM restaurants INNER JOIN employes ON employes.restaurant_id = restaurants.Id WHERE employes.Id=2";
    
    var replaces = ['employes'];

    sql = mysql.format(sql_template, replaces);

    connection.query(sql, function(err, rows) {
        if (err) throw err;
        res.send(rows)
    });
    res.status(200);
});



/////////Method PUT pour modifier un employe en particulier//////////////////
app.put('/restaurants/:idResto/employes/:idEmploye', (req, res) => {
    let Id = parseInt(req.params.idResto);
    let Ide = parseInt(req.params.idEmploye);

    // Coder ici la requête
    let sql_update = "UPDATE ?? SET first_name='"+req.body.first_name+"',last_name='"+req.body.last_name+"',hire_date='"+req.body.hire_date+"' WHERE ?? =" + Ide + " AND restaurant_id=" + Id;

    // Formater la requête
    let replaces = ['employes', 'Id'];
    sql = mysql.format(sql_update, replaces);

    // Executer la requête
    connection.query(sql, function (err, rows) {
    if (err) throw err;
    res.send(rows)
    });

    res.status(200);
    })



//////Method DELETE pour supprimer tous les employes en particulier////
app.delete('/restaurants/:id', (req, res) => {
    let Id = parseInt(req.params.id);

    let sql_template = "DELETE restaurants, employes FROM restaurants JOIN employes ON restaurants.Id = employes.restaurant_id WHERE restaurants.Id =" + Id;
    let replaces = ['restaurants', 'id'];
    sql = mysql.format(sql_template, replaces);

    connection.query(sql, function (err, row, fields) {
        if (err) throw err;
        res.send(row);
    });
    res.status(200);
});



