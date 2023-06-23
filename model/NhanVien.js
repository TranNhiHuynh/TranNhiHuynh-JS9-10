function NhanVien(
    _tkNV,
    _tenNV,
    _email,
    _matKhau,
    _ngayLam,
    _luongCB,
    _chucVu,
    _gioLam,
) {
    ;(this.tkNV = _tkNV),
        (this.tenNV = _tenNV),
        (this.email = _email),
        (this.matKhau = _matKhau),
        (this.ngayLam = _ngayLam),
        (this.luongCB = _luongCB),
        (this.chucVu = _chucVu),
        (this.gioLam = _gioLam),
        (this.tongLuong = function () {
            if(this.chucVu == "Giám đốc")
            {
                return this.luongCB*3;
            }

            if(this.chucVu == "Trưởng phòng")
            {
                return this.luongCB*2;
            }

            return this.luongCB;
        })

        (this.xepLoai = function () {
            if(this.gioLam > 191 )
            {
                return "Xuất sắc";
            }

            if(this.gioLam > 175 )
            {
                return "Giỏi";
            }

            if(this.gioLam > 159 )
            {
                return "Khá";
            }

            return "Trung bình";
        })
}
