module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation;

    const createCompany = async (req, res) => {
        const company = { ...req.body }

        try {
            existsOrError(company.name, 'Nome não informado');
            existsOrError(company.cnpj, 'CNPJ não informado');

            const userFromDB = await app.db('users')
                .where({id: req.params.id}).first();

            existsOrError(userFromDB, 'Usuário não existente!');

        } catch (error) {
            return res.status(400).json(error);
        }

        company.userId = req.params.id;

        app.db('company')
            .insert(company)
            .then(_ => res.status(204).json(company))
            .catch(err => res.status(500).json(err));
    }

    const editCompany = async (req, res) => {
        const company = { ...req.body }

        try {
            const companyFromDB = await app.db('company')
                .where({id: req.params.id}).first();

            existsOrError(companyFromDB, 'Empresa não existente!');

        } catch (error) {
            return res.status(400).json(error);
        }

        company.id = req.params.id;

        app.db('company')
            .update(company)
            .where({ id: company.id })
            .then(_ => res.status(204).json(company))
            .catch(err => res.status(500).json(err));
    }

    const getCompanys = async (req, res) => {
        try {
            const userFromDB = await app.db('users')
                .where({id: req.params.id}).first();

                existsOrError(userFromDB, 'Usuário não existente!');

        } catch (error) {
            return res.status(400).json(error);
        }

        app.db('company')
            .select('id', 'name', 'cnpj', 'userId')
            .where({userId: req.params.id})
            .then(companys => res.json(companys))
            .catch(err => res.status(500).send(err));
    }

    const deleteCompany = async (req, res) => {
        try {
            existsOrError(req.params.id, 'Id da empresa não informado');

            const services = await app.db('services')
                .where({companyId: req.params.id}).del();

            const products = await app.db('products')
                .where({companyId: req.params.id}).del();

            const deleteCompany = await app.db('company')
                .where({id: req.params.id}).del();

            existsOrError(deleteCompany, 'Empresa não encontrada!');

            res.status(204).send()
        } catch (error) {
            return res.status(400).json(error);
        }
    }

    return { createCompany, getCompanys, editCompany, deleteCompany };
}