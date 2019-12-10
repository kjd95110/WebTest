var DateConst = 86400000; //(24*60*60*10000) //시간을 계산하기위한 하루단위의 만분의 일초 수
var fujitsu_objectA		= new Object();
var fujitsu_objectB		= new Object();
var fujitsu_WSresult	= new Array(); // Webservice에서 넘겨온 값을 저장하기위한 String Array
var fujitsu_POPresult	= new Array(); // PopUp윈도우에 Row를 더블클릭할경우 Row의 각 셀들의 값을 저장하기위한 String Array
var fujitsu_EvtobjID; //Home키를 누른 Object의 ID값을 갖고 있는 변수
var DeleteRow = true;
var fujitsu_Argument	= new Object();
var fujitsu_ResultCount = new Array();
var AfterCellUpdateFlag = true;
//============================================================
//WebService Behavior를 이용하여 코드명 가져오는 Function
//============================================================

function Service_Init(){
	service.useService("../../CodeSearchWS.asmx?WSDL","CodeSearch");	
}

function Service_GetName()
{
	var _argc1;
	var _argv1;
	var _argc2;
	var _argv2;

	if (arguments[0].value == null || arguments[0].value == ""){
		arguments[0].value = "";
		arguments[1].value = "";
		return;
	} 
	
	if (arguments.length == 7){
		_argc1 = arguments[5].toString();
		_argv1 = arguments[6].toString();		
		_argc2 = "";
		_argv2 = "";
	} else if (arguments.length == 9){
		_argc1 = arguments[5].toString();;
		_argv1 = arguments[6].toString();
		_argc2 = arguments[7].toString();
		_argv2 = arguments[8].toString();
	} else {
		_argc1 = "";
		_argv1 = "";
		_argc2 = "";
		_argv2 = "";
	}
	iCallID = service.CodeSearch.callService(_GetNameResult, "GetName", arguments[2], arguments[3], arguments[4], arguments[0].value, _argc1, _argv1, _argc2, _argv2);
	fujitsu_objectA = arguments[0];
	fujitsu_objectB = arguments[1];
	fujitsu_Argument = arguments;
	fujitsu_ResultCount = arguments[3].split(",");
}

//WebService Behavior의 결과 값을 받기위한 Function
function _GetNameResult(result)
{
	if(result.error)
	{
		var xfaultcode   = result.errorDetail.code;
		var xfaultstring = result.errorDetail.string;
		var xfaultsoap   = result.errorDetail.raw;
		alert(xfaultcode + " " + xfaultstring + " " + xfaultsoap);

	}
	else
	{
		if (result.value != null){
			if (fujitsu_objectA.value.length == 0){
				fujitsu_objectA.value = "";
				fujitsu_objectB.value = "";
					
			} else {
				fujitsu_WSresult = result.value;
				fujitsu_objectA.value = fujitsu_WSresult[0];
				fujitsu_objectB.value = fujitsu_WSresult[1];
				if ((fujitsu_WSresult.length > 2 && fujitsu_WSresult != null) || fujitsu_Argument.length >= 7){
					fujitsu_EvtobjID =  fujitsu_objectA.id;
					WebserviceCallBack();
				}
			}
		} else {
			fujitsu_objectB.value = "";
			if (fujitsu_Argument.length >= 7 || fujitsu_ResultCount.length > 1){
				fujitsu_WSresult = null;
				WebserviceCallBack();
			}
		}
		
	}
}


function Service_GetName_Grid(_objA, _objB, _strA, _strB, _strC)
{
	var _argc1;
	var _argv1;
	var _argc2;
	var _argv2;
	
	if (arguments[0].getValue() == null || arguments[0].getValue() == ""){
		return;
	} 
	
	if (arguments.length == 7){
		_argc1 = arguments[5].toString();
		_argv1 = arguments[6].toString();		
		_argc2 = "";
		_argv2 = "";
	} else if (arguments.length == 9){
		_argc1 = arguments[5].toString();;
		_argv1 = arguments[6].toString();
		_argc2 = arguments[7].toString();
		_argv2 = arguments[8].toString();
	} else {
		_argc1 = "";
		_argv1 = "";
		_argc2 = "";
		_argv2 = "";
	}
	
	iCallID = service.CodeSearch.callService(_GetNameResult_Grid, "GetName", arguments[2],  arguments[3], arguments[4],  arguments[0].getValue(), _argc1, _argv1, _argc2, _argv2);
	fujitsu_objectA = arguments[0];
	fujitsu_objectB = arguments[1];
	fujitsu_Argument =  arguments;
	fujitsu_ResultCount = arguments[3].split(",");
}


//WebService Behavior의 결과 값을 받기위한 Function
function _GetNameResult_Grid(result)
{
	if(result.error)
	{
		var xfaultcode   = result.errorDetail.code;
		var xfaultstring = result.errorDetail.string;
		var xfaultsoap   = result.errorDetail.raw;
		alert(xfaultcode + " " + xfaultstring + " " + xfaultsoap);

	}
	else
	{
		if (result.value != null){
			if (fujitsu_objectA.getValue() == null){
				fujitsu_objectA.setValue("");
				fujitsu_objectB.setValue("");
				fujitsu_objectA.activate();
				fujitsu_objectA.beginEdit();
			} else {
				fujitsu_WSresult = result.value;
				fujitsu_objectA.setValue(fujitsu_WSresult[0]);
				fujitsu_objectB.setValue(fujitsu_WSresult[1]);
				if (fujitsu_objectB.getNextTabCell() != null){
					fujitsu_objectB.getNextTabCell().activate();
					fujitsu_objectB.getNextTabCell().beginEdit();
				}
				if ((fujitsu_WSresult.length > 2 && fujitsu_WSresult != null) || fujitsu_Argument.length >= 7){
					fujitsu_EvtobjID =  fujitsu_objectA.Index;
					WebserviceCallBack();
				}
				
			}
		} else {
			fujitsu_objectB.setValue("");
			fujitsu_objectA.activate();
			fujitsu_objectA.beginEdit();
			if (fujitsu_Argument.length >= 7 || fujitsu_ResultCount.length > 1){
				fujitsu_EvtobjID =  fujitsu_objectA.Index;
				fujitsu_WSresult = null;
				WebserviceCallBack();
			}
		}
		
	}
}

//공통팝업처리를 위한 함수
function fujitsu_Popup()
{
	var MultiValue = "";
	if(window.event.keyCode == 36)
	{
		if ( arguments[0] != null) 
		{
			fujitsu_EvtobjID = arguments[1].id;
			if ( fujitsu_EvtobjID == null) 
			{
				fujitsu_EvtobjID = arguments[1].name;
			}

			if (arguments.length == 2){
				MultiValue = "";
			} else {
				if ( arguments[2] == null){
					MultiValue = "";
				} else {
					MultiValue = arguments[2];	
				}
				
			}
			
			fujitsu_POPresult = window.showModalDialog("/MD/Source/popup.aspx?POPUPGB=" + arguments[0] + 
														"&TextValue=" + arguments[1].value +
														"&MultiValue=" + MultiValue  ,"_blank", "dialogWidth:364px;dialogHeight:360px;scroll:no;resizable:no;help:no;unadorned:yes;center:yes;");
			if (fujitsu_POPresult != null) 
			{
				_SetPopValue();
			}
		} 
		else 
			alert("팝업창의 구분코드를 입력하십시오");
		
	}
	return;
}

function GetStoreCheck(gn){
	var Grid = igtbl_getGridById(gn);
	var Rows = Grid.Rows;
	var RowLength = Rows.length;
	var CheckCount = 0;
	for (var i = 0; i < RowLength ;i++){
		if (Rows.getRow(i).getCell(0).getValue() == "true"){
			return true;
		}
	}
	return false;
}



//공통팝업처리를 위한 함수 for UltraWebGrid
//--------------------------------------------------------------------------
// 첫번째 인자 : 팝업구분, 두번째 인자 : 조회 값
//--------------------------------------------------------------------------
function fujitsu_Popup_Grid(fujitsu_Param, fujitsu_value) {
	var tempValue = "";
	var MultiValue = "";
	if ( arguments[0] != null) {
		if ( arguments[1] == null) {
			tempValue = "";
		} else {
			tempValue = arguments[1];
		}
		
		if (arguments.length == 2){
			MultiValue = "";
		}	else {
			if (arguments[2] == null){
				MultiValue = "";
			} else {
				MultiValue = arguments[2];
			}
		}
		fujitsu_POPresult = window.showModalDialog("/MD/Source/popup.aspx?POPUPGB=" + arguments[0] + 
													"&TextValue=" + tempValue +
													"&MultiValue=" + MultiValue  ,"_blank", "dialogWidth:364px;dialogHeight:360px;scroll:no;resizable:no;help:no;unadorned:yes;center:yes;");
	} else {
		alert("팝업창의 구분코드를 입력하십시오");
	}
}


//Status Bar에 에러로그 입력함
function WriteError(strValue){
	if ( strValue == "" || strValue == null ) {
		WebMainButton1_lblMsg2.innerHTML = "";
	} else {
		WebMainButton1_lblMsg2.innerHTML = "<font color=red><nobr>" + strValue + "</nobr></font>";
	}
}

//Status Bar에 에러로그 입력함
function WriteMainError(strValue){
	if ( strValue == "" || strValue == null ) {
		WebMainButton1_lblMsg1.innerHTML = "";
	} else {
		WebMainButton1_lblMsg1.innerHTML = "<font color=red><nobr>" + strValue + "</nobr></font>";
	}
}
//***************************************************************************************
//***************************************************************************************
// ULTRAWEBGRID 관련 함수 시작
//***************************************************************************************
//***************************************************************************************
//CELL 내용이 업데이트 된 후 처리되는 FUNCTION
function AfterCellUpdate(gn, id)  
{ 
	if (AfterCellUpdateFlag){
		var row = igtbl_getRowById(id);
		var cellValue = row.getCell(0).getValue();
		if ( cellValue == null  || cellValue == ""){
			var cell = row.getCell(0);
			cell.Element.style.backgroundImage = "url(/MD/images/Write.png)";
			cell.setValue("U");
		}
	
		_AfterCellUpdate(gn, id);
	}
} 

// GRID내에서 KeyDown 될 경우 처리되는 function
function KeyDown(gn, id, keycode){
	if (_KeyDown(gn, id, keycode) != false){
		if (keycode == 120){
			var gs=igtbl_getGridById(gn);
			var row = igtbl_getRowById(id);
			var cell = row.getCell(0);
			var PrevRow = row.getPrevRow();
			if (DeleteRow) {
				if ( cell.getValue() == "I"){
					if ( row.getSelected() == true){
						// flag를 아무것도 넣지 않은 상태에서 delete row
						AfterCellUpdateFlag = false;
						cell.Element.style.backgroundImage = "url()";
						cell.setValue("");
						AfterCellUpdateFlag = true;
						row.remove();
						if (PrevRow == null){
							gs.activeRect.style.display="none";
						} else {
							PrevRow.activate();
							PrevRow.setSelected(true);
						}
						
					} else {
						alert("열을 선택 후 삭제 할 수 있습니다");
					}
					
				} else if(cell.getValue() == "U"){
					// 'D' 플래그를 박고 image 셋팅
					AfterCellUpdateFlag = false;
					cell.Element.style.backgroundImage = "url(/MD/images/Delete.png)";
					cell.setValue("D");
					AfterCellUpdateFlag = true;
					
				} else if(cell.getValue() == "D"){
						// 'U' 플래그 박고 Image 셋팅
						cell.Element.style.backgroundImage = "url()";
						AfterCellUpdateFlag = false;
						cell.setValue("");
						AfterCellUpdateFlag = true;
				} else {
					// 무조건 'D' 플래그 박고 Image 셋팅
					cell.Element.style.backgroundImage = "url(/MD/images/Delete.png)";
					AfterCellUpdateFlag = false;
					cell.setValue("D");
					AfterCellUpdateFlag = true;
				}
			} else {
				if ( cell.getValue() == "I"){
					if ( row.getSelected() == true){
						// flag를 아무것도 넣지 않은 상태에서 delete row
						cell.Element.style.backgroundImage = "url()";
						AfterCellUpdateFlag = false;
						cell.setValue("");
						AfterCellUpdateFlag = true;
						row.remove();
						if (PrevRow == null){
							gs.activeRect.style.display="none";
						} else {
							PrevRow.activate();
							PrevRow.setSelected(true);
						}
					} else {
						alert("열을 선택 후 삭제 할 수 있습니다");
					}
				}
			}
		} else if (keycode==9) { 
			var gs=igtbl_getGridById(gn);
			if (gs.AllowAddNew == 2){
				return;
			}
			
			var cell = igtbl_getCellById(id);//gets the ActiveCell
			if (cell != null){
				var grid =igtbl_getGridById(gn); 
				if (cell.Column.Index == grid.Bands[0].Columns.length - 1) {//checks to see if the AtiveCell is in the last column
					if (cell.Row.getIndex() == grid.Rows.length -1) {//checks to see if the cell is in the last row
								igtbl_addNew(gn,0);//adds a row to the first band in UltraWebGrid1
					}
				} 
			}

		} else if (keycode==40) {
			var gs=igtbl_getGridById(gn);
			if (gs.AllowAddNew == 2){
				return;
			}
			var cell = igtbl_getCellById(id);//gets the ActiveCell
			if (cell != null){
				var grid =igtbl_getGridById(gn); 
				if (cell.Row.getIndex() == grid.Rows.length -1) {//checks to see if the cell is in the last row
								igtbl_addNew(gn,0);//adds a row to the first band in UltraWebGrid1
				}
			}
		}
	}
}

//ROW 추가
function AddRow(gn)
{			
	//Get the activerow
	var row=igtbl_getActiveRow(gn);
	
	if(row!=null)
	{
		igtbl_addNew(gn,0);
	}
	else
	{
		igtbl_setActiveRow(gn,igtbl_getElementById(gn + "r_0"));
		NewRow = igtbl_addNew(gn,0);
	}
}

//ROW 추가 된 후 처리되는 함수
function AfterRowInsert(gn, id){
	var gs=igtbl_getGridById(gn);
	var row = igtbl_getRowById(id);
	var cell = row.getCell(0);
	cell.Element.style.backgroundImage = "url(/MD/images/Plus.png)";
	//cell.setValue("I");
	igtbl_setInnerText(cell.Element,("I"==""?" ":"I"));
	gs.ChangedCells[cell.Element.id]= "I";
	_AfterRowInsert(gn, id);
}

//***************************************************************************************
//***************************************************************************************
// ULTRAWEBGRID 관련 함수 종료
//***************************************************************************************
//***************************************************************************************


/*
==================================================================================
ActiveX날짜형식 check(YYYY-MM-DD) OR YYYY-MM
==================================================================================
*/
function date_onblur(input) {
	if (!isNaN(input.value) && ((input.value.length == 8) || (input.value.length == 6))) {
		if (ChkDateFormat(input)) {
			if (input.value.length == 8) {
				input.value = input.value.substr(0,4) + "-" + input.value.substr(4,2) + "-" + input.value.substr(6,2);
			}
			else	{
				input.value = input.value.substr(0,4) + "-" + input.value.substr(4,2);
			}
			input.style.backgroundColor = "white";
			}
		else {
			input.style.backgroundColor = "yellow";	
			alert("일자를 바르게 입력하세요");
			input.focus();
		}
	}
	else	{
		if (input.value.length != 10) {
			input.style.backgroundColor = "yellow";	
			alert("일자를 바르게 입력하세요");
			input.focus();
		}
	}
}


/*
==================================================================================
ActiveX날짜형식 check
==================================================================================
*/
function date_onfocus(input) {
	if (input.value.length == 10) {
		input.value = input.value.substr(0,4) + input.value.substr(5,2) + input.value.substr(8,2);
		input.style.backgroundColor = "white";
	}

	if (input.value.length == 7) {
		input.value = input.value.substr(0,4) + input.value.substr(5,2);
		input.style.backgroundColor = "white";
	}

}



/*
==================================================================================
ActiveX날짜 표시 
==================================================================================
*/

function SubMenuDisplay1(mn, id, bShow, input1, input2, input3, input4, input5)  
{
	if(bShow)	{
		if (input1 != null)
			input1.style.display="none";
		if (input2 != null)
			input2.style.display="none";
		if (input3 != null)
			input3.style.display="none";
		if (input4 != null)
			input4.style.display="none";
		if (input5 != null)
			input5.style.display="none";
		}
	else
		if(!bShow && (	id == "WebMainButton1UltraWebMenu1_1M" || 
				id == "WebMainButton1UltraWebMenu1_2M" ||
				id == "WebMainButton1UltraWebMenu1_3M" ||
				id == "WebMainButton1UltraWebMenu1_4M" ||
				id == "WebMainButton1UltraWebMenu1_5M" ||
				id == "WebMainButton1UltraWebMenu1_6M" ||
				id == "WebMainButton1UltraWebMenu1_7M" ||
				id == "WebMainButton1UltraWebMenu1_8M" ||
				id == "WebMainButton1UltraWebMenu1_9M" 	))	{
		if (input1 != null)
			input1.style.display="inline";
		if (input2 != null)
			input2.style.display="inline";
		if (input3 != null)
			input3.style.display="inline";
		if (input4 != null)
			input4.style.display="inline";
		if (input5 != null)
			input5.style.display="inline";
		}
}	

/*
==================================================================================
tag control 표시 
==================================================================================
*/
function SubMenuDisplay2(mn, id, bShow, obj, strInput1 )  
{
	var i=0;

	if(bShow)	{
		for(i=0;i<obj.length;i++)	{
			if (obj.item(i).tagName.toUpperCase() == "SELECT" && strInput1 == "SELECT")	{
				if(obj.item(i).id.substr(obj.item(i).id.toString().length - 14, 14) != "ddlCurrentPage" ){
					obj.item(i).style.visibility = "hidden";
				}
			}
			else if (obj.item(i).tagName.toUpperCase() == "OBJECT")	{
				obj.item(i).style.visibility = "hidden";
			}
		}
	}
	else
		if(!bShow && (	id == "WebMainButton1UltraWebMenu1_1M" || 
				id == "WebMainButton1UltraWebMenu1_2M" ||
				id == "WebMainButton1UltraWebMenu1_3M" ||
				id == "WebMainButton1UltraWebMenu1_4M" ||
				id == "WebMainButton1UltraWebMenu1_5M" ||
				id == "WebMainButton1UltraWebMenu1_6M" ||
				id == "WebMainButton1UltraWebMenu1_7M" ||
				id == "WebMainButton1UltraWebMenu1_8M" ||
				id == "WebMainButton1UltraWebMenu1_9M" 	))	{
			for(i=0;i<obj.length;i++)	{
				if (obj.item(i).tagName.toUpperCase() == "SELECT" && strInput1 == "SELECT")	{
					if(obj.item(i).id.substr(obj.item(i).id.toString().length - 14, 14) != "ddlCurrentPage" ){
						obj.item(i).style.visibility = "visible";
					}
				}
				else if (obj.item(i).tagName.toUpperCase() == "OBJECT")	{
					obj.item(i).style.visibility = "visible";
				}
			}
		}

}


/*
==================================================================================
입력값이 NULL인지 체크
==================================================================================
*/
function isNull(obj) {
    if (obj.value == null || obj.value == "") {
        return true;
    }
    return false;
}
/*
==================================================================================
입력값이 NULL인지 체크하여 값반환
==================================================================================
*/
function isNullValue(obj) {
    if (obj == null || obj == "") {
        return "";
    }
    return obj;
}
/*
==================================================================================
입력값에 스페이스 이외의 의미있는 값이 있는지 체크
==================================================================================
*/
function isEmpty(obj) {
    if (obj.value == null || obj.value.replace(/ /gi,"") == "") {
        return true;
    }
    return false;
}
/*
==================================================================================
입력값에 특정 문자(chars)가 있는지 체크
특정 문자를 허용하지 않으려 할 때 사용
ex) if (containsChars(form.name,"!,*&^%$#@~;")) {
         alert("이름 필드에는 특수 문자를 사용할 수 없습니다.");
     }
==================================================================================
*/
function containsChars(obj,chars) {
    for (var inx = 0; inx < obj.value.length; inx++) {
       if (chars.indexOf(obj.value.charAt(inx)) != -1)
           return true;
    }
    return false;
}
/*
==================================================================================
입력값이 특정 문자(chars)만으로 되어있는지 체크
 특정 문자만 허용하려 할 때 사용
 ex) if (!containsCharsOnly(form.blood,"ABO")) {
         alert("혈액형 필드에는 A,B,O 문자만 사용할 수 있습니다.");
     }
==================================================================================
*/
function containsCharsOnly(obj,chars) {
    for (var inx = 0; inx < obj.value.length; inx++) {
       if (chars.indexOf(obj.value.charAt(inx)) == -1)
           return false;
    }
    return true;
}
/*
==================================================================================
입력값이 알파벳인지 체크
 아래 isAlphabet() 부터 isNumComma()까지의 메소드가
 자주 쓰이는 경우에는 var chars 변수를
 global 변수로 선언하고 사용하도록 한다.
 ex) var uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
     var lowercase = "abcdefghijklmnopqrstuvwxyz";
     var number    = "0123456789";
     function isAlphaNum(obj) {
         var chars = uppercase + lowercase + number;
         return containsCharsOnly(obj,chars);
     }
==================================================================================
*/
function isAlphabet(obj) {
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    return containsCharsOnly(obj,chars);
}
/*
==================================================================================
입력값이 알파벳 대문자인지 체크
==================================================================================
*/
function isUpperCase(obj) {
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return containsCharsOnly(obj,chars);
}
/*
==================================================================================
입력값이 알파벳 소문자인지 체크
==================================================================================
*/
function isLowerCase(obj) {
    var chars = "abcdefghijklmnopqrstuvwxyz";
    return containsCharsOnly(obj,chars);
}
/*
==================================================================================
입력값에 숫자만 있는지 체크
==================================================================================
*/
function isNumber(obj) {
   var chars = ". ,0123456789";
   if (!containsCharsOnly(obj,chars)) {
		alert("숫자만 입력할 수 있습니다.");
		return false;
    }
    return true; 
}
/*
==================================================================================
입력값에 숫자만 있는지 체크
==================================================================================
*/
function isNumber2(obj) {
    var chars = "-. ,0123456789";
    if (!containsCharsOnly(obj,chars)) {
		alert("숫자만 입력할 수 있습니다.");
		return false;
    }
    return true; 
}
/*
==================================================================================
입력값이 알파벳,숫자로 되어있는지 체크
==================================================================================
*/
function isAlphaNum(obj) {
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return containsCharsOnly(obj,chars);
}


/*
==================================================================================
입력값이 숫자,대시(-)로 되어있는지 체크
==================================================================================
*/
function isNumDash(obj) {
    var chars = "-0123456789";
    return containsCharsOnly(obj,chars);
}
/*
==================================================================================
입력값이 숫자,콤마(,)점(.)으로 되어있는지 체크
==================================================================================
*/
function isNumComma(obj) {
    var chars = ".,0123456789";
    return containsCharsOnly(obj,chars);
}
/*
==================================================================================
입력값에서 콤마를 없앤다.
==================================================================================
*/
function removeComma(obj) {
    return obj.value.replace(/,/gi,"");
}
/*
==================================================================================
입력값이 사용자가 정의한 포맷 형식인지 체크
자세한 format 형식은 자바스크립트의 'regular expression'을 참조
==================================================================================
*/
function isValidFormat(obj,format) {
    if (obj.value.search(format) != -1) {
        return true; //올바른 포맷 형식
    }
    return false;
}
/*
==================================================================================
입력값이 이메일 형식인지 체크
==================================================================================
*/

function isValidEmail(obj) {
//    var format = /^(\S+)@(\S+)\.([A-Za-z]+)$/;
    var format = /^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+)$/;
    return isValidFormat(obj,format);
}
/*
==================================================================================
입력값이 전화번호 형식(숫자-숫자-숫자)인지 체크
==================================================================================
*/
function isValidPhone(obj) {
    var format = /^(\d+)-(\d+)-(\d+)$/;
    return isValidFormat(obj,format);
}
/*
==================================================================================
입력값의 바이트 길이를 리턴
==================================================================================
*/
function getByteLength(obj) {
    var byteLength = 0;
    for (var inx = 0; inx < obj.value.length; inx++) {
        var oneChar = escape(obj.value.charAt(inx));
        if ( oneChar.length == 1 ) {
            byteLength ++;
        } else if (oneChar.indexOf("%u") != -1) {
            byteLength += 2;
        } else if (oneChar.indexOf("%") != -1) {
            byteLength += oneChar.length/3;
        }
    }
    return byteLength;
}
/*
==================================================================================
년월 6자리 날짜 valid Check
valid이면 YYYY-MM의 형식으로 리턴
invalid이면 ""로 리턴
==================================================================================
*/
function isYYYYMM(sDate) {
	sDate = getRawDate(sDate);

	var sYear = "", sMonth = "";
	var iYear = 0, iMonth = 0;

	if(sDate.length != 6) {
		return "";
	} else {
		sYear = sDate.substring(0,4);
		sMonth = sDate.substring(4,6);
	}

    if(isNaN(sYear) || isNaN(sMonth)) return "";

	iYear = parseInt(sYear,'10');
    iMonth = parseInt(sMonth,'10');

    if (iYear < 0001) iYear = 0;
    if (iMonth < 01 || iMonth > 12)  iMonth = 0;

    if(iYear == 0 || iMonth == 0 ) return "";
    return sYear+"/"+sMonth;
}
/*
==================================================================================
년월일 8자리 날짜 valid Check
valid이면 YYYY/MM/DD의 형식으로 리턴
invalid이면 ""로 리턴
==================================================================================
*/
function isYYYYMMDD(sDate) {
	sDate = getRawDate(sDate);

	var sYear = "", sMonth = "", sDay = "";
	var iYear = 0, iMonth = 0, iDay = 0;

	if(sDate.length != 8) {
		return "";
	} else {

		sYear = sDate.substring(0,4);
		sMonth = sDate.substring(4,6);
		if(parseFloat(sMonth) < 10) sMonth = "0" + parseFloat(trim(sMonth));
		sDay = sDate.substring(6,8);
		if(parseFloat(sDay) < 10) sDay = "0" + parseFloat(trim(sDay));
	}

    if(isNaN(sYear) || isNaN(sMonth) || isNaN(sDay)) return "";

    iYear = parseInt(sYear,'10');
    iMonth = parseInt(sMonth,'10');
    iDay = parseInt(sDay,'10');

    if (iYear < 1) iYear = 0;
    if (iMonth < 1 || iMonth > 12)  iMonth = 0;
    if (iDay < 1) iDay = 0;

    if ( iMonth == 1 || iMonth == 3 || iMonth == 5 || iMonth == 7 || iMonth == 8 ||
         iMonth == 10 || iMonth == 12)  {
		if (iDay > 31) iDay = 0;
    } else if (iMonth == 4 || iMonth == 6 ||  iMonth == 9 || iMonth == 11) {
		if (iDay > 30) iDay = 0;
    } else if (iMonth == 2 )  {
		if (iYear % 4 != 0 || (iYear % 100 == 0 && iYear % 400 != 0)) {
			if (iDay > 28) iDay = 0;
		} else if (iDay > 29) iDay = 0;
    }

    if(iYear == 0 || iMonth == 0 || iDay == 0) return "";
    return sYear+"/"+sMonth+"/"+sDay;
}
/*
==================================================================================
6자리 YYMMDD 날짜를 8자리 YYYYMMDD 날짜로 변환
sDate = '01-11-11' 이런 형태도 가능
==================================================================================
*/
function toYYYYMMDD(sDate) {
	sDate = getRawDate(sDate);
	if(sDate.length!=6) return "";

	return "20"+sDate;
}
/*
==================================================================================
8자리 YYYYMMDD 날짜를 6자리 YYMMDD의 RAW 날짜로 변환
sDate = '2001-11-11' 이런 형태도 가능
==================================================================================
*/
function toYYMMDD(sDate) {
	sDate = getRawDate(sDate);
	if(sDate.length!=8) return "";

	return sDate.substring(2,8);
}
/*
==================================================================================
6자리 YYYYMM 및 8자리 YYYYMMDD 날짜를 6자리 YYYYMM의 RAW 날짜로 변환
sDate = '2001-11-11' or '2001-11' 이런 형태도 가능
==================================================================================
*/
function toYYYYMM(sDate) {
	sDate = getRawDate(sDate);
	if(sDate.length!=8 && sDate.length!=6) return "";
	if(sDate.length==8) sDate = sDate.substring(0,6);

	return sDate;
}


/*
==================================================================================
4자리 시간 valid Check
valid이면 HH:MM의 형식으로 리턴
invalid이면 ""로 리턴
==================================================================================
*/
function isHHMM(sTime) {
	sTime = getRawTime(sTime);

	var sHour = "", sMinute = "";
	var iHour = 0, iMinute = 0;

	if(sTime.length != 4) {
		return "";
	} else {
		sHour = sTime.substring(0,2);
		sMinute = sTime.substring(2,4);
	}

    if(isNaN(sHour) || isNaN(sMinute)) return "";

	iHour = parseInt(sHour,'10');
	iMinute = parseInt(sMinute,'10');

	if(iHour<00 || iHour>=24) iHour = -1;
	if(iMinute<00 || iMinute>=60) iMinute = -1;

	if(iHour==-1 || iMinute==-1 ) return "";
	return sHour+":"+sMinute;
}
/*
==================================================================================
6자리 시간 valid Check
valid이면 HH:MM:SS의 형식으로 리턴
invalid이면 ""로 리턴
==================================================================================
*/
function isHHMMSS(sTime) {
	sTime = getRawTime(sTime);

	var sHour = "", sMinute = "", sSec = "";
	var iHour = 0, iMinute = 0, iSec = 0;

	if(sTime.length != 6) {
		return "";
	} else {
		sHour = sTime.substring(0,2);
		sMinute = sTime.substring(2,4);
		sSec = sTime.substring(4,6);
	}

    if(isNaN(sHour) || isNaN(sMinute) || isNaN(sSec)) return "";

	iHour = parseInt(sHour,'10');
	iMinute = parseInt(sMinute,'10');
	iSec = parseInt(sSec,'10');

	if(iHour<00 || iHour>=24) iHour = -1;
	if(iMinute<00 || iMinute>=60) iMinute = -1;
	if(iSec<00 || iSec>=60) iSec = -1;

	if(iHour==-1 || iMinute==-1 || iSec==-1) return "";
	return sHour+":"+sMinute+":"+sSec;
}
/*
==================================================================================
날짜입력값에서 구분자인 '/', '.', '-',':' 등을 제거하여 리턴
==================================================================================
*/
function getRawDate(sDate) {
	if(sDate==null || sDate == "") return "";

	sDate = sDate.replace(/\//g,"");
	sDate = sDate.replace(/-/g,"");
	sDate = sDate.replace(/\./g,"");
	sDate = sDate.replace(/\:/g,"");
	return sDate;
}
function getRawTime(sTime) {
	return getRawDate(sTime);
}
/*
==================================================================================
날짜를 체크하고 YYYY.MM.DD로 convert
==================================================================================
*/
function convertDate(obj) {
	var retDate = obj.value;
	if( retDate==null || retDate=="" ) return;

	if( (retDate=isYYYYMMDD(retDate))=="" ) return;
	else return obj.value = retDate;
}
/*
==================================================================================
문자열내의 왼쪽, 오른쪽의 공백을 제거
==================================================================================
*/
function trim(str) {
	str = ltrim( str );
	str = rtrim( str );
	return str;
}
/*
==================================================================================
문자열내의 왼쪽 공백을 제거
==================================================================================
*/
function ltrim( str ) {
	var iLen = str.length;
	var idx = 0;
	for(idx=0 ; idx<iLen; idx++ ) {
		if( str.charAt(idx)!=' ' ) break
	}
	return str.substring( idx,iLen );
}
/*
==================================================================================
문자열내의 오른쪽 공백을 제거
==================================================================================
*/
function rtrim( str ) {
	var iLen = str.length;
	var idx = 0;
	for(idx=iLen-1 ; idx>=0; idx-- ) {
		if( str.charAt(idx)!=' ' ) break;
	}
	return str.substring( 0,idx+1 );
}
/*
==================================================================================
구분자를 기준으로 각 값들을 분리하여 배열로 Return
==================================================================================
*/
function getTokenComma(val,patt ) {
	var i = 0, iFst=0;
	var sCheckValue=val;
	var arrRst = new Array();
	while((iFst = sCheckValue.indexOf(patt)) >= 0) {
		if(iFst!=0) arrRst[i++] = sCheckValue.substring(0,iFst);
		sCheckValue = sCheckValue.substring(iFst+1, sCheckValue.length);
	}
	arrRst[i] = sCheckValue;
	return arrRst;
}
/*
==================================================================================
우편번호에서 '-'을 제거하는 함수
==================================================================================
*/
function getRawZip(samt) {
	if(samt==null || samt=="") return "";
	return samt.replace( /-/g,"");
}
/*
==================================================================================
우편번호를 '-'을 붙인 형식으로 변환
==================================================================================
*/
function convertZip(sval) {
	sval = getRawZip(sval);
	if(sval.length!=6) return "";

	return sval.substring(0,3) + "-" + sval.substring(3,6);
}
/*
==================================================================================
입력값에서 구분자인 '/', '.', '-',':' 등을 제거하여 리턴
==================================================================================
*/
function getRawData(sData) {
	if(sData==null || sData == "") return "";

	sData = sData.replace(/\//g,"");
	sData = sData.replace(/-/g,"");
	sData = sData.replace(/\./g,"");
	sData = sData.replace(/\:/g,"");
	return sData;
}
/*
==================================================================================
주민등록번호를 체크한 후 '-'을 붙인 형식으로 변환
==================================================================================
*/
function personalIDCheck(sID) {
	sID = getRawData(sID);
	if(sID.length!=13) return "";

	return sID.substring(0,6)+"-"+sID.substring(6,13);
}
/*
==================================================================================
금액을 숫자로 변환하기 위한 함수
==================================================================================
*/
function GetRawAmt(samt) {
	if(samt == "") return "0";
	var sPatt = /\,/g;  			// Pattern 정의
	var sVal = samt.replace(sPatt,"");  // comma를 blank로 변경
	return sVal;
}
/*
==================================================================================
숫자를 금액으로 변환
==================================================================================
*/
function ConvAmt(sval) {
	var sRst="";  // 결과값
	var iOrd=sval.length;  // 길이
	if((sval.substring(0,1)) == "-") {
		sval = sval.substring(1,iOrd);
		iOrd -= 1; sRst = "-";
	}
	for(var i = 0; i < sval.length; i++) {
		sRst += sval.substring(i,i+1);
		if(iOrd != 1 && (iOrd-1) % 3 == 0) sRst += ",";
		iOrd -= 1;
	}
	return sRst;
}
/*
==================================================================================
구분자를 기준으로 각 값들을 분리하여 배열로 Return - Null 허용
==================================================================================
*/
function getTokenCom(val,patt ) {
	var i = 0, iFst=0;
	var sCheckValue=val;
	var arrRst = new Array();
	while((iFst = sCheckValue.indexOf(patt)) >= 0) {
		if(iFst!=0) arrRst[i++] = sCheckValue.substring(0,iFst);
		else if(iFst == 0) arrRst[i++] = "";
		sCheckValue = sCheckValue.substring(iFst+1, sCheckValue.length);
	}
	arrRst[i] = sCheckValue;
	return arrRst;
}
/*
==================================================================================
날짜형식포맷
==================================================================================
*/
function ChkDateFormat(input)
{

	if(input.value == "" || input.value == null) return;
	if(input.value.length == 8)
		{
			var dayvalue = isYYYYMMDD(input.value);
		}
	else
		{
			var dayvalue = isYYYYMM(input.value);
		}

	if(dayvalue == "")	{
		alert("날짜 형식이 아닙니다.");
		input.value = input.defaultValue;
		input.focus();
		return false;
	} else return true
}


/*
==================================================================================
숫자 자릿수 포맷
==================================================================================
*/
function NumFormat(num,len)
{
	tempNum = '' + num;
	lenNum = tempNum.length;
	returnNum = '';

	if(lenNum > len) return tempNum;

	for(i=0;i<len-lenNum;i++)
	{
		returnNum = returnNum + '0';
	}

	return returnNum + tempNum;

}

/*
==================================================================================
헤더 타이틀 이동
==================================================================================
*/
function HeaderMove()
{
	if( document.all.BodyLayer == null) return;
	var left = 0 ;
	left -= BodyLayer.scrollLeft;
	HeaderLayer.style.left = left;
}



/*
==================================================================================
윈도우 싸이즈 변경시 Layer 싸이즈 맞춤
==================================================================================
*/
function ResetSize()
{
	var bodyH = 0;
	if(document.all.TailLayer == null)
		bodyH = document.body.clientHeight - HeaderLayer.offsetHeight;
	else
		bodyH = document.body.clientHeight - HeaderLayer.offsetHeight - TailLayer.offsetHeight;

	if(bodyH >= 0)
        BodyLayer.style.height = bodyH;
}




/*
==================================================================================
입력박스날짜 포맷1
==================================================================================
*/
function dateFormat(sDate)
{
	var tempDate = getRawDate(sDate.value);

	if(tempDate.length == 4)
	{
		sDate.value = tempDate.substring(0,4) + "/" ;
	}
	else if(tempDate.length == 6)
	{
		sDate.value = tempDate.substring(0,4) + "/" + tempDate.substring(4,6) + "/" ;
	}
	else if(tempDate.length == 8)
	{
		sDate.value = tempDate.substring(0,4) + "/" + tempDate.substring(4,6) + "/" + tempDate.substring(6,8);
	}
}
/*
==================================================================================
금액포맷
==================================================================================
*/
function amtFormat(obj)
{
	var srcNumber = obj.value;
	if(trim(srcNumber) == '') return;
	srcNumber = GetRawAmt(srcNumber);
	if(isNaN(srcNumber))
	{
		obj.value = obj.defaultValue;
		return;
	}

	var txtNumber = '' + parseFloat(srcNumber);
	var temp;

	var rxSplit = new RegExp('([0-9])([0-9][0-9][0-9][,.])');
	var arrNumber = txtNumber.split('.');
	arrNumber[0] += '.';
	do {
		arrNumber[0] = arrNumber[0].replace(rxSplit, '$1,$2');
	} while (rxSplit.test(arrNumber[0]));

	if (arrNumber.length > 1) {
		temp = arrNumber.join('');
	}
	else {
		temp = arrNumber[0].split('.')[0];
      	}

      	obj.value = temp;
}
/*
==================================================================================
입력박스날짜 포맷2
==================================================================================
*/
function checkDate(obj)
{
	var tempVal = getRawDate(obj.value);
	if( (tempVal.length != 0) && (tempVal.length != 8) ) {
		alert(" 날짜형식은 YYYY/MM/DD 입니다.");
		obj.value = obj.defaultValue;
		obj.focus();
		return false;
	} else {
		if( (obj.value.length != 0) && (isYYYYMMDD(obj.value) == "") )
		{
			alert(" 올바른 날짜가 아닙니다. ");
			obj.value = obj.defaultValue;
			obj.focus();
			return false;
		}
		obj.value = isYYYYMMDD(obj.value);
	}
}
/*
==================================================================================
입력박스 월 날짜 포맷1
==================================================================================
*/
function monthFormat(sMonth)
{
	var tempMonth = getRawDate(sMonth.value);

	if(tempMonth.length == 4)
	{
		sMonth.value = tempMonth.substring(0,4) + "/" ;
	}
	else if(tempMonth.length == 6)
	{
		sMonth.value = tempMonth.substring(0,4) + "/" + tempMonth.substring(4,6);
	}
}

/*
==================================================================================
입력박스 월 날짜 포맷2
==================================================================================
*/
function checkMonth(obj)
{
	var tempVal = getRawDate(obj.value);
	if( (tempVal.length != 0) && (tempVal.length != 6) ) {
		alert(" 날짜형식은 YYYY-MM 입니다.");
		obj.value = obj.defaultValue;
		obj.focus();
	} else {
		if( (obj.value.length != 0) && (isYYYYMM(obj.value) == "") )
		{
			alert(" 올바른 날짜가 아닙니다. ");
			obj.value = obj.defaultValue;
			obj.focus();
		}
		obj.value = isYYYYMM(obj.value);
	}
}

/*
==================================================================================
입력박스에 숫자만 입력
==================================================================================
*/
function onlyNumber(){
	if (event.keyCode == 9 || event.keyCode == 13) {
		event.returnValue = true;
	}	else if  (event.keyCode < 45 || event.keyCode > 57) { 
		event.returnValue = false; 
	}
}

/*
==================================================================================
엔터키 클릭시 해당 필드로 포커스 이동
==================================================================================
*/
// IE9 이상부터 window.event.keyCode = 9; 적용안되서 코드분리
var browser = get_info_IE();
if (browser.version <= 8) {
    document.onkeydown = keyDown;
    function keyDown(DnEvents) {
        if (window.event.keyCode == 116) {
            window.event.keyCode = null;
            return false;
        }
        if (document.activeElement.tagName.toUpperCase() == "TEXTAREA") { return true; }
        if (document.activeElement.tagName.toUpperCase() == "SELECT") { if (window.event.keyCode == 8) return false; }

        k = window.event.keyCode;
        if (k == 13) {
            window.event.keyCode = 9;
        }
        return true;
    }
}
else {
    window.addEventListener('keydown', function(e) {
        if (e.keyIdentifier == 'U+000A' || e.keyIdentifier == 'Enter' || e.keyCode == 13) {
            if ((e.target.nodeName === 'INPUT' && e.target.type !== 'textarea') || (e.target.nodeName === 'SELECT')) {
                e.preventDefault();
                focusNextElement();
                return false;
            }
        }
    }, true);
}

function focusNextElement() {
    //var focussableElements = 'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]):not([readonly]), [tabindex]:not([disabled]):not([tabindex="-1"]), select:not([disabled])';
    var focussableElements = 'input[type=text]:not([disabled]):not([readonly]), select:not([disabled])';
    if (document.activeElement && document.activeElement.form) {
        var focussable = Array.prototype.filter.call(document.activeElement.form.querySelectorAll(focussableElements),
              function(element) {
                  return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement
              });
              
      var index = focussable.indexOf(document.activeElement);
      if (focussable[index + 1]) {
          if (focussable[index + 1].nodeName == 'INPUT')
              focussable[index + 1].select();
          else
              focussable[index + 1].focus();
      }
        
    }
}

/*
==================================================================================
문자,숫자check
==================================================================================
*/
function checkString(arg)
{
    if (trim(arg) == "" || isNaN(trim(arg)))
    {
           return true;
    }
    else
    {
           return false;
    }
}
/*
================================================================================================
라디오버튼 Clear
================================================================================================
*/
function radioClear(obj)
{
	if(obj == null) return;
	if(obj.length==null)
		if(obj.checked) obj.checked = false;

	for(i=obj.length-1; i>=0; i--)
		if( obj[i].checked ) obj[i].checked = false;
}
/*
===============================================================================================
선택한 라디오 버튼의 index 번호 가져오기
===============================================================================================
*/
function checkIndex(obj)
{
	if(obj == null) return null;
	if(obj.length==null)
		if(obj.checked) return 0;

	for(i=obj.length-1; i>=0; i--)
		if( obj[i].checked ) return i;

	return null;
}

/*
===============================================================================================
검색버튼 이미지 변경
===============================================================================================
*/
// menu images preloading .start
if (document.images)
{
    buttonExtend_up = new Image();      buttonExtend_up.src = "/hjc/images/button/buttonExtend_up.gif";
}

if (document.images)
{
    buttonExtend = new Image();      buttonExtend.src = "/hjc/images/button/buttonExtend.gif";
}
// menu images preloading .end

// mouseover,mouseout .start
function mouse_over(imgName)
{
    if (document.images) document.images[imgName].src = eval("buttonExtend_up.src");
}

function mouse_out(imgName)
{
    if (document.images) document.images[imgName].src = eval("buttonExtend.src");
}
// mouseover,mouseout .end

/*
===============================================================================================
해당 폼의 TEXT,RADIO,CHECKBOX,SELECT Clear
===============================================================================================
*/
function formClear(obj)
{
	var i=0;

	for(i=0;i<obj.length;i++)
    {
		if(obj.item(i).tagName.toUpperCase() == "INPUT" )
		{
			if (obj.item(i).type.toUpperCase() == "TEXT")
			{
				if (obj.item(i).id.substr(obj.item(i).id.toString().length - 2, 2).toUpperCase() != "_S"){
					obj.item(i).value = "";
				}
			}
			else if(obj.item(i).type.toUpperCase() == "PASSWORD")
			{
				obj.item(i).value = "";
			}
			else if(obj.item(i).type.toUpperCase() == "RADIO")
			{
				obj.item(i).checked = false;
			}
			else if(obj.item(i).type.toUpperCase() == "CHECKBOX")
			{
				if(obj.item(i).disabled != true){
					obj.item(i).checked = false;
				}
			}
		}
		else if (obj.item(i).tagName.toUpperCase() == "SELECT")
		{

			if(obj.item(i).id.substr(obj.item(i).id.toString().length - 14, 14) != "ddlCurrentPage" &&	obj.item(i).id.substr(obj.item(i).id.toString().length - 2, 2).toUpperCase() != "_S"){
				obj.item(i).selectedIndex = 0;
			}
		}
	}

}



function formEnable(obj)
{
	var i=0;

	for(i=0;i<obj.length;i++)
    {
		if(obj.item(i).tagName.toUpperCase() == "INPUT" )
		{
			if (obj.item(i).type.toUpperCase() == "TEXT")
			{
				if (obj.item(i).id.substr(obj.item(i).id.toString().length - 2, 2).toUpperCase() != "_S"){
					obj.item(i).disabled = false;
				}
			}
			else if(obj.item(i).type.toUpperCase() == "PASSWORD")
			{
				obj.item(i).disabled = false;
			}
			else if(obj.item(i).type.toUpperCase() == "RADIO")
			{
				obj.item(i).disabled = false;
			}
			else if(obj.item(i).type.toUpperCase() == "CHECKBOX")
			{
				obj.item(i).disabled = false;
			}
		}
		else if (obj.item(i).tagName.toUpperCase() == "SELECT")
		{

			if(obj.item(i).id.substr(obj.item(i).id.toString().length - 14, 14) != "ddlCurrentPage" &&	obj.item(i).id.substr(obj.item(i).id.toString().length - 2, 2).toUpperCase() != "_S"){
				obj.item(i).disabled = false;
			}
		}
	}

}

/****************************************
//주민등록번호 체크
****************************************/
function fnChkDigitJumin(sCode){

	var aJuminArr = new Array(13);
	var iCm;
	var iH_Mod;
	var iH_Minus;
	var iH_Last;
	var iLast_Jumin;

	if(sCode.length != 13){
	    return false;
	}
	else if(isYYYYMMDD("19" + sCode.substring(0,6))==""){
	    return false;
	}
	else if(!(sCode.substring(6,7) == '1'||sCode.substring(6,7) == '2'||
			sCode.substring(6,7) == '3'||sCode.substring(6,7) == '4'||
			sCode.substring(6,7) == '5'||sCode.substring(6,7) == '6')) {
	    return false;
	}
	if(!(sCode.substring(6,7) == '5'||sCode.substring(6,7) == '6')){
		iLast_Jumin = sCode.substring(12,13);
	
		aJuminArr[0] = sCode.substring(0, 1) * 2;
		aJuminArr[1] = sCode.substring(1, 2) * 3;
		aJuminArr[2] = sCode.substring(2, 3) * 4;
		aJuminArr[3] = sCode.substring(3, 4) * 5;
		aJuminArr[4] = sCode.substring(4, 5) * 6;
		aJuminArr[5] = sCode.substring(5, 6) * 7;
		aJuminArr[6] = sCode.substring(6, 7) * 8;
		aJuminArr[7] = sCode.substring(7, 8) * 9;
		aJuminArr[8] = sCode.substring(8, 9) * 2;
		aJuminArr[9] = sCode.substring(9, 10) * 3;
		aJuminArr[10] = sCode.substring(10, 11) * 4;
		aJuminArr[11] = sCode.substring(11, 12) * 5;
		aJuminArr[12] = 0;
	
		for(iCm=0 ; iCm<12 ; iCm++){
		    aJuminArr[12] = aJuminArr[12] + aJuminArr[iCm];
		}
	
		iH_Mod = aJuminArr[12] % 11;
		iH_Minus = 11 - iH_Mod;
		
		iH_Last = iH_Minus % 10;

		if(iH_Last != iLast_Jumin){
			return false;
		}
	}

	return true;
      
}

/****************************************
//주민등록번호 체크 끝
****************************************/

/*(F)***************************************************************
 개 요  : 날짜 연산
 기 능  : 1. 년도에 대한 연산
	     2. 월에 대한 연산
  		 3. 월에 대한 연산
 인수   : 1.sStyle("y"-연도,"m"-월,"d"-일)
  		 2.nDiff(차이)
  		 3.sDate : 일자
 Return  : 정상 - 연산된 날짜(YYYY-MM-DD),오류-""
 작성자   : FKL    작성일 : 2002-12-21
*******************************************************************/
function FDateAdd(sStyle,nDiff,sDate){
	var sTDate = "";
	var sRDate = "";
	var nRDiff;
	var nMonth;
	var nYear;
	var nDay;
	var nLastDay;

	nRDiff = new Number(nDiff);
	sDate = getRawDate(sDate);

	if(sDate.length != 8){
		alert("날짜 형식이 아닙니다.1");
		return "";
	}

	/* 차이가 숫자 인지 검사 */
	if(nRDiff == "NaN"){
		alert("숫자 형식이 아닙니다.");
		return "";
	}
	/* (순수 8자리 날짜) */
	sDate = getRawDate(sDate);

	switch(sStyle.toUpperCase()){
		case "Y" :			/* 년차이를 구함 */
			sRDate = (parseInt(sDate.substr(0,4)) + nRDiff) + "/" + sDate.substr(4,2) + "/" + sDate.substr(6,2);
			return sRDate;

		case "M" :			/* 월차이를 구함 */
			nYear = parseInt(sDate.substr(0,4));
			nMonth = parseInt(sDate.substr(4,2));
			nMonth = parseInt(nMonth) + parseInt(nRDiff);

			if(nMonth <= 0){
				/* (년도) */
				nYear = parseInt(nYear) + parseInt(nMonth / 12);
				nYear = nYear - 1;

				/* (월) */
				nModMonth = nMonth % 12;
				nMonth = 12 + nModMonth;
			}
			else if(nMonth > 12){
				//년도
				nYear = parseInt(nYear) + parseInt(nMonth / 12);
				//월
				nMonth = nMonth % 12;
			}
			else{
				nYear = sDate.substr(0,4);
			}
			//(월을 두자리로 맞춤)
			if(nMonth <= 9){
				nMonth = "0" + nMonth;
			}


			//(날짜)
			nDay = sDate.substr(6,2);

			//(해당말의 날짜 체크(해당달의 마지막일이 보다 큰달의 연산일때)
			nLastDay = parseInt(FLastDay(nYear + "" + nMonth));
         nDay = parseInt(nDay);
			if(nLastDay < parseInt(nDay))
				nDay = nLastDay
			//날짜를 두자리로 맞춤)
			if(nDay <= 9)
				nDay = "0" + nDay;

			sRDate =nYear + "/" + nMonth + "/" + nDay;

			return sRDate;
		case "D" :			/* 날짜차이를 구함 */
			nYear = sDate.substr(0,4);
			nMonth = sDate.substr(4,2);
			nDay = sDate.substr(6,2);

			sRDate = new Date((nYear * 1),(nMonth * 1) - 1,(nDay * 1));

			//(날짜 차이-밀리세컨까지 숫자형)
			sRDate.setTime(sRDate.getTime() + (nRDiff * DateConst));

			//(월설정)
			nMonth = "";
			nMonth = sRDate.getMonth() + 1;



			//자리수를 두자리로 맞춘다
			if(nMonth <= 9){
				nMonth = "0" + nMonth;
			}

			nDay = sRDate.getDate();
			if(nDay <= 9)
				nDay = "0" + nDay;
			sTDate = nYear + "/" + nMonth + "/" + nDay;
			return sTDate;
		default :
			return "";
			break;
	}
}
/*(F)***************************************************************
 개 요  : 월의 마지막 일자를 구한다.
 기 능  : 1. 년도에 대한 연산
  		   2. 월에 대한 연산
  		   3. 월에 대한 연산
 인수   : 1.sStyle("y"-연도,"m"-월,"d"-일)
  		   2.nDiff(차이)
  		   3.sDate : 일자
 Return  : 정상 - 월의 마지막일,오류-(-1)
 작성자 : FKL    작성일 : 2002-12-21
*******************************************************************/
function FLastDay(sDate){
	//순수 날짜형식
	sDate = getRawDate(sDate);
	alert(sDate);
	return false;

	if(sDate.length != 6){
		alert("날짜 형식이 아닙니다.");
		return -1;
	}

	if(sDate.length == 6){
		sDate = sDate + "01";
	}
	else if(sDate.length == 7){
		sDate = sDate + "-01";
	}


	nYear = sDate.substr(0,4) * 1;
	nMonth = sDate.substr(4,2) * 1;
	nMonth = (nMonth * 1) + 1;

	if(nMonth <= 0){
		/* (년도) */
		nYear = parseInt(nYear) + parseInt(nMonth / 12);
		nYear = nYear - 1;

		/* (월) */
		nModMonth = nMonth % 12;
		nMonth = 12 + nModMonth;
	}
	else if(nMonth > 12){

		//년도
		nYear = parseInt(nYear) + parseInt(nMonth / 12);
		//월
		nMonth = nMonth % 12;
	}
	else{
		nYear = sDate.substr(0,4);
	}
	if(nMonth <= 9){
		nMonth = "0" + nMonth;
	}
	nDay = "01";
	//(날짜 차이-밀리세컨까지 숫자형)
	sRDate = new Date(nYear,parseInt(nMonth) - 1,parseInt(nDay));
	sRDate.setTime(sRDate.getTime() - parseInt(DateConst));

	return (sRDate.getDate());
}
/************************************************************************************************
(0 ~ 9 까지의 숫자인지 검사하고 길이가 0 이상이면 길이 만큼 0을 채군다.
objValue : value, len : 길이
작성자 : FKL (2002-12-10 10:39오전)
*************************************************************************************************/
function OnlyNumberLen(objValue,len)
{
    var anum   = /(^\d+$)|(^\d+\.\d+$)/;
    var retVal;

    if (anum.test(objValue))
    {
        if(len==0)
        {
            retVal = objValue;
        }
        else
        {
            retVal = NumFormat(objValue,len);
        }
    }
    else
    {
        if(len==0)
        {
            retVal = '';
        }
        else
        {
            retVal = NumFormat('',len);
        }
    }
    return retVal;
}

/************************************************************************************************
(소숫점을 포함하는 숫자를 금액으로 변환한다.
작성자 : FKL (2002-12-10 10:39오전)
*************************************************************************************************/
function amtFormatDot(srcNumber, len) {
	var txtNumber = '' + srcNumber.toFixed(len);

    if (isNaN(txtNumber) || txtNumber == "") {
    	alert("숫자만 입력 하세요");
    }
    else {
    	var rxSplit = new RegExp('([0-9])([0-9][0-9][0-9][,.])');
    	var arrNumber = txtNumber.split('.');
    	arrNumber[0] += '.';

        do {
        	arrNumber[0] = arrNumber[0].replace(rxSplit, '$1,$2');
        } while (rxSplit.test(arrNumber[0]));

        if (arrNumber.length > 1) {
        	return arrNumber.join('');
        }
        else {
        	return arrNumber[0].split('.')[0];
        }
    }
}

/************************************************************************************************
(소숫점이 입력 box 처리)
(2002-12-11 6:27오후)
*************************************************************************************************/
function amtDecimals(obj, len) {
    var inputValue = obj.value;
    var numValue   = '0000000000';
    var strTmp;
    var returnValue;
	inputValue = GetRawAmt(inputValue);

    if(isNaN(inputValue) || inputValue == "")
    {
        strTmp = '0.' + numValue.substring(0,len);

        returnValue = strTmp;
    }
    else
    {
        var sPatt = /\,/g;  			            // Pattern 정의
	    inputValue = inputValue.replace(sPatt,"");  // comma를 blank로 변경

        if(inputValue.indexOf('.') == -1) inputValue += ".";
        inputValue += numValue;

        strTmp = inputValue.substring(0,inputValue.indexOf('.'));
        strTmp = ConvAmt(strTmp);
        strTmp += ".";
        strTmp += inputValue.substring(inputValue.indexOf('.')+1, inputValue.indexOf('.')+len+1);

        returnValue = strTmp;
    }

    obj.value = returnValue;
}


function amtDecimalCheck(value, len) {
    var inputValue = value;
    var numValue   = '0000000000';
    var strTmp;
    var returnValue;
	inputValue = GetRawAmt(inputValue);

    if(isNaN(inputValue) || inputValue == "")
    {
        strTmp = '0.' + numValue.substring(0,len);

        returnValue = strTmp;
    }
    else
    {
        var sPatt = /\,/g;  			            // Pattern 정의
	    inputValue = inputValue.replace(sPatt,"");  // comma를 blank로 변경

        if(inputValue.indexOf('.') == -1) inputValue += ".";
        inputValue += numValue;

        strTmp = inputValue.substring(0,inputValue.indexOf('.'));
        strTmp = ConvAmt(strTmp);
        strTmp += ".";
        strTmp += inputValue.substring(inputValue.indexOf('.')+1, inputValue.indexOf('.')+len+1);

        returnValue = strTmp;
    }

    return returnValue;
}

//-------------------------------------------------------------------
// 두 날짜 사이의 관계는 올바르게 정립되어 있는가 ?
// 날짜의 세팅이 Text로만 이루어져 있는 경우(2003-01-21 11:57오전)
//-------------------------------------------------------------------
function is_valid_date_with(s_date, e_date)
{
	var t_s_date = parseInt(parseFloat(getRawDate(s_date), 10), 10);
	var t_e_date = parseFloat(parseFloat(getRawDate(e_date), 10), 10);

	if (ChkDateFormat(s_date) == false)
	{
	//	s_date.focus();
		return false;
	}
	if (ChkDateFormat(e_date) == false)
	{
	//	e_date.focus();
		return false;
	}

	if (t_s_date > t_e_date)
	{
		alert('시작일이 종료일보다 큽니다.');
	//	e_date.focus();
		return false;
	}
	return true;
}
/************************************************************************************************
폼에서 필수입력값 체크 -- FKL (2002-12-03 10:22오후)
*************************************************************************************************/
function inputCheck(obj)
{
   var i=0;

   for(i=0;i<obj.length;i++)
    {
      if ((obj.item(i).className.substring(0,7).toUpperCase() == "INPUTPK") &&(obj.item(i).value == ""))
      {
         alert(obj.item(i).id + '을(를) 입력하세요');
         eval(obj.name + "." + obj.item(i).name + ".focus();");      //포커스이동 추가..
         return false;
      }
   }
   return true;
}

/************************************************************************************************
주민등록번호체크( FKL 2002-12-05)
*************************************************************************************************/
function juminCheck(jumin1,jumin2)
{
	var str_jumin1 = jumin1;
        var str_jumin2 = jumin2;
        var checkImg='';

       	var i3=0
        for (var i=0;i<str_jumin1.length;i++)
        {
        	var ch1 = str_jumin1.substring(i,i+1);
                if (ch1<'0' || ch1>'9') { i3=i3+1 }
        }

        if ((str_jumin1 == '') || ( i3 != 0 ))
                return false;

        var i4=0
        for (var i=0;i<str_jumin2.length;i++)
        {
                var ch1 = str_jumin2.substring(i,i+1);
                if (ch1<'0' || ch1>'9') { i4=i4+1 }
        }
        if ((str_jumin2 == '') || ( i4 != 0 ))
                return false;


        if(str_jumin1.substring(0,1) < 4)
                return false;

        if(str_jumin2.substring(0,1) > 2)
                return false;

        if((str_jumin1.length > 7) || (str_jumin2.length > 8))
                return false;

        if((str_jumin1 == '72') || ( str_jumin2 == '18'))
                return false;

        var f1=str_jumin1.substring(0,1)
        var f2=str_jumin1.substring(1,2)
        var f3=str_jumin1.substring(2,3)
        var f4=str_jumin1.substring(3,4)
        var f5=str_jumin1.substring(4,5)
        var f6=str_jumin1.substring(5,6)
        var hap=f1*2+f2*3+f3*4+f4*5+f5*6+f6*7
        var l1=str_jumin2.substring(0,1)
        var l2=str_jumin2.substring(1,2)
        var l3=str_jumin2.substring(2,3)
        var l4=str_jumin2.substring(3,4)
        var l5=str_jumin2.substring(4,5)
        var l6=str_jumin2.substring(5,6)
        var l7=str_jumin2.substring(6,7)
        hap=hap+l1*8+l2*9+l3*2+l4*3+l5*4+l6*5
        hap=hap%11
        hap=11-hap
        hap=hap%10
        if (hap != l7)
        {
          return false;
        }
        else
        {
          return true;
        }

        return false;
}
/***********************************************************************************
    전화번호 입력 formatting...
    argument     : input object
    return value : 없음.
    작성자       : FKL
***********************************************************************************/
function telFormat(obj)
{
   var tel = obj.value;
   var ddd = new Array('02' , '031', '032', '033', '041', '042', '043', '051', '052', '053', '054', '055', '061', '062', '063', '064', '011', '012', '013', '015', '016', '017', '018', '019');

   tel = tel.replace(/-/gi,"")

   if(tel.length < 8)
   {
//      alert('지역번호와 국번, 전화번호를 입력하여 주세요.');
//      obj.value = "";
      return;
   }
   else if(tel.substring(0,2) == ddd[0])
      tel = tel.substring(0,2) + '-' + tel.substring(2, tel.length-4) + '-' + tel.substring(tel.length, tel.length -4);
   else
      for(i=1; i<ddd.length; i++)
      {
         if(tel.substring(0,3) == ddd[i])
         {
            tel = tel.substring(0,3) + '-' + tel.substring(3, tel.length-4) + '-' + tel.substring(tel.length, tel.length -4);
         }
      }
   obj.value = tel;
   return;

//   alert('전화번호가 정확한지 확인하여 주세요.');
//   obj.value = "";

   return;
}
/***********************************************************************************
    소수점자리수 체크
    argument     : input object, 소숫점이하숫자의 갯수
    return value : 없음.
    작성자       : FKL
***********************************************************************************/
function checkDecimals(obj, decallowed)
{
   if (obj.value.indexOf('.') == -1) obj.value += ".0";
   dectext = obj.value.substring(obj.value.indexOf('.')+1, obj.value.length);

   if (dectext.length > decallowed)
   {
      alert ("소수점 " + decallowed + " 자리까지만 입력할 수 있습니다");
      obj.focus();
   }
}
/***********************************************************************************
    input에서 null->0
    argument     : input object
    return value :
    작성자       : FKL
***********************************************************************************/
function null2zero(obj)
{
   if(trim(obj.value) == '')
      obj.value = '0';
}

//사업자번호 체크 루틴
function chkWorkNumb(obj)
{

        var strNumb        =        Replace(obj.value,"-");
        if        (strNumb.length        !=        10)
        {
         	if (strNumb.length == 0 || strNumb.length == null){
         		return false;
         	} else {
                alert("사업자등록번호가 잘못되었습니다.");
                obj.focus();
            	obj.value = obj.defaultValue;
                return false;
            }
        }

        sumMod        =        0;
        sumMod        +=        parseInt(strNumb.substring(0,1));
        sumMod        +=        parseInt(strNumb.substring(1,2)) * 3 % 10;
        sumMod        +=        parseInt(strNumb.substring(2,3)) * 7 % 10;
        sumMod        +=        parseInt(strNumb.substring(3,4)) * 1 % 10;
        sumMod        +=        parseInt(strNumb.substring(4,5)) * 3 % 10;
        sumMod        +=        parseInt(strNumb.substring(5,6)) * 7 % 10;
        sumMod        +=        parseInt(strNumb.substring(6,7)) * 1 % 10;
        sumMod        +=        parseInt(strNumb.substring(7,8)) * 3 % 10;
        sumMod        +=        Math.floor(parseInt(strNumb.substring(8,9)) * 5 / 10);
        sumMod        +=        parseInt(strNumb.substring(8,9)) * 5 % 10;
        sumMod        +=        parseInt(strNumb.substring(9,10));

        if (sumMod % 10 != 0){
            alert("사업자등록번호가 잘못되었습니다.");
            obj.focus();
            obj.value = obj.defaultValue;

                return false;
        } else {

	        WorkFormat(obj);
	        return true;
	    }
}

//권한에 따른 점 리스트 CHECK
function CheckAll_Store(obj, acctut, gridId){
	var oGrid = igtbl_initGrid(gridId.id);
	var gs=igtbl_getGridById(gridId.id);
	var oRows = oGrid.Rows;
	var rowCount = oRows.length;
	
	
	if ( String(acctut).length == 1) {
		acctutTemp = "0" + String(acctut);
	} else if ( String(acctut).length == 0 || acctut == null ) {
		acctutTemp = acctut;
	} else{
		acctutTemp = String(acctut);
	}
	
	if(obj.checked == true){
		for(i = 0 ;i < rowCount ; i ++){
				oRows.getRow(i).getCell(0).setValue(true);
		}
	} else if (obj.checked == false) {
		for(i = 0 ;i < rowCount ; i ++){
				oRows.getRow(i).getCell(0).setValue(false);
		}
	}
}	


//찬복추가
function fnd_ChkNumBer(field) 
{ 
	var valid = "0123456789., "
	// 유효한 값 
	var ok = "yes"; 
	var temp; 
	var cnt= 0; 
	for (var i=0; i<field.length; i++) { 
		temp = "" + field.substring(i, i+1); 
		if (valid.indexOf(temp) == "-1") ok = "no"; 
		if (".".indexOf(temp) != "-1") cnt = cnt + 1; 
		if (cnt >= 2) ok="no"; 
	} 
	if (ok == "no") { 
		return false; 
	} 
	return true; 
} 

function fnd_onTxtChkNumBer(strobj) 
{ 
	var field = strobj.value;
	if (!fnd_ChkNumBer(field)) {
		alert("숫자만 입력할 수 있습니다.");
		strobj.value = "";
		strobj.focus();
	}
	return false;
}


function getFileExtension(filename) {
    var ext = /^.+\.([^.]+)$/.exec(filename);
    return ext == null ? "" : ext[1];
}

function lenH(str) {
    var i, sum = 0;
    for (i = 0; i < str.length; i++) sum += (str.charCodeAt(i) > 255 ? 2 : 1);
    return sum;
}

function replace(sValue, param1, param2) {
    if (sValue == undefined) return '';
    sValue = sValue.toString();
    return sValue.split(param1).join(param2);
}

function Mid(str, start, len) {
    // Make sure start and len are within proper bounds
    if (start < 0 || len < 0) return "";
    var iEnd, iLen = String(str).length;
    if (start + len > iLen)
        iEnd = iLen;
    else
        iEnd = start + len - 1;
    return String(str).substring(start - 1, iEnd);
}


function trim(str) {
    if (str != undefined && str != null) {
        str = ltrim(str);
        str = rtrim(str);
        return str;
    }
    return "";
}


/*
==================================================================================
문자열내의왼쪽공백을제거
==================================================================================
*/
function ltrim(str) {
    str = str.toString();
    var iLen = str.length;
    var idx = 0;
    for (idx = 0; idx < iLen; idx++) {
        if (str.charAt(idx) != ' ') break
    }
    return str.substring(idx, iLen);
}
/*
==================================================================================
문자열내의오른쪽공백을제거
==================================================================================
*/
function rtrim(str) {
    str = str.toString();
    var iLen = str.length;
    var idx = 0;
    for (idx = iLen - 1; idx >= 0; idx--) {
        if (str.charAt(idx) != ' ') break;
    }
    return str.substring(0, idx + 1);
}


function right(str, n) {
    if (n <= 0) return "";
    else if (n > String(str).length)
        return str;
    else {
        var iLen = String(str).length;
        return String(str).substring(iLen, iLen - n);
    }
}

function len(str) {    
    var tmp;
    var len = 0;
    tmp = str;
    len = tmp.length;
    return len;
}

function Len(str) {    
    var tmp;
    var len = 0;
    tmp = str;
    len = tmp.length;
    return len;
}


function left(str, n) {
    if (n <= 0)
        return "";
    else if (n > String(str).length)
        return str;
    else
        return String(str).substring(0, n);
}

function isDate(sDate) {
    var scratch;
    if (sDate.length == 10) {
        scratch = new Date(getyear(sDate), getmonth(sDate), getDay(sDate));
    } else if (sDate.length == 8) {
        scratch = new Date(getyear(sDate), getmonth(sDate), getDay(sDate));
    }
    else {
        return false;
    }

    if (scratch.toString() == "NaN" || scratch.toString() == "Invalid Date") {
        //alert("Not a Date");
        return false;
    } else {
        return true;

    }
}


function getmonth(str) {
    if (str.length == 10) {
        return str.substring(5, 7);
    }
    else if (str.length == 8) {
        return str.substring(4, 6);
    }
    else {
        return false;
    }
}
function getyear(str) {
    if (str.length == 10) {
        return str.substring(0, 4);
    } else if (str.length == 8) {
        return str.substring(0, 4);
    }
    else {
        return false;
    }
}
function getDay(str) {
    if (str.length == 10) {
        return str.substring(8, 10);
    }
    else if (str.length == 8) {
        return str.substring(6, 8);
    }
    else {
        return false;
    }
}

function datediff(interval, fromDate, toDate) {
    /*
    * DateFormat month/day/year hh:mm:ss
    * ex.
    * datediff('01/01/2011 12:00:00','01/01/2011 13:30:00','seconds');
    */
    var second = 1;
    var minute = second * 6;
    var hour = minute * 6;
    var day = hour * 24;
    var week = day * 7;
    //var one_day = 100 * 60 * 60 * 24;
    var one_day = 6 * 6 * 24;
    var sdate = trim(replace(fromDate, "-", ""));
    var edate = trim(replace(toDate, "-", ""));
    var month = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    var days = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
    var i;
    var year, mon;
    var year2, mon2, day2;

    year = parseInt(sdate.substring(0, 4),10);
    mon = sdate.substring(4, 6);
    for (i = 0; i <= month.length - 1; i++) {
        if (month[i] == mon) {
            mon = i + 1;
            break;
        }
    }
    day = sdate.substring(6, 8);
    for (i = 0; i <= days.length - 1; i++) {
        if (days[i] == day) {
            day = i + 1;
            break;
        }
    }

    year2 = parseInt(edate.substring(0, 4),10);
    mon2 = edate.substring(4, 6);
    for (i = 0; i <= month.length - 1; i++) {
        if (month[i] == mon2) {
            mon2 = i + 1;
            break;
        }
    }
    day2 = edate.substring(6, 8);
    for (i = 0; i <= days.length - 1; i++) {
        if (days[i] == day2) {
            day2 = i + 1;
            break;
        }
    }
    var toDate;
    var fromDate;
    var timediff;
    var ret;    
    switch (interval) {
        case "years":
        case "y":

            var Sdate = sdate.substring(6, 8) + "/" + sdate.substring(4, 6) + "/" + sdate.substring(0, 4);
            var Edate = edate.substring(6, 8) + "/" + edate.substring(4, 6) + "/" + edate.substring(0, 4);
            fromDate = new Date(Sdate);
            toDate = new Date(Edate);
            ret = toDate.getFullYear() - fromDate.getFullYear();
            break;
        case "months":
        case "m":

            var Sdate = sdate.substring(6, 8) + "/" + sdate.substring(4, 6) + "/" + sdate.substring(0, 4);
            var Edate = edate.substring(6, 8) + "/" + edate.substring(4, 6) + "/" + edate.substring(0, 4);
            fromDate = new Date(Sdate);
            toDate = new Date(Edate);
            ret = ((toDate.getFullYear() * 12 + mon2) - (fromDate.getFullYear() * 12 + mon));
            break;
        case "weeks":
        case "w":
            toDate = new Date(year2, mon2 - 1, day2) / 100000;
            fromDate = new Date(year, mon - 1, day) / 100000;
            timediff = toDate - fromDate;
            ret = Math.floor(timediff / week);
            break;
        case "days":
        case "d":
            toDate = new Date(year2, mon2 - 1, day2) / 100000;
            fromDate = new Date(year, mon - 1, day) / 100000;
            timediff = toDate - fromDate;
            ret = Math.floor((toDate - fromDate) / one_day);
            break;
        case "hours":
        case "h":
            toDate = new Date(year2, mon2 - 1, day2) / 100000;
            fromDate = new Date(year, mon - 1, day) / 100000;
            timediff = toDate - fromDate;
            ret = Math.floor(timediff / hour); break;
        default: ret = undefined; break;
    }
    return ret;
}


function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function CalcAmt(AmtDiv, fTotalAmt) {

    var Minus;

    if (fTotalAmt >= 0) {
        Minus = 1;        
    } else {
        Minus = -1;
    }

    if (AmtDiv == "1") {    //전단위절 
        return parseInt(fTotalAmt);
    }
    else if (AmtDiv == "2") { //전단위절상
        return parseInt(fTotalAmt + (parseFloat(0.9) * Minus))
    }
    else if (AmtDiv == "3") { //전단위반올림
        return Calc_Round(fTotalAmt);
    }
    else if (AmtDiv == "4") { //원단위절 (=한전금액 계산방식:10원미만절 )
        return parseInt(fTotalAmt * parseFloat(0.1)) * 10
    }
    else if (AmtDiv == "5") { //원단위절상
        return parseInt((fTotalAmt * parseFloat(0.1)) + (parseFloat(0.9) * Minus)) * 10;
    }
    else if (AmtDiv == "6") { //원단위반올림
        return Calc_Round(fTotalAmt / 10) * 10;
    }
    else if (AmtDiv == "7") { //백단위절 
        return parseInt(fTotalAmt * parseFloat(0.01)) * 100;
    }
    else if (AmtDiv == "8") { //백단위절상
        return parseInt((fTotalAmt * parseFloat(0.01)) + (parseFloat(0.9) * Minus)) * 100;
    }
    else if (AmtDiv == "9") { //백단위반올림
        return Calc_Round(fTotalAmt / 100) * 100;
    }
    else {
        return fTotalAmt;
    }
}

function Calc_Round(Use) {

    var Str;
    var Temp_Use;
    var Minus;

    if (Use >= 0) {
        Minus = 1;
    } else {
        Minus = -1;
    }

    Use = Use * Minus;

    Str = Use.toString();
    Temp_Use = Str.split(".");
    if (Temp_Use == null || Temp_Use == undefined) {
        //alert('Calc_Round_error');
        return 0;
    }

    if (Temp_Use.length > 0) {

        if (Temp_Use[1] == "5") {
            return parseInt(Use + 0.6) * Minus;
        } else {
            return parseInt(Use + 0.5) * Minus;
        }
    } else {
        return parseInt(Use + 0.5) * Minus;
    }

}

//텍스트 박스에 포커스를 옮길때 사용 - 날짜 사이의 "-"를 없애준다. 
function fnd_ReValue(strObj) {
    var strValue, strDate;
    var ilength, imsi, i;
    strDate = "";
    if (!strObj.value == "") {
        strValue = strObj.value;
        ilength = strValue.length;
        for (i = 1; i <= ilength; i++) {

            imsi = Mid(strValue, i, 1);

            if (imsi == "-") continue

            strDate = strDate + imsi;

        }
        strObj.value = strDate;
        strObj.select();
    }
    else {
        strObj.value = "";

    }
}

function isValidDate(param) {
    try {
        param = param.replace(/-/g, '');

        // 자리수가 맞지않을때
        if (isNaN(param) || param.length != 8) {
            return false;
        }

        var year = Number(param.substring(0, 4));
        var month = Number(param.substring(4, 6));
        var day = Number(param.substring(6, 8));

        var dd = day / 0;


        if (month < 1 || month > 12) {
            return false;
        }

        var maxDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var maxDay = maxDaysInMonth[month - 1];

        // 윤년 체크
        if (month == 2 && (year % 4 == 0 && year % 100 != 0 || year % 400 == 0)) {
            maxDay = 29;
        }

        if (day <= 0 || day > maxDay) {
            return false;
        }
        return true;

    } catch (err) {
        return false;
    }
}

function cdbl(arg) {
    if (trim(arg) != '') {
        return parseFloat(arg);
    }
    else {
        return 0;
    }
}

function get_info_IE() { 
    var word; 
    var agent = navigator.userAgent.toLowerCase(); 
    var info = {name: "N/A", version: -1}; 
    if (navigator.appName == "Microsoft Internet Explorer"){    // IE old version ( IE 10 or Lower ) 
        word = "msie "; 
    } 
    else if (agent.search("trident" ) > -1) word = "trident/.*rv:";    // IE 11 
    else if (agent.search( "edge/" ) > -1) word = "edge/";        // Microsoft Edge 
    else  { 
        return info;    // etc. ( If it's not IE or Edge ) 
    } 
    var reg = new RegExp( word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})" ); 
    if (reg.exec(agent) != null){ 
            info.version = parseFloat(RegExp.$1 + RegExp.$2); 
            info.name = (word == "edge/") ? "Edge" : "IE"; 
    } 
    return info; 
} 

