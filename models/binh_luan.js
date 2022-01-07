const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('binh_luan', {
    MaBinhLuan: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    MaSanPham: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'san_pham',
        key: 'MaSanPham'
      }
    },
    MaKhachHang: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'khach_hang',
        key: 'MaKhachHang'
      }
    },
    DanhGia: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    NoiDung: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ThoiGian: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'binh_luan',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MaBinhLuan" },
        ]
      },
      {
        name: "FK_BINH_LUAN_MASANPHAM",
        using: "BTREE",
        fields: [
          { name: "MaSanPham" },
        ]
      },
      {
        name: "FK_BINH_LUAN_MAKHACHHANG",
        using: "BTREE",
        fields: [
          { name: "MaKhachHang" },
        ]
      },
    ]
  });
};
