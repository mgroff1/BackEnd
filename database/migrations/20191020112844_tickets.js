exports.up = function(knex) {
    return knex.schema
      .createTable('tickets', tbl => {
        tbl.increments();

        tbl
          .string('title', 128)
          .notNullable();
        tbl.string('description', 512);
        tbl.string('category', 128);
        tbl.string('solution', 1024);
        tbl
            .boolean('assigned')
            .defaultTo(false);
        tbl
            .boolean('resolved')
            .defaultTo(false);
      });
};
  
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('tickets');
};