 //夜间模式相关
 var drawerP = document.getElementById('drawer');//抽屉背景
 var followOSCB = document.getElementById('followOS');
 var nightModeB = document.getElementById('nightMode');
 var nightModeCB = document.getElementById('nightModeCB');
 var savedTheme = localStorage.getItem('savedTheme') ? localStorage.getItem('savedTheme') : null;
 var mediaQueryDark = window.matchMedia("(prefers-color-scheme:dark)");

const switchTheme = function (final) {
    if (final === "dark") {
        document.body.classList.toggle('mdui-theme-layout-dark', true);
        document.body.classList.toggle('mdui-theme-primary-blue', false);
        drawerP.classList.replace('mdui-color-white', 'mdui-color-grey-900');
        nightModeCB.checked = true;
    }
    else {
        document.body.classList.toggle('mdui-theme-layout-dark', false);
        document.body.classList.toggle('mdui-theme-primary-blue', true);
        drawerP.classList.replace('mdui-color-grey-900', 'mdui-color-white');
        nightModeCB.checked = false;
    }
}

function toggleListener() {
    if (nightModeCB.checked) {
        switchTheme("dark");
        localStorage.setItem("savedTheme", "dark");
    }
    else {
        switchTheme();
        localStorage.setItem("savedTheme", "light");
    }
}

function onChangeOS() {
    if (followOSCB.checked) {
        if (mediaQueryDark.matches) {
            switchTheme("dark");
            mdui.snackbar({
                message: '已切换到夜间模式',
                closeOnOutsideClick: true,
            })
        }
        else {
            switchTheme();
            mdui.snackbar({
                message: '已切换到普通模式',
                closeOnOutsideClick: true,
            })
        }
    }
}

function followOSListener() {
    if (followOSCB.checked) {
        nightModeB.classList.add('mdui-hidden');
        localStorage.removeItem("savedTheme");
        if (mediaQueryDark.matches) switchTheme("dark");
        else switchTheme();
    }
    else {
        nightModeB.classList.remove('mdui-hidden');
        toggleListener();
    }
}

function initialize() {
    nightModeB.classList.add('mdui-hidden');
    var final;
    if (!window.matchMedia) {
        followOSCB = false;
        followOSCB.disabled = true;
        return;
    }
    else {
        if (mediaQueryDark.matches) final = "dark";
        else final = "light";
    }
    if (savedTheme) {
        followOSCB.checked = false;
        nightModeB.classList.remove('mdui-hidden');
        final = savedTheme;
    }
    switchTheme(final);
}

initialize();
followOSCB.addEventListener("change", followOSListener);
nightModeCB.addEventListener("change", toggleListener);
mediaQueryDark.addListener(onChangeOS);