exports.up = function(knex) {
    return knex.schema
      .createTable('tickets', tbl => {
        tbl.increments();

        tbl
          .string('title', 128)
          .notNullable();
        tbl.string('description', 512);
        tbl.string('category', 128);
        tbl.string('open', 1024);
        tbl
            .boolean('open')
            .defaultTo(false);
        tbl
            .boolean('closed')
            .defaultTo(false);
      });
};
  
exports.down = function(knex) {
   return knex.schema.dropTableIfExists('tickets');
};