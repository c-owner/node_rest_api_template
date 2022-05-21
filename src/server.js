const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const helmet = require('helmet');
const cors = require('cors');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

dotenv.config({ path: 'src/config/config.env' });

const app = express();

const db = require('../models');

db.sequelize.sync();

// Development Setup
if (process.env.NODE_ENV === 'development') {
    // require morgan if in development mode
    // setting morgan to dev: https://www.npmjs.com/package/morgan#dev
}

// Put all the server-wide middleware here
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));
app.use(helmet());
app.use(express.json());

// All routes here
app.use('/api/posts', require('./routes/post'));
app.use('/api/user', require('./routes/userRoute'));

// Custom middleware here
app.use(notFound);
app.use(errorHandler);

//db

const PORT = process.env.PORT || 3000;

app.listen(PORT,
    console.log(`Server up and running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
