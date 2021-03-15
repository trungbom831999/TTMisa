//Function API
function loadDataEmployees() {
    $.ajax({
        url: "http://api.manhnv.net/api/employees",
        method: "GET"
    }).done(function (response) {
        var table = $('#tbody-employees');
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
        data: {},
        contentType: "application/json",
        success: function (response) {
            console.log(response);
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
        PositionName: $('#position-name').val(),
        DepartmentName: $('#department-name').val(),
        PersonalTaxCode: $('#personal-tax-code').val(),
        Salary: $('#salary').val(),
        JoinDate: $('#join-date').val(),
        WorkStatusName: $('#work-status-name').val()
    }
    return employee;
}

function getEmployeeInEditForm() {
    var employee = {
        EmployeeCode: $('#edit-employee-code').val(),
        FullName: $('#edit-full-name').val(),
        DateOfBirth: $('#edit-date-of-birth').val(),
        Gender: $('#edit-gender').val(),
        IdentityNumber: $('#edit-identity-number').val(),
        IdentityDate: $('#edit-identity-date').val(),
        IdentityPlace: $('#edit-identity-place').val(),
        Email: $('#edit-email').val(),
        PhoneNumber: $('#edit-phone-number').val(),
        PositionName: $('#edit-position-name').val(),
        DepartmentName: $('#edit-department-name').val(),
        PersonalTaxCode: $('#edit-personal-tax-code').val(),
        Salary: $('#edit-salary').val(),
        JoinDate: $('#edit-join-date').val(),
        WorkStatusName: $('#edit-work-status-name').val()
    }
    return employee;
}

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

function checkNullValue(value) {
    if (value) {
        return value;
    } else {
        return '';
    }
}


//function Validate
function validateAddForm(employee) {
    if (!validateEmployeeCode(employee.EmployeeCode)) return false;
    if (!validateFullName(employee.FullName)) return false;
    if (!validateIdentityNumber(employee.IdentityNumber)) return false;
    if (!validateEmail(employee.Email)) return false;
    if (!validatePhoneNumber(employee.PhoneNumber)) return false;
    return true;
}

function validateEmployeeCode(employeeCode) {
    if (employeeCode == null || employeeCode == '') {
        alert('Mã trống');
        $('#employee-code').focus();
        return false;
    }
    return true;
}

function validateFullName(employeeFullName) {
    if (employeeFullName == null || employeeFullName == '') {
        alert('Họ tên trống');
        $('#full-name').focus();
        return false;
    }
    return true;
}

function validateIdentityNumber(employeeIdentityNumber) {
    if (employeeIdentityNumber == null || employeeIdentityNumber == '') {
        alert('Vui lòng điền số CMTND/ Căn cước');
        $('#identity-number').focus();
        return false;
    }
    return true;
}

function validateEmail(employeeEmail) {
    var pattern = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (employeeEmail == null || employeeEmail == "") {
        alert("Email không được trống");
        $('#email').focus();
        return false;
    }
    else if (!pattern.test(employeeEmail)) {
        alert('Email ko hợp lệ');
        $('#email').focus();
        return false;
    }
    return true;
}

function validatePhoneNumber(employeePhone) {
    if (employeePhone == null || employeePhone == "") {
        alert("Số điện thoại không được trống");
        $('#phone-number').focus();
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
    alert("Số điện thoại không hợp lệ");
    $('#phone-number').focus();
    return false;
}

//Event
$('#add-employee-btn').click(function () {
    addNewEmployee();
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

            // Hide it
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
            alert("Thêm thành công");
            loadDataEmployees();
        }).fail(function (response) {

        });
    }
}

//Sửa thông tin nhân viên
$('#edit-employee-modal').on('show.bs.modal', function (event) {
    var id = $(event.relatedTarget).parents('tr').data('id');
    $('#edit-employee-id').attr("value", id);
    var employee = getEmployeeInfo(id);
    $('#edit-employee-code').val(employee.EmployeeCode);
    $('#edit-full-name').val(employee.FullName);
    $('#edit-date-of-birth').val(employee.DateOfBirth);
    $('#edit-gender').val(employee.Gender);
    $('#edit-identity-number').val(employee.IdentityNumber);
    $('#edit-identity-date').val(employee.IdentityDate);
    $('#edit-identity-place').val(employee.IdentityPlace);
    $('#edit-email').val(employee.Email);
    $('#edit-phone-number').val(employee.PhoneNumber);
    $('#edit-position-name').val(employee.PositionName);
    $('#edit-department-name').val(employee.DepartmentName);
    $('#edit-personal-tax-code').val(employee.PersonalTaxCode);
    $('#edit-salary').val(employee.Salary);
    $('#edit-join-date').val(employee.JoinDate);
    $('#edit-work-status-name').val(employee.WorkStatusName);
    
});

//Xóa nhân viên modal
$('#delete-employee-modal').on('show.bs.modal', function (event) {
    // var button = $(event.relatedTarget);
    var id = $(event.relatedTarget).parents('tr').data('id');
    $('#id-employee-delete').attr("value", id);
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
    var id = $('#id-employee-delete').val();
    console.log(id);
    $.ajax({
        url: 'http://api.manhnv.net/api/employees/' + id,
        type: 'DELETE',
        success: function (response) {
            if (response.status == true) {
                $("#delete-employee-modal").hide();
                alert("Xóa thành công");
                loadDataEmployees();
            }
            else {
                alert(response.Message);
            }
        },
        error: function (err) {
            console.log(err);
        }
    })
});