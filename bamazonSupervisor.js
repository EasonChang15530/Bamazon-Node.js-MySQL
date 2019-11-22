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
  promptSupervisor();
});

// * List a set of menu options:
function promptSupervisor() {
  inquirer
    .prompt(
      [
        {
          type: "list",
          name: "supervisorChoice",
          message: "Hi Supervisor! What would you like to do?",
          choices: ["View Product Sales by Department",
            "Add New Department",
          ],
        }
      ]
    )
    .then(function (answer) {
      switch (answer.supervisorChoice) {
        case "View Product Sales by Department":
          viewProductSales();
          break;

        case "Add New Department":
          addNewDepartment();
          break;

        // Note: Set Exit?
        // default: 
        //   connection.end();
        //   break;
      }
    });
}
//   * When a supervisor selects `View Product Sales by Department`, the app should display a summarized table like this.
// | department_id | department_name | over_head_costs | product_sales | total_profit |
// | ------------- | --------------- | --------------- | ------------- | ------------ |
// | 01            | Electronics     | 10000           | 20000         | 10000        |
// | 02            | Clothing        | 60000           | 100000        | 40000        |
function viewProductSales() {
  connection.query('SELECT * FROM departments INNER JOIN products ON departments.department_name = products.department_name', function (error, results1) {
    if (error) throw error;
    // console.log(results1);
    // Display the available departments with their ID #s
    for (let i = 0; i < results1.length; i++) {
      // Note: The `total_profit` column should be calculated on the fly using the difference between `over_head_costs` and `product_sales`. `total_profit` should not be stored in any database. You should use a custom alias.
      var total_profit = results1[i].product_sales - results1[i].over_head_costs;
      console.log(results1[i].department_id + " - " + results1[i].department_name + " - " + results1[i].over_head_costs + " - " + results1[i].product_sales + " - " + total_profit);
    };
    promptSupervisor();
  })
}

//   * If a manager selects `Add New Department`, it should allow the manager to add a completely new product to the store.
function addNewDepartment() {
  inquirer.prompt(
    [
      {
        type: "input",
        name: "departmentName",
        message: "Which department would you like to add?",
      },
      {
        type: "input",
        name: "overHeadCosts",
        message: "What is the over head costs of this department?",
      },
    ]
  ).then(function (answer) {
    connection.query("INSERT INTO departments SET ?",
      {
        department_name: answer.departmentName,
        over_head_costs: answer.overHeadCosts,
      },
      function (error, results2) {
        if (error) throw error;
        console.log(results2.affectedRows + " department inserted!\n");
        promptSupervisor();
      })
  });
}