var kim={
    name:'kim',
    first:10,
    second:20,
    third:30,
    sum:function(f,s,k){
        return f+s+ k;
    },
    sum2:function(){
        return this.first+this.second + this.third;
    }
}



var lee={
    name:'lee',
    first:50,
    second:30,
    third:70,
    sum:function(f,s,k){
        return f+s+k;
    },
    sum2:function(){
        return this.first+this.second+this.third;
    }
}




console.log(kim.sum(kim.first,kim.second,kim.third));
console.log(kim.sum2());

console.log(lee.sum(lee.first,lee.second,lee.third));
console.log(lee.sum2());

var d1= new Date('2020-02-05');
console.log(d1.getFullYear());
console.log(d1.getMonth());
console.log(d1.getUTCMinutes());
console.log(Date);

function Person(name,first,second,third){
    this.name=name;
    this.first=first;
    this.second=second;
    this.third=third;
    this.sum=function(f,s,k){
        return f+s+ k;
    };
    this.sum2=function(){
        return this.first + this.second + this.third;
    };
}

var kim2=new Person('kim2',10,20,30);
var lee2=new Person('lee2',30,40,50);

// console.log(new Person());
// console.log(kim2);
// console.log(lee2);
console.log(kim2.sum2());