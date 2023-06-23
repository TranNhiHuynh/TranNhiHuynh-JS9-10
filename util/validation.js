
function kiemTraChuoi(value, minLength, maxLength, selector, messErr) {
    // Nếu như kiểm tra false
    if (String(value).trim().length < minLength ||String(value).trim().length > Number(maxLength)) {
        getElement(selector).innerHTML = messErr
        return false
    }

    // Nếu như kiểm tra true
    getElement(selector).innerHTML = ''
    return true
}

function kiemTraGiaTri(value, min, max, selector, messErr) {
    // Nếu như kiểm tra false
    if (value < min || value > max) {
        getElement(selector).innerHTML = messErr
        return false
    }

    // Nếu như kiểm tra true
    getElement(selector).innerHTML = ''
    return true
}

function kiemTraPattern(value, selector, pattern, messErr) {
    // Nếu chuỗi ko thỏa mãn pattern
    if (!pattern.test(value)) {
        getElement(selector).innerHTML = messErr
        return false
    }

    // Nếu chuỗi đúng
    getElement(selector).innerHTML = ''
    return true
}


function kiemTraMaNV(tkNV, dsnv, isEdit, selector, messErr) {
    if(isEdit) return true
    
    var isFlag = true
    for (var i = 0; i < dsnv.length; i++) {
        if (dsnv[i].tkNV == tkNV) {
            isFlag = false
            break
        }
    }

    if (isFlag) {
        getElement(selector).innerHTML = ''
        return true
    }

    if (!isFlag) {
        getElement(selector).innerHTML = messErr
        return false
    }
}
