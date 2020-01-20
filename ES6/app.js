import  CodeSquad from './CodeSquad.js';
import _ from './utility.js';
const root=document.querySelector('#root');
root.innerHTML=`<p>Hello World66! </p>`;
_.log(`my first test data33333`);

//log(getTime());


const cs= new CodeSquad();
_.log(`current hour is ${cs.getCurrentHour()}`);
_.log(`lectures of Codesquad are22 ${cs.getLectures()}`);