var superObj={
    superVal:'super'
}

var subObj={
    subVal:'sub'
}

subObj.__proto__=superObj;  //표준이 아니래....


console.log('subObj.subVal=>',subObj.subVal)
console.log('subObj.superVal=>',subObj.superVal)
subObj.superVal='sub';
console.log('superObj.superVal=>',superObj.superVal)