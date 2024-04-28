const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const DEFAULT_IS_SHOWING = false;

async function movieExists(request, response, next) {
  const { movie_id: requestedMovieId } = request.params;

  const maybeMovie = await service.read(requestedMovieId);

  if (maybeMovie) {
    response.locals.movie = maybeMovie;
    return next();
  }

  next({
    status: 404,
    message: `Movie with id ${requestedMovieId} cannot be found`,
  });
}

async function read(request, response) {
  // TODO: Add your code here
  response.json({ data: "" });
}

async function list(request, response) {
  const { is_showing = DEFAULT_IS_SHOWING } = request.query;
  const data = await service.list(is_showing);
  response.json({ data });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
};
