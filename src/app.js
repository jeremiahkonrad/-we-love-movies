if (process.env.USER) require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");

app.use(cors());
app.use(express.json());

app.use("/theaters", theatersRouter);

module.exports = app;
