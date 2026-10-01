import Sequelize from 'sequelize';

export const sequelize = new Sequelize("pizza", "root", "", {
  dialect: "mysql",
  host: "localhost"
});
