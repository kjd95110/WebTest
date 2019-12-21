var body=document.body;
var table=document.createElement('table');

var lines=[];  //줄들
var cells=[]; //칸들
var tern='X';
var result=document.createElement('div');


function ResultCheck(XPos,YPos){

    var isfull=false;
        //가로줄 검사
        if(cells[XPos][0].textContent==tern && 
            cells[XPos][1].textContent==tern &&
            cells[XPos][2].textContent==tern){
            isfull=true;
        }
        //세로줄검사
        if(cells[0][YPos].textContent==tern &&
            cells[1][YPos].textContent==tern &&
            cells[2][YPos].textContent==tern){
            isfull=true;
        }
        
        //대각선
        if(cells[0][0].textContent==tern &&
            cells[1][1].textContent==tern &&
            cells[2][2].textContent==tern ){
            isfull=true;
        }
        //반대대각선검사
        if(cells[0][2].textContent==tern &&
            cells[1][1].textContent==tern &&
            cells[2][0].textContent==tern ){
            isfull=true;
        }

        return isfull;
}

function initialize(draw){

    
    
    if(draw){
        console.log(tern + "무승부");
        result.textContent= tern + '무승부';

    }else{
        console.log(tern + "님의 승리");
        result.textContent= tern + '님의 승리';
    }
    
    
    var time=setTimeout(() => {      
        body.appendChild(result);
        
    }, 1000);  
    
    tern='X';  
   
}


/* 
event.target=> 클릭된아이
event.target.parentNode
*/
 var asyncCallBack = function(event){

if(tern=='O'){ //컴퓨터 턴일때 클릭못하게...
    return;
}

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
        
        
        cells[XPos][YPos].textContent = tern;

        //세칸 다 채워졌나?

        var isfull=ResultCheck(XPos,YPos);
      

        var candycell=[];
        cells.forEach(function(line){
            line.forEach(function(cell){
                candycell.push(cell);
            });

        });

        candycell=candycell.filter(function (cell){
            return !cell.textContent;  //'',0,NaN,undefined,null,false                    
        });

        if(isfull){
           initialize();

        }else if(candycell.length==0){ //칸을 더이상 선택할수 없음
            initialize(true);

        }  else{  //게임이 안끝났으면 턴을 돌린다.
            //tern= (tern=='X')? 'O': 'X';
            if(tern=='X'){tern='O' ;}

            setTimeout(function(){
                console.log('컴퓨터의 턴입니다.');
            
                //filter메소드는 return 이하의 false만 걸러냄.(여기서는 ! 가 있음을 유의한다.)
                // 결국 빈 칸만 candycell에 들어간다는 말...
             
                var choicecell=candycell[Math.floor(Math.random() * candycell.length)];
                choicecell.textContent=tern;
                //컴퓨터가 승리했는지 체크
                var XP=lines.indexOf(choicecell.parentNode);
                var YP=cells[XP].indexOf(choicecell);

                var isfull=ResultCheck(XP,YP);

                if(isfull){
                  initialize(false);
                }

                //턴을 나에게 넘긴다.
                tern='X';
            },1000);          
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
    result.textContent= '';
    return false;
}