var width = 4;
var height = 3;
var candycolor=['red','red','orange','orange','green','green','yellow','yellow','white','white','pink','pink'];



//var colors=candycolor;     (x)
//var colors= candycolor.slice();
var colors = JSON.parse(JSON.stringify(candycolor));

/* 
    var colors=candycolor; 
    array 값을 할당하면 복사가 아니라 참조관계가 성립된다.
아래 for문의 
     color= color.concat(candycolor.splice(Math.floor(Math.random() * candycolor.length) , 1));
     여기에서 colors의 값도 바뀌게 되는 것이다.
     
     
     **** 참조 관계를 끊는법 *****
     1. var colors= candycolor.slice();

     1.5 Object.assign(obj2,obj);

     2.한개씩 넣어주는 방법(현실적으로 어려운...ㅋ)
     var obj={a:1,b:2}
     var obj2={}
     obj2.a=obj.a;
     obj2.b=obj.b;
     3.      1단계만 복사 나머지는 참조됨
       var obj={a:1,b:2,c:3}
       var obj2={};

         object.keys(obj)이렇게하면 obj의 키(key)만 뽑아낼수 있는데....

       object.keys(obj).forEach(function(key)){
           obj2[key]=obj[key];
       });  -> 단점이있음->


       사실 slice()메소드가 내부적으로 쓰는 방법이다.

       var obj={a:1, b:{c:1 } } 계층구조일때....
       var obj2={};

       object.keys(obj).forEach(function(key)){
           obj2[key]=obj[key];
       });  -> 
       obj2.a = 5; 값을 바꿨다
       obj.a = 1이 나와서 참조관계가 아닌것을 알수있다.
       하지만
       obj2.b.c=8;로 값을 바꿨을때
       obj.b.c 의 값은????? 1이 나와야 되는데....
       obj.b.c의 값이 8로 바뀌는 것을 볼수있는것이다. 
       a는 복사,b는 참조가 되는 경우가 생길수있다.

       이유???

       var obj={a:1, b:{c:1 } } 계층구조일때....
       var obj2={};
       일때
        object.keys(obj).forEach(function(key)){
           obj2[key]=obj[key];
       }); 
       이 forEach문을 풀어보면
       obj2.a = obj.a;
       obj2.b = obj.b;
       되는데 a는 복사 b는 객체형태이므로 참조관계가 됨을 알수있다.

       얕은복사 --> 참조
       깊은복사 --> 복사
       라고 이야기 하는것을 볼수있다.

       functoin copyObj(obj){
           var copy = {};
           if(typeof obj === 'object' && obj !== null){
               for(var attr in obj){
                   if(obj.hasOwnProperty(attr)){
                       copy[attr]=copyObj(obj[attr]);
                   }
               }
           }else{
               copy = obj;
           }
           return copy;
       }

       obj2= copyObj(obj);

       이렇게 하면 참조관계가 확실히 끊어지는것(깊은복사)을 알수있다.
       

       4.  var obj={a:1, b:{ c:1 } } 계층구조일때....
           var obj2={};
           obj2 = JSON.parse(JSON.stringify(obj));

           3번의 복잡하고 약간의문제? 점을 개선한 해결법이다.
           이걸 쓰자....성능이 최악이란다...지랄...아낙...
           prototype에서 쓰면 문제가 생긴다.




       *****  참조관계인지 아닌지 판별하는 방법 ******
       참조관계:
        var candycolor=['red','red','orange','orange','green','green','yellow','yellow','white','white','pink','pink'];
        var colors=candycolor;

        colors===candycolor => true 이면 참조관계



*/
var color=[];
var clickflag=true;
var clickcard=[];
var complitecard=[];
var startTime;


function supple(){

    for(var i=0;candycolor.length > 0;i++){
        color= color.concat(candycolor.splice(Math.floor(Math.random() * candycolor.length) , 1));
    }

}



console.log('color:',color);

function cardSetting(width,height){
    clickflag=false;
    for(var i=0;i < width * height ;i++){
        var card=document.createElement('div');
        card.className='card';
        var cardInner=document.createElement('div');
        cardInner.className='card-inner';
        var cardFront=document.createElement('div');
        cardFront.className='card-front';
        var cardBack = document.createElement('div');
        cardBack.className='card-back';
        cardBack.style.backgroundColor=color[i];
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
     

        (function(c){
            card.addEventListener('click',function(){
                if(clickflag && !complitecard.includes(c)){                    
                
                    c.classList.toggle('flipped');
                    clickcard.push(c);
                    if(clickcard.length==2){
                        var backcard= clickcard[0].querySelector('.card-back').style.backgroundColor;
                        var frontcard=clickcard[1].querySelector('.card-back').style.backgroundColor
                        if(backcard===frontcard){
                            complitecard.push(clickcard[0]);
                            complitecard.push(clickcard[1]);
                            clickcard=[];  
                            if(complitecard.length==(width* height)){
                                var endTime=new Date();
                                var eLapsTime=(endTime-startTime)/1000;
                                setTimeout(() => {

                                    alert('congraturation!! (' + eLapsTime  + ')초 걸렸습니다.' );
                                    document.querySelector('#wrapper').innerHTML='';
                                    candycolor=colors.slice();
                                    complitecard=[];
                                    color=[];
                                    startTime=null;
                                    supple();
                                    cardSetting(width,height);
                                    
                                }, 1000);                                
                            }
                        }else{
                            clickflag=false;
                            setTimeout( function(){
                                clickcard[0].classList.remove('flipped');
                                clickcard[1].classList.remove('flipped');
                                clickcard=[];
                                clickflag=true;                            
                            }, 1000);
                            
                        }
                    }                     
                }
            });
        })(card);
     
        // card.addEventListener('click',function(){
        //     card.classList.toggle('flipped');
        // });
        
        //document.body.appendChild(card);

        document.querySelector('#wrapper').appendChild(card);
    } // end of for  



    document.querySelectorAll('.card').forEach(function(card,index){
        setTimeout(() => {
            card.classList.add('flipped');    
        }, 500 + 100 * index);

        setTimeout(() => {
            document.querySelectorAll('.card').forEach(function(card,index){
                card.classList.remove('flipped');    
            });
            clickflag=true;
            startTime=new Date();
        }, 2500);
        
    });

}
supple();
cardSetting(width , height);