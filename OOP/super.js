class Person{
    constructor(name,first,second){       
        this.name=name;
        this.first=first;
        this.second=second;
    }  

    sum(){
        return  ( this.first + this.second );
    };
    
}

/*

    super키워드사용
    super키워드 사용전에...보면

    상속키워드를 써서 코딩한 의미가 전혀없게 되어있다...
    이럴때 super키워드를 사용한다.면....
    부모가 갖고있는 기능을 사용하면서

 */
class PersonPlus extends Person{

    constructor(name,first,second,third){
        
        // this.name=name;
        // this.first=first;
        // this.second=second;
        
        super(name,first,second); //부모클래스의 생성자가 호출이 되고
        this.third=third;
        
        //생성자안에서 속성이 정의되기때문에.자식은 this.third=third; 만 하면된다.
       
    }
    
    sum(){
        return  parseInt(super.sum(),10) + parseInt(this.third,10) ;
    };
    

    avg(){
        return (this.first+ this.second + this.third) / 3;
    }

}

var kimPlus=new PersonPlus('kimPlus',1000,2000,3000);
console.log('kimPlusAVG',kimPlus.sum());
console.log('kimPlusAVG',kimPlus.avg());

