module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation;

    const createProduct = async (req, res) => {
        const product = { ...req.body }

        try {
            existsOrError(product.name, 'Nome do produto não informado');

            const userFromDB = await app.db('users')
                .where({id: req.params.userId}).first();

            existsOrError(userFromDB, 'Usuário não existente!');

            const companyFromDB = await app.db('company')
                .where({id: req.params.companyId}).first();

            existsOrError(companyFromDB, 'Empresa não existente!');

        } catch (error) {
            return res.status(400).json(error);
        }

        product.userId = req.params.userId;
        product.companyId = req.params.companyId;

        app.db('products')
            .insert(product)
            .then(_ => res.status(204).json(product))
            .catch(err => res.status(500).json(err));
    }

    const editProduct = async (req, res) => {
        const product = { ...req.body }

        try {
            const productFromDB = await app.db('products')
                .where({id: req.params.id}).first();

            existsOrError(productFromDB, 'Produto não existente!');

        } catch (error) {
            return res.status(400).json(error);
        }

        product.id = req.params.id;

        app.db('products')
            .update(product)
            .where({ id: product.id })
            .then(_ => res.status(204).json(product))
            .catch(err => res.status(500).json(err));
    }

    const getProducts = async (req, res) => {
        try {
            const userFromDB = await app.db('users')
                .where({id: req.params.userId}).first();

            existsOrError(userFromDB, 'Usuário não existente!');

        } catch (error) {
            return res.status(400).json(error);
        }

        if(req.params.companyId){
            app.db('products')
                .select('id', 'name', 'userId', 'companyId')
                .where({ companyId: req.params.companyId })
                .then(products => res.json(products))
                .catch(err => res.status(500).send(err));
        } else{
            app.db('products')
                .select('id', 'name', 'userId', 'companyId')
                .where({ userId: req.params.userId })
                .then(products => res.json(products))
                .catch(err => res.status(500).send(err));
        }
    }

    const deleteProduct = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Id do produto não informado');

            const services = await app.db('services')
                .where({productId: req.params.id}).del();

            const deleteProduct = await app.db('products')
                .where({id: req.params.id}).del();

            existsOrError(deleteProduct, 'Produto não encontrado!');

            res.status(204).send()
        } catch (error) {
            return res.status(400).json(error);
        }
    }

    return { createProduct, getProducts, editProduct, deleteProduct };
}