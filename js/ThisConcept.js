var someone={
    name:'kimjoongdae',
    WhoAmI:function(){
        console.log(this);
    }
};

someone.WhoAmI(); //someone이 호출   점(.) 이 중요.


var myWhoAmI= someone.WhoAmI;

myWhoAmI();//브라우저가 실행?


// [호출한놈(객체) === this  ]가된다. 누가 호출했는냐.....그누가가 this 이다.

var btn=document.getElementById('btn');
var bindedWhoAmI=myWhoAmI.bind(someone);
// btn.addEventListener('click',function(){
//    someone.WhoAmI();
// });

//btn.addEventListener('click',someone.WhoAmI);
//btn.addEventListener('click',myWhoAmI);
btn.addEventListener('click',bindedWhoAmI);

/* 

*/


