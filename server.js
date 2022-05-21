const express = require("express");
const app = express();
const dotenv = require('dotenv');
const colors = require('colors');

const cors = require('cors');
const notFound = require('./app/middleware/notFound');
const errorHandler = require('./app/middleware/errorHandler');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
// Custom middleware here
app.use(notFound);
app.use(errorHandler);
// cors
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));
// dotenv, colors
dotenv.config({ path: 'src/config/config.env' });


require("./app/routes/customer.route.js")(app);

const PORT = process.env.PORT || 8080;

// 포트넘버 설정
app.listen(PORT, () => {
    console.log(`Server up and running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
});
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, ()=>{
//     console.log("Server is running on port 8080.");
// })
