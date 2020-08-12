
exports.up = function(knex, Promise) {
    return knex.schema.createTable('services', table => {
        table.increments('id').primary();
        table.string('name', 50).notNull();
        table.string('description', 1000).notNull();
        table.integer('userId').references('id').inTable('users');
        table.integer('companyId').references('id').inTable('company');
        table.integer('productId').references('id').inTable('products');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('services');
};
