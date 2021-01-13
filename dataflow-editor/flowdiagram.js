// 기존함수를 오버라이드하므로 var 를 사용하지 않는다.
setTagsShapeEx = function(fg, options, isCreate){
    
    if(fg.tagName == 'diagram'){
        if(isCreate == true){
            if(fg.options.shape == 'rect'){
                var elementTag = 'rect';
                sedLib.createBasicShape (fg, options, elementTag);
            } else if(fg.options.shape == 'ellipse'){
                var elementTag = 'ellipse';
                sedLib.createBasicShape (fg, options, elementTag);
            }
            var hmiJoinDots = fg.options.joinDotsPosData;
            var joinLength = fg.group.joinDots.length;
            for(var i=joinLength-1; i >=0; i--){
                fg.group.removeChild(fg.group.joinDots[i]);
            }
            fg.options.joinDotsPos = [];
            fg.options.connectedId = [];
            fg.options.connectedIndex = [];
            fg.options.joinDotsPos = [];
            fg.options.joinDotsPosCalc = [];
            fg.group.joinDots = [];
            for(var i=0; i < hmiJoinDots.length; i++){
                fg.options.joinDotsPos[i] = {
                    x:hmiJoinDots[i].x * fg.options.width / 100,
                    y:hmiJoinDots[i].y * fg.options.height / 100,
                    dir:hmiJoinDots[i].dir};
                fg.options.joinDotsPosCalc[i] = {
                    x:hmiJoinDots[i].x * fg.options.width / 100,
                    y:hmiJoinDots[i].y * fg.options.height / 100,
                    dir:hmiJoinDots[i].dir};

                fg.options.connectedId.push([]);
                fg.options.connectedIndex.push([]);
                var joinDot = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
                joinDot.setAttribute('xmlns', 'http://www.w3.org/2000/svg'); 
                joinDot.setAttribute('cx', fg.options.joinDotsPos[i].x);
                joinDot.setAttribute('cy', fg.options.joinDotsPos[i].y);
                joinDot.setAttribute('fill-opacity', 1);
                joinDot.setAttribute('dir', hmiJoinDots[i].dir);
                joinDot.setAttribute('r', 5);
                joinDot.setAttribute('stroke','black');
                joinDot.setAttribute('fill','yellow');
                joinDot.setAttribute('visibility','hidden'); //hidden;      
                joinDot.setAttribute('dotIndex', i);     
                joinDot.connected = [];
                joinDot.connectedIndex = [];
                fg.group.appendChild(joinDot);   
                fg.group.joinDots.push(joinDot);
            }
            fg.set('diagram', true);
            fg.set('parentLayer', fg.sed.svg.selectedLayer.get('figureId')); 
            fg.parentLayer = fg.sed.svg.selectedLayer;
            fg.sed.svg.selectedLayer.group.appendChild(fg.group); 
            fg.group.tag.setAttribute('diagramObj', 'true');
            var img = createDiagramTagImg(fg, options);
            fg.group.tagText.setAttribute('text-anchor', 'middle');
            fg.group.tagText.setAttribute('x', 0);
            fg.group.buttons = [];
            createDiagramSubButton(fg, options);
            fg.setImage = function(url){
                console.log('url', url);
                fg.options.imageSrc = url;
                fg.group.img.setAttributeNS('http://www.w3.org/1999/xlink','xlink:href',  fg.options.imageSrc);
            } 
            fg.showButtons = function(){
                for(var i=0; i< fg.group.buttons.length; i++){
                    if(fg.options.btnVisibles[i]=='visible'){
                        fg.group.buttons[i].style.visibility = 'visible';
                        fg.group.btnImages[i].style.visibility = 'visible';
                    } else {
                        fg.group.buttons[i].style.visibility = 'hidden';
                        fg.group.btnImages[i].style.visibility = 'hidden';
                    }
                }
            }
            fg.hideButtons = function(){
                for(var i=0; i< fg.group.buttons.length; i++){
                    fg.group.buttons[i].style.visibility = 'hidden';
                    fg.group.btnImages[i].style.visibility = 'hidden';
                }
            }
            fg.hideButton = function(index){
                if(index < 0 || index >= fg.group.buttons.length){
                    alert('유효한 버튼 index가 아닙니다.');
                    return;
                }
                fg.options.btnVisibles[index] = 'hidden';

                fg.arrangeButton();
            }
            fg.showButton = function(index){
                if(index < 0 || index >= fg.group.buttons.length){
                    alert('유효한 버튼 index가 아닙니다.');
                    return;
                }
                fg.options.btnVisibles[index] = 'visible';
                fg.arrangeButton();
            }
            fg.changeButtonImage = function(index, url){
                console.log('emfddjdha');
                fg.options.btnImages[index] = url;
                fg.group.btnImages[index].setAttributeNS('http://www.w3.org/1999/xlink','xlink:href',  url);
                console.log('emfddjdha2');
            }
            fg.arrangeButton = function(){
                var buttonCount = fg.group.buttons.length;
                var buttonEnableCount = 0;
                for(var i=0; i< fg.group.buttons.length; i++){
                    if(fg.options.btnVisibles[i] == 'visible'){
                        fg.group.buttons[i].style.visibility = 'visible';
                        fg.group.btnImages[i].style.visibility = 'visible';
                        buttonEnableCount++;
                    } else {
                        fg.group.buttons[i].style.visibility = 'hidden';
                        fg.group.btnImages[i].style.visibility = 'hidden';
                    }
                }
                if(fg.options.btnShape == 'circle'){
                    var areaWidth = fg.options.btnXGab * (buttonEnableCount-1);
                    for(var i=0; i< fg.options.btnImages.length; i++){
                        if(fg.options.btnVisibles[i] == 'visible'){
                            areaWidth += (fg.options.btnRadius[i]*2);
                        }
                    }
                    var startX = areaWidth / (-2);
                    var count = 0;
                    var currX = 0;
                    var currY = 0;
                    for(var i=0; i< fg.options.btnImages.length; i++){
                        if(fg.options.btnVisibles[i] == 'visible'){
                            if(count == 0){
                                currX = startX + fg.options.btnRadius[i];
                            } else {
                                currX = currX + fg.options.btnRadius[i] + fg.options.btnXGab;
                            }
                            currY = fg.options.height/ (-2) - fg.options.btnYGab - fg.options.btnRadius[i];
                            fg.group.buttons[i].setAttribute('cx', currX);
                            fg.group.buttons[i].setAttribute('cy', currY);
                            fg.group.btnImages[i].setAttribute('x', currX - (fg.options.btnImageWidth[i]/2 ));
                            fg.group.btnImages[i].setAttribute('y', currY - (fg.options.btnImageHeight[i]/2 ));
                            currX += fg.options.btnRadius[i];
                            count++;   
                        }
                    }
                } 
            }
            if(fg.options.shape == 'ellipse'){       
                fg.group.tag.setAttribute('cx', 0);
                fg.group.tag.setAttribute('cy', 0);
                fg.group.tag.setAttribute('rx', fg.options.width/2);
                fg.group.tag.setAttribute('ry', fg.options.height/2);
            }
            fg.getInputLines = function(){
                var lines =[];
                for(var i=0; i < fg.group.joinDots.length; i++){
                    for( var i2=0; i2 < fg.group.joinDots[i].connected.length; i2++){
                        var lineTemp = fg.group.joinDots[i].connected[i2];
                        if(fg.group.joinDots[i].connectedIndex[i2] == 1){
                            lines.push(fg.group.joinDots[i].connected[i2]);
                        }
                    }
                }
                return lines;
            }
            fg.getOutputLines = function(){
                var lines =[];
                for(var i=0; i < fg.group.joinDots.length; i++){
                    for( var i2=0; i2 < fg.group.joinDots[i].connected.length; i2++){
                        var lineTemp = fg.group.joinDots[i].connected[i2];
                        console.log('lineTemp', lineTemp);
                        if(fg.group.joinDots[i].connectedIndex[i2] == 0){
                            lines.push(fg.group.joinDots[i].connected[i2]);
                        }
                    }
                }
                return lines;
            }
            fg.getInputNodes = function(){
                var nodes = [];
                var lines = fg.getInputLines();
                for(var i=0; i < lines.length; i++){
                    if(lines[i].group.joinDots[0].connected.length > 0){
                        var node = lines[i].group.joinDots[0].connected[0];
                        nodes.push(node);
                    }
                }
                return nodes;
            }
            fg.getOutputNodes = function(){
                var nodes = [];
                var lines = fg.getInputLines();
                for(var i=0; i < lines.length; i++){
                    if(lines[i].group.joinDots[1].connected.length > 0){
                        var node = lines[i].group.joinDots[1].connected[0];
                        nodes.push(node);
                    }
                }
                return nodes;
            }
            fg.arrangeButton();
        }
        return fg;
    }
    
}

setProperties = function(){
    console.log('setProperty flow');
}
var createDiagramTagImg = function(fg, options){
    if(options.imageSrc == null || options.imageSrc == undefined || options.imageSrc == ''){
        return null;
    }
    var img = document.createElementNS("http://www.w3.org/2000/svg", "image"); 
    img.setAttribute('xmlns', 'http://www.w3.org/2000/svg');  
    img.setAttribute('version', '1.1');
    img.setAttribute('preserveAspectRatio', 'none');
    img.setAttributeNS('http://www.w3.org/1999/xlink','xlink:href',  options.imageSrc);
    img.setAttribute('x', options.imageWidth/2 * (-1) + 'px');
    img.setAttribute('y', options.imageHeight/2 * (-1) + 'px');
    img.setAttribute('width', options.imageWidth + 'px');
    img.setAttribute('height', options.imageHeight + 'px');    
    if(img != null){
        fg.group.appendChild(img);
        fg.group.img = img;
    } 
}
var createDiagramSubButton = function(fg, options){
    var buttons = [];
    var cxList = [-35, 0, 35];
    var cyList = [-65, -65, -65];
    for(var i=0; i< options.btnImages.length; i++){
        var button = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        button.setAttribute('stroke', options.btnStroke);
        button.setAttribute('stroke-width', options.btnStrokeWidth);
        button.setAttribute('fill', options.btnFill);   
        button.setAttribute('cx', cxList[i]); //options.btnFill);   
        button.setAttribute('cy', cyList[i]); //
        button.setAttribute('r', options.btnRadius[i]);
        buttons.push(button);
    }
    for(var i=0; i< buttons.length; i++){
        fg.group.appendChild(buttons[i]);
    }
    fg.group.buttons= buttons;
    var btnImages = [];
    for(var i=0; i< options.btnImages.length; i++){
        var img = document.createElementNS("http://www.w3.org/2000/svg", "image"); 
        img.setAttribute('xmlns', 'http://www.w3.org/2000/svg');  
        img.setAttribute('btnIndex', i);
        img.setAttribute('version', '1.1');
        img.setAttribute('preserveAspectRatio', 'none');
        img.setAttributeNS('http://www.w3.org/1999/xlink','xlink:href',  options.btnImages[i]);
        img.setAttribute('x', (cxList[i] - options.btnImageWidth[i]/2) + 'px');
        img.setAttribute('y', (cyList[i] - options.btnImageHeight[i]/2)  + 'px');
        img.setAttribute('width', options.btnImageWidth[i] + 'px');
        img.setAttribute('height', options.btnImageHeight[i] + 'px');  
        img.onclick = function(event){
            var button = this.parentNode.buttons[this.getAttribute('btnIndex')];
            if(sedLib.browserCls == 'ie') {
                button.fireEvent("onclick");
            } else {
                var event = document.createEvent("MouseEvents");
                event.initEvent("click", false, true);
                button.dispatchEvent(event);
            }
        } 
        btnImages.push(img); 
    }
    for(var i=0; i< btnImages.length; i++){
        fg.group.appendChild(btnImages[i]);
        
    }
    fg.group.btnImages= btnImages;
}

var createDiagramFg = function(pSed, x, y, options){
    options.baseFg = true;
    options.baseSp = true;
    options.centerSp = false;
    options.samWh = false;
    options.autoFgAdd = false;
    options.scale = 1;
    options.x = x; 
    options.y = y;
    if(options.shape == 'ellipse'){
        options.cx = x;
        options.cy = y;
        options.width = options.rx * 2;
        options.height = options.ry * 2;
    }
    options.figureId = sedLib.createFigureId(options.figure);
    var fg = pSed.createFg(options);
    return fg;
}
var createFlowline = function( pSed, x, y){
    var flowline = pSed.createFg({ 
        baseFg:true, 
        baseSp:false, 
        centerSp:false, 
        sameWh:false, 
        figure:'flowline', 
        figureId:sedLib.createFigureId('flowline'), 
        arrowType1:'', 
        arrowType2:'triangle',
        bazierCurve:'Y', 
        rotate:0, 
        scale:1, 
        x1:x, 
        y1:y, 
        x2:x+200, 
        y2:y+100,  
        fill:'black'
    });
    return flowline;
} 
var verifyDiagram = function(pSed){
    var all = pSed.svg.querySelectorAll('[baseFg=true]');
    var diagrams = [];
    var flowlines =  [];
    for(var i=0; i < all.length; i++){
        var fg = all[i].parentNode.fg;
        if(fg.tagName == 'diagram'){
            diagrams.push(fg);
        } else {
            flowlines.push(fg);
        }
    }
    for(var i=0; i< diagrams.length; i++){
        var pass = false;
        for(var j=0; j < diagrams[i].group.joinDots.length; j++){
            var joinDot = diagrams[i].group.joinDots[j];
            if(joinDot.connected.length > 0){
                pass = true;
            }
        }
        if(pass == false){
            alert(diagrams[i].options.text + '(이)가 연결되지 않았습니다.');
            return false;
        }
    }
    return true;
}
var getDiagramInOutByIndex = function(diagram, dotIndex){
    if(dotIndex > diagram.options.joinDotsPosData.length){
        alert('설정되지 않은 Join 인덱스를 사용했습니다.');
        return;
    }
    return diagram.options.joinDotsPosData[dotIndex].inout;
}
var getDiagramDataAll = function(pSed){
    var all = pSed.svg.querySelectorAll('[baseFg=true]');
    var diagrams = [];
    var flowlines =  [];
    for(var i=0; i < all.length; i++){
        var fg = all[i].parentNode.fg;
        if(fg.tagName == 'diagram'){
            diagrams.push(fg);
        } else {
            flowlines.push(fg);
        }
    }
    var arrange = [];
    for(var i=0; i< diagrams.length; i++){
        var pass = true;
        for(var j=0; j < diagrams[i].group.joinDots.length; j++){
            var joinDot = diagrams[i].group.joinDots[j];
            for(var k=0; k <joinDot.connectedIndex.length; k++){
                if(joinDot.connectedIndex[k] == 1){
                    pass = false;
                    break;
                }
            }
        }
        if(pass == true){
            arrange.push(diagrams[i])
        }
    }
    for(var index = 0; index < 1; index++){
        for(var i=0; i< diagrams.length; i++){
            console.log('aaa2', i);
            var d = diagrams[i];
            var existBefore = false;
            for(var k=0; k < arrange.length; k++){
                if(arrange[k] == d){
                    existBefore = true;
                    break;
                }
            }
            if(existBefore == true){
                continue;
            }
            var existAll = true;
            for(var j=0; j < d.group.joinDots.length; j++){
                var joinDot = d.group.joinDots[j];
                for(var k=0; k < joinDot.connectedIndex.length; k++){
                    if(joinDot.connectedIndex[k] == 1){
                        var line = joinDot.connected[k];
                        console.log('line-->', line);
                        var parentFg = line.group.joinDots[0].connected[0];
                        var exist = false;
                        for(var l=0; l < arrange.length; l++){
                            if(parentFg == arrange[l]){
                                exist = true;
                            }
                        }
                        // 만약 연결된 선의 앞객체가 이미 등록되어 있지 않다면 arrange에 담지 않는다.  
                        if(exist == false){
                            existAll = false;
                        }
                    }
                }
            }
            if(existAll == true){
                arrange.push(d);
            }
        }
    }
    var data = [];
    for(var i=0; i< arrange.length; i++){
        var ret = getDiagramInOut(arrange[i]);
        arrange[i].getUserData().set('connect', ret);
        arrange[i].getUserData().set('figureId', arrange[i].options.figureId);
        data.push(arrange[i].getUserData());
    }
    console.log('data', JSON.stringify(data));
    return data;
}
var getDiagramInOut=function(d){
    var ret = {
        out:[],
        in:[]
    };
    for(var j=0; j < d.group.joinDots.length; j++){
        var joinDot = d.group.joinDots[j];
        for(var k=0; k < joinDot.connectedIndex.length; k++){
            var line = joinDot.connected[k];
            if(joinDot.connectedIndex[k] == 0){
                // out
                var parentFg = line.group.joinDots[1].connected[0];
                ret.out.push(parentFg.get('figureId'));

            } else if(joinDot.connectedIndex[k] == 1){
                // in
                var parentFg = line.group.joinDots[0].connected[0];
                ret.in.push(parentFg.get('figureId'));
            }
        }
    }
    return ret;
}
var getPrevNode = function(d){
    var ret = getDiagramInOut(d);
    console.log('ret', ret);
    var nodes = [];
    for(var i=0; i < ret.in.length; i++){
        var node = d.sed.findCompByFigureId(ret.in[i]);
        console.log('node', node, ret.in[i]);
        nodes.push(node);
    }
    return nodes;
}
var getNextNode = function(d){
    var ret = getDiagramInOut(d);
    console.log('ret', ret);
    var nodes = [];
    for(var i=0; i < ret.out.length; i++){
        var node = d.sed.findCompByFigureId(ret.out[i]);
        console.log('node', node, ret.out[i]);
        nodes.push(node);
    }
    return nodes;
}

var onChangeScreenSize = function(pSed){ 
    var svgArea = document.querySelector('[ref=svgArea]');
    var sedSvgs = svgArea.querySelectorAll('[svgRoot=true]');
    for(var i=0; i< sedSvgs.length; i++){
        var sedSvg = sedSvgs[i];
        sedSvg.setAttribute('width', pSed.screenWidth * pSed.screenRatio);
        sedSvg.setAttribute('height', pSed.screenHeight * pSed.screenRatio);
        var width = pSed.screenWidth/pSed.screenRatio;
        var height = pSed.screenHeight/pSed.screenRatio;
        sedSvg.setAttribute('viewBox','0 0 ' + width + ' ' + height);
        //sedSvg.style['background-size'] = (Number(rulerSize) * 2 * pSed.screenRatio) + 'px ';
    }
}
var onChangeScreenRatio = function(pSed){
    var svgArea = document.querySelector('[ref=svgArea]');
    var sedSvgs = svgArea.querySelectorAll('[svgRoot=true]');
    for(var i=0; i< sedSvgs.length; i++){
        var sedSvg = sedSvgs[i];
        sedSvg.setAttribute('width', pSed.screenWidth * pSed.screenRatio);
        sedSvg.setAttribute('height', pSed.screenHeight * pSed.screenRatio);
        var width = pSed.screenWidth/pSed.screenRatio;
        var height = pSed.screenHeight/pSed.screenRatio;
        sedSvg.setAttribute('viewBox','0 0 ' + width + ' ' + height);
    }
}
