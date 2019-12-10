			
	function fnd_ChkNumBer(field) {
	    var valid = "0123456789., ";
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
	
	function fnd_onTxtChkNumBer(strobj) { 
		var field = strobj.value;
		if (!fnd_ChkNumBer(field)) {
			alert("숫자만 입력할 수 있습니다.");
			strobj.value = "";
			strobj.focus();
		} else {
			strobj.value = field;
		}
		return false;
}


function insert_row(myGridID) {
    var item = init_new_row(myGridID);
    AUIGrid.addRow(myGridID, item, "last");
}
function init_new_row(myGridID) {
    var item = {}; // 새행 아이템
    var columns = AUIGrid.getColumnInfoList(myGridID); // 현재 그리드 칼럼 정보
    for (var i = 0, len = columns.length; i < len; i++) {
        item[columns[i].dataField] = ''; // 데이터 필드 '' 으로 초기화
    }
    return item;
}

function isDate_rec(sDate) {
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
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}

function dayDiff(d1, d2) {
    var year = getyear(d1);
    var month = getmonth(d1);
    var date = getDay(d1);
    var startDate = new Date(year, month - 1, date);

    var endYear = getyear(d2);
    var endMonth = getmonth(d2);
    var endDate = getDay(d2)
    var endDate = new Date(endYear, endMonth - 1, endDate);
    endDate.setDate(endDate.getDate() + 1);

    return ((startDate - endDate) / (24 * 3600 * 1000) + 1);
}

function GetNo(szText) {
    //출력된 코드와 명칭을 분류하는 함수
    //[코드]코드명 중에서 코드를 찾는다.
    var i, nStart, nEnd, szReturn;

    nStart = -1
    nEnd = -1

    nStart = szText.indexOf('[');
    if (nStart >= 0) {
        nEnd = szText.indexOf(']');
    }

    if (nStart != -1 && nEnd != -1) {
        szText = szText.substr(nStart + 1, 1);
    }
    return szText
}

function GetName(szText) {
    //출력된 코드와 명칭을 분류하는 함수
    //[코드]코드명 중에서 [ ]를 제외한 이름 추출

    var iLength = 0, iStart = -1;

    iLength = szText.length;
    iStart = szText.indexOf(']');

    if (iLength > 0 && iStart != -1) {
        szText = szText.substr(iStart + 1, iLength - (iStart + 1));
    }
    return szText

}
//날짜를 처리하기 위한 스크립트함수 
function fndCalendar_Click_js(strObj) {
    var strValue;
    var strYear, strMonth, strDay;
    var curDate;
    var strYMD;

    if (strObj.value != '') {
        strValue = strObj.value;
        strYMD = strValue.substr(0, 4) + '-' + strValue.substr(4, 2) + '-' + strValue.substr(6, 2);
        curDate = strYMD;
    } else {
        strObj.value = '';
        strYMD = '';
        curDate = '';
    }

    if (fnd_ChkValue_js(strObj)) {
        var rValue;
        //rValue = window.showModalDialog("/Common/tools/Cal2.aspx?strYMD=" + strYMD, curDate, "dialogHeight:200px;dialogWidth:206px;center:yes;status:no;scroll:no;help:no");
        rValue = window.showModalDialog("/Common/tools/Cal.aspx?strYMD=" + strYMD, curDate, "dialogHeight:200px;dialogWidth:206px;center:yes;status:no;scroll:no;help:no");
        if (rValue != undefined) {
            strObj.value = rValue;
        }
    }
    
}

//텍스트 박스에 포커스를 옮길때 사용 - 날짜 사이의 "-"를 없애준다. 
function fnd_ReValue_js(strObj) {
    var strValue, strDate;
    var ilength, imsi, i;
    strDate = "";
    if (strObj.value != '') {
        strValue = strObj.value.replace(/-/g, '').replace(/ /g, '');
        ilength = strValue.length;
        for (i = 0; i < ilength; i++) {
            imsi = strValue.substr(i, 1);
            if (imsi != "-") {
                strDate = strDate + imsi;
            }

        }
        strObj.value = strDate;
    } else {
        strObj.value = '';
    }
    strObj.select();
}

//날짜의 형식을 맞추기 위해 사용 - 날짜 사이의 "-"를 삽입한다.[날짜오류체크함]
function fnd_ChkValue_js(strObj) {
    var strValue, strDate;
    var strYear, strMonth, strDay, ilength, imsi;
    var arrItem = [];
    var i;

    arrItem[1] = "31";
    arrItem[2] = "29";
    arrItem[3] = "31";
    arrItem[4] = "30";
    arrItem[5] = "31";
    arrItem[6] = "30";
    arrItem[7] = "31";
    arrItem[8] = "31";
    arrItem[9] = "30";
    arrItem[10] = "31";
    arrItem[11] = "30";
    arrItem[12] = "31";

    if (strObj.value != '') {
        strValue = strObj.value;
        ilength = strValue.length;
        strDate = '';

        for (i = 0; i < ilength; i++) {
            imsi = strValue.substr(i, 1);
            if (imsi != "-") {
                strDate = strDate + imsi;
            }
        }
        strValue = strDate;
        if (fnd_ChkNumBer(strValue) || isDate(strValue)) {
            if (strValue.length == 8) {
                strYear = strValue.substr(0, 4);
                strMonth = strValue.substr(4, 2);
                strDay = strValue.substr(6, 2);
                //월이 제대로 입력되었는지 판단한다.
                if (strMonth < '01' || strMonth > '12') {
                    alert('입력한 날짜중 "월"의 입력이 잘못되었습니다. \n\n다시 입력하세요.');
                    strObj.focus();
                    return false;
                }
                if (strDay < '01' || strDay > arrItem[parseInt(strMonth, 10)]) {
                    alert('입력한 날짜중 "일"의 입력이 잘못되었습니다. \n\n다시 입력하세요.');
                    strObj.focus();
                    return false;
                }
                strObj.value = strYear + "-" + strMonth + "-" + strDay;
            } else {
                alert("날짜형식이 틀립니다. \n\n다시 입력하세요.");
                strObj.focus();
                return false;
            }
        } else {
            alert("숫자만 입력할 수 있습니다. \n\n다시 입력하세요.");
            strObj.value = "";
            strObj.focus();
            return false;
        }
    } else {
        strObj.value = '';
    }
    return true;
}
//날짜의 형식을 맞추기 위해 사용 - 날짜 사이의 "-"를 삽입한다. [날짜오류체크안함]
function fnd_ChkValue_No_js(strObj) {
    var strValue, strDate;
    var strYear, strMonth, strDay, ilength, imsi;
    var arrItem = [];
    var i;

    arrItem[1] = "31";
    arrItem[2] = "29";
    arrItem[3] = "31";
    arrItem[4] = "30";
    arrItem[5] = "31";
    arrItem[6] = "30";
    arrItem[7] = "31";
    arrItem[8] = "31";
    arrItem[9] = "30";
    arrItem[10] = "31";
    arrItem[11] = "30";
    arrItem[12] = "31";

    if (strObj.value != '') {
        strValue = strObj.value;
        ilength = strValue.length;
        strDate = '';

        for (i = 0; i < ilength; i++) {
            imsi = strValue.substr(i, 1);
            if (imsi != "-") {
                strDate = strDate + imsi;
            }
        }
        strValue = strDate;
        if (fnd_ChkNumBer(strValue) || isDate(strValue)) {
            if (strValue.length == 8) {
                strYear = strValue.substr(0, 4);
                strMonth = strValue.substr(4, 2);
                strDay = strValue.substr(6, 2);
                strObj.value = strYear + "-" + strMonth + "-" + strDay;
            } else {
                alert("날짜형식이 틀립니다. \n\n다시 입력하세요.");
                strObj.focus();
                return false;
            }
        } else {
            alert("숫자만 입력할 수 있습니다. \n\n다시 입력하세요.");
            strObj.value = "";
            strObj.focus();
            return false;
        }
    } else {
        strObj.value = '';
    }
    return true;
}


function fndChangeDate(tmpDate) {
    var Str = $.trim(tmpDate);
    if (Str == '') return '';

    return Str.replace(/-/g, "");
}

function fndChkDateMi_js(tmpDate) {
    var strYear, strMonth, strDay, arrItem = [];

    tmpDate = tmpDate.replace(/-/g, '');
    arrItem[1] = "31"; arrItem[2] = "29"; arrItem[3] = "31";
    arrItem[4] = "30"; arrItem[5] = "31"; arrItem[6] = "30";
    arrItem[7] = "31"; arrItem[8] = "31"; arrItem[9] = "30";
    arrItem[10] = "31"; arrItem[11] = "30"; arrItem[12] = "31";

    strYear = tmpDate.substr(0, 4);
    strMonth = tmpDate.substr(4, 2);
    strDay = tmpDate.substr(6, 2);

    if (tmpDate.length != 8) return false;

    if ((strMonth < "01") || (strMonth > "12")) return false;

    if ((strDay < "01") || (strDay > arrItem[parseInt(strMonth, 10)])) return false;

    return true;

}

function Display_MessageBox1_txtMsgBox(obj, msg) {
//    $(obj).val(msg);
//    setTimeout(function() { $(obj).val(""); }, 10000);
}


function fndChangeDate_js(tmpDate) {
    return tmpDate.replace(/-/g, '');    
}
////날짜를 처리하기 위한 스크립트함수 
//function fndCalendar_CalcDay_Click(strObj) {
//    fndCalendar_Click(strObj);
//    var strdate = "";
//    var ilength, imsi, i;
//    if (!strObj.value == "") {
//        strvalue = $.trim(replace(strObj.value, "-", ""));
//        ilength = Len(strvalue);
//        for (i = 1; i <= ilength; i++) {
//            imsi = Mid(strvalue, i, 1);
//            if (imsi == "-") {
//                continue;
//            }
//            strdate = strdate + imsi;
//        }
//        strObj.value = strdate;
//    } else {
//        strObj.value = "";
//    }
//    strObj.select();

//    CalcDay();
//}

////날짜를 처리하기 위한 스크립트함수 
//function fndCalendar_CalcDay2_Click(strObj) {
//    fndCalendar_Click(strObj);
//    var strdate = "";
//    var ilength, imsi, i;
//    if (!strObj.value == "") {
//        strvalue = $.trim(replace(strObj.value, "-", ""));
//        ilength = Len(strvalue);
//        for (i = 1; i <= ilength; i++) {
//            imsi = Mid(strvalue, i, 1);
//            if (imsi == "-") {
//                continue;
//            }
//            strdate = strdate + imsi;
//        }
//        strObj.value = strdate;
//    } else {
//        strObj.value = "";
//    }
//    strObj.select();

//}

////날짜를 처리하기 위한 스크립트함수 
//function fndCalendar_Click(strObj) {
//    var strValue;
//    var strYear, strMonth, strDay;
//    var curDate, strYMD, rValue;

//    if (!strObj.value == "") {
//        strYMD = Mid(strValue, 1, 4) + "-" + Mid(strValue, 6, 2) + "-" + Mid(strValue, 9, 2);
//        strYMD = strObj.value;
//        curDate = strYMD;
//    }
//    else {
//        strObj.value = "";
//        strYMD = "";
//        curDate = "";
//    }

//    rValue = window.showModalDialog("/common/tools/Cal2.aspx?strYMD=" + strYMD, curDate, "dialogHeight:230px;dialogWidth:240px;center:yes;status:no;scroll:no;help:no");
//    if (rValue != undefined) {
//        strObj.value = rValue;
//    }
//}

function dateAdd(sDate, t, v) {

    sDate = sDate.replace(/-/g,'')
    var tDate = new Date(parseInt(sDate.substr(0, 4)), parseInt(sDate.substr(4, 2)) - 1, parseInt(sDate.substr(6, 2)));
    var yyyy;
    var mm;
    var dd;
    var yyyymmdd;

    if (t == "d") {
        yyyy = tDate.getFullYear();
        mm = tDate.getMonth();
        dd = tDate.getDate() + parseInt(v);
    } else if (t == "m") {
        yyyy = tDate.getFullYear();
        mm = tDate.getMonth() + parseInt(v);
        dd = tDate.getDate();
    } else if (t == "y") {
        yyyy = tDate.getFullYear() + parseInt(v);
        mm = tDate.getMonth();
        dd = tDate.getDate();
    } else {
        yyyy = tDate.getFullYear();
        mm = tDate.getMonth();
        dd = tDate.getDate() + parseInt(v);
    }

    yyyymmdd = new Date(yyyy, mm, dd);

    yyyy = yyyymmdd.getFullYear();
    mm = yyyymmdd.getMonth() + 1;
    mm = (mm < 10) ? "0" + mm : mm;
    dd = yyyymmdd.getDate();
    dd = (dd < 10) ? "0" + dd : dd;

    return yyyy.toString() + "-" + mm.toString() + "-" + dd.toString();

}

function confirmation() {
    var defer = $.Deferred();
    $('#recdate_warning')
    .dialog({
        width: 'auto',
        autoOpen: true,
        modal: true,
        title: '주의!! 수납일자확인!',
        buttons: {
            "1": { id: 'continue', width: 80, text: '네', click: function() {
                defer.resolve("true");
                $(this).dialog("close");
            }, "class": "btntrue"
            },
            "2": { id: 'close', width: 80, text: '아니오', click: function() {
                defer.resolve("false");
                $(this).dialog("close");
            }
            }
        },
        close: function() {
            defer.resolve("false");
        }
    }).parents(".ui-dialog").find(".ui-dialog-titlebar").remove();
    return defer.promise();
};