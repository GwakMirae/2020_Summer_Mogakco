let bt_addStudent = document.getElementById("addStudentBt");
let bt_deleteStudent = document.getElementById("deleteStudentBt");
let table1_content = document.getElementsByClassName("content");
let td_grade = document.getElementsByClassName("grade");
let tbody_tbody1 = document.getElementById("tbody1");

let checkedList = new Array();
let chk_check = document.getElementsByClassName("chk");
let totNum = calTot(table1_content); 
let changeCell;

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
//var는 바뀌는 변수 let은 고정변수
//무명함수 일회용 함수
span.onclick = function(){
    modal.style.display = "none";
}
window.onclick = function(event){
    if(event.target == modal){
        modal.style.display = "none";
    }

    switch(event.target.className){
        case 'stdname' :
            modal.style.display = "block";
            document.getElementById("cellName").innerHTML = "이름을 변경하세요!";
            changeCell = event.target;
            document.getElementById("changeinner").value = event.target.innerHTML;
            break;
        case 'number' :
            modal.style.display = "block";
            document.getElementById("cellName").innerHTML = "학번을 변경하세요!";
            changeCell = event.target;
            document.getElementById("changeinner").value = event.target.innerHTML;
            break;
        case 'age' :
            modal.style.display = "block";
            document.getElementById("cellName").innerHTML = "나이를 변경하세요!";
            changeCell = event.target;
            document.getElementById("changeinner").value = event.target.innerHTML;
            break;
        case 'grade' :
            modal.style.display = "block";
            document.getElementById("cellName").innerHTML = "학점을 변경하세요!";
            changeCell = event.target;
            document.getElementById("changeinner").value = event.target.innerHTML;
            break;    
    }
    if(event.target == span){
        changeCell.innerHTML = document.getElementById('changeinner').value;
    }
}
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
        for(let cursor=0; cursor<element.length ; cursor++){
            switch(element[cursor].innerHTML.trim()){
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
        let result = num/(element.length-non).toFixed(2);
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
    cell2.innerHTML = 11;
    cell3.innerHTML = 201902650
    cell4.innerHTML = 21 
    cell5.className += "grade";
    cell5.innerHTML = "A+";

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