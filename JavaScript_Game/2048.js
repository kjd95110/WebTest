var Table = document.getElementById('table');
var Data=[];
var Score = document.getElementById('score');

function initialize(){
    var fragment=document.createDocumentFragment();
    
    [1,2,3,4].forEach(function(){
        var colData=[];
        Data.push(colData);
        var tr=document.createElement('tr');
        [1,2,3,4].forEach(function(){
            colData.push(0);
            var td=document.createElement('td');
            tr.appendChild(td);
        });

        fragment.appendChild(tr);
    });

    Table.appendChild(fragment)
}


function CreateRandom() {
    var emptyArray = [];
    Data.forEach(function(colData, i) {
      colData.forEach(function(rowData, j) {
        if (!rowData) {
          emptyArray.push([i, j]);
        }
      });
    });
    if (emptyArray.length === 0) {
      alert('GameOver!!! ');
      Table.innerHTML = '';
      initialize();
    } else {
      var RandomCell = emptyArray[Math.floor(Math.random() * emptyArray.length)];
      Data[RandomCell[0]][RandomCell[1]] = 2;
      DrawScreen();
    }
  }



function DrawScreen() {
    Data.forEach(function(colData, i) {
      colData.forEach(function(rowData, j) {
        if (rowData > 0) {
          Table.children[i].children[j].textContent = rowData;
        } else {
          Table.children[i].children[j].textContent = '';
        }
      });
    });
  }


initialize();
CreateRandom();
DrawScreen();