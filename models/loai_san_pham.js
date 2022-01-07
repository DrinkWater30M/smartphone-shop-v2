const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('loai_san_pham', {
    MaSanPham: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'san_pham',
        key: 'MaSanPham'
      }
    },
    LoaiSanPham: {
      type: DataTypes.CHAR(25),
      allowNull: false,
      primaryKey: true
    },
    TenLoaiSanPham: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    DonGia: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    SoLuong: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Ram: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Rom: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ManHinh: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    DoPhanGiai: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    ChipXuLi: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    Pin: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    MauSac: {
      type: DataTypes.STRING(10),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'loai_san_pham',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MaSanPham" },
          { name: "LoaiSanPham" },
        ]
      },
    ]
  });
};
