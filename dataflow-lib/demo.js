var sed1 = null;
window.addEventListener('load', function(){
    load();
});  
var load = function(){
    // free version.
    sed1 = new Sed();
    var dom = document.querySelector('div[ref=dashboard]');
    sed1.setArea(dom);
    sed1.loadFile('./test.sed', function(){  //문서파일 경로
        sed1.initDashboard();
    });
    /* install version. (read from database)
    sed1 = new Sed();
    var dom = document.querySelector('div[ref=dashboard]');
    sed1.setArea(dom);
    sed1.loadRecord('00000021', function(){  //문서파일 경로
        sed1.initDashboard();
    }); 
    */
}
