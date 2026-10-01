import { Sequelize } from "sequelize";
import { sequelize } from "../config/db.config.js";

const Orders = sequelize.define("orders", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

export default Orders;