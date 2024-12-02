const fs = require('fs');
const globalErrorHandler = require('./controllers/errorController');
const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const productRouter = require('./routes/ProductRoutes');
const userRouter = require('./routes/userRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const optionRouter = require('./routes/optionRoutes');


const { json } = require('body-parser');
const { dirname } = require('path');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use(express.static(`${__dirname}/public`));
// Routes
app.use('/api/v1/products', productRouter);
app.use('/api/v1/usercs', userRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/options', optionRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server !`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
