class Person{
    constructor(name,first,second){
        console.log('constructor');
        this.name=name;
        this.first=first;
        this.second=second;
    }  

    sum=function(){
        return 'prototype:' +( this.first + this.second );
    };
    
}

class PersonPlus{
    constructor(name,first,second){
      
        this.name=name;
        this.first=first;
        this.second=second;
    }  

    sum=function(){
        return 'prototype:' +( this.first + this.second );
    };

    avg(){
        return (this.first+ this.second)/2;
    }

}

// Person.prototype.sum=function(){
//     return 'prototype:' +( this.first + this.second );
// };


//상속
/* extends 키워드사용

 */
class PersonMyPlus extends Person{

    avg(){
        return (this.first+ this.second)/2;
    }

}


var kim=new Person('kim',10,20);
 kim.sum=function(){
     return 'this:' +( this.first + this.second );
 };
 var kimPlus=new PersonPlus('kimPlus',100,200);

 var kimMyPlus=new PersonMyPlus('kimMyPlus',1000,2000);
var lee=new Person('lee',10,10);
console.log('kim',kim)
console.log('kim',kim.sum());
console.log('lee',lee.sum());

console.log('kimPlusAVG',kimPlus.avg());
console.log('kimMyPlusAVG',kimMyPlus.avg());

