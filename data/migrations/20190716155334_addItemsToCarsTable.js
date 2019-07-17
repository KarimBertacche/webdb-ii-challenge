
exports.up = function(knex) {
    return knex.schema.alterTable('cars', table => {
        table.text('transmission-type');
        table.text('title-status');
    });
};

exports.down = function(knex) {
  return knex.schema.alterTable('cars', table => {
    table.dropColumn('transmission-type');
    table.dropColumn('title-status');
  });
};
