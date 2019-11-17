// run "npm i dotenv" 
var dotenv = require("dotenv").config();
// run "npm i mysql" 
var mysql = require("mysql");
// run "npm i inquirer" 
var inquirer = require("inquirer")

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
  queryAllProducts();
  purchase();
});
// Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
function queryAllProducts() {
  connection.query('SELECT * FROM products', function (error, results) {
    if (error) throw error;
    // console.log(results);
    for (let i = 0; i < results.length; i++) {
      console.log(results[i].item_id + " - " + results[i].product_name + " - " + results[i].department_name + " - " + results[i].price + " - " + results[i].stock_quantity);
    }
  });
};
// The app should then prompt users with two messages.
function purchase() {
  //    * The first should ask them the ID of the product they would like to buy.
  //    * The second message should ask how many units of the product they would like to buy.
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
    var new_stock_quantity = stock_quantity - answer.howManyBuy;
    var sql = ("UPDATE products SET ? WHERE ?",
      [
        { stock_quantity: new_stock_quantity },
        { item_id: answer.whichBuy }
      ]);
    connection.query(sql, function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " products updated!\n");
    }
    );
  })
}
    //   if (answer.whichBuy === "1") {
    //   connection.query('SELECT * FROM products WHERE?',
    //     { "item_id": answer.whichBuy },
    //     function (error, results) {
    //       if (error) throw error;
    //       console.log(results);
    //       connection.end();
    //     })
    // }

    // Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

    //    * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

    // if (answer.whichBuy === "Q" || "q") {
    //   connection.end();
    // } else if (answer.howManyBuy === "Q" || "q") {
    //   connection.end();
    // } else if (answer.howManyBuy < num) {

    // }


    // However, if your store _does_ have enough of the product, you should fulfill the customer's order.
    //    * This means updating the SQL database to reflect the remaining quantity.
    //    * Once the update goes through, show the customer the total cost of their purchase.
