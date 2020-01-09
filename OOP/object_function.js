var kim={name:'kim',first:10,second:20}
var lee={name:'lee',first:30,second:50}
//lee.__proto__=kim ; //부모자식관계가 됨...그런데...표준이 아님.

function sum(prefix){
    return prefix + (this.first+this.second);
}



/* 
sum이라는 객체를 실행함...
sum() 와 같음.
쓰는 이유? 
javascript에서는 함수도 객체다..

함수도 객체이므로 sum.call(kim)을 호출하게되면
sum 객체의 this = kim 이된다.

*/


console.log(sum.call(kim,'=> '));
console.log(sum.call(lee,': '));
