-- Create a MySQL Database called `bamazon`.
DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

-- Then create a Table inside of that database called `products`.
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