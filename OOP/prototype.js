
function Person(name,first,second,third){
    this.name=name;
    this.first=first;
    this.second=second;
    this.third=third;   
}

//엄청나게 많은 객체중에서 kim2의 sum2()메소드를 공통적으로  동작,사용 시키고 싶다.
//성능,메모리 절약기법
Person.prototype.sum2=function(){
    return 'prototype:' +( this.first + this.second + this.third);
};

var kim2=new Person('kim2',10,20,30);
// kim2.sum2 = function(){
//     return 'modified:' + (this.first+this.second);
// }
var lee2=new Person('lee2',30,40,50);

// lee2.sum2 = function(){
//     return 'modified:' + (this.first+this.second);
// }

console.log("kim2.sum2()",kim2.sum2());
console.log("lee2.sum2()",lee2.sum2());

//엄청나게 많은 객체중에서 kim2의 sum2()메소드에만 다르게 동작시키고 싶다.

kim2.sum2=function(){
    return 'this:' +( this.first + this.second + this.third);
};

console.log("kim2.sum2()",kim2.sum2());
console.log("lee2.sum2()",lee2.sum2());



