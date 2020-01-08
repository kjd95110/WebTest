var kim={name:'kim',first:10,second:20}
var lee={name:'lee',first:30,second:50}

function sum(prefix){
    return prefix + (this.first+this.second);
}


console.log(sum.call(kim,'=> '));
console.log(sum.call(lee,': '));

var kimSum=sum.bind(kim,'->');
console.log('kimSum()',kimSum());
