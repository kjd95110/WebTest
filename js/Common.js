function setCookie(name, value, expires) {
    document.cookie = name + "=" + escape(value) + ";path=/; expires=" + expires.toGMTString();
}

function getCookie(name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while(i< clen) {
        var j = i + alen;
        if(document.cookie.substring(i,j)==arg) {
            var end = document.cookie.indexOf(";",j);
            if(end == -1)
            end = document.cookie.length;
            return unescape(document.cookie.substring(j,end));
        }
        i=document.cookie.indexOf(" ",i)+1;
        if (i==0) break;
    }
    return null;
}

/*[] ------------------------------------------------------------------ []*/ 
/*| Function : request_querystring(ars_name) |*/ 
/*| Description : url의 querystring을 리턴 |*/ 
/*| Argument : 체크할 querystring 값  |*/ 
/*| Return : querystring을 리턴  |*/ 
/*[] ------------------------------------------------------------------ []*/ 
function request_querystring(ars_name) 
{ 
    var lo_result = new Array; 
    var ls_url_query = location.search; // url에서 ? 부터의 문자열 
    var lo_array1 = new Array; // & 로 분리시킨 값이 들어갈배열 
    var lo_array2 = new Array; // = 로 분리시킨 값이 들어갈배열 
    var i = 0; 
    ls_url_query = ls_url_query.slice(1); // 첫문자 ?는 자르고 
    lo_array1 = ls_url_query.split("&"); // & 배열로 나눈다. 
    for(i=0; i< lo_array1.length; i++) { 
        lo_array2 = lo_array1[i].split("="); // = 배열나누기 
        lo_result[lo_array2[0]] = lo_array2[1]; // 결과를 lo_result에 저장 
    } 
    if (lo_result[ars_name] != null) { 
        return lo_result[ars_name]; 
    } else { 
        return false; 
    } 
}

// 20100630 added by mkkim (acct)

/* 날짜 */
function YyyymmddFormat(obj) {
    var str = onlyNum(obj.value);
    var leng = str.length;
    if (event.keyCode != 8) {
        switch (leng) {
            case 1: obj.value = str; break;
            case 2: obj.value = str; break;
            case 3: obj.value = str; break;
            case 4: obj.value = str.substring(0, 4) + "-"; break;
            case 5: obj.value = str.substring(0, 4) + "-" + str.substring(4, 6); break;
            case 6: obj.value = str.substring(0, 4) + "-" + str.substring(4, 6) + "-"; break;
            case 7: obj.value = str.substring(0, 4) + "-" + str.substring(4, 6) + "-" + str.substring(6, 8); break;
            case 8: obj.value = str.substring(0, 4) + "-" + str.substring(4, 6) + "-" + str.substring(6, 8); break;
        }
    }
}
function SearchDateChk(obj1, obj2) {
    var str1 = obj1.value.replace("-", "");
    if (str1.length < 8) {
        alert("시작일의 날짜형식이 올바르지 않습니다.");
        obj1.select();
        return false;
    } else {
        if (str1.substring(4, 6) > 12) {
            alert("시작일의 월이 올바르지 않습니다.");
            obj1.select();
            return false;
        }
        if (str1.substring(7, 9) > 31) {
            alert("시작일의 일자가 올바르지 않습니다.");
            obj1.select();
            return false;
        }
    }

    var str2 = obj2.value.replace("-", "");
    if (str2.length < 8) {
        alert("시작일의 날짜형식이 올바르지 않습니다.");
        obj2.select();
        return false;
    }
    else {
        if (str2.substring(4, 6) > 12) {
            alert("시작일의 월이 올바르지 않습니다.");
            obj2.select();
            return false;
        }
        if (str2.substring(7, 9) > 31) {
            alert("시작일의 일자가 올바르지 않습니다.");
            obj2.select();
            return false;
        }
    }
}

/* --- 숫자만 입력 가능 (onKeyDown 이벤트) --- */
function onlyNumberInput() {
    var code = window.event.keyCode;
    if ((code > 34 && code < 41) || (code > 47 && code < 58) || (code > 95 && code < 106) || code == 8 || code == 9 || code == 13 || code == 46) {
        window.event.returnValue = true;
        return;
    }
    window.event.returnValue = false;
}

function Datechk(obj) {
    var str = onlyNum(obj.value);
    var leng = str.length;
    if (leng == 7) {
        obj.value = str.substring(0, 4) + "-" + str.substring(4, 6) + "-" + "0" + str.substring(6, 7);
    }
}

/* --- 숫자만 리턴 --- */
function c(val) {
    var num = val;
    var tmp = "";

    for (var i = 0; i < num.length; i++) {
        if (num.charAt(i) >= 0 && num.charAt(i) <= 9)
            tmp = tmp + num.charAt(i);
        else
            continue;
    }
    return tmp;
}


function onlyNum(val) {
    var num = val;
    var tmp = "";

    for (var i = 0; i < num.length; i++) {
        if (num.charAt(i) >= 0 && num.charAt(i) <= 9)
            tmp = tmp + num.charAt(i);
        else
            continue;
    }
    return tmp;
}
