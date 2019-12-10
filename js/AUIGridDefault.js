/*!
* AUIGrid Default
*/

AUIGrid.defaultProps = {
    noDataMessage: "조회할 데이터가 없습니다."
    ,enterKeyColumnBase: true // 엔터키가 다음 행이 아닌 다음 칼럼으로 이동할지 여부 (기본값 : false)
    ,showRowNumColumn: false
    ,enableSorting : false
    ,showEditedCellMarker: false //수정된 셀 마커표시
    ,wrapSelectionMove: true // 칼럼 끝에서 오른쪽 이동 시 다음 행, 처음 칼럼으로 이동할지 여부
    ,softRemoveRowMode: false
    ,rowHeight: 22
};

/*
AUIGrid.bind(myGridID, "beforeInsertRow", function(event) {
    return false;
});
*/

function jsonEscape(str) {
    return str.replace(/\n/g, "\\\\n").replace(/\r/g, "\\\\r").replace(/\t/g, "\\\\t");
}

//주어진 rowIndex 위로 개수 구하여 반환
function getMyCntValue(myGridID, dataField, rowIndex, ownDepth) {
    var item;
    var count = 0;
    // 임시 그리드 데이터
    var tempGridData = null;
    tempGridData = AUIGrid.getGridData(myGridID);

    if (tempGridData === null) return 0;
    for (var i = rowIndex - 1; i >= 0; i--) {
        item = tempGridData[i];
        if (item._$isGroupSumField && (ownDepth >= item._$depth)) {
            break;
        }
        if (!item._$isGroupSumField) {
            count++;
        }
    }
    return count;
}

// 행추가. focusColIdx, items 는 필수아님.
function addRow(myGridID, focusColIdx, items) {
    // 그리드의 행이 편집상태인 경우 에디팅 완료 상태로 변경
    AUIGrid.forceEditingComplete(myGridID, null);
    
    // 포커스 이동
    //focusColIdx = typeof focusColIdx !== 'undefined' ? focusColIdx : 'undefined';
    if (typeof focusColIdx !== 'undefined') {
        AUIGrid.setSelectionByIndex(myGridID, AUIGrid.getRowCount(myGridID) - 1, focusColIdx);
    }

    // 행 추가
    //items = typeof items !== 'undefined' ? items : {};
    if (typeof items === 'undefined') {
        var items = {}; // 새행 아이템
        var columns = AUIGrid.getColumnInfoList(myGridID); // 현재 그리드 칼럼 정보
        for (var i = 0, len = columns.length; i < len; i++) {
            items[columns[i].dataField] = ''; // 데이터 필드 '' 으로 초기화
        }    
    } 
    
    AUIGrid.addRow(myGridID, items, "last");
    
    return false;
}


