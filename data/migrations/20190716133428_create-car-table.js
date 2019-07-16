
exports.up = function(knex) {
    return knex.schema.createTable('cars', table => {
        table.increments();
        table.text('VIN', 17).unique().notNullable();
        table.text('make', );
        table.text('model', );
        table.text('mileage', );
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};
