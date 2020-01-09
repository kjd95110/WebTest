var superObj={
    superVal:'super'
}

var subObj=Object.create(superObj); //superObj를 부모로 하는 subObj....
//표준적인 방법이라고 합니다.

subObj.subVal='sub';
debugger;
console.log('subObj.subVal=>',subObj.subVal)
console.log('subObj.superVal=>',subObj.superVal)
subObj.superVal='sub';
console.log('superObj.superVal=>',superObj.superVal)

const kim = {
    name:'kim',
    first:10,second:20,
    sum:function(){
        return this.first+ this.second;
    }
}

// const lee = {
//     name:'lee',
//     first:10,second:15,
//     avg:function(){
//         return(this.first+this.second)/2;
//     }    
// }

//lee.__proto__=kim;

const lee=Object.create(kim);// 표준방법.
lee.name='lee';
lee.first=15;
lee.second=25;
lee.avg=function(){
    return(this.first+this.second)/2;
}

console.log(kim.sum());
console.log(lee.avg());