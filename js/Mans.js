	function fnd_ChkNumBer(field) { 
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
      function lenH(str){
          var i,sum=0;
          for(i=0;i<str.length;i++) sum+=(str.charCodeAt(i) > 255? 2:1);
          return sum;
      }

      function LenH(str) {
          var i, sum = 0;
          for (i = 0; i < str.length; i++) sum += (str.charCodeAt(i) > 255 ? 2 : 1);
          return sum;
      }
        
 