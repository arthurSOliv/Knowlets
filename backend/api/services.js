module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation;

    const createService = async (req, res) => {
        const service = { ...req.body }

        try {
            existsOrError(service.name, 'Nome do produto não informado');
            existsOrError(service.description, 'Descrição do produto não informada');

            const userFromDB = await app.db('users')
                .where({id: req.params.userId}).first();

            existsOrError(userFromDB, 'Usuário não existente!');

            const companyFromDB = await app.db('company')
                .where({id: req.params.companyId}).first();

            existsOrError(companyFromDB, 'Empresa não existente!');

            const productFromDB = await app.db('products')
                .where({id: req.params.productId}).first();

            existsOrError(productFromDB, 'Produto não existente!');

        } catch (error) {
            return res.status(400).json(error);
        }

        service.userId = req.params.userId;
        service.companyId = req.params.companyId;
        service.productId = req.params.productId;

        app.db('services')
            .insert(service)
            .then(_ => res.status(204).json(service))
            .catch(err => res.status(500).json(err));
    }

    const editService = async (req, res) => {
        const service = { ...req.body }

        try {
            const serviceFromDB = await app.db('services')
                .where({id: req.params.id}).first();

            existsOrError(serviceFromDB, 'Serviço não existente!');

        } catch (error) {
            return res.status(400).json(error);
        }

        service.id = req.params.id;

        app.db('services')
            .update(service)
            .where({ id: service.id })
            .then(_ => res.status(204).json(service))
            .catch(err => res.status(500).json(err));
    }

    const getServices = async (req, res) => {
        try {
            const userFromDB = await app.db('users')
                .where({id: req.params.userId}).first();

            existsOrError(userFromDB, 'Usuário não existente!');

        } catch (error) {
            return res.status(400).json(error);
        }

        app.db('services')
            .select('id', 'name', 'description', 'userId', 'companyId', 'productId')
            .where({
                userId: req.params.userId,
            })
            .then(services => res.json(services))
            .catch(err => res.status(500).send(err));
    }

    const deleteService = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Id do produto não informado');

            const deleteServices = await app.db('services')
                .where({id: req.params.id}).del();

            existsOrError(deleteServices, 'Produto não encontrado!');

            res.status(204).send()
        } catch (error) {
            return res.status(400).json(error);
        }
    }

    return { createService, getServices, editService, deleteService };
}