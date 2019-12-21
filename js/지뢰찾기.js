/* 
e.target -> 실제이벤트가 발생하는 그녀석
e.currentTarget ->이벤트리스너가 달린녀석
차이점?


*/
var dataset= [];
var breakFlag=false;
var openCell=0;
var tbody= document.querySelector('#table tbody');

var code={
    openCell:-1,
    question:-2,
    flag:-3,
    flagbomb:-4,
    questionbomb:-5,
    bomb:1,
    general:0,
}
document.querySelector('#exec').addEventListener('click',function(){
    //내부초기화
    tbody.innerHTML='';
    breakFlag=false;
    openCell=0;
    document.querySelector('#result').textContent='';
    var hor= parseInt(document.querySelector("#hor").value,10);
    var ver= parseInt(document.querySelector("#ver").value,10);
    var mine = parseInt(document.querySelector("#mine").value,10);
    //console.log(hor, ver,mine);


    //지뢰위치 뽑기
    var candy=Array(hor * ver)
    .fill() //NaN fill(undefind)
    .map(function(element,index){
        return index; //0 ~ 99
    });

    console.log(candy);

    var supple=[];

    //while(candy.length > 80){ //버그의 온상
        while(candy.length > ((hor * ver) - mine) ){
        var moveValue=candy.splice(Math.floor(Math.random() * candy.length),1)[0];
        supple.push(moveValue);
    }

    console.log(supple);
    //지뢰 테이블 만들기
    for (var i=0;i<ver;i++){
        var tr=document.createElement('tr');
        var arr=[];
        dataset.push(arr);
        for(var j=0;j<hor;j++){
            //arr.push(1);
            arr.push(0);
             var td=document.createElement('td');
             //비동기는 나중에 실행되고 스코프도 틀리기 때문에 여기서 td에 대한 이벤트리스트를 만들어준다.
             td.addEventListener('contextmenu',function(e){  //오른쪽마우스 클릭
                e.preventDefault();

                if( breakFlag){
                    return;
                }

                var parentTR = e.currentTarget.parentNode;
                var parentTBody = e.currentTarget.parentNode.parentNode;
                //var cell= Array.prototype.indexOf.call(parentTR.children,td); //클로저문제발생
                var cell= Array.prototype.indexOf.call(parentTR.children,e.currentTarget);
                var line=Array.prototype.indexOf.call(parentTBody.children,parentTR);
                
                console.log(parentTR,parentTBody,e.currentTarget,cell,line);   


                if(e.currentTarget.textContent==='' || e.currentTarget.textContent==='X'){
                    e.currentTarget.textContent='!';
                    e.currentTarget.classList.remove('question');
                    e.currentTarget.classList.add('flag');

                    if(dataset[line][cell]==='X'){
                        dataset[line][cell]='-X';
                    }else{
                        dataset[line][cell]=-1;
                    }

                }else if(e.currentTarget.textContent==='!'){
                    e.currentTarget.textContent='?';
                    e.currentTarget.classList.add('question');

                    if(dataset[line][cell]==='X'){
                        dataset[line][cell]='-X';
                    }else{
                        dataset[line][cell]=-1;
                    }

                    
                }else if(e.currentTarget.textContent==='?'){
                    e.currentTarget.classList.remove('flag');
                    e.currentTarget.classList.add('question');
                    
                    e.currentTarget.textContent='';
                    if(dataset[line][cell] !== 'X' && dataset[line][cell] !== '-X'){
                        e.currentTarget.textContent ='';
                    }else{
                        e.currentTarget.textContent ='X';
                    }
                  
                    // if(dataset[line][cell]==='1'){
                    //     e.currentTarget.textContent='';
                    // }else if(dataset[line][cell]==='X'){
                    //     e.currentTarget.textContent='X';
                    // }
                }
                
               
                // var cell=parentTR.children.indexOf(td);
                // children이 배열이 아니라서 indexOf를 사용할수없음.
                // var line=parentTBody.children.indexOf(tr);
                // indexOf를 쓰고 싶은데 강제로라도 적용시킬때
                //Array.prototype.indexOf.call
                
                //console.log('오른쪽클릭');
             });

             td.addEventListener('click', function(e){                //왼쪽마우스 클릭
                //클릭했을때 주변 지뢰갯수
                if( breakFlag){
                    return;
                }              

                var parentTR = e.currentTarget.parentNode;
                var parentTBody = e.currentTarget.parentNode.parentNode;
                //var cell= Array.prototype.indexOf.call(parentTR.children,td); //클로저문제발생
                var cell= Array.prototype.indexOf.call(parentTR.children,e.currentTarget);
                var line=Array.prototype.indexOf.call(parentTBody.children,parentTR);

                if(dataset[line][cell]===1 || dataset[line][cell] === -1 || dataset[line][cell] === '-X'){
                    return;
                }              

                e.currentTarget.classList.add('opened');  //바닐라
                //$(this).addClass('opened'); in jQuery

               
                openCell++;
                if(dataset[line][cell] ==='X'){
                    e.currentTarget.textContent='꽝';
                    breakFlag=true;
                    document.querySelector('#result').textContent='실패ㅠㅠ';


                }else{ //지뢰가 아닌경우


                    dataset[line][cell] = 1;



                    var side=   [                       
                            dataset[line][cell-1],                dataset[line][cell+1]                       
                        ];
                    if(dataset[line-1]){
                        side=side.concat( dataset[line-1][cell-1], dataset[line-1][cell],dataset[line-1][cell+1]);
                    }
                    if(dataset[line+1]){
                        side=side.concat( dataset[line+1][cell-1],dataset[line+1][cell],dataset[line+1][cell+1]);
                    }

                    //배열 벽을 뚫고 나가지않게 line-1 cell-1 이부분을 수정해야한다??
                        var sideBombCnt = side.filter(function(v){
                      return  v==='X';

                    }).length;

                    e.currentTarget.textContent=sideBombCnt;

                    //주변지뢰개수가 0이면

                    //거짓인값:false, '', 0 ,null,NaN,undefined 뒤에걸 쓴다.
                    e.currentTarget.textContent = sideBombCnt || '';
                    dataset[line][cell]=1;

                    if(sideBombCnt===0){
                        //주변 8칸 동시 오픈(재귀함수 호출-스택오버플로우 조심)
                        console.log('주변을 열어요');

                        var aroundCell=[];
                        if(tbody.children[line-1]){
                            aroundCell=aroundCell.concat([
                                tbody.children[line-1].children[cell -1],
                                tbody.children[line-1].children[cell],
                                tbody.children[line-1].children[cell + 1],
                            ]);                            
                        }
                        aroundCell=aroundCell.concat([
                            tbody.children[line].children[cell - 1],
                            tbody.children[line].children[cell + 1],                            
                        ]);

                        if(tbody.children[line+1]){
                            aroundCell=aroundCell.concat([
                                tbody.children[line+1].children[cell -1],
                                tbody.children[line+1].children[cell],
                                tbody.children[line+1].children[cell + 1],                       
                            ]);
                        }
                        //!!v undefined 제거 
                        aroundCell.filter(function(v){
                            return !!v;
                        }).forEach(function(sideCell){

                            var parentTR = sideCell.parentNode;
                            var parentTBody = sideCell.parentNode.parentNode;
                            //var cell= Array.prototype.indexOf.call(parentTR.children,td); //클로저문제발생
                            var sideCellCell= Array.prototype.indexOf.call(parentTR.children,sideCell);
                            var sideCellLine=Array.prototype.indexOf.call(parentTBody.children,parentTR);

                            if(dataset[sideCellLine][sideCellCell] != 1){
                                sideCell.click();
                            }                         
                        });
                    }                   
                }

                if(openCell=== hor * ver - mine){
                    breakFlag=true;
                    document.querySelector('#result').textContent='승리!!!!!!!!!!!!!';
                }
                    
             });
             tr.appendChild(td);
             //td.textContent=1;
        }
        tbody.appendChild(tr)

    }
    //console.log(dataset);
    //지뢰심기
    for(var k=0;k<supple.length;k++){ //예 60
        var height=Math.floor(supple[k]/ ver); //예 7-> 6
        var width=supple[k] % ver; //예 9 -> 8
        console.log(height,width);
        tbody.children[height].children[width].textContent = 'X';
        dataset[height][width]='X';
    }

    console.log(dataset);
    // tbody.querySelector('td').forEach(function(td){
    //     td.addEventListener('contextmenu'), function(e){
    //         e.preventDefault();
    //         console.log('오른쪽클릭');
    //     }
    // })        

    // });

});


tbody.addEventListener('contextmenu', function(e){
    console.log('currentTarget: ' , e.currentTarget);
    console.log('Target ' , e.target);
});