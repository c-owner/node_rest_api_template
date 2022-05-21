'use strict';
const {
  Model
} = require('sequelize');
const sql = require("./db");
module.exports = (sequelize, DataTypes) => {
  class Members extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Members.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Members',
  });
  return Members;
};

// 생성자
const Members = function(member){
  this.name = member.name;
  this.email = member.email;
  this.phone_number = member.phone_number;
};


// member 전체 조회
Members.getAll = result =>{
  sql.query('SELECT * FROM Members', (err, res)=>{
    if(err){
      console.log("error: ", err);
      result(err, null);
      return;
    }
    
    console.log("customer: ", res);
    result(null, res);
  });
};
