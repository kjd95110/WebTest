var body=document.body;
var table=document.createElement('table');

var lines=[];  //줄들
var cells=[]; //칸들
var tern='X';
var result=document.createElement('div');

/* 
event.target=> 클릭된아이
event.target.parentNode
*/
 var asyncCallBack = function(event){
    console.log(event.target);// 칸 td
    console.log(event.target.parentNode); // 줄 <tr>
    console.log(event.target.parentNode.parentNode);    //테이블 <table>

    // Table을 배열과 연결해두었기 때문에 클릭한셀이 몇줄몇칸인지 가능한것입니다.

    var XPos=lines.indexOf(event.target.parentNode);
    var YPos=cells[XPos].indexOf(event.target);
    console.log('몇줄:',XPos,'몇칸:',YPos);

    if($.trim(cells[XPos][YPos].textContent) != ''){ //칸이 이미 쳐워져 있는가?
    console.log('여기는 빈칸이 아닙니다.재시도해야됨...');
    //cells[XPos][YPos].textContent=tern;

    }else{ //빈칸이면..
        cells[XPos][YPos].textContent=tern;

        //세칸 다 채워졌나?
        var full=false;
        //가로줄 검사
        if(cells[XPos][0].textContent==tern && 
            cells[XPos][1].textContent==tern &&
            cells[XPos][2].textContent==tern){
            full=true;
        }
        //세로줄검사
        if(cells[0][YPos].textContent==tern &&
            cells[1][YPos].textContent==tern &&
            cells[2][YPos].textContent==tern){
            full=true;
        }
        //대각선검사
        if(XPos - YPos==0 ){ //대각선 검사가 필요한경우이면
            if(cells[0][0].textContent==tern &&
                cells[1][1].textContent==tern &&
                cells[2][2].textContent==tern ){
                full=true;
             }
        }

        if( Math.abs(XPos - YPos)==2){  //반대편 대각선 검사
            if(cells[0][2].textContent==tern &&
                cells[1][1].textContent==tern &&
                cells[2][0].textContent==tern ){
                full=true;
            }
        }   

        if(full){
            console.log(tern + "님의 승리");
            result.textContent= tern + '님의 승리';
            body.appendChild(result);
            tern='X';    

        }else{
            tern= (tern=='X')? 'O': 'X';
            console.log("빈칸0");
        }
    }
};
    
    for(var i=1;i<=3;i++){
        var line=document.createElement('tr');
        lines.push(line);
        cells.push([]);
        for(var j=1;j<=3;j++){
            var cell=document.createElement('td');   
            cell.addEventListener('click',asyncCallBack);                       
            cells[i-1].push(cell);
            line.appendChild(cell);
        }
        table.appendChild(line);
    }
    body.appendChild(table);
    console.log('lines:',lines,'Cells:',cells);  

    function Retry(){
        //배열에 대한 반복문 forEach
        console.log('retry');
        cells.forEach(function(line){
            line.forEach(function(cell){
                cell.textContent='';
            });

        })
        return false;
    }