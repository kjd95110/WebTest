console.log("Math.PI",Math.PI);
console.log("Math.random()",Math.random());
console.log("Math.floor(3.7)",Math.floor(3.7));// 무조건 내림

var MyMath={
    PI:Math.PI,
    random:function(){
        return Math.random();
    },
    floor:function(val){
        return Math.floor(val);
    }
}



console.log("MyMath.PI",MyMath.PI);
console.log("MyMath.random()",MyMath.random());
console.log("MyMath.floor",MyMath.floor(3.5));

//객체란- 서로 연관된 변수와 메소드를 그룹핑해서 이름을 붙인것..
//일종의 폴더(디렉토리)개념....