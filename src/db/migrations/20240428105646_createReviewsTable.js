/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("reviews", (table) => {
    table.increments("review_id");
    table.text("content");
    table.integer("score");
    table
      .integer("critic_id")
      // improves indexing by marking this number as predictably 0+, and always positive
      .unsigned()
      .notNullable();
    table.foreign("critic_id").references("critic_id").inTable("critics");
    table.integer("movie_id").unsigned().notNullable();
    table.foreign("movie_id").references("movie_id").inTable("movies");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("reviews");
};
