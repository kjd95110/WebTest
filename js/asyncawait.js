async function myAsyncFun(){
    throw 'AsyncError';
    return 'done!';    
}

function myPromiseFun(){
    return new Promise((resolve,reject)=>{
      //  resolve('done!');
        reject('PromiseError');
    });
}

//async 함수의 리턴은 Promise함수의 resolve에 해당한다.
/* const result=myAsyncFun();
 console.log(result);

 const result2=myPromiseFun();
 console.log(result2);
 */


/* 

 const result = myAsyncFun().catch(e => {
    console.error(e);
 });

 const result2=myPromiseFun().catch(e => {
    console.error(e);
 });

 */

 /*
 async 함수 내부에서는 await을 사용할수 있다.
 await? Promise를 기다리는녀석
 Promise에서 완전히 resolve되거나 reject될때까지
 기다렸다가 


 */

//  function wait(sec){
//      return new Promise(resolve =>{
//         setTimeout(()=>{
//             resolve('done');
//         },sec * 1000);
//      });
//  }


//  async function myAsyncFun(){
//      console.log(new Date());
//     await  wait(3);
//      console.log(new Date());
//  }


//  const result= myAsyncFun().catch(x => {});

 // 이상황을 reject하는 상황으로 변경한다.면
 function wait(sec){
    return new Promise((resolve,reject) =>{
       setTimeout(()=>{
           //resolve('done');
           reject('wait Error');
       },sec * 1000);
    });
}


async function myAsyncFun(){
    console.log(new Date());
    try{
        const result= await  wait(3);
    }catch(e){
        console.error(e);
    }
    // const result=await wait(3).catch(e =>{
    //     console.error(e);
    // });
    console.log(result);
    console.log(new Date());
}


const result= myAsyncFun().catch(x => {});