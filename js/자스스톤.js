var rival = {
    Hero: document.getElementById('rival-hero'),
    Deck: document.getElementById('rival-deck'),
    Field: document.getElementById('rival-cards'),
    Cost: document.getElementById('rival-cost'),
    DeckData: [],
    HerodDta: [],
    FieldData: [],
    ChoiceCard: null,
    ChoiceData: null,
  };
  
  var me = {
    Hero: document.getElementById('my-hero'),
    Deck: document.getElementById('my-deck'),
    Field: document.getElementById('my-cards'),
    Cost: document.getElementById('my-cost'),
    DeckData: [],
    HerodDta: [],
    FieldData: [],
    ChoiceCard: null,
    ChoiceData: null,
  };
  
  var ternBtn = document.getElementById('turn-btn');
  var tern = true; // true면 내턴, false면 니턴
  
  function DecktoField(Data, MyTern) {
    var CObject = MyTern ? me : rival; // 조건 ? 참 : 거짓;
    var CurCost = Number(CObject.Cost.textContent);
    if (CurCost < Data.cost) {
      return 'end';
    }
    var idx = CObject.DeckData.indexOf(Data);
    CObject.DeckData.splice(idx, 1);
    CObject.FieldData.push(Data);
    FieldDraw_Repeat(CObject);
    DeckDraw_Repeat(CObject);
    Data.field = true;
    CObject.Cost.textContent = CurCost - Data.cost;
  }
  
  function FieldDraw_Repeat(CObject) {
    CObject.Field.innerHTML = '';
    CObject.FieldData.forEach(function(data) {
      CardDomLink(data, CObject.Field);
    });
  }
  function DeckDraw_Repeat(CObject) {
    CObject.Deck.innerHTML = '';
    CObject.DeckData.forEach(function(data) {
      CardDomLink(data, CObject.Deck);
    });
  }
  function HeroDraw_Repeat(CObject) {
    CObject.Hero.innerHTML = '';
    CardDomLink(CObject.HeroData, CObject.Hero, true);
  }
  
  function ScreenDraw_Repeat(myScreen) {
    var CObject = myScreen ? me : rival; // 조건 ? 참 : 거짓;
    FieldDraw_Repeat(CObject);
    DeckDraw_Repeat(CObject);
    HeroDraw_Repeat(CObject);
  }
  
  function TernActionRun(Card, Data, MyTern) {
    // 턴이 끝난 카드면 아무일도 일어나지 않음
    var myArmy = MyTern ? me : rival;
    var rivalArmy = MyTern ? rival : me;
    if (Card.classList.contains('card-turnover')) {
      return;
    }
    // 적군 카드면서 아군 카드가 선택되어 있고, 또 그게 턴이 끝난 카드가 아니면 공격
    var rivalCard = MyTern ? !Data.mine : Data.mine;
    if (rivalCard && myArmy.ChoiceCard) {
      Data.hp = Data.hp - myArmy.ChoiceData.att;
      if (Data.hp <= 0) { // 카드가 죽었을 때
        var Index = rivalArmy.FieldData.indexOf(Data);
        if (Index > -1 ) { // 쫄병이 죽었을 때
          rivalArmy.FieldData.splice(Index, 1);
        } else { // 영웅이 죽었을 때
          alert('승리하셨습니다!');
          initiallize();
        }
      }
      ScreenDraw_Repeat(!MyTern);
      console.log('myArmy:',myArmy);
      myArmy.ChoiceCard.classList.remove('card-selected');
      myArmy.ChoiceCard.classList.add('card-turnover');
      myArmy.ChoiceCard = null;
      myArmy.ChoiceData = null;
      return;
    } else if (rivalCard) { // 상대 카드면
      return;
    }
    if (Data.field) { // 카드가 필드에 있으면
      //  영웅 부모와 필드카드의 부모가 다르기때문에 document에서 모든 .card를 검색한다
      // 카드.parentNode.querySelectorAll('.card').forEach(function (card) {
      document.querySelectorAll('.card').forEach(function (card) {
        card.classList.remove('card-selected');
      });
      Card.classList.add('card-selected');
      myArmy.ChoiceCard = Card;
      myArmy.ChoiceData = Data;
    } else { // 덱이 있으면
      if (DecktoField(Data, MyTern) !== 'end') {
        MyTern ? MyDeckCreate(1) : RivalDeckCreate(1);
      }
    }
  }
  
  function CardDomLink(Data, Dom, Hero) {
    var Card = document.querySelector('.card-hidden .card').cloneNode(true);
    Card.querySelector('.card-cost').textContent = Data.cost;
    Card.querySelector('.card-att').textContent = Data.att;
    Card.querySelector('.card-hp').textContent = Data.hp;
    if (Hero) {
      Card.querySelector('.card-cost').style.display = 'none';
      var Name = document.createElement('div');
      Name.textContent = '영웅';
      Card.appendChild(Name);
    }
    Card.addEventListener('click', function() {
      TernActionRun(Card, Data, tern);
    });
    Dom.appendChild(Card);
  }
  function RivalDeckCreate(Cnt) {
    for (var i = 0; i < Cnt; i++) {
      rival.DeckData.push(CardFactory());
    }
    DeckDraw_Repeat(rival);
  }
  function MyDeckCreate(Cnt) {
    for (var i = 0; i < Cnt; i++) {
      me.DeckData.push(CardFactory(false, true));
    }
    DeckDraw_Repeat(me);
  }
  function MyHeroCreate() {
    me.HeroData = CardFactory(true, true);
    CardDomLink(me.HeroData, me.Hero, true);
  }
  function RivalHeroCreate() {
    rival.HeroData = CardFactory(true);
    CardDomLink(rival.HeroData, rival.Hero, true);
  }
  
  function Card(Hero, MyCard) {
    if (Hero) {
      this.att = Math.ceil(Math.random() * 2);
      this.hp = Math.ceil(Math.random() * 5) + 25;
      this.hero = true;
      this.field = true;
    } else {
      this.att = Math.ceil(Math.random() * 5);
      this.hp = Math.ceil(Math.random() * 5);
      this.cost = Math.floor((this.att + this.hp) / 2);
    }
    if (MyCard) {
      this.mine = true;
    }
  }
  function CardFactory(Hero, MyCard) {
    return new Card(Hero, MyCard);
  }
  
  function initiallize() {
    [rival, me].forEach(function (item) {
      item.DeckData = [];
      item.HeroData = [];
      item.FieldData = [];
      item.ChoiceCard = [];
      item.ChoiceData = [];
    });
    RivalDeckCreate(5);
    MyDeckCreate(5);
    MyHeroCreate();
    RivalHeroCreate();
    ScreenDraw_Repeat(true); // 상대화면
    ScreenDraw_Repeat(false); // 내화면
  }
  
  ternBtn.addEventListener('click', function() {
    var CObject = tern ? me : rival;
    document.getElementById('rival').classList.toggle('turn');
    document.getElementById('my').classList.toggle('turn');
    FieldDraw_Repeat(CObject);
    HeroDraw_Repeat(CObject);
    tern = !tern; // 턴을 넘기는 코드
    if (tern) {
      me.Cost.textContent = 10;
    } else {
      rival.Cost.textContent = 10;
    }
  });
  
  initiallize(); // 진입점