 //夜间模式相关
 var drawerBackgroundColor = document.getElementById('drawer'); //抽屉背景
 var followOSToggle = document.getElementById('followOSToggle');
 var nightModeDiv = document.getElementById('nightModeDiv');
 var nightModeToggle = document.getElementById('nightModeToggle');
 var savedTheme = localStorage.getItem('savedTheme') ? localStorage.getItem('savedTheme') : null;
 var mediaQueryDark = window.matchMedia("(prefers-color-scheme:dark)");

const switchTheme = function (final) {
    if (final === "dark") {
        document.body.classList.toggle('mdui-theme-layout-dark', true);
        document.body.classList.toggle('mdui-theme-primary-blue', false);
        drawerBackgroundColor.classList.replace('mdui-color-white', 'mdui-color-grey-900');
        nightModeToggle.checked = true;
    }
    else {
        document.body.classList.toggle('mdui-theme-layout-dark', false);
        document.body.classList.toggle('mdui-theme-primary-blue', true);
        drawerBackgroundColor.classList.replace('mdui-color-grey-900', 'mdui-color-white');
        nightModeToggle.checked = false;
    }
}

function toggleListener() {
    if (nightModeToggle.checked) {
        switchTheme("dark");
        localStorage.setItem("savedTheme", "dark");
    }
    else {
        switchTheme();
        localStorage.setItem("savedTheme", "light");
    }
}

function onChangeOS() {
    if (followOSToggle.checked) {
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
    if (followOSToggle.checked) {
        nightModeDiv.classList.add('mdui-hidden');
        localStorage.removeItem("savedTheme");
        if (mediaQueryDark.matches) switchTheme("dark");
        else switchTheme();
    }
    else {
        nightModeDiv.classList.remove('mdui-hidden');
        toggleListener();
    }
}

function initialize() {
    nightModeDiv.classList.add('mdui-hidden');
    var final;
    if (!window.matchMedia) {
        followOSToggle = false;
        followOSToggle.disabled = true;
        return;
    }
    else {
        if (mediaQueryDark.matches) final = "dark";
        else final = "light";
    }
    if (savedTheme) {
        followOSToggle.checked = false;
        nightModeDiv.classList.remove('mdui-hidden');
        final = savedTheme;
    }
    switchTheme(final);
}

initialize();
followOSToggle.addEventListener("change", followOSListener);
nightModeToggle.addEventListener("change", toggleListener);
mediaQueryDark.addListener(onChangeOS);