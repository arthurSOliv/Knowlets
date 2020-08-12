module.exports = app => {
    app.post('/signup', app.api.user.createUser);
    app.post('/signin', app.api.auth.signin);
    app.post('/validateToken', app.api.auth.validateToken);

    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(app.api.user.createUser)
        .get(app.api.user.getUsers);

    app.route('/company/:id')
        .all(app.config.passport.authenticate())
        .post(app.api.company.createCompany)
        .get(app.api.company.getCompanys)
        .put(app.api.company.editCompany)
        .delete(app.api.company.deleteCompany);

    app.route('/product/:userId/:companyId')
        .all(app.config.passport.authenticate())
        .post(app.api.product.createProduct)
        .get(app.api.product.getProducts);

    app.route('/product/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.product.editProduct)
        .delete(app.api.product.deleteProduct);

    app.route('/service/:userId/:companyId/:productId')
        .all(app.config.passport.authenticate())
        .post(app.api.services.createService)
        .get(app.api.services.getServices);

    app.route('/service/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.services.editService)
        .delete(app.api.services.deleteService);
        
}