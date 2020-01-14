console.log('안녕하세요');
console.log('숫자입니다.%d',10);
console.log('문자열입니다.%s','안녕호호');
var person={
    name:'소녀시대',
    age:20
};

console.log('자바스크립트 객체입니다.%j',person);
console.dir(person);
var result=0;
console.time('duration_sum');


for(var i=1;i<=1000000;i++){
    result+=i;
}

console.timeEnd('duration_sum');
console.log('1부터 1000000까지 더한 결과물:%d',result);

console.log('파일이름:%s',__filename);
console.log('패스:%s',__dirname);

