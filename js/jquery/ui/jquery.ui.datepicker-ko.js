(function(factory) {
    if (typeof define === "function" && define.amd) {

        // AMD. Register as an anonymous module.
        define(["../widgets/datepicker"], factory);
    } else {

        // Browser globals
        factory(jQuery.datepicker);
    }
} (function(datepicker) {

    datepicker.regional.ko = {
        closeText: "닫기",
        prevText: "이전달",
        nextText: "다음달",
        currentText: "오늘",
        monthNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
        monthNamesShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
        dayNames: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
        dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
        dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
        weekHeader: "주",
        dateFormat: "yy-mm-dd",
        firstDay: 0,
        isRTL: false,
        showMonthAfterYear: true,
        changeYear: true,
        changeMonth: true,
        showButtonPanel: true,
        /*
        onClose: function() {
            fncClose();
        },
        */
        yearSuffix: "년 "
    };
    datepicker.setDefaults(datepicker.regional.ko);

    return datepicker.regional.ko;

}));

$(document).ready(function() {
    var isOpenDP;
    $('.datepicker').focus(function() {
        $(this).select();
    }).blur(function() {
        if ($(this).val() != '') {
            if (isDate($(this).val())) {
                $(this).val($(this).val().replace(/-/g, ''));
                $(this).val($(this).val().substr(0, 4) + '-' + $(this).val().substr(4, 2) + '-' + $(this).val().substr(6, 2));
            } else {
                if (!isOpenDP) {
                    alert('날짜를 올바르게 입력해주세요');
                    $(this).focus();
                }
            }
        }
    }).datepicker({
        beforeShow: function() { isOpenDP = true },
        onClose: function() { isOpenDP = false; }
    });

    $('.datepicker-nohp').focus(function() {
        $(this).val($(this).val().replace(/-/g, '')).select();
    }).blur(function() {
        if ($(this).val() != '') {
            if (isDate($(this).val())) {
            } else {
                if (!isOpenDP) {
                    alert('날짜를 올바르게 입력해주세요');
                    $(this).focus();
                }
            }
        }
    }).datepicker({
        dateFormat: 'yymmdd',
        beforeShow: function() { isOpenDP = true },
        onClose: function() { isOpenDP = false; }
    });

    $('.datepicker-dbl').focus(function() {
        $(this).val($(this).val().replace(/-/g, '')).select();
    }).blur(function() {
        if ($(this).val() != '') {
            if (isDate($(this).val())) {
                $(this).val($(this).val().replace(/-/g, ''));
                $(this).val($(this).val().substr(0, 4) + '-' + $(this).val().substr(4, 2) + '-' + $(this).val().substr(6, 2));
            } else {
                if (!isOpenDP) {
                    alert('날짜를 올바르게 입력해주세요');
                    $(this).focus();
                }
            }
        }
    }).dblclick(function() {
        isOpenDP = true;
        if (isDate($(this).val())) {
            $(this).val($(this).val().replace(/-/g, ''));
            $(this).val($(this).val().substr(0, 4) + '-' + $(this).val().substr(4, 2) + '-' + $(this).val().substr(6, 2));
        }
        $(this).datepicker({
            onClose: function() {
                $(this).datepicker('destroy');
                isOpenDP = false;
            }
        }).datepicker('show');
    });

    $('.datepicker-dbl-nohp').focus(function() {
        $(this).val($(this).val().replace(/-/g, '')).select();
    }).blur(function() {
        if ($(this).val() != '') {
            if (isDate($(this).val())) {
            } else {
                if (!isOpenDP) {
                    alert('날짜를 올바르게 입력해주세요');
                    $(this).focus();
                }
            }
        }
    }).dblclick(function() {
        isOpenDP = true;
        $(this).datepicker({
            dateFormat: 'yymmdd',
            onClose: function() {
                $(this).datepicker('destroy');
                isOpenDP = false;
            }
        }).datepicker('show');
    });
});

// 날짜 체크 함수
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
        // 숫자로만 이루어졌는지를 판단한다. 
        if (strValue.length == 8) {
            strYear = strValue.substring(0, 4);
            strMonth = strValue.substring(4, 6);
            strDay = strValue.substring(6, 8);

            // 월이 제대로 입력되었는지 판단한다.
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

// 숫자 체크 함수
function fnd_ChkNumBer(field) {
    var valid = "0123456789., ";
    // 유효한 값 
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