var sessionTimeout = 10;
var hour = sessionTimeout;
var min = 0;
var sec = 0;
var t;

function DisplaySessionTimeout()
{
    document.getElementById("spnSessionTime").innerText = TwoDigit(hour) + ":" + TwoDigit(min) + ":" + TwoDigit(sec);
    if ((sec == 0) && (min == 0) && (hour == 0)) {
        sessionStorage.setItem('sessionTimeout', true);
        fncLogout();
        CenterPopup('/SessionTimeout.htm', 'sessionwarning', 580, 280, 'toolbar=no,menubar=no,resizable=no,status=no,scrollbars=no');
        return;
    }
    else {
        if ((sec == 0) && (min == 5) && (hour == 0)) {
            document.getElementById("spnSessionTime").innerText = TwoDigit(hour) + ":" + TwoDigit(min) + ":" + TwoDigit(sec);
            CenterPopup('/SessionWarning.htm', 'sessionwarning', 580, 280, 'toolbar=no,menubar=no,resizable=no,status=no,scrollbars=no');
        } 
        sec -= 1;
        if (sec < 0) {
            sec = 59;
            min -= 1;
        }
        if (min < 0) {
            min = 59;
            hour -= 1;
        }
        t = setTimeout("DisplaySessionTimeout()", 1000);
    }
}
function iniTimeout() {
    hour = sessionTimeout;
    min = 0;
    sec = 0;
    ifrm.location.href = '/BDMaster_Trans.aspx';
    return false;
}
function TwoDigit(val) {
    if (String(val).length < 2) {
        val = '0' + val;
    }
    return val;
}
//window.onload = DisplaySessionTimeout;
$(document).ready(function() {
    DisplaySessionTimeout();
});