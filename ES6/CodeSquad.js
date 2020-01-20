
export default class CodeSquad{
    constructor(props){
        this.lectures=['java','iOS'];
    }
    getLectures(){
        return this.lectures;
    }

    getCurrentHour = () =>{
        return(new Date).getHours();
    }
    

    getTime = () => {
        return Date.now();
    }
}