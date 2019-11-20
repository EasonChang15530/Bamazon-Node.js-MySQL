# Bamazon-Node.js-MySQL

This app uses nodejs and mysql, including 3 applications.

1. For `bamazonCustomer.js`. Running this application will display all of the items available for sale. Include the ids, names, department name, prices of products for sale, and stock quantities.

And then prompt users with two messages.

   * The first asks them the ID of the product they would like to buy.
   * The second asks how many units of the product they would like to buy.

Once the customer has placed the order, this app will check if store has enough of the product to meet the customer's request.

   * If not, the app will log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

However, if store _does_ have enough of the product, it will fulfill the customer's order.
   * This means updating the SQL database to reflect the remaining quantity.
   * Once the update goes through, show the customer the total cost of their purchase.

2. For `bamazonManager.js`. Running this application will:

  * List a set of menu options:

    * View Products for Sale
    
    * View Low Inventory
    
    * Add to Inventory
    
    * Add New Product

  * If a manager selects `View Products for Sale`, the app will list every available item: the item IDs, names, prices, and quantities.

  * If a manager selects `View Low Inventory`, then it will list all items with an inventory count lower than five. 

  * If a manager selects `Add to Inventory`, the app will display a prompt that let the manager "add more" of any item currently in the store.

  * If a manager selects `Add New Product`, it will allow the manager to add a completely new product to the store.

3. For `bamazonSupervisor.js`. Running this application will list a set of menu options:

   * View Product Sales by Department
   
   * Create New Department

It contains a new MySQL table called `departments`. this table includes the following columns:

   * department_id

   * department_name

   * over_head_costs (A dummy number you set for each department)

When a supervisor selects `View Product Sales by Department`, the app will display a summarized table in their terminal/bash window. 

The `total_profit` column be calculated on the fly using the difference between `over_head_costs` and `product_sales`. `total_profit` not be stored in any database.
