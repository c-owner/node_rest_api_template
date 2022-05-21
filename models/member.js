'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Member extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    
    Member.init({
        
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        name: DataTypes.STRING,
        team: DataTypes.STRING,
        position: DataTypes.STRING,
        emailAddress: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        admissionDate: DataTypes.DATE,
        birthday: DataTypes.DATE,
        profileImage: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Member',
    });
    return Member;
};
