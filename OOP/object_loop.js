
var memberArray=['egoing','graphittie','leezhce'];

var i=0;
console.group('array loop');
while(i<memberArray.length){
    console.log(i,memberArray[i]);
    i=i+1;
}

console.groupEnd('array loop');


console.group('array loop');

var memberObject={
    manager:'egoing',
    developer:'graphittie',
    designer:'leezhce',
}

for( var temp in memberObject){
    console.log(temp,memberObject[temp]);

}


console.groupEnd('array loop');