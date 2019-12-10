var DateConst = 86400000; //(24*60*60*10000) //�ð��� ����ϱ����� �Ϸ������ ������ ���� ��
var fujitsu_objectA		= new Object();
var fujitsu_objectB		= new Object();
var fujitsu_WSresult	= new Array(); // Webservice���� �Ѱܿ� ���� �����ϱ����� String Array
var fujitsu_POPresult	= new Array(); // PopUp�����쿡 Row�� ����Ŭ���Ұ�� Row�� �� ������ ���� �����ϱ����� String Array
var fujitsu_EvtobjID; //HomeŰ�� ���� Object�� ID���� ���� �ִ� ����
var DeleteRow = true;
var fujitsu_Argument	= new Object();
var fujitsu_ResultCount = new Array();
var AfterCellUpdateFlag = true;
//============================================================
//WebService Behavior�� �̿��Ͽ� �ڵ�� �������� Function
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

//WebService Behavior�� ��� ���� �ޱ����� Function
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


//WebService Behavior�� ��� ���� �ޱ����� Function
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

//�����˾�ó���� ���� �Լ�
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
			alert("�˾�â�� �����ڵ带 �Է��Ͻʽÿ�");
		
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



//�����˾�ó���� ���� �Լ� for UltraWebGrid
//--------------------------------------------------------------------------
// ù��° ���� : �˾�����, �ι�° ���� : ��ȸ ��
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
		alert("�˾�â�� �����ڵ带 �Է��Ͻʽÿ�");
	}
}


//Status Bar�� �����α� �Է���
function WriteError(strValue){
	if ( strValue == "" || strValue == null ) {
		WebMainButton1_lblMsg2.innerHTML = "";
	} else {
		WebMainButton1_lblMsg2.innerHTML = "<font color=red><nobr>" + strValue + "</nobr></font>";
	}
}

//Status Bar�� �����α� �Է���
function WriteMainError(strValue){
	if ( strValue == "" || strValue == null ) {
		WebMainButton1_lblMsg1.innerHTML = "";
	} else {
		WebMainButton1_lblMsg1.innerHTML = "<font color=red><nobr>" + strValue + "</nobr></font>";
	}
}
//***************************************************************************************
//***************************************************************************************
// ULTRAWEBGRID ���� �Լ� ����
//***************************************************************************************
//***************************************************************************************
//CELL ������ ������Ʈ �� �� ó���Ǵ� FUNCTION
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

// GRID������ KeyDown �� ��� ó���Ǵ� function
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
						// flag�� �ƹ��͵� ���� ���� ���¿��� delete row
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
						alert("���� ���� �� ���� �� �� �ֽ��ϴ�");
					}
					
				} else if(cell.getValue() == "U"){
					// 'D' �÷��׸� �ڰ� image ����
					AfterCellUpdateFlag = false;
					cell.Element.style.backgroundImage = "url(/MD/images/Delete.png)";
					cell.setValue("D");
					AfterCellUpdateFlag = true;
					
				} else if(cell.getValue() == "D"){
						// 'U' �÷��� �ڰ� Image ����
						cell.Element.style.backgroundImage = "url()";
						AfterCellUpdateFlag = false;
						cell.setValue("");
						AfterCellUpdateFlag = true;
				} else {
					// ������ 'D' �÷��� �ڰ� Image ����
					cell.Element.style.backgroundImage = "url(/MD/images/Delete.png)";
					AfterCellUpdateFlag = false;
					cell.setValue("D");
					AfterCellUpdateFlag = true;
				}
			} else {
				if ( cell.getValue() == "I"){
					if ( row.getSelected() == true){
						// flag�� �ƹ��͵� ���� ���� ���¿��� delete row
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
						alert("���� ���� �� ���� �� �� �ֽ��ϴ�");
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

//ROW �߰�
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

//ROW �߰� �� �� ó���Ǵ� �Լ�
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
// ULTRAWEBGRID ���� �Լ� ����
//***************************************************************************************
//***************************************************************************************


/*
==================================================================================
ActiveX��¥���� check(YYYY-MM-DD) OR YYYY-MM
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
			alert("���ڸ� �ٸ��� �Է��ϼ���");
			input.focus();
		}
	}
	else	{
		if (input.value.length != 10) {
			input.style.backgroundColor = "yellow";	
			alert("���ڸ� �ٸ��� �Է��ϼ���");
			input.focus();
		}
	}
}


/*
==================================================================================
ActiveX��¥���� check
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
ActiveX��¥ ǥ�� 
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
tag control ǥ�� 
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
�Է°��� NULL���� üũ
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
�Է°��� NULL���� üũ�Ͽ� ����ȯ
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
�Է°��� �����̽� �̿��� �ǹ��ִ� ���� �ִ��� üũ
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
�Է°��� Ư�� ����(chars)�� �ִ��� üũ
Ư�� ���ڸ� ������� ������ �� �� ���
ex) if (containsChars(form.name,"!,*&^%$#@~;")) {
         alert("�̸� �ʵ忡�� Ư�� ���ڸ� ����� �� �����ϴ�.");
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
�Է°��� Ư�� ����(chars)������ �Ǿ��ִ��� üũ
 Ư�� ���ڸ� ����Ϸ� �� �� ���
 ex) if (!containsCharsOnly(form.blood,"ABO")) {
         alert("������ �ʵ忡�� A,B,O ���ڸ� ����� �� �ֽ��ϴ�.");
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
�Է°��� ���ĺ����� üũ
 �Ʒ� isAlphabet() ���� isNumComma()������ �޼ҵ尡
 ���� ���̴� ��쿡�� var chars ������
 global ������ �����ϰ� ����ϵ��� �Ѵ�.
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
�Է°��� ���ĺ� �빮������ üũ
==================================================================================
*/
function isUpperCase(obj) {
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return containsCharsOnly(obj,chars);
}
/*
==================================================================================
�Է°��� ���ĺ� �ҹ������� üũ
==================================================================================
*/
function isLowerCase(obj) {
    var chars = "abcdefghijklmnopqrstuvwxyz";
    return containsCharsOnly(obj,chars);
}
/*
==================================================================================
�Է°��� ���ڸ� �ִ��� üũ
==================================================================================
*/
function isNumber(obj) {
   var chars = ". ,0123456789";
   if (!containsCharsOnly(obj,chars)) {
		alert("���ڸ� �Է��� �� �ֽ��ϴ�.");
		return false;
    }
    return true; 
}
/*
==================================================================================
�Է°��� ���ڸ� �ִ��� üũ
==================================================================================
*/
function isNumber2(obj) {
    var chars = "-. ,0123456789";
    if (!containsCharsOnly(obj,chars)) {
		alert("���ڸ� �Է��� �� �ֽ��ϴ�.");
		return false;
    }
    return true; 
}
/*
==================================================================================
�Է°��� ���ĺ�,���ڷ� �Ǿ��ִ��� üũ
==================================================================================
*/
function isAlphaNum(obj) {
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return containsCharsOnly(obj,chars);
}


/*
==================================================================================
�Է°��� ����,���(-)�� �Ǿ��ִ��� üũ
==================================================================================
*/
function isNumDash(obj) {
    var chars = "-0123456789";
    return containsCharsOnly(obj,chars);
}
/*
==================================================================================
�Է°��� ����,�޸�(,)��(.)���� �Ǿ��ִ��� üũ
==================================================================================
*/
function isNumComma(obj) {
    var chars = ".,0123456789";
    return containsCharsOnly(obj,chars);
}
/*
==================================================================================
�Է°����� �޸��� ���ش�.
==================================================================================
*/
function removeComma(obj) {
    return obj.value.replace(/,/gi,"");
}
/*
==================================================================================
�Է°��� ����ڰ� ������ ���� �������� üũ
�ڼ��� format ������ �ڹٽ�ũ��Ʈ�� 'regular expression'�� ����
==================================================================================
*/
function isValidFormat(obj,format) {
    if (obj.value.search(format) != -1) {
        return true; //�ùٸ� ���� ����
    }
    return false;
}
/*
==================================================================================
�Է°��� �̸��� �������� üũ
==================================================================================
*/

function isValidEmail(obj) {
//    var format = /^(\S+)@(\S+)\.([A-Za-z]+)$/;
    var format = /^((\w|[\-\.])+)@((\w|[\-\.])+)\.([A-Za-z]+)$/;
    return isValidFormat(obj,format);
}
/*
==================================================================================
�Է°��� ��ȭ��ȣ ����(����-����-����)���� üũ
==================================================================================
*/
function isValidPhone(obj) {
    var format = /^(\d+)-(\d+)-(\d+)$/;
    return isValidFormat(obj,format);
}
/*
==================================================================================
�Է°��� ����Ʈ ���̸� ����
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
��� 6�ڸ� ��¥ valid Check
valid�̸� YYYY-MM�� �������� ����
invalid�̸� ""�� ����
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
����� 8�ڸ� ��¥ valid Check
valid�̸� YYYY/MM/DD�� �������� ����
invalid�̸� ""�� ����
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
6�ڸ� YYMMDD ��¥�� 8�ڸ� YYYYMMDD ��¥�� ��ȯ
sDate = '01-11-11' �̷� ���µ� ����
==================================================================================
*/
function toYYYYMMDD(sDate) {
	sDate = getRawDate(sDate);
	if(sDate.length!=6) return "";

	return "20"+sDate;
}
/*
==================================================================================
8�ڸ� YYYYMMDD ��¥�� 6�ڸ� YYMMDD�� RAW ��¥�� ��ȯ
sDate = '2001-11-11' �̷� ���µ� ����
==================================================================================
*/
function toYYMMDD(sDate) {
	sDate = getRawDate(sDate);
	if(sDate.length!=8) return "";

	return sDate.substring(2,8);
}
/*
==================================================================================
6�ڸ� YYYYMM �� 8�ڸ� YYYYMMDD ��¥�� 6�ڸ� YYYYMM�� RAW ��¥�� ��ȯ
sDate = '2001-11-11' or '2001-11' �̷� ���µ� ����
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
4�ڸ� �ð� valid Check
valid�̸� HH:MM�� �������� ����
invalid�̸� ""�� ����
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
6�ڸ� �ð� valid Check
valid�̸� HH:MM:SS�� �������� ����
invalid�̸� ""�� ����
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
��¥�Է°����� �������� '/', '.', '-',':' ���� �����Ͽ� ����
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
��¥�� üũ�ϰ� YYYY.MM.DD�� convert
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
���ڿ����� ����, �������� ������ ����
==================================================================================
*/
function trim(str) {
	str = ltrim( str );
	str = rtrim( str );
	return str;
}
/*
==================================================================================
���ڿ����� ���� ������ ����
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
���ڿ����� ������ ������ ����
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
�����ڸ� �������� �� ������ �и��Ͽ� �迭�� Return
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
�����ȣ���� '-'�� �����ϴ� �Լ�
==================================================================================
*/
function getRawZip(samt) {
	if(samt==null || samt=="") return "";
	return samt.replace( /-/g,"");
}
/*
==================================================================================
�����ȣ�� '-'�� ���� �������� ��ȯ
==================================================================================
*/
function convertZip(sval) {
	sval = getRawZip(sval);
	if(sval.length!=6) return "";

	return sval.substring(0,3) + "-" + sval.substring(3,6);
}
/*
==================================================================================
�Է°����� �������� '/', '.', '-',':' ���� �����Ͽ� ����
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
�ֹε�Ϲ�ȣ�� üũ�� �� '-'�� ���� �������� ��ȯ
==================================================================================
*/
function personalIDCheck(sID) {
	sID = getRawData(sID);
	if(sID.length!=13) return "";

	return sID.substring(0,6)+"-"+sID.substring(6,13);
}
/*
==================================================================================
�ݾ��� ���ڷ� ��ȯ�ϱ� ���� �Լ�
==================================================================================
*/
function GetRawAmt(samt) {
	if(samt == "") return "0";
	var sPatt = /\,/g;  			// Pattern ����
	var sVal = samt.replace(sPatt,"");  // comma�� blank�� ����
	return sVal;
}
/*
==================================================================================
���ڸ� �ݾ����� ��ȯ
==================================================================================
*/
function ConvAmt(sval) {
	var sRst="";  // �����
	var iOrd=sval.length;  // ����
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
�����ڸ� �������� �� ������ �и��Ͽ� �迭�� Return - Null ���
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
��¥��������
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
		alert("��¥ ������ �ƴմϴ�.");
		input.value = input.defaultValue;
		input.focus();
		return false;
	} else return true
}


/*
==================================================================================
���� �ڸ��� ����
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
��� Ÿ��Ʋ �̵�
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
������ ������ ����� Layer ������ ����
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
�Է¹ڽ���¥ ����1
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
�ݾ�����
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
�Է¹ڽ���¥ ����2
==================================================================================
*/
function checkDate(obj)
{
	var tempVal = getRawDate(obj.value);
	if( (tempVal.length != 0) && (tempVal.length != 8) ) {
		alert(" ��¥������ YYYY/MM/DD �Դϴ�.");
		obj.value = obj.defaultValue;
		obj.focus();
		return false;
	} else {
		if( (obj.value.length != 0) && (isYYYYMMDD(obj.value) == "") )
		{
			alert(" �ùٸ� ��¥�� �ƴմϴ�. ");
			obj.value = obj.defaultValue;
			obj.focus();
			return false;
		}
		obj.value = isYYYYMMDD(obj.value);
	}
}
/*
==================================================================================
�Է¹ڽ� �� ��¥ ����1
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
�Է¹ڽ� �� ��¥ ����2
==================================================================================
*/
function checkMonth(obj)
{
	var tempVal = getRawDate(obj.value);
	if( (tempVal.length != 0) && (tempVal.length != 6) ) {
		alert(" ��¥������ YYYY-MM �Դϴ�.");
		obj.value = obj.defaultValue;
		obj.focus();
	} else {
		if( (obj.value.length != 0) && (isYYYYMM(obj.value) == "") )
		{
			alert(" �ùٸ� ��¥�� �ƴմϴ�. ");
			obj.value = obj.defaultValue;
			obj.focus();
		}
		obj.value = isYYYYMM(obj.value);
	}
}

/*
==================================================================================
�Է¹ڽ��� ���ڸ� �Է�
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
����Ű Ŭ���� �ش� �ʵ�� ��Ŀ�� �̵�
==================================================================================
*/
// IE9 �̻���� window.event.keyCode = 9; ����ȵǼ� �ڵ�и�
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
����,����check
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
������ư Clear
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
������ ���� ��ư�� index ��ȣ ��������
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
�˻���ư �̹��� ����
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
�ش� ���� TEXT,RADIO,CHECKBOX,SELECT Clear
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
//�ֹε�Ϲ�ȣ üũ
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
//�ֹε�Ϲ�ȣ üũ ��
****************************************/

/*(F)***************************************************************
 �� ��  : ��¥ ����
 �� ��  : 1. �⵵�� ���� ����
	     2. ���� ���� ����
  		 3. ���� ���� ����
 �μ�   : 1.sStyle("y"-����,"m"-��,"d"-��)
  		 2.nDiff(����)
  		 3.sDate : ����
 Return  : ���� - ����� ��¥(YYYY-MM-DD),����-""
 �ۼ���   : FKL    �ۼ��� : 2002-12-21
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
		alert("��¥ ������ �ƴմϴ�.1");
		return "";
	}

	/* ���̰� ���� ���� �˻� */
	if(nRDiff == "NaN"){
		alert("���� ������ �ƴմϴ�.");
		return "";
	}
	/* (���� 8�ڸ� ��¥) */
	sDate = getRawDate(sDate);

	switch(sStyle.toUpperCase()){
		case "Y" :			/* �����̸� ���� */
			sRDate = (parseInt(sDate.substr(0,4)) + nRDiff) + "/" + sDate.substr(4,2) + "/" + sDate.substr(6,2);
			return sRDate;

		case "M" :			/* �����̸� ���� */
			nYear = parseInt(sDate.substr(0,4));
			nMonth = parseInt(sDate.substr(4,2));
			nMonth = parseInt(nMonth) + parseInt(nRDiff);

			if(nMonth <= 0){
				/* (�⵵) */
				nYear = parseInt(nYear) + parseInt(nMonth / 12);
				nYear = nYear - 1;

				/* (��) */
				nModMonth = nMonth % 12;
				nMonth = 12 + nModMonth;
			}
			else if(nMonth > 12){
				//�⵵
				nYear = parseInt(nYear) + parseInt(nMonth / 12);
				//��
				nMonth = nMonth % 12;
			}
			else{
				nYear = sDate.substr(0,4);
			}
			//(���� ���ڸ��� ����)
			if(nMonth <= 9){
				nMonth = "0" + nMonth;
			}


			//(��¥)
			nDay = sDate.substr(6,2);

			//(�ش縻�� ��¥ üũ(�ش���� ���������� ���� ū���� �����϶�)
			nLastDay = parseInt(FLastDay(nYear + "" + nMonth));
         nDay = parseInt(nDay);
			if(nLastDay < parseInt(nDay))
				nDay = nLastDay
			//��¥�� ���ڸ��� ����)
			if(nDay <= 9)
				nDay = "0" + nDay;

			sRDate =nYear + "/" + nMonth + "/" + nDay;

			return sRDate;
		case "D" :			/* ��¥���̸� ���� */
			nYear = sDate.substr(0,4);
			nMonth = sDate.substr(4,2);
			nDay = sDate.substr(6,2);

			sRDate = new Date((nYear * 1),(nMonth * 1) - 1,(nDay * 1));

			//(��¥ ����-�и��������� ������)
			sRDate.setTime(sRDate.getTime() + (nRDiff * DateConst));

			//(������)
			nMonth = "";
			nMonth = sRDate.getMonth() + 1;



			//�ڸ����� ���ڸ��� �����
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
 �� ��  : ���� ������ ���ڸ� ���Ѵ�.
 �� ��  : 1. �⵵�� ���� ����
  		   2. ���� ���� ����
  		   3. ���� ���� ����
 �μ�   : 1.sStyle("y"-����,"m"-��,"d"-��)
  		   2.nDiff(����)
  		   3.sDate : ����
 Return  : ���� - ���� ��������,����-(-1)
 �ۼ��� : FKL    �ۼ��� : 2002-12-21
*******************************************************************/
function FLastDay(sDate){
	//���� ��¥����
	sDate = getRawDate(sDate);
	alert(sDate);
	return false;

	if(sDate.length != 6){
		alert("��¥ ������ �ƴմϴ�.");
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
		/* (�⵵) */
		nYear = parseInt(nYear) + parseInt(nMonth / 12);
		nYear = nYear - 1;

		/* (��) */
		nModMonth = nMonth % 12;
		nMonth = 12 + nModMonth;
	}
	else if(nMonth > 12){

		//�⵵
		nYear = parseInt(nYear) + parseInt(nMonth / 12);
		//��
		nMonth = nMonth % 12;
	}
	else{
		nYear = sDate.substr(0,4);
	}
	if(nMonth <= 9){
		nMonth = "0" + nMonth;
	}
	nDay = "01";
	//(��¥ ����-�и��������� ������)
	sRDate = new Date(nYear,parseInt(nMonth) - 1,parseInt(nDay));
	sRDate.setTime(sRDate.getTime() - parseInt(DateConst));

	return (sRDate.getDate());
}
/************************************************************************************************
(0 ~ 9 ������ �������� �˻��ϰ� ���̰� 0 �̻��̸� ���� ��ŭ 0�� ä����.
objValue : value, len : ����
�ۼ��� : FKL (2002-12-10 10:39����)
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
(�Ҽ����� �����ϴ� ���ڸ� �ݾ����� ��ȯ�Ѵ�.
�ۼ��� : FKL (2002-12-10 10:39����)
*************************************************************************************************/
function amtFormatDot(srcNumber, len) {
	var txtNumber = '' + srcNumber.toFixed(len);

    if (isNaN(txtNumber) || txtNumber == "") {
    	alert("���ڸ� �Է� �ϼ���");
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
(�Ҽ����� �Է� box ó��)
(2002-12-11 6:27����)
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
        var sPatt = /\,/g;  			            // Pattern ����
	    inputValue = inputValue.replace(sPatt,"");  // comma�� blank�� ����

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
        var sPatt = /\,/g;  			            // Pattern ����
	    inputValue = inputValue.replace(sPatt,"");  // comma�� blank�� ����

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
// �� ��¥ ������ ����� �ùٸ��� �����Ǿ� �ִ°� ?
// ��¥�� ������ Text�θ� �̷���� �ִ� ���(2003-01-21 11:57����)
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
		alert('�������� �����Ϻ��� Ů�ϴ�.');
	//	e_date.focus();
		return false;
	}
	return true;
}
/************************************************************************************************
������ �ʼ��Է°� üũ -- FKL (2002-12-03 10:22����)
*************************************************************************************************/
function inputCheck(obj)
{
   var i=0;

   for(i=0;i<obj.length;i++)
    {
      if ((obj.item(i).className.substring(0,7).toUpperCase() == "INPUTPK") &&(obj.item(i).value == ""))
      {
         alert(obj.item(i).id + '��(��) �Է��ϼ���');
         eval(obj.name + "." + obj.item(i).name + ".focus();");      //��Ŀ���̵� �߰�..
         return false;
      }
   }
   return true;
}

/************************************************************************************************
�ֹε�Ϲ�ȣüũ( FKL 2002-12-05)
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
    ��ȭ��ȣ �Է� formatting...
    argument     : input object
    return value : ����.
    �ۼ���       : FKL
***********************************************************************************/
function telFormat(obj)
{
   var tel = obj.value;
   var ddd = new Array('02' , '031', '032', '033', '041', '042', '043', '051', '052', '053', '054', '055', '061', '062', '063', '064', '011', '012', '013', '015', '016', '017', '018', '019');

   tel = tel.replace(/-/gi,"")

   if(tel.length < 8)
   {
//      alert('������ȣ�� ����, ��ȭ��ȣ�� �Է��Ͽ� �ּ���.');
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

//   alert('��ȭ��ȣ�� ��Ȯ���� Ȯ���Ͽ� �ּ���.');
//   obj.value = "";

   return;
}
/***********************************************************************************
    �Ҽ����ڸ��� üũ
    argument     : input object, �Ҽ������ϼ����� ����
    return value : ����.
    �ۼ���       : FKL
***********************************************************************************/
function checkDecimals(obj, decallowed)
{
   if (obj.value.indexOf('.') == -1) obj.value += ".0";
   dectext = obj.value.substring(obj.value.indexOf('.')+1, obj.value.length);

   if (dectext.length > decallowed)
   {
      alert ("�Ҽ��� " + decallowed + " �ڸ������� �Է��� �� �ֽ��ϴ�");
      obj.focus();
   }
}
/***********************************************************************************
    input���� null->0
    argument     : input object
    return value :
    �ۼ���       : FKL
***********************************************************************************/
function null2zero(obj)
{
   if(trim(obj.value) == '')
      obj.value = '0';
}

//����ڹ�ȣ üũ ��ƾ
function chkWorkNumb(obj)
{

        var strNumb        =        Replace(obj.value,"-");
        if        (strNumb.length        !=        10)
        {
         	if (strNumb.length == 0 || strNumb.length == null){
         		return false;
         	} else {
                alert("����ڵ�Ϲ�ȣ�� �߸��Ǿ����ϴ�.");
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
            alert("����ڵ�Ϲ�ȣ�� �߸��Ǿ����ϴ�.");
            obj.focus();
            obj.value = obj.defaultValue;

                return false;
        } else {

	        WorkFormat(obj);
	        return true;
	    }
}

//���ѿ� ���� �� ����Ʈ CHECK
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


//�����߰�
function fnd_ChkNumBer(field) 
{ 
	var valid = "0123456789., "
	// ��ȿ�� �� 
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
		alert("���ڸ� �Է��� �� �ֽ��ϴ�.");
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
���ڿ����ǿ��ʰ���������
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
���ڿ����ǿ����ʰ���������
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

    if (AmtDiv == "1") {    //�������� 
        return parseInt(fTotalAmt);
    }
    else if (AmtDiv == "2") { //����������
        return parseInt(fTotalAmt + (parseFloat(0.9) * Minus))
    }
    else if (AmtDiv == "3") { //�������ݿø�
        return Calc_Round(fTotalAmt);
    }
    else if (AmtDiv == "4") { //�������� (=�����ݾ� �����:10���̸��� )
        return parseInt(fTotalAmt * parseFloat(0.1)) * 10
    }
    else if (AmtDiv == "5") { //����������
        return parseInt((fTotalAmt * parseFloat(0.1)) + (parseFloat(0.9) * Minus)) * 10;
    }
    else if (AmtDiv == "6") { //�������ݿø�
        return Calc_Round(fTotalAmt / 10) * 10;
    }
    else if (AmtDiv == "7") { //������� 
        return parseInt(fTotalAmt * parseFloat(0.01)) * 100;
    }
    else if (AmtDiv == "8") { //���������
        return parseInt((fTotalAmt * parseFloat(0.01)) + (parseFloat(0.9) * Minus)) * 100;
    }
    else if (AmtDiv == "9") { //������ݿø�
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

//�ؽ�Ʈ �ڽ��� ��Ŀ���� �ű涧 ��� - ��¥ ������ "-"�� �����ش�. 
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

        // �ڸ����� ����������
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

        // ���� üũ
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

