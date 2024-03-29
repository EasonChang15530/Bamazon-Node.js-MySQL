-- Create a MySQL Database called `bamazon`.
DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

-- Create a Table inside of that database called `products`.
CREATE TABLE products(
  -- The products table should have each of the following columns:
  --    * item_id (unique id for each product)
  item_id INT AUTO_INCREMENT NOT NULL,
  --    * product_name (Name of product)
  product_name VARCHAR(40) NOT NULL,
  --    * department_name
  department_name VARCHAR(20) NOT NULL,
  --    * price (cost to customer)
  price DECIMAL(10,2),
  --    * stock_quantity (how much of the product is available in stores)
  stock_quantity INT,
  --    * product_sales (for Challenge 3)
  product_sales DECIMAL(10,2) DEFAULT 0,
  PRIMARY KEY(item_id)
);

-- Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Avatar", "movies", 25, 300),
("Harry Potter", "books", 90, 300),
("Coca-Cola", "drinks", 12.5, 5),
("orange juice", "drinks", 15, 3),
("fortune cookies", "foods", 1.25, 5000),
("forks", "utensils", 5, 4),
("chopsticks", "utensils", 3, 5); 

INSERT INTO products(product_name, department_name)
VALUES ("donuts", "foods"),
("Once Upon a Time In Hollywood", "movies"),
("stockpot", "utensils"); 

-- The following content is used for challenge 3:
-- Create a new MySQL table called `departments`. 
CREATE TABLE departments(
-- The table should include the following columns:
--    * department_id
  department_id INT AUTO_INCREMENT NOT NULL,
--    * department_name
  department_name VARCHAR(20) NOT NULL,
--    * over_head_costs (A dummy number you set for each department)
  over_head_costs INT(6) NOT NULL,
  PRIMARY KEY(department_id)
);

INSERT INTO departments(department_name, over_head_costs)
VALUES ("movies", 50),
("books", 10),
("drinks", 30),
("foods", 40),
("utensils", 20);
