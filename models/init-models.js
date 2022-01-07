var DataTypes = require("sequelize").DataTypes;
var _binh_luan = require("./binh_luan");
var _cua_hang = require("./cua_hang");
var _don_hang = require("./don_hang");
var _gio_hang = require("./gio_hang");
var _gio_yeu_thich = require("./gio_yeu_thich");
var _hinh_anh_san_pham = require("./hinh_anh_san_pham");
var _khach_hang = require("./khach_hang");
var _loai_san_pham = require("./loai_san_pham");
var _otp = require("./otp");
var _san_pham = require("./san_pham");
var _thuong_hieu = require("./thuong_hieu");

function initModels(sequelize) {
  var binh_luan = _binh_luan(sequelize, DataTypes);
  var cua_hang = _cua_hang(sequelize, DataTypes);
  var don_hang = _don_hang(sequelize, DataTypes);
  var gio_hang = _gio_hang(sequelize, DataTypes);
  var gio_yeu_thich = _gio_yeu_thich(sequelize, DataTypes);
  var hinh_anh_san_pham = _hinh_anh_san_pham(sequelize, DataTypes);
  var khach_hang = _khach_hang(sequelize, DataTypes);
  var loai_san_pham = _loai_san_pham(sequelize, DataTypes);
  var otp = _otp(sequelize, DataTypes);
  var san_pham = _san_pham(sequelize, DataTypes);
  var thuong_hieu = _thuong_hieu(sequelize, DataTypes);

  binh_luan.belongsTo(khach_hang, { as: "MaKhachHang_khach_hang", foreignKey: "MaKhachHang"});
  khach_hang.hasMany(binh_luan, { as: "binh_luans", foreignKey: "MaKhachHang"});
  don_hang.belongsTo(khach_hang, { as: "MaKhachHang_khach_hang", foreignKey: "MaKhachHang"});
  khach_hang.hasMany(don_hang, { as: "don_hangs", foreignKey: "MaKhachHang"});
  gio_hang.belongsTo(khach_hang, { as: "MaKhachHang_khach_hang", foreignKey: "MaKhachHang"});
  khach_hang.hasMany(gio_hang, { as: "gio_hangs", foreignKey: "MaKhachHang"});
  gio_yeu_thich.belongsTo(khach_hang, { as: "MaKhachHang_khach_hang", foreignKey: "MaKhachHang"});
  khach_hang.hasMany(gio_yeu_thich, { as: "gio_yeu_thiches", foreignKey: "MaKhachHang"});
  otp.belongsTo(khach_hang, { as: "MaKhachHang_khach_hang", foreignKey: "MaKhachHang"});
  khach_hang.hasMany(otp, { as: "otps", foreignKey: "MaKhachHang"});
  don_hang.belongsTo(loai_san_pham, { as: "MaSanPham_loai_san_pham", foreignKey: "MaSanPham"});
  loai_san_pham.hasMany(don_hang, { as: "don_hangs", foreignKey: "MaSanPham"});
  don_hang.belongsTo(loai_san_pham, { as: "LoaiSanPham_loai_san_pham", foreignKey: "LoaiSanPham"});
  loai_san_pham.hasMany(don_hang, { as: "LoaiSanPham_don_hangs", foreignKey: "LoaiSanPham"});
  gio_hang.belongsTo(loai_san_pham, { as: "MaSanPham_loai_san_pham", foreignKey: "MaSanPham"});
  loai_san_pham.hasMany(gio_hang, { as: "gio_hangs", foreignKey: "MaSanPham"});
  gio_hang.belongsTo(loai_san_pham, { as: "LoaiSanPham_loai_san_pham", foreignKey: "LoaiSanPham"});
  loai_san_pham.hasMany(gio_hang, { as: "LoaiSanPham_gio_hangs", foreignKey: "LoaiSanPham"});
  gio_yeu_thich.belongsTo(loai_san_pham, { as: "MaSanPham_loai_san_pham", foreignKey: "MaSanPham"});
  loai_san_pham.hasMany(gio_yeu_thich, { as: "gio_yeu_thiches", foreignKey: "MaSanPham"});
  gio_yeu_thich.belongsTo(loai_san_pham, { as: "LoaiSanPham_loai_san_pham", foreignKey: "LoaiSanPham"});
  loai_san_pham.hasMany(gio_yeu_thich, { as: "LoaiSanPham_gio_yeu_thiches", foreignKey: "LoaiSanPham"});
  binh_luan.belongsTo(san_pham, { as: "MaSanPham_san_pham", foreignKey: "MaSanPham"});
  san_pham.hasMany(binh_luan, { as: "binh_luans", foreignKey: "MaSanPham"});
  hinh_anh_san_pham.belongsTo(san_pham, { as: "MaSanPham_san_pham", foreignKey: "MaSanPham"});
  san_pham.hasMany(hinh_anh_san_pham, { as: "hinh_anh_san_phams", foreignKey: "MaSanPham"});
  loai_san_pham.belongsTo(san_pham, { as: "MaSanPham_san_pham", foreignKey: "MaSanPham"});
  san_pham.hasMany(loai_san_pham, { as: "loai_san_phams", foreignKey: "MaSanPham"});
  san_pham.belongsTo(thuong_hieu, { as: "MaThuongHieu_thuong_hieu", foreignKey: "MaThuongHieu"});
  thuong_hieu.hasMany(san_pham, { as: "san_phams", foreignKey: "MaThuongHieu"});

  return {
    binh_luan,
    cua_hang,
    don_hang,
    gio_hang,
    gio_yeu_thich,
    hinh_anh_san_pham,
    khach_hang,
    loai_san_pham,
    otp,
    san_pham,
    thuong_hieu,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
