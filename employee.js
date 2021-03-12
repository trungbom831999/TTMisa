var employees = []; //mảng chứa thông tin nhân viên

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        employees = JSON.parse(this.response);
        loadDataEmployeesToTable(employees);
    }
};
xhttp.open("GET", "http://api.manhnv.net/api/employees", true);
xhttp.send();

function loadDataEmployeesToTable(data){
    var table = $('#tbody-employees');
    for(let i=0; i<data.length; i++){
        let row = `<tr>
        <td>${data[i].EmployeeCode}</td>
        <td>${data[i].FullName}</td>
        <td>${genderDetermination(data[i].Gender)}</td>
        <td>${checkNullValue(data[i].DateOfBirth)}</td>
        <td>${checkNullValue(data[i].PhoneNumber)}</td>
        <td>${checkNullValue(data[i].Email)}</td>
        <td>${checkNullValue(data[i].PositionName)}</td>
        <td>${checkNullValue(data[i].DepartmentName)}</td>
        <td class="text-right">${checkNullValue(data[i].Salary)}</td>
        <td>${checkNullValue(data[i].WorkStatusName)}</td>
    </tr>`;
     
    
    table.append(row);
    }
}

function genderDetermination(number){
    var gender;
        if(number == 0){
            gender = "Nữ";
        }
        else if(number == 1){
            gender = "Nam";
        }
        else{
            gender = "";
        }
    return gender;
} 

function checkNullValue(value){
    if(value){
        return value;
    }
    else{
        return '';
    }
}
