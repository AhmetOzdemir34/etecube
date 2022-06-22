const {Sequelize} = require('sequelize');
//imports
const sequelize = new Sequelize("postgres://postgres:1234@localhost:5432/postgres");

const databaseTest = async () =>{
    try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    } catch (error) {
    console.error('Unable to connect to the database:', error);
    }    
}

module.exports = {databaseTest}