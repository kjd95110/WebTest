function delay(sec, callback){
    setTimeout(() => {
        callback(new Date().toISOString());
    }, sec *1000);
}

/*
delay(1, (result)=>{

    console.log(1,result);
    delay(1, (result)=>{
       // console.log(2,result);
        
        delay(1, (result)=>{
            console.log(3,result);

        });

        console.log(2,result); //이코드가 위에 있으나 밑에 있으나 같은 결과가 나옴..

    });

});

*/

//콜백 지옥....발생

//여기서 promise 개념 나온다.

// delay(1,(result)=>{
//     console.log(1,result);
// });

function delayP(sec){
    return new Promise (( resolve,rejct)=>{
        setTimeout(()=>{
            resolve(new Date().toISOString());
        },sec * 1000);
    });
}

delayP(1).then((result)=>{
    console.log(1,result);
    return delayP(1);
}).then((result)=>{
    console.log(2,result);
    return delayP(1);
}).then((result)=>{
    console.log(3,result);
    return 'wow';
}).then((result)=>{
    console.log(result); // result = 'wow'
})


// console.log('start',new Date().toISOString());

// delay(1,(result) =>{
// console.log(1,result);
// document.querySelector('#root').textContent=result;
// });

// console.log('hello');


