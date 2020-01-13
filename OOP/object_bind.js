var kim={name:'kim',first:10,second:20}
var lee={name:'lee',first:30,second:50}

function sum(prefix){
    return prefix + (this.first+this.second);
}


console.log(sum.call(kim,'=> '));
console.log(sum.call(lee,': '));

var kimSum=sum.bind(kim,'->');
console.log('kimSum()',kimSum());
 /* 
 call: 실행할때 함수의 콘텍스트 즉 this의 값을 바꾼다.

 bind:어떤함수의 내부적으로 this의값을  영구적으로 바꾸는 새로운 함수를 만든다.


 */
