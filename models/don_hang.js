const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('don_hang', {
    MaDonHang: {
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
    MaSanPham: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'loai_san_pham',
        key: 'MaSanPham'
      }
    },
    LoaiSanPham: {
      type: DataTypes.CHAR(25),
      allowNull: false,
      references: {
        model: 'loai_san_pham',
        key: 'LoaiSanPham'
      }
    },
    DonGia: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    SoLuongSanPham: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ThoiGian: {
      type: DataTypes.DATE,
      allowNull: false
    },
    HoTen: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    SoDienThoai: {
      type: DataTypes.CHAR(10),
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    DiaChiGiaoHang: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    TrangThaiDonHang: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    LuuYCuaNguoiMua: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'don_hang',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "MaDonHang" },
        ]
      },
      {
        name: "FK_DON_HANG_MAKHACHHANG",
        using: "BTREE",
        fields: [
          { name: "MaKhachHang" },
        ]
      },
      {
        name: "FK_DON_HANG_SANPHAM",
        using: "BTREE",
        fields: [
          { name: "MaSanPham" },
          { name: "LoaiSanPham" },
        ]
      },
    ]
  });
};
