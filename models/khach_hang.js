const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('khach_hang', {
    MaKhachHang: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      primaryKey: true
    },
    HoTen: {
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
      allowNull: true
    },
    SoDienThoai: {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    DiaChiGiaoHang: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'khach_hang',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MaKhachHang" },
        ]
      },
    ]
  });
};
