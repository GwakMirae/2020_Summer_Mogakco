let bt_addStudent = document.getElementById("addStudentBt");
let bt_deleteStudent = document.getElementById("deleteStudentBt");
let table1_content = document.getElementsByClassName("content");
let td_grade = document.getElementsByClassName("grade");
let tbody_tbody1 = document.getElementById("tbody1");

let checkedList = new Array();
let chk_check = document.getElementsByClassName("chk");
let totNum = calTot(table1_content); 

//무명함수 일회용 함수
window.onload = function(){
    //html파일 로드 후 무언가를 해주세요
    //이 code는 html load 이후 실행됩니다.
    setTot();
    setAvgGrade();

    bt_addStudent.addEventListener("click", add_row);
    bt_deleteStudent.addEventListener("click", delete_handler);

    for(let i=0; i<chk_check.length; i++){
        chk_check[i].addEventListener("click", getCheckd);
    }
}

function setAvgGrade(){
    if(totNum){
        document.getElementById("avgGrade").innerHTML = calAvg(td_grade);
    }
}

function setTot(){
    totNum = calTot(table1_content);
    document.getElementById("numberOfStudent").innerHTML = totNum;
}
function calTot(element){
    if(!element){
        return 0;
    }
    else{
        return element.length;
    }
}
function calAvg(element){
    if(!element){
        return 0;
    }
    else{
        let num = 0;
        let non = 0;
        for(let cursor=1; cursor<element.length ; cursor++){
            let a = element[cursor].innerHTML.trim();
            console.log(a);
            switch(a){
                case 'A+': num+=4.5;
                    break;
                case 'A': num+=4;
                    break;
                case 'B+': num+=3.5;
                    break;
                case 'B': num+=3;
                    break;
                case 'C+': num+=2.5;
                    break;
                case 'C': num+=2;
                    break;
                case 'D+': num+=1.5;
                    break;
                case'D': num+=1;
                    break;
                case  'F' : num+=0;
                    break;
                default : non++;
                    break;
            }
        }
        let result = num/(element.length-1-non);
        result = result.toFixed(2);
        return result;
    }
}
function getCheckd(){
    let arr = new Array();
    for(let i=0; i<chk_check.length; i++){
        if(chk_check[i].checked == true){
            arr.push(i);
        }
    }
    checkedList = arr;
    //console.log(checkedList); 체크리스트 확인
}

function add_row(){
    var name = document.getElementById("input1").value;
    var yob = document.getElementById("input2").value;
    var age = document.getElementById("input3").value;
    var gra = document.getElementById("input4").value;
    var exp = document.getElementById("input5").value;
    if(!name || !age || !yob || !gra ){
        alert("필수 입력 항목을 채우세요!!");
        return;
    }
    let row = tbody_tbody1.insertRow(tbody_tbody1.rows.length);
    row.className += "content";

    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    let cell6 = row.insertCell(5);

    let checkbox = document.createElement("input");
    checkbox.className = "chk";
    checkbox.type = "checkbox";

    cell1.appendChild(checkbox);
    cell2.innerHTML = name;
    cell3.innerHTML = yob;
    cell4.innerHTML = age;
    cell5.innerHTML = gra;
    cell6.innerHTML = exp;
    cell5.className += "grade";
    // cell2.innerHTML = 11;
    // cell3.innerHTML = 201902650
    // cell4.innerHTML = 21 
    // cell5.className += "grade";
    // cell5.innerHTML = "A+";

    setTot();
    setAvgGrade();
    checkbox.addEventListener("click", getCheckd);
}
function delete_handler(){
    if(tbody_tbody1.rows.length < 1){
        alert("삭제할 내용이 없습니다!");
        return;
    }
    if(checkedList.length){
        delete_checkedRows();
    }
    else{
        delete_row();
    }
}
function delete_row(){
    tbody_tbody1.deleteRow(tbody_tbody1.rows.length-1);//내장함수
    setTot();
    setAvgGrade();
}
function delete_checkedRows(){
    while(checkedList.length!=0){
        tbody_tbody1.deleteRow(checkedList.pop());
    }
    setTot();
    setAvgGrade();
}