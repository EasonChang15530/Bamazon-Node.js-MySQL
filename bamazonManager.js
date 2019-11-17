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
  promptManager();
});

// * List a set of menu options:
function promptManager() {
  inquirer
    .prompt(
      [
        {
          type: "list",
          name: "managerChoice",
          message: "Hi Manager! What would you like to do?",
          choices: ["View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product",
          ],
        }
      ]
    )
    .then(function (answer) {
      switch (answer.managerChoice) {
        case "View Products for Sale":
          viewProducts();
          break;

        case "View Low Inventory":
          viewLowInventory();
          break;

        case "Add to Inventory":
          addInventory();
          break;

        case "Add New Product":
          addNewProduct();
          break;
      }
    });
}
//   * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.
function viewProducts() {
  connection.query('SELECT * FROM products', function (error, results1) {
    if (error) throw error;
    // console.log(results1);
    // Display the available products with their ID #s
    for (let i = 0; i < results1.length; i++) {
      console.log(results1[i].item_id + " - " + results1[i].product_name + " - " + results1[i].department_name + " - " + results1[i].price + " - " + results1[i].stock_quantity)
    };
    promptManager();
  })
}

//   * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.
function viewLowInventory() {
  connection.query('SELECT * FROM products WHERE stock_quantity < 5;', function (error, results2) {
    if (error) throw error;
    // console.log(results2);
    // Display the available products with their ID #s
    for (let i = 0; i < results2.length; i++) {
      console.log(results2[i].item_id + " - " + results2[i].product_name + " - " + results2[i].department_name + " - " + results2[i].price + " - " + results2[i].stock_quantity)
    };
    promptManager();
  })
}

//   * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.
function addInventory() {
  connection.query('SELECT * FROM products', function (error, results3) {
    if (error) throw error;
    // console.log(results3);
    // Display the available products with their ID #s
    for (let i = 0; i < results3.length; i++) {
      console.log(results3[i].item_id + " - " + results3[i].product_name + " - " + results3[i].department_name + " - " + results3[i].price + " - " + results3[i].stock_quantity)
    }
    inquirer.prompt(
      [
        {
          type: "input",
          name: "whichAdd",
          message: "Which product would you like to add inventory?",
        },
        {
          type: "input",
          name: "howManyAdd",
          message: "How many units would you like to add?",
        },
      ]
    ).then(function (answer) {
      // if their response is "Q" or "q", connection.end();
      if (answer.whichAdd.toLowerCase() === "q" || answer.howManyAdd.toLowerCase() === "q") {
        connection.end();
        console.log("Exiting application");
        return;
      };
      // else Query the database to check if the ID # corresponds to an existing ID # in the products table
      // select * from products where id = userResponse
      connection.query("SELECT * FROM products WHERE ?",
        [{
          item_id: answer.whichAdd
        }],
        function (error, results3) {
          if (error) throw error;
          // Once we get a response from the database, check if the length of the response is greater than 0
          console.log(results3);
          var new_stock_quantity = parseInt(results3[0].stock_quantity) + parseInt(answer.howManyAdd);
          // query the database to update the quantity using UPDATE quantity to new quantity where ID is the ID that the user chose.
          connection.query("UPDATE products SET ? WHERE ?",
            [
              { stock_quantity: new_stock_quantity },
              { item_id: answer.whichAdd }
            ], function (error, results3) {
              if (error) throw error;
              // Tell the user their purchase was successful, and tell them how much they paid
              // multiply the quantity by the price of the product
              console.log("this product remains: " + new_stock_quantity + "\n");
              console.log(results3.affectedRows + " products updated!\n");
              promptManager();
            }
          );
        })
    });
  })
}

//   * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.
function addNewProduct() {
  inquirer.prompt(
    [
      {
        type: "input",
        name: "productName",
        message: "What product would you like to add?",
      },
      {
        type: "input",
        name: "departmentName",
        message: "What department does this product belong to?",
      },
      {
        type: "input",
        name: "productPrice",
        message: "What is the price of this product?",
      },
      {
        type: "input",
        name: "stockQuantity",
        message: "What is the stock quantity of this product?",
      },
    ]
  ).then(function (answer) {
    connection.query("INSERT INTO products SET ?",
      {
        product_name: answer.productName,
        department_name: answer.departmentName,
        price: answer.productPrice,
        stock_quantity: answer.stockQuantity,
      },
      function(error, results4) {
        if (error) throw error;
        console.log(results4.affectedRows + " product inserted!\n");
        // Call updateProduct AFTER the INSERT completes
        promptManager();
      })
  });
}