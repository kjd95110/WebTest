function Person(name,first,second){
    this.name=name;
    this.first=first;
    this.second=second;
}

Person.prototype.sum=function(){
    return  this.first + this.second ;
};

function PersonPlus(name,first,second,third) {   
    Person.call(this,name,first,second); //super(name,first,second) 역할을 한다. 부모를 호출.
    this.third=third;    
}

PersonPlus.prototype.avg=function(){   
    return (this.first + this.second + this.third)/3;  
}

PersonPlus.prototype.__proto__ = Person.prototype;  //비표준
// PersonPlus.prototype=Object.create(Person.prototype);
// PersonPlus.prototype.constructor=PersonPlus;




 var kimPlus=new PersonPlus('kim',100,200,300); 
  
 console.log('kimSUM',kimPlus.sum());
 console.log('kimAVG',kimPlus.avg());
 console.log('kim.Constructor',kimPlus.constructor);
 


