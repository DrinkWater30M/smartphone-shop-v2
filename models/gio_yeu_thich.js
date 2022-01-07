const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('gio_yeu_thich', {
    MaKhachHang: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'khach_hang',
        key: 'MaKhachHang'
      }
    },
    MaSanPham: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'loai_san_pham',
        key: 'MaSanPham'
      }
    },
    LoaiSanPham: {
      type: DataTypes.CHAR(25),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'loai_san_pham',
        key: 'LoaiSanPham'
      }
    }
  }, {
    sequelize,
    tableName: 'gio_yeu_thich',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MaKhachHang" },
          { name: "MaSanPham" },
          { name: "LoaiSanPham" },
        ]
      },
      {
        name: "FK_GIO_YEU_THICH_SANPHAM",
        using: "BTREE",
        fields: [
          { name: "MaSanPham" },
          { name: "LoaiSanPham" },
        ]
      },
    ]
  });
};
