//Function API
function loadDataEmployees() {
    $.ajax({
        url: "http://api.manhnv.net/api/employees",
        method: "GET"
    }).done(function (response) {
        var table = $('#tbody-employees');
        table.empty();
        for (var i = 0; i < response.length; i++) {
            var row = $(`<tr class="employee-info">
            <td>${response[i].EmployeeCode}
            <ul class="custom-menu">
            <li data-toggle="modal"data-target="#edit-employee-modal"><i class="fas fa-edit"></i> Sửa</li>
            <li data-toggle="modal" data-target="#delete-employee-modal"><i class="fas fa-trash-alt"></i> Xóa</li>
            </ul>
            </td>
            <td>${response[i].FullName}</td>
            <td>${genderDetermination(response[i].Gender)}</td>
            <td>${changeDatetimeToDate(response[i].DateOfBirth)}</td>
            <td>${checkNullValue(response[i].PhoneNumber)}</td>
            <td>${checkNullValue(response[i].Email)}</td>
            <td>${checkNullValue(response[i].PositionName)}</td>
            <td>${checkNullValue(response[i].DepartmentName)}</td>
            <td class="text-right">${checkNullValue(response[i].Salary).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</td>
            <td>${checkNullValue(response[i].WorkStatusName)}</td>
            </tr>`);
            row.data("id", response[i].EmployeeId);
            // console.log(row.data());

            table.append(row);
        }

        trRightClick();
    }).fail(function (res) {

    });
}

function getEmployeeInfo(id) {
    $.ajax({
        url: "http://api.manhnv.net/api/employees/" + id,
        type: "GET",
        data: "{}",
        dataType: "json",
        success: function (data) {
            // console.log("get ok");
            return data;
        }
    });
}

function getEmployeeInAddForm() {
    var employee = {
        EmployeeCode: $('#employee-code').val(),
        FullName: $('#full-name').val(),
        DateOfBirth: $('#date-of-birth').val(),
        Gender: $('#gender').val(),
        IdentityNumber: $('#identity-number').val(),
        IdentityDate: $('#identity-date').val(),
        IdentityPlace: $('#identity-place').val(),
        Email: $('#email').val(),
        PhoneNumber: $('#phone-number').val(),
        PositionId: $('#position-name').val(),
        DepartmentId: $('#department-name').val(),
        PersonalTaxCode: $('#personal-tax-code').val(),
        Salary: $('#salary').val(),
        JoinDate: $('#join-date').val(),
        WorkStatus: $('#work-status-name').val()
    }
    return employee;
}

function getEmployeeInEditForm(id) {
    var employee = {
        EmployeeId: id,
        EmployeeCode: $('#edit-employee-code').val(),
        FullName: $('#edit-full-name').val(),
        DateOfBirth: $('#edit-date-of-birth').val(),
        Gender: $('#edit-gender').val(),
        IdentityNumber: $('#edit-identity-number').val(),
        IdentityDate: $('#edit-identity-date').val(),
        IdentityPlace: $('#edit-identity-place').val(),
        Email: $('#edit-email').val(),
        PhoneNumber: $('#edit-phone-number').val(),
        PositionId: $('#edit-position-name').val(),
        DepartmentId: $('#edit-department-name').val(),
        PersonalTaxCode: $('#edit-personal-tax-code').val(),
        Salary: $('#edit-salary').val(),
        JoinDate: $('#edit-join-date').val(),
        WorkStatus: $('#edit-work-status-name').val()
    }
    return employee;
}


//Alert
function showSuccessAlert(content) {
    $('#success-alert-content').text(content);
    $("#success-alert").fadeTo(4000, 500).slideUp(500, function () {
        $("#success-alert").slideUp(500);
    });
};

function showWarningAlert(content) {
    $('#warning-alert-content').text(content);
    $("#warning-alert").fadeTo(4000, 500).slideUp(500, function () {
        $("#warning-alert").slideUp(500);
    });
};

//Preview Avatar
$('#avatar-file').change(function (e) {
    var fileName = e.target.files[0].name;
    $("#avatar-file-src").val(fileName);

    var reader = new FileReader();
    reader.onload = function (e) {
        // get loaded data and render thumbnail.
        document.getElementById("avatar-img").src = e.target.result;
    };
    // read the image file as a data URL.
    reader.readAsDataURL(this.files[0]);
});

$('#edit-avatar-file').change(function (e) {
    var fileName = e.target.files[0].name;
    $("#edit-avatar-file-src").val(fileName);

    var reader = new FileReader();
    reader.onload = function (e) {
        // get loaded data and render thumbnail.
        document.getElementById("edit-avatar-img").src = e.target.result;
    };
    // read the image file as a data URL.
    reader.readAsDataURL(this.files[0]);
});

//function Format
function genderDetermination(gender) {
    switch (gender) {
        case 0:
            return "Nữ";
        case 1:
            return "Nam";
        default:
            return "";
    }
}

function changeDatetimeToDate(datetime) {
    if (datetime) {
        var date = new Date(datetime);
        var formatOptions = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            // hour: '2-digit',
            // minute: '2-digit',
            // hour12: true
        };
        var dateString = date.toLocaleDateString('en-US', formatOptions);
        // => "02/17/2017, 11:32 PM"

        // dateString = dateString.replace(',', '')
        //     .replace('PM', 'p.m.')
        //     .replace('AM', 'a.m.');
        // => "02/17/2017 11:32 p.m."

        return dateString;
    }
    return '';
}

function changeDatetimeToDateForInput(datetime) {
    var date = new Date(datetime);

    var dateString = date.getFullYear() + "-" + ("00" + (date.getMonth() + 1)).slice(-2) + "-" + ("00" + date.getDate()).slice(-2)
    // console.log(dateString);
    return dateString;
}

function checkNullValue(value) {
    if (value) {
        return value;
    } else {
        return '';
    }
}


//function Validate
function validateAddForm(employee) {
    if (!validateEmployeeCode(employee.EmployeeCode)) {
        $('#employee-code').focus();
        return false;
    }
    if (!validateFullName(employee.FullName)) {
        $('#full-name').focus();
        return false;
    }
    if (!validateIdentityNumber(employee.IdentityNumber)) {
        $('#identity-number').focus();
        return false;
    }
    if (!validateEmail(employee.Email)) {
        $('#email').focus();
        return false;
    }
    if (!validatePhoneNumber(employee.PhoneNumber)) {
        $('#phone-number').focus();
        return false;
    }
    return true;
}

function validateEditForm(employee) {
    if (!validateEmployeeCode(employee.EmployeeCode)) {
        $('#edit-employee-code').focus();
        return false;
    }
    if (!validateFullName(employee.FullName)) {
        $('#edit-full-name').focus();
        return false;
    }
    if (!validateIdentityNumber(employee.IdentityNumber)) {
        $('#edit-identity-number').focus();
        return false;
    }
    if (!validateEmail(employee.Email)) {
        $('#edit-email').focus();
        return false;
    }
    if (!validatePhoneNumber(employee.PhoneNumber)) {
        $('#edit-phone-number').focus();
        return false;
    }
    return true;
}

function validateEmployeeCode(employeeCode) {
    employeeCode = employeeCode.trim();
    if (employeeCode == null || employeeCode == '') {
        showWarningAlert('Mã nhân viên không được để trống');
        return false;
    }
    return true;
}

function validateFullName(employeeFullName) {
    employeeFullName = employeeFullName.trim();
    if (employeeFullName == null || employeeFullName == '') {
        showWarningAlert('Họ tên không được để trống');
        return false;
    }
    return true;
}

function validateIdentityNumber(employeeIdentityNumber) {
    employeeIdentityNumber = employeeIdentityNumber.trim();
    if (employeeIdentityNumber == null || employeeIdentityNumber == '') {
        showWarningAlert('Vui lòng điền số CMTND/ Căn cước');
        return false;
    }
    return true;
}

function validateEmail(employeeEmail) {
    var pattern = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    employeeEmail = employeeEmail.trim();
    if (employeeEmail == null || employeeEmail == "") {
        showWarningAlert("Email không được trống");
        return false;
    }
    else if (!pattern.test(employeeEmail)) {
        showWarningAlert('Email không hợp lệ');
        return false;
    }
    return true;
}

function validatePhoneNumber(employeePhone) {
    employeePhone = employeePhone.trim();
    if (employeePhone == null || employeePhone == "") {
        showWarningAlert("Số điện thoại không được trống");
        return false;
    }
    var phone = employeePhone.trim();
    phone = phone.replace('(+84)', '0');
    phone = phone.replace('+84', '0');
    phone = phone.replace('0084', '0');
    phone = phone.replace(/ /g, '');
    if (phone != '') {
        var firstNumber = phone.substring(0, 2);
        if ((firstNumber == '09' || firstNumber == '08') && phone.length == 10) {
            if (phone.match(/^\d{10}/)) {
                return true;
            }
        } else if (firstNumber == '01' && phone.length == 11) {
            if (phone.match(/^\d{11}/)) {
                return true;
            }
        }
    }
    showWarningAlert("Số điện thoại không hợp lệ");
    return false;
}

//Event
$('#add-employee-btn').click(function () {
    addNewEmployee();
});

$('#edit-employee-btn').click(function () {
    editEmployeeInfo();
});

//right click to show menu
function trRightClick() {
    $('.employee-info').bind("contextmenu", function (event) {
        event.preventDefault();

        $(this).find(".custom-menu").finish().toggle(100).

            // In the right position (the mouse)
            css({
                top: event.pageY + "px",
                left: event.pageX + "px"
            });
    });


    // If the document is clicked somewhere
    $(document).bind("mousedown", function (e) {

        // If the clicked element is not the menu
        if (!$(e.target).parents(".custom-menu").length > 0) {

            $(".custom-menu").hide(100);
        }
    });

    $(".custom-menu li").click(function () {
        $(".custom-menu").hide(100);
    });
}


//Document
$(document).ready(function () {
    loadDataEmployees();
});

$(document).ready(function () {
    $('#add-employee-modal').on('shown.bs.modal', function () {
        $('#employee-code').focus();
    });
});

$("#avatar-img").click(function () {
    $("#avatar-file").click();
});

$("#edit-avatar-img").click(function () {
    $("#edit-avatar-file").click();
});


//Thêm nhân viên modal
function addNewEmployee() {
    var employee = getEmployeeInAddForm();

    if (validateAddForm(employee)) {
        $.ajax({
            url: "http://api.manhnv.net/api/employees",
            method: "POST",
            data: JSON.stringify(employee),
            contentType: "application/json"
        }).done(function (response) {
            $('#add-employee-modal').modal('hide');
            showSuccessAlert("Thêm thành công");
            loadDataEmployees();
        }).fail(function (response) {
            var noti = JSON.parse(response.responseText);
            console.log(noti.Msg[0]);
            showWarningAlert(noti.Msg[0]);
        });
    }
}

//Sửa thông tin nhân viên
$('#edit-employee-modal').on('show.bs.modal', function (event) {
    var id = $(event.relatedTarget).parents('tr').data('id');
    $('#edit-employee-id').attr("value", id);
    $.ajax({
        url: "http://api.manhnv.net/api/employees/" + id,
        type: "GET",
        data: "{}",
        dataType: "json",
        success: function (data) {
            $('#edit-employee-code').val(data.EmployeeCode);
            $('#edit-full-name').val(data.FullName);
            $('#edit-date-of-birth').val(changeDatetimeToDateForInput(data.DateOfBirth));
            if (data.Gender != null) $('#edit-gender').val(data.Gender.toString());
            else $('#edit-gender').val("2");
            $('#edit-identity-number').val(checkNullValue(data.IdentityNumber));
            $('#edit-identity-date').val(changeDatetimeToDateForInput(data.IdentityDate));
            $('#edit-identity-place').val(checkNullValue(data.IdentityPlace));
            $('#edit-email').val(checkNullValue(data.Email));
            $('#edit-phone-number').val(checkNullValue(data.PhoneNumber));
            if (data.PositionId != null) $('#edit-position-name').val(data.PositionId.toString());
            else $('#edit-position-name').val("0");
            if (data.DepartmentId != null) $('#edit-department-name').val(data.DepartmentId.toString());
            else $('#edit-department-name').val("0");

            $('#edit-personal-tax-code').val(checkNullValue(data.PersonalTaxCode));
            $('#edit-salary').val(checkNullValue(data.Salary));
            $('#edit-join-date').val(changeDatetimeToDateForInput(data.JoinDate));
            if (data.WorkStatus != null) $('#edit-work-status-name').val(data.WorkStatus.toString());
            else $('#edit-work-status-name').val("5");
        }
    });
});

function editEmployeeInfo() {
    var id = $('#edit-employee-id').val();
    var employee = getEmployeeInEditForm(id);
    console.log(employee);
    if (validateEditForm(employee)) {
        $.ajax({
            url: "http://api.manhnv.net/api/employees/" + id,
            method: "PUT",
            data: JSON.stringify(employee),
            contentType: "application/json"
        }).done(function (response) {
            $('#edit-employee-modal').modal('hide');
            showSuccessAlert("Sửa thông tin thành công");
            loadDataEmployees();
        }).fail(function (response) {

        });
    }
}

//Xóa nhân viên modal
$('#delete-employee-modal').on('show.bs.modal', function (event) {
    // var button = $(event.relatedTarget);
    var id = $(event.relatedTarget).parents('tr').data('id');
    $('#delete-employee-id').attr("value", id);
    console.log(id);
    var modal = $(this);
    $.ajax({
        url: 'http://api.manhnv.net/api/employees/' + id,
        type: 'GET',
        data: "{}",
        dataType: 'json',
        success: function (data) {
            var body = '';
            body += '<dl class="dl-horizontal"><dt>Mã nhân viên</dt ><dd>' + data.EmployeeCode + '</dd><dt>Họ và tên</dt><dd>' + data.FullName + '</dd></dl>';
            modal.find(".modal-body").html(body);
        }
    });
});

$("#delete-employee-btn").on('click', function () {
    var id = $('#delete-employee-id').val();
    console.log(id);
    $.ajax({
        url: 'http://api.manhnv.net/api/employees/' + id,
        type: 'DELETE',
        success: function (response) {
            if (response.status == true) {
                $("#delete-employee-modal").hide();
                showSuccessAlert("Xóa thành công");
                loadDataEmployees();
            }
            else {
                console.log(response.Message);
            }
        },
        error: function (err) {
            console.log(err);
        }
    })
});