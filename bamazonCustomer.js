const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'bamazon'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId + '\n');
  readTable().then(customerSelect);
});

const readTable = () => {
  return new Promise(function(res, rej) {
    connection.query('SELECT * FROM products', function(err, data) {
      if (err) throw err;
      console.log(data);
      res(data);
    });
  });
};

var answers;

const customerSelect = () => {
  inquirer
    .prompt([
      {
        name: 'product',
        message: 'What would you like to purchase?'
      },
      {
        name: 'quantity',
        message: 'How many would you like to purchase?'
      }
    ])
    .then(function(res) {
      answers = res;
      let item = itemSearch(res.product);
      return item;
    })
    .then(function(res) {
      if (res[0].stock_quantity < answers.quantity) {
        console.log('Sorry, out of stock!');
        connection.end();
      } else {
        let quant = res[0].stock_quantity - answers.quantity;
        let cost = answers.quantity * res[0].price;
        console.log('----------------------');
        console.log('Total cost: $' + cost);
        console.log('----------------------');
        updateItem(quant, answers.product).then(function() {
          connection.end();
        });
      }
    });
};

const itemSearch = item => {
  return new Promise(function(res, rej) {
    connection.query(
      'SELECT * FROM products WHERE product_name = ?',
      [item],
      function(err, result) {
        if (err) throw err;
        res(result);
      }
    );
  });
};

const updateItem = (quant, column) => {
  return new Promise(function(res, rej) {
    connection.query(
      'UPDATE products SET stock_quantity = ? WHERE product_name = ?',
      [quant, column],
      function(err, result) {
        if (err) throw err;
        res(result);
      }
    );
  });
};
