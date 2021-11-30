const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cua_hang', {
    MaCuaHang: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: true
    },
    TenCuaHang: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    TenDangNhap: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    MatKhau: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'cua_hang',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MaCuaHang" },
        ]
      },
    ]
  });
};
