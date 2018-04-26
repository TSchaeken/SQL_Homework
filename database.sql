-- creates table 

DROP DATABASE IF EXISTS `bamazon`;
CREATE database `bamazon`;

USE `bamazon`;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price INT(10) NOT NULL,
  stock_quantity INT(10),
  PRIMARY KEY (item_id)
);

-- Insert starting rows

INSERT INTO `products`(product_name, department_name, price, stock_quantity)
VALUE ("Office Chair", "Office Suppplies", 150, 20), 
("Dirty Cast Iron Pan", "Cooking/Kitchen", 45, 100),
("Flat Memory Foam Pillow", "Bedroom", 85, 35),
("Dirty Anime Body Pillow" , "Bedroom", 15, 200),
("Reverse Clock", "Office Supplies", 20, 53),
("480p Computer Screen", "Electronics", 35, 52),
("512GB SSD", "Electornics", 75, 12),
("Slotted Ladle", "Cooking/Kitchen", 35, 78),
("Upside Down Cup", "Cooking/Kitchen", 15, 33),
("Wax Wings", "Recreation", 600, 13);