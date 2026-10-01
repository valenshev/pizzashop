// import dotenv from 'dotenv';
// import express from 'express';

// import { sequelize } from './database/config/db.config.js';
// import { getPizzas } from './controllers/pizzasController.js';
// import { getAllCategories } from './controllers/categoriesController.js';
// import {createUser} from './controllers/usersController.js';

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', require('./routes')); 


app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.use((err, req, res, next) => {
  console.error(err.message);
  if (err.original) {
    console.error(err.original.message);
  }

  res.status(500).json({
    message: err.message,
    detail: err.original && err.original.message
  });
});

module.exports = app;



// DB
// try {
//   await sequelize.authenticate()
//   console.log('Соединение с БД было успешно установлено')
// } catch (e) {
//   console.log('Невозможно выполнить подключение к БД: ', e)
// }
// sequelize.sync().then(result=>{
//   //console.log(result);
// })
// .catch(err=> console.log(err));
// // END DB

// dotenv.config();

// const app = express()

// app.use(express.json());
// app.use(express.urlencoded({ extended: true })); //parse incoming requests with urlencoded payloads

// const port = process.env.SERVER_PORT || 3000

// app.get('/', (req, res) => {
//   res.send('Hello World from server!')
// });

// app.get('/categories',
//   getAllCategories
// )

// app.get('/users/create', createUser);

// app.get('/pizzas', getPizzas)

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })