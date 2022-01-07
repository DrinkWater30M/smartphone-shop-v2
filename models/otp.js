const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('otp', {
    MaStt: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    MaKhachHang: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'khach_hang',
        key: 'MaKhachHang'
      }
    },
    Otp: {
      type: DataTypes.CHAR(10),
      allowNull: false
    },
    HanSudung: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'otp',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MaStt" },
        ]
      },
      {
        name: "FK_OTP_MAKHACHHANG",
        using: "BTREE",
        fields: [
          { name: "MaKhachHang" },
        ]
      },
    ]
  });
};
