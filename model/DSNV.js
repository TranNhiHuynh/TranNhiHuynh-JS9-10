function DSNV() {
    this.arrNV = []

    this.themNV = function (nhanVien) {
        this.arrNV.push(nhanVien)
    }

    this.timNV = function (maNhanVien) {
        for (var i = 0; i < this.arrNV.length; i++) {
            var tkNV = this.arrNV[i].tkNV
            if (tkNV === maNhanVien) {
                return i
            }
        }

        return -1
    }
    this.xoaNV = function (maNhanVien) {

        var index = this.timNV(maNhanVien)
        console.log('index: ', index)
        if (index !== -1) {
            this.arrNV.splice(index, 1)
        }
    }

    this.capNhatNV = function (nhanVien) {
        var index = this.timNV(nhanVien.tkNV)
        if (index !== -1) {
            this.arrNV[index] = nhanVien;
        }
    }
}
