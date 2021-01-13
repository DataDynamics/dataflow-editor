var Sed = function(){
    this.compArray = [];
    this.movingFg = [];
    this.movingObj = [];
    this.movingProp = [];
    this.exeMode = 'presentation';
    this.foldUnqId = '';
    this.fileUnqId = '';
    this.fileNm = '';
    this.masterMode = '';
    this.pageNum = 1;
    this.masterPageBefore = 1;
    this.jsPath = '';
    this.imgPath = '';
    this.useToolbars = [];
    this.contextMenuIng = 0;
    this.figureId = 1;
    this.div = {};
    this.svgs = [];
    this.svg = {};
    this.basicPathDot = [];
    this.svg.targetFg = null;
    this.svg.selectedLayer = null;
    this.svg.selectedDownFg=null;    
    this.svg.selectedDownFgDot = null;
    this.svg.selectedDownFgDotIndex = 0;
    this.svg.selectedFg = null;
    this.selectedEditFg= null;
    this.svg.groupSelectedArray = [];
    this.svg.groupSelectMode = false;
    this.svg.groupSelectedMode = false;
    this.editPopFg = null;
    this.screenRatio = 1;
    this.screenWidth = 1200;
    this.screenHeight = 800;
    this.gridState = 'hidden';
    this.rulerAlign = false;
    this.rulerSize = 20;
    this.rulerSizeX = 20;
    this.rulerSizeY = 20;
    this.editMode = true;
    this.editType = 'normal';   // normal,  'move', 
    this.resizeMode = false;
    this.editPopMode = false;
    
    this.connectionAuto = false;

    this.copyPatternMaker = null;    
    this.copyBasicMaker = null;
    this.copyBasicMaker3D = null;

    this.moveMode = 'fg';   // 제거해볼것.
    this.sequenceGab = 200; // 제거해볼것
    this.sequenceLeftGab = 200;
    this.sequenceTopGab = 50;
    this.sequenceBottomGab = 50;
    this.history = [];
    this.historyPosition = 0;
    this.fillColor='white';
    this.lineColor='black';
    this.mousedown = false;
    this.eventLock = false; // 하나만 선택되도록 처리한다. 
    this.addHistory = function(type){
        // 가급적 화면의 변경사항을 적게하면서 복구하는 방안을 생각했다. 
        // type:'normal',
        // type:'svg',  // SVG가 추가되거나 삭제될 경우를 설정한다.
        // type:'layer',    // 레이이어가 추가되거나 삭제될 경우를 설정한다.
        // type:'svgchange', // svg 속성이 변경될 경우 설정한다. 
        // type:'layerchange' // layer속성이 변경될 경우 설정한다. 
        var a = this.getHistory();
        if(type == null){
            type = 'normal';
        }
        var length = this.history.length;
        for(var i=0; i< length - this.historyPosition; i++){
            this.history.pop();
        }
        this.historyPosition++;
        this.history.push({type:type, data:a});
        if(this.history.length > 20){
            this.history.splice(0,1);
            this.historyPosition = 20;
        }
    }
    this.backHistory = function(){
        if(this.history.length <= 1){
            return;
        }
        var popData = this.history[this.historyPosition-1];
        var type = popData.type;
        this.historyPosition--;
        this.removeFgAll();
        this.loadHistory(type, this.history[this.historyPosition-1].data);
    }
    this.redoHistory = function(){
        var popData = this.history[this.history.length-1];
        var type = popData.type;
        this.history.pop();
        this.removeFgAll();
        this.loadHistory(type, this.history[this.history.length-1].data);
    }
    this.getHistory = function(){
        var me = this;
        var screenProp = {
            screenProperties:true,
            screenWidth:me.screenWidth,
            screenHeight:me.screenHeight,
            screenRatio:me.screenRatio,
            screenBackground:me.sreenBackground
        }
        var data = [];
        data.push(screenProp);
        var svgs = me.div.querySelectorAll('svg[svgRoot=true]');
        for(var i=0; i< svgs.length; i++){
            var svgOptions = svgs[i].options;
            data.push(svgOptions);
        } 
        for(var i=0; i< svgs.length; i++){
            var objectsLayer = svgs[i].querySelectorAll('[layerGroup=true]');
            for(var j=0; j< objectsLayer.length; j++){
                var objFg = objectsLayer[j].fg;
                data.push(objFg.options);
            }
        }
        for(var i=0; i< svgs.length; i++){ 
            var objects = svgs[i].querySelectorAll('[baseFg=true]');
            for(var j=0; j< objects.length; j++){
                var objFg = objects[j].parentNode.fg;
                if(objFg.options.layer == null || objFg.options.layer != true){
                    data.push(objFg.options);
                }
            }
        }
        return data;
    }
    this.loadHistory = function(type, data){
        var me = this;
        options = data;
        var svgs = [];
        for(var i=0; i< options.length; i++){
            var option = options[i];
            if(option.svgRoot==true){
                svgs.push(this.addSvg(option));
            }
        }
        var layerObjs = [];
        for(var i=0; i< options.length; i++){
            var option = options[i];
            if(option.screenProperties==true){
            } else {
                if(option.figureId != null && option.figureId != undefined && option.figureId != '' && option.layer==true){
                    layerObjs.push(this.createFg(option));
                }
            }
        }
        for(var i=0; i < layerObjs.length; i++){
            var layerObj = layerObjs[i];
            for(var j=0; j< svgs.length; j++ ){
                if(layerObj.get('parentSvg') == svgs[j].options.figureId){
                    svgs[j].appendChild(layerObj.group);
                    break;
                }
            }
        }
        var objs = [];
        for(var i=0; i< options.length; i++){
            var option = options[i];
            if(option.screenProperties==true){
            } else if(option.svgRoot != null && option.svgRoot == true){
            } else {
                if(option.figureId != null && option.figureId != undefined && option.figureId != '' && options.svgRoot == null){
                    for(var j=0; j < layerObjs.length; j++){
                        if(option.parentLayer == layerObjs[j].options.figureId){
                            this.svg.selectedLayer = layerObjs[j];
                            break;
                        }
                    }
                    var connectedId = option.connectedId;
                    var connectedIndex = option.connectedIndex;
                    var fg = this.createFg(option);
                    fg.options.connectedId = connectedId;
                    fg.options.connectedIndex = connectedIndex;
                    objs.push(fg);
                    for(var j=0; j < layerObjs.length; j++){
                        if(option.parentLayer == layerObjs[j].options.parentLayer){
                            layerObjs[j].group.appendChild(fg.group);
                            fg.parentLayer = layerObjs[j];
                            break;
                        }
                    }
                }
            }
        }
        for(var i=0; i < objs.length; i++){
            if(objs[i].get('parentGroup') != null){
                for(var j=0; j <objs.length; j++){
                    if(objs[j].get('figureId') == objs[i].get('parentGroup')){
                        objs[j].group.appendChild(objs[i].group);
                        objs[i].parentGroup = objs[j];
                        break;
                    }
                }
            }
        }
        for(var i=0; i< options.length; i++){
            if(options.screenProperties==true){
                continue;
            } 
            var option = options[i];
            var currObj = me.svg.querySelector('[figureId=' + option.figureId + ']');
            if(currObj == null)
                continue;
            for( var j=0; j < option.connectedId.length; j++){
                for(var n=0; n< option.connectedId[j].length; n++){
                    if( option.connectedId[j][n] == null){
                        continue;
                    }
                    var targetObj = me.svg.querySelector('[figureId=' + option.connectedId[j][n] + ']');
                    currObj.parentNode.fg.group.joinDots[j].connected.push(targetObj.parentNode.fg);
                    currObj.parentNode.fg.group.joinDots[j].connectedIndex.push(option.connectedIndex[j][n]);
                }
            }
        }
        for(var i=0; i< options.length; i++){
            var option = options[i];
            if(options.screenProperties==true){
                continue;
            }
            if(option.figureId ==null || option.figureId == undefined){
                continue;
            }
            if(me.svg.querySelector('[figureId=' + option.figureId + ']') == null){
                continue;
            }
            var targetObj = me.svg.querySelector('[figureId=' + option.figureId + ']').parentNode.fg;
            if(targetObj.group.tagText != null){
                targetObj.drawText(44);
            }
            if(option.figure =='flowline' || option.figure =='freeline' || option.figure =='basicPathDot' || option.figure == 'flowline3d'){
                if(option.lineMoveMode == 'M'){
                    for(var j=0; j< option.lineMoveDir.length; j++){
                        targetObj.options.lineMoveMode = 'M';
                        targetObj.options.lineMovePos[j].x = option.lineMovePos[j].x;
                        targetObj.options.lineMovePos[j].y = option.lineMovePos[j].y;
                    }
                }
                targetObj.draw(201);
            }
        }
    }
    this.setProperties = function(q){
        var me = this;
        if(this.editMode == true){
            if( q != null && 
                q.parentLayer != null && 
                q.parentLayer.options.figure == 'layerMap' ){
                    sedLib.calcLatLng(q);
            }
            if( q != null && 
                q.parentLayer != null && 
                q.parentLayer.options.figure == 'layerDistance' ){
                    sedLib.calcDistance(q);
            }
            if(this.diagramType == undefined || this.diagramType == null){
                setProperties(q, me);    
            } else if(this.diagramType == 'flowchart'){
                setProperties(q, me);
            }
        }
    }
    this.setPropertiesMove = function(q){
        var me = this;
        if(this.editMode == true){
            if( q != null && 
                q.parentLayer != null && 
                q.parentLayer.options.figure == 'layerMap' ){
                    sedLib.calcLatLng(q);
            }
            if( q != null && 
                q.parentLayer != null && 
                q.parentLayer.options.figure == 'layerDistance' ){
                    sedLib.calcDistance(q);
            }
            if(this.diagramType == undefined || this.diagramType == null){
                setPropertiesMove(q, me);    
            } else if(this.diagramType == 'flowchart'){
                setPropertiesMove(q, me);
            }
        }
    }
    this.loadPropertiesEvent = function(q){
        var me = this;
        if(this.editMode == true){
            if( q != null && 
                q.parentLayer != null && 
                q.parentLayer.options.figure == 'layerMap' ){
                    sedLib.calcLatLng(q);
            }
            if( q != null && 
                q.parentLayer != null && 
                q.parentLayer.options.figure == 'layerDistance' ){
                    sedLib.calcDistance(q);
            }
            if(this.diagramType == undefined || this.diagramType == null){
                loadPropertiesEvent(q);    
            } else if(this.diagramType == 'flowchart'){
                loadPropertiesEvent(q);
            }
        }
    }
    this.getObjects = function(){
        var me = this;
        var screenProp = {
            screenProperties:true,
            screenWidth:me.screenWidth,
            screenHeight:me.screenHeight,
            screenRatio:me.screenRatio,
            screenBackground:me.sreenBackground,
            sequenceGab: me.sequenceGab,
            sequenceLeftGab: me.sequenceLeftGab,
            sequenceTopGab: me.sequenceTopGab,
            sequenceBottomGab: me.sequenceBottomGab
        }
        var data = [];
        data.push(screenProp);
        var svgs = me.div.querySelectorAll('svg[svgRoot=true]');
        for(var i=0; i< svgs.length; i++){
            var svgOptions = svgs[i].options;
            data.push(svgOptions);
        } 
        for(var i=0; i< svgs.length; i++){
            var objectsLayer = svgs[i].querySelectorAll('[layerGroup=true]');
            for(var j=0; j< objectsLayer.length; j++){
                var objFg = objectsLayer[j].fg;
                data.push(objFg.options);
            }
        }
        for(var i=0; i< svgs.length; i++){ 
            var objects = svgs[i].querySelectorAll('[baseFg=true]');
            for(var j=0; j< objects.length; j++){
                var objFg = objects[j].parentNode.fg;
                if(objFg.options.layer == null || objFg.options.layer != true){
                    data.push(objFg.options);
                }
            }
        }
        var retData = JSON.stringify(data);
        retData = encodeURIComponent(retData); 
        return retData;
    }
    this.loadRecord = function(fileUnqId, callbackFunc){
        var xhttp = new XMLHttpRequest();
        var me = this;
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var resOjb = JSON.parse(this.responseText);
                var success = resOjb.success;
                if(success == false){
                    alert(resOjb.msg);
                    return;
                }
                if(resOjb.data.info == null){
                    alert('Data can not be loaded.');
                    return;
                }
                me.loadObjects(resOjb.data.info.fileCon, callbackFunc);             
            }
        };
        xhttp.open("GET", "../../service/fileInfo.jsp?fileUnqId=" + fileUnqId  , true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
        xhttp.send();
    }
    this.loadFile = function(path, callbackFunc){
        var me = this;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', path, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=UTF-8");
        xhr.onreadystatechange = function() {
            if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                me.loadObjects(xhr.responseText, callbackFunc);
            }
        }
        xhr.send();  
    }
    this.loadObjects = function(data, callbackFunc){
        var me = this;
        data =decodeURIComponent(data);
        var options = [];
        try{
            options =  JSON.parse(data);
        }catch(e){
            try{
                data =decodeURIComponent(data);
                options =  JSON.parse(data);
            }catch(e2){
                alert('The data form to be imported can not be converted to an object type.');
                return;
            }
        }
        var svgs = [];
        for(var i=0; i< options.length; i++){
            var option = options[i];
            if(option.svgRoot==true){
                var svg = this.addSvg(option);
                svgs.push(svg);
                svg.setAttribute('svgKind', option.svgKind);
                svg.setAttribute('pageMaster', option.pageMaster);
                if(option.svgKind == 'master1' || 
                    option.svgKind == 'master2' ||
                    option.svgKind == 'master3'){
                    svg.setAttribute('display', 'none');
                    svg.style.display = 'none';
                    svg.setAttribute('svgKind', option.svgKind);
                } 
            }
        }
        for(var i=0; i< options.length; i++){
            var option = options[i];
            if(option.screenProperties==true){
                if(option.sequenceGab != null && option.sequenceGab != undefined){
                    me.sequenceGab = option.sequenceGab;
                }
                if(option.sequenceLeftGab != null && option.sequenceLeftGab != undefined){
                    me.sequenceLeftGab = option.sequenceLeftGab;
                }
                if(option.sequenceTopGab != null && option.sequenceTopGab != undefined){
                    me.sequenceTopGab = option.sequenceTopGab;
                }
                if(option.sequenceBottomGab != null && option.sequenceBottomGab != undefined){
                    me.sequenceBottomGab = option.sequenceBottomGab;
                }
                me.setScreenSize(option.screenWidth, option.screenHeight);
                break;
            }
        }
        var layerObjs = [];
        for(var i=0; i< options.length; i++){
            var option = options[i];
            if(option.screenProperties==true){
            } else {
                if(option.figureId != null && option.figureId != undefined && option.figureId != '' && option.layer==true){
                    var layerTemp = this.createFg(option, true);
                    layerTemp.group.setAttribute('layerNm',option.layerNm);
                    layerObjs.push(layerTemp);
                }
            }
        }
        for(var i=0; i < layerObjs.length; i++){
            var layerObj = layerObjs[i];
            for(var j=0; j< svgs.length; j++ ){
                if(layerObj.get('parentSvg') == svgs[j].options.figureId){
                    svgs[j].appendChild(layerObj.group);
                    break;
                }
            }
        }
        var objs = [];
        for(var i=0; i< options.length; i++){
            var option = options[i];
            if(option.screenProperties==true){
            } else if(option.svgRoot != null && option.svgRoot == true){
            } else if(option.figureId != null && option.figureId != undefined && option.figureId != '' && option.layer==true){
            } else {
                if(option.figureId != null && option.figureId != undefined && option.figureId != '' && options.svgRoot == null){
                    for(var j=0; j < layerObjs.length; j++){
                        if(option.parentLayer == layerObjs[j].options.figureId){
                            for(var k=0; k < svgs.length; k++ ){
                                if(layerObjs[j].options.parentSvg == svgs[k].options.figureId){
                                    this.svg = svgs[k];
                                    break;
                                }
                            } 
                            this.svg.selectedLayer = layerObjs[j];
                            break;
                        }
                    }
                    var connectedId = option.connectedId;
                    var connectedIndex = option.connectedIndex;
                    var rulerConnectedIdHor = option.rulerConnectedIdHor;
                    var rulerConnectedIndexHor = option.rulerConnectedIndexHor;
                    var rulerConnectedIdVer = option.rulerConnectedIdVer;
                    var rulerConnectedIndexVer = option.rulerConnectedIndexVer;
                    var fg = this.createFg(option, true);
                    if(fg == null){
                        continue;
                    }
                    if(option.basic== true){
                        fg.setActions();
                    }
                    if(fg.options.fgRef != null && fg.options.fgRef != ''){
                        fg.group.tag.setAttribute('fgRef', fg.options.fgRef);
                    }
                    if(fg.options.seqFgAxis == true){
                        sedLib.setSequenceAxisPosition(fg.options.x, fg.options.y, fg, fg.sed);
                    } 
                    if(option.linkClickPage != null && option.linkClickPage != ''){
                        fg.group.tag.addEventListener('click', function(){
                            this.parentNode.fg.sed.setPage(this.parentNode.fg.options.linkClickPage);
                        });
                    }
                    if(option.linkClickUrl != null && option.linkClickUrl != ''){
                        fg.group.tag.addEventListener('click', function(){
                            window.open(this.parentNode.fg.options.linkClickUrl, '_new');
                        });
                    }
                    if(fg.options.text != null && fg.group.tagText != null && fg.group.tagText != undefined){
                        var orgRotate = fg.get('rotate');
                        fg.rotateFg(0, false);
                        fg.draw(202);
                        fg.drawText(45);
                        fg.clientRects = fg.group.tagText.getClientRects();
                        fg.rotateFg(orgRotate, false);
                        fg.draw(203);
                        fg.drawText(46);
                    }
                    if(fg.group.defs == null || fg.group.defs == undefined){
                        continue;
                    }
                    fg.options.rulerConnectedIdHor = rulerConnectedIdHor;
                    fg.options.rulerConnectedIndexHor = rulerConnectedIndexHor;
                    fg.options.rulerConnectedIdVer = rulerConnectedIdVer;
                    fg.options.rulerConnectedIndexVer = rulerConnectedIndexVer; 
                    fg.options.connectedId = connectedId;
                    fg.options.connectedIndex = connectedIndex;
                    objs.push(fg);
                    for(var j=0; j < layerObjs.length; j++){
                        if(option.parentLayer == layerObjs[j].options.parentLayer){
                            layerObjs[j].group.appendChild(fg.group);
                            fg.parentLayer = layerObjs[j];
                            break;
                        }
                    }
                    if(fg.options.figure == 'mapChild'){
                        var mapContainer = document.querySelector('[figureId=' + fg.options.parentLayer + ']');
                        mapContainer.parentNode.tagSvg.appendChild(fg.group);
                    }
                }
            }
        }
        for(var i=0; i < objs.length; i++){
            if(objs[i].get('parentGroup') != null){
                for(var j=0; j <objs.length; j++){
                    if(objs[j].get('figureId') == objs[i].get('parentGroup')){
                        objs[j].group.appendChild(objs[i].group);
                        if(objs[j].options.folder == true){
                            for(var k=0; k< objs[j].options.basicData.objects.length; k++){
                                try{
                                    if( objs[j].options.basicData.objects[k].groupFront != undefined &&
                                        objs[j].options.basicData.objects[k].groupFront == true){
                                        objs[j].group.appendChild(objs[j].group.subGroup[k]);
                                    }
                                }catch(e){}
                            }
                        }
                        objs[i].parentGroupp = objs[j];
                        break;
                    }
                }
            }
        }
        for(var s=0; s< svgs.length; s++){
            for(var i=0; i< options.length; i++){
                if(options.screenProperties==true){
                    continue;
                } 
                var option = options[i];
                var currObj = document.querySelector('[figureId=' + option.figureId + ']');
                if(currObj == null){
                    continue;
                }
                var fg = currObj.parentNode.fg;
                if(fg == null || fg == undefined){
                    continue;
                }
                if(currObj != null && fg.options.rulerConnectedIdHor != undefined ){
                    for( var j=0; j < fg.options.rulerConnectedIdHor.length; j++){
                        var targetObj = svgs[s].querySelector('[figureId=' + fg.options.rulerConnectedIdHor[j] + ']');
                        if(targetObj != null){
                            fg.rulerConnectedHor.push(targetObj.parentNode.fg);
                            fg.rulerConnectedIdHor.push(fg.options.rulerConnectedIdHor[j]);
                            fg.rulerConnectedIndexHor.push(fg.options.rulerConnectedIndexHor[j]);
                        }
                    }
                }
                if(currObj != null && fg.options.rulerConnectedIdVer != undefined ){
                    for( var j=0; j < fg.options.rulerConnectedIdVer.length; j++){
                        var targetObj = svgs[s].querySelector('[figureId=' + fg.options.rulerConnectedIdVer[j] + ']');
                        if(targetObj != null){
                            fg.rulerConnectedVer.push(targetObj.parentNode.fg);
                            fg.rulerConnectedIdVer.push(fg.options.rulerConnectedIdVer[j]);
                            fg.rulerConnectedIndexVer.push(fg.options.rulerConnectedIndexVer[j]);
                        }
                    }
                }
            }
        }
        for(var s = 0; s < svgs.length; s++){
            for(var i=0; i< options.length; i++){
                if(options.screenProperties==true){
                    continue;
                } 
                var option = options[i];
                var currObj = svgs[s].querySelector('[figureId=' + option.figureId + ']');
                if(currObj == null)
                    continue;
                for( var j=0; j < option.connectedId.length; j++){
                    for(var n=0; n< option.connectedId[j].length; n++){
                        if(option.connectedId[j][n] == null){
                            continue;
                        }
                        var targetObj = svgs[s].querySelector('[figureId=' + option.connectedId[j][n] + ']');
                        currObj.parentNode.fg.group.joinDots[j].connected.push(targetObj.parentNode.fg);
                        currObj.parentNode.fg.group.joinDots[j].connectedIndex.push(option.connectedIndex[j][n]);
                    }
                }
            }
        }
        for(var s=0; s< svgs.length; s++){
            for(var i=0; i< options.length; i++){
                var option = options[i];
                if(options.screenProperties==true){
                    continue;
                }
                if(option.figureId ==null || option.figureId == undefined){
                    continue;
                }
                if(svgs[s].querySelector('[figureId=' + option.figureId + ']') == null){
                    continue;
                }
                var targetObj = svgs[s].querySelector('[figureId=' + option.figureId + ']').parentNode.fg;
                if(targetObj.group.tagText != null){
                    targetObj.drawText(41);
                }
                if(option.figure =='flowline' || option.figure =='freeline' || option.figure =='basicPathDot' || option.figure == 'flowline3d'){
                    if(option.lineMoveMode == 'M'){
                        for(var j=0; j< option.lineMoveDir.length; j++){
                            targetObj.options.lineMoveMode = 'M';
                            targetObj.options.lineMovePos[j].x = option.lineMovePos[j].x;
                            targetObj.options.lineMovePos[j].y = option.lineMovePos[j].y;
                        }
                    }
                    targetObj.draw(204);
                }
                if(option.figure == 'line'){
                    targetObj.draw();
                }
            }
        }
        for(var i=0; i< svgs.length; i++){
            if(svgs[i].selectedFg != null){
                svgs[i].selectedFg.hideDot();
                if(this.editMode == false){
                    svgs[i].style['background-image'] = 'url(./img/background/background_blank.png)';
                    var rulerObjs = svgs[i].querySelectorAll('[baseRuler=true]');
                    for(var j=0; j< rulerObjs.length; j++){
                        if(rulerObjs[i].getAttribute('seqFgAxis') == true || rulerObjs[i].getAttribute('seqFgAxis') == "true"){

                        } else {
                            rulerObjs[j].setAttribute('visibility', 'hidden');
                            var tempNode = rulerObjs[j].parentNode;
                            if(tempNode != undefined && tempNode != null){
                                if(tempNode.textDistance != undefined && tempNode.textDistance != null){
                                    tempNode.textDistance.setAttribute('visibility', 'hidden');
                                }
                            }
                        }
                    }
                }
            } 
            if(this.editMode == false){
                this.rulerAlign = false;
            }
        }
        this.setPage(1);
        if(callbackFunc != null){
            callbackFunc();
        }
    }

    this.setDiv = function(q, mode ){
        var me = this;
        me.div = document.querySelector(q);
        me.editMode = mode;
        me.editVisible = 'visible';
        if(me.editMode == false)
            me.editVisible = 'hidden';
    }
    this.setPage = function (pageNum){
        var me = this;
        if(pageNum == null){
            pageNum = 1;
        }
        me.pageNum = pageNum;
        var masterPageNum = 0;
        var svgs = me.div.querySelectorAll('svg[svgRoot=true]');//:nth-child(' + (pageNum) + ')');
        for(var i=0; i< svgs.length; i++ ){
            if(svgs[i].getAttribute('svgKind') == 'master1' || 
               svgs[i].getAttribute('svgKind') == 'master2' ||
               svgs[i].getAttribute('svgKind') == 'master3' ){ // master1, master2, master3
                masterPageNum++;
            } 
            else if(i == pageNum-1 + masterPageNum){
                me.svg = svgs[i];
                if(svgs[i].selectedRectangle != null && svgs[i].selectedRectangle != undefined){
                    me.svg.appendChild(svgs[i].selectedRectangle.group);
                }
                break;
            }
        }
        if(me.editMode == true){
            if(me.editType != 'normal'){
                return;
            }
            document.getElementById('pageBackground').style['background-color'] = me.svg.style['background-color'];
            activeBtnPageNum(pageNum);// 이동하지는 않고 번호만 활성화 한다.
            removeLayerListAll();
            layers = me.svg.querySelectorAll('[layerGroup=true]');
            for(var i=0; i< layers.length; i++){
                if(layers[i].fg.get('layerNm') != null && layers[i].fg.get('layerNm') == 'master' ){
                    continue;
                }
                var kindName = layers[i].fg.get('figure');
                if(kindName == 'layer'){
                    kindName = 'normal';
                }
                else if(kindName == 'layer3d'){
                    kindName = '3D';
                }
                else if(kindName == 'layerSequnce'){
                    kindName = 'sequence';
                }
                if(layers[i].fg != null){
                    addLayerList(layers[i].fg.get('figureId'), kindName, layers[i].fg.get('layerNm'));
                }
                me.svg.selectedLayer = layers[i].fg;
            }
            var layerList = document.querySelector('[ref=listLayer]');
            var allLi = layerList.querySelectorAll('li');
            for(var i=0; i< allLi.length; i++){
                if(i == 0){
                    allLi[i].style.background='yellowgreen';
                } else {
                    allLi[i].style.background='white';
                }
            }
        }
    }
    this.addMasterSvg = function(kind){
        var me = this;
        me.masterMode = kind;
        me.masterPageBefore = me.pageNum;
        document.getElementById('masterOpen').style.display='none';
        document.getElementById('masterClose').style.display='block';
        var svgs = me.div.querySelectorAll('svg[svgRoot=true]');
        var findIt = false;
        for(var i=0; i< svgs.length; i++){
            if(svgs[i].getAttribute('svgKind') == kind){ // master1, master2, master3
                svgs[i].style.display = 'block';
                me.svg = svgs[i];
                me.svg.options.svgKind = kind;
                me.svg.selectedLayer = svgs[i].querySelectorAll('[layerGroup=true]')[0].fg;//layers[0]; // me.svg.layers[0];
                findIt = true;
            } else {
                svgs[i].style.display = 'none';
            }
        }
        if(findIt == false){
            me.svg = this.addSvg();
            me.svg.setAttribute('svgKind', kind);
            me.svg.options.svgKind = kind;
            var obj = onCreateLayer('layer01');
            this.svg.selectedLayer = obj;
        } 
    }
    this.applyMasterSvg = function(){
        var me = this;
        var kind = me.masterMode;
        document.getElementById('masterOpen').style.display='block';
        document.getElementById('masterClose').style.display='none';
        me.masterMode = '';
        copyObj = this.svg.selectedLayer;
        var svgs = me.div.querySelectorAll('svg[svgRoot=true]');
        for(var i=0; i< svgs.length; i++){
            if(svgs[i].getAttribute('svgKind') == 'master1' || 
               svgs[i].getAttribute('svgKind') == 'master2' ||
               svgs[i].getAttribute('svgKind') == 'master3' ){ // master1, master2, master3
                svgs[i].style.display = 'none';
            } else {
                me.svg = svgs[i];
                svgs[i].style.display = 'block';
                if(me.svg.getAttribute('pageMaster') == kind){
                    var masterLayer = svgs[i].querySelector('[layerNm=master]');
                    if(masterLayer != null){
                        svgs[i].removeChild(masterLayer);
                        //delete masterLayer;
                        masterLayer = undefined;
                    }
                    var options = { baseFg:true, baseSp:true, centerSp:false,  sameWh:false, 
                        figure:'layer',
                        layerNm:'master', 
                        selectable:false,
                        layer:true,
                        draw:false,
                        figureId:sedLib.createFigureId('layer'), src:'', 
                        parentSvg:sed.svg.options.figureId,
                        rotate:0, scale:1, x:0, y:0, width:100, height:60, // width, height는 의미가 없음.
                        stroke:'#000000', fill:'#ffffff', strokeWidth:1,
                        text:'', textHAlign:'center', textVAlign:'middle', textFill:'#000000', textFontFamily:'돋움', textFontSize:16 };
                    var obj = me.createFg(options);
                    obj.group.setAttribute('layerNm', 'master');
                    obj.parentSvg = me.svg;
                    me.svg.insertBefore(obj.group, me.svg.firstChild);
                    me.svg.selectedLayer = obj;
                    this.pasteChild(sed.svg.selectedLayer);
                }
            }
        }
        me.setPage(me.masterPageBefore);
    }
    // 임의로 몇단계만.. 수정할것.
    this.pasteChild = function(newFg){
        if(copyObj.group == null || copyObj.group == undefined){
            return;
        }
        var children = copyObj.group.childNodes;
        for(var i=0; i< children.length; i++){
            var child = children[i];
            if(child.getAttribute('figureId') != null && child.getAttribute('figureId') == copyObj.get('figureId')){
            } else if(child.fg != null) {
                var fg1 = child.fg;
                var options1 = JSON.parse(JSON.stringify(fg1.options));
                options1.figureId = sedLib.createFigureId(options1.figure);
                var newFg1 = sed.createFg(options1);
                //this.copyFilter(newFg1, options1);    
                newFg.group.appendChild(newFg1.group);
                var children2 = fg1.group.childNodes;
                for(var i2=0; i2< children2.length; i2++){
                    var child2 = children2[i2];
                    if(child2.getAttribute('figureId') != null && child2.getAttribute('figureId') == fg1.get('figureId')){
                    } else if(child2.fg != null) {
                        var fg2 = child2.fg;
                        var options2 = JSON.parse(JSON.stringify(fg2.options));
                        options2.figureId = sedLib.createFigureId(options2.figure);
                        var newFg2 = sed.createFg(options2);
                        //this.copyFilter(newFg2, options2);    
                        newFg1.group.appendChild(newFg2.group);
                        var children3 = fg2.group.childNodes;
                        for(var i3=0; i3< children3.length; i3++){
                            var child3 = children3[i3];
                            if(child3.getAttribute('figureId') != null && child3.getAttribute('figureId') == fg2.get('figureId')){
                            } else if(child3.fg != null) {
                                var fg3 = child3.fg;
                                var options3 = JSON.parse(JSON.stringify(fg3.options));
                                options3.figureId = sedLib.createFigureId(options3.figure);
                                var newFg3 = sed.createFg(options3);
                                //this.copyFilter(newFg3, options3);    
                                newFg2.group.appendChild(newFg3.group);
                                var children4 = fg3.group.childNodes;
                                for(var i4=0; i4< children4.length; i4++){
                                    var child4 = children4[i4];
                                    if(child4.getAttribute('figureId') != null && child4.getAttribute('figureId') == fg3.get('figureId')){
                                    } else if(child4.fg != null) {
                                        var fg4 = child4.fg;
                                        var options4 = JSON.parse(JSON.stringify(fg4.options));
                                        options4.figureId = sedLib.createFigureId(options4.figure);
                                        var newFg4 = sed.createFg(options4);
                                        //this.copyFilter(newFg4, options4);    
                                        newFg3.group.appendChild(newFg4.group);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    this.addSvg = function(options){
        var me = this;
        var svgs = me.div.querySelectorAll('svg[svgRoot=true]');
        var masterCount = 0;
        for(var i=0; i<svgs.length; i++){
            if( svgs[i].getAttribute('svgKind') == 'master1' ||
                svgs[i].getAttribute('svgKind') == 'master2' || 
                svgs[i].getAttribute('svgKind') == 'master3'){
                masterCount++;
            }
        }
        var pageNum = Number(svgs.length) - Number(masterCount);
        svg = this.createSvg(options);
        svg.onmousedown=function(event){
            event.stopPropagation();
            if(me.editMode == false){
                if(me.moveMode == 'canvas'){

                } else if(me.editType == 'move'){
                    me.svg.selectedDownFg = null;
                    me.svg.selectedFg = null;
                    if(me.editTypeGroup == undefined || me.editTypeGroup == 'none'){
                        return;
                    }
                } else {
                    return;
                }
            }
            if(me.editPopMode == true){
                return;
            }
            if(event.button != 0){
                return;
            }  
            try{
                closeContextMenu();
                closeContextMenuBasicPathDot();
            }catch(e){}
            if(me.svg.selectedFg != null){
                me.svg.selectedFg.hideDot();
                me.svg.selectedFg = null;
            }
            me.svg.beforeOffsetX = event.screenX;
            me.svg.beforeOffsetY = event.screenY;
            me.startScrollTop = me.svg.parentNode.scrollTop; 
            me.startScrollLeft = me.svg.parentNode.scrollLeft;
            me.svg.downOffsetX = event.screenX;
            me.svg.downOffsetY = event.screenY;
            var top = me.div.offsetTop;
            var left = me.div.offsetLeft;
            var eventMovementRatioX;
            var eventMovementRatioY;
            if(sedLib.browserCls == 'ie' || sedLib.browserCls == 'edge'){
                eventMovementRatioX = event.x / me.screenRatio;
                eventMovementRatioY = event.y / me.screenRatio;
            } else {
                eventMovementRatioX = event.offsetX / me.screenRatio;
                eventMovementRatioY = event.offsetY / me.screenRatio;
            }
            me.svg.selectedMousedownFg = null;
            if(me.svg.selectedMousedownFg == null){ // 선택된 객체가 없다.
                me.svg.groupSelectedMode = false;
                me.svg.groupSelectMode  = true;
                if(me.svg.selectedRectangle != null){
                    me.svg.selectedRectangle.set('width', 1);
                    me.svg.selectedRectangle.set('height', 1);
                    me.svg.selectedRectangle.resizePointTo(3,0,0);
                    me.svg.selectedRectangle.setHidden(false); // 수정했음..
                    me.svg.selectedRectangle.showDot();
                    me.svg.selectedRectangle.moveXY(eventMovementRatioX, eventMovementRatioY);
                    me.svg.selectedRectangle.draw(205);
                }
            }
        }
        svg.onmousemove=function(event){
            if(me.editMode == false){
                if(me.moveMode == 'canvas'){
                } else if(me.editType =='move'){
                } else {
                    return;
                }
            }
            if(sedLib.browserCls == 'safari'){
                if(event.button != 0){
                    return;
                }  
            } else {
                if(event.buttons != 1){
                    return;
                }  
            }
            var movePos = me.svg.getMovementXY(event);
            if(me.moveMode == 'canvas'){
                var xC = me.startScrollLeft *(-1) + movePos.x;
                var yC = me.startScrollTop * (-1) + movePos.y;
                setTimeout(function(){
                    me.svg.parentNode.scrollLeft += movePos.x;
                    me.svg.parentNode.scrollTop += movePos.y;
                },100);
                return;
            }
            if(me.svg.selectedFg != undefined && me.svg.selectedFg != null){
                if(me.svg.selectedFg.get('fix') == true || me.svg.selectedFg.get('mapFixPos') == true){
                    return;
                }
            }
            //if(me.svg.selectedFg != undefined && me.svg.selectedFg != null)
            //    me.svg.selectedFg.hideAutoButton();
            var eventMovementRatioX = movePos.x/ me.screenRatio;//event.movementX / me.screenRatio;  //
            var eventMovementRatioY = movePos.y/ me.screenRatio;//event.movementY / me.screenRatio;
            if(me.svg.groupSelectedMode == true){
                if(me.svg.selectedFg != null && me.svg.selectedFg.tagName == 'selectedRectangle'){
                    if(me.svg.selectedDownFgDot != null){
                        var bfSelectedFg = me.svg.selectedFg;
                        for(var i=0; i < me.svg.groupSelectedArray.length; i++ ){
                            me.svg.groupSelectedArray[i].resizePointTo(me.svg.selectedDownFgDotIndex, eventMovementRatioX , eventMovementRatioY);
                        }
                        me.svg.selectedFg = bfSelectedFg;
                    } else {
                        var bfSelectedFg = me.svg.selectedFg;
                        for(var i=0; i < me.svg.groupSelectedArray.length; i++ ){
                            me.svg.groupSelectedArray[i].moveTo(eventMovementRatioX , eventMovementRatioY);
                        }
                        me.svg.selectedFg = bfSelectedFg;
                    }
                }
            }
            if(me.rotateMode == true){
                if(me.svg.selectedDownFg == null || (me.svg.selectedDownFg.get('rotatable') != null && me.svg.selectedDownFg.get('rotatable') == false)){
                    return;
                }
                if(me.svg.selectedFg != null){
                    var top = me.div.offsetTop;
                    var left = me.div.offsetLeft;
                    var tempX = 0;
                    var tempY = 0;
                    if(sedLib.browserCls =='ie' || sedLib.browserCls == 'edge'){
                        tempX = (event.x )  / me.screenRatio - me.svg.selectedFg.get('x');// + event.movementX;
                        tempY = (event.y )  / me.screenRatio - me.svg.selectedFg.get('y'); //+ me.svg.selectedFg.get('height')/2 + 50;//me.svg.selectedFg.get('y') + event.movementY;// + me.svg.selectedFg.get('height')/2 + 50 ;//50은 높이임
                    } else if (sedLib.browserCls =='firefox'){ 
                        if(me.svg.selectedFg.parentGroup != null){
                            tempX = (event.layerX )  / me.screenRatio - (me.svg.selectedLayer.get('x') + me.svg.selectedFg.parentGroup.get('x') + me.svg.selectedFg.get('x'));// + event.movementX;
                            tempY = (event.layerY )  / me.screenRatio - (me.svg.selectedLayer.get('y') + me.svg.selectedFg.parentGroup.get('y') + me.svg.selectedFg.get('y')); //+ me.svg.selectedFg.get('height')/2 + 50;//me.svg.selectedFg.get('y') + event.movementY;// + me.svg.selectedFg.get('height')/2 + 50 ;//50은 높이임
                        } else {
                            tempX = (event.layerX )  / me.screenRatio - (me.svg.selectedLayer.get('x') + me.svg.selectedFg.get('x'));// + event.movementX;
                            tempY = (event.layerY )  / me.screenRatio - (me.svg.selectedLayer.get('y') + me.svg.selectedFg.get('y')); //+ me.svg.selectedFg.get('height')/2 + 50;//me.svg.selectedFg.get('y') + event.movementY;// + me.svg.selectedFg.get('height')/2 + 50 ;//50은 높이임
                        }                    
                    } else {
                        if(me.svg.selectedFg.parentGroup != null){
                            tempX = (event.offsetX )  / me.screenRatio - (me.svg.selectedLayer.get('x') + me.svg.selectedFg.parentGroup.get('x') + me.svg.selectedFg.get('x'));// + event.movementX;
                            tempY = (event.offsetY )  / me.screenRatio - (me.svg.selectedLayer.get('y') + me.svg.selectedFg.parentGroup.get('y') + me.svg.selectedFg.get('y')); //+ me.svg.selectedFg.get('height')/2 + 50;//me.svg.selectedFg.get('y') + event.movementY;// + me.svg.selectedFg.get('height')/2 + 50 ;//50은 높이임
                        } else {
                            tempX = (event.offsetX )  / me.screenRatio - (me.svg.selectedLayer.get('x') + me.svg.selectedFg.get('x'));// + event.movementX;
                            tempY = (event.offsetY )  / me.screenRatio - (me.svg.selectedLayer.get('y') + me.svg.selectedFg.get('y')); //+ me.svg.selectedFg.get('height')/2 + 50;//me.svg.selectedFg.get('y') + event.movementY;// + me.svg.selectedFg.get('height')/2 + 50 ;//50은 높이임
                        }
                    } 
                    if(tempX ==0 && tempY ==0){
                        return;
                    }
                    var retRadian = Math.asin(tempX / Math.sqrt(tempX * tempX + tempY*tempY));
                    var retAngle = sedLib.getRadianToAngle(retRadian);
                    var bfAngle = retAngle;
                    if(tempY <=0 && tempX <0){
                        retAngle = 360 + retAngle;
                    } else if(tempY > 0){
                        retAngle = 180 - retAngle;
                    }
                    me.svg.selectedFg.rotate = retAngle;
                    me.svg.selectedFg.rotateFg( retAngle);
                }
                return;
            }
            if(me.svg.groupSelectedMode == false){
                if(me.svg.groupSelectMode == true){
                    me.svg.selectedRectangle.resizePointTo(3, eventMovementRatioX , eventMovementRatioY);
                }
            }
            if(me.svg.selectedDownFgLineDot != null){ // 여기추가
                if(me.svg.selectedFg != null  && (me.svg.selectedFg.tagName == 'flowline' || me.svg.selectedFg.tagName == 'flowline3d')){
                    if(me.svg.selectedDownFgLineDotIndex == 0){
                        me.svg.selectedDownFg.moveLineTo(0, eventMovementRatioX , eventMovementRatioY);
                    }
                    if(me.svg.selectedDownFgLineDotIndex == 1){
                        me.svg.selectedDownFg.moveLineTo(1, eventMovementRatioX , eventMovementRatioY);
                    }
                    if(me.svg.selectedDownFgLineDotIndex == 2){
                        me.svg.selectedDownFg.moveLineTo(2, eventMovementRatioX , eventMovementRatioY);
                    }
                }
            } else if(me.svg.selectedFg != null && me.svg.selectedFg.tagName == 'layer3d' && me.svg.selectedDownFgDot != null){
                //me.svg.selectedFg.resizePointToLayer3D(me.svg.selectedDownFgDotIndex, eventMovementRatioX , eventMovementRatioY);
                //me.svg.selectedFg.resizePointTo3D(me.svg.selectedDownFgDotIndex, eventMovementRatioX , eventMovementRatioY);
            } else if( me.svg.selectedDownFg != null && me.svg.selectedDownFgDot != null && me.svg.selectedDownFg.get('d3b') == true && me.svg.selectedDownFg.tagName != 'flowline3d'){ 
                // else if((me.svg.selectedFg.get('d3')== true && me.svg.selectedFg.parentLayer.options.figure=='layer3d' )|| me.svg.selectedFg.get('layer3d')== true){
                me.svg.selectedFg.resizePointTo3D(me.svg.selectedDownFgDotIndex, eventMovementRatioX , eventMovementRatioY);
            }  else if(me.svg.selectedDownFg != null && me.svg.selectedDownFgDot != null){
                if(me.svg.selectedFg != null && (me.svg.selectedFg.tagName == 'line' || me.svg.selectedFg.tagName == 'flowline'  || me.svg.selectedFg.tagName == 'freeline'  || me.svg.selectedFg.tagName == 'basicPathDot'  || me.svg.selectedFg.tagName == 'flowline3d' || me.svg.selectedFg.tagName == 'seqLine')){
                    var all = me.svg.querySelectorAll('[baseFg=true]');
                    var xx = event.offsetX / me.screenRatio - (me.svg.selectedFg.parentLayer.get('x'));
                    var yy = event.offsetY / me.screenRatio - (me.svg.selectedFg.parentLayer.get('y'));
                    for(var idx=all.length-1; idx >= 0; idx--){
                        var targetFg = all[idx].parentNode.fg;
                        sedLib.getPosCalc2(targetFg, xx, yy);
                    }
                    // 여기호출... 아래 모든 점에 대해서 처리하도록 할것.
                    if( me.svg.selectedFg.tagName == 'freeline' ||  me.svg.selectedFg.tagName == 'basicPathDot'){
                        me.svg.selectedDownFg.movePointTo(me.svg.selectedDownFgDotIndex, eventMovementRatioX , eventMovementRatioY);
                    } else {
                        if(me.svg.selectedDownFgDotIndex ==0){
                            me.svg.selectedDownFg.movePointTo(0, eventMovementRatioX , eventMovementRatioY);
                        } else if(me.svg.selectedDownFgDotIndex ==1){
                            me.svg.selectedDownFg.movePointTo(1, eventMovementRatioX , eventMovementRatioY);
                        }  
                    }
                } else if( me.svg.selectedFg != null && me.svg.selectedFg.get('group') == true){
                    // 2019.08.02
                    //resizePointToSub( me.svg.selectedDownFg, me.svg.selectedDownFgDotIndex, eventMovementRatioX , eventMovementRatioY);
                    

                    me.svg.selectedDownFg.resizePointTo(me.svg.selectedDownFgDotIndex, eventMovementRatioX , eventMovementRatioY);
                    var objects = me.svg.selectedFg.group.querySelectorAll('[baseFg=true]');
                    for(var i=0; i < objects.length; i++){
                        var objFg = objects[i].parentNode.fg;
                        if(objFg.get('group') != true){
                            objFg.moveTo(eventMovementRatioX /(-2),eventMovementRatioY /(-2));
                            objFg.rotateFg(objFg.options.rotate, false);
                            //objFg.moveJoinDots();
                            objFg.calcWidthHeight();
                            objFg.draw(205);  
                        }
                    }  
                } else {
                    if(me.svg.selectedDownFg.get('resizable') != null && me.svg.selectedDownFg.get('resizable') == false){
                        return;
                    }
                    if(eventMovementRatioX > 100 || eventMovementRatioY > 100 ){
                        return;
                    }
                    // 2019.08.02
                    //resizePointToSub( me.svg.selectedDownFg, me.svg.selectedDownFgDotIndex, eventMovementRatioX , eventMovementRatioY);

                    if(me.svg.selectedDownFg.options.baseSp == true){
                        if(me.svg.selectedDownFg.get('resizableVer') != undefined && me.svg.selectedDownFg.get('resizableVer') == false){
                            if(me.svg.selectedDownFgDotIndex == 0 || me.svg.selectedDownFgDotIndex == 1 || me.svg.selectedDownFgDotIndex == 3 || me.svg.selectedDownFgDotIndex == 4 || me.svg.selectedDownFgDotIndex == 5 || me.svg.selectedDownFgDotIndex==7){
                                return;
                            }
                        }
                        if(me.svg.selectedDownFg.get('resizableHor') != undefined && me.svg.selectedDownFg.get('resizableHor') == false){
                            if(me.svg.selectedDownFgDotIndex == 1 || me.svg.selectedDownFgDotIndex == 2 || me.svg.selectedDownFgDotIndex == 3 || me.svg.selectedDownFgDotIndex == 5 || me.svg.selectedDownFgDotIndex == 6 || me.svg.selectedDownFgDotIndex==7){
                                return;
                            }
                        }
                    }

                    me.svg.selectedDownFg.resizePointTo(me.svg.selectedDownFgDotIndex, eventMovementRatioX , eventMovementRatioY);
                    if(me.svg.selectedDownFg.options.figure == 'basic'){
                        me.svg.selectedDownFg.setActions();
                    }
                }
            } else if(me.svg.selectedDownFg != null){
                if(me.svg.selectedDownFg.get('movable') != null && me.svg.selectedDownFg.get('movable') == false){
                    return;
                }
                if(me.svg.selectedDownFg.tagName == 'line' || me.svg.selectedDownFg.tagName == 'flowline' || me.svg.selectedDownFg.tagName == 'freeline' || me.svg.selectedDownFg.tagName == 'basicPathDot' || me.svg.selectedDownFg.tagName == 'flowline3d'){
                    var pass = true;
                    for(var i= 0; i< me.svg.selectedDownFg.options.connectedId.length; i++){
                        for(var j=0; j< me.svg.selectedDownFg.options.connectedId[i].length; j++){
                            if(me.svg.selectedDownFg.options.connectedId[i][j] == null){
                                continue;
                            }
                            pass = false;
                            break;
                        }
                    }
                    if(pass == true){
                        me.svg.selectedDownFg.moveTo(eventMovementRatioX , eventMovementRatioY);
                    }
                } else {
                    if(eventMovementRatioX > 100 || eventMovementRatioY > 100 ){
                        return;
                    }
                    me.svg.selectedDownFg.moveTo(eventMovementRatioX , eventMovementRatioY);
                    if(me.connectionAuto == true){
                        sedLib.connectAuto(me.svg.selectedDownFg, me);
                    }
                }
            } 
            if(me.svg.selectedDownFg != null && me.svg.selectedDownFg.get('group') == true){
                var objects = me.svg.selectedDownFg.group.querySelectorAll('[baseFg=true]');
                for(var i=0; i < objects.length; i++){
                    var objFg = objects[i].parentNode.fg;
                    objFg.moveTo(0,0);
                    objFg.moveJoinDots();
                    objFg.calcWidthHeight();
                    objFg.draw(206);  
                } 
            } 
            if( me.svg.selectedFg != null && 
                me.svg.selectedFg.parentLayer != null && 
                me.svg.selectedFg.parentLayer.options.figure == 'layerDistance' ){
                sedLib.calcDistance(me.svg.selectedFg);
            }
            if( me.svg.selectedFg != null && 
                me.svg.selectedFg.parentLayer != null && 
                me.svg.selectedFg.parentLayer.options.figure == 'layerMap' ){
                sedLib.calcLatLng(me.svg.selectedFg);
            }
            me.setPropertiesMove(me.svg.selectedFg);
        }
        svg.onmouseup=function(event){
            event.stopPropagation();
            me.resizeMode = false;
            if(me.editMode == false){
                if(me.moveMode == 'canvas'){

                } else if(me.editType == 'move'){
                } else {
                    return;
                }
            }
            if(me.svg == null){
                return;
            }
            if(event.button==2){
                return;
            }
            var movePos = me.svg.getMovementXYFromDownToUp(event);
            var eventMovementRatioX = movePos.x/ me.screenRatio;//event.movementX / me.screenRatio;  //
            var eventMovementRatioY = movePos.y/ me.screenRatio;//event.movementY / me.screenRatio;
            if(me.svg.selectedDownFgLineDot != null && me.svg.selectedDownFgLineDot != undefined){
            } else if(me.svg.selectedFg != null && me.svg.selectedFg.tagName == 'layer3d' && me.svg.selectedDownFgDot != null){
                me.svg.selectedFg.resizePointToLayer3D(me.svg.selectedDownFgDotIndex, eventMovementRatioX , eventMovementRatioY)
            } else if(me.svg.selectedDownFg != null && me.svg.selectedDownFg != undefined && me.svg.selectedDownFgDot != null){
                if( me.svg.selectedFg != null && 
                    (me.svg.selectedFg.tagName == 'line' || 
                    me.svg.selectedFg.tagName == 'flowline' || 
                    me.svg.selectedFg.tagName == 'freeline' || 
                    me.svg.selectedFg.tagName == 'basicPathDot' || 
                    me.svg.selectedFg.tagName == 'flowline3d' || 
                    me.svg.selectedFg.tagName == 'seqLine')){                   
                } else if( me.svg.selectedFg != null && me.svg.selectedFg.get('d3b')== true){
                }
            }
            me.svg.groupSelectedArray = [];
            if(me.svg.groupSelectMode == true && me.svg.selectedRectangle != null){
                var areaLeft = me.svg.selectedRectangle.get('x') - Math.abs(me.svg.selectedRectangle.get('width'))/2;
                var areaRight =  me.svg.selectedRectangle.get('x') + Math.abs(me.svg.selectedRectangle.get('width'))/2;
                var areaTop = me.svg.selectedRectangle.get('y') - Math.abs(me.svg.selectedRectangle.get('height'))/2;
                var areaBottom =  me.svg.selectedRectangle.get('y') + Math.abs(me.svg.selectedRectangle.get('height'))/2;
                var all = me.svg.querySelectorAll('[baseFg=true]');
                var tempCount = 0;
                for(var i=0; i < all.length; i++){
                    var f = all[i].parentNode.fg;
                    if( me.masterMode == 'master1' || 
                        me.masterMode == 'master2' || 
                        me.masterMode == 'master3'){
                    } else {
                        if(f.parentLayer != null && f.parentLayer != undefined &&  f.parentLayer.get('layerNm') == 'master'){
                            continue;
                        }
                    }
                    if( f.options['groupLeft'] >= areaLeft &&
                        f.options['groupRight'] <= areaRight &&
                        f.options['groupTop'] >= areaTop &&
                        f.options['groupBottom'] <= areaBottom ){
                        me.svg.groupSelectedArray.push(f);
                        tempCount++;
                    }
                }
                if(tempCount == 0){
                    me.svg.selectedRectangle.setHidden('hidden');
                    me.svg.selectedRectangle.hideDot();
                    me.svg.groupSelectMode = false;
                    me.svg.groupSelectedMode = false;
                } else {
                    me.svg.groupSelectMode = true;
                    me.svg.groupSelectedMode = true;
                }
            }
            if(me.svg.selectedDownFg != null && me.svg.selectedDownFg.get('group') == true){
                var objects = me.svg.selectedDownFg.group.querySelectorAll('[baseFg=true]');
                for(var i=0; i < objects.length; i++){
                    var objFg = objects[i].parentNode.fg;
                    objFg.moveTo(0,0);
                    objFg.moveJoinDots();
                    objFg.calcWidthHeight();
                    objFg.draw(207);  
                } 
            }                
            me.rotateMode = false;
            if(me.editPopMode == true){

            } else {
                me.svg.selectedDownFg = null; 
            }  
            me.svg.selectedDownFgDot = null;  
            me.svg.selectedDownFgLineDot = null; 
            me.addHistory();
        }
        svg.addEventListener('mousedown', function(event){
            event.stopPropagation();
            if(me.svg == svg){
                return;
            } 
            if(me.svg.getAttribute('figureId') == svg.getAttribute('figureId')){
                return;
            }  
            var svgs = me.div.querySelectorAll('svg[svgRoot=true]');  
            var masterCountTemp = 0;  
            for(var i=0; i< svgs.length; i++){
                if( svgs[i].getAttribute('svgKind') == 'master1' ||
                    svgs[i].getAttribute('svgKind') == 'master2' || 
                    svgs[i].getAttribute('svgKind') == 'master3'){
                    masterCountTemp++;
                } else if(svgs[i] == svg){
                    me.svg = svg;
                    me.setPage(i+1-masterCountTemp);
                    break;
                }
            }
        });
        me.startScrollTop = 0;
        me.startScrollLeft = 0;
        svg.beforeOffsetX = null;
        svg.beforeOffsetY = null;
        svg.getMovementXY= function(event){
            if(event.movementX != null && event.movementX != undefined){
                return {
                    x:event.movementX,
                    y:event.movementY
                };
            }
            var retValue = {x:0, y:0}; 
            if( svg.beforeOffsetX == null || svg.beforeOffsetY == null){
                svg.beforeOffsetX = event.screenX;
                svg.beforeOffsetY = event.screenY;
            }
            retValue = {
                x:Number(event.screenX) - Number(me.svg.beforeOffsetX),
                y:Number(event.screenY) - Number(me.svg.beforeOffsetY) 
            };
            svg.beforeOffsetX = event.screenX;
            svg.beforeOffsetY = event.screenY;
            return retValue;
        }
        svg.downOffsetX = null;
        svg.downOffsetY = null;
        svg.getMovementXYFromDownToUp= function(event){
            var retValue = {x:0, y:0}; 
            if( svg.downOffsetX == null || svg.downOffsetY == null){
                svg.downOffsetX = event.screenX;
                svg.downOffsetY = event.screenY;
            }
            retValue = {
                x:Number(event.screenX) - Number(svg.downOffsetX),
                y:Number(event.screenY) - Number(svg.downOffsetY) 
            };
            svg.downOffsetX = null;
            svg.downOffsetY = null;
            return retValue;
        }
        svg.getMovementX = function(event){
        }
        this.setPage(pageNum + 1);
        svg.selectedRectangle = me.createFg({ baseFg:false, figure:'selectedRectangle', figureId:sedLib.createFigureId('selectedRectangle'), src:'', 
                    rotate:0, scale:1, x:-100, y:-100, width:0, height:0, stroke:'#000000', fill:'yellow', fillOpacity:0.2, strokeWidth:0.5, strokeDasharray:'2,2',
                    text:'', textHAlign:'center', textVAlign:'middle', textFill:'#000000', textFontFamily:'돋움', textFontSize:20, visibility:'hidden' });  

        svg.selectedRectangle.group.setAttribute('oncontextmenu', 'return false');            
        svg.selectedRectangle.setHidden(true);
        svg.selectedRectangle.hideDot(true);
        /*
        svg.autoButton0 = document.createElementNS("http://www.w3.org/2000/svg", 'g');  
        svg.autoButton0.setAttribute('xmlns', 'http://www.w3.org/2000/svg'); 
        svg.autoButton1 = document.createElementNS("http://www.w3.org/2000/svg", 'g');  
        svg.autoButton1.setAttribute('xmlns', 'http://www.w3.org/2000/svg'); 
        svg.autoButton2 = document.createElementNS("http://www.w3.org/2000/svg", 'g');  
        svg.autoButton2.setAttribute('xmlns', 'http://www.w3.org/2000/svg'); 
        svg.autoButton3 = document.createElementNS("http://www.w3.org/2000/svg", 'g');  
        svg.autoButton3.setAttribute('xmlns', 'http://www.w3.org/2000/svg'); 
        svg.autoButton0.tag0 = document.createElementNS("http://www.w3.org/2000/svg", 'path');   // 사각형 영역
        svg.autoButton0.tag0.setAttribute('xmlns', 'http://www.w3.org/2000/svg'); 
        svg.autoButton0.tag0.setAttribute('d', 'M0,-6 L10,10 L-10,10 L0,-6');
        svg.autoButton0.tag0.setAttribute('fill', 'lightblue');
        svg.autoButton0.tag0.setAttribute('visibility', 'hidden');
        svg.autoButton0.tag0.setAttribute('fill-opacity', '0.8');
        svg.autoButton1.tag1 = document.createElementNS("http://www.w3.org/2000/svg", 'path');   // 사각형 영역
        svg.autoButton1.tag1.setAttribute('xmlns', 'http://www.w3.org/2000/svg'); 
        svg.autoButton1.tag1.setAttribute('d', 'M6,0 L-10,10 L-10,-10 L6,0');
        svg.autoButton1.tag1.setAttribute('fill', 'lightblue');
        svg.autoButton1.tag1.setAttribute('visibility', 'hidden');
        svg.autoButton1.tag1.setAttribute('fill-opacity', '0.8');
        svg.autoButton2.tag2 = document.createElementNS("http://www.w3.org/2000/svg", 'path');   // 사각형 영역
        svg.autoButton2.tag2.setAttribute('xmlns', 'http://www.w3.org/2000/svg'); 
        svg.autoButton2.tag2.setAttribute('d', 'M0,6 L-10,-10 L10,-10 L0,6 ');
        svg.autoButton2.tag2.setAttribute('fill', 'lightblue');
        svg.autoButton2.tag2.setAttribute('visibility', 'hidden');
        svg.autoButton2.tag2.setAttribute('fill-opacity', '0.8');
        svg.autoButton3.tag3 = document.createElementNS("http://www.w3.org/2000/svg", 'path');   // 사각형 영역
        svg.autoButton3.tag3.setAttribute('xmlns', 'http://www.w3.org/2000/svg'); 
        svg.autoButton3.tag3.setAttribute('d', 'M-6,0 L10,-10 L10,10 L-6,0 ');
        svg.autoButton3.tag3.setAttribute('fill', 'lightblue');
        svg.autoButton3.tag3.setAttribute('visibility', 'hidden');
        svg.autoButton3.tag3.setAttribute('fill-opacity', '0.8');
        svg.autoButton0.appendChild(svg.autoButton0.tag0);
        svg.autoButton1.appendChild(svg.autoButton1.tag1);
        svg.autoButton2.appendChild(svg.autoButton2.tag2);
        svg.autoButton3.appendChild(svg.autoButton3.tag3);
        svg.appendChild(svg.autoButton0);
        svg.appendChild(svg.autoButton1);
        svg.appendChild(svg.autoButton2);
        svg.appendChild(svg.autoButton3);
        svg.autoButton0.onmousedown= function(event){
            sedLib.autoCreate(me.svg.selectedFg, 'N', me.autoButtonLineKind);
        };
        svg.autoButton1.onmousedown= function(event){
            sedLib.autoCreate(me.svg.selectedFg, 'E', me.autoButtonLineKind);
        };
        svg.autoButton2.onmousedown= function(event){
            sedLib.autoCreate(me.svg.selectedFg, 'S', me.autoButtonLineKind);
        };
        svg.autoButton3.onmousedown= function(event){
            sedLib.autoCreate(me.svg.selectedFg, 'W', me.autoButtonLineKind);
        };   
        */             
        return svg;        
    }
    this.createFg = function(p, loadCls, drawCls){
        var me = this;
        var temp;
        if(p.parentSvg != undefined){
            temp = p.parentSvg;
        }
        p.parentSvg = undefined;
        var options = JSON.parse(JSON.stringify(p));
        options.parentSvg = temp;
        
        if(loadCls == undefined || loadCls == null || loadCls == false){
            options.figureId = sedLib.createFigureId(options.figure);
        }
        var fg = new Fg(me);
        var retFg= fg.createFg(options);
        if(retFg == null){
            return null;
        }
        // map 일경우 
        if(fg.parentLayer != undefined && fg.parentLayer.options.figure == 'layerMap'){
            fg.options.baseMapScale = fg.parentLayer.options.mapScale;
            fg.options.baseMapWidth = fg.get('width');
            fg.options.baseMapHeight = fg.get('height');
        }
        //fg.draw(208); 2019.08.03
        if(fg.group.tagText != undefined && fg.group.tagText != null){
            if(fg.options.text != undefined && fg.options.text != null && fg.options.text != ''){
                var orgRotate = fg.get('rotate');
                fg.rotateFg(0, false);
                fg.draw(209);
                fg.drawText();
                fg.clientRects = fg.group.tagText.getClientRects();
                fg.rotateFg(orgRotate, false);
                fg.draw(210);
                fg.drawText();
            }
        }
        if(fg.options.figure == 'groupNone' || fg.options.folder == true){
            me.createChild(fg);
        }
        if(drawCls == null || drawCls == true){
            fg.redraw(211);
        }
        return fg;
    }
    // 임의로 몇단계만 .. 수정할것.
    this.createChild = function(newFg){
        var options = newFg.options;
        newFg.sed.svg.selectedLayer.group.appendChild(newFg.group);
        var children = options.children;
        if(children == undefined){
            return;
        }
        for(var i=0; i< children.length; i++){
            var options1 = children[i];
            options1.figureId = sedLib.createFigureId(options1.figure);
            var newFg1 = newFg.sed.createFg(options1);
            newFg.group.appendChild(newFg1.group);
            newFg1.parentGroup = newFg;
            //sed.copyFilter(newFg1, options1);
            var children2 = options1.children;
            for(var i2=0; children2 != undefined && i2< children2.length; i2++){
                var options2 = children2[i2];
                options2.figureId = sedLib.createFigureId(options2.figure);
                var newFg2 = newFg.sed.createFg(options2);
                //sed.copyFilter(newFg2, options2);
                newFg1.group.appendChild(newFg2.group);
                newFg2.parentGroup = newFg1;
                var children3 = options2.children;
                for(var i3=0; children3 != undefined && i3< children3.length; i3++){
                    var options3 = children3[i3];
                    options3.figureId = sedLib.createFigureId(options3.figure);
                    var newFg3 = newFg.sed.createFg(options3);
                    //sed.copyFilter(newFg3, options3);
                    newFg2.group.appendChild(newFg3.group);
                    newFg3.parentGroup = newFg2;
                    var children4 = options3.children;
                    for(var i4=0; children4 != undefined && i4< children4.length; i4++){
                        var options4 = children4[i4];
                        options4.figureId = sedLib.createFigureId(options4.figure);
                        var newFg4 = newFg.sed.createFg(options4);
                        //sed.copyFilter(newFg4, options4);
                        newFg3.group.appendChild(newFg4.group);
                        newFg4.parentGroup = newFg3;
                    }
                }
            }
        } 
    }
    this.removeFg = function(selectedFg){
        var me = this;
        if(me.svg.groupSelectedMode == true){
            for(var i=0; i< me.svg.groupSelectedArray.length; i++){
                me.removeFgItem(me.svg.groupSelectedArray[i]);
            }
        } else if(selectedFg != null){
            me.removeFgItem(selectedFg);

        }
    }
    this.removeFgItem = function(selectedFg){
        var me = this;
        var joinDots = selectedFg.group.joinDots; // 확인
        for(var i=0; i< joinDots.length; i++){
            for(var j=0; j < joinDots[i].connected.length; j++){
                var tempFg = joinDots[i].connected[j];
                var tempFgIndex = joinDots[i].connectedIndex[j];
                for(var k=0; k < tempFg.group.joinDots[tempFgIndex].connected.length; k++){
                    if(tempFg.group.joinDots[tempFgIndex].connected[k] == selectedFg){
                        tempFg.group.joinDots[tempFgIndex].connected.splice(k,1);
                        tempFg.group.joinDots[tempFgIndex].connectedIndex.splice(k,1);
                        tempFg.options.connectedId[tempFgIndex].splice(j,1);
                        tempFg.options.connectedIndex[tempFgIndex].splice(j,1);
                        if(tempFg.figureId > me.figureId){
                            me.figureId = tempFg.figureId;
                        }
                    }
                }       
            }
        }
        selectedFg.group.parentNode.removeChild(selectedFg.group);
        // delete selectedFg;
        selectedFg = undefined;
    }
    this.moveByKeyCode = function(dir){
        if(this.svg.selectedFg == null){
            return;
        }
        if(dir == 'left'){
            this.svg.selectedFg.moveTo(-1,0);
        } else if(dir == 'right'){
            this.svg.selectedFg.moveTo(1,0);
        } else if(dir == 'up'){
            this.svg.selectedFg.moveTo(0,-1);
        } else if(dir == 'down'){
            this.svg.selectedFg.moveTo(0,1);
        }
    }
    this.setPageSize = function(width, height){
    }
    this.removeFgAll = function(){
        while (this.div.firstChild){
            this.div.removeChild(this.div.firstChild);
            //delete this.div.firstChild
            this.div.firstChild = undefined;
        }  
    }
    this.selectNone = function(){
    }
    this.createSvg = function(options, kind){   
        var defaultKind = 'none';
        if(kind != null){
            defaultRootVal = kind;
        }
        var style = '';
        if(options == null){
            if(this.gridState == 'show'){
                options = {
                    width:this.screenWidth,
                    height:this.screenHeight,
                    svgRoot:true,
                    svgKind:defaultKind,
                    figureId:sedLib.createFigureId('svg'),
                    style:'display:inline;position:relative;margin:20px 20px 20px 20px;border:1px;background-image:url(./img/background/background_20.png);background-color:white;',
                    viewBox:'0 0 ' + this.screenWidth + ' ' + this.screenHeight
                };    
            } else if(this.gridState == 'hidden'){
                options = {
                    width:this.screenWidth,
                    height:this.screenHeight,
                    svgRoot:true,
                    svgKind:defaultKind,
                    figureId:sedLib.createFigureId('svg'),
                    style:'display:inline;position:relative;margin:20px 20px 20px 20px;border:1px;background-image:url(./img/background/background_blank.png);background-color:white;',
                    viewBox:'0 0 ' + this.screenWidth + ' ' + this.screenHeight
                };  
            }      
        } else {
            var backgroundColor = options.backgroundColor;
            if(options.backgroundColor == undefined){
                backgroundColor = 'white';
            }
            if(options.style == undefined || options.style == null){
                options.style = style;// 'display:inline;position:relative;margin:20px 20px 20px 20px;border:1px;background-image:url(./img/background/background_blank.png);background-color:' + backgroundColor + ';';
            }
        }
        var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
            svg.setAttribute('version', '1.1');
            svg.setAttribute('width', options.width * this.screenRatio); //  svgWidth * ratio
            svg.setAttribute('height', options.height * this.screenRatio);
            svg.setAttribute('svgRoot', options.svgRoot);
            svg.setAttribute('figureId', options.figureId);
            svg.setAttribute('style', options.style);
            svg.setAttribute('viewBox', options.viewBox);
        svg.options = options;
        this.div.appendChild(svg);
        return svg;
    }
    this.createLayer = function(layerNm){
        var obj= this.createFg({ baseFg:true, baseSp:true, centerSp:false,  sameWh:false, 
            figure:'layer',
            layerNm:layerNm, 
            layer:true,
            draw:false,
            figureId:sedLib.createFigureId('layer'), src:'', 
            parentSvg:this.svg.options.figureId,
            rotate:0, scale:1, x:0, y:0, width:100, height:60, 
            stroke:'#000000', fill:'#ffffff', strokeWidth:1,
            text:'', textHAlign:'center', textVAlign:'middle', textFill:'#000000', textFontFamily:'돋움', textFontSize:16 });
        obj.parentSvg = this.svg;
        return obj;
    }
    this.hideJoinDotAll = function(){
        var me = this;
        var all = me.svg.querySelectorAll('[baseFg=true]');
        for(var i=0; i<all.length; i++){
            if(all[i].parentNode == undefined){
                continue;
            }
            var fg = all[i].parentNode.fg;
            fg.hideJoinDot();
        }
    }
    this.findCompLike=function(fgRef, fgGrp){
        var me = this;
        if(this.exeMode == 'dashboard'){
            var comp = me.dashboardDiv.querySelector('[fgRef*=' + fgRef + ']');
            if(comp == null){
                alert('Can not find object name ' + fgRef);
                return;
            }
            return comp.parentNode.fg;
        } else if(this.exeMode == 'slide'){
            var comp = me.slideDiv.querySelector('[fgRef*=' + fgRef + ']');
            if(comp == null){
                alert('Can not find object name ' + fgRef);
                return;
            }
            return comp.parentNode.fg;
        } else {
            if(fgGrp != null){
                var grp = me.svg.querySelector('[fgRef=' + fgGrp + ']');
                var comp = grp.querySelector('[fgRef*=' + fgRef + ']');
                if(comp == null){
                    alert('Can not find object name ' + fgRef);
                    return;
                }
                return comp.parentNode.fg;
            } else {
                var comp = me.svg.querySelector('[fgRef*=' + fgRef + ']');
                if(comp == null){
                    alert('Can not find object name ' + fgRef);
                    return;
                }
                return comp.parentNode.fg;
            }
        }
    }
    this.findCompByFigureId = function(figureId){
        var fgs = this.svg.querySelectorAll('[baseFg=true]');
        for(var i=0; i < fgs.length; i++){
            var fg = fgs[i].parentNode.fg;
            if(fg.options.figureId == figureId){
                return fg;
            }
        }
        return null;
    }
    this.findComp=function(fgRef, fgGrp){
        var me = this;
        if(this.exeMode == 'dashboard'){
            var comp = me.dashboardDiv.querySelector('[fgRef=' + fgRef + ']');
            if(comp == null){
                alert('Can not find object name ' + fgRef);
                return;
            }
            return comp.parentNode.fg;
        } else if(this.exeMode == 'slide'){
            var comp = me.slideDiv.querySelector('[fgRef=' + fgRef + ']');
            if(comp == null){
                alert('Can not find object name ' + fgRef);
                return;
            }
            return comp.parentNode.fg;
        } else {
            if(fgGrp != null){
                var grp = me.svg.querySelector('[fgRef=' + fgGrp + ']');
                var comp = grp.querySelector('[fgRef=' + fgRef + ']');
                if(comp == null){
                    alert('Can not find object name ' + fgRef);
                    return;
                }
                return comp.parentNode.fg;
            } else {
                var comp = me.svg.querySelector('[fgRef=' + fgRef + ']');
                if(comp == null){
                    alert('Can not find object name ' + fgRef);
                    return;
                }
                return comp.parentNode.fg;
            }
        }
    }
    this.findCompChild = function (p, fgRef){
        var c = p.group.querySelector('[fgRef=' + fgRef + ']');
        return c.parentNode.fg;
    }
    this.findCompAll=function(fgRef,fgGrp){
        var me = this;
        if(this.exeMode == 'dashboard'){
            var comp = me.dashboardDiv.querySelectorAll('[fgRef=' + fgRef + ']');
            if(comp.length == 0){
                alert('Can not find object name ' + fgRef);
                return [];
            }
            var ret =[];
            for(var i=0; i< comp.length;i++){
                ret.push(comp[i].parentNode.fg)
            }
            return ret;
        } else if(this.exeMode == 'slide'){
            var comp = me.slideDiv.querySelectorAll('[fgRef=' + fgRef + ']');
            if(comp.length == 0){
                alert('Can not find object name ' + fgRef);
                return [];
            }
            var ret =[];
            for(var i=0; i< comp.length;i++){
                ret.push(comp[i].parentNode.fg)
            }
            return ret;
        } else {
            if(fgGrp != null){
                var grp = me.svg.querySelector('[fgRef=' + fgGrp + ']');
                var comp = grp.querySelectorAll('[fgRef=' + fgRef + ']');
                if(comp.length == 0){
                    alert('Can not find object name ' + fgRef);
                    return [];
                }
                var ret =[];
                for(var i=0; i< comp.length;i++){
                    ret.push(comp[i].parentNode.fg)
                }
                return ret;
            } else {
                var comp = me.svg.querySelectorAll('[fgRef=' + fgRef + ']');
                if(comp.length == 0){
                    alert('Can not find object name ' + fgRef);
                    return [];
                }
                var ret =[];
                for(var i=0; i< comp.length;i++){
                    ret.push(comp[i].parentNode.fg)
                }
                return ret;
            }
        }
    }
    this.applyHmiIns = function(){
        if(sed.svg.selectedFg.options.hmiInsType == '1'){
            sed.svg.selectedFg.options.hmiData.objects[1].text = document.getElementById('hmiInsTop').value;
            sed.svg.selectedFg.refresh(301);
        } else if(sed.svg.selectedFg.options.hmiInsType == '2' || sed.svg.selectedFg.options.hmiInsType == '3'){
            sed.svg.selectedFg.options.hmiData.objects[2].text = document.getElementById('hmiInsTop').value;
            sed.svg.selectedFg.options.hmiData.objects[1].strokeDasharray = document.getElementById('hmiInsLine').value;
            sed.svg.selectedFg.options.hmiData.objects[3].text = document.getElementById('hmiInsBottom').value;
            sed.svg.selectedFg.refresh(302);
        }
    }
    this.applyText = function(){
        var me = this;
        if(me.svg.selectedFg == null){
            alert('Select shape first.')
            return;
        }
        if(sedLib.browserCls == 'ie' || sedLib.browserCls == 'edge' || sedLib.browserCls == 'safari' ){
            me.svg.selectedFg.options['text'] = textEditor.document.body.innerHTML;
        } else {
            me.svg.selectedFg.options['text'] = textEditor.contentWindow.document.body.innerHTML;
        }
        var orgRotate = me.svg.selectedFg.get('rotate');
        me.svg.selectedFg.rotateFg(0, false);
        me.svg.selectedFg.draw(219);
        me.svg.selectedFg.drawText(42); 
        setTimeout(function(){
            me.svg.selectedFg.clientRects = me.svg.selectedFg.group.tagText.getClientRects();
            sedLib.appendTspan(me.svg.selectedFg, me.svg.selectedFg.group.tagText, me.svg.selectedFg.options['text']);
            setTimeout(function(){
                me.svg.selectedFg.rotateFg(orgRotate, false);
                me.svg.selectedFg.draw(220);
                me.svg.selectedFg.drawText(43);   
            },100); 
        },100);   
    }
    this.setSlide = function(str){
        this.exeMode = 'slide';
        this.editMode = false;
        this.slideDiv = dom;
    }
    this.setArea = function(dom){
        this.dashboardDiv = dom;
        var me = this;
        this.dashboardDiv.innerHTML = 
        '        <div class="dashboard-container" ref="presInner" style="width:100%">' + 
        '</div>' +     
        '<div ref="svgArea" style="visibility:hidden">' + 
		'</div>';
        me.div = this.dashboardDiv.querySelector('div[ref=svgArea]', true);
        me.editMode = false;
        me.editVisible = 'visible';
        if(me.editMode == false)
            me.editVisible = 'hidden';
        this.exeMode = 'dashboard';
        this.editMode = false;
        me.activePage(1);
    }
    this.initDiagram = function(opts){
        var me = this;
        me.editType = 'normal';
        //me.editType='flowchart';
        me.connectionAuto = true; // 겹칠경우 자동으로 연결된다. 
        var style = 'display:inline;position:relative;';

        if(opts.margin != null){
            style = style + 'margin:' + opts.margin + ';';
        }
        if(opts.border != null){
            style = style + 'border:' + opts.border + ';';
        }
        if(opts.backgroundImage != null){
            style = style + 'background-image:' + opts.backgroundImage + ';';
        }
        if(opts.backgroundColor != null){
            style = style + 'background-color:' + opts.backgroundColor + ';';
        }
        var options = {
            width:opts.width,
            height:opts.height,
            svgRoot:true,
            svgKind:'none',
            figureId:sedLib.createFigureId('svg'),
            style:style,
            viewBox:'0 0 ' + opts.width + ' ' + opts.height
        }; 
        me.svg = this.addSvg(options);
        me.screenRatio = 1;
        var layer = me.createLayer('layer');
        me.svg.selectedLayer = layer;
    }
    this.setDashboard = function (str){
        this.exeMode = 'dashboard';
        this.editMode = false;
        this.dashboardDiv = document.querySelector(str);
    }
    this.initDashboard = function(){
        var me = this;
        var presInner = this.dashboardDiv.querySelector('[ref=presInner]');
        var svgs = me.div.querySelectorAll('svg[svgRoot=true]');    
        var screenWidth = me.dashboardDiv.offsetWidth;
        var screenHeight = me.dashboardDiv.offsetHeight;
        var screenRate = screenWidth/screenWidth;
        var svgWidth = svgs[0].getAttribute('width');
        var svgHeight = svgs[0].getAttribute('height');
        var svgRatio = svgWidth/svgHeight;
        var direction = 'hor';
        var ratio = 1;
        if(svgRatio <= screenRate){
            direction = 'ver';
            ratio = screenHeight/svgHeight;
            presInner.setAttribute('height', '100%');
            presInner.setAttribute('width', '100%');
        } else {
            direction = 'hor';
            ratio = screenWidth/svgWidth;
            presInner.setAttribute('width', '100%');
            presInner.setAttribute('height', '100%');
        }   
        me.screenRatio = ratio;
        for(var i=0; i< svgs.length; i++){
            var div = document.createElement('div');
            div.style.width = '100%';
            div.style.height = '100%';
            div.style.padding= '0px';
            div.style.margin = '0px';
            div.appendChild(svgs[i]);
            svgs[i].setAttribute('width', '100%');
            svgs[i].setAttribute('height', '100%');
            svgs[i].style.margin = '0px';
            svgs[i].style.padding = '0px';
            if(sedLib.browserCls == 'ie'){
                svgs[i].setAttribute('preserveAspectRatio','xMidYMin slice');
            }
            presInner.appendChild(div);
        }
    }
    this.activePage = function(num){
        var me = this;
        var svgs = this.dashboardDiv.querySelectorAll('svg[svgRoot=true]');  
        var count = 0;
        for(var i=0; i< svgs.length; i++){
            if(svgs[i].getAttribute('svgKind') == 'master1' || 
               svgs[i].getAttribute('svgKind') == 'master2' ||
               svgs[i].getAttribute('svgKind') == 'master3' ){ // master1, master2, master3
                svgs[i].parentNode.parentNode.style.display = 'none';
            } else {
                if(num == count+1){
                    svgs[i].parentNode.parentNode.style.display = 'block';
                } else {
                    svgs[i].parentNode.parentNode.style.display = 'none';
                }
                count++;
            }
        }
    }
    this.initPaging = function(){
        var me = this;
        var indicator = this.slideDiv.querySelector('[ref=carouselIndicator]');
        var presInner = this.slideDiv.querySelector('[ref=presInner]');
        var svgsBf = me.div.querySelectorAll('svg[svgRoot=true]');   
        var svgs = [];
        for(var i=0; i< svgsBf.length; i++){
            if(svgsBf[i].getAttribute('svgKind') == 'master1' || 
                svgsBf[i].getAttribute('svgKind') == 'master2' || 
                svgsBf[i].getAttribute('svgKind') == 'master3'){
            } else {
                svgs.push(svgsBf[i]);
            }
        } 
        //delete svgsBf;
        svgsBf = undefined;
        var screenWidth = me.slideDiv.offsetWidth -100;
        var screenHeight = me.slideDiv.offsetHeight -30;
        var screenRate = screenWidth/screenHeight;
        var svgWidth = svgs[0].getAttribute('width');
        var svgHeight = svgs[0].getAttribute('height');
        var svgRatio = svgWidth/svgHeight;
        var direction = 'hor';
        var ratio = 1;
        if(svgRatio <= screenRate){
            direction = 'ver';
            ratio = screenHeight/svgHeight;
            presInner.setAttribute('height', '100%');
            presInner.setAttribute('width', '100%');
        } else {
            direction = 'hor';
            ratio = screenWidth/svgWidth;
            presInner.setAttribute('width', '100%');
            presInner.setAttribute('height', '100%');
        }   
        me.screenRatio = ratio;
        for(var i=0; i< svgs.length; i++){
            var div = document.createElement('div');
            div.style.width = '100%';
            div.style.height = '100%';
            div.setAttribute('class', 'mySlides fade')
            div.setAttribute('ref', 'mySlides');
            var divNum = document.createElement('div');
            divNum.setAttribute('class', 'numbertext');
            divNum.innerHTML = (i+1) + '/' + svgs.length;
            div.appendChild(divNum);
            div.appendChild(svgs[i]);
            var divContent = document.createElement('div');
            divContent.style.width = '100%';
            divContent.style.height = '100%';
            divContent.appendChild(svgs[i]);
            div.appendChild(divContent);
            if(direction == 'hor'){
                svgs[i].setAttribute('width', svgWidth * ratio);
                svgs[i].setAttribute('height', svgHeight * ratio);
                svgs[i].style.margin = 0;
                svgs[i].style.padding = 0;
                svgs[i].style.left = (screenWidth + 100 - (svgWidth * ratio)) /2
            } else {
                svgs[i].setAttribute('width', svgWidth * ratio);
                svgs[i].setAttribute('height', svgHeight * ratio);
                svgs[i].style.margin = 0;
                svgs[i].style.padding = 0;
                svgs[i].style.left = ((screenWidth + 100 - (svgWidth * ratio)) / 2);
            }
            presInner.appendChild(div);
            var span = document.createElement('span');
            span.setAttribute('class', 'dot');
            span.setAttribute('ref', 'dot');
            span.innerHTML = (i+1);
            indicator.appendChild(span);
            span.onclick=function(){
                me.currentSlide(this.innerHTML);
            }
        }
        var a1 = document.createElement('a');
        a1.setAttribute('class', 'prev');
        a1.onclick = function(){
            me.plusSlides(-1);
        }
        a1.innerHTML = '&#10094;'; 
        var a2 = document.createElement('a');
        a2.setAttribute('class', 'next');
        a2.onclick = function(){
            me.plusSlides(1);
        }
        a2.innerHTML = '&#10095;'; 
        presInner.appendChild(a1);
        presInner.appendChild(a2);
    }
    this.slideResize = function(){
        var me = this;
        var indicator = me.slideDiv.querySelector('[ref=carouselIndicator]');
        var presInner = me.slideDiv.querySelector('[ref=presInner]');
        var screenWidth = me.slideDiv.offsetWidth -100;
        var screenHeight = me.slideDiv.offsetHeight -30;
        var screenRatio = screenWidth/screenHeight;
        var svgs = me.slideDiv.querySelectorAll('svg[svgRoot=true]');
        if(svgs.length == 0){
            return;
        }
        var svgWidth = svgs[0].getAttribute('width');
        var svgHeight = svgs[0].getAttribute('height');
        var svgRatio = svgWidth/svgHeight;
        var direction = 'hor';
        var ratio = 1;
        if(svgRatio <= screenRatio){
            direction = 'ver';
            ratio = screenHeight/svgHeight;
            presInner.setAttribute('height', '100%');
            presInner.setAttribute('width', '100%');
        } else {
            direction = 'hor';
            ratio = screenWidth/svgWidth;
            presInner.setAttribute('width', '100%');
            presInner.setAttribute('height', '100%');
        }      
        for(var i=0; i< svgs.length; i++){
            if(direction == 'hor'){
                svgs[i].setAttribute('width', svgWidth * ratio);
                svgs[i].setAttribute('height', svgHeight * ratio);
                svgs[i].style.margin = 0;
                svgs[i].style.padding = 0;
                svgs[i].style.left = (screenWidth + 100 - (svgWidth * ratio)) /2;
                svgs[i].style.top = 1;
            } else {
                svgs[i].setAttribute('width', svgWidth * ratio);
                svgs[i].setAttribute('height', svgHeight * ratio);
                svgs[i].style.margin = 0;
                svgs[i].style.padding = 0;
                svgs[i].style.left = ((screenWidth + 100 - (svgWidth * ratio)) / 2);
                svgs[i].style.top = 1;
            }
        }
    }
    this.slideIndex = 1;
    this.plusSlides = function(n) {
        this.showSlides(this.slideIndex += Number(n));
    }
    this.currentSlide = function (n) {
        this.showSlides(this.slideIndex = Number(n));
    }
    this.showSlides = function(n) {
        this.slideIndex = Number(n);
        var i;
        var slides = this.slideDiv.querySelectorAll("[ref=mySlides]");
        var dots = this.slideDiv.querySelectorAll("[ref=dot]");
        if (n > slides.length) {this.slideIndex = 1} 
        if (n < 1) {this.slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none"; 
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        if(this.slideIndex < 1){
            this.slideIndex = 1;
        }
        slides[this.slideIndex-1].style.display = "inline"; 
        dots[this.slideIndex-1].className += " active";
    }
    this.setScreenSize = function(width, height){
        if(document.getElementById('screenWidth') != null){
            document.getElementById('screenWidth').value = width;
            document.getElementById('screenHeight').value = height;    
        }
        this.screenWidth = width;
        this.screenHeight = height;
        svgWidth = width;
        svgHeight = height;
        var svgs = this.div.querySelectorAll('svg[svgRoot=true]');
        for(var i=0; i< svgs.length; i++){
            svgs[i].options.width = width;
            svgs[i].options.height = height;
            svgs[i].options.viewBox = '0 0 ' + width + ' ' + height;
        }
        this.onChangeScreenRatio();
    }    
    this.onChangeScreenRatio = function(){
        var me = this;
        var screenRatio =1;
        var rulerSize = 20;
        if(document.querySelector('[ref=screenRatio]') != null){
            screenRatio = document.querySelector('[ref=screenRatio]').value;
            rulerSize= document.querySelector('[ref=rulerSize]').value;
            rulerSizeX = rulerSize;
            rulerSizeY = rulerSize;
        }
        this.screenRatio = screenRatio;
        var svgArea = document.querySelector('[ref=svgArea]');
        var sedSvgs = svgArea.querySelectorAll('[svgRoot=true]');
        for(var i=0; i< sedSvgs.length; i++){
            var sedSvg = sedSvgs[i];
            sedSvg.setAttribute('width', svgWidth*me.screenRatio);
            sedSvg.setAttribute('height', svgHeight*me.screenRatio);
            var width = sedSvg.getAttribute('width');
            var height = sedSvg.getAttribute('height');
            width = width/this.screenRatio;
            height = height/this.screenRatio;
            sedSvg.setAttribute('viewBox','0 0 ' + width + ' ' + height);
            sedSvg.style['background-size'] = (Number(rulerSize) * 2 * this.screenRatio) + 'px ';//(40 * sed.screenRatio) + 'px ';
        }
    }
}