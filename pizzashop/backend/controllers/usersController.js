const {User} = require('../models');
const {Op} = require('sequelize');

const SORTABLE = new Set(['created_at', 'email']);

// образцовый контроллер для дальнейшей работы

async function createUser(req, res, next) {
    try {
        const user = await User.create({
            email: req.body.email,
            name: req.body.name,
            login: req.body.login
        });
        res.status(201).json(user)
    } catch(e) {
        next(e);
    }
}

async function findAll(req, res, next) {
    try {
        const users = await User.findAll(
            // необязательные параметры
            {
                attributes: ['id', 'email'],
                order: [['id', 'ASC']]
            }
        );
        res.json(users);
    } catch(err) {
        next(err);
    }
}

async function findById(req, res, next) {
    try {
        const user = await User.findByPk(req.params.id, {
            // здесь можно поставить необязательные параметры как  в запросе выше
        });
        if (!user) {
            return res.status(404).json({
                error: 'User Not found'
            })
        }
        res.json(user);
    } catch(err) {
        next(err);
    }
}

async function updateUser(req, res, next) {
    try {
        const user = await User.findByPk(req.params.id, {
            // здесь можно поставить необязательные параметры как  в запросе выше
        });
        if (!user) {
            return res.status(404).json({
                error: 'User Not found'
            })
        }

        const {name, email} = req.body;
        await user.update({name, email});

        res.json(user);
    } catch(err) {
        if (err instanceof UniqueConstraintError) {
            return res.status(409).json({ error: 'Email already taken' });
        }
        next(err);
    }
}

async function removeUser(req, res, next) {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({
                error: 'User Not found'
            })
        }
        await user.destroy();
        res.status(204).send();
    } catch(err) {
        next(err);
    }
}

// find user by name
async function findUserByName(req, res, next) {
    try {
        console.log('asdasd');
        const {email} = req.query
        const user = await User.findAll({
            where: {
                email: {[Op.like]: `%${email}%`}
            }
        })
        res.send(user);
    } catch(e) {
        next(e)
    }
}

async function listUsers(req, res, next) {
    try {
        const where = {};
        const page = Math.max(Number(req.query.page) || 1, 1);
        const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);
        const offset = (page - 1) * limit;

        const sort = SORTABLE.has(req.query.sort) ? req.query.sort : 'created_at';
        const orderDirection = req.query.order === 'asc' ? 'ASC' : 'DESC';

        const {rows, count} = await User.findAndCountAll({
            where,
            limit,
            offset,
            order: [[sort, orderDirection]]
        });

        res.json({
            data: rows,
            meta: {
                page,
                limit,
                total: count,
                totalPages: Math.ceil(count / limit) || 1
            }
        })
    }
    catch(e) {
        next(e);
    }
}


async function queryUser(req, res, next) {
  try {
    const where = {};
    if (req.query.q) {
      const q = req.query.q.trim();

      where[Op.or] = [
        { login: { [Op.like]: `%${q}%` } },
        { email: { [Op.like]: `%${q}%` } },
      ];
    }

    const users = await User.findAll({
      where,
      attributes: ["id", "email", "login"],
      order: [["login", "ASC"]],
    });

    res.json(users);
  } catch (err) {
    next(err);
  }
}


module.exports = {queryUser, listUsers, createUser, findAll, findById, updateUser, removeUser, findUserByName};