const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const methodNotAllowed = require("../errors/methodNotAllowed");

async function reviewExists(request, response, next) {
  const { reviewId: requestedReviewId } = request.params;

  const maybeReview = await service.read(requestedReviewId);

  if (maybeReview) {
    response.locals.review = maybeReview;

    return next();
  }

  next({
    status: 404,
    message: `Review with id ${requestedReviewId} cannot be found.`,
  });
}

async function destroy(request, response) {
  // TODO: Write your code here
}

async function list(request, response) {
  const movieId = request.params.movieId;

  const data = await service.list(movieId);

  response.json({ data });
}

function hasMovieIdInPath(request, response, next) {
  if (request.params.movieId) {
    return next();
  }
  methodNotAllowed(request, response, next);
}

function noMovieIdInPath(request, response, next) {
  if (request.params.movieId) {
    return methodNotAllowed(request, response, next);
  }
  next();
}

async function update(request, response) {
  const existingReview = response.locals.review;
  const updatedReview = {
    ...request.body.data,
    review_id: existingReview.review_id,
  };

  const data = await service.update(updatedReview);

  response.json({ data });
}

module.exports = {
  destroy: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(destroy),
  ],
  list: [hasMovieIdInPath, asyncErrorBoundary(list)],
  update: [
    noMovieIdInPath,
    asyncErrorBoundary(reviewExists),
    asyncErrorBoundary(update),
  ],
};
