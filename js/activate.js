// 1. makeActiveXspd ::: spread 활성화
function makeActiveXspd(sId){
  var sstr = '<OBJECT id='+ sId +' style="LEFT: 0px; WIDTH: 0px; TOP: 0px; HEIGHT: 0px" codeBase="/Common/CAB/fpSpr60.CAB" classid="CLSID:41F841C0-AE16-11D5-8817-0050DA6EF5E5" VIEWASTEXT><PARAM NAME="_Version" VALUE="393216"><PARAM NAME="_ExtentX" VALUE="0"><PARAM NAME="_ExtentY" VALUE="0"><PARAM NAME="_StockProps" VALUE="64"><PARAM NAME="Enabled" VALUE="-1"><PARAM NAME="AllowCellOverflow" VALUE="0"><PARAM NAME="AllowDragDrop" VALUE="0"><PARAM NAME="AllowMultiBlocks" VALUE="0"><PARAM NAME="AllowUserFormulas" VALUE="0"><PARAM NAME="ArrowsExitEditMode" VALUE="0"><PARAM NAME="AutoCalc" VALUE="-1"><PARAM NAME="AutoClipboard" VALUE="-1"><PARAM NAME="AutoSize" VALUE="0"><PARAM NAME="BackColorStyle" VALUE="0"><PARAM NAME="BorderStyle" VALUE="1"><PARAM NAME="ButtonDrawMode" VALUE="0"><PARAM NAME="ColHeaderDisplay" VALUE="2"><PARAM NAME="ColsFrozen" VALUE="0"><PARAM NAME="DAutoCellTypes" VALUE="1"><PARAM NAME="DAutoFill" VALUE="1"><PARAM NAME="DAutoHeadings" VALUE="1"><PARAM NAME="DAutoSave" VALUE="1"><PARAM NAME="DAutoSizeCols" VALUE="2"><PARAM NAME="DInformActiveRowChange" VALUE="1"><PARAM NAME="DisplayColHeaders" VALUE="1"><PARAM NAME="DisplayRowHeaders" VALUE="1"><PARAM NAME="EditEnterAction" VALUE="0"><PARAM NAME="EditModePermanent" VALUE="0"><PARAM NAME="EditModeReplace" VALUE="0"><PARAM NAME="FormulaSync" VALUE="-1"><PARAM NAME="GrayAreaBackColor" VALUE="12632256"><PARAM NAME="GridColor" VALUE="12632256"><PARAM NAME="GridShowHoriz" VALUE="1"><PARAM NAME="GridShowVert" VALUE="1"><PARAM NAME="GridSolid" VALUE="1"><PARAM NAME="MaxCols" VALUE="500"><PARAM NAME="MaxRows" VALUE="500"><PARAM NAME="MoveActiveOnFocus" VALUE="-1"><PARAM NAME="NoBeep" VALUE="0"><PARAM NAME="NoBorder" VALUE="0"><PARAM NAME="OperationMode" VALUE="0"><PARAM NAME="Position" VALUE="0"><PARAM NAME="ProcessTab" VALUE="0"><PARAM NAME="Protect" VALUE="-1"><PARAM NAME="ReDraw" VALUE="-1"><PARAM NAME="RestrictCols" VALUE="0"><PARAM NAME="RestrictRows" VALUE="0"><PARAM NAME="RetainSelBlock" VALUE="-1"><PARAM NAME="RowHeaderDisplay" VALUE="1"><PARAM NAME="RowsFrozen" VALUE="0"><PARAM NAME="ScrollBarExtMode" VALUE="0"><PARAM NAME="ScrollBarMaxAlign" VALUE="-1"><PARAM NAME="ScrollBars" VALUE="3"><PARAM NAME="ScrollBarShowMax" VALUE="-1"><PARAM NAME="SelectBlockOptions" VALUE="15"><PARAM NAME="ShadowColor" VALUE="-2147483633"><PARAM NAME="ShadowDark" VALUE="-2147483632"><PARAM NAME="ShadowText" VALUE="-2147483630"><PARAM NAME="StartingColNumber" VALUE="1"><PARAM NAME="StartingRowNumber" VALUE="1"><PARAM NAME="UnitType" VALUE="1"><PARAM NAME="UserResize" VALUE="3"><PARAM NAME="VirtualMaxRows" VALUE="-1"><PARAM NAME="VirtualMode" VALUE="0"><PARAM NAME="VirtualOverlap" VALUE="0"><PARAM NAME="VirtualRows" VALUE="0"><PARAM NAME="VirtualScrollBuffer" VALUE="0"><PARAM NAME="VisibleCols" VALUE="0"><PARAM NAME="VisibleRows" VALUE="0"><PARAM NAME="VScrollSpecial" VALUE="0"><PARAM NAME="VScrollSpecialType" VALUE="0"><PARAM NAME="Appearance" VALUE="0"><PARAM NAME="TextTip" VALUE="0"><PARAM NAME="TextTipDelay" VALUE="500"><PARAM NAME="ScrollBarTrack" VALUE="0"><PARAM NAME="ClipboardOptions" VALUE="15"><PARAM NAME="CellNoteIndicator" VALUE="0"><PARAM NAME="ShowScrollTips" VALUE="0"><PARAM NAME="DataMember" VALUE=""><PARAM NAME="OLEDropMode" VALUE="0"></OBJECT>'
  document.write(sstr);
}
function makespd(sId){
  var sstr 
  sstr='<OBJECT classid="clsid:5220cb21-c88d-11cf-b347-00aa00a28331" VIEWASTEXT><PARAM name="LPKPath" VALUE="/Common/CAB/fpSpr60.LPK"></OBJECT>';
  document.write(sstr);
  sstr='<OBJECT id='+ sId +' style="LEFT: 0px; WIDTH: 0px; TOP: 0px; HEIGHT: 0px" codeBase="/Common/CAB/fpSpr60.CAB" classid="CLSID:41F841C0-AE16-11D5-8817-0050DA6EF5E5" VIEWASTEXT><PARAM NAME="_Version" VALUE="393216"><PARAM NAME="_ExtentX" VALUE="0"><PARAM NAME="_ExtentY" VALUE="0"><PARAM NAME="_StockProps" VALUE="64"><PARAM NAME="Enabled" VALUE="-1"><PARAM NAME="AllowCellOverflow" VALUE="0"><PARAM NAME="AllowDragDrop" VALUE="0"><PARAM NAME="AllowMultiBlocks" VALUE="0"><PARAM NAME="AllowUserFormulas" VALUE="0"><PARAM NAME="ArrowsExitEditMode" VALUE="0"><PARAM NAME="AutoCalc" VALUE="-1"><PARAM NAME="AutoClipboard" VALUE="-1"><PARAM NAME="AutoSize" VALUE="0"><PARAM NAME="BackColorStyle" VALUE="0"><PARAM NAME="BorderStyle" VALUE="1"><PARAM NAME="ButtonDrawMode" VALUE="0"><PARAM NAME="ColHeaderDisplay" VALUE="2"><PARAM NAME="ColsFrozen" VALUE="0"><PARAM NAME="DAutoCellTypes" VALUE="1"><PARAM NAME="DAutoFill" VALUE="1"><PARAM NAME="DAutoHeadings" VALUE="1"><PARAM NAME="DAutoSave" VALUE="1"><PARAM NAME="DAutoSizeCols" VALUE="2"><PARAM NAME="DInformActiveRowChange" VALUE="1"><PARAM NAME="DisplayColHeaders" VALUE="1"><PARAM NAME="DisplayRowHeaders" VALUE="1"><PARAM NAME="EditEnterAction" VALUE="0"><PARAM NAME="EditModePermanent" VALUE="0"><PARAM NAME="EditModeReplace" VALUE="0"><PARAM NAME="FormulaSync" VALUE="-1"><PARAM NAME="GrayAreaBackColor" VALUE="12632256"><PARAM NAME="GridColor" VALUE="12632256"><PARAM NAME="GridShowHoriz" VALUE="1"><PARAM NAME="GridShowVert" VALUE="1"><PARAM NAME="GridSolid" VALUE="1"><PARAM NAME="MaxCols" VALUE="500"><PARAM NAME="MaxRows" VALUE="500"><PARAM NAME="MoveActiveOnFocus" VALUE="-1"><PARAM NAME="NoBeep" VALUE="0"><PARAM NAME="NoBorder" VALUE="0"><PARAM NAME="OperationMode" VALUE="0"><PARAM NAME="Position" VALUE="0"><PARAM NAME="ProcessTab" VALUE="0"><PARAM NAME="Protect" VALUE="-1"><PARAM NAME="ReDraw" VALUE="-1"><PARAM NAME="RestrictCols" VALUE="0"><PARAM NAME="RestrictRows" VALUE="0"><PARAM NAME="RetainSelBlock" VALUE="-1"><PARAM NAME="RowHeaderDisplay" VALUE="1"><PARAM NAME="RowsFrozen" VALUE="0"><PARAM NAME="ScrollBarExtMode" VALUE="0"><PARAM NAME="ScrollBarMaxAlign" VALUE="-1"><PARAM NAME="ScrollBars" VALUE="3"><PARAM NAME="ScrollBarShowMax" VALUE="-1"><PARAM NAME="SelectBlockOptions" VALUE="15"><PARAM NAME="ShadowColor" VALUE="-2147483633"><PARAM NAME="ShadowDark" VALUE="-2147483632"><PARAM NAME="ShadowText" VALUE="-2147483630"><PARAM NAME="StartingColNumber" VALUE="1"><PARAM NAME="StartingRowNumber" VALUE="1"><PARAM NAME="UnitType" VALUE="1"><PARAM NAME="UserResize" VALUE="3"><PARAM NAME="VirtualMaxRows" VALUE="-1"><PARAM NAME="VirtualMode" VALUE="0"><PARAM NAME="VirtualOverlap" VALUE="0"><PARAM NAME="VirtualRows" VALUE="0"><PARAM NAME="VirtualScrollBuffer" VALUE="0"><PARAM NAME="VisibleCols" VALUE="0"><PARAM NAME="VisibleRows" VALUE="0"><PARAM NAME="VScrollSpecial" VALUE="0"><PARAM NAME="VScrollSpecialType" VALUE="0"><PARAM NAME="Appearance" VALUE="0"><PARAM NAME="TextTip" VALUE="0"><PARAM NAME="TextTipDelay" VALUE="500"><PARAM NAME="ScrollBarTrack" VALUE="0"><PARAM NAME="ClipboardOptions" VALUE="15"><PARAM NAME="CellNoteIndicator" VALUE="0"><PARAM NAME="ShowScrollTips" VALUE="0"><PARAM NAME="DataMember" VALUE=""><PARAM NAME="OLEDropMode" VALUE="0"></OBJECT>'
  document.write(sstr);
}
// 2. makeActiveXFlash ::: listCreator 활성화
function makeActiveXFlash(param){
    var height=param["height"];
    var width =param["width"];
    var movie= param["movie"];
    var sStr= '<OBJECT codeBase="HTTP://DOWNLOAD.MACROMEDIA.COM/PUB/SHOCKWAVE/CABS/FLASH/SWFLASH.CAB#VERSION=6,0,29,0" height='+height+' width='+width+' classid="CLSID:D27CDB6E-AE6D-11CF-96B8-444553540000" VIEWASTEXT><PARAM NAME="_cx" VALUE="26538"><PARAM NAME="_cy" VALUE="12435"><PARAM NAME="FlashVars" VALUE=""><PARAM NAME="Movie" VALUE='+movie+'><PARAM NAME="Src" VALUE='+movie+'><PARAM NAME="WMode" VALUE="transparent"><PARAM NAME="Play" VALUE="-1"><PARAM NAME="Loop" VALUE="-1"><PARAM NAME="Quality" VALUE="High"><PARAM NAME="SAlign" VALUE=""><PARAM NAME="Menu" VALUE="-1"><PARAM NAME="Base" VALUE=""><PARAM NAME="AllowScriptAccess" VALUE="always"><PARAM NAME="Scale" VALUE="ShowAll"><PARAM NAME="DeviceFont" VALUE="0"><PARAM NAME="EmbedMovie" VALUE="0"><PARAM NAME="BGColor" VALUE=""><PARAM NAME="SWRemote" VALUE=""><PARAM NAME="MovieData" VALUE=""><PARAM NAME="SeamlessTabbing" VALUE="1"><PARAM NAME="Profile" VALUE="0"><PARAM NAME="ProfileAddress" VALUE=""><PARAM NAME="ProfilePort" VALUE="0"><EMBED SRC='+movie+' QUALITY="HIGH" PLUGINSPAGE="HTTP://WWW.MACROMEDIA.COM/GO/GETFLASHPLAYER" TYPE="APPLICATION/X-SHOCKWAVE-FLASH" WIDTH='+width+' HEIGHT='+height+' wmode="transparent"></EMBED></OBJECT>';
    document.write (sStr);
}
// 3. makeActiveXWebEditor ::: WebEditor 활성화
function makeActiveXWebEditor(param) {
    var sId= param["sid"];
    var height= param["height"];
    var width= param["width"];
    var sStr = '<OBJECT name='+sId+' ID='+sId+' WIDTH='+width+' HEIGHT='+height+' CLASSID="clsid:976B9142-EA25-4143-85BD-6E1D544D8AA8" CODEBASE="/Common/CAB/WebEditor.cab#version=2,5,0,10" VIEWASTEXT><Param name="MailMode" value="true"><Param name="Writable" value="true"><Param name="ShowMainToolbar" value="false"><Param name="ShowEditToolbar" value="true"><Param name="ShowCalcToolbar" value="false"><Param name="ShowStatus" value="false"></OBJECT>'
     document.write (sStr);
}
function makeActiveXWebEditor2(param) {
    var sId = param["sid"];
    var height = param["height"];
    var width = param["width"];
    var sStr = '<OBJECT id=' + sId + ' WIDTH=' + width + ' HEIGHT=' + height + ' codeBase="/Common/CAB/WebEditor.cab#version=2,5,0,10" classid="clsid:976B9142-EA25-4143-85BD-6E1D544D8AA8" name=' + sId + ' VIEWASTEXT><PARAM NAME="_ExtentX" VALUE="20108"><PARAM NAME="_ExtentY" VALUE="7938"><PARAM NAME="installComplete" VALUE="0"></OBJECT>'
    document.write(sStr);
}
function makeWebEditor(param) {
    var sStr
    sStr = '<OBJECT classid="clsid:5220cb21-c88d-11cf-b347-00aa00a28331" VIEWASTEXT><PARAM name="LPKPath" VALUE="/Common/CAB/WebEditor.lpk"></OBJECT>';
    document.write(sStr);
    var sId = param["sid"];
    var height = param["height"];
    var width = param["width"];
    sStr = '<OBJECT name=' + sId + ' ID=' + sId + ' WIDTH=' + width + ' HEIGHT=' + height + ' CLASSID="clsid:976B9142-EA25-4143-85BD-6E1D544D8AA8" CODEBASE="/Common/CAB/WebEditor.cab#version=2,5,0,10" VIEWASTEXT><Param name="MailMode" value="true"><Param name="Writable" value="true"><Param name="ShowMainToolbar" value="false"><Param name="ShowEditToolbar" value="true"><Param name="ShowCalcToolbar" value="false"><Param name="ShowStatus" value="false"></OBJECT>'
    document.write(sStr);
}
function makeWebEditor2(param) {
    var sStr
    sStr = '<OBJECT classid="clsid:5220cb21-c88d-11cf-b347-00aa00a28331" VIEWASTEXT><PARAM name="LPKPath" VALUE="/Common/CAB/WebEditor.lpk"></OBJECT>';
    document.write(sStr);
    var sId = param["sid"];
    var height = param["height"];
    var width = param["width"];
    sStr = '<OBJECT id=' + sId + ' WIDTH=' + width + ' HEIGHT=' + height + ' codeBase="/Common/CAB/WebEditor.cab#version=2,5,0,10" classid="clsid:976B9142-EA25-4143-85BD-6E1D544D8AA8" name=' + sId + ' VIEWASTEXT><PARAM NAME="_ExtentX" VALUE="20108"><PARAM NAME="_ExtentY" VALUE="7938"><PARAM NAME="installComplete" VALUE="0"></OBJECT>'
    document.write(sStr);
}
// 5.makeActiveXListCreator ::: listCreator 활성화
function makeActiveXListCreator(iflag){
   var sStr= "";
   var sId="WEB1"
   var strs="TABLE-LAYOUT: auto; Z-INDEX: 102; LEFT: 0px; WIDTH: 100%; POSITION: relative; TOP: 0px; HEIGHT: 97%";
   if (iflag==0) strs = "TABLE-LAYOUT: auto; Z-INDEX: 102; LEFT: 0px; WIDTH: 100%; POSITION: relative; TOP: 0px; HEIGHT: 100%";
   sStr += "<OBJECT id=\"" + sId + "\" style=\"" + strs + "\" codeBase=\"" +"./download/f3gxwweb.cab#version=100,20,10,9" + "\" height=\"" +"420"+ "\" width=\"" +"417"+ "\" align=\"" +"baseline" + "\" border=\"" +"0" + "\" classid=\"" +"CLSID:0FF3B393-9C99-11d3-9990-0050DA0ABCBE" + "\" + VIEWASTEXT +>\n";
   sStr += "<PARAM NAME=\"" + "_Version" + "\" VALUES=\"" + "65537"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "_ExtentX" + "\" VALUES=\"" + "18521"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "_ExtentY" + "\" VALUES=\"" + "16669"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "_StockProps" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "PrinterName" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "FormatFile" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "DataFile" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "ScriptFile" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "CopyNumber" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "Collate" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "StartPage" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "EndPage" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "PageNumber" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "OutputName" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "ReplaceString" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "AssetsDir" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "VisualDir" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "GenerateDay" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "JobHResume" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "NotesServer" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "NotesPort" + "\" VALUES=\"" + "80"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "NotesUser" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "TeamWAREServer" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "TeamWAREPort" + "\" VALUES=\"" + "80"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "TeamWAREUser" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "TeamWAREPassword" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "JobWait" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "DBType" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "DBName" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "DBUser" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "DBPassword" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "DBTimeOut" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "DBReplaceString" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "JobWaitMode" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "InForm" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "JobDeterrent" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "PreviewRate" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "KeepDir" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "OutputMode" + "\" VALUES=\"" + "-1"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "OutputPrint" + "\" VALUES=\"" + "-1"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "PostParam" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "OutputStream" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "OutputFax" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "OutputNotes" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "OutputTeamW" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "OutputFile" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "OutputEmail" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "OutputApl" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "PrtMode" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "FaxRcvFile" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "EmailRcvFile" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "StreamDrvName" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "FaxDrvName" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "LwFaxRcvFile" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "LwMailRcv" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "LwKeepDir" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "KeepPdf" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "PrintOutputPages" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "StreamOutputPages" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "FaxOutputPages" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "NotesOutputPages" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "TeamWOutputPages" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "FileOutputPages" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "EmailOutputPages" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "AplOutputPages" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "TitleInfoFile" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "JobEnvFile" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "StreamEnvFile" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "FaxEnvFile" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "PdfEnvFile" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "PrintEnvFile" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "NotesDrvName" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "TeamWDrvName" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "EmailDrvName" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "FileDrvName" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "AplDrvName" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "OvdName" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "in0" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "MessageMode" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "HostName" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "Port" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "ProxyType" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "Proxy" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "ProxyBypass" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "Cache" + "\" VALUES=\"" + "-1"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "SSL" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "Message" + "\" VALUES=\"" + "-1"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "FileCompress" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "ctrlmode" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "TtlComment" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "PdfMethod" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "PdfSubtitle" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "PdfAuthor" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "PdfPrint" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "PdfModify" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "PdfSelect" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "PdfArcMode" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "PdfEmbed" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "PdfEmbedFont" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "PdfEmbedJef" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "PdfEmbedUser" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "PdfPwd" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "PdfSecupwd" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "PdfDocEnvFile" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "PrintBin" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "PrintBinName" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "LwMaker" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "GenerateTime" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "LwNote1" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "LwNote2" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "LwNote3" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "LwNote4" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "LwTermFlag" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "LwTerm" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "LwDelType" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "LwSearch" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "LwMail" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "LwFaxSend" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "LwFaxRcv" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "LwFaxSubject" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "LwFaxComment" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "FaxSend" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "FaxRcv" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "FaxSubject" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "FaxComment" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "EmailRcv" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "GrpOut" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "GrpDelimit" + "\" VALUES=\"" + "|"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "GrpBytes" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "LcForm" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "GrpDelimitMode" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "DataCode" + "\" VALUES=\"" + "1"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "JobPriority" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "PdfAnnotate" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "DspBtnSelectPrinter" + "\" VALUES=\"" + "-1"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "ItemPrintBin" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "ItemPrintBinName" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "ItemCopyNumber" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "ItemPrintSide" + "\" VALUES=\"" + ""+ "\>\n";
   sStr += "<PARAM NAME=\"" + "JobStart" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "OutputScale" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "PrintSide" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "GrpNewPaper" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "JobBanner" + "\" VALUES=\"" + "0"+ "\>\n";
   sStr += "<PARAM NAME=\"" + "DspSelectPrinter" + "\" VALUES=\"" + "-1"+ "\>\n";
   sStr += "</OBJECT>\n";
   document.write (sStr);
}

// 6. makeActiveXButton ::: 단말기 및 PDA ActiveXButton 활성화
function makeActiveXButton(sid){

	if (sid == "ins_terminal") {
        var sstr = '<OBJECT id="ins_terminal" codeBase="../../Common/CAB/ins_term.CAB#version=1,0,0,8" classid="CLSID:BACFBF5D-437E-4EDE-8CD1-25B89F15034B" VIEWASTEXT><PARAM NAME="_ExtentX" VALUE="3228"><PARAM NAME="_ExtentY" VALUE="1085"></OBJECT>'
	} else if (sid == "ins_terminal1") {
        var sstr = '<OBJECT id="ins_terminal1" codeBase="../../Common/CAB/ins_term1.CAB#version=1,0,0,10" classid="CLSID:84FC1D06-41BF-49D2-9F39-2A6FEED9A002" VIEWASTEXT><PARAM NAME="_ExtentX" VALUE="3228"><PARAM NAME="_ExtentY" VALUE="1085"></OBJECT>'
	} else if (sid == "ins_pda_down") {
        var sstr = '<OBJECT id="ins_pda_down" codeBase="../../Common/CAB/ins_pdadown.CAB#version=1,0,0,15" classid="CLSID:A9F6B51F-155A-42B5-B2B2-20C0651DA91C" VIEWASTEXT><PARAM NAME="_ExtentX" VALUE="3228"><PARAM NAME="_ExtentY" VALUE="1085"></OBJECT>'
	} else if (sid == "ins_pda_up") {
        var sstr = '<OBJECT id="ins_pda_up" codeBase="../../Common/CAB/ins_pdaup.CAB#version=1,0,0,16" classid="CLSID:29819E9A-2F39-4CDD-81B4-34866C35B81D" VIEWASTEXT><PARAM NAME="_ExtentX" VALUE="3228"><PARAM NAME="_ExtentY" VALUE="1085"></OBJECT>'
	} else {
        var sstr = ''
	}

    document.write(sstr);
}
