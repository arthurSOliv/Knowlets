
exports.up = function(knex, Promise) {
    return knex.schema.createTable('company', table => {
        table.increments('id').primary();
        table.string('name', 100).notNull().unique();
        table.string('cnpj', 14).notNull();
        table.integer('userId').references('id').inTable('users');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('company');
};
