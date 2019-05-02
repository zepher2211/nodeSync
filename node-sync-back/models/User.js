//everything inside model folder: create database schema + define relationship 

//use sequelize package
const Sequelize = require('sequelize');

//use sqlite database
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

//create this model
const Model = Sequelize.Model;

//import Script model
const Script = require("./Script");

class User extends Model {}
User.init({
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING
    }
}, {
    sequelize,
    modelName: 'user'
})

module.exports = User

sequelize.sync()

//define & create join table
UserScript = sequelize.define('user_script', {
    role: Sequelize.STRING
});

User.belongsToMany(Script, {
    through: UserScript
});
Script.belongsToMany(User, {
    through: UserScript
});