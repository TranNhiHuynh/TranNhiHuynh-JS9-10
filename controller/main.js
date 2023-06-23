function getElement(selector) {
    return document.querySelector(selector)
}

var dsnv = new DSNV()

getLocalStorage()

function getThongTinNV(isEdit) {

    var tkNV = getElement('#tknv').value
    var tenNV = getElement('#name').value
    var email = getElement('#email').value
    var matKhau = getElement('#password').value
    var ngayLam = getElement('#datepicker').value
    var luongCB = +getElement('#luongCB').value
    var chucVu = getElement('#chucvu').value
    var gioLam = +getElement('#gioLam').value

    var nhanVien = new NhanVien(
        tkNV,
        tenNV,
        email,
        matKhau,
        ngayLam,
        luongCB,
        chucVu,
        gioLam,
    )

    console.log('sinhVien: ', nhanVien)




    var isValid = true

    // Kiểm tra mã SV
    isValid &=
        kiemTraChuoi(
            nhanVien.tkNV,
            1,
            undefined,
            '#tbTKNV',
            'Mã sinh viên không được bỏ trống'
        ) &&
        kiemTraChuoi(nhanVien.tkNV, 4, 6, '#tbTKNV', 'Tài khoản từ 4 đến 6 ký tự')  &&
        kiemTraMaNV(nhanVien.tkNV, dsnv.arrNV, isEdit, '#tbTKNV', 'Tài khoản này đã tồn tại')

    // Kiểm tra tên sinh viên
    isValid &= kiemTraChuoi(
        nhanVien.tenNV,
        1,
        undefined,
        '#tbTen',
        'Tên sinh viên không được bỏ trống'
    )

    // Kiểm tra mật khẩu
    isValid &= kiemTraChuoi(
        nhanVien.matKhau,
        1,
        undefined,
        '#tbMatKhau',
        'Mật khẩu không được bỏ trống'
    )

    isValid &= kiemTraPattern(
        nhanVien.matKhau,
        '#tbMatKhau',
        /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,.?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*))/,
        'Mật khẩu chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt'
    )


    // Kiểm tra ngày làm
    isValid &= kiemTraChuoi(
        nhanVien.ngayLam,
        1,
        undefined,
        '#tbNgay',
        'Ngày làm không được bỏ trống'
    )
    
    // Kiểm tra email
    isValid &= kiemTraChuoi(
        nhanVien.email,
        1,
        undefined,
        '#tbEmail',
        'Email không được bỏ trống'
    )

    isValid &= kiemTraPattern(
        nhanVien.email,
        '#tbEmail',
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Email không đúng định dạng'
    )

    // Kiểm tra giờ làm
    isValid &= kiemTraChuoi(
        nhanVien.gioLam,
        1,
        undefined,
        '#tbGiolam',
        'Giờ làm không được bỏ trống'
    )
    &&
    kiemTraGiaTri(nhanVien.gioLam,80,200,'#tbGiolam','Giờ làm phải từ 80 đến 200')

    // Kiểm tra lương CB
    isValid &= kiemTraChuoi(
        nhanVien.luongCB,
        1,
        undefined,
        '#tbLuongCB',
        'Lương cơ bản không được bỏ trống'
    )
    &&
    kiemTraGiaTri(nhanVien.luongCB,1000000,20000000,'#tbLuongCB','Lương cơ bản phải từ 1000000 đến 20000000')


    return isValid ? nhanVien : undefined ;
 }

getElement('#btnThemNV').onclick = function () {

    var nhanVien = getThongTinNV(false);

    if (nhanVien) {
        dsnv.themNV(nhanVien)
        console.log(dsnv.arrNV)
        renderdsnv()
        setLocalStorage()
    }
}


function renderdsnv(arrNV = dsnv.arrNV) {
    var content = ''
    for (var i = 0; i < arrNV.length; i++) {
        var nv = arrNV[i]
        content += `
            <tr>
                <td>${nv.tkNV}</td>
                <td>${nv.tenNV}</td>
                <td>${nv.email}</td>
                <td>${nv.ngayLam}</td>
                <td>${nv.chucVu}</td>
                <td>${nv.tongLuong()}</td>
                <td>${nv.xepLoai()}</td>
                <td>
                    </button>
                    <button class='btn btn-danger' onclick="deleteNV('${nv.tkNV}')">Delete</button>
                </td>
            </tr>
        `
    }


    console.log("da in ra")
    getElement('#tableDanhSach').innerHTML = content
}

// Lưu danh sách sinh viên vào localStorage
function setLocalStorage() {
    var data = JSON.stringify(dsnv.arrNV)
    localStorage.setItem('DSNV', data)
}

function getLocalStorage() {
    var data = localStorage.getItem('DSNV') // null

    if (data) {
        var parseData = JSON.parse(data)
        var arr = []

        for (var i = 0; i < parseData.length; i++) {
            var nv = parseData[i]
            console.log('nv: ', nv)
            var nhanVien = new NhanVien(
                nv.tkNV,
                nv.tenNV,
                nv.email,
                nv.matKhau,
                nv.ngayLam,
                nv.luongCB,
                nv.chucVu,
                nv.gioLam,
            )
            arr.push(nhanVien)
        }

        dsnv.arrNV = arr
        console.log('arr: ', arr)
        renderdsnv()
    }
}

// xóa sinh viên
function deleteNV(tkNV) {
    dsnv.xoaNV(tkNV)
    renderdsnv()
    setLocalStorage()
}

function updateNV(tkNV) {
    var index = dsnv.timNV(tkNV)
    var nv = dsnv.arrNV[index]
    console.log('nv: ', nv)
    getElement('#tkNV').value = nv.tkNV
    getElement('#name').value = nv.tenNV
    getElement('#email').value = nv.email
    getElement('#password').value = nv.matKhau
    getElement('#ngaylam').value = nv.ngayLam
    getElement('#luongCB').value = nv.luongCB
    getElement('#chucvu').value = nv.chucVu
    getElement('#giolam').value = nv.gioLam
}

//Cập nhật lại sinh viên
getElement('#btnCapNhat').onclick = function () {
    var nhanVien = getThongTinNV(true)
    dsnv.capNhatNV(nhanVien)


    renderdsnv()

    setLocalStorage()

}

//Tìm kiếm sinh viên
getElement('#btnTimNV').onclick = function (){
    
    var valueSearch =  getElement('#loaiNV').value;
    if(valueSearch === "Tất cả"){
        renderdsnv();
        return;
    }

    console.log('valueSerch: ', valueSearch);
    var arrNVSearch = []
    for(var i = 0; i < dsnv.arrNV.length; i++){
        console.log(dsnv.arrNV[i].xepLoai());
        if(valueSearch == dsnv.arrNV[i].xepLoai())
        {
            arrNVSearch.push(dsnv.arrNV[i]);
        }
    }
    console.log('arrSVSearch: ', arrNVSearch);
    renderdsnv(arrNVSearch)
}

