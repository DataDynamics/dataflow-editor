var dgmWidth = 50;
var dgmHeight = 50;
var dgmRadian = 30;
var dgmImageWidth = 50;
var dgmImageHeight = 50;

// 테이블 도형 정의
var createTable = function(pSed, x, y){
    var options = {
        figure:                 'diagram',  // 고정됨
        shape:                  'rect',     // rect, ellipse 선택
        width:                  60,        // rect의 가로크기
        height:                 60,         // rect의 가로크기
        rx :                    10,         // ellipse의 가로반지름
        ry :                    10,         // ellipse의 세로반지름
        fill:                   '#eee',     // 채우기색상
        strokeWidth:            1,          // 선의 굵기
        stroke:                 '#ddd',     // 선색
        resizable:              false,      // 회전
        rotate:                 0,          // 회전각도
        rotatable:              false,      // 회전여부 true, false
        textHAlign :            'center',   // 텍스트의 가로정렬
        textVAlign :            'beneath',  // 텍스트의 세로정렬 beneath만 지원함.
        imageSrc:               './img/table-32px.png',   // 배경이미지
        imageWidth:             30,         // 이미지의 가로폭
        imageHeight:            30,         // 이미지의 세로폭
        btnShape:               'circle',   // 버튼의 모양 circle만 지원함
        btnArrange:             'top',      // 버튼의 위치 top만 지원함
        btnStrockWidth:         1,          // 버튼의 선 굵기
        btnStroke:              'darkgray', // 버튼의 선 색
        btnFill:                'lightgray',// 버튼의 배경색
        btnCount:               3,          // 버튼의 개수
        btnXGab:                5,          // 버튼간 공백 폭
        btnYGab:                10,          // 버튼과 주 도형과의 세로 폭
        btnImages:              ['./img/info-24px.png', './img/grid-24px.png', './img/start-24px.png'], // 버튼들의 이미지
        btnVisibles:            ['visible', 'visible', 'visible'],  // 버튼의 초기 보이기 설정
        btnRadius:              [11, 11, 11],   // 버튼의 반지름
        btnImageWidth:          [22, 22, 22],   // 버튼의 이미지 폭
        btnImageHeight:         [22, 22, 22],   // 버튼의 이미지 높이
        diagramType:            'table',        // 다이어그램 타입(사용자지정: connectInputEnables에서 지정한 tpype만 연결됨)
        connectInputEnables:    [],             // 입력으로 받을 다이어그램 타입
        connectMode:            ['direct', 'move'], // direct는 default, move는 도형의 중앙이 겹칠 경우 자동으로 연결선 생성
        joinDotsPosData:        [{ x: 50, y:0, dir:'E', inout:'out', limit:999, min:1}]  // JOIN 점의 위치와 방향, 제한수 설정(여러개 가능)
    };
    var fg = createDiagramFg( pSed, x, y, options);
    
    // 버튼에 대한 정의는 자신의 객체에 한하여 정의한다.
    fg.group.buttons[0].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:0}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.buttons[1].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:1}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.buttons[2].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:2}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.tag.addEventListener('click', function(event){
        console.log('::::', event.buttons);
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'click'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.img.addEventListener('click', function(event){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'click'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.tag.addEventListener('contextmenu', function(event){
        console.log('::::', event.buttons);
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'contextmenu'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.img.addEventListener('contextmenu', function(event){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'contextmenu'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    return fg;
} 

// JOIN 도형 정의
var createJoin = function(pSed, x, y){
    var options = {
        figure:                 'diagram',
        shape:                  'rect',     // rect, ellipse 선택
        width:                  60,        // rect의 가로크기
        height:                 60,         // rect의 가로크기
        rx:                     30,
        ry:                     30,                      
        textHAlign:             'center', 
        textVAlign:             'middle',
        width:                  60,
        height:                 60,
        fill:                   '#eee',
        strokeWidth:            1,
        stroke:                 '#ddd',
        resizable:              false,      // 회전
        rotate:                 0,
        rotatable:              false,
        textHAlign :            'center',
        textVAlign :            'beneath',
        imageSrc:               './img/join-inner-32px.png',
        imageWidth:             40,
        imageHeight:            30,
        btnShape:               'circle',
        btnArrange:             'top',  
        btnStrockWidth:         1,
        btnStroke:              'darkgray',
        btnFill:                'lightgray',
        btnXGab:                5,
        btnYGab:                10,
        btnCount:               3,
        btnImages:              ['./img/info-24px.png', './img/info-24px.png', './img/info-24px.png'],
        btnVisibles:            ['visible', 'visible', 'visible'],
        btnRadius:              [11, 11, 11],   // 버튼의 반지름
        btnImageWidth:          [22, 22, 22],   // 버튼의 이미지 폭
        btnImageHeight:         [22, 22, 22],   // 버튼의 이미지 높이
        diagramType:            'join',
        connectInputEnables:    ['table', 'join', 'filter', 'sort', 'filter', 'function', 'csv', 'dataProfile', 'dataWrangler', 'file', 'group', 'linearRegression', 'merge', 'pearsonCorrelation', 'pivot', 'union', 'workflow', 'workflowFile'],
        connectMode:            ['direct', 'move'],
        joinDotsPosData:        [{ x:-50, y:-20, dir:'W', inout:'in', limit:1, min:1}, 
                                 { x:-50, y: 20, dir:'W', inout:'in', limit:1, min:1},
                                 { x: 50, y:  0, dir:'E', inout:'out', limit:1}] 

    };
    var fg = createDiagramFg( pSed, x, y, options);
    fg.setText('Inner Join');
    fg.getUserData().set('join', {
        type:'inner',
    })
    // 버튼이벤트
    fg.group.buttons[0].onclick = function(){
        fg.setImage('./img/leftJoin.png');
    }
    fg.group.buttons[1].onclick = function(){
        fg.setImage('./img/join.png');
    }
    fg.setJoinType = function(type){
        var join = fg.getUserData().get('join');
        join.type = type;
        fg.getUserData().set('join', join);
        if(type == 'inner'){
            fg.setImage('./img/join-inner-32px.png');
        } else if(type == 'left'){
            fg.setImage('./img/join-left-32px.png');
        } else if(type == 'right'){
            fg.setImage('./img/join-right-32px.png');
        } else if(type == 'full'){
            fg.setImage('./img/join-full-32px.png');
        }
    }
    // 버튼에 대한 정의는 자신의 객체에 한하여 정의한다.
    fg.group.buttons[0].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:0}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.buttons[1].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:1}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.buttons[2].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:2}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.tag.addEventListener('click', function(event){
        console.log('::::', event.buttons);
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'click'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.img.addEventListener('click', function(event){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'click'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.tag.addEventListener('contextmenu', function(event){
        console.log('::::', event.buttons);
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'contextmenu'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.img.addEventListener('contextmenu', function(event){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'contextmenu'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    return fg;
}

// FILTER 도형 정의
var createFilter = function(pSed, x, y){
    var options = {
        figure:                 'diagram',
        shape:                  'rect',     // rect, ellipse 선택
        width:                  60,        // rect의 가로크기
        height:                 60,         // rect의 가로크기
        rx:                     30,
        ry:                     30,                      
        textHAlign:             'center', 
        textVAlign:             'middle',
        width:                  60,
        height:                 60,
        fill:                   '#eee',
        strokeWidth:            1,
        stroke:                 '#ddd',
        resizable:              false,      // 회전
        rotate:                 0,
        rotatable:              false,
        textHAlign :            'center',
        textVAlign :            'beneath',
        imageSrc:               './img/filter-32px.png',
        imageWidth:             30,
        imageHeight:            30,
        btnShape:                'circle',
        btnArrange:             'top',  // left, right, bottom
        btnStrockWidth:         1,
        btnStroke:              'darkgray',
        btnFill:                'lightgray',
        btnXGab:                5,
        btnYGab:                10,
        btnCount:               3,
        btnImages:              ['./img/info-24px.png', './img/info-24px.png', './img/info-24px.png'],
        btnVisibles:            ['visible', 'visible', 'visible'],
        btnRadius:              [11, 11, 11],   // 버튼의 반지름
        btnImageWidth:          [22, 22, 22],   // 버튼의 이미지 폭
        btnImageHeight:         [22, 22, 22],   // 버튼의 이미지 높이
        diagramType:            'filter',
        connectInputEnables:    ['table', 'filter', 'sort', 'join'],
        connectMode:            ['direct', 'move'],
        joinDotsPosData:        [{ x:-50, y: 0, dir:'W', inout:'in', limit:1, min:1},
                                 { x: 50, y: 0, dir:'E', inout:'out', limit:999}] 

    };
    var fg = createDiagramFg( pSed, x, y, options);
    fg.setText('Filter');
    fg.getUserData().set('filter', {
        type:'greater',
    })
    // 버튼에 대한 정의는 자신의 객체에 한하여 정의한다.
    fg.group.buttons[0].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:0}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.buttons[1].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:1}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.buttons[2].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:2}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.tag.addEventListener('click', function(event){
        console.log('::::', event.buttons);
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'click'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.img.addEventListener('click', function(event){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'click'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.tag.addEventListener('contextmenu', function(event){
        console.log('::::', event.buttons);
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'contextmenu'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.img.addEventListener('contextmenu', function(event){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'contextmenu'}}); 
        fg.sed.div.dispatchEvent(e);
    });

    return fg;
}

// SORTER 도형 정의
var createSort = function(pSed, x, y){
    var options = {
        figure:                 'diagram',
        shape:                  'rect',     // rect, ellipse 선택
        width:                  60,        // rect의 가로크기
        height:                 60,         // rect의 가로크기
        rx:                     30,
        ry:                     30,                      
        textHAlign:             'center', 
        textVAlign:             'middle',
        width:                  60,
        height:                 60,
        fill:                   '#eee',
        strokeWidth:            1,
        stroke:                 '#ddd',
        resizable:              false,      // 회전
        rotate:                 0,
        rotatable:              false,
        textHAlign :            'center',
        textVAlign :            'beneath',
        imageSrc:               './img/sort-32px.png',
        imageWidth:             30,
        imageHeight:            30,
        // button
        btnShape:               'circle',   // circle만 지원됨
        btnArrange:             'top',      // top만 지원됨
        btnStrockWidth:         1,
        btnStroke:              'darkgray',
        btnFill:                'lightgray',
        btnXGab:                5,
        btnYGab:                10,
        btnCount:               3,
        btnImages:              ['./img/info-24px.png', './img/info-24px.png', './img/info-24px.png'],
        btnVisibles:            ['visible', 'visible', 'visible'],
        btnRadius:              [11, 11, 11],   // 버튼의 반지름
        btnImageWidth:          [22, 22, 22],   // 버튼의 이미지 폭
        btnImageHeight:         [22, 22, 22],   // 버튼의 이미지 높이
        // connection 
        diagramType:            'sort',
        connectInputEnables:    ['table', 'filter', 'sort', 'join'],
        connectMode:            ['direct', 'move'],
        joinDotsPosData:        [{ x:-50, y: 0, dir:'W', inout:'in', limit:1, min:1},
                                 { x: 50, y: 0, dir:'E', inout:'out', limit:1}] 

    };
    var fg = createDiagramFg( pSed, x, y, options);
    fg.setText('Sort');
    // 버튼에 대한 정의는 자신의 객체에 한하여 정의한다.
    fg.group.buttons[0].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:0}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.buttons[1].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:1}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.buttons[2].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:2}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.tag.addEventListener('click', function(event){
        console.log('::::', event.buttons);
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'click'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.img.addEventListener('click', function(event){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'click'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.tag.addEventListener('contextmenu', function(event){
        console.log('::::', event.buttons);
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'contextmenu'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.img.addEventListener('contextmenu', function(event){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'contextmenu'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    return fg;
}
// Function 도형 정의
var createFunction = function(pSed, x, y){
    var options = {
        figure:                 'diagram',
        shape:                  'rect',     // rect, ellipse 선택
        width:                  60,        // rect의 가로크기
        height:                 60,         // rect의 가로크기
        rx:                     30,
        ry:                     30,                      
        textHAlign:             'center', 
        textVAlign:             'middle',
        width:                  60,
        height:                 60,
        fill:                   '#eee',
        strokeWidth:            1,
        stroke:                 '#ddd',
        resizable:              false,      // 회전
        rotate:                 0,
        rotatable:              false,
        textHAlign :            'center',
        textVAlign :            'beneath',
        imageSrc:               './img/function-32px.png',
        imageWidth:             30,
        imageHeight:            30,
        btnShape:               'circle',
        btnArrange:             'top',  
        btnStrockWidth:         1,
        btnStroke:              'darkgray',
        btnFill:                'lightgray',
        btnXGab:                5,
        btnYGab:                10,
        btnCount:               3,
        btnImages:              ['./img/info-24px.png', './img/grid-24px.png', './img/start-24px.png'],
        btnVisibles:            ['visible', 'visible', 'visible'],
        btnRadius:              [11, 11, 11],   // 버튼의 반지름
        btnImageWidth:          [22, 22, 22],   // 버튼의 이미지 폭
        btnImageHeight:         [22, 22, 22],   // 버튼의 이미지 높이
        diagramType:            'function',
        connectInputEnables:    ['table', 'join', 'filter', 'sort', 'filter', 'function', 'csv', 'dataProfile', 'dataWrangler', 'file', 'group', 'linearRegression', 'merge', 'pearsonCorrelation', 'pivot', 'union', 'workflow', 'workflowFile'],
        connectMode:            ['direct', 'move'],
        joinDotsPosData:        [{ x:-50, y: 0, dir:'W', inout:'in', limit:1, min:1}, 
                                 { x: 50, y:  0, dir:'E', inout:'out', limit:1}] 

    };
    var fg = createDiagramFg( pSed, x, y, options);
    fg.setText('Inner Join');
    // 버튼에 대한 정의는 자신의 객체에 한하여 정의한다.
    fg.group.buttons[0].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:0}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.buttons[1].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:1}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.buttons[2].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:2}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.tag.addEventListener('click', function(event){
        console.log('::::', event.buttons);
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'click'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.img.addEventListener('click', function(event){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'click'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.tag.addEventListener('contextmenu', function(event){
        console.log('::::', event.buttons);
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'contextmenu'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.img.addEventListener('contextmenu', function(event){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'contextmenu'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    return fg;
}

// Csv 도형 정의
var createCsv = function(pSed, x, y){
    var options = {
        figure:                 'diagram',
        shape:                  'rect',     // rect, ellipse 선택
        width:                  60,        // rect의 가로크기
        height:                 60,         // rect의 가로크기
        rx:                     30,
        ry:                     30,                      
        textHAlign:             'center', 
        textVAlign:             'middle',
        width:                  60,
        height:                 60,
        fill:                   '#eee',
        strokeWidth:            1,
        stroke:                 '#ddd',
        resizable:              false,      // 회전
        rotate:                 0,
        rotatable:              false,
        textHAlign :            'center',
        textVAlign :            'beneath',
        imageSrc:               './img/csv-32px.png',
        imageWidth:             30,
        imageHeight:            30,
        btnShape:               'circle',
        btnArrange:             'top',  
        btnStrockWidth:         1,
        btnStroke:              'darkgray',
        btnFill:                'lightgray',
        btnXGab:                5,
        btnYGab:                10,
        btnCount:               3,
        btnImages:              ['./img/info-24px.png', './img/grid-24px.png', './img/start-24px.png'],
        btnVisibles:            ['visible', 'visible', 'visible'],
        btnRadius:              [11, 11, 11],   // 버튼의 반지름
        btnImageWidth:          [22, 22, 22],   // 버튼의 이미지 폭
        btnImageHeight:         [22, 22, 22],   // 버튼의 이미지 높이
        diagramType:            'csv',
        connectInputEnables:    ['table', 'join', 'filter', 'sort', 'filter', 'function', 'csv', 'dataProfile', 'dataWrangler', 'file', 'group', 'linearRegression', 'merge', 'pearsonCorrelation', 'pivot', 'union', 'workflow', 'workflowFile'],
        connectMode:            ['direct', 'move'],
        joinDotsPosData:        [{ x:-50, y: 0, dir:'W', inout:'in', limit:1}, 
                                 { x: 50, y: 0, dir:'E', inout:'out', limit:1, min:1}] 

    };
    var fg = createDiagramFg( pSed, x, y, options);
    fg.setText('Csv');
    // 버튼에 대한 정의는 자신의 객체에 한하여 정의한다.
    fg.group.buttons[0].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:0}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.buttons[1].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:1}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.buttons[2].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:2}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.tag.addEventListener('click', function(event){
        console.log('::::', event.buttons);
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'click'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.img.addEventListener('click', function(event){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'click'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.tag.addEventListener('contextmenu', function(event){
        console.log('::::', event.buttons);
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'contextmenu'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.img.addEventListener('contextmenu', function(event){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'contextmenu'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    return fg;
}

// dataProfile 도형 정의
var createDataProfile = function(pSed, x, y){
    var options = {
        figure:                 'diagram',
        shape:                  'rect',     // rect, ellipse 선택
        width:                  60,        // rect의 가로크기
        height:                 60,         // rect의 가로크기
        rx:                     30,
        ry:                     30,                      
        textHAlign:             'center', 
        textVAlign:             'middle',
        width:                  60,
        height:                 60,
        fill:                   '#eee',
        strokeWidth:            1,
        stroke:                 '#ddd',
        resizable:              false,      // 회전
        rotate:                 0,
        rotatable:              false,
        textHAlign :            'center',
        textVAlign :            'beneath',
        imageSrc:               './img/data-profile-32px.png',
        imageWidth:             30,
        imageHeight:            30,
        btnShape:               'circle',
        btnArrange:             'top',  
        btnStrockWidth:         1,
        btnStroke:              'darkgray',
        btnFill:                'lightgray',
        btnXGab:                5,
        btnYGab:                10,
        btnCount:               3,
        btnImages:              ['./img/info-24px.png', './img/grid-24px.png', './img/start-24px.png'],
        btnVisibles:            ['visible', 'visible', 'visible'],
        btnRadius:              [11, 11, 11],   // 버튼의 반지름
        btnImageWidth:          [22, 22, 22],   // 버튼의 이미지 폭
        btnImageHeight:         [22, 22, 22],   // 버튼의 이미지 높이
        diagramType:            'dataProfile',
        connectInputEnables:    ['table', 'join', 'filter', 'sort', 'filter', 'function', 'csv', 'dataProfile', 'dataWrangler', 'file', 'group', 'linearRegression', 'merge', 'pearsonCorrelation', 'pivot', 'union', 'workflow', 'workflowFile'],
        connectMode:            ['direct', 'move'],
        joinDotsPosData:        [{ x:-50, y: 0, dir:'W', inout:'in', limit:1, min:1}, 
                                 { x: 50, y: 0, dir:'E', inout:'out', limit:1}] 

    };
    var fg = createDiagramFg( pSed, x, y, options);
    fg.setText('Csv');
    // 버튼에 대한 정의는 자신의 객체에 한하여 정의한다.
    fg.group.buttons[0].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:0}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.buttons[1].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:1}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.buttons[2].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:2}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.tag.addEventListener('click', function(event){
        console.log('::::', event.buttons);
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'click'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.img.addEventListener('click', function(event){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'click'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.tag.addEventListener('contextmenu', function(event){
        console.log('::::', event.buttons);
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'contextmenu'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.img.addEventListener('contextmenu', function(event){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'contextmenu'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    return fg;
}

// dataWrangler 도형 정의
var createDataWrangler = function(pSed, x, y){
    var options = {
        figure:                 'diagram',
        shape:                  'rect',     // rect, ellipse 선택
        width:                  60,        // rect의 가로크기
        height:                 60,         // rect의 가로크기
        rx:                     30,
        ry:                     30,                      
        textHAlign:             'center', 
        textVAlign:             'middle',
        width:                  60,
        height:                 60,
        fill:                   '#eee',
        strokeWidth:            1,
        stroke:                 '#ddd',
        resizable:              false,      // 회전
        rotate:                 0,
        rotatable:              false,
        textHAlign :            'center',
        textVAlign :            'beneath',
        imageSrc:               './img/data-wrangler-32px.png',
        imageWidth:             30,
        imageHeight:            30,
        btnShape:               'circle',
        btnArrange:             'top',  
        btnStrockWidth:         1,
        btnStroke:              'darkgray',
        btnFill:                'lightgray',
        btnXGab:                5,
        btnYGab:                10,
        btnCount:               3,
        btnImages:              ['./img/info-24px.png', './img/grid-24px.png', './img/start-24px.png'],
        btnVisibles:            ['visible', 'visible', 'visible'],
        btnRadius:              [11, 11, 11],   // 버튼의 반지름
        btnImageWidth:          [22, 22, 22],   // 버튼의 이미지 폭
        btnImageHeight:         [22, 22, 22],   // 버튼의 이미지 높이
        diagramType:            'dataWrangler',
        connectInputEnables:    ['table', 'join', 'filter', 'sort', 'filter', 'function', 'csv', 'dataProfile', 'dataWrangler', 'file', 'group', 'linearRegression', 'merge', 'pearsonCorrelation', 'pivot', 'union', 'workflow', 'workflowFile'],
        connectMode:            ['direct', 'move'],
        joinDotsPosData:        [{ x:-50, y:-20, dir:'W', inout:'in', limit:1, min:1}, 
                                 { x: 50, y:  0, dir:'E', inout:'out', limit:1}] 

    };
    var fg = createDiagramFg( pSed, x, y, options);
    fg.setText('Csv');
    // 버튼에 대한 정의는 자신의 객체에 한하여 정의한다.
    fg.group.buttons[0].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:0}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.buttons[1].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:1}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.buttons[2].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:2}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.tag.addEventListener('click', function(event){
        console.log('::::', event.buttons);
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'click'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.img.addEventListener('click', function(event){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'click'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.tag.addEventListener('contextmenu', function(event){
        console.log('::::', event.buttons);
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'contextmenu'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.img.addEventListener('contextmenu', function(event){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'contextmenu'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    return fg;
}

// file 도형 정의
var createFile = function(pSed, x, y){
    var options = {
        figure:                 'diagram',
        shape:                  'rect',     // rect, ellipse 선택
        width:                  60,        // rect의 가로크기
        height:                 60,         // rect의 가로크기
        rx:                     30,
        ry:                     30,                      
        textHAlign:             'center', 
        textVAlign:             'middle',
        width:                  60,
        height:                 60,
        fill:                   '#eee',
        strokeWidth:            1,
        stroke:                 '#ddd',
        resizable:              false,      // 회전
        rotate:                 0,
        rotatable:              false,
        textHAlign :            'center',
        textVAlign :            'beneath',
        imageSrc:               './img/file-32px.png',
        imageWidth:             30,
        imageHeight:            30,
        btnShape:               'circle',
        btnArrange:             'top',  
        btnStrockWidth:         1,
        btnStroke:              'darkgray',
        btnFill:                'lightgray',
        btnXGab:                5,
        btnYGab:                10,
        btnCount:               3,
        btnImages:              ['./img/info-24px.png', './img/grid-24px.png', './img/start-24px.png'],
        btnVisibles:            ['visible', 'visible', 'visible'],
        btnRadius:              [11, 11, 11],   // 버튼의 반지름
        btnImageWidth:          [22, 22, 22],   // 버튼의 이미지 폭
        btnImageHeight:         [22, 22, 22],   // 버튼의 이미지 높이
        diagramType:            'file',
        connectInputEnables:    ['table', 'join', 'filter', 'sort', 'filter', 'function', 'csv', 'dataProfile', 'dataWrangler', 'file', 'group', 'linearRegression', 'merge', 'pearsonCorrelation', 'pivot', 'union', 'workflow', 'workflowFile'],
        connectMode:            ['direct', 'move'],
        joinDotsPosData:        [{ x:-50, y: 0, dir:'W', inout:'in', limit:1}, 
                                 { x: 50, y: 0, dir:'E', inout:'out', limit:1, min:1}] 

    };
    var fg = createDiagramFg( pSed, x, y, options);
    fg.setText('Csv');
    // 버튼에 대한 정의는 자신의 객체에 한하여 정의한다.
    fg.group.buttons[0].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:0}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.buttons[1].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:1}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.buttons[2].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:2}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.tag.addEventListener('click', function(event){
        console.log('::::', event.buttons);
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'click'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.img.addEventListener('click', function(event){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'click'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.tag.addEventListener('contextmenu', function(event){
        console.log('::::', event.buttons);
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'contextmenu'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.img.addEventListener('contextmenu', function(event){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'contextmenu'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    return fg;
}

// group 도형 정의
var createGroup = function(pSed, x, y){
    var options = {
        figure:                 'diagram',
        shape:                  'rect',     // rect, ellipse 선택
        width:                  60,        // rect의 가로크기
        height:                 60,         // rect의 가로크기
        rx:                     30,
        ry:                     30,                      
        textHAlign:             'center', 
        textVAlign:             'middle',
        width:                  60,
        height:                 60,
        fill:                   '#eee',
        strokeWidth:            1,
        stroke:                 '#ddd',
        resizable:              false,      // 회전
        rotate:                 0,
        rotatable:              false,
        textHAlign :            'center',
        textVAlign :            'beneath',
        imageSrc:               './img/group-32px.png',
        imageWidth:             30,
        imageHeight:            30,
        btnShape:               'circle',
        btnArrange:             'top',  
        btnStrockWidth:         1,
        btnStroke:              'darkgray',
        btnFill:                'lightgray',
        btnXGab:                5,
        btnYGab:                10,
        btnCount:               3,
        btnImages:              ['./img/info-24px.png', './img/grid-24px.png', './img/start-24px.png'],
        btnVisibles:            ['visible', 'visible', 'visible'],
        btnRadius:              [11, 11, 11],   // 버튼의 반지름
        btnImageWidth:          [22, 22, 22],   // 버튼의 이미지 폭
        btnImageHeight:         [22, 22, 22],   // 버튼의 이미지 높이
        diagramType:            'group',
        connectInputEnables:    ['table', 'join', 'filter', 'sort', 'filter', 'function', 'csv', 'dataProfile', 'dataWrangler', 'file', 'group', 'linearRegression', 'merge', 'pearsonCorrelation', 'pivot', 'union', 'workflow', 'workflowFile'],
        connectMode:            ['direct', 'move'],
        joinDotsPosData:        [{ x:-50, y: 0, dir:'W', inout:'in', limit:1, min:1}, 
                                 { x: 50, y: 0, dir:'E', inout:'out', limit:1}] 

    };
    var fg = createDiagramFg( pSed, x, y, options);
    fg.setText('Csv');
    // 버튼에 대한 정의는 자신의 객체에 한하여 정의한다.
    fg.group.buttons[0].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:0}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.buttons[1].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:1}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.buttons[2].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:2}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.tag.addEventListener('click', function(event){
        console.log('::::', event.buttons);
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'click'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.img.addEventListener('click', function(event){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'click'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.tag.addEventListener('contextmenu', function(event){
        console.log('::::', event.buttons);
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'contextmenu'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.img.addEventListener('contextmenu', function(event){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'contextmenu'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    return fg;
}

// linearRegression 도형 정의
var createLinearRegression = function(pSed, x, y){
    var options = {
        figure:                 'diagram',
        shape:                  'rect',     // rect, ellipse 선택
        width:                  60,        // rect의 가로크기
        height:                 60,         // rect의 가로크기
        rx:                     30,
        ry:                     30,                      
        textHAlign:             'center', 
        textVAlign:             'middle',
        width:                  60,
        height:                 60,
        fill:                   '#eee',
        strokeWidth:            1,
        stroke:                 '#ddd',
        resizable:              false,      // 회전
        rotate:                 0,
        rotatable:              false,
        textHAlign :            'center',
        textVAlign :            'beneath',
        imageSrc:               './img/linear-regression-32px.png',
        imageWidth:             30,
        imageHeight:            30,
        btnShape:               'circle',
        btnArrange:             'top',  
        btnStrockWidth:         1,
        btnStroke:              'darkgray',
        btnFill:                'lightgray',
        btnXGab:                5,
        btnYGab:                10,
        btnCount:               3,
        btnImages:              ['./img/info-24px.png', './img/grid-24px.png', './img/start-24px.png'],
        btnVisibles:            ['visible', 'visible', 'visible'],
        btnRadius:              [11, 11, 11],   // 버튼의 반지름
        btnImageWidth:          [22, 22, 22],   // 버튼의 이미지 폭
        btnImageHeight:         [22, 22, 22],   // 버튼의 이미지 높이
        diagramType:            'linear-regression',
        connectInputEnables:    ['table', 'join', 'filter', 'sort', 'filter', 'function', 'csv', 'dataProfile', 'dataWrangler', 'file', 'group', 'linearRegression', 'merge', 'pearsonCorrelation', 'pivot', 'union', 'workflow', 'workflowFile'],
        connectMode:            ['direct', 'move'],
        joinDotsPosData:        [{ x:-50, y: 0, dir:'W', inout:'in', limit:1, min:1}, 
                                 { x: 50, y: 0, dir:'E', inout:'out', limit:1}] 

    };
    var fg = createDiagramFg( pSed, x, y, options);
    fg.setText('Csv');
    // 버튼에 대한 정의는 자신의 객체에 한하여 정의한다.
    fg.group.buttons[0].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:0}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.buttons[1].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:1}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.buttons[2].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:2}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.tag.addEventListener('click', function(event){
        console.log('::::', event.buttons);
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'click'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.img.addEventListener('click', function(event){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'click'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.tag.addEventListener('contextmenu', function(event){
        console.log('::::', event.buttons);
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'contextmenu'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.img.addEventListener('contextmenu', function(event){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'contextmenu'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    return fg;
}
// merge 도형 정의
var createMerge = function(pSed, x, y){
    var options = {
        figure:                 'diagram',
        shape:                  'rect',     // rect, ellipse 선택
        width:                  60,        // rect의 가로크기
        height:                 60,         // rect의 가로크기
        rx:                     30,
        ry:                     30,                      
        textHAlign:             'center', 
        textVAlign:             'middle',
        width:                  60,
        height:                 60,
        fill:                   '#eee',
        strokeWidth:            1,
        stroke:                 '#ddd',
        resizable:              false,      // 회전
        rotate:                 0,
        rotatable:              false,
        textHAlign :            'center',
        textVAlign :            'beneath',
        imageSrc:               './img/merge-32px.png',
        imageWidth:             40,
        imageHeight:            30,
        btnShape:               'circle',
        btnArrange:             'top',  
        btnStrockWidth:         1,
        btnStroke:              'darkgray',
        btnFill:                'lightgray',
        btnXGab:                5,
        btnYGab:                10,
        btnCount:               3,
        btnImages:              ['./img/info-24px.png', './img/grid-24px.png', './img/start-24px.png'],
        btnVisibles:            ['visible', 'visible', 'visible'],
        btnRadius:              [11, 11, 11],   // 버튼의 반지름
        btnImageWidth:          [22, 22, 22],   // 버튼의 이미지 폭
        btnImageHeight:         [22, 22, 22],   // 버튼의 이미지 높이
        diagramType:            'merge',
        connectInputEnables:    ['table', 'join', 'filter', 'sort', 'filter', 'function', 'csv', 'dataProfile', 'dataWrangler', 'file', 'group', 'linearRegression', 'merge', 'pearsonCorrelation', 'pivot', 'union', 'workflow', 'workflowFile'],
        connectMode:            ['direct', 'move'],
        joinDotsPosData:        [{ x:-50, y:-20, dir:'W', inout:'in', limit:1, min:1}, 
                                 { x:-50, y: 20, dir:'W', inout:'in', limit:1, min:1},
                                 { x: 50, y:  0, dir:'E', inout:'out', limit:1}] 

    };
    var fg = createDiagramFg( pSed, x, y, options);
    fg.setText('Merge');
    // 버튼에 대한 정의는 자신의 객체에 한하여 정의한다.
    fg.group.buttons[0].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:0}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.buttons[1].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:1}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.buttons[2].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:2}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.tag.addEventListener('click', function(event){
        console.log('::::', event.buttons);
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'click'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.img.addEventListener('click', function(event){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'click'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.tag.addEventListener('contextmenu', function(event){
        console.log('::::', event.buttons);
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'contextmenu'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.img.addEventListener('contextmenu', function(event){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'contextmenu'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    return fg;
}

// pearsonCorrelation 도형 정의
var createPearsonCorrelation = function(pSed, x, y){
    var options = {
        figure:                 'diagram',
        shape:                  'rect',     // rect, ellipse 선택
        width:                  60,        // rect의 가로크기
        height:                 60,         // rect의 가로크기
        rx:                     30,
        ry:                     30,                      
        textHAlign:             'center', 
        textVAlign:             'middle',
        width:                  60,
        height:                 60,
        fill:                   '#eee',
        strokeWidth:            1,
        stroke:                 '#ddd',
        resizable:              false,      // 회전
        rotate:                 0,
        rotatable:              false,
        textHAlign :            'center',
        textVAlign :            'beneath',
        imageSrc:               './img/pearson-correlation-32px.png',
        imageWidth:             30,
        imageHeight:            30,
        btnShape:               'circle',
        btnArrange:             'top',  
        btnStrockWidth:         1,
        btnStroke:              'darkgray',
        btnFill:                'lightgray',
        btnXGab:                5,
        btnYGab:                10,
        btnCount:               3,
        btnImages:              ['./img/info-24px.png', './img/grid-24px.png', './img/start-24px.png'],
        btnVisibles:            ['visible', 'visible', 'visible'],
        btnRadius:              [11, 11, 11],   // 버튼의 반지름
        btnImageWidth:          [22, 22, 22],   // 버튼의 이미지 폭
        btnImageHeight:         [22, 22, 22],   // 버튼의 이미지 높이
        diagramType:            'pearsonCorrelation',
        connectInputEnables:    ['table', 'join', 'filter', 'sort', 'filter', 'function', 'csv', 'dataProfile', 'dataWrangler', 'file', 'group', 'linearRegression', 'merge', 'pearsonCorrelation', 'pivot', 'union', 'workflow', 'workflowFile'],
        connectMode:            ['direct', 'move'],
        joinDotsPosData:        [{ x:-50, y: 0, dir:'W', inout:'in', limit:1, min:1}, 
                                 { x: 50, y: 0, dir:'E', inout:'out', limit:1}] 

    };
    var fg = createDiagramFg( pSed, x, y, options);
    fg.setText('Pearson Correlation');
    // 버튼에 대한 정의는 자신의 객체에 한하여 정의한다.
    fg.group.buttons[0].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:0}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.buttons[1].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:1}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.buttons[2].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:2}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.tag.addEventListener('click', function(event){
        console.log('::::', event.buttons);
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'click'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.img.addEventListener('click', function(event){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'click'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.tag.addEventListener('contextmenu', function(event){
        console.log('::::', event.buttons);
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'contextmenu'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.img.addEventListener('contextmenu', function(event){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'contextmenu'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    return fg;
}

// pivot 도형 정의
var createPivot = function(pSed, x, y){
    var options = {
        figure:                 'diagram',
        shape:                  'rect',     // rect, ellipse 선택
        width:                  60,        // rect의 가로크기
        height:                 60,         // rect의 가로크기
        rx:                     30,
        ry:                     30,                      
        textHAlign:             'center', 
        textVAlign:             'middle',
        width:                  60,
        height:                 60,
        fill:                   '#eee',
        strokeWidth:            1,
        stroke:                 '#ddd',
        resizable:              false,      // 회전
        rotate:                 0,
        rotatable:              false,
        textHAlign :            'center',
        textVAlign :            'beneath',
        imageSrc:               './img/pivot-32px.png',
        imageWidth:             30,
        imageHeight:            30,
        btnShape:               'circle',
        btnArrange:             'top',  
        btnStrockWidth:         1,
        btnStroke:              'darkgray',
        btnFill:                'lightgray',
        btnXGab:                5,
        btnYGab:                10,
        btnCount:               3,
        btnImages:              ['./img/info-24px.png', './img/grid-24px.png', './img/start-24px.png'],
        btnVisibles:            ['visible', 'visible', 'visible'],
        btnRadius:              [11, 11, 11],   // 버튼의 반지름
        btnImageWidth:          [22, 22, 22],   // 버튼의 이미지 폭
        btnImageHeight:         [22, 22, 22],   // 버튼의 이미지 높이
        diagramType:            'pivot',
        connectInputEnables:    ['table', 'join', 'filter', 'sort', 'filter', 'function', 'csv', 'dataProfile', 'dataWrangler', 'file', 'group', 'linearRegression', 'merge', 'pearsonCorrelation', 'pivot', 'union', 'workflow', 'workflowFile'],
        connectMode:            ['direct', 'move'],
        joinDotsPosData:        [{ x:-50, y: 0, dir:'W', inout:'in', limit:1, min:1}, 
                                 { x: 50, y: 0, dir:'E', inout:'out', limit:1}] 

    };
    var fg = createDiagramFg( pSed, x, y, options);
    fg.setText('Pivot');
    // 버튼에 대한 정의는 자신의 객체에 한하여 정의한다.
    fg.group.buttons[0].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:0}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.buttons[1].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:1}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.buttons[2].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:2}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.tag.addEventListener('click', function(event){
        console.log('::::', event.buttons);
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'click'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.img.addEventListener('click', function(event){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'click'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.tag.addEventListener('contextmenu', function(event){
        console.log('::::', event.buttons);
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'contextmenu'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.img.addEventListener('contextmenu', function(event){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'contextmenu'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    return fg;
}

// Union 도형 정의
var createUnion = function(pSed, x, y){
    var options = {
        figure:                 'diagram',
        shape:                  'rect',     // rect, ellipse 선택
        width:                  60,        // rect의 가로크기
        height:                 60,         // rect의 가로크기
        rx:                     30,
        ry:                     30,                      
        textHAlign:             'center', 
        textVAlign:             'middle',
        width:                  60,
        height:                 60,
        fill:                   '#eee',
        strokeWidth:            1,
        stroke:                 '#ddd',
        resizable:              false,      // 회전
        rotate:                 0,
        rotatable:              false,
        textHAlign :            'center',
        textVAlign :            'beneath',
        imageSrc:               './img/union-32px.png',
        imageWidth:             40,
        imageHeight:            30,
        btnShape:               'circle',
        btnArrange:             'top',  
        btnStrockWidth:         1,
        btnStroke:              'darkgray',
        btnFill:                'lightgray',
        btnXGab:                5,
        btnYGab:                10,
        btnCount:               3,
        btnImages:              ['./img/info-24px.png', './img/grid-24px.png', './img/start-24px.png'],
        btnVisibles:            ['visible', 'visible', 'visible'],
        btnRadius:              [11, 11, 11],   // 버튼의 반지름
        btnImageWidth:          [22, 22, 22],   // 버튼의 이미지 폭
        btnImageHeight:         [22, 22, 22],   // 버튼의 이미지 높이
        diagramType:            'union',
        connectInputEnables:    ['table', 'join', 'filter', 'sort', 'filter', 'function', 'csv', 'dataProfile', 'dataWrangler', 'file', 'group', 'linearRegression', 'merge', 'pearsonCorrelation', 'pivot', 'union', 'workflow', 'workflowFile'],
        connectMode:            ['direct', 'move'],
        joinDotsPosData:        [{ x:-50, y:-20, dir:'W', inout:'in', limit:1, min:1}, 
                                 { x:-50, y: 20, dir:'W', inout:'in', limit:1, min:1},
                                 { x: 50, y:  0, dir:'E', inout:'out', limit:1}] 

    };
    var fg = createDiagramFg( pSed, x, y, options);
    fg.setText('Union');
    // 버튼에 대한 정의는 자신의 객체에 한하여 정의한다.
    fg.group.buttons[0].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:0}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.buttons[1].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:1}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.buttons[2].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:2}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.tag.addEventListener('click', function(event){
        console.log('::::', event.buttons);
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'click'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.img.addEventListener('click', function(event){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'click'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.tag.addEventListener('contextmenu', function(event){
        console.log('::::', event.buttons);
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'contextmenu'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.img.addEventListener('contextmenu', function(event){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'contextmenu'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    return fg;
}
// Workflow 도형 정의
var createWorkflow = function(pSed, x, y){
    var options = {
        figure:                 'diagram',
        shape:                  'rect',     // rect, ellipse 선택
        width:                  60,        // rect의 가로크기
        height:                 60,         // rect의 가로크기
        rx:                     30,
        ry:                     30,                      
        textHAlign:             'center', 
        textVAlign:             'middle',
        width:                  60,
        height:                 60,
        fill:                   '#eee',
        strokeWidth:            1,
        stroke:                 '#ddd',
        resizable:              false,      // 회전
        rotate:                 0,
        rotatable:              false,
        textHAlign :            'center',
        textVAlign :            'beneath',
        imageSrc:               './img/workflow-32px.png',
        imageWidth:             30,
        imageHeight:            30,
        btnShape:               'circle',
        btnArrange:             'top',  
        btnStrockWidth:         1,
        btnStroke:              'darkgray',
        btnFill:                'lightgray',
        btnXGab:                5,
        btnYGab:                10,
        btnCount:               3,
        btnImages:              ['./img/info-24px.png', './img/grid-24px.png', './img/start-24px.png'],
        btnVisibles:            ['visible', 'visible', 'visible'],
        btnRadius:              [11, 11, 11],   // 버튼의 반지름
        btnImageWidth:          [22, 22, 22],   // 버튼의 이미지 폭
        btnImageHeight:         [22, 22, 22],   // 버튼의 이미지 높이
        diagramType:            'workflow',
        connectInputEnables:    ['table', 'join', 'filter', 'sort', 'filter', 'function', 'csv', 'dataProfile', 'dataWrangler', 'file', 'group', 'linearRegression', 'merge', 'pearsonCorrelation', 'pivot', 'union', 'workflow', 'workflowFile'],
        connectMode:            ['direct', 'move'],
        joinDotsPosData:        [{ x:-50, y: 0, dir:'W', inout:'in', limit:1, min:1}, 
                                 { x: 50, y: 0, dir:'E', inout:'out', limit:1}] 

    };
    var fg = createDiagramFg( pSed, x, y, options);
    fg.setText('Workflow');
    // 버튼에 대한 정의는 자신의 객체에 한하여 정의한다.
    fg.group.buttons[0].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:0}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.buttons[1].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:1}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.buttons[2].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:2}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.tag.addEventListener('click', function(event){
        console.log('::::', event.buttons);
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'click'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.img.addEventListener('click', function(event){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'click'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.tag.addEventListener('contextmenu', function(event){
        console.log('::::', event.buttons);
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'contextmenu'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.img.addEventListener('contextmenu', function(event){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'contextmenu'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    return fg;
}
// Workflow File 도형 정의
var createWorkflowFile = function(pSed, x, y){
    var options = {
        figure:                 'diagram',
        shape:                  'rect',     // rect, ellipse 선택
        width:                  60,        // rect의 가로크기
        height:                 60,         // rect의 가로크기
        rx:                     30,
        ry:                     30,                      
        textHAlign:             'center', 
        textVAlign:             'middle',
        width:                  60,
        height:                 60,
        fill:                   '#eee',
        strokeWidth:            1,
        stroke:                 '#ddd',
        resizable:              false,      // 회전
        rotate:                 0,
        rotatable:              false,
        textHAlign :            'center',
        textVAlign :            'beneath',
        imageSrc:               './img/workflow-file-32px.png',
        imageWidth:             30,
        imageHeight:            30,
        btnShape:               'circle',
        btnArrange:             'top',  
        btnStrockWidth:         1,
        btnStroke:              'darkgray',
        btnFill:                'lightgray',
        btnXGab:                5,
        btnYGab:                10,
        btnCount:               3,
        btnImages:              ['./img/info-24px.png', './img/grid-24px.png', './img/start-24px.png'],
        btnVisibles:            ['visible', 'visible', 'visible'],
        btnRadius:              [11, 11, 11],   // 버튼의 반지름
        btnImageWidth:          [22, 22, 22],   // 버튼의 이미지 폭
        btnImageHeight:         [22, 22, 22],   // 버튼의 이미지 높이
        diagramType:            'workflowFile',
        connectInputEnables:    ['table', 'join', 'filter', 'sort', 'filter', 'function', 'csv', 'dataProfile', 'dataWrangler', 'file', 'group', 'linearRegression', 'merge', 'pearsonCorrelation', 'pivot', 'union', 'workflow', 'workflowFile'],
        connectMode:            ['direct', 'move'],
        joinDotsPosData:        [{ x:-50, y: 0, dir:'W', inout:'in', limit:1, min:1}, 
                                 { x: 50, y: 0, dir:'E', inout:'out', limit:1}] 

    };
    var fg = createDiagramFg( pSed, x, y, options);
    fg.setText('Workflow File');
    // 버튼에 대한 정의는 자신의 객체에 한하여 정의한다.
    fg.group.buttons[0].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:0}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.buttons[1].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:1}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.buttons[2].addEventListener('click', function(){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'btnclick', btnIndex:2}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.tag.addEventListener('click', function(event){
        console.log('::::', event.buttons);
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'click'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.img.addEventListener('click', function(event){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'click'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.tag.addEventListener('contextmenu', function(event){
        console.log('::::', event.buttons);
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'contextmenu'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    fg.group.img.addEventListener('contextmenu', function(event){
        var e = new CustomEvent('sed', {detail:{fg:fg, sedEvent:'contextmenu'}}); 
        fg.sed.div.dispatchEvent(e);
    });
    return fg;
}
// 추가적으로 등록하여 사용할 수 있습니다.
