// run "npm i dotenv" 
var dotenv = require("dotenv").config();
// run "npm i mysql" 
var mysql = require("mysql");
// run "npm i inquirer" 
var inquirer = require("inquirer")
// connect to database
// test if the connection works, if it does, run promptUser function
var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: process.env.mysql_pass,
  database: 'bamazon_db'
});
connection.connect(function (error) {
  if (error) throw error;
  console.log("connected as id " + connection.threadId + "\n");
  promptUser();
});

// In promptUser function
function promptUser() {
  connection.query('SELECT * FROM products', function (error, results1) {
    if (error) throw error;
    // console.log(results1);
    // Display the available products with their ID #s
    for (let i = 0; i < results1.length; i++) {
      console.log(results1[i].item_id + " - " + results1[i].product_name + " - " + results1[i].department_name + " - " + results1[i].price + " - " + results1[i].stock_quantity);
      //  + " - " + results1[i].product_sales);
    }
    inquirer.prompt(
      [
        {
          type: "input",
          name: "whichBuy",
          message: "Which product would you like to buy?",
        },
        {
          type: "input",
          name: "howManyBuy",
          message: "How many units would you like to buy?",
        },
      ]
    ).then(function (answer) {
      // if their response is "Q" or "q", connection.end();
      // if ((answer.whichBuy === "Q" || "q" ) || (answer.howManyBuy === "Q" || "q")) {
      if (answer.whichBuy.toLowerCase() === "q" || answer.howManyBuy.toLowerCase() === "q") {
        connection.end();
        console.log("Exiting application");
        return; 
      };
      // else Query the database to check if the ID # corresponds to an existing ID # in the products table
      // select * from products where id = userResponse
      connection.query("SELECT * FROM products WHERE ?",
        [{
          item_id: answer.whichBuy
        }],
        function (error, results2) {
          if (error) throw error;
          // Once we get a response from the database, check if the length of the response is greater than 0
          console.log(results2);
          var new_stock_quantity = results2[0].stock_quantity - answer.howManyBuy;
          var unit_price = results2[0].price;
          if (new_stock_quantity < 0) {
            // Console log the response to check that it's working
            // If it's not, tell the user the item doesn't exist and call the promptUser function again
            console.log("Not enough supplies");
            purchase();
            return;
          }
          // If there are enough in stock, calculate what the new quantity will be by subtracting the user's purchase quantity from the current quantity.
          // query the database to update the quantity using UPDATE quantity to new quantity where ID is the ID that the user chose.
          var new_product_sales = results2[0].product_sales + (unit_price * answer.howManyBuy);
          connection.query("UPDATE products SET ? WHERE ?",
            [
              // { stock_quantity: new_stock_quantity },
              { stock_quantity: new_stock_quantity, product_sales: new_product_sales},
              // { product_sales: unit_price * answer.howManyBuy},
              { item_id: answer.whichBuy },
            
            ], function (error, results3) {
              if (error) throw error;
              // Tell the user their purchase was successful, and tell them how much they paid
              // multiply the quantity by the price of the product
              console.log("this product remains: " + new_stock_quantity + "\n"); 
              console.log(results3.affectedRows + " products updated!\n");
              
              console.log("Total is: " + unit_price * answer.howManyBuy + " dollars!\n");
              // call promptUser again
              promptUser();
            }
          );
        })
    });
  });
  
}