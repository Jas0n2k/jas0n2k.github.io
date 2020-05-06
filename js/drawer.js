var init = new mdui.Drawer('#drawer', {
    overlay: true, swipe: true
});
var $$ = mdui.JQ;
$$('#toolbarButton').on('click', function () { init.toggle(); }); //抽屉按钮