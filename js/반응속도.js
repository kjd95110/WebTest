var screen=document.querySelector('#screen');
var state={

};

console.time('time');   //테스트용이다.
console.timeEnd('time'); //이름인자가 같아야 된다.


var startime=null;
var endtime=null;      
var record=[];
var timeout;
// var starttime=performance.now();  //정밀한 시간을 측정할때 사용한다.
// var endtime2=performance.now();
screen.addEventListener('click', function(){

    endtime=new Date();  //종료시간 기록
   
    console.log((endtime- startime)/1000);
  

if(screen.classList.contains('waiting')){
    console.log('click!');
    screen.classList.remove('waiting');
    screen.classList.add('ready');
    screen.textContent='초록색이 되면 클릭하세요!';
    
    //screen.style.backgroundColor='red';
    //1줄이면 되는데????
    //style이 1개이면 맞을수도있지...해당 클래스의 스타일이 수십개이상이면 어쩔래???ㅋㅋ

    timeout=setTimeout(function(){
        //console.log('시간 지났다.');
        startime=new Date();
        screen.click();
        
        /*
            호출스택??? 자료구조 LIFO (Last In First Out)
            ->주로함수에 사용한다.

            **비동기함수는 이벤트가 발생하는순간 호출stack에 들어갔다가 바로 빠져나간다.**

            재귀적호출에서 문제가 생길수있다.
            보통 1000~10000개정도의 스택을 허용한다.

            function a(){
                setTimeout(function(){
                    a();
                },0);
            }

            위의 예제는 콜스택Exceed(초과)를 해결하는 꼼수
            재귀적함수호출에서 1만번이상 재귀되는 함수에서 꼼수적으로 비동기적으로  사용하여 호출(콜)스택 이터지는 현상을 막을수 있다. 비울수 있다.

            Queue??? First In First Out 구조...

        */


    }, Math.floor(Math.random() * 1000) + 2000); //2000~3000 사이수

}else if(screen.classList.contains('ready')){  //준비상태
//부정-> undefined,0,NaN,null,false,''
console.log('startime-endtime:' ,startime,endtime, (startime-endtime));
    if(!startime){
        clearTimeout(timeout);
        screen.classList.remove('ready');
        screen.classList.add('waiting');
        screen.textContent=' 너무성급하세요 다시 시작하세요!';
    }else{

        screen.classList.remove('ready');
        screen.classList.add('now');
        screen.textContent='클릭하세요!';
    }
    
}else if(screen.classList.contains('now')){  //시작상태
    var endtime=new Date();

    console.log('반응속도', endtime-startime, 'ms')
    if((endtime-startime) < 250 ){
        clearTimeout(timeout);
        screen.classList.remove('now');
        screen.classList.add('waiting');
        screen.textContent=' 너무성급하세요 다시 시작하세요!';
        
    }else{
        record.push(endtime-startime);
        screen.classList.remove('now');
        screen.classList.add('waiting');
        screen.textContent=' 클릭해서 시작하세요!';    

    }
    startime=null; 
    endtime=null;     
    
}
});