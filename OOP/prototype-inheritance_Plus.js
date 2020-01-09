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