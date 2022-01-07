const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('san_pham', {
    MaSanPham: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    TenSanPham: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    MaThuongHieu: {
      type: DataTypes.CHAR(10),
      allowNull: true,
      references: {
        model: 'thuong_hieu',
        key: 'MaThuongHieu'
      }
    },
    MoTa: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'san_pham',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MaSanPham" },
        ]
      },
      {
        name: "FK_SAN_PHAM_MATHUONGHIEU",
        using: "BTREE",
        fields: [
          { name: "MaThuongHieu" },
        ]
      },
    ]
  });
};
