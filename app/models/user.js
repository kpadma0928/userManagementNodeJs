module.exports = function(sequelize, Sequelize){
    var User = sequelize.define('user', {
        id: {
            autoIncrement: true,
            primaryKey: true, 
            type: Sequelize.INTEGER
        },
        first_name: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        last_name: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isEmail: {
                    msg: "Enter valid email"
                }
            },
            unique: true
        },
        phone_number: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate:{
                len:{
                    args: 8,
                    msg: "Password length must be 8 characters in length."
                }
            }
        },
        last_login:{
            type: Sequelize.DATE
        }
    })
    return User;
}