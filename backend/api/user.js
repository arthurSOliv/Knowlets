const bcrypt = require('bcrypt-nodejs');

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation;

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }
    const createUser = async (req, res) => {
        const user = {...req.body}

        try {
            existsOrError(user.email, 'Email não informado');
            existsOrError(user.password, 'Senha não informada');

            const userFromDB = await app.db('users')
                .where({email: user.email}).first();

            notExistsOrError(userFromDB, 'Usuário já cadastrado!');
        } catch (error) {
            return res.status(400).json(error);
        }
        
        user.password = encryptPassword(req.body.password);

        app.db('users')
            .insert(user)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).json(err));
    }

    const getUsers = async (req, res) => {
        app.db('users')
            .select('id', 'email')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err));
    }

    return { createUser, getUsers };
}