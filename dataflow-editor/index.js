var sed1 = null;
window.addEventListener('load', function(){
    //sedLib.setPath('../js/se', '../img/se', function(){
        load();
    //});
});

// record를 읽어와 불러옴... (db대신 변수로 처리)
var tempData = '%5B%7B%22screenProperties%22%3Atrue%2C%22screenWidth%22%3A1200%2C%22screenHeight%22%3A800%2C%22screenRatio%22%3A1%2C%22sequenceGab%22%3A200%2C%22sequenceLeftGab%22%3A200%2C%22sequenceTopGab%22%3A50%2C%22sequenceBottomGab%22%3A50%7D%2C%7B%22width%22%3A1000%2C%22height%22%3A800%2C%22svgRoot%22%3Atrue%2C%22svgKind%22%3A%22none%22%2C%22figureId%22%3A%22svg15644032109690_878588590883902%22%2C%22viewBox%22%3A%220%200%201000%20800%22%2C%22style%22%3A%22display%3Ainline%3Bposition%3Arelative%3Bmargin%3A20px%2020px%2020px%2020px%3Bborder%3A1px%3Bbackground-image%3Aurl(.%2Fimg%2Fbackground%2Fbackground_blank.png)%3Bbackground-color%3Awhite%3B%22%7D%2C%7B%22baseFg%22%3Atrue%2C%22baseSp%22%3Atrue%2C%22centerSp%22%3Afalse%2C%22sameWh%22%3Afalse%2C%22figure%22%3A%22layer%22%2C%22layerNm%22%3A%22layer%22%2C%22layer%22%3Atrue%2C%22draw%22%3Afalse%2C%22figureId%22%3A%22layer15644032109710_0010503057845978603%22%2C%22src%22%3A%22%22%2C%22rotate%22%3A0%2C%22scale%22%3A1%2C%22x%22%3A0%2C%22y%22%3A0%2C%22width%22%3A100%2C%22height%22%3A60%2C%22stroke%22%3A%22%23000000%22%2C%22fill%22%3A%22%23ffffff%22%2C%22strokeWidth%22%3A1%2C%22text%22%3A%22%22%2C%22textHAlign%22%3A%22center%22%2C%22textVAlign%22%3A%22middle%22%2C%22textFill%22%3A%22%23000000%22%2C%22textFontFamily%22%3A%22%EB%8F%8B%EC%9B%80%22%2C%22textFontSize%22%3A16%2C%22parentSvg%22%3A%22svg15644032109690_878588590883902%22%2C%22topDotPosData%22%3A%7B%22x%22%3A0%2C%22y%22%3A0%7D%2C%22bottomDotPosData%22%3A%7B%22x%22%3A0%2C%22y%22%3A0%7D%7D%2C%7B%22figure%22%3A%22diagram%22%2C%22shape%22%3A%22rect%22%2C%22width%22%3A60%2C%22height%22%3A60%2C%22rx%22%3A10%2C%22ry%22%3A10%2C%22fill%22%3A%22%23eee%22%2C%22strokeWidth%22%3A1%2C%22stroke%22%3A%22%23ddd%22%2C%22resizable%22%3Afalse%2C%22rotate%22%3A0%2C%22rotatable%22%3Afalse%2C%22textHAlign%22%3A%22center%22%2C%22textVAlign%22%3A%22beneath%22%2C%22imageSrc%22%3A%22.%2Fimg%2Ftable-32px.png%22%2C%22imageWidth%22%3A30%2C%22imageHeight%22%3A30%2C%22btnShape%22%3A%22circle%22%2C%22btnArrange%22%3A%22top%22%2C%22btnStrockWidth%22%3A1%2C%22btnStroke%22%3A%22darkgray%22%2C%22btnFill%22%3A%22lightgray%22%2C%22btnCount%22%3A3%2C%22btnXGab%22%3A5%2C%22btnYGab%22%3A10%2C%22btnImages%22%3A%5B%22.%2Fimg%2Finfo-24px.png%22%2C%22.%2Fimg%2Fgrid-24px.png%22%2C%22.%2Fimg%2Fstart-24px.png%22%5D%2C%22btnVisibles%22%3A%5B%22visible%22%2C%22visible%22%2C%22visible%22%5D%2C%22btnRadius%22%3A%5B11%2C11%2C11%5D%2C%22btnImageWidth%22%3A%5B22%2C22%2C22%5D%2C%22btnImageHeight%22%3A%5B22%2C22%2C22%5D%2C%22diagramType%22%3A%22table%22%2C%22connectInputEnables%22%3A%5B%5D%2C%22connectMode%22%3A%5B%22direct%22%2C%22move%22%5D%2C%22joinDotsPosData%22%3A%5B%7B%22x%22%3A50%2C%22y%22%3A0%2C%22dir%22%3A%22E%22%2C%22inout%22%3A%22out%22%2C%22limit%22%3A999%2C%22min%22%3A1%7D%5D%2C%22baseFg%22%3Atrue%2C%22baseSp%22%3Atrue%2C%22centerSp%22%3Afalse%2C%22samWh%22%3Afalse%2C%22autoFgAdd%22%3Afalse%2C%22scale%22%3A1%2C%22x%22%3A57%2C%22y%22%3A61%2C%22figureId%22%3A%22diagram15644032123150_5013379808751302%22%2C%22fontSize%22%3A16%2C%22fontColor%22%3A%22%23000000%22%2C%22filters%22%3A%5B%5D%2C%22patterns%22%3A%5B%5D%2C%22dotsPos%22%3A%5B%7B%22x%22%3A0%2C%22y%22%3A-30%7D%2C%7B%22x%22%3A30%2C%22y%22%3A-30%7D%2C%7B%22x%22%3A30%2C%22y%22%3A0%7D%2C%7B%22x%22%3A30%2C%22y%22%3A30%7D%2C%7B%22x%22%3A0%2C%22y%22%3A30%7D%2C%7B%22x%22%3A-30%2C%22y%22%3A30%7D%2C%7B%22x%22%3A-30%2C%22y%22%3A0%7D%2C%7B%22x%22%3A-30%2C%22y%22%3A-30%7D%5D%2C%22dotsPosCalc%22%3A%5B%7B%22x%22%3A0%2C%22y%22%3A-30%7D%2C%7B%22x%22%3A30%2C%22y%22%3A-30%7D%2C%7B%22x%22%3A30%2C%22y%22%3A0%7D%2C%7B%22x%22%3A30%2C%22y%22%3A30%7D%2C%7B%22x%22%3A0%2C%22y%22%3A30%7D%2C%7B%22x%22%3A-30%2C%22y%22%3A30%7D%2C%7B%22x%22%3A-30%2C%22y%22%3A0%7D%2C%7B%22x%22%3A-30%2C%22y%22%3A-30%7D%5D%2C%22rotateDotPos%22%3A%7B%22x%22%3A0%2C%22y%22%3A-60%7D%2C%22joinDotsPos%22%3A%5B%7B%22x%22%3A30%2C%22y%22%3A0%2C%22dir%22%3A%22E%22%7D%5D%2C%22joinDotsPosCalc%22%3A%5B%7B%22x%22%3A30%2C%22y%22%3A0%7D%5D%2C%22connectedId%22%3A%5B%5B%22flowline15644032144120_17686957989856977%22%5D%5D%2C%22connectedIndex%22%3A%5B%5B0%5D%5D%2C%22rulerConnectedIdHor%22%3A%5B%5D%2C%22rulerConnectedIndexHor%22%3A%5B%5D%2C%22rulerConnectedIdVer%22%3A%5B%5D%2C%22rulerConnectedIndexVer%22%3A%5B%5D%2C%22diagram%22%3Atrue%2C%22parentLayer%22%3A%22layer15644032109710_0010503057845978603%22%2C%22userData%22%3A%7B%7D%2C%22topDotPosData%22%3A%7B%22x%22%3A0%2C%22y%22%3A0%7D%2C%22bottomDotPosData%22%3A%7B%22x%22%3A0%2C%22y%22%3A0%7D%2C%22groupLeft%22%3A57%2C%22groupRight%22%3A87%2C%22groupTop%22%3A61%2C%22groupBottom%22%3A61%2C%22rotateDotPosCalc%22%3A%7B%22x%22%3A0%2C%22y%22%3A-60%7D%2C%22text%22%3A%22table%22%7D%2C%7B%22figure%22%3A%22diagram%22%2C%22shape%22%3A%22rect%22%2C%22width%22%3A60%2C%22height%22%3A60%2C%22rx%22%3A10%2C%22ry%22%3A10%2C%22fill%22%3A%22%23eee%22%2C%22strokeWidth%22%3A1%2C%22stroke%22%3A%22%23ddd%22%2C%22resizable%22%3Afalse%2C%22rotate%22%3A0%2C%22rotatable%22%3Afalse%2C%22textHAlign%22%3A%22center%22%2C%22textVAlign%22%3A%22beneath%22%2C%22imageSrc%22%3A%22.%2Fimg%2Ftable-32px.png%22%2C%22imageWidth%22%3A30%2C%22imageHeight%22%3A30%2C%22btnShape%22%3A%22circle%22%2C%22btnArrange%22%3A%22top%22%2C%22btnStrockWidth%22%3A1%2C%22btnStroke%22%3A%22darkgray%22%2C%22btnFill%22%3A%22lightgray%22%2C%22btnCount%22%3A3%2C%22btnXGab%22%3A5%2C%22btnYGab%22%3A10%2C%22btnImages%22%3A%5B%22.%2Fimg%2Finfo-24px.png%22%2C%22.%2Fimg%2Fgrid-24px.png%22%2C%22.%2Fimg%2Fstart-24px.png%22%5D%2C%22btnVisibles%22%3A%5B%22visible%22%2C%22visible%22%2C%22visible%22%5D%2C%22btnRadius%22%3A%5B11%2C11%2C11%5D%2C%22btnImageWidth%22%3A%5B22%2C22%2C22%5D%2C%22btnImageHeight%22%3A%5B22%2C22%2C22%5D%2C%22diagramType%22%3A%22table%22%2C%22connectInputEnables%22%3A%5B%5D%2C%22connectMode%22%3A%5B%22direct%22%2C%22move%22%5D%2C%22joinDotsPosData%22%3A%5B%7B%22x%22%3A50%2C%22y%22%3A0%2C%22dir%22%3A%22E%22%2C%22inout%22%3A%22out%22%2C%22limit%22%3A999%2C%22min%22%3A1%7D%5D%2C%22baseFg%22%3Atrue%2C%22baseSp%22%3Atrue%2C%22centerSp%22%3Afalse%2C%22samWh%22%3Afalse%2C%22autoFgAdd%22%3Afalse%2C%22scale%22%3A1%2C%22x%22%3A79%2C%22y%22%3A220%2C%22figureId%22%3A%22diagram15644032131860_5137199180028098%22%2C%22fontSize%22%3A16%2C%22fontColor%22%3A%22%23000000%22%2C%22filters%22%3A%5B%5D%2C%22patterns%22%3A%5B%5D%2C%22dotsPos%22%3A%5B%7B%22x%22%3A0%2C%22y%22%3A-30%7D%2C%7B%22x%22%3A30%2C%22y%22%3A-30%7D%2C%7B%22x%22%3A30%2C%22y%22%3A0%7D%2C%7B%22x%22%3A30%2C%22y%22%3A30%7D%2C%7B%22x%22%3A0%2C%22y%22%3A30%7D%2C%7B%22x%22%3A-30%2C%22y%22%3A30%7D%2C%7B%22x%22%3A-30%2C%22y%22%3A0%7D%2C%7B%22x%22%3A-30%2C%22y%22%3A-30%7D%5D%2C%22dotsPosCalc%22%3A%5B%7B%22x%22%3A0%2C%22y%22%3A-30%7D%2C%7B%22x%22%3A30%2C%22y%22%3A-30%7D%2C%7B%22x%22%3A30%2C%22y%22%3A0%7D%2C%7B%22x%22%3A30%2C%22y%22%3A30%7D%2C%7B%22x%22%3A0%2C%22y%22%3A30%7D%2C%7B%22x%22%3A-30%2C%22y%22%3A30%7D%2C%7B%22x%22%3A-30%2C%22y%22%3A0%7D%2C%7B%22x%22%3A-30%2C%22y%22%3A-30%7D%5D%2C%22rotateDotPos%22%3A%7B%22x%22%3A0%2C%22y%22%3A-60%7D%2C%22joinDotsPos%22%3A%5B%7B%22x%22%3A30%2C%22y%22%3A0%2C%22dir%22%3A%22E%22%7D%5D%2C%22joinDotsPosCalc%22%3A%5B%7B%22x%22%3A30%2C%22y%22%3A0%7D%5D%2C%22connectedId%22%3A%5B%5B%22flowline15644032148440_33494290437192253%22%5D%5D%2C%22connectedIndex%22%3A%5B%5B0%5D%5D%2C%22rulerConnectedIdHor%22%3A%5B%5D%2C%22rulerConnectedIndexHor%22%3A%5B%5D%2C%22rulerConnectedIdVer%22%3A%5B%5D%2C%22rulerConnectedIndexVer%22%3A%5B%5D%2C%22diagram%22%3Atrue%2C%22parentLayer%22%3A%22layer15644032109710_0010503057845978603%22%2C%22userData%22%3A%7B%7D%2C%22topDotPosData%22%3A%7B%22x%22%3A0%2C%22y%22%3A0%7D%2C%22bottomDotPosData%22%3A%7B%22x%22%3A0%2C%22y%22%3A0%7D%2C%22groupLeft%22%3A79%2C%22groupRight%22%3A109%2C%22groupTop%22%3A220%2C%22groupBottom%22%3A220%2C%22rotateDotPosCalc%22%3A%7B%22x%22%3A0%2C%22y%22%3A-60%7D%2C%22text%22%3A%22table%22%7D%2C%7B%22figure%22%3A%22diagram%22%2C%22shape%22%3A%22rect%22%2C%22width%22%3A60%2C%22height%22%3A60%2C%22rx%22%3A30%2C%22ry%22%3A30%2C%22textHAlign%22%3A%22center%22%2C%22textVAlign%22%3A%22beneath%22%2C%22fill%22%3A%22%23eee%22%2C%22strokeWidth%22%3A1%2C%22stroke%22%3A%22%23ddd%22%2C%22resizable%22%3Afalse%2C%22rotate%22%3A0%2C%22rotatable%22%3Afalse%2C%22imageSrc%22%3A%22.%2Fimg%2Fjoin-inner-32px.png%22%2C%22imageWidth%22%3A40%2C%22imageHeight%22%3A30%2C%22btnShape%22%3A%22circle%22%2C%22btnArrange%22%3A%22top%22%2C%22btnStrockWidth%22%3A1%2C%22btnStroke%22%3A%22darkgray%22%2C%22btnFill%22%3A%22lightgray%22%2C%22btnXGab%22%3A5%2C%22btnYGab%22%3A10%2C%22btnCount%22%3A3%2C%22btnImages%22%3A%5B%22.%2Fimg%2Finfo-24px.png%22%2C%22.%2Fimg%2Finfo-24px.png%22%2C%22.%2Fimg%2Finfo-24px.png%22%5D%2C%22btnVisibles%22%3A%5B%22visible%22%2C%22visible%22%2C%22visible%22%5D%2C%22btnRadius%22%3A%5B11%2C11%2C11%5D%2C%22btnImageWidth%22%3A%5B22%2C22%2C22%5D%2C%22btnImageHeight%22%3A%5B22%2C22%2C22%5D%2C%22diagramType%22%3A%22join%22%2C%22connectInputEnables%22%3A%5B%22table%22%2C%22join%22%2C%22filter%22%2C%22sort%22%2C%22filter%22%2C%22function%22%2C%22csv%22%2C%22dataProfile%22%2C%22dataWrangler%22%2C%22file%22%2C%22group%22%2C%22linearRegression%22%2C%22merge%22%2C%22pearsonCorrelation%22%2C%22pivot%22%2C%22union%22%2C%22workflow%22%2C%22workflowFile%22%5D%2C%22connectMode%22%3A%5B%22direct%22%2C%22move%22%5D%2C%22joinDotsPosData%22%3A%5B%7B%22x%22%3A-50%2C%22y%22%3A-20%2C%22dir%22%3A%22W%22%2C%22inout%22%3A%22in%22%2C%22limit%22%3A1%2C%22min%22%3A1%7D%2C%7B%22x%22%3A-50%2C%22y%22%3A20%2C%22dir%22%3A%22W%22%2C%22inout%22%3A%22in%22%2C%22limit%22%3A1%2C%22min%22%3A1%7D%2C%7B%22x%22%3A50%2C%22y%22%3A0%2C%22dir%22%3A%22E%22%2C%22inout%22%3A%22out%22%2C%22limit%22%3A1%7D%5D%2C%22baseFg%22%3Atrue%2C%22baseSp%22%3Atrue%2C%22centerSp%22%3Afalse%2C%22samWh%22%3Afalse%2C%22autoFgAdd%22%3Afalse%2C%22scale%22%3A1%2C%22x%22%3A279%2C%22y%22%3A73%2C%22figureId%22%3A%22diagram15644032140010_1224763526371675%22%2C%22fontSize%22%3A16%2C%22fontColor%22%3A%22%23000000%22%2C%22filters%22%3A%5B%5D%2C%22patterns%22%3A%5B%5D%2C%22dotsPos%22%3A%5B%7B%22x%22%3A0%2C%22y%22%3A-30%7D%2C%7B%22x%22%3A30%2C%22y%22%3A-30%7D%2C%7B%22x%22%3A30%2C%22y%22%3A0%7D%2C%7B%22x%22%3A30%2C%22y%22%3A30%7D%2C%7B%22x%22%3A0%2C%22y%22%3A30%7D%2C%7B%22x%22%3A-30%2C%22y%22%3A30%7D%2C%7B%22x%22%3A-30%2C%22y%22%3A0%7D%2C%7B%22x%22%3A-30%2C%22y%22%3A-30%7D%5D%2C%22dotsPosCalc%22%3A%5B%7B%22x%22%3A0%2C%22y%22%3A-30%7D%2C%7B%22x%22%3A30%2C%22y%22%3A-30%7D%2C%7B%22x%22%3A30%2C%22y%22%3A0%7D%2C%7B%22x%22%3A30%2C%22y%22%3A30%7D%2C%7B%22x%22%3A0%2C%22y%22%3A30%7D%2C%7B%22x%22%3A-30%2C%22y%22%3A30%7D%2C%7B%22x%22%3A-30%2C%22y%22%3A0%7D%2C%7B%22x%22%3A-30%2C%22y%22%3A-30%7D%5D%2C%22rotateDotPos%22%3A%7B%22x%22%3A0%2C%22y%22%3A-60%7D%2C%22joinDotsPos%22%3A%5B%7B%22x%22%3A-30%2C%22y%22%3A-12%2C%22dir%22%3A%22W%22%7D%2C%7B%22x%22%3A-30%2C%22y%22%3A12%2C%22dir%22%3A%22W%22%7D%2C%7B%22x%22%3A30%2C%22y%22%3A0%2C%22dir%22%3A%22E%22%7D%5D%2C%22joinDotsPosCalc%22%3A%5B%7B%22x%22%3A-30%2C%22y%22%3A-12%7D%2C%7B%22x%22%3A-30%2C%22y%22%3A12%7D%2C%7B%22x%22%3A30%2C%22y%22%3A0%7D%5D%2C%22connectedId%22%3A%5B%5B%22flowline15644032144120_17686957989856977%22%5D%2C%5B%22flowline15644032148440_33494290437192253%22%5D%2C%5B%22flowline15644032321230_25929864125319324%22%5D%5D%2C%22connectedIndex%22%3A%5B%5B1%5D%2C%5B1%5D%2C%5B0%5D%5D%2C%22rulerConnectedIdHor%22%3A%5B%5D%2C%22rulerConnectedIndexHor%22%3A%5B%5D%2C%22rulerConnectedIdVer%22%3A%5B%5D%2C%22rulerConnectedIndexVer%22%3A%5B%5D%2C%22diagram%22%3Atrue%2C%22parentLayer%22%3A%22layer15644032109710_0010503057845978603%22%2C%22userData%22%3A%7B%7D%2C%22topDotPosData%22%3A%7B%22x%22%3A0%2C%22y%22%3A0%7D%2C%22bottomDotPosData%22%3A%7B%22x%22%3A0%2C%22y%22%3A0%7D%2C%22groupLeft%22%3A249%2C%22groupRight%22%3A309%2C%22groupTop%22%3A61%2C%22groupBottom%22%3A85%2C%22rotateDotPosCalc%22%3A%7B%22x%22%3A0%2C%22y%22%3A-60%7D%2C%22text%22%3A%22join-inner%22%7D%2C%7B%22baseFg%22%3Atrue%2C%22baseSp%22%3Afalse%2C%22centerSp%22%3Afalse%2C%22sameWh%22%3Afalse%2C%22figure%22%3A%22flowline%22%2C%22figureId%22%3A%22flowline15644032144120_17686957989856977%22%2C%22arrowType1%22%3A%22%22%2C%22arrowType2%22%3A%22triangle%22%2C%22bazierCurve%22%3A%22Y%22%2C%22rotate%22%3A0%2C%22scale%22%3A1%2C%22x1%22%3A87%2C%22y1%22%3A61%2C%22x2%22%3A249%2C%22y2%22%3A61%2C%22fill%22%3A%22black%22%2C%22stroke%22%3A%22%23555555%22%2C%22strokeWidth%22%3A2%2C%22fontSize%22%3A16%2C%22fontColor%22%3A%22%23000000%22%2C%22flowlineCurve%22%3A10%2C%22dotsPos%22%3A%5B%7B%22x%22%3A100%2C%22y%22%3A100%7D%2C%7B%22x%22%3A300%2C%22y%22%3A200%7D%5D%2C%22dotsPosCalc%22%3A%5B%7B%22x%22%3A100%2C%22y%22%3A100%7D%2C%7B%22x%22%3A300%2C%22y%22%3A200%7D%5D%2C%22joinDotsPos%22%3A%5B%7B%22x%22%3A100%2C%22y%22%3A100%7D%2C%7B%22x%22%3A300%2C%22y%22%3A200%7D%5D%2C%22joinDotsPosCalc%22%3A%5B%7B%22x%22%3A100%2C%22y%22%3A100%7D%2C%7B%22x%22%3A300%2C%22y%22%3A200%7D%5D%2C%22lineDotsPos%22%3A%5B%7B%22x%22%3A168%2C%22y%22%3A61%7D%2C%7B%22x%22%3A168%2C%22y%22%3A61%7D%2C%7B%22x%22%3A168%2C%22y%22%3A61%7D%5D%2C%22lineMoveMode%22%3A%22A%22%2C%22lineMoveDir%22%3A%5B%22V%22%2C%22H%22%2C%22V%22%5D%2C%22lineMovePos%22%3A%5B%7B%22x%22%3A168%2C%22y%22%3A61%7D%2C%7B%22x%22%3A168%2C%22y%22%3A61%7D%2C%7B%22x%22%3A168%2C%22y%22%3A61%7D%2C%7B%22x%22%3A168%2C%22y%22%3A61%7D%5D%2C%22connectedId%22%3A%5B%5B%22diagram15644032123150_5013379808751302%22%5D%2C%5B%22diagram15644032140010_1224763526371675%22%5D%5D%2C%22connectedIndex%22%3A%5B%5B0%5D%2C%5B0%5D%5D%2C%22parentLayer%22%3A%22layer15644032109710_0010503057845978603%22%2C%22animsState%22%3A%5B%5D%2C%22anims%22%3A%5B%5D%2C%22data%22%3A%7B%7D%2C%22topDotPosData%22%3A%7B%22x%22%3A0%2C%22y%22%3A0%7D%2C%22bottomDotPosData%22%3A%7B%22x%22%3A0%2C%22y%22%3A0%7D%7D%2C%7B%22baseFg%22%3Atrue%2C%22baseSp%22%3Afalse%2C%22centerSp%22%3Afalse%2C%22sameWh%22%3Afalse%2C%22figure%22%3A%22flowline%22%2C%22figureId%22%3A%22flowline15644032148440_33494290437192253%22%2C%22arrowType1%22%3A%22%22%2C%22arrowType2%22%3A%22triangle%22%2C%22bazierCurve%22%3A%22Y%22%2C%22rotate%22%3A0%2C%22scale%22%3A1%2C%22x1%22%3A109%2C%22y1%22%3A220%2C%22x2%22%3A249%2C%22y2%22%3A85%2C%22fill%22%3A%22black%22%2C%22stroke%22%3A%22%23555555%22%2C%22strokeWidth%22%3A2%2C%22fontSize%22%3A16%2C%22fontColor%22%3A%22%23000000%22%2C%22flowlineCurve%22%3A10%2C%22dotsPos%22%3A%5B%7B%22x%22%3A100%2C%22y%22%3A100%7D%2C%7B%22x%22%3A300%2C%22y%22%3A200%7D%5D%2C%22dotsPosCalc%22%3A%5B%7B%22x%22%3A100%2C%22y%22%3A100%7D%2C%7B%22x%22%3A300%2C%22y%22%3A200%7D%5D%2C%22joinDotsPos%22%3A%5B%7B%22x%22%3A100%2C%22y%22%3A100%7D%2C%7B%22x%22%3A300%2C%22y%22%3A200%7D%5D%2C%22joinDotsPosCalc%22%3A%5B%7B%22x%22%3A100%2C%22y%22%3A100%7D%2C%7B%22x%22%3A300%2C%22y%22%3A200%7D%5D%2C%22lineDotsPos%22%3A%5B%7B%22x%22%3A179%2C%22y%22%3A220%7D%2C%7B%22x%22%3A179%2C%22y%22%3A152.5%7D%2C%7B%22x%22%3A179%2C%22y%22%3A85%7D%5D%2C%22lineMoveMode%22%3A%22A%22%2C%22lineMoveDir%22%3A%5B%22V%22%2C%22H%22%2C%22V%22%5D%2C%22lineMovePos%22%3A%5B%7B%22x%22%3A179%2C%22y%22%3A220%7D%2C%7B%22x%22%3A179%2C%22y%22%3A220%7D%2C%7B%22x%22%3A179%2C%22y%22%3A85%7D%2C%7B%22x%22%3A179%2C%22y%22%3A85%7D%5D%2C%22connectedId%22%3A%5B%5B%22diagram15644032131860_5137199180028098%22%5D%2C%5B%22diagram15644032140010_1224763526371675%22%5D%5D%2C%22connectedIndex%22%3A%5B%5B0%5D%2C%5B1%5D%5D%2C%22parentLayer%22%3A%22layer15644032109710_0010503057845978603%22%2C%22animsState%22%3A%5B%5D%2C%22anims%22%3A%5B%5D%2C%22data%22%3A%7B%7D%2C%22topDotPosData%22%3A%7B%22x%22%3A0%2C%22y%22%3A0%7D%2C%22bottomDotPosData%22%3A%7B%22x%22%3A0%2C%22y%22%3A0%7D%7D%2C%7B%22figure%22%3A%22diagram%22%2C%22shape%22%3A%22rect%22%2C%22width%22%3A60%2C%22height%22%3A60%2C%22rx%22%3A30%2C%22ry%22%3A30%2C%22textHAlign%22%3A%22center%22%2C%22textVAlign%22%3A%22beneath%22%2C%22fill%22%3A%22%23eee%22%2C%22strokeWidth%22%3A1%2C%22stroke%22%3A%22%23ddd%22%2C%22resizable%22%3Afalse%2C%22rotate%22%3A0%2C%22rotatable%22%3Afalse%2C%22imageSrc%22%3A%22.%2Fimg%2Fjoin-full-32px.png%22%2C%22imageWidth%22%3A40%2C%22imageHeight%22%3A30%2C%22btnShape%22%3A%22circle%22%2C%22btnArrange%22%3A%22top%22%2C%22btnStrockWidth%22%3A1%2C%22btnStroke%22%3A%22darkgray%22%2C%22btnFill%22%3A%22lightgray%22%2C%22btnXGab%22%3A5%2C%22btnYGab%22%3A10%2C%22btnCount%22%3A3%2C%22btnImages%22%3A%5B%22.%2Fimg%2Finfo-24px.png%22%2C%22.%2Fimg%2Finfo-24px.png%22%2C%22.%2Fimg%2Finfo-24px.png%22%5D%2C%22btnVisibles%22%3A%5B%22visible%22%2C%22visible%22%2C%22visible%22%5D%2C%22btnRadius%22%3A%5B11%2C11%2C11%5D%2C%22btnImageWidth%22%3A%5B22%2C22%2C22%5D%2C%22btnImageHeight%22%3A%5B22%2C22%2C22%5D%2C%22diagramType%22%3A%22join%22%2C%22connectInputEnables%22%3A%5B%22table%22%2C%22join%22%2C%22filter%22%2C%22sort%22%2C%22filter%22%2C%22function%22%2C%22csv%22%2C%22dataProfile%22%2C%22dataWrangler%22%2C%22file%22%2C%22group%22%2C%22linearRegression%22%2C%22merge%22%2C%22pearsonCorrelation%22%2C%22pivot%22%2C%22union%22%2C%22workflow%22%2C%22workflowFile%22%5D%2C%22connectMode%22%3A%5B%22direct%22%2C%22move%22%5D%2C%22joinDotsPosData%22%3A%5B%7B%22x%22%3A-50%2C%22y%22%3A-20%2C%22dir%22%3A%22W%22%2C%22inout%22%3A%22in%22%2C%22limit%22%3A1%2C%22min%22%3A1%7D%2C%7B%22x%22%3A-50%2C%22y%22%3A20%2C%22dir%22%3A%22W%22%2C%22inout%22%3A%22in%22%2C%22limit%22%3A1%2C%22min%22%3A1%7D%2C%7B%22x%22%3A50%2C%22y%22%3A0%2C%22dir%22%3A%22E%22%2C%22inout%22%3A%22out%22%2C%22limit%22%3A1%7D%5D%2C%22baseFg%22%3Atrue%2C%22baseSp%22%3Atrue%2C%22centerSp%22%3Afalse%2C%22samWh%22%3Afalse%2C%22autoFgAdd%22%3Afalse%2C%22scale%22%3A1%2C%22x%22%3A518%2C%22y%22%3A85%2C%22figureId%22%3A%22diagram15644032224650_315441343761135%22%2C%22fontSize%22%3A16%2C%22fontColor%22%3A%22%23000000%22%2C%22filters%22%3A%5B%5D%2C%22patterns%22%3A%5B%5D%2C%22dotsPos%22%3A%5B%7B%22x%22%3A0%2C%22y%22%3A-30%7D%2C%7B%22x%22%3A30%2C%22y%22%3A-30%7D%2C%7B%22x%22%3A30%2C%22y%22%3A0%7D%2C%7B%22x%22%3A30%2C%22y%22%3A30%7D%2C%7B%22x%22%3A0%2C%22y%22%3A30%7D%2C%7B%22x%22%3A-30%2C%22y%22%3A30%7D%2C%7B%22x%22%3A-30%2C%22y%22%3A0%7D%2C%7B%22x%22%3A-30%2C%22y%22%3A-30%7D%5D%2C%22dotsPosCalc%22%3A%5B%7B%22x%22%3A0%2C%22y%22%3A-30%7D%2C%7B%22x%22%3A30%2C%22y%22%3A-30%7D%2C%7B%22x%22%3A30%2C%22y%22%3A0%7D%2C%7B%22x%22%3A30%2C%22y%22%3A30%7D%2C%7B%22x%22%3A0%2C%22y%22%3A30%7D%2C%7B%22x%22%3A-30%2C%22y%22%3A30%7D%2C%7B%22x%22%3A-30%2C%22y%22%3A0%7D%2C%7B%22x%22%3A-30%2C%22y%22%3A-30%7D%5D%2C%22rotateDotPos%22%3A%7B%22x%22%3A0%2C%22y%22%3A-60%7D%2C%22joinDotsPos%22%3A%5B%7B%22x%22%3A-30%2C%22y%22%3A-12%2C%22dir%22%3A%22W%22%7D%2C%7B%22x%22%3A-30%2C%22y%22%3A12%2C%22dir%22%3A%22W%22%7D%2C%7B%22x%22%3A30%2C%22y%22%3A0%2C%22dir%22%3A%22E%22%7D%5D%2C%22joinDotsPosCalc%22%3A%5B%7B%22x%22%3A-30%2C%22y%22%3A-12%7D%2C%7B%22x%22%3A-30%2C%22y%22%3A12%7D%2C%7B%22x%22%3A30%2C%22y%22%3A0%7D%5D%2C%22connectedId%22%3A%5B%5B%22flowline15644032321230_25929864125319324%22%5D%2C%5B%22flowline15644032325890_5307890121441541%22%5D%2C%5B%22flowline15644032391370_973066679517598%22%5D%5D%2C%22connectedIndex%22%3A%5B%5B1%5D%2C%5B1%5D%2C%5B0%5D%5D%2C%22rulerConnectedIdHor%22%3A%5B%5D%2C%22rulerConnectedIndexHor%22%3A%5B%5D%2C%22rulerConnectedIdVer%22%3A%5B%5D%2C%22rulerConnectedIndexVer%22%3A%5B%5D%2C%22diagram%22%3Atrue%2C%22parentLayer%22%3A%22layer15644032109710_0010503057845978603%22%2C%22userData%22%3A%7B%7D%2C%22topDotPosData%22%3A%7B%22x%22%3A0%2C%22y%22%3A0%7D%2C%22bottomDotPosData%22%3A%7B%22x%22%3A0%2C%22y%22%3A0%7D%2C%22groupLeft%22%3A488%2C%22groupRight%22%3A548%2C%22groupTop%22%3A73%2C%22groupBottom%22%3A97%2C%22rotateDotPosCalc%22%3A%7B%22x%22%3A0%2C%22y%22%3A-60%7D%2C%22text%22%3A%22join-full%22%7D%2C%7B%22figure%22%3A%22diagram%22%2C%22shape%22%3A%22rect%22%2C%22width%22%3A60%2C%22height%22%3A60%2C%22rx%22%3A10%2C%22ry%22%3A10%2C%22fill%22%3A%22%23eee%22%2C%22strokeWidth%22%3A1%2C%22stroke%22%3A%22%23ddd%22%2C%22resizable%22%3Afalse%2C%22rotate%22%3A0%2C%22rotatable%22%3Afalse%2C%22textHAlign%22%3A%22center%22%2C%22textVAlign%22%3A%22beneath%22%2C%22imageSrc%22%3A%22.%2Fimg%2Ftable-32px.png%22%2C%22imageWidth%22%3A30%2C%22imageHeight%22%3A30%2C%22btnShape%22%3A%22circle%22%2C%22btnArrange%22%3A%22top%22%2C%22btnStrockWidth%22%3A1%2C%22btnStroke%22%3A%22darkgray%22%2C%22btnFill%22%3A%22lightgray%22%2C%22btnCount%22%3A3%2C%22btnXGab%22%3A5%2C%22btnYGab%22%3A10%2C%22btnImages%22%3A%5B%22.%2Fimg%2Finfo-24px.png%22%2C%22.%2Fimg%2Fgrid-24px.png%22%2C%22.%2Fimg%2Fstart-24px.png%22%5D%2C%22btnVisibles%22%3A%5B%22visible%22%2C%22visible%22%2C%22visible%22%5D%2C%22btnRadius%22%3A%5B11%2C11%2C11%5D%2C%22btnImageWidth%22%3A%5B22%2C22%2C22%5D%2C%22btnImageHeight%22%3A%5B22%2C22%2C22%5D%2C%22diagramType%22%3A%22table%22%2C%22connectInputEnables%22%3A%5B%5D%2C%22connectMode%22%3A%5B%22direct%22%2C%22move%22%5D%2C%22joinDotsPosData%22%3A%5B%7B%22x%22%3A50%2C%22y%22%3A0%2C%22dir%22%3A%22E%22%2C%22inout%22%3A%22out%22%2C%22limit%22%3A999%2C%22min%22%3A1%7D%5D%2C%22baseFg%22%3Atrue%2C%22baseSp%22%3Atrue%2C%22centerSp%22%3Afalse%2C%22samWh%22%3Afalse%2C%22autoFgAdd%22%3Afalse%2C%22scale%22%3A1%2C%22x%22%3A64%2C%22y%22%3A327%2C%22figureId%22%3A%22diagram15644032260360_41776185461708715%22%2C%22fontSize%22%3A16%2C%22fontColor%22%3A%22%23000000%22%2C%22filters%22%3A%5B%5D%2C%22patterns%22%3A%5B%5D%2C%22dotsPos%22%3A%5B%7B%22x%22%3A0%2C%22y%22%3A-30%7D%2C%7B%22x%22%3A30%2C%22y%22%3A-30%7D%2C%7B%22x%22%3A30%2C%22y%22%3A0%7D%2C%7B%22x%22%3A30%2C%22y%22%3A30%7D%2C%7B%22x%22%3A0%2C%22y%22%3A30%7D%2C%7B%22x%22%3A-30%2C%22y%22%3A30%7D%2C%7B%22x%22%3A-30%2C%22y%22%3A0%7D%2C%7B%22x%22%3A-30%2C%22y%22%3A-30%7D%5D%2C%22dotsPosCalc%22%3A%5B%7B%22x%22%3A0%2C%22y%22%3A-30%7D%2C%7B%22x%22%3A30%2C%22y%22%3A-30%7D%2C%7B%22x%22%3A30%2C%22y%22%3A0%7D%2C%7B%22x%22%3A30%2C%22y%22%3A30%7D%2C%7B%22x%22%3A0%2C%22y%22%3A30%7D%2C%7B%22x%22%3A-30%2C%22y%22%3A30%7D%2C%7B%22x%22%3A-30%2C%22y%22%3A0%7D%2C%7B%22x%22%3A-30%2C%22y%22%3A-30%7D%5D%2C%22rotateDotPos%22%3A%7B%22x%22%3A0%2C%22y%22%3A-60%7D%2C%22joinDotsPos%22%3A%5B%7B%22x%22%3A30%2C%22y%22%3A0%2C%22dir%22%3A%22E%22%7D%5D%2C%22joinDotsPosCalc%22%3A%5B%7B%22x%22%3A30%2C%22y%22%3A0%7D%5D%2C%22connectedId%22%3A%5B%5B%22flowline15644032279070_7765847061235231%22%5D%5D%2C%22connectedIndex%22%3A%5B%5B0%5D%5D%2C%22rulerConnectedIdHor%22%3A%5B%5D%2C%22rulerConnectedIndexHor%22%3A%5B%5D%2C%22rulerConnectedIdVer%22%3A%5B%5D%2C%22rulerConnectedIndexVer%22%3A%5B%5D%2C%22diagram%22%3Atrue%2C%22parentLayer%22%3A%22layer15644032109710_0010503057845978603%22%2C%22userData%22%3A%7B%7D%2C%22topDotPosData%22%3A%7B%22x%22%3A0%2C%22y%22%3A0%7D%2C%22bottomDotPosData%22%3A%7B%22x%22%3A0%2C%22y%22%3A0%7D%2C%22groupLeft%22%3A64%2C%22groupRight%22%3A94%2C%22groupTop%22%3A327%2C%22groupBottom%22%3A327%2C%22rotateDotPosCalc%22%3A%7B%22x%22%3A0%2C%22y%22%3A-60%7D%2C%22text%22%3A%22table%22%7D%2C%7B%22figure%22%3A%22diagram%22%2C%22shape%22%3A%22rect%22%2C%22width%22%3A60%2C%22height%22%3A60%2C%22rx%22%3A30%2C%22ry%22%3A30%2C%22textHAlign%22%3A%22center%22%2C%22textVAlign%22%3A%22beneath%22%2C%22fill%22%3A%22%23eee%22%2C%22strokeWidth%22%3A1%2C%22stroke%22%3A%22%23ddd%22%2C%22resizable%22%3Afalse%2C%22rotate%22%3A0%2C%22rotatable%22%3Afalse%2C%22imageSrc%22%3A%22.%2Fimg%2Ffilter-32px.png%22%2C%22imageWidth%22%3A30%2C%22imageHeight%22%3A30%2C%22btnShape%22%3A%22circle%22%2C%22btnArrange%22%3A%22top%22%2C%22btnStrockWidth%22%3A1%2C%22btnStroke%22%3A%22darkgray%22%2C%22btnFill%22%3A%22lightgray%22%2C%22btnXGab%22%3A5%2C%22btnYGab%22%3A10%2C%22btnCount%22%3A3%2C%22btnImages%22%3A%5B%22.%2Fimg%2Finfo-24px.png%22%2C%22.%2Fimg%2Finfo-24px.png%22%2C%22.%2Fimg%2Finfo-24px.png%22%5D%2C%22btnVisibles%22%3A%5B%22visible%22%2C%22visible%22%2C%22visible%22%5D%2C%22btnRadius%22%3A%5B11%2C11%2C11%5D%2C%22btnImageWidth%22%3A%5B22%2C22%2C22%5D%2C%22btnImageHeight%22%3A%5B22%2C22%2C22%5D%2C%22diagramType%22%3A%22filter%22%2C%22connectInputEnables%22%3A%5B%22table%22%2C%22filter%22%2C%22sort%22%2C%22join%22%5D%2C%22connectMode%22%3A%5B%22direct%22%2C%22move%22%5D%2C%22joinDotsPosData%22%3A%5B%7B%22x%22%3A-50%2C%22y%22%3A0%2C%22dir%22%3A%22W%22%2C%22inout%22%3A%22in%22%2C%22limit%22%3A1%2C%22min%22%3A1%7D%2C%7B%22x%22%3A50%2C%22y%22%3A0%2C%22dir%22%3A%22E%22%2C%22inout%22%3A%22out%22%2C%22limit%22%3A999%7D%5D%2C%22baseFg%22%3Atrue%2C%22baseSp%22%3Atrue%2C%22centerSp%22%3Afalse%2C%22samWh%22%3Afalse%2C%22autoFgAdd%22%3Afalse%2C%22scale%22%3A1%2C%22x%22%3A252%2C%22y%22%3A327%2C%22figureId%22%3A%22diagram15644032275070_811745162114972%22%2C%22fontSize%22%3A16%2C%22fontColor%22%3A%22%23000000%22%2C%22filters%22%3A%5B%5D%2C%22patterns%22%3A%5B%5D%2C%22dotsPos%22%3A%5B%7B%22x%22%3A0%2C%22y%22%3A-30%7D%2C%7B%22x%22%3A30%2C%22y%22%3A-30%7D%2C%7B%22x%22%3A30%2C%22y%22%3A0%7D%2C%7B%22x%22%3A30%2C%22y%22%3A30%7D%2C%7B%22x%22%3A0%2C%22y%22%3A30%7D%2C%7B%22x%22%3A-30%2C%22y%22%3A30%7D%2C%7B%22x%22%3A-30%2C%22y%22%3A0%7D%2C%7B%22x%22%3A-30%2C%22y%22%3A-30%7D%5D%2C%22dotsPosCalc%22%3A%5B%7B%22x%22%3A0%2C%22y%22%3A-30%7D%2C%7B%22x%22%3A30%2C%22y%22%3A-30%7D%2C%7B%22x%22%3A30%2C%22y%22%3A0%7D%2C%7B%22x%22%3A30%2C%22y%22%3A30%7D%2C%7B%22x%22%3A0%2C%22y%22%3A30%7D%2C%7B%22x%22%3A-30%2C%22y%22%3A30%7D%2C%7B%22x%22%3A-30%2C%22y%22%3A0%7D%2C%7B%22x%22%3A-30%2C%22y%22%3A-30%7D%5D%2C%22rotateDotPos%22%3A%7B%22x%22%3A0%2C%22y%22%3A-60%7D%2C%22joinDotsPos%22%3A%5B%7B%22x%22%3A-30%2C%22y%22%3A0%2C%22dir%22%3A%22W%22%7D%2C%7B%22x%22%3A30%2C%22y%22%3A0%2C%22dir%22%3A%22E%22%7D%5D%2C%22joinDotsPosCalc%22%3A%5B%7B%22x%22%3A-30%2C%22y%22%3A0%7D%2C%7B%22x%22%3A30%2C%22y%22%3A0%7D%5D%2C%22connectedId%22%3A%5B%5B%22flowline15644032279070_7765847061235231%22%5D%2C%5B%22flowline15644032325890_5307890121441541%22%5D%5D%2C%22connectedIndex%22%3A%5B%5B1%5D%2C%5B0%5D%5D%2C%22rulerConnectedIdHor%22%3A%5B%5D%2C%22rulerConnectedIndexHor%22%3A%5B%5D%2C%22rulerConnectedIdVer%22%3A%5B%5D%2C%22rulerConnectedIndexVer%22%3A%5B%5D%2C%22diagram%22%3Atrue%2C%22parentLayer%22%3A%22layer15644032109710_0010503057845978603%22%2C%22userData%22%3A%7B%7D%2C%22topDotPosData%22%3A%7B%22x%22%3A0%2C%22y%22%3A0%7D%2C%22bottomDotPosData%22%3A%7B%22x%22%3A0%2C%22y%22%3A0%7D%2C%22groupLeft%22%3A222%2C%22groupRight%22%3A282%2C%22groupTop%22%3A327%2C%22groupBottom%22%3A327%2C%22rotateDotPosCalc%22%3A%7B%22x%22%3A0%2C%22y%22%3A-60%7D%2C%22text%22%3A%22filter%22%7D%2C%7B%22baseFg%22%3Atrue%2C%22baseSp%22%3Afalse%2C%22centerSp%22%3Afalse%2C%22sameWh%22%3Afalse%2C%22figure%22%3A%22flowline%22%2C%22figureId%22%3A%22flowline15644032279070_7765847061235231%22%2C%22arrowType1%22%3A%22%22%2C%22arrowType2%22%3A%22triangle%22%2C%22bazierCurve%22%3A%22Y%22%2C%22rotate%22%3A0%2C%22scale%22%3A1%2C%22x1%22%3A94%2C%22y1%22%3A327%2C%22x2%22%3A222%2C%22y2%22%3A327%2C%22fill%22%3A%22black%22%2C%22stroke%22%3A%22%23555555%22%2C%22strokeWidth%22%3A2%2C%22fontSize%22%3A16%2C%22fontColor%22%3A%22%23000000%22%2C%22flowlineCurve%22%3A10%2C%22dotsPos%22%3A%5B%7B%22x%22%3A100%2C%22y%22%3A100%7D%2C%7B%22x%22%3A300%2C%22y%22%3A200%7D%5D%2C%22dotsPosCalc%22%3A%5B%7B%22x%22%3A100%2C%22y%22%3A100%7D%2C%7B%22x%22%3A300%2C%22y%22%3A200%7D%5D%2C%22joinDotsPos%22%3A%5B%7B%22x%22%3A100%2C%22y%22%3A100%7D%2C%7B%22x%22%3A300%2C%22y%22%3A200%7D%5D%2C%22joinDotsPosCalc%22%3A%5B%7B%22x%22%3A100%2C%22y%22%3A100%7D%2C%7B%22x%22%3A300%2C%22y%22%3A200%7D%5D%2C%22lineDotsPos%22%3A%5B%7B%22x%22%3A158%2C%22y%22%3A327%7D%2C%7B%22x%22%3A158%2C%22y%22%3A327%7D%2C%7B%22x%22%3A158%2C%22y%22%3A327%7D%5D%2C%22lineMoveMode%22%3A%22A%22%2C%22lineMoveDir%22%3A%5B%22V%22%2C%22H%22%2C%22V%22%5D%2C%22lineMovePos%22%3A%5B%7B%22x%22%3A158%2C%22y%22%3A327%7D%2C%7B%22x%22%3A158%2C%22y%22%3A327%7D%2C%7B%22x%22%3A158%2C%22y%22%3A327%7D%2C%7B%22x%22%3A158%2C%22y%22%3A327%7D%5D%2C%22connectedId%22%3A%5B%5B%22diagram15644032260360_41776185461708715%22%5D%2C%5B%22diagram15644032275070_811745162114972%22%5D%5D%2C%22connectedIndex%22%3A%5B%5B0%5D%2C%5B0%5D%5D%2C%22parentLayer%22%3A%22layer15644032109710_0010503057845978603%22%2C%22animsState%22%3A%5B%5D%2C%22anims%22%3A%5B%5D%2C%22data%22%3A%7B%7D%2C%22topDotPosData%22%3A%7B%22x%22%3A0%2C%22y%22%3A0%7D%2C%22bottomDotPosData%22%3A%7B%22x%22%3A0%2C%22y%22%3A0%7D%7D%2C%7B%22baseFg%22%3Atrue%2C%22baseSp%22%3Afalse%2C%22centerSp%22%3Afalse%2C%22sameWh%22%3Afalse%2C%22figure%22%3A%22flowline%22%2C%22figureId%22%3A%22flowline15644032321230_25929864125319324%22%2C%22arrowType1%22%3A%22%22%2C%22arrowType2%22%3A%22triangle%22%2C%22bazierCurve%22%3A%22Y%22%2C%22rotate%22%3A0%2C%22scale%22%3A1%2C%22x1%22%3A309%2C%22y1%22%3A73%2C%22x2%22%3A488%2C%22y2%22%3A73%2C%22fill%22%3A%22black%22%2C%22stroke%22%3A%22%23555555%22%2C%22strokeWidth%22%3A2%2C%22fontSize%22%3A16%2C%22fontColor%22%3A%22%23000000%22%2C%22flowlineCurve%22%3A10%2C%22dotsPos%22%3A%5B%7B%22x%22%3A100%2C%22y%22%3A100%7D%2C%7B%22x%22%3A300%2C%22y%22%3A200%7D%5D%2C%22dotsPosCalc%22%3A%5B%7B%22x%22%3A100%2C%22y%22%3A100%7D%2C%7B%22x%22%3A300%2C%22y%22%3A200%7D%5D%2C%22joinDotsPos%22%3A%5B%7B%22x%22%3A100%2C%22y%22%3A100%7D%2C%7B%22x%22%3A300%2C%22y%22%3A200%7D%5D%2C%22joinDotsPosCalc%22%3A%5B%7B%22x%22%3A100%2C%22y%22%3A100%7D%2C%7B%22x%22%3A300%2C%22y%22%3A200%7D%5D%2C%22lineDotsPos%22%3A%5B%7B%22x%22%3A398.5%2C%22y%22%3A73%7D%2C%7B%22x%22%3A398.5%2C%22y%22%3A73%7D%2C%7B%22x%22%3A398.5%2C%22y%22%3A73%7D%5D%2C%22lineMoveMode%22%3A%22A%22%2C%22lineMoveDir%22%3A%5B%22V%22%2C%22H%22%2C%22V%22%5D%2C%22lineMovePos%22%3A%5B%7B%22x%22%3A398.5%2C%22y%22%3A73%7D%2C%7B%22x%22%3A398.5%2C%22y%22%3A73%7D%2C%7B%22x%22%3A398.5%2C%22y%22%3A73%7D%2C%7B%22x%22%3A398.5%2C%22y%22%3A73%7D%5D%2C%22connectedId%22%3A%5B%5B%22diagram15644032140010_1224763526371675%22%5D%2C%5B%22diagram15644032224650_315441343761135%22%5D%5D%2C%22connectedIndex%22%3A%5B%5B2%5D%2C%5B0%5D%5D%2C%22parentLayer%22%3A%22layer15644032109710_0010503057845978603%22%2C%22animsState%22%3A%5B%5D%2C%22anims%22%3A%5B%5D%2C%22data%22%3A%7B%7D%2C%22topDotPosData%22%3A%7B%22x%22%3A0%2C%22y%22%3A0%7D%2C%22bottomDotPosData%22%3A%7B%22x%22%3A0%2C%22y%22%3A0%7D%7D%2C%7B%22baseFg%22%3Atrue%2C%22baseSp%22%3Afalse%2C%22centerSp%22%3Afalse%2C%22sameWh%22%3Afalse%2C%22figure%22%3A%22flowline%22%2C%22figureId%22%3A%22flowline15644032325890_5307890121441541%22%2C%22arrowType1%22%3A%22%22%2C%22arrowType2%22%3A%22triangle%22%2C%22bazierCurve%22%3A%22Y%22%2C%22rotate%22%3A0%2C%22scale%22%3A1%2C%22x1%22%3A282%2C%22y1%22%3A327%2C%22x2%22%3A488%2C%22y2%22%3A97%2C%22fill%22%3A%22black%22%2C%22stroke%22%3A%22%23555555%22%2C%22strokeWidth%22%3A2%2C%22fontSize%22%3A16%2C%22fontColor%22%3A%22%23000000%22%2C%22flowlineCurve%22%3A10%2C%22dotsPos%22%3A%5B%7B%22x%22%3A100%2C%22y%22%3A100%7D%2C%7B%22x%22%3A300%2C%22y%22%3A200%7D%5D%2C%22dotsPosCalc%22%3A%5B%7B%22x%22%3A100%2C%22y%22%3A100%7D%2C%7B%22x%22%3A300%2C%22y%22%3A200%7D%5D%2C%22joinDotsPos%22%3A%5B%7B%22x%22%3A100%2C%22y%22%3A100%7D%2C%7B%22x%22%3A300%2C%22y%22%3A200%7D%5D%2C%22joinDotsPosCalc%22%3A%5B%7B%22x%22%3A100%2C%22y%22%3A100%7D%2C%7B%22x%22%3A300%2C%22y%22%3A200%7D%5D%2C%22lineDotsPos%22%3A%5B%7B%22x%22%3A385%2C%22y%22%3A327%7D%2C%7B%22x%22%3A385%2C%22y%22%3A212%7D%2C%7B%22x%22%3A385%2C%22y%22%3A97%7D%5D%2C%22lineMoveMode%22%3A%22A%22%2C%22lineMoveDir%22%3A%5B%22V%22%2C%22H%22%2C%22V%22%5D%2C%22lineMovePos%22%3A%5B%7B%22x%22%3A385%2C%22y%22%3A327%7D%2C%7B%22x%22%3A385%2C%22y%22%3A327%7D%2C%7B%22x%22%3A385%2C%22y%22%3A97%7D%2C%7B%22x%22%3A385%2C%22y%22%3A97%7D%5D%2C%22connectedId%22%3A%5B%5B%22diagram15644032275070_811745162114972%22%5D%2C%5B%22diagram15644032224650_315441343761135%22%5D%5D%2C%22connectedIndex%22%3A%5B%5B1%5D%2C%5B1%5D%5D%2C%22parentLayer%22%3A%22layer15644032109710_0010503057845978603%22%2C%22animsState%22%3A%5B%5D%2C%22anims%22%3A%5B%5D%2C%22data%22%3A%7B%7D%2C%22topDotPosData%22%3A%7B%22x%22%3A0%2C%22y%22%3A0%7D%2C%22bottomDotPosData%22%3A%7B%22x%22%3A0%2C%22y%22%3A0%7D%7D%2C%7B%22figure%22%3A%22diagram%22%2C%22shape%22%3A%22rect%22%2C%22width%22%3A60%2C%22height%22%3A60%2C%22rx%22%3A30%2C%22ry%22%3A30%2C%22textHAlign%22%3A%22center%22%2C%22textVAlign%22%3A%22beneath%22%2C%22fill%22%3A%22%23eee%22%2C%22strokeWidth%22%3A1%2C%22stroke%22%3A%22%23ddd%22%2C%22resizable%22%3Afalse%2C%22rotate%22%3A0%2C%22rotatable%22%3Afalse%2C%22imageSrc%22%3A%22.%2Fimg%2Fsort-32px.png%22%2C%22imageWidth%22%3A30%2C%22imageHeight%22%3A30%2C%22btnShape%22%3A%22circle%22%2C%22btnArrange%22%3A%22top%22%2C%22btnStrockWidth%22%3A1%2C%22btnStroke%22%3A%22darkgray%22%2C%22btnFill%22%3A%22lightgray%22%2C%22btnXGab%22%3A5%2C%22btnYGab%22%3A10%2C%22btnCount%22%3A3%2C%22btnImages%22%3A%5B%22.%2Fimg%2Finfo-24px.png%22%2C%22.%2Fimg%2Finfo-24px.png%22%2C%22.%2Fimg%2Finfo-24px.png%22%5D%2C%22btnVisibles%22%3A%5B%22visible%22%2C%22visible%22%2C%22visible%22%5D%2C%22btnRadius%22%3A%5B11%2C11%2C11%5D%2C%22btnImageWidth%22%3A%5B22%2C22%2C22%5D%2C%22btnImageHeight%22%3A%5B22%2C22%2C22%5D%2C%22diagramType%22%3A%22sort%22%2C%22connectInputEnables%22%3A%5B%22table%22%2C%22filter%22%2C%22sort%22%2C%22join%22%5D%2C%22connectMode%22%3A%5B%22direct%22%2C%22move%22%5D%2C%22joinDotsPosData%22%3A%5B%7B%22x%22%3A-50%2C%22y%22%3A0%2C%22dir%22%3A%22W%22%2C%22inout%22%3A%22in%22%2C%22limit%22%3A1%2C%22min%22%3A1%7D%2C%7B%22x%22%3A50%2C%22y%22%3A0%2C%22dir%22%3A%22E%22%2C%22inout%22%3A%22out%22%2C%22limit%22%3A1%7D%5D%2C%22baseFg%22%3Atrue%2C%22baseSp%22%3Atrue%2C%22centerSp%22%3Afalse%2C%22samWh%22%3Afalse%2C%22autoFgAdd%22%3Afalse%2C%22scale%22%3A1%2C%22x%22%3A669%2C%22y%22%3A85%2C%22figureId%22%3A%22diagram15644032369950_9115841831709228%22%2C%22fontSize%22%3A16%2C%22fontColor%22%3A%22%23000000%22%2C%22filters%22%3A%5B%5D%2C%22patterns%22%3A%5B%5D%2C%22dotsPos%22%3A%5B%7B%22x%22%3A0%2C%22y%22%3A-30%7D%2C%7B%22x%22%3A30%2C%22y%22%3A-30%7D%2C%7B%22x%22%3A30%2C%22y%22%3A0%7D%2C%7B%22x%22%3A30%2C%22y%22%3A30%7D%2C%7B%22x%22%3A0%2C%22y%22%3A30%7D%2C%7B%22x%22%3A-30%2C%22y%22%3A30%7D%2C%7B%22x%22%3A-30%2C%22y%22%3A0%7D%2C%7B%22x%22%3A-30%2C%22y%22%3A-30%7D%5D%2C%22dotsPosCalc%22%3A%5B%7B%22x%22%3A0%2C%22y%22%3A-30%7D%2C%7B%22x%22%3A30%2C%22y%22%3A-30%7D%2C%7B%22x%22%3A30%2C%22y%22%3A0%7D%2C%7B%22x%22%3A30%2C%22y%22%3A30%7D%2C%7B%22x%22%3A0%2C%22y%22%3A30%7D%2C%7B%22x%22%3A-30%2C%22y%22%3A30%7D%2C%7B%22x%22%3A-30%2C%22y%22%3A0%7D%2C%7B%22x%22%3A-30%2C%22y%22%3A-30%7D%5D%2C%22rotateDotPos%22%3A%7B%22x%22%3A0%2C%22y%22%3A-60%7D%2C%22joinDotsPos%22%3A%5B%7B%22x%22%3A-30%2C%22y%22%3A0%2C%22dir%22%3A%22W%22%7D%2C%7B%22x%22%3A30%2C%22y%22%3A0%2C%22dir%22%3A%22E%22%7D%5D%2C%22joinDotsPosCalc%22%3A%5B%7B%22x%22%3A-30%2C%22y%22%3A0%7D%2C%7B%22x%22%3A30%2C%22y%22%3A0%7D%5D%2C%22connectedId%22%3A%5B%5B%22flowline15644032391370_973066679517598%22%5D%2C%5B%5D%5D%2C%22connectedIndex%22%3A%5B%5B1%5D%2C%5B%5D%5D%2C%22rulerConnectedIdHor%22%3A%5B%5D%2C%22rulerConnectedIndexHor%22%3A%5B%5D%2C%22rulerConnectedIdVer%22%3A%5B%5D%2C%22rulerConnectedIndexVer%22%3A%5B%5D%2C%22diagram%22%3Atrue%2C%22parentLayer%22%3A%22layer15644032109710_0010503057845978603%22%2C%22userData%22%3A%7B%7D%2C%22topDotPosData%22%3A%7B%22x%22%3A0%2C%22y%22%3A0%7D%2C%22bottomDotPosData%22%3A%7B%22x%22%3A0%2C%22y%22%3A0%7D%2C%22groupLeft%22%3A639%2C%22groupRight%22%3A699%2C%22groupTop%22%3A85%2C%22groupBottom%22%3A85%2C%22rotateDotPosCalc%22%3A%7B%22x%22%3A0%2C%22y%22%3A-60%7D%2C%22text%22%3A%22sort%22%7D%2C%7B%22baseFg%22%3Atrue%2C%22baseSp%22%3Afalse%2C%22centerSp%22%3Afalse%2C%22sameWh%22%3Afalse%2C%22figure%22%3A%22flowline%22%2C%22figureId%22%3A%22flowline15644032391370_973066679517598%22%2C%22arrowType1%22%3A%22%22%2C%22arrowType2%22%3A%22triangle%22%2C%22bazierCurve%22%3A%22Y%22%2C%22rotate%22%3A0%2C%22scale%22%3A1%2C%22x1%22%3A548%2C%22y1%22%3A85%2C%22x2%22%3A639%2C%22y2%22%3A85%2C%22fill%22%3A%22black%22%2C%22stroke%22%3A%22%23555555%22%2C%22strokeWidth%22%3A2%2C%22fontSize%22%3A16%2C%22fontColor%22%3A%22%23000000%22%2C%22flowlineCurve%22%3A10%2C%22dotsPos%22%3A%5B%7B%22x%22%3A100%2C%22y%22%3A100%7D%2C%7B%22x%22%3A300%2C%22y%22%3A200%7D%5D%2C%22dotsPosCalc%22%3A%5B%7B%22x%22%3A100%2C%22y%22%3A100%7D%2C%7B%22x%22%3A300%2C%22y%22%3A200%7D%5D%2C%22joinDotsPos%22%3A%5B%7B%22x%22%3A100%2C%22y%22%3A100%7D%2C%7B%22x%22%3A300%2C%22y%22%3A200%7D%5D%2C%22joinDotsPosCalc%22%3A%5B%7B%22x%22%3A100%2C%22y%22%3A100%7D%2C%7B%22x%22%3A300%2C%22y%22%3A200%7D%5D%2C%22lineDotsPos%22%3A%5B%7B%22x%22%3A593.5%2C%22y%22%3A85%7D%2C%7B%22x%22%3A593.5%2C%22y%22%3A85%7D%2C%7B%22x%22%3A593.5%2C%22y%22%3A85%7D%5D%2C%22lineMoveMode%22%3A%22A%22%2C%22lineMoveDir%22%3A%5B%22V%22%2C%22H%22%2C%22V%22%5D%2C%22lineMovePos%22%3A%5B%7B%22x%22%3A593.5%2C%22y%22%3A85%7D%2C%7B%22x%22%3A593.5%2C%22y%22%3A85%7D%2C%7B%22x%22%3A593.5%2C%22y%22%3A85%7D%2C%7B%22x%22%3A593.5%2C%22y%22%3A85%7D%5D%2C%22connectedId%22%3A%5B%5B%22diagram15644032224650_315441343761135%22%5D%2C%5B%22diagram15644032369950_9115841831709228%22%5D%5D%2C%22connectedIndex%22%3A%5B%5B2%5D%2C%5B0%5D%5D%2C%22parentLayer%22%3A%22layer15644032109710_0010503057845978603%22%2C%22animsState%22%3A%5B%5D%2C%22anims%22%3A%5B%5D%2C%22data%22%3A%7B%7D%2C%22topDotPosData%22%3A%7B%22x%22%3A0%2C%22y%22%3A0%7D%2C%22bottomDotPosData%22%3A%7B%22x%22%3A0%2C%22y%22%3A0%7D%7D%5D'

// 로딩
var load = function(){
    sed1 = new Sed();
    sed1.setDiv('div[ref=svgArea]', false);
    sed1.exeMode = 'dashboard';
    sed1.editMode = false;
    
    sed1.diagramType = 'flowdiagram';
    var options = {
        width:2000,
        height:800,
        margin:20,
        backgroundColor:'white',
        backgroundImage:null
    }
    sed1.initDiagram(options);
    sed1.editType = 'move'; // initDiagram 이후
    setAction();
    // 필요한 경우 로딩.
    sed1.removeFgAll();
    sed1.loadObjects(tempData);
}  

// 화면 Action
var setAction = function(){
    document.getElementById('btnCreatePage').onclick = function(){
        var me = this;
        var width = 1000;
        var height = 800;
        var options = {
            width:width,
            height:height,
            svgRoot:true,
            svgKind:'none',
            figureId:sedLib.createFigureId('svg'),
            //style:style,
            viewBox:'0 0 ' + width + ' ' + height
        }; 
        sed1.svg = sed1.addSvg(options);
        sed1.screenRatio = 1;
        var layer = sed1.createLayer('layer');
        sed1.svg.selectedLayer = layer;
    }

    document.getElementById('btnCreateTable').onclick = function(){
        createTable(sed1, 100, 100);
    }
    document.getElementById('btnCreateJoin').onclick = function(){
        createJoin(sed1, 100, 100);
    }
    document.getElementById('btnCreateFilter').onclick = function(){
        createFilter(sed1, 100, 100);
    }
    document.getElementById('btnCreateSort').onclick = function(){
        createSort(sed1, 100, 100);
    }
    document.getElementById('btnCreateFlowline').onclick = function(){
        createFlowline(sed1, 100, 100);
    }
    document.getElementById('btnHideBtn').onclick = function(){
        sed1.svg.selectedFg.hideButton(0);
    }
    document.getElementById('btnShowBtn').onclick = function(){
        sed1.svg.selectedFg.showButton(0);
    }
    document.getElementById('btnChangeBtnImg').onclick = function(){
        console.log('들어옴');
        sed1.svg.selectedFg.changeButtonImage(0, './img/arrow_up.png');
    }
    document.getElementById('btnVerify').onclick = function(){
        var ret = verifyDiagram(sed1);
        if(ret == true){
            alert('검증확인');
        }
    }
    document.getElementById('btnSaveData').onclick = function(){
        document.getElementById('dataView').value = sed1.getObjects();
    }
    document.getElementById('btnLoadData').onclick = function(){
        if(document.getElementById('dataView').value.trim() == ''){
            alert('불러올 데이터가 없습니다.');
            return;
        }
        var data= document.getElementById('dataView').value;
        data =decodeURIComponent(data);
        console.log('data', data);
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
        sed1.removeFgAll();
        sed1.loadObjects(document.getElementById('dataView').value);
    }
    document.getElementById('btnSetData').onclick = function(){
        if(sed1.svg.selectedFg == null){
            alert('객체를 먼저 선택하십시오');
            return;
        }
        sed1.svg.selectedFg.getUserData().set('item1', '푸르르를');
        alert('객체 속성을 설정했습니다.')
    }
    document.getElementById('btnGetData').onclick = function(){
        if(sed1.svg.selectedFg == null){
            alert('객체를 먼저 선택하십시오');
            return;
        }
        document.getElementById('dataView').value = JSON.stringify(sed1.svg.selectedFg.getUserData());
        alert('객체를의 속성을 읽어왔습니다.');
    }
    document.getElementById('btnGetDataAll').onclick = function(){
        var jsonData = getDiagramDataAll(sed1);
        console.log('jsonData', jsonData);
        document.getElementById('dataView').value = JSON.stringify(jsonData);
    }
    document.getElementById('btnDelete').onclick = function(){
        sed1.removeFg(sed1.svg.selectedFg);
    }
    document.getElementById('btnDeleteAll').onclick = function(){
        sed1.removeFgAll();
    }
    document.getElementById('btnPrevNode').onclick = function(){
        var ret = getPrevNode(sed1.svg.selectedFg);
        console.log('ret', ret);
        if(ret.length > 0){
            ret[0].select();
        } else {
            alert('이전 노드가 없습니다.');
        }
    }
    document.getElementById('btnNextNode').onclick = function(){
        var ret = getNextNode(sed1.svg.selectedFg);
        console.log('ret', ret);
        if(ret.length > 0){
            ret[0].select();
        } else {
            alert('이후 노드가 없습니다.');
        }
    }
    document.getElementById('btnSelectNode').onclick = function(){
        
        var ret = getNextNode(sed1.svg.selectedFg);
        console.log('ret', ret);
        if(ret.length > 0)
            ret[0].select();
            alert('다음노드를 선택했습니다.');
    }
    /*
    document.getElementById('btnChangeRatio').onclick=function(){
        var val = prompt('비율을 숫자로 입력하세요. (0.2~3)', sed1.screenWidth);
        if(isNaN(val) == true){
            alert('비율은 숫자이어야 합니다.');
            return;
        }
        if(val <= 0.2 || val > 3 ){
            alert('비율은 0.2보다 커야하고 3보다 작아야 합니다.');
            return;
        }
        sed1.screenRatio = val;
        onChangeScreenRatio(sed1);
    }
    document.getElementById('btnChangeWidth').onclick=function(){
        var val = prompt('폭을 숫자로 입력하세요.', sed1.screenWidth);
        if(isNaN(val) == true){
            alert('폭은 숫자이어야 합니다.');
            return;
        }
        if(val <= 0 ){
            alert('폭은 0보다 커야 합니다.');
            return;
        }
        sed1.screenWidth = val;
        onChangeScreenSize(sed1);
    }
    document.getElementById('btnChangeHeight').onclick=function(){
        var val = prompt('높이를 숫자로 입력하세요.', sed1.screenHeight);
        if(isNaN(val) == true){
            alert('높이는 숫자이어야 합니다.');
            return;
        }
        if(val <= 0 ){
            alert('높이는 0보다 커야 합니다.');
            return;
        }
        sed1.screenHeight = val;
        onChangeScreenSize(sed1);
    }
    */
    console.log('sed.div', sed1.div);
    sed1.div.addEventListener('sed', function(e){
        console.log('arguments', e.detail.fg, e.detail.sedEvent, e.detail.btnIndex);
        // 모든 제어는 여기에서...
        var fg = e.detail.fg;
        console.log(fg.options.diagramType)
        if(fg.options.diagramType == 'table'){
            if(e.detail.sedEvent == 'btnclick'){    // 이벤트를 용도에 맞게 정의할 것.
                //alert('테이블의 버튼을 클릭함');
                /*
                fg.setFill('yellow');
                fg.setStroke('red');
                fg.setStrokeWidth(3);
                fg.hideButton(1);   // index
                fg.setText('<div color="blue" style="text-align:center">change table</div>');
                fg.setTextVAlign('beneath');//bottom, top, middle
                
                fg.setImage();
                fg.setHidden();// 숨기기
                fg.changeButtonImage(index, url)    // 버튼 이미지 수정.
                */
                fg.setFontSize(28);         // text가 div로 감싸 있을 경우 적용되지 않음
                fg.setFontColor('orange');  // text가 div로 감싸 있을 경우 적용되지 않음
            }
        }
    }, false)
}

// 드래그 & 드롭 정의
var dropKind = null;
var dropKindSub = null;
var allowDrop = function(ev) {
    ev.preventDefault();
}
var drag = function(ev, kind, kindSub) {
    dropKind = kind;
    dropKindSub = kindSub;
    // 테이블일 경우 테이블명, 기타 경우에 따라 kind, 또는 ev.target.innerHTML
    ev.dataTransfer.setData("text", kind);
}
var drop = function(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    if(dropKind == 'table'){
        var fg = createTable(sed1, ev.offsetX, ev.offsetY);
        fg.setText(data);
        // 서버에서 데이터를 읽어와 객체에 할당하세요.
        fg.getUserData().set('tableName', data);
        fg.getUserData().set('columns',[
            {name:'column1', type:'char'},
            {name:'column2', type:'char'},
            {name:'column3', type:'char'},
            {name:'column4', type:'char'}
        ]);
    } else if(dropKind == 'join'){
        var fg = createJoin(sed1, ev.offsetX, ev.offsetY);
        fg.setText(dropKind + '-' + dropKindSub); 
        fg.setJoinType(dropKindSub);

    } else if(dropKind == 'filter'){
        var fg = createFilter(sed1, ev.offsetX, ev.offsetY);
        fg.setText(data); 
    } else if(dropKind == 'sort'){
        var fg = createSort(sed1, ev.offsetX, ev.offsetY);
        fg.setText(data); 
    } else if(dropKind == 'filter'){
        var fg = createFilter(sed1, ev.offsetX, ev.offsetY);
        fg.setText(data); 
    } else if(dropKind == 'function'){
        var fg = createFunction(sed1, ev.offsetX, ev.offsetY);
        fg.setText(data); 
    } else if(dropKind == 'csv'){
        var fg = createCsv(sed1, ev.offsetX, ev.offsetY);
        fg.setText(data); 
    } else if(dropKind == 'data-profile'){
        var fg = createDataProfile(sed1, ev.offsetX, ev.offsetY);
        fg.setText(data); 
    } else if(dropKind == 'data-wrangler'){
        var fg = createDataWrangler(sed1, ev.offsetX, ev.offsetY);
        fg.setText(data); 
    } else if(dropKind == 'file'){
        var fg = createFile(sed1, ev.offsetX, ev.offsetY);
        fg.setText(data); 
    } else if(dropKind == 'group'){
        var fg = createGroup(sed1, ev.offsetX, ev.offsetY);
        fg.setText(data); 
    } else if(dropKind == 'linear-regression'){
        var fg = createLinearRegression(sed1, ev.offsetX, ev.offsetY);
        fg.setText(data); 
    } else if(dropKind == 'merge'){
        var fg = createMerge(sed1, ev.offsetX, ev.offsetY);
        fg.setText(data); 
    } else if(dropKind == 'pearson-correlation'){
        var fg = createPearsonCorrelation(sed1, ev.offsetX, ev.offsetY);
        fg.setText(data); 
    } else if(dropKind == 'pivot'){
        var fg = createPivot(sed1, ev.offsetX, ev.offsetY);
        fg.setText(data); 
    } else if(dropKind == 'union'){
        var fg = createUnion(sed1, ev.offsetX, ev.offsetY);
        fg.setText(data); 
    } else if(dropKind == 'workflow'){
        var fg = createWorkflow(sed1, ev.offsetX, ev.offsetY);
        fg.setText(data); 
    } else if(dropKind == 'workflow-file'){
        var fg = createWorkflowFile(sed1, ev.offsetX, ev.offsetY);
        fg.setText(data); 
    } else if(dropKind == 'flowline'){
        var fg = createFlowline(sed1, ev.offsetX, ev.offsetY);
    }
}
