const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('binh_luan', {
    MaBinhLuan: {
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
    MaKhachHang: {
      type: DataTypes.CHAR(10),
      allowNull: true,
      references: {
        model: 'khach_hang',
        key: 'MaKhachHang'
      }
    },
    TenDuPhong: {
      type: DataTypes.STRING(50),
      allowNull: true
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
