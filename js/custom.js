const Version = 102;
var $$ = mdui.JQ;

document.onreadystatechange= function (){
    if(document.readyState==="complete"){
    $$('#loadingBar').hide();
    console.log(document.readyState);
}
}

var initDrawer = new mdui.Drawer('#drawer', {
    overlay: true, swipe: true
});

var initDialog = new mdui.Dialog('#updates', {
    history: false,
})



$$('#toolbarButton').on('click', function () { initDrawer.toggle(); }); //抽屉按钮

$$('#version').on('click', function () {
    var tURL = '/updates.html'; 
    var targetDialogContent = '#'+'updateContent';
    AjaxUpdates(tURL,targetDialogContent,initDialog);
    initDrawer.close();
});

const AjaxUpdates = function (URL,targetDialog,MDUIdialog){
    $$.ajax({
        method: 'GET',
        url: URL,
        cache: false,
        success: function (e) {
            $$(targetDialog).html(e);
            MDUIdialog.handleUpdate();
            MDUIdialog.open();
        }
    })
}

window.onload = function(){
    if(localStorage.getItem('currentVersion')<Version){
        var tURL = '/updates.html'; 
        var targetDialogContent = '#'+'updateContent';
        AjaxUpdates(tURL,targetDialogContent,initDialog);
        localStorage.setItem('currentVersion',Version);
    }
}