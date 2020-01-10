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

유사품(apply) 있음.

*/


console.log(sum.call(kim,'=> ')); //prefix ->  함수(메소드)의 인자로 들어간다.
console.log(sum.call(lee,': '));
 /* 
 call: 실행할때 함수의 콘텍스트 즉 this의 값을 바꾼다.

 bind:어떤함수의 내부적으로 this의값을  영구적으로 바꾸는 새로운 함수를 만든다.


 */
