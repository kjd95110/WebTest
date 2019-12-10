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
/*| Description : url�� querystring�� ���� |*/ 
/*| Argument : üũ�� querystring ��  |*/ 
/*| Return : querystring�� ����  |*/ 
/*[] ------------------------------------------------------------------ []*/ 
function request_querystring(ars_name) 
{ 
    var lo_result = new Array; 
    var ls_url_query = location.search; // url���� ? ������ ���ڿ� 
    var lo_array1 = new Array; // & �� �и���Ų ���� ���迭 
    var lo_array2 = new Array; // = �� �и���Ų ���� ���迭 
    var i = 0; 
    ls_url_query = ls_url_query.slice(1); // ù���� ?�� �ڸ��� 
    lo_array1 = ls_url_query.split("&"); // & �迭�� ������. 
    for(i=0; i< lo_array1.length; i++) { 
        lo_array2 = lo_array1[i].split("="); // = �迭������ 
        lo_result[lo_array2[0]] = lo_array2[1]; // ����� lo_result�� ���� 
    } 
    if (lo_result[ars_name] != null) { 
        return lo_result[ars_name]; 
    } else { 
        return false; 
    } 
}

// 20100630 added by mkkim (acct)

/* ��¥ */
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
        alert("�������� ��¥������ �ùٸ��� �ʽ��ϴ�.");
        obj1.select();
        return false;
    } else {
        if (str1.substring(4, 6) > 12) {
            alert("�������� ���� �ùٸ��� �ʽ��ϴ�.");
            obj1.select();
            return false;
        }
        if (str1.substring(7, 9) > 31) {
            alert("�������� ���ڰ� �ùٸ��� �ʽ��ϴ�.");
            obj1.select();
            return false;
        }
    }

    var str2 = obj2.value.replace("-", "");
    if (str2.length < 8) {
        alert("�������� ��¥������ �ùٸ��� �ʽ��ϴ�.");
        obj2.select();
        return false;
    }
    else {
        if (str2.substring(4, 6) > 12) {
            alert("�������� ���� �ùٸ��� �ʽ��ϴ�.");
            obj2.select();
            return false;
        }
        if (str2.substring(7, 9) > 31) {
            alert("�������� ���ڰ� �ùٸ��� �ʽ��ϴ�.");
            obj2.select();
            return false;
        }
    }
}

/* --- ���ڸ� �Է� ���� (onKeyDown �̺�Ʈ) --- */
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

/* --- ���ڸ� ���� --- */
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
