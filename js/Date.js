/**
* ��¥���� �ڹٽ�ũ��Ʈ �����Լ�
*
* �д��� ����(= ��)�� ������� �ʾҽ��ϴ�.
* YYYYMMDDHHMI ������ String => 'Time'���� Ī��
*
* �ַ� YYYYMMDD ������ ���δٸ� �Ʒ� �Լ�����
* YYYYMMDD ������ String => 'Date'�� �Ͽ� ������
* �����Ͻðų� �ƴϸ� �Լ���, ������� isValidDate()ó��,
* �߰��Ͻñ� �ٶ��ϴ�.
*
*/


/**
* ��ȿ��(�����ϴ�) ��(��)���� üũ
*/
function isValidMonth(mm) {
    var m = parseInt(mm,10);
    return (m >= 1 && m <= 12);
}

/**
* ��ȿ��(�����ϴ�) ��(��)���� üũ
*/
function isValidDay(yyyy, mm, dd) {
    var m = parseInt(mm,10) - 1;
    var d = parseInt(dd,10);

    var end = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
    if ((yyyy % 4 == 0 && yyyy % 100 != 0) || yyyy % 400 == 0) {
        end[1] = 29;
    }

    return (d >= 1 && d <= end[m]);
}

/**
* ��ȿ��(�����ϴ�) ��(��)���� üũ
*/
function isValidHour(hh) {
    var h = parseInt(hh,10);
    return (h >= 1 && h <= 24);
}

/**
* ��ȿ��(�����ϴ�) ��(��)���� üũ
*/
function isValidMin(mi) {
    var m = parseInt(mi,10);
    return (m >= 1 && m <= 60);
}

/**
* Time �������� üũ(������ üũ)
*/
function isValidTimeFormat(time) {
    return (!isNaN(time) && time.length == 12);
}

/**
* ��ȿ�ϴ�(�����ϴ�) Time ���� üũ

* ex) var time = form.time.value; //'200102310000'
*     if (!isValidTime(time)) {
*         alert("�ùٸ� ��¥�� �ƴմϴ�.");
*     }
*/
function isValidTime(time) {
    var year  = time.substring(0,4);
    var month = time.substring(4,6);
    var day   = time.substring(6,8);
    var hour  = time.substring(8,10);
    var min   = time.substring(10,12);

    if (parseInt(year,10) >= 1900  && isValidMonth(month) &&
        isValidDay(year,month,day) && isValidHour(hour)   &&
        isValidMin(min)) {
        return true;
    }
    return false;
}

/**
* Time ��Ʈ���� �ڹٽ�ũ��Ʈ Date ��ü�� ��ȯ
* parameter time: Time ������ String
*/
function toTimeObject(time) { //parseTime(time)
    var year  = time.substr(0,4);
    var month = time.substr(4,2) - 1; // 1��=0,12��=11
    var day   = time.substr(6,2);
    var hour  = time.substr(8,2);
    var min   = time.substr(10,2);

    return new Date(year,month,day,hour,min);
}

/**
* �ڹٽ�ũ��Ʈ Date ��ü�� Time ��Ʈ������ ��ȯ
* parameter date: JavaScript Date Object
*/
function toTimeString(date) { //formatTime(date)
    var year  = date.getFullYear();
    var month = date.getMonth() + 1; // 1��=0,12��=11�̹Ƿ� 1 ����
    var day   = date.getDate();
    var hour  = date.getHours();
    var min   = date.getMinutes();

    if (("" + month).length == 1) { month = "0" + month; }
    if (("" + day).length   == 1) { day   = "0" + day;   }
    if (("" + hour).length  == 1) { hour  = "0" + hour;  }
    if (("" + min).length   == 1) { min   = "0" + min;   }

    return ("" + year + month + day + hour + min)
}

/**
* Time�� ����ð� ����(�̷�)���� üũ
*/
function isFutureTime(time) {
    return (toTimeObject(time) > new Date());
}

/**
* Time�� ����ð� ����(����)���� üũ
*/
function isPastTime(time) {
    return (toTimeObject(time) < new Date());
}

/**
* �־��� Time �� y�� m�� d�� h�� ���̳��� Time�� ����

* ex) var time = form.time.value; //'20000101000'
*     alert(shiftTime(time,0,0,-100,0));
*     => 2000/01/01 00:00 ���κ��� 100�� �� Time
*/
function shiftTime(time,y,m,d,h) { //moveTime(time,y,m,d,h)
    var date = toTimeObject(time);

    date.setFullYear(date.getFullYear() + y); //y���� ����
    date.setMonth(date.getMonth() + m);       //m���� ����
    date.setDate(date.getDate() + d);         //d���� ����
    date.setHours(date.getHours() + h);       //h�ø� ����

    return toTimeString(date);
}

/**
* �� Time�� �� ���� ���̳����� ����

* time1�� time2���� ũ��(�̷���) minus(-)
*/
function getMonthInterval(time1,time2) { //measureMonthInterval(time1,time2)
    var date1 = toTimeObject(time1);
    var date2 = toTimeObject(time2);

    var years  = date2.getFullYear() - date1.getFullYear();
    var months = date2.getMonth() - date1.getMonth();
    var days   = date2.getDate() - date1.getDate();

    return (years * 12 + months + (days >= 0 ? 0 : -1) );
}

/**
* �� Time�� ��ĥ ���̳����� ����
* time1�� time2���� ũ��(�̷���) minus(-)
*/
function getDayInterval(time1,time2) {
    var date1 = toTimeObject(time1);
    var date2 = toTimeObject(time2);
    var day   = 1000 * 3600 * 24; //24�ð�

    return parseInt((date2 - date1) / day, 10);
}

/**
* �� Time�� �� �ð� ���̳����� ����

* time1�� time2���� ũ��(�̷���) minus(-)
*/
function getHourInterval(time1,time2) {
    var date1 = toTimeObject(time1);
    var date2 = toTimeObject(time2);
    var hour  = 1000 * 3600; //1�ð�

    return parseInt((date2 - date1) / hour, 10);
}

/**
* ���� �ð��� Time �������� ����

*/
function getCurrentTime() {
    return toTimeString(new Date());
}

/**
* ���� �ð��� y�� m�� d�� h�� ���̳��� Time�� ����
*/
function getRelativeTime(y,m,d,h) {
/*
    var date = new Date();

    date.setFullYear(date.getFullYear() + y); //y���� ����
    date.setMonth(date.getMonth() + m);       //m���� ����
    date.setDate(date.getDate() + d);         //d���� ����
    date.setHours(date.getHours() + h);       //h�ø� ����

    return toTimeString(date);
*/
    return shiftTime(getCurrentTime(),y,m,d,h);
}

/**
* ���� Ҵ�� YYYY�������� ����
*/
function getYear() {
/*
    var now = new Date();
    return now.getFullYear();
*/
    return getCurrentTime().substr(0,4);
}

/**
* ���� ���� MM�������� ����
*/
function getMonth() {
/*
    var now = new Date();

    var month = now.getMonth() + 1; // 1��=0,12��=11�̹Ƿ� 1 ����
    if (("" + month).length == 1) { month = "0" + month; }

    return month;
*/
    return getCurrentTime().substr(4,2);
}

/**
* ���� ���� DD�������� ����

*/
function getDay() {
/*
    var now = new Date();

    var day = now.getDate();
    if (("" + day).length == 1) { day = "0" + day; }

    return day;
*/
    return getCurrentTime().substr(6,2);
}

/**
* ���� ���� HH�������� ����
*/
function getHour() {
/*
    var now = new Date();

    var hour = now.getHours();
    if (("" + hour).length == 1) { hour = "0" + hour; }

    return hour;
*/
    return getCurrentTime().substr(8,2);
}

/**
* ������ ���� �����̾�?

* ex) alert('������ ' + getDayOfWeek() + '�����Դϴ�.');
* Ư�� ��¥�� ������ ���Ϸ���? => �������� ���� ����� ������.
*/
function getDayOfWeek() {
    var now = new Date();

    var day = now.getDay(); //�Ͽ���=0,������=1,...,�����=6
    var week = new Array('��','��','ȭ','��','��','��','��');

    return week[day];
}

// ��¥ üũ �Լ�
function isDate(sDate) {
    var strValue;
    var strYear, strMonth, strDay, ilength, imsi;
    var arrItem = new Array();

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

    strValue = sDate.replace(/-/gi, "");

    if (fnd_ChkNumBer(strValue)) {
        // ���ڷθ� �̷���������� �Ǵ��Ѵ�. 
        if (strValue.length == 8) {
            strYear = strValue.substring(0, 4);
            strMonth = strValue.substring(4, 6);
            strDay = strValue.substring(6, 8);

            // ���� ����� �ԷµǾ����� �Ǵ��Ѵ�.
            if ((strMonth < "01") || (strMonth > "12")) {
                return false;
            }

            if ((strDay < "01") || (strDay > arrItem[parseInt(strMonth)])) {
                return false;
            }

            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

// ���� üũ �Լ�
function fnd_ChkNumBer(field) {
    var valid = "0123456789., ";
    // ��ȿ�� �� 
    var ok = "yes";
    var temp;
    var cnt = 0;
    for (var i = 0; i < field.length; i++) {
        temp = "" + field.substring(i, i + 1);
        if (valid.indexOf(temp) == "-1") ok = "no";
        if (".".indexOf(temp) != "-1") cnt = cnt + 1;
        if (cnt >= 2) ok = "no";
    }
    if (ok == "no") {
        return false;
    }
    return true;
}
