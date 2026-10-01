require('dotenv').config();
const app = require('./app');
const db = require('./models');

const PORT = process.env.PORT || 3000;

async function start() {
    try {
        await db.sequelize.authenticate();
        console.log('connected');

        await db.sequelize.sync();

        app.listen(PORT, () => {
            console.log(`server started on port ${PORT}`)
        })
    } catch (e) {
        console.log('smth wrong', e.message);
        process.exit();
    }
}

start();