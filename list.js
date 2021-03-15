//Function
function loadDataEmployees() {
    $.ajax({
        url: "http://api.manhnv.net/api/employees",
        method: "GET"
    }).done(function (response) {
        var table = $('#tbody-employees');
        for (var i = 0; i < response.length; i++) {
            var row = $(`<tr>
            <td>${response[i].EmployeeCode}</td>
            <td>${response[i].FullName}</td>
            <td>${genderDetermination(response[i].Gender)}</td>
            <td>${changeDatetimeToDate(response[i].DateOfBirth)}</td>
            <td>${checkNullValue(response[i].PhoneNumber)}</td>
            <td>${checkNullValue(response[i].Email)}</td>
            <td>${checkNullValue(response[i].PositionName)}</td>
            <td>${checkNullValue(response[i].DepartmentName)}</td>
            <td class="text-right">${checkNullValue(response[i].Salary)}</td>
            <td>${checkNullValue(response[i].WorkStatusName)}</td>
            </tr>`);
            row.data("id", response[i].EmployeeId);
            // console.log(row.data());

            table.append(row);
        }
    }).fail(function (res) {

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
    validateEmployeeCode(employee.EmployeeCode);
    validateFullName(employee.FullName);
    validateIdentityNumber(employee.IdentityNumber);
    validateEmail(employee.Email);
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

    // if (!pattern.test(employeeEmail)) {
    //     alert('Email ko hợp lệ');
    //     return false;
    // }​
    return true;
}

//Event
$('#save-employee-btn').click(function () {
    addNewEmployee();
});


//Document
$(document).ready(function () {
    loadDataEmployees();
});