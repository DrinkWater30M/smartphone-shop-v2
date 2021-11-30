const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('hinh_anh_san_pham', {
    MaHinhAnh: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: true
    },
    MaSanPham: {
      type: DataTypes.CHAR(10),
      allowNull: true,
      references: {
        model: 'san_pham',
        key: 'MaSanPham'
      }
    },
    HinhAnh: {
      type: DataTypes.CHAR(200),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'hinh_anh_san_pham',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MaHinhAnh" },
        ]
      },
      {
        name: "FK_HINH_ANH_SAN_PHAM_MASANPHAM",
        using: "BTREE",
        fields: [
          { name: "MaSanPham" },
        ]
      },
    ]
  });
};
