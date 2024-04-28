const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

const reviewsRouter = require("../reviews/reviews.router");
const theatersRouter = require("../theaters/theaters.router");

const movieIdValidation = "[0-9]+";

router.route("/").get(controller.list).all(methodNotAllowed);

router.use("/:movieId/theaters", controller.movieExists, theatersRouter);

router
  .route(`/:movieId(${movieIdValidation})`)
  .get(controller.read)
  .all(methodNotAllowed);

module.exports = router;
