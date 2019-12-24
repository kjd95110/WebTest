var width = 4;
var height = 3;
var candycolor=['red','red','orange','orange','green','green','yellow','yellow','white','white','pink','pink'];



//var colors=candycolor;     (x)
//var colors= candycolor.slice();
var colors = JSON.parse(JSON.stringify(candycolor));

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