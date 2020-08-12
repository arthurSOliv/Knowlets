
exports.up = function(knex, Promise) {
    return knex.schema.createTable('products', table => {
        table.increments('id').primary();
        table.string('name', 50).notNull().unique();
        table.integer('userId').references('id').inTable('users');
        table.integer('companyId').references('id').inTable('company');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('products');
};
